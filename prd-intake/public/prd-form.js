// Dark Factory PRD Intake — prd-form.js
'use strict';

// ── API Configuration ─────────────────────────────────────────────────────────
// In development (same server): uses relative URLs
// In production: set window.API_BASE to your deployed server URL
// e.g. window.API_BASE = 'https://prd-intake.onrender.com';
window.API_BASE = window.API_BASE || '';

// ── Helpers ──────────────────────────────────────────────────────────────────
function apiUrl(path) { return window.API_BASE + path; }

// ── State ────────────────────────────────────────────────────────────────
const S = {
  step: 1,
  vblob: null,
  vname: null,
  fblob: null,
  fname: null,
  linkScanned: false,
  linkSafe: false,
  fileScan: null,
  voiceScan: null,
  rec: false,
  mr: null,
  chunks: [],
  timer: null,
  secs: 0,
};

// ── Navigation ───────────────────────────────────────────────────────────
function goStep(n) {
  if (S.step === 1 && n === 2 && !validate(['f-name', 'f-email'])) return;
  if (S.step === 2 && n === 3 && !validate(['f-projectName', 'f-problem', 'f-budget', 'f-timeline'])) return;
  document.getElementById('step-' + S.step).classList.remove('active');
  document.getElementById('step-' + n).classList.add('active');
  S.step = n;
  updateStepper();
  if (n === 4) buildReview();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validate(ids) {
  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
      el.style.borderColor = 'var(--red)';
      setTimeout(function () { el.style.borderColor = ''; }, 2000);
      return false;
    }
  }
  return true;
}

function updateStepper() {
  for (let i = 1; i <= 4; i++) {
    const c = document.getElementById('sc' + i);
    const l = document.getElementById('sl' + i);
    if (i < S.step) {
      c.className = 'step-circle done';
      c.textContent = '\u2713';
      l.className = 'step-label';
    } else if (i === S.step) {
      c.className = 'step-circle active';
      c.textContent = i;
      l.className = 'step-label active';
    } else {
      c.className = 'step-circle';
      c.textContent = i;
      l.className = 'step-label';
    }
  }
  for (let i = 1; i <= 3; i++) {
    const c = document.getElementById('c' + i);
    c.className = i < S.step ? 'step-connector done' : 'step-connector';
  }
}

// ── Pills ────────────────────────────────────────────────────────────────
function pickPill(el) {
  document.querySelectorAll('#pt-group .pill-option').forEach(function (p) {
    p.classList.remove('selected');
  });
  el.classList.add('selected');
  el.querySelector('input').checked = true;
}

// ── Voice Recording ───────────────────────────────────────────────────────
async function toggleVoice() {
  const rec = document.getElementById('v-rec');
  const btn = document.getElementById('v-btn');
  const instr = document.getElementById('v-instr');
  const hint = document.getElementById('v-hint');
  const timer = document.getElementById('v-timer');

  if (S.rec) {
    S.mr.stop();
    S.rec = false;
    btn.classList.remove('recording');
    rec.classList.remove('recording');
    clearInterval(S.timer);
    return;
  }

  try {
    var stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    S.mr = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    S.chunks = [];
    S.mr.ondataavailable = function (e) {
      if (e.data.size > 0) S.chunks.push(e.data);
    };
    S.mr.onstop = function () {
      S.vblob = new Blob(S.chunks, { type: 'audio/webm' });
      var name = 'voice-brief-' + Date.now() + '.webm';
      S.vname = name;
      document.getElementById('v-name').textContent = name;
      document.getElementById('v-rec-box').style.display = 'flex';
      instr.textContent = 'Voice brief recorded!';
      hint.style.display = 'none';
      timer.style.display = 'none';
      stream.getTracks().forEach(function (t) { t.stop(); });
      uploadVoice(S.vblob, name);
    };
    S.mr.start();
    S.rec = true;
    btn.classList.add('recording');
    rec.classList.add('recording');
    instr.textContent = 'Recording... Tap to stop';
    hint.style.display = 'none';
    timer.style.display = 'block';
    S.secs = 0;
    timer.textContent = '00:00';
    S.timer = setInterval(function () {
      S.secs++;
      var m = Math.floor(S.secs / 60).toString().padStart(2, '0');
      var s = (S.secs % 60).toString().padStart(2, '0');
      timer.textContent = m + ':' + s;
    }, 1000);
  } catch (err) {
    instr.textContent = 'Microphone access denied. Please allow mic access.';
    instr.style.color = 'var(--red)';
  }
}

