#!/usr/bin/env node
/**
 * OGRE Orgo VM Controller
 * Uses Orgo MCP API via SSE + JSON-RPC
 * API Key: sk_live_3b981fc60d1bfd34f4da06b301f95dc657713501e7a91b16
 */
const https = require('https');

const ORGO_API_KEY = 'sk_live_3b981fc60d1bfd34f4da06b301f95dc657713501e7a91b16';
const MCP_URL = 'https://orgo-mcp.onrender.com/mcp';

function mcpRequest(method, params = {}) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      jsonrpc: '2.0',
      method,
      params,
      id: Math.random().toString(36).substr(2, 9),
    });

    const url = new URL(MCP_URL);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream',
        'X-Orgo-API-Key': ORGO_API_KEY,
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        // Parse SSE lines
        const lines = data.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const json = JSON.parse(line.slice(6));
              if (json.result) { resolve(json.result); return; }
              if (json.error) { reject(new Error(json.error.message)); return; }
            } catch (e) { /* continue */ }
          }
        }
        reject(new Error('No result in response: ' + data.slice(0, 200)));
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  const cmd = process.argv[2] || 'status';
  console.log(`\n🏭 OGRE Orgo VM Controller`);
  console.log(`============================`);
  console.log(`API Key: ${ORGO_API_KEY.slice(0, 12)}...`);
  console.log(`Command: ${cmd}\n`);

  try {
    // Initialize
    await mcpRequest('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'ogre-agent', version: '1.0.0' },
    });
    console.log('✅ Connected to Orgo MCP v4.1.1');

    if (cmd === 'list' || cmd === 'status') {
      const result = await mcpRequest('tools/call', { name: 'list', arguments: {} });
      console.log('\n📋 Available tools:', JSON.stringify(result, null, 2));
    } else if (cmd === 'desktops' || cmd === 'vms') {
      const result = await mcpRequest('tools/call', { name: 'list', arguments: {} });
      console.log('\n🖥️  VMs:', JSON.stringify(result, null, 2));
    } else if (cmd === 'screenshot') {
      const computerId = process.argv[3];
      if (!computerId) {
        // List first
        console.log('Usage: node orgo-vm.js screenshot <computer_id>');
        const result = await mcpRequest('tools/call', { name: 'list', arguments: {} });
        console.log('\n📋 Available desktops:', JSON.stringify(result, null, 2));
        return;
      }
      const result = await mcpRequest('tools/call', {
        name: 'screenshot',
        arguments: { computer_id: computerId },
      });
      console.log('\n📸 Screenshot result:', JSON.stringify(result, null, 2));
    } else if (cmd === 'bash') {
      const computerId = process.argv[3];
      const shellCmd = process.argv[4] || 'echo "OGRE connected" && uptime && df -h';
      if (!computerId) {
        console.log('Usage: node orgo-vm.js bash <computer_id> [command]');
        return;
      }
      const result = await mcpRequest('tools/call', {
        name: 'bash',
        arguments: { computer_id: computerId, command: shellCmd },
      });
      console.log('\n💻 Bash result:', JSON.stringify(result, null, 2));
    } else if (cmd === 'info') {
      const result = await mcpRequest('tools/call', { name: 'list', arguments: {} });
      console.log('\n📋 All Orgo tools:', Object.keys(result || {}).join(', '));
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();
