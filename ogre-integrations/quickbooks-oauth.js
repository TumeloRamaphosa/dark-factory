/**
 * OGRE QuickBooks OAuth Setup
 * =================================
 * Step 1: Get the authorization URL
 * Step 2: User visits URL, approves access
 * Step 3: User pastes the "code" from redirect URL
 * Step 4: We exchange code for tokens
 * Step 5: Tokens stored → API fully active
 */

require('dotenv').config({ path: __dirname + '/.env' });

const CLIENT_ID     = process.env.QUICKBOOKS_CLIENT_ID;
const CLIENT_SECRET = process.env.QUICKBOOKS_CLIENT_SECRET;
const REDIRECT_URI  = process.env.QUICKBOOKS_REDIRECT_URI || 'https://ogre.studexmeat.com/oauth/callback';
const ENVIRONMENT   = process.env.QUICKBOOKS_ENV || 'sandbox';

const AUTH_BASE = ENVIRONMENT === 'production'
  ? 'https://appcenter.intuit.com/connect/oauth2'
  : 'https://appcenter.intuit.com/connect/oauth2';

const TOKEN_BASE = ENVIRONMENT === 'production'
  ? 'https://oauth.platform.intuit.com/oauth2/v1'
  : 'https://sandbox-quickbooks.api.intuit.com/v3';

// ── STEP 1: Generate Auth URL ──────────────────────────────────────────
function getAuthUrl() {
  const scopes = 'com.intuit.quickbooks.accounting';
  const state = 'ogre-ndoh-' + Date.now(); // prevents CSRF

  const params = new URLSearchParams({
    client_id:     CLIENT_ID,
    response_type: 'code',
    scope:         scopes,
    redirect_uri:  REDIRECT_URI,
    state,
  });

  return `${AUTH_BASE}?${params.toString()}`;
}

