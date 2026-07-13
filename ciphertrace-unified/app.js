// app.js — Vanilla JS React-free version
// All data and components in pure JS

const CLIENTS = [
  { id:'laisa', name:'LAISA Aesthetic Clinic', vm:'LAISA-VM-01', live:true, agents:6, uptime:'99.7%', since:'June 2026', tagline:'Phase A — Agent OS + WhatsApp CRM + Booking', metrics:'R350K build + R55K/month · 247 beds', color:'#22c55e', bg:'#f0fdf4', border:'#bbf7d0', icon:'🏥', agent:'Dr. Musa + 6 AI Agents' },
  { id:'safe', name:'SafeSight Aesthetic Clinic', vm:'SAFE-VM-01', live:false, agents:3, uptime:'Demo', since:'June 2026', tagline:'Primary demo client — Agent OS showcase', metrics:'R1,499/month · Proposal pending', color:'#ec4899', bg:'#fdf2f8', border:'#fce7f3', icon:'🛡️', agent:'Demo Agent OS' },
  { id:'pharma', name:'Pharmasyntez Russia', vm:'PHARMA-VM-GLOBAL', live:true, agents:4, uptime:'98.2%', since:'Jan 2026', tagline:'Anti-TB, HIV, oncology distribution across Africa', metrics:'R2.99M Y1 pipeline · SAHPRA licensed', color:'#8b5cf6', bg:'#f5f3ff', border:'#ddd6fe', icon:'💊', agent:'Studex Global Markets Agent' },
  { id:'rt', name:'Red Team Agent', vm:'RT-VM-SENTINEL', live:true, agents:16, uptime:'24/7', since:'July 2026', tagline:'Autonomous pen testing + AI Trust Monitor', metrics:'R45K/month · 16 specialist agents', color:'#ef4444', bg:'#fef2f2', border:'#fecaca', icon:'🔴', agent:'16 Cybersecurity AI Agents' },
];

const PRODUCTS = [
  { id:'laisa-os', name:'LAISA Agent OS', tagline:'AI Agent OS for Aesthetic Clinics', price:'R350K + R55K/month', color:'#22c55e', bg:'#f0fdf4', border:'#bbf7d0', icon:'🏥',
    features:['WhatsApp CRM + Booking','6 specialist AI agents','Dashboard + reporting','Email + social automation','Notion CRM integration','VoiceBox AI'] },
  { id:'dark-factory', name:'Dark Factory BMAD', tagline:'Build Me A Dashboard — R29 per product', price:'R29 per product', color:'#22c55e', bg:'#f0fdf4', border:'#bbf7d0', icon:'🏭',
    features:['Voice note → PRD pipeline','CodeRabbit review every PR','Auto-deploy to Vercel','Multi-agent build team','48hr delivery','Dark Factory VM included'] },
  { id:'red-team', name:'Red Team Agent', tagline:'Cybersecurity AI VM', price:'From R25K/month', color:'#ec4899', bg:'#fdf2f8', border:'#fce7f3', icon:'🛡️',
    features:['16 specialist AI agents','Autonomous pen testing','AI Trust Monitor','Purple Team loop','POPIA compliance','MITRE ATT\u0026CK mapped'] },
  { id:'vm-base', name:'VM Base Package', tagline:'Your own isolated AI agent VM', price:'R599/month', color:'#0ea5e9', bg:'#f0f9ff', border:'#bae6fd', icon:'🖥️',
    features:['Isolated VM environment','Up to 6 AI agents','Dashboard access','WhatsApp integration','Email integration','24/7 uptime'] },
];

const ECOSYSTEM = [
  { n:'Studex Meat', s:'Premium Wagyu · 50+ restaurants', c:'#22c55e' },
  { n:'StudEx Enterprise', s:'Cloud FinOps · AWS + Google Partner', c:'#3b82f6' },
  { n:'StudEx Wild Life', s:'Blockchain · IBM + Cardano', c:'#ec4899' },
  { n:'Dark Factory', s:'AI Agent Factory · CipherTr@ce CEO', c:'#0f172a' },
];

