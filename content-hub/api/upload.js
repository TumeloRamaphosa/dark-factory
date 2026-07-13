/**
 * Vercel Serverless Function — OGRE Content Hub Upload
 * Handles multipart file uploads, stores to /tmp, returns CDN URL
 * 
 * NOTE: Vercel serverless functions are stateless.
 * For production, replace with Cloudflare R2 + signed URLs or S3.
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const MAX_SIZE = 100 * 1024 * 1024; // 100MB
const UPLOAD_DIR = '/tmp/ogre-uploads';

// Ensure upload dir exists
try { fs.mkdirSync(UPLOAD_DIR, { recursive: true }); } catch(e) {}

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204); res.end(); return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' })); return;
  }

  try {
    // Read Content-Length header
    const contentLength = parseInt(req.headers['content-length'] || '0', 10);
    if (contentLength > MAX_SIZE) {
      res.writeHead(413, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'File too large. Max 100MB.' })); return;
    }

    // Collect body chunks
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks);

    // Parse multipart — simple regex-based (no busboy dependency)
    const boundary = req.headers['content-type']?.split('boundary=')[1];
    if (!boundary) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing Content-Type boundary' })); return;
    }

    const parts = raw.toString('binary').split('--' + boundary);
    let result = null;

    for (const part of parts) {
      if (!part.includes('filename=') || !part.trim()) continue;

      const headerEnd = part.indexOf('\r\n\r\n');
      if (headerEnd === -1) continue;

      const headers = part.slice(0, headerEnd);
      const filename = headers.match(/filename="([^"]+)"/)?.[1];
      if (!filename) continue;

      const contentType = headers.match(/Content-Type: ([^\r\n]+)/)?.[1] || 'application/octet-stream';
      const fileContent = part.slice(headerEnd + 4, part.length - 2); // strip trailing \r\n

      // Generate safe filename
      const ext = path.extname(filename).toLowerCase() || '.' + filename.split('.').pop();
      const safeName = crypto.randomBytes(8).toString('hex') + '-' + Date.now() + ext;
      const filePath = path.join(UPLOAD_DIR, safeName);

      fs.writeFileSync(filePath, fileContent, 'binary');

      // In production: upload to Cloudflare R2, S3, or similar
      // For demo: return a placeholder URL
      // Replace the line below with your actual CDN upload logic
      const cdn_url = `https://cdn.ogre.studex-group.com/${safeName}`;

      result = {
        cdn_url,
        name: safeName,
        original_name: filename,
        size: fileContent.length,
        type: contentType,
        note: 'Upload received. Configure R2/S3 in api/upload.js for production CDN.',
      };

      console.log('[OGRE Content Hub] Uploaded:', filename, '→', cdn_url, '—', (fileContent.length/1024).toFixed(0)+'KB');
    }

    if (!result) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'No file found in request' })); return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));

  } catch(err) {
    console.error('[OGRE Content Hub] Error:', err.message);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
  }
};
