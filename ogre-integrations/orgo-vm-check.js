#!/usr/bin/env node
// Orgo MCP — single persistent TCP connection
const https = require('https');

const API_KEY = 'sk_live_1557ce924ebba0d2e1e649f61b60cfb2fa37b16949d5d00d';
const agent = new https.Agent({ keepAlive: true, maxSockets: 1 });

let reqId = 1;

function rpc(method, params) {
  return new Promise((resolve) => {
    const id = reqId++;
    const body = JSON.stringify({ jsonrpc: '2.0', id, method, params });
    const options = {
      hostname: 'orgo-mcp.onrender.com', path: '/mcp', method: 'POST', agent,
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json, text/event-stream', 'X-Orgo-API-Key': API_KEY, 'Content-Length': Buffer.byteLength(body), 'Connection': 'keep-alive' }
    };
    const req = https.request(options, (res) => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        // Parse all SSE data: lines
        const results = [];
        for (const line of raw.split('\n')) {
          const t = line.trim();
          if (t.startsWith('data: ')) {
            try { results.push(JSON.parse(t.substring(6))); } catch(e) {}
          }
        }
        const matched = results.find(r => r?.id === id);
        if (matched?.result !== undefined) resolve(matched.result);
        else if (matched?.error) resolve({ error: matched.error, raw: raw.substring(0, 100) });
        else if (results.length > 0) resolve(results[0]?.result || { raw: raw.substring(0, 100) });
        else resolve({ raw: raw.substring(0, 100) });
      });
    });
    req.on('error', (e) => resolve({ error: e.message }));
    req.write(body);
    req.end();
  });
}

(async () => {
  console.log('Connecting to Orgo MCP (persistent connection)...\n');

  // Initialize first
  const init = await rpc('initialize', {
    protocolVersion: '2025-11-25',
    capabilities: {},
    clientInfo: { name: 'ogre-cli', version: '1.0' }
  });
  console.log('Server:', JSON.stringify(init?.serverInfo || init?.error || init).substring(0, 200));

  if (init?.instructions) {
    console.log('\nInstructions:\n', init.instructions.substring(0, 500));
  }

  // List tools (on SAME connection)
  const tools = await rpc('tools/list', {});
  const toolList = tools?.tools || [];
  console.log('\nTools (' + toolList.length + '):');
  toolList.forEach(t => console.log(' -', t.name, ':', (t.description||'').substring(0,80)));

  // Try to list computers
  for (const name of ['orgo_list_computers', 'orgo_list', 'list_computers', 'list_vms', 'get_computer', 'get_desktop', 'computer_info', 'desktop_info']) {
    const r = await rpc(name, {});
    const s = JSON.stringify(r).substring(0, 100);
    if (!s.includes('Method not found') && !s.includes('undefined')) {
      console.log('\n' + name + ':', s);
    }
  }

  agent.destroy();
  console.log('\nDone');
})();