function clearVoice() {
  S.vblob = null;
  S.vname = null;
  S.voiceScan = null;
  document.getElementById('v-rec-box').style.display = 'none';
  document.getElementById('v-instr').textContent = 'Tap to record a voice brief';
  document.getElementById('v-instr').style.color = 'var(--text2)';
  document.getElementById('v-hint').style.display = '';
  updateReviewScans();
}

async function uploadVoice(blob, name) {
  showBanner('scanning', '<div class="scan-spinner"></div> Scanning voice note...');
  var form = new FormData();
  form.append('file', blob, name);
  try {
    var res = await fetch(apiUrl('/api/prd/upload', { method: 'POST', body: form });
    var data = await res.json();
    S.voiceScan = data.file;
    if (data.scanPassed) {
      showBanner('safe', '\u2705 Voice note scanned \u2014 no threats detected');
    } else {
      showBanner('danger', '\u{1F6A8} Warning: Voice note flagged. Our team will review manually.');
    }
    updateReviewScans();
  } catch (e) {
    showBanner('scanning', '\u26A0\uFE0F Could not reach scan server. Submission will include manual review.');
  }
}

// ── File Upload ───────────────────────────────────────────────────────────
function handleFile(input) {
  var file = input.files[0];
  if (!file) return;
  S.fblob = file;
  S.fname = file.name;
  document.getElementById('fu-name').textContent = file.name;
  document.getElementById('fu-size').textContent = formatSize(file.size);
  document.getElementById('fu-box').style.display = 'flex';
  document.getElementById('dz').style.display = 'none';
  var scanStatus = document.getElementById('fu-scan');
  scanStatus.style.display = 'block';
  scanStatus.style.color = 'var(--accent)';
  scanStatus.textContent = '\u231B Scanning file for malware...';
  uploadDoc(file);
}

function clearFile() {
  S.fblob = null;
  S.fname = null;
  S.fileScan = null;
  document.getElementById('fu-box').style.display = 'none';
  document.getElementById('dz').style.display = 'block';
  document.getElementById('fu-scan').style.display = 'none';
  updateReviewScans();
}

async function uploadDoc(file) {
  var form = new FormData();
  form.append('file', file);
  try {
    var res = await fetch(apiUrl('/api/prd/upload', { method: 'POST', body: form });
    var data = await res.json();
    S.fileScan = data.file;
    var scanStatus = document.getElementById('fu-scan');
    if (data.scanPassed) {
      scanStatus.style.color = 'var(--green)';
      scanStatus.textContent = '\u2705 File scanned \u2014 no threats detected. Safe to open.';
    } else {
      scanStatus.style.color = 'var(--red)';
      scanStatus.textContent = '\u{1F6A8} File flagged. Our team will review before opening.';
    }
    updateReviewScans();
  } catch (e) {
    var scanStatus2 = document.getElementById('fu-scan');
    scanStatus2.style.color = 'var(--text3)';
    scanStatus2.textContent = '\u26A0\uFE0F Scan server unreachable. File included \u2014 manual review on receipt.';
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

// ── Link Scanner ─────────────────────────────────────────────────────────
async function doScanLink() {
  var url = document.getElementById('f-link').value.trim();
  if (!url) return;
  var btn = document.getElementById('scan-btn');
  var result = document.getElementById('link-result');
  btn.classList.add('scanning');
  btn.textContent = '...';
  result.style.display = 'flex';
  result.className = 'link-result pending';
  result.textContent = 'Checking URL reputation...';
  try {
    var res = await fetch(apiUrl('/api/prd/scan-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url }),
    });
    var data = await res.json();
    S.linkScanned = true;
    S.linkSafe = data.safe;
    if (data.safe) {
      result.className = 'link-result safe';
      result.innerHTML = '<span>\u2705</span> Link is safe \u2014 no malware detected';
    } else {
      result.className = 'link-result danger';
      result.innerHTML = '<span>\u{1F6A8}</span> Link flagged \u2014 our team will review manually before opening';
    }
    btn.classList.remove('scanning');
    btn.textContent = '\u2713';
    btn.style.color = S.linkSafe ? 'var(--green)' : 'var(--red)';
    updateReviewScans();
  } catch (e) {
    result.className = 'link-result pending';
    result.textContent = '\u26A0\uFE0F Could not scan link \u2014 our team will verify manually';
    btn.classList.remove('scanning');
    btn.textContent = '\u{1F50D} Scan';
  }
}

// ── Banner ────────────────────────────────────────────────────────────────
function showBanner(type, html) {
  var b = document.getElementById('top-banner');
  b.className = 'scan-banner ' + type;
  b.innerHTML = html;
  b.style.display = 'flex';
}

// ── Review ────────────────────────────────────────────────────────────────
function getFormData() {
  var pt = document.querySelector('#pt-group input:checked');
  return {
    name: document.getElementById('f-name').value.trim(),
    company: document.getElementById('f-company').value.trim(),
    email: document.getElementById('f-email').value.trim(),
    phone: document.getElementById('f-phone').value.trim(),
    source: document.getElementById('f-source').value,
    projectName: document.getElementById('f-projectName').value.trim(),
    projectType: pt ? pt.value : '',
    problem: document.getElementById('f-problem').value.trim(),
    goals: document.getElementById('f-goals').value.trim(),
    targetUsers: document.getElementById('f-targetUsers').value.trim(),
    features: document.getElementById('f-features').value.trim(),
    budget: document.getElementById('f-budget').value,
    timeline: document.getElementById('f-timeline').value,
    urgency: document.getElementById('f-timeline').value === 'ASAP / Urgent' ? 'asap' : 'normal',
    projectLink: document.getElementById('f-link').value.trim(),
  };
}

function buildReview() {
  var d = getFormData();
  var sections = [
    {
      title: 'Contact Details',
      rows: [
        ['Full Name', d.name],
        ['Email', d.email],
        ['Company', d.company || '\u2014'],
        ['Phone', d.phone || '\u2014'],
        ['Referral', d.source || '\u2014'],
      ],
    },
    {
      title: 'Project Details',
      rows: [
        ['Project Name', d.projectName],
        ['Type', d.projectType || '\u2014'],
        ['Budget', d.budget || '\u2014'],
        ['Timeline', d.timeline || '\u2014'],
      ],
    },
    {
      title: 'Brief',
      rows: [
        ['Problem', d.problem || '\u2014'],
        ['Goals', d.goals || '\u2014'],
        ['Target Users', d.targetUsers || '\u2014'],
        ['Key Features', d.features || '\u2014'],
      ],
    },
    {
      title: 'Attachments',
      rows: [
        ['Voice Note', S.vname || 'None'],
        ['Document', S.fname || 'None'],
        ['Reference Link', d.projectLink || 'None'],
      ],
    },
  ];

  var html = '';
  sections.forEach(function (sec) {
    html += '<div class="review-section"><p class="review-title">' + sec.title + '</p>';
    sec.rows.forEach(function (row) {
      var val = row[1];
      var empty = !val || val === '\u2014';
      html += '<div class="review-row"><div class="review-key">' + row[0] + '</div><div class="review-val' + (empty ? ' empty' : '') + '">' + (empty ? val : val) + '</div></div>';
    });
    html += '</div>';
  });
  document.getElementById('review-box').innerHTML = html;
  updateReviewScans();
}

function updateReviewScans() {
  // Link
  var lDot = document.getElementById('rs-link-dot');
  var lTxt = document.getElementById('rs-link-txt');
  if (!S.linkScanned) {
    lDot.className = 'sdot pending';
    lTxt.className = 'sstatus pending';
    lTxt.textContent = '\u23F3 No link';
  } else if (S.linkSafe) {
    lDot.className = 'sdot safe';
    lTxt.className = 'sstatus safe';
    lTxt.textContent = '\u2705 Clean';
  } else {
    lDot.className = 'sdot danger';
    lTxt.className = 'sstatus danger';
    lTxt.textContent = '\u{1F6A8} Flagged';
  }

  // Voice
  var vDot = document.getElementById('rs-voice-dot');
  var vTxt = document.getElementById('rs-voice-txt');
  if (!S.vname) {
    vDot.className = 'sdot pending';
    vTxt.className = 'sstatus pending';
    vTxt.textContent = '\u23F3 No file';
  } else if (S.voiceScan && (S.voiceScan.safe || S.voiceScan.skipped)) {
    vDot.className = 'sdot safe';
    vTxt.className = 'sstatus safe';
    vTxt.textContent = '\u2705 Clean';
  } else if (S.voiceScan) {
    vDot.className = 'sdot danger';
    vTxt.className = 'sstatus danger';
    vTxt.textContent = '\u{1F6A8} Flagged';
  } else {
    vDot.className = 'sdot pending';
    vTxt.className = 'sstatus pending';
    vTxt.textContent = '\u231B Scanning...';
  }

  // Doc
  var dDot = document.getElementById('rs-doc-dot');
  var dTxt = document.getElementById('rs-doc-txt');
  if (!S.fname) {
    dDot.className = 'sdot pending';
    dTxt.className = 'sstatus pending';
    dTxt.textContent = '\u23F3 No file';
  } else if (S.fileScan && (S.fileScan.safe || S.fileScan.skipped)) {
    dDot.className = 'sdot safe';
    dTxt.className = 'sstatus safe';
    dTxt.textContent = '\u2705 Clean';
  } else if (S.fileScan) {
    dDot.className = 'sdot danger';
    dTxt.className = 'sstatus danger';
    dTxt.textContent = '\u{1F6A8} Flagged';
  } else {
    dDot.className = 'sdot pending';
    dTxt.className = 'sstatus pending';
    dTxt.textContent = '\u231B Scanning...';
  }
}

// ── Submit ────────────────────────────────────────────────────────────────
async function submitAll() {
  var btn = document.getElementById('submit-btn');
  var text = document.getElementById('btn-text');
  btn.disabled = true;
  text.innerHTML = '<div style="width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .8s linear infinite;display:inline-block"></div> Submitting...';

  var formData = getFormData();
  var form = new FormData();
  form.append('formData', JSON.stringify(formData));
  if (S.vblob) form.append('voiceNote', S.vblob, S.vname);
  if (S.fblob) form.append('document', S.fblob, S.fname);

  try {
    var res = await fetch(apiUrl('/api/prd/full', { method: 'POST', body: form });
    var data = await res.json();

    if (data.success) {
      document.getElementById('step-4').style.display = 'none';
      document.getElementById('stepper').style.display = 'none';
      document.getElementById('top-banner').style.display = 'none';
      document.getElementById('step-done').style.display = 'block';
      document.getElementById('step-done').classList.add('active');

      document.getElementById('done-icon').textContent = data.scanPassed ? '\u2705' : '\u26A0\uFE0F';
      document.getElementById('done-title').className = 'success-title ' + (data.scanPassed ? 'safe' : 'flagged');
      document.getElementById('done-title').textContent = data.scanPassed ? 'PRD Submitted!' : 'PRD Received!';
      document.getElementById('done-desc').textContent = data.message;
      document.getElementById('done-ref').textContent = 'Reference: ' + data.referenceId;

      var summary = document.getElementById('done-scans');
      var rows = [
        ['Reference Link', S.linkScanned ? (S.linkSafe ? 'safe' : 'danger') : null],
        ['Voice Note', S.voiceScan],
        ['Document', S.fileScan],
      ];
      var shtml = '';
      rows.forEach(function (r) {
        var label = r[0];
        var result = r[1];
        var cls = !result ? 'pending' : (result.safe || result.skipped ? 'safe' : 'danger');
        var txt = !result ? 'No attachment' : (result.safe || result.skipped ? '\u2705 Clean' : '\u{1F6A8} Flagged');
        shtml += '<div class="scan-row"><div class="sdot ' + cls + '"></div><span class="slabel">' + label + '</span><span class="sstatus ' + cls + '">' + txt + '</span></div>';
      });
      summary.innerHTML = shtml;
      summary.style.display = 'block';

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert('Error: ' + (data.error || 'Submission failed. Please try again.'));
      btn.disabled = false;
      text.innerHTML = 'Submit PRD \u2192';
    }
  } catch (e) {
    alert('Network error. Please check your connection and try again.');
    btn.disabled = false;
    text.innerHTML = 'Submit PRD \u2192';
  }
}
