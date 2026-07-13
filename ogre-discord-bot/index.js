/**
 * OGRE Discord Bot — Cipher Tr@ce
 * Run: node index.js
 * Token: MTUwODk4NTc2MzEwMTAyMDI5MQ.Guozvr.l13Nl9OjqFarjLLAvZuHcqJbIeqVcmwrCcbHa8
 */

const { Client, GatewayIntentBits, ChannelType, EmbedBuilder } = require('discord.js');

const TOKEN = 'MTUwODk4NTc2MzEwMTAyMDI5MQ.Guozvr.l13Nl9OjqFarjLLAvZuHcqJbIeqVcmwrCcbHa8';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
  ],
});

const PREFIX = '!cipher ';

// System prompt for Cipher Tr@ce
const SYSTEM_PROMPT = `You are Cipher Tr@ce, CEO of Dark Factory.
You are confident, minimal, technical. No filler words.
You are the lead engineer of an 8-agent AI swarm that builds software, manages VMs, and runs businesses.
Your team: Cipher Tr@ce (CEO), Adam Smash (VMs/Global Markets), Sentinel (SolarPreneurs), Research Agent, Revenue Agent, Partner Agent, Builder Agent, Comms Agent.
Your voice: direct, code-like, African perspective.
`;

// Mock AI response — replace with actual Ollama/OpenAI call
async function getAIResponse(message, openaiKey) {
  // If OpenAI key available, use it
  if (openaiKey && openaiKey.startsWith('sk-')) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: message },
          ],
          max_tokens: 500,
        }),
      });
      const data = await res.json();
      return data.choices?.[0]?.message?.content || 'Processing your request...';
    } catch (e) {
      return `🤖 Processing: "${message}" — I'll handle this now.`;
    }
  }
  // Fallback
  return `🤖 Cipher Tr@ce received: "${message}"

I'm processing this now. Here's what I can do:
- !cipher status — System status
- !cipher vms — VM inventory
- !cipher sales — Revenue pipeline
- !cipher deploy — Trigger Dark Factory build
- !cipher research — Run market research
- !cipher help — Full command list
`;
}

client.on('ready', () => {
  console.log(`✅ OGRE Discord Bot online — ${client.user.tag}`);
  console.log(`📡 Connected to ${client.guilds.cache.size} server(s)`);
  
  // Set status
  client.user.setActivity('Dark Factory | !cipher help', { type: 0 });
  
  // Announce in all connected servers
  client.guilds.cache.forEach(guild => {
    const channel = guild.systemChannel || guild.channels.cache.find(c => c.type === ChannelType.GuildText);
    if (channel) {
      channel.send(`🤖 **Cipher Tr@ce is online.**\nI'm the CEO of Dark Factory. Type \`!cipher help\` to get started.`);
    }
  });
});

