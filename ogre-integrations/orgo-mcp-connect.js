#!/usr/bin/env node
const https = require('https');

const API_KEY = 'sk_live_1557ce924ebba0d2e1e649f61b60cfb2fa37b16949d5d00d';
const HOST = 'orgo-mcp.onrender.com';
const PATH = '/mcp';

function request(method, params) {
  return new Promise((resolve, reject) => {
    const id = Date.now();
    const body = JSON.stringify({ jsonrpc: '2.0', id, method, params });
    const options = {
      hostname: HOST, path: PATH, method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream',
        'X-Orgo-API-Key': API_KEY,
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = https.request(options, (res) => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        // Parse ALL data: lines as individual JSON objects
        const results = [];
        for (const line of raw.split('\n')) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            try {
              const json = trimmed.substring(6).trim();
              if (json) results.push(JSON.parse(json));
            } catch(e) {}
          }
        }
        // Find matching id
        const matched = results.find(r => r.id === id);
        if (matched?.error) reject(matched.error);
        else if (matched?.result) resolve(matched.result);
        else if (results.length > 0) resolve(results[0].result || results[0]);
        else resolve({ raw: raw.substring(0, 200) });
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

(async () => {
  try {
    const init = await request('initialize', {
      protocolVersion: '2025-11-25', capabilities: {}, clientInfo: { name: 'ogre-cli', version: '1.0' }
    });
    console.log('✓ Orgo MCP connected:', init.serverInfo?.name, 'v' + init.serverInfo?.version);
    console.log('  Protocol:', init.protocolVersion);
    console.log('  Capabilities:', JSON.stringify(init.capabilities || {}).substring(0, 200));

    // List tools
    const toolsResult = await request('tools/list', {});
    const tools = toolsResult?.tools || [];
    console.log('\nTOOLS (' + tools.length + '):');
    tools.forEach(t => console.log('  -', t.name, '|', (t.description||'').substring(0,80)));

    // Try orgo_list_computers
    try {
      const list = await request('orgo_list_computers', {});
      console.log('\nCOMPUTERS:', JSON.stringify(list, null, 2).substring(0, 2000));
    } catch(e) {
      console.log('\norgo_list_computers error:', e.message || JSON.stringify(e).substring(0,200));
    }
  } catch(e) {
    console.error('Error:', e.message || JSON.stringify(e).substring(0, 300));
  }
})();