// ── STEP 2: Exchange code for tokens ───────────────────────────────────
async function exchangeCodeForTokens(code) {
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const response = await fetch(`${TOKEN_BASE}/tokens`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type':  'application/x-www-form-urlencoded',
      'Accept':        'application/json',
    },
    body: new URLSearchParams({
      grant_type:   'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error_description || data.error || 'Token exchange failed');
  }

  return {
    access_token:  data.access_token,
    refresh_token: data.refresh_token,
    expires_in:   data.expires_in,       // seconds
    token_type:   data.token_type,
    x_refresh_token_expires_in: data.x_refresh_token_expires_in,
  };
}

// ── STEP 3: Refresh access token ───────────────────────────────────────
async function refreshTokens(refreshToken) {
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const response = await fetch(`${TOKEN_BASE}/tokens`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type':  'application/x-www-form-urlencoded',
      'Accept':        'application/json',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error_description || 'Refresh failed');
  return data;
}

// ── STEP 4: Test the connection ───────────────────────────────────────
async function testConnection(accessToken) {
  const realmId = process.env.QUICKBOOKS_REALM_ID || '0'; // replace with actual

  const response = await fetch(
    `${TOKEN_BASE}/oauth2/userinfo?realmId=${realmId}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error('Connection test failed: ' + err);
  }

  return response.json();
}

// ── STEP 5: Create Sobek Trade invoice ─────────────────────────────────
async function createInvoice(accessToken, realmId, invoiceData) {
  const { CustomerRef, LineItems, TxnDate, DocNumber } = invoiceData;

  const payload = {
    Line: LineItems.map(item => ({
      Amount:      item.amount,
      DetailType: 'SalesItemLineDetail',
      Description: item.description,
      SalesItemLineDetail: {
        ItemRef: { name: item.itemName, value: item.itemId || '1' },
      },
    })),
    CustomerRef: { name: CustomerRef },
    TxnDate,
    DocNumber,
  };

  const response = await fetch(
    `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/invoice`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type':  'application/json',
        'Accept':        'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(data));
  return data.Invoice;
}

// ── CLI ─────────────────────────────────────────────────────────────────
const [,, action, arg1] = process.argv;

if (!action) {
  console.log('\n🏭 OGRE QuickBooks Setup');
  console.log('═══════════════════════════════════════\n');
  console.log('Usage:');
  console.log('  node quickbooks-oauth.js url          → Generate auth URL');
  console.log('  node quickbooks-oauth.js exchange <code> → Exchange code for tokens');
  console.log('  node quickbooks-oauth.js test         → Test connection');
  console.log('  node quickbooks-oauth.js invoice      → Create test invoice');
  console.log('');
  console.log('Credentials loaded from .env:');
  console.log('  Client ID:', CLIENT_ID ? CLIENT_ID.slice(0, 8) + '...' : '❌ MISSING');
  console.log('  Env:', ENVIRONMENT);
  console.log('');
  process.exit(1);
}

(async () => {
  if (action === 'url') {
    const url = getAuthUrl();
    console.log('\n🔗 Authorisation URL:');
    console.log(url);
    console.log('\n📋 Steps:');
    console.log('1. Visit the URL above');
    console.log('2. Sign in to QuickBooks / Intuit');
    console.log('3. Authorise OGRE Computer');
    console.log('4. You\'ll be redirected to:', REDIRECT_URI);
    console.log('5. Copy the "code" parameter from the redirect URL');
    console.log('6. Run: node quickbooks-oauth.js exchange <code>');
    console.log('');
  }

  else if (action === 'exchange') {
    if (!arg1) { console.log('Usage: node quickbooks-oauth.js exchange <code>'); process.exit(1); }
    console.log('🔄 Exchanging code for tokens...');
    const tokens = await exchangeCodeForTokens(arg1);
    console.log('\n✅ Tokens received!');
    console.log('Add these to your .env file:');
    console.log('QUICKBOOKS_ACCESS_TOKEN=' + tokens.access_token);
    console.log('QUICKBOOKS_REFRESH_TOKEN=' + tokens.refresh_token);
    console.log('QUICKBOOKS_EXPIRES_IN=' + tokens.expires_in);
    console.log('\n💾 Writing to .env...');
    const fs = require('fs');
    const envContent = fs.readFileSync(__dirname + '/.env', 'utf8');
    const updated = envContent
      .replace(/QUICKBOOKS_ACCESS_TOKEN=.*/, `QUICKBOOKS_ACCESS_TOKEN=${tokens.access_token}`)
      .replace(/QUICKBOOKS_REFRESH_TOKEN=.*/, `QUICKBOOKS_REFRESH_TOKEN=${tokens.refresh_token}`)
      .replace(/QUICKBOOKS_EXPIRES_IN=.*/, `QUICKBOOKS_EXPIRES_IN=${tokens.expires_in}`);
    fs.writeFileSync(__dirname + '/.env', updated);
    console.log('✅ Tokens saved to .env');
  }

  else if (action === 'test') {
    const accessToken = process.env.QUICKBOOKS_ACCESS_TOKEN;
    if (!accessToken) { console.log('❌ QUICKBOOKS_ACCESS_TOKEN not set in .env'); process.exit(1); }
    console.log('🔍 Testing connection...');
    const info = await testConnection(accessToken);
    console.log('\n✅ Connected to QuickBooks!');
    console.log('Company:', info.sub || info.CompanyName || JSON.stringify(info));
  }

  else if (action === 'invoice') {
    const accessToken = process.env.QUICKBOOKS_ACCESS_TOKEN;
    const realmId     = process.env.QUICKBOOKS_REALM_ID;
    if (!accessToken || !realmId) { console.log('❌ Tokens or Realm ID missing in .env'); process.exit(1); }

    const invoice = await createInvoice(accessToken, realmId, {
      CustomerRef: 'OGRE Computer / Studex Group',
      TxnDate: new Date().toISOString().split('T')[0],
      DocNumber: 'OGRE-' + Date.now(),
      LineItems: [
        { amount: 87500, description: 'AI Agent OS — LAISA Phase A (10% deposit)', itemName: 'AI Development' },
      ],
    });
    console.log('\n✅ Invoice created!');
    console.log('Invoice ID:', invoice.Id);
    console.log('Doc Number:', invoice.DocNumber);
    console.log('Invoice URL:', `https://sandbox.qbo.intuit.com/coreservice/v2/invoice/${invoice.Id}`);
  }

  else {
    console.log('Unknown action:', action);
  }
})().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
