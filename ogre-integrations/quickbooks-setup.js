/**
 * OGRE QuickBooks Online Integration
 * Credentials: Client ID + Secret stored in /workspace/ogre-integrations/.env
 * 
 * QuickBooks Online API via OAuth 2.0
 * Docs: https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/invoice
 */

const { OAuthClient } = require('intuit-oauth');
const NodeCache = require('node-cache');

// Load env
require('dotenv').config({ path: __dirname + '/.env' });

const CLIENT_ID = process.env.QUICKBOOKS_CLIENT_ID;
const CLIENT_SECRET = process.env.QUICKBOOKS_CLIENT_SECRET;
const REDIRECT_URI = process.env.QUICKBOOKS_REDIRECT_URI || 'https://ogre.studexmeat.com/oauth/callback';
const ENVIRONMENT = process.env.QUICKBOOKS_ENV || 'sandbox';

// OAuth client for QuickBooks
const oauthClient = new OAuthClient({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  environment: ENVIRONMENT === 'production' ? OAuthClient.environments.production : OAuthClient.environments.sandbox,
  redirectUri: REDIRECT_URI,
});

/**
 * Generate OAuth authorization URL
 * User visits this URL to authorize OGRE's QuickBooks app
 */
function getAuthUri() {
  return oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
    state: 'ogre-ndoh-tender-2026',
  });
}

/**
 * Exchange authorization code for tokens
 * Called after user visits auth URI and is redirected back
 */
async function getToken(authCode) {
  const authResponse = await oauthClient.createToken exchanges code for tokens
  const { body: tokens } = await oauthClient.acquireToken(req.body.code);
  
  // Store tokens securely — in production use encrypted storage
  const tokenCache = new NodeCache();
  tokenCache.set('quickbooks_tokens', tokens, tokens.expires_in);
  
  return tokens;
}

/**
 * Create invoice in QuickBooks
 * Used by Sobek Trade™ agent for tender milestone invoicing
 */
async function createInvoice(customerName, lineItems, invoiceDate) {
  const token = getTokenFromStorage();
  
  const invoicePayload = {
    Line: lineItems.map(item => ({
      Amount: item.amount,
      DetailType: 'SalesItemLineDetail',
      SalesItemLineDetail: {
        ItemRef: { name: item.itemName, value: item.itemId }
      },
      Description: item.description,
    })),
    CustomerRef: { name: customerName },
    TxnDate: invoiceDate,
    DocNumber: `OGRE-${Date.now()}`,
  };

  const apiResponse = await fetch(
    `https://sandbox-quickbooks.api.intuit.com/v3/company/${tokens.realmId}/invoice`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(invoicePayload),
    }
  );
  
  return apiResponse.json();
}

/**
 * Get all invoices (for tracking government payments)
 */
async function getInvoices() {
  const token = getTokenFromStorage();
  const apiResponse = await fetch(
    `https://sandbox-quickbooks.api.intuit.com/v3/company/${tokens.realmId}/query?query=SELECT * FROM Invoice`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    }
  );
  return apiResponse.json();
}

/**
 * Send invoice by email
 */
async function sendInvoice(invoiceId) {
  const token = getTokenFromStorage();
  const apiResponse = await fetch(
    `https://sandbox-quickbooks.api.intuit.com/v3/company/${tokens.realmId}/invoice/${invoiceId}/send`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return apiResponse.json();
}

module.exports = { getAuthUri, getToken, createInvoice, getInvoices, sendInvoice };

// Usage:
// node quickbooks-setup.js
// → Opens browser to QuickBooks auth URL
// → User approves → redirected to callback with auth code
// → Token stored and ready for API calls

console.log('OGRE QuickBooks Integration Ready');
console.log('Auth URL:', getAuthUri());
