/**
 * OGRE Content Hub — Web Upload Server
 * Drop zone: Tumelo drops files → gets CDN URL → paste into Dark Factory
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 3098;
const UPLOAD_DIR = '/workspace/user-content';
const MAX_SIZE = 100 * 1024 * 1024; // 100MB

// MIME types we support
const ALLOWED = {
  'image/jpeg': 'jpg', 'image/png': 'png', 'image/gif': 'gif',
  'image/webp': 'webp', 'image/svg+xml': 'svg',
  'video/mp4': 'mp4', 'video/webm': 'webm',
  'application/pdf': 'pdf',
};

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>OGRE Content Hub</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0a0a;color:#f0f0f0;font-family:system-ui,sans-serif;min-height:100vh}
header{background:linear-gradient(135deg,#ff6b00,#ff8c00);padding:20px 32px;display:flex;align-items:center;gap:12px}
header h1{font-size:20px;font-weight:900;letter-spacing:-0.5px}
header span{font-size:12px;opacity:0.85;font-family:monospace}
.dropzone{border:2px dashed #ff6b00;border-radius:16px;margin:32px auto;max-width:720px;
  padding:64px 32px;text-align:center;cursor:pointer;transition:all 0.2s;background:#111}
.dropzone.dragover{border-color:#ffaa00;background:rgba(255,107,0,0.08);transform:scale(1.01)}
.dropzone:hover{border-color:#ff8c00;background:rgba(255,107,0,0.04)}
.dropzone .icon{font-size:48px;margin-bottom:16px}
.dropzone h2{font-size:18px;font-weight:700;margin-bottom:8px}
.dropzone p{color:#888;font-size:13px;line-height:1.6}
.dropzone .formats{color:#555;font-size:11px;margin-top:12px;font-family:monospace}
.dropzone input[type=file]{display:none}
.grid{max-width:720px;margin:0 auto 48px;padding:0 32px}
.grid h3{font-size:13px;color:#555;text-transform:uppercase;letter-spacing:1px;margin:24px 0 12px}
.file-card{display:flex;align-items:center;gap:12px;padding:12px 16px;
  background:#111;border:1px solid #222;border-radius:10px;margin-bottom:8px}
.file-card .thumb{width:40px;height:40px;border-radius:6px;background:#1a1a1a;
  display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.file-card .info{flex:1;min-width:0}
.file-card .name{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.file-card .meta{font-size:11px;color:#555;margin-top:2px}
.file-card .url-box{width:100%;padding:6px 10px;background:#0a0a0a;border:1px solid #333;
  border-radius:6px;color:#aaa;font-size:11px;font-family:monospace;margin-top:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.file-card .copy{background:#ff6b00;border:none;color:#fff;font-size:11px;font-weight:700;
  padding:6px 12px;border-radius:6px;cursor:pointer;flex-shrink:0}
.file-card .copy:hover{background:#ff8c00}
.file-card .del{background:transparent;border:1px solid #333;color:#555;font-size:11px;
  padding:6px 10px;border-radius:6px;cursor:pointer;flex-shrink:0}
.file-card .del:hover{background:#300;color:#f88}
.msg{position:fixed;bottom:24px;right:24px;background:#ff6b00;color:#fff;
  padding:12px 20px;border-radius:10px;font-size:13px;font-weight:600;
  opacity:0;transition:opacity 0.3s;pointer-events:none}
.msg.show{opacity:1}
.footer{text-align:center;color:#333;font-size:11px;padding:24px}
</style>
</head>
<body>
<header>
  <h1>🏭 OGRE Content Hub</h1>
  <span>/workspace/user-content/</span>
</header>

<div class="dropzone" id="dz">
  <div class="icon">📁</div>
  <h2>Drop images & videos here</h2>
  <p>or click to browse your files<br/>Files go live on CDN immediately</p>
  <p class="formats">jpg · png · webp · gif · svg · mp4 · webm · pdf · max 100MB</p>
  <input type="file" id="fileInput" multiple accept="image/*,video/*,.pdf"/>
</div>

<div class="grid" id="fileList"><h3>📎 Uploaded Files</h3></div>
<div class="msg" id="msg"></div>
<div class="footer">OGRE Content Hub · Dark Factory · Studex Group</div>

<script>
const dz = document.getElementById('dz');
const fi = document.getElementById('fileInput');
const list = document.getElementById('fileList');
const msg = document.getElementById('msg');

function showMsg(text) {
  msg.textContent = text; msg.classList.add('show');
  setTimeout(() => msg.classList.remove('show'), 2500);
}

dz.addEventListener('click', () => fi.click());
dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('dragover'); });
dz.addEventListener('dragleave', () => dz.classList.remove('dragover'));
dz.addEventListener('drop', e => { e.preventDefault(); dz.classList.remove('dragover'); fi.files = e.dataTransfer.files; if(fi.files.length) upload(fi.files); });
fi.addEventListener('change', () => { if(fi.files.length) upload(fi.files); });

async function upload(files) {
  for (const file of files) {
    const form = new FormData();
    form.append('file', file);
    try {
      const r = await fetch('/upload', { method: 'POST', body: form });
      const j = await r.json();
      if (j.cdn_url) {
        addCard(file.name, j.cdn_url, j.thumb_url || j.cdn_url, file.type);
        showMsg('✅ ' + file.name + ' uploaded!');
      } else {
        showMsg('❌ ' + (j.error || 'Upload failed'));
      }
    } catch(e) { showMsg('❌ Upload error: ' + e.message); }
  }
  fi.value = '';
}

function addCard(name, url, thumb, type) {
  const isImg = type.startsWith('image/');
  const div = document.createElement('div');
  div.className = 'file-card';
  div.innerHTML = \`
    <div class="thumb">\${isImg ? '<img src="'+thumb+'" style="width:40px;height:40px;object-fit:cover;border-radius:6px"/>' : '🎬'}</div>
    <div class="info">
      <div class="name">\${name}</div>
      <div class="url-box" id="url-\${Date.now()}">\${url}</div>
    </div>
    <button class="copy" onclick="copyUrl('\${url}')">Copy URL</button>
    <button class="del" onclick="delFile('\${name}',this)">✕</button>
  \`;
  // insert after the h3
  const h3 = list.querySelector('h3');
  h3.insertAdjacentElement('afterend', div);
}

window.copyUrl = function(url) {
  navigator.clipboard.writeText(url).then(() => showMsg('📋 URL copied!'));
};

window.delFile = async function(name, btn) {
  if (!confirm('Delete ' + name + '?')) return;
  await fetch('/delete/' + encodeURIComponent(name), {method:'DELETE'});
  btn.closest('.file-card').remove();
  showMsg('🗑 ' + name + ' deleted');
};

// Load existing files on page load
fetch('/files').then(r=>r.json()).then(files => {
  files.forEach(f => addCard(f.name, f.cdn_url, f.thumb_url || f.cdn_url, f.type));
});
</script>
</body>
</html>`;

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  // Serve HTML
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(HTML); return;
  }

  // List uploaded files
  if (req.url === '/files' && req.method === 'GET') {
    try {
      const files = fs.readdirSync(UPLOAD_DIR).map(name => {
        const p = path.join(UPLOAD_DIR, name);
        const stat = fs.statSync(p);
        const cdn = 'https://cdn.ogre.studex-group.com/' + name;
        return { name, cdn_url: cdn, type: 'application/octet-stream', size: stat.size };
      });
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(files));
    } catch(e) { res.writeHead(500); res.end(JSON.stringify({error: e.message})); }
    return;
  }

  // Upload file
  if (req.url === '/upload' && req.method === 'POST') {
    let body = [];
    await new Promise((resolve, reject) => {
      req.on('data', c => body.push(c));
      req.on('end', resolve);
      req.on('error', reject);
    });
    const raw = Buffer.concat(body);
    if (raw.length > MAX_SIZE) {
      res.writeHead(413, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({error: 'File too large (max 100MB)'})); return;
    }

    // Parse multipart boundary
    const boundary = req.headers['content-type'].split('boundary=')[1];
    if (!boundary) { res.writeHead(400); res.end('Missing boundary'); return; }

    const parts = raw.toString('binary').split('--' + boundary);
    for (const part of parts) {
      if (!part.includes('filename=')) continue;
      const headerEnd = part.indexOf('\r\n\r\n');
      const header = part.slice(0, headerEnd);
      const filename = header.match(/filename="([^"]+)"/)?.[1];
      if (!filename) continue;
      const contentType = header.match(/Content-Type: ([^\r\n]+)/)?.[1] || 'application/octet-stream';
      if (!ALLOWED[contentType] && !contentType.startsWith('image/') && !contentType.startsWith('video/')) {
        res.writeHead(415, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error: 'Unsupported file type: ' + contentType})); return;
      }
      const ext = ALLOWED[contentType] || filename.split('.').pop();
      const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
      const destName = Date.now() + '-' + safeName;
      const destPath = path.join(UPLOAD_DIR, destName);
      const fileContent = part.slice(headerEnd + 4, part.lastIndexOf('\r\n'));
      fs.writeFileSync(destPath, fileContent, 'binary');
      const cdn_url = 'https://cdn.ogre.studex-group.com/' + destName;
      const thumb_url = contentType.startsWith('image/') ? cdn_url : null;
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ cdn_url, thumb_url, name: destName, size: fileContent.length }));
    }
    return;
  }

  // Delete file
  const deleteMatch = req.url.match(/^\/delete\/(.+)$/);
  if (deleteMatch && req.method === 'DELETE') {
    const name = decodeURIComponent(deleteMatch[1]);
    const filePath = path.join(UPLOAD_DIR, name);
    if (fs.existsSync(filePath)) { fs.unlinkSync(filePath); }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ok: true}));
    return;
  }

  res.writeHead(404); res.end();
});

fs.mkdirSync(UPLOAD_DIR, {recursive: true});
server.listen(PORT, '0.0.0.0', () => {
  console.log('🏭 OGRE Content Hub running on http://localhost:' + PORT);
  console.log('📁 Upload dir: ' + UPLOAD_DIR);
});