const TIMELINE = [
  { y:'2009', e:"McDonald's SA batch cooker, age 18" },
  { y:'2011', e:'Founded Studex Meat at age 20' },
  { y:'2016', e:'MSc International Business, Hult Business School' },
  { y:'2019', e:'AWS + Google Cloud partnerships signed' },
  { y:'2019', e:'IBM + Cardano wildlife blockchain confirmed' },
  { y:'2020', e:"ITWeb: \"SA's First Son looks to cut cloud costs\"" },
  { y:'2020', e:'GQ SA: "Changing the nature of conservation"' },
  { y:'2026', e:'Dark Factory + CipherTr\u0040ce CEO — fully operational' },
];

// === STATE ===
let state = {
  prdOpen: false,
  step: 1,
  form: { name:'', company:'', email:'', projectName:'', type:'', problem:'', budget:'', timeline:'', voiceNote:null },
  recording: false,
  mediaRecorder: null,
  voiceChunks: [],
  seconds: 0,
  timer: null,
  submitting: false,
  done: false,
  refId: '',
};

// === NODE CANVAS ===
function startCanvas() {
  const canvas = document.getElementById('nodeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = 400; canvas.height = 320;
  const nodes = Array.from({length:14}, () => ({
    x: Math.random() * 400, y: Math.random() * 320,
    vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2.5 + 1, p: Math.random() * Math.PI * 2
  }));
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, 400, 320);
    frame += 0.004;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(34,197,94,${(1 - d / 100) * 0.22})`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      n.x += n.vx + Math.sin(frame + n.y * 0.003) * 0.25;
      n.y += n.vy + Math.cos(frame + n.x * 0.003) * 0.25;
      if (n.x < 0) n.x = 400; if (n.x > 400) n.x = 0;
      if (n.y < 0) n.y = 320; if (n.y > 320) n.y = 0;
      const b = 0.45 + Math.sin(frame * 1.5 + n.p) * 0.3;
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3.5);
      g.addColorStop(0, `rgba(74,222,128,${b})`);
      g.addColorStop(0.4, `rgba(34,197,94,${b * 0.6})`);
      g.addColorStop(1, 'rgba(34,197,94,0)');
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(150,255,180,${b})`; ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// === CLIENT CARDS ===
function clientCard(c) {
  const liveClass = c.live ? 'live-tag live-tag--live' : 'live-tag live-tag--demo';
  const liveText = c.live ? 'LIVE' : 'DEMO';
  return `
    <div class="card" style="border-color:${c.border}">
      <div class="card__stripe" style="background:${c.color}"></div>
      <div class="card__body">
        <div class="card__header">
          <div class="card__id">
            <div class="card__icon" style="background:${c.bg}">${c.icon}</div>
            <div>
              <div class="card__name">${c.name}</div>
              <div class="card__vm" style="color:${c.color}">${c.vm}</div>
            </div>
          </div>
          <span class="${liveClass}">${liveText}</span>
        </div>
        <p class="card__tagline">${c.tagline}</p>
        <div class="card__metrics" style="background:${c.bg}">
          <div class="card__metrics-grid">
            <div><div class="card__metric-value" style="color:${c.color}">${c.agents}</div><div class="card__metric-label">Agents</div></div>
            <div><div class="card__metric-value" style="color:${c.color}">${c.uptime}</div><div class="card__metric-label">Uptime</div></div>
            <div><div class="card__metric-value" style="color:${c.color};font-size:0.85rem">${c.since}</div><div class="card__metric-label">Since</div></div>
          </div>
        </div>
        <div class="card__agent">${c.agent}</div>
      </div>
      <div class="card__footer" style="background:${c.bg};border-top:1px solid ${c.border}">
        <span class="card__footer-text">${c.metrics}</span>
      </div>
    </div>`;
}

// === PRODUCT CARDS ===
function productCard(p) {
  const feats = p.features.map(f => `<li class="pcard__feature"><span class="pcard__check">✓</span>${f}</li>`).join('');
  return `
    <div class="pcard" style="border-color:${p.border}">
      <div class="pcard__stripe" style="background:${p.color}"></div>
      <div class="pcard__body">
        <div class="pcard__header">
          <div class="pcard__icon" style="background:${p.bg}">${p.icon}</div>
          <span class="pcard__live" style="background:${p.bg};color:${p.color};border:1px solid ${p.border}">LIVE</span>
        </div>
        <h3 class="pcard__name">${p.name}</h3>
        <p class="pcard__tagline">${p.tagline}</p>
        <div class="pcard__price" style="color:${p.color}">${p.price}</div>
        <ul class="pcard__features">${feats}</ul>
        <button class="btn btn--green" style="width:100%;justify-content:center" onclick="openPRD()">Get Started →</button>
      </div>
    </div>`;
}

// === STEPPER ===
function stepper() {
  const steps = ['Contact', 'Project', 'Assets', 'Review'];
  return steps.map((s, i) => {
    const n = i + 1;
    const isActive = n === state.step;
    const isDone = n < state.step;
    const cls = isDone ? 'step__circle step__circle--done' : isActive ? 'step__circle step__circle--active' : 'step__circle';
    const lcls = isActive ? 'step__label step__label--active' : 'step__label';
    const lineCls = isDone ? 'step__line step__line--done' : 'step__line';
    const line = i < 3 ? `<div class="${lineCls}"></div>` : '';
    const check = isDone ? '✓' : n;
    return `<div class="step">${line}<div class="${cls}">${check}</div><span class="${lcls}">${s}</span></div>`;
  }).join('');
}

// === VOICE RECORDING ===
async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const m = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    state.voiceChunks = [];
    m.ondataavailable = e => { if (e.data.size > 0) state.voiceChunks.push(e.data); };
    m.onstop = () => {
      const b = new Blob(state.voiceChunks, { type: 'audio/webm' });
      state.form.voiceNote = new File([b], 'voice-brief.webm');
      stream.getTracks().forEach(t => t.stop());
      renderModal();
    };
    m.start();
    state.mediaRecorder = m;
    state.recording = true;
    state.seconds = 0;
    state.timer = setInterval(() => { state.seconds++; renderModal(); }, 1000);
    renderModal();
  } catch (e) {
    alert('Microphone access denied. Please allow mic access to record voice notes.');
  }
}

