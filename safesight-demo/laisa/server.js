// LAISA Agent OS — Demo API Server
// Runs on the VM at port 3000
// Endpoints: POST /api/tts, POST /api/sms, POST /api/whatsapp

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const COMPOSIO_API_KEY = process.env.COMPOSIO_API_KEY;

// MIME types
const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

// Serve static files
function serveStatic(req, res, filePath) {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    const ext = path.extname(fullPath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    fs.createReadStream(fullPath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
}

// TTS endpoint — uses ElevenLabs or fallback to platform TTS
async function handleTTS(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', async () => {
    try {
      const { text, voice_id } = JSON.parse(body);
      if (!text) { res.writeHead(400); res.end(JSON.stringify({ error: 'text required' })); return; }

      // If ELEVENLABS_API_KEY is set, use ElevenLabs
      if (process.env.ELEVENLABS_API_KEY) {
        const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + (voice_id || '21m00Tcm4TlvDq8ikGAM'), {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': process.env.ELEVENLABS_API_KEY,
          },
          body: JSON.stringify({ text, voice_settings: { stability: 0.5, similarity_boost: 0.75 } }),
        });
        if (response.ok) {
          const buffer = await response.buffer();
          res.writeHead(200, { 'Content-Type': 'audio/mpeg' });
          res.end(buffer);
          return;
        }
      }

      // Fallback: return demo audio URL
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        demo: true,
        message: 'Configure ELEVENLABS_API_KEY for real TTS',
        audio_url: null,
        text_length: text.length,
      }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
  });
}

// SMS endpoint — uses Twilio
async function handleSMS(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', async () => {
    try {
      const { to, message } = JSON.parse(body);
      if (!to || !message) { res.writeHead(400); res.end(JSON.stringify({ error: 'to and message required' })); return; }

      if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_PHONE_NUMBER) {
        const auth = Buffer.from(TWILIO_ACCOUNT_SID + ':' + TWILIO_AUTH_TOKEN).toString('base64');
        const twilioRes = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + auth,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ To: to, From: TWILIO_PHONE_NUMBER, Body: message }).toString(),
        });
        const data = await twilioRes.json();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, sid: data.sid, status: data.status }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          demo: true,
          message: 'SMS sent (demo mode — configure Twilio credentials)',
          to, message: message.substring(0, 50) + '...',
        }));
      }
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
  });
}

// WhatsApp webhook — echo + booking flow
async function handleWhatsApp(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const params = new URLSearchParams(body);
    const from = params.get('From') || '';
    const bodyText = params.get('Body') || '';

    // Simple booking flow state machine
    const states = ['greeting', 'treatment', 'date', 'confirm'];
    const responses = {
      greeting: `🤖 *LAISA SafeSight Bot*\n\nWelcome! I'm Charlie, your AI booking assistant.\n\nWhat treatment are you interested in?\n\n1️⃣ Botulinum (Botox)\n2️⃣ Fillers\n3️⃣ Skin Rejuvenation\n4️⃣ Other`,
      treatment: `Great choice! 📅\n\nWhen would you like to book?\n\nPlease reply with your preferred date and time.`,
      date: `✅ *Almost done!*\n\nWe'll confirm your appointment within 2 hours.\n\nWould you like to add a WhatsApp reminder? (yes/no)`,
      confirm: `🎉 *Booking Received!*\n\nYour request has been sent to our team.\nWe'll confirm your appointment shortly.\n\n📍 SafeSight Aesthetic Clinic\nQuestions? Reply to this message.`,
    };

    let state = 'greeting';
    if (bodyText.toLowerCase().includes('botox') || bodyText === '1') state = 'treatment';
    else if (bodyText.match(/\d{4}/)) state = 'date';
    else if (bodyText.toLowerCase().includes('yes')) state = 'confirm';

    const reply = responses[state] || responses.greeting;

    if (params.get('hub.mode')) {
      // WhatsApp webhook verification
      res.writeHead(200);
      res.end(params.get('hub.challenge'));
    } else {
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(`<Response><Message>${reply}</Message></Response>`);
    }
  });
}

// Composio social metrics endpoint
async function handleComposioSocial(req, res) {
  if (COMPOSIO_API_KEY) {
    try {
      const response = await fetch('https://api.composio.io/v1/actions/instagram_profile_info', {
        headers: { 'x-api-key': COMPOSIO_API_KEY },
      });
      const data = await response.json();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
  } else {
    // Return demo data
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      demo: true,
      instagram: { followers: 12453, following: 892, posts: 156, engagement: 4.8 },
      tiktok: { followers: 8932, views: 1245300, likes: 89520 },
      facebook: { followers: 4521, engagement: 2.3 },
    }));
  }
}

// Main server
const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }

  // API routes
  if (pathname === '/api/tts' && req.method === 'POST') return handleTTS(req, res);
  if (pathname === '/api/sms' && req.method === 'POST') return handleSMS(req, res);
  if (pathname === '/api/whatsapp' && req.method === 'POST') return handleWhatsApp(req, res);
  if (pathname === '/api/social' && req.method === 'GET') return handleComposioSocial(req, res);
  if (pathname === '/api/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'LAISA Agent OS API', version: '1.0.0' }));
    return;
  }

  // Static files
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = filePath.replace(/\?.*$/, '');
  serveStatic(req, res, filePath);
});

server.listen(PORT, () => {
  console.log(`\n🤖 LAISA Agent OS — Demo API Server`);
  console.log(`   Running on: http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   TTS: POST /api/tts { text, voice_id }`);
  console.log(`   SMS: POST /api/sms { to, message }`);
  console.log(`   WhatsApp: POST /api/whatsapp`);
  console.log(`   Social: GET /api/social\n`);
});

module.exports = server;