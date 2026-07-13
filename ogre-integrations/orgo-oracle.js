#!/usr/bin/env node
/**
 * OGRE Orgo Oracle — Persistent SSE MCP Client
 * Keeps the connection open and handles streaming responses
 */
const https = require('https');

const KEY = 'sk_live_3b981fc60d1bfd34f4da06b301f95dc657713501e7a91b16';
const MCP_URL = 'https://orgo-mcp.onrender.com/mcp';

function createPersistentSession() {
  let messageHandler = null;
  let closeHandler = null;
  let sessionOk = false;

  const body =
    JSON.stringify({
      jsonrpc: '2.0',
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        clientInfo: { name: 'ogre-oracle', version: '1.0.0' },
      },
      id: '1',
    });

  const url = new URL(MCP_URL);
  const options = {
    hostname: url.hostname,
    port: 443,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
      'X-Orgo-API-Key': KEY,
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache',
      'Content-Length': Buffer.byteLength(body),
    },
  };

  const req = https.request(options, (res) => {
    let buffer = '';

    res.on('data', (chunk) => {
      buffer += chunk.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const raw = line.slice(6).trim();
        if (!raw || raw === '') continue;

        try {
          const msg = JSON.parse(raw);

          if (!sessionOk && msg.result?.serverInfo) {
            sessionOk = true;
            console.log('✅ Orgo MCP connected: ' + msg.result.serverInfo.name + ' v' + msg.result.serverInfo.version);
            console.log('📡 SSE session active — streaming ready');
            console.log('');
          }

          if (messageHandler && msg.id !== null) {
            messageHandler(msg);
            messageHandler = null;
          }
        } catch (e) {
          // Not JSON — skip
        }
      }
    });

    res.on('close', () => {
      sessionOk = false;
      if (closeHandler) closeHandler();
    });

    res.on('error', (e) => {
      console.error('SSE error:', e.message);
      sessionOk = false;
    });
  });

  req.on('error', (e) => {
    console.error('Request error:', e.message);
  });

  req.write(body);
  req.end();

  return {
    ready: () => sessionOk,
    callTool: (toolName, args = {}) => {
      return new Promise((resolve, reject) => {
        if (!sessionOk) {
          reject(new Error('Session not ready'));
          return;
        }

        const id = String(Date.now());
        const body = JSON.stringify({
          jsonrpc: '2.0',
          method: 'tools/call',
          params: { name: toolName, arguments: args },
          id,
        });

        messageHandler = (msg) => {
          if (msg.id === id) {
            if (msg.result) resolve(msg.result);
            else if (msg.error) reject(new Error(msg.error.message));
            messageHandler = null;
          }
        };

        req.write(body + '\n');

        setTimeout(() => {
          if (messageHandler) {
            messageHandler = null;
            reject(new Error('Timeout waiting for: ' + toolName));
          }
        }, 20000);
      });
    },
    close: () => req.destroy(),
  };
}

// ── Main ──────────────────────────────────────────────────────────────────
const action = process.argv[2] || 'status';
const arg1 = process.argv[3];
const arg2 = process.argv[4];

console.log('🏭 OGRE ORACLE — Orgo VM Controller');
console.log('═══════════════════════════════════════\n');

const session = createPersistentSession();

// Wait for session, then run command
setTimeout(async () => {
  if (!session.ready()) {
    console.log('⚠️  Session not established within 10s — trying direct call...');
    process.exit(1);
  }

  try {
    if (action === 'status' || action === 'list' || action === 'vms') {
      console.log('📡 Fetching available tools...');
      const tools = await session.callTool('list', {});
      console.log('\n🖥️  Orgo Tools Available:');
      if (Array.isArray(tools)) {
        tools.forEach(t => console.log('  •', t.name || JSON.stringify(t)));
      } else if (tools.tools) {
        Object.keys(tools.tools).forEach(t => console.log('  •', t));
      } else {
        console.log(JSON.stringify(tools, null, 2));
      }
    }

    else if (action === 'bash' || action === 'shell') {
      if (!arg1) { console.log('Usage: node orgo-oracle.js bash <computer_id> [command]'); return; }
      const cmd = arg2 || 'echo "OGRE connected" && uptime && df -h /';
      console.log('💻 Running on', arg1 + ':', cmd);
      const r = await session.callTool('bash', { computer_id: arg1, command: cmd });
      console.log('\n📤 Output:'); console.log(r.output || JSON.stringify(r, null, 2));
    }

    else if (action === 'screenshot') {
      if (!arg1) { console.log('Usage: node orgo-oracle.js screenshot <computer_id>'); return; }
      console.log('📸 Taking screenshot of', arg1 + '...');
      const r = await session.callTool('screenshot', { computer_id: arg1 });
      console.log('📤 Result:', JSON.stringify(r, null, 2).slice(0, 500));
    }

    else if (action === 'info') {
      const tools = await session.callTool('list', {});
      console.log('\n📋 All tools:\n', JSON.stringify(tools, null, 2).slice(0, 2000));
    }

    else if (action === 'vms') {
      // Try to list desktops
      try {
        const r = await session.callTool('list', {});
        console.log('Available resources:', JSON.stringify(r, null, 2).slice(0, 1000));
      } catch(e) {
        console.log('list error:', e.message);
      }
    }

    else {
      console.log('Actions: status | vms | bash <id> <cmd> | screenshot <id> | info');
      console.log('');
      console.log('Examples:');
      console.log('  node orgo-oracle.js status');
      console.log('  node orgo-oracle.js vms');
      console.log('  node orgo-oracle.js bash <vm-id> "uptime"');
      console.log('  node orgo-oracle.js screenshot <vm-id>');
    }

    session.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    session.close();
    process.exit(1);
  }
}, 8000); // Wait 8s for SSE session to establish