function stopRecording() {
  if (state.mediaRecorder) state.mediaRecorder.stop();
  state.recording = false;
  if (state.timer) clearInterval(state.timer);
}

// === FORM FIELDS ===
function fmtTime(s) { return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; }

function step1() {
  return `
    <div class="field">
      <label class="field__label">Full Name *</label>
      <input class="field__input" type="text" placeholder="Tumelo Ramaphosa" value="${state.form.name}"
        oninput="state.form.name=this.value;validate1()" id="fname" />
    </div>
    <div class="field">
      <label class="field__label">Company</label>
      <input class="field__input" type="text" placeholder="Studex Group" value="${state.form.company}"
        oninput="state.form.name=this.value" />
    </div>
    <div class="field">
      <label class="field__label">Email *</label>
      <input class="field__input" type="email" placeholder="you@company.co.za" value="${state.form.email}"
        oninput="state.form.email=this.value;validate1()" id="femail" />
    </div>
    <div class="cta-bar cta-bar--right">
      <button class="btn btn--green" id="next1" onclick="go(2)" disabled style="opacity:0.4;cursor:not-allowed">Project Details →</button>
    </div>`;
}

function step2() {
  const types = ['AI Agent', 'Website', 'Mobile App', 'Dashboard', 'E-Commerce', 'Automation', 'Other'];
  const typePills = types.map(t =>
    `<button class="pill ${state.form.type === t ? 'pill--active' : ''}" onclick="state.form.type='${t}';renderModal()">${t}</button>`
  ).join('');
  return `
    <div class="field">
      <label class="field__label">Project Name *</label>
      <input class="field__input" type="text" placeholder="e.g. LAISA Agent OS, SafeSight CRM" value="${state.form.projectName}"
        oninput="state.form.projectName=this.value" />
    </div>
    <div class="field">
      <label class="field__label">Project Type</label>
      <div class="field__pills">${typePills}</div>
    </div>
    <div class="field">
      <label class="field__label">Problem Statement *</label>
      <textarea class="field__input field__input--textarea" placeholder="What problem are you solving?" rows="3"
        oninput="state.form.problem=this.value">${state.form.problem}</textarea>
    </div>
    <div class="field__grid">
      <div class="field">
        <label class="field__label">Budget</label>
        <select class="field__input field__input--select" onchange="state.form.budget=this.value">
          <option value="">— Select —</option>
          <option>R5K – R15K</option><option>R15K – R50K</option><option>R50K – R150K</option><option>R150K – R350K</option><option>R350K+</option>
        </select>
      </div>
      <div class="field">
        <label class="field__label">Timeline</label>
        <select class="field__input field__input--select" onchange="state.form.timeline=this.value">
          <option value="">— Select —</option>
          <option>ASAP</option><option>Within 2 weeks</option><option>Within 1 month</option><option>1–3 months</option>
        </select>
      </div>
    </div>
    <div class="cta-bar">
      <button class="btn btn--outline" onclick="go(1)">← Back</button>
      <button class="btn btn--green" onclick="go(3)">Voice Note →</button>
    </div>`;
}