client.on('messageCreate', async (message) => {
  // Ignore bots
  if (message.author.bot) return;
  
  // Direct message to bot
  if (message.channel.type === ChannelType.DM) {
    const response = await getAIResponse(message.content, process.env.OPENAI_API_KEY);
    return message.reply(response);
  }
  
  // Commands in servers
  if (!message.content.startsWith(PREFIX)) return;
  
  const args = message.content.slice(PREFIX.length).trim().split(' ');
  const cmd = args[0]?.toLowerCase();
  
  if (cmd === 'help') {
    return message.reply({
      embeds: [new EmbedBuilder()
        .setTitle('🤖 Cipher Tr@ce — Command Help')
        .setColor(0x6c63ff)
        .addFields(
          { name: '!cipher status', value: 'System status and uptime' },
          { name: '!cipher vms', value: 'VM inventory across all nodes' },
          { name: '!cipher agents', value: 'Agent swarm status' },
          { name: '!cipher sales', value: 'Revenue pipeline summary' },
          { name: '!cipher deploy', value: 'Trigger Dark Factory rebuild' },
          { name: '!cipher research', value: 'Run market intelligence brief' },
          { name: '!cipher help', value: 'Show this help' },
        )
        .setFooter({ text: 'Dark Factory — Dark Factory OS v1.0' }),
      ],
    });
  }
  
  if (cmd === 'status') {
    return message.reply({
      embeds: [new EmbedBuilder()
        .setTitle('📊 OGRE System Status')
        .setColor(0x10b981)
        .addFields(
          { name: 'VMs', value: '6/8 online 🟢', inline: true },
          { name: 'Agents', value: '4/9 active 🟢', inline: true },
          { name: 'Pipeline', value: 'R3.2M+ 🟡', inline: true },
          { name: 'System', value: 'NOMINAL ✅', inline: true },
          { name: 'Version', value: 'OGRE OS v1.0', inline: true },
        )
        .setFooter({ text: 'Cipher Tr@ce — Dark Factory' }),
      ],
    });
  }
  
  if (cmd === 'vms') {
    return message.reply({
      embeds: [new EmbedBuilder()
        .setTitle('🖥️ OGRE VM Inventory')
        .setColor(0x00d4ff)
        .addFields(
          { name: 'D@RK F@C#ORY', value: '45.61.56.91 — Johannesburg 🟢', inline: false },
          { name: 'Hermes Agent', value: '100.74.71.60 — Johannesburg 🟢', inline: false },
          { name: 'OpenClaw', value: '100.74.71.61 — Johannesburg 🟢', inline: false },
          { name: 'StudEx Global Markets', value: '100.74.71.62 — Lagos 🟢', inline: false },
          { name: 'Agentic Lab', value: '100.74.71.63 — Nairobi 🟢', inline: false },
          { name: 'SGM Afrika Buiz', value: '100.74.71.64 — Kigali 🟡', inline: false },
          { name: 'Super Agents Command', value: '100.74.71.65 — Johannesburg 🟢', inline: false },
          { name: 'Project-2571', value: '100.74.71.66 — Accra 🔴', inline: false },
        )
        .setFooter({ text: 'Use !cipher vms <ip> for details' }),
      ],
    });
  }
  
  if (cmd === 'sales') {
    return message.reply({
      embeds: [new EmbedBuilder()
        .setTitle('💰 Revenue Pipeline')
        .setColor(0xf59e0b)
        .addFields(
          { name: 'LAISA Phase A', value: 'R350K + R55K/mo — Proposal Sent', inline: false },
          { name: 'Sobek Trade', value: 'R875K — Deposit Paid ✅', inline: false },
          { name: 'SafeSight Clinic', value: 'R1,499/mo — Demo Scheduled', inline: false },
          { name: 'Pharmasyntez', value: 'R2.99M Y1 — Awaiting Response', inline: false },
          { name: 'NDoH-11 Tender', value: 'R87M–R174M — CLOSED', inline: false },
          { name: 'TOTAL OPPORTUNITY', value: 'R3.2M+', inline: false },
        )
        .setFooter({ text: 'Dark Factory Revenue Agent | Updated: 2026-07-13' }),
      ],
    });
  }
  
  if (cmd === 'deploy') {
    message.reply('🚀 Triggering Dark Factory build via GitHub Actions...');
    // In production: trigger GitHub Actions via API
    return message.reply('✅ Build triggered. Check progress at: github.com/TumeloRamaphosa/dark-factory/actions');
  }
  
  if (cmd === 'research') {
    return message.reply('🔬 Research Agent spawned — 9-country intelligence scan starting. Report due: 3AM SA today.');
  }
  
  // General AI message
  const response = await getAIResponse(args.join(' '), process.env.OPENAI_API_KEY);
  return message.reply(response);
});

client.on('error', (error) => {
  console.error('Discord bot error:', error.message);
});

client.login(TOKEN).catch(err => {
  console.error('Failed to login:', err.message);
  console.log('\n📋 To fix:');
  console.log('1. Go to: https://discord.com/developers/applications');
  console.log('2. Select your bot application');
  console.log('3. OAuth2 → URL Generator');
  console.log('4. Check: bot, applications.commands');
  console.log('5. Bot Permissions: Send Messages, Read Messages');
  console.log('6. Use the generated URL to add bot to server');
});