function step3() {
  const vbCls = state.recording ? 'voice-box voice-box--recording' : 'voice-box';
  const btnCls = state.recording ? 'voice-btn voice-btn--recording' : 'voice-btn';
  const lblCls = state.recording ? 'voice-label voice-label--recording' : 'voice-label';
  const micIcon = state.recording ?
    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><rect x="6" y="6" width="12" height="12" rx="2"/><line x1="4" y1="10" x2="4" y2="16"/><line x1="20" y1="10" x2="20" y2="16"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>` :
    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`;
  const vnStatus = state.form.voiceNote ? `<span style="color:#22c55e;font-weight:700">✓ Voice note ready — ${state.form.voiceNote.name}</span>` :
    '<span style="color:var(--t3)">Talk through your idea — 2 to 5 minutes</span>';
  return `
    <div class="${vbCls}" onclick="${state.recording ? 'stopRecording()' : 'startRecording()'}">
      <button class="${btnCls}" type="button" onclick="event.stopPropagation();${state.recording ? 'stopRecording()' : 'startRecording()'}">
        ${micIcon}
      </button>
      <div class="${lblCls}">${state.recording ? `Recording... ${fmtTime(state.seconds)}` : 'Tap to record a voice brief'}</div>
      <div class="voice-sub">${vnStatus}</div>
    </div>
    <div class="cta-bar">
      <button class="btn btn--outline" onclick="go(2)">← Back</button>
      <button class="btn btn--green" onclick="go(4)">Review →</button>
    </div>`;
}

function step4() {
  if (state.submitting) {
    return `<div style="text-align:center;padding:2rem 0">
      <div style="width:40px;height:40px;border:3px solid rgba(34,197,94,.2);border-top-color:#22c55e;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 1rem"></div>
      <p style="font-weight:700">Submitting your PRD...</p>
    </div>`;
  }
  const rows = [
    ['Name', state.form.name || '—'],
    ['Company', state.form.company || '—'],
    ['Email', state.form.email || '—'],
    ['Project', state.form.projectName || '—'],
    ['Type', state.form.type || '—'],
    ['Problem', state.form.problem ? state.form.problem.substring(0, 60) + (state.form.problem.length > 60 ? '...' : '') : '—'],
    ['Voice', state.form.voiceNote ? '✓ Voice note attached' : '— No voice note'],
  ];
  const reviewRows = rows.map(([k, v]) => `<div class="review-row"><span class="review-key">${k}</span><span class="review-val">${v}</span></div>`).join('');
  return `
    <div class="review-grid">${reviewRows}</div>
    <div class="cta-bar">
      <button class="btn btn--outline" onclick="go(3)">← Back</button>
      <button class="btn btn--green" onclick="submitPRD()">Submit PRD →</button>
    </div>`;
}

function successPage() {
  return `
    <div class="success-page">
      <div class="success-icon">✓</div>
      <div class="success-title">PRD Submitted!</div>
      <p class="success-desc">Your brief is in. Our team will review it personally and be in touch within 24 hours.</p>
      <div class="success-ref">${state.refId}</div>
      <br>
      <button class="btn btn--green" onclick="closePRD()">Close</button>
    </div>`;
}

// === NAVIGATION ===
function go(n) { state.step = n; renderModal(); }

function validate1() {
  setTimeout(() => {
    const btn = document.getElementById('next1');
    if (btn) {
      const valid = state.form.name && state.form.email;
      btn.disabled = !valid;
      btn.style.opacity = valid ? '1' : '0.4';
      btn.style.cursor = valid ? 'pointer' : 'not-allowed';
    }
  }, 50);
}

// === SUBMIT ===
async function submitPRD() {
  state.submitting = true;
  renderModal();
  await new Promise(r => setTimeout(r, 1800));
  state.refId = 'PRD-' + Date.now().toString(36).toUpperCase();
  state.done = true;
  state.submitting = false;
  renderModal();
}

// === MODAL RENDER ===
function renderModal() {
  const modal = document.getElementById('prdModal');
  if (!modal) return;
  if (!state.prdOpen) { modal.style.display = 'none'; return; }
  modal.style.display = 'flex';

  const titleEl = document.getElementById('modalTitle');
  const stepperEl = document.getElementById('modalStepper');
  const bodyEl = document.getElementById('modalBody');

  if (titleEl) titleEl.textContent = state.done ? 'PRD Received!' : 'Drop a PRD';
  if (stepperEl) stepperEl.innerHTML = state.done ? '' : stepper();

  let body = '';
  if (state.done) {
    body = successPage();
  } else {
    const stepTitles = ['', 'Who are you?', 'What are we building?', 'Attach your assets', 'Review your PRD'];
    body = `
      <h3 style="font-weight:800;margin-bottom:4px">${stepTitles[state.step]}</h3>
      <p style="font-size:.875rem;color:var(--t2);margin-bottom:1.5rem">${['', 'Tell us about yourself.', 'Describe your project clearly.', 'Voice note or documents — everything scanned before we open it.', 'Make sure everything looks right.'][state.step]}</p>
      ${[step1, step2, step3, step4][state.step - 1]()}
    `;
  }
  if (bodyEl) bodyEl.innerHTML = body;
}

function openPRD() { state.prdOpen = true; state.step = 1; state.done = false; state.submitting = false; renderModal(); }
function closePRD() { state.prdOpen = false; renderModal(); }

// === SECTIONS ===
function render() {
  const clientsGrid = document.getElementById('clientsGrid');
  const productsGrid = document.getElementById('productsGrid');
  if (clientsGrid) clientsGrid.innerHTML = CLIENTS.map(clientCard).join('');
  if (productsGrid) productsGrid.innerHTML = PRODUCTS.map(productCard).join('');
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  render();
  startCanvas();

  // Ecosystem
  const ecoEl = document.getElementById('ecosystemList');
  if (ecoEl) {
    ecoEl.innerHTML = ECOSYSTEM.map(e => `
      <div class="eci">
        <div class="ec-dot" style="background:${e.c}"></div>
        <div>
          <div class="ec-name">${e.n}</div>
          <div class="ec-desc">${e.s}</div>
        </div>
      </div>`).join('');
  }

  // Timeline
  const tlEl = document.getElementById('timelineList');
  if (tlEl) {
    tlEl.innerHTML = TIMELINE.map(t => `
      <div class="tli">
        <div class="tld"></div>
        <div class="tly">${t.y}</div>
        <div class="tle">${t.e}</div>
      </div>`).join('');
  }
});

// Close modal on overlay click
document.addEventListener('click', e => {
  if (e.target.id === 'prdModal') closePRD();
});
