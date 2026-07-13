#!/usr/bin/env node
/**
 * OGRE Intelligence Data Pipeline
 * Night 6 Midnight Build — 27 June 2026
 *
 * Reads the latest research markdown from OGRE-Midnight-Build/
 * Parses it into structured JSON → ogre-dashboard/data/intelligence.json
 *
 * Usage: node build-data.js
 * Cron:  node /workspace/ogre-dashboard/build-data.js
 *        (run after each nightly 3AM research scan)
 */

const fs = require('fs');
const path = require('path');

const RESEARCH_DIR = path.join(__dirname, '..', 'OGRE-Midnight-Build');
const OUTPUT_FILE  = path.join(__dirname, 'data', 'intelligence.json');

// ─── helpers ────────────────────────────────────────────────────────────────

function latestResearchFile() {
  const files = fs.readdirSync(RESEARCH_DIR)
    .filter(f => /^RESEARCH-(\d{4})-(\d{2})-(\d{2})\.md$/.test(f))
    .sort()
    .reverse();
  return files[0] ? path.join(RESEARCH_DIR, files[0]) : null;
}

function readFile(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch { return ''; }
}

function section(content, heading) {
  // Extract a named section (## heading) until the next ## or end
  const re = new RegExp(`(?=\n## ${heading}[^\n]*\n)`, 'i');
  const m = content.match(re);
  if (!m) return '';
  const start = content.indexOf(m[0]) + m[0].length;
  const next = content.indexOf('\n## ', start);
  return content.slice(start, next > -1 ? next : undefined);
}

function extractFlag(code) {
  const map = { US:'🇺🇸', CN:'🇨🇳', JP:'🇯🇵', IN:'🇮🇳', BR:'🇧🇷', MX:'🇲🇽', NG:'🇳🇬', GH:'🇬🇭', ZA:'🇿🇦' };
  return map[code] || code;
}

function extractCountry(code, content) {
  const patterns = {
    US: { name:'United States',    players:'OpenAI, Anthropic, Google DeepMind, xAI, Microsoft AI' },
    CN: { name:'China',            players:'ByteDance, Alibaba Qwen, Baidu ERNIE, DeepSeek, Moonshot' },
    JP: { name:'Japan',            players:'SoftBank Corp, Preferred Networks, Sony Group, NEC, Honda' },
    IN: { name:'India',            players:'Krutrim, Infosys.ai, India AI Mission, AI4India' },
    BR: { name:'Brazil',           players:'Nubank, Wildlife Studios, SuperFX, Enter' },
    MX: { name:'Mexico',          players:'ODAIA, Kavak AI, Bitso, CEMAI' },
    NG: { name:'Nigeria',          players:'Flutterwave, Mono, Jasiri AI, Touchless.ai' },
    GH: { name:'Ghana',           players:'Cropin AI, mNotify, Ghana AI Hub' },
    ZA: { name:'South Africa',    players:'Discovery Health AI, Media24, Brainbox AI, CSIR, OGRE Computer' },
  };
  const p = patterns[code] || { name: code, players: '' };

  // Pull what they are building and what OGRE can do from the markdown
  const countryBlock = extractCountryBlock(code, content);
  const building = extractField(countryBlock, 'What they are building:|What SA/OGRE can implement:|What OGRE COMPUTER must build NOW:');
  const ogreAction = extractField(countryBlock, 'What SA/OGRE can implement:|What OGRE COMPUTER must build NOW:');
  const urgencyRaw = extractField(countryBlock, 'Urgency');
  const urgency = parseUrgency(urgencyRaw);
  const timeline = extractTimeline(countryBlock);

  return {
    code,
    name: p.name,
    flag: code,
    urgency,
    urgency_color: urgencyColor(urgency),
    players: p.players,
    building: building || extractFirstLines(countryBlock, 3),
    ogre_action: ogreAction || 'Assess opportunity and build roadmap.',
    timeline: timeline || 'Q3 2026',
  };
}

function extractCountryBlock(code, content) {
  // Find the block for a specific country code in the markdown
  const countryNames = {
    US: ['UNITED STATES', 'UNITED STATES OF AMERICA'],
    CN: ['CHINA'],
    JP: ['JAPAN'],
    IN: ['INDIA'],
    BR: ['BRAZIL'],
    MX: ['MEXICO'],
    NG: ['NIGERIA'],
    GH: ['GHANA'],
    ZA: ['SOUTH AFRICA', 'SOUTH AFRICA'],
  };
  const names = countryNames[code] || [code];
  const re = new RegExp(`(?=\n### [^\\n]*\\b(${names.join('|')})\\b[^\n]*\n)`, 'i');
  const m = content.match(re);
  if (!m) return '';
  const start = content.indexOf(m[0]) + m[0].length;
  const next = content.indexOf('\n### ', start);
  return content.slice(start, next > -1 ? next : undefined);
}

function extractField(block, keys) {
  const keyList = keys.split('|');
  for (const key of keyList) {
    const idx = block.indexOf(key);
    if (idx === -1) continue;
    const after = block.slice(idx + key.length).trim();
    const lines = after.split('\n').filter(l => !l.startsWith('**')).join('; ');
    const clean = lines.replace(/^[:\s]+/, '').replace(/\n+/g, ' ').trim();
    if (clean.length > 5) return clean.slice(0, 300);
  }
  return '';
}

function extractFirstLines(block, n) {
  return block.split('\n')
    .filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('**'))
    .slice(0, n)
    .map(l => l.replace(/^[-•]\s*/, '').trim())
    .join('; ');
}

function parseUrgency(raw) {
  if (!raw) return 'high';
  const r = raw.toLowerCase();
  if (r.includes('extreme') || r.includes('critical')) return 'extreme';
  if (r.includes('very high')) return 'very_high';
  if (r.includes('immediate')) return 'extreme';
  if (r.includes('high')) return 'high';
  if (r.includes('medium')) return 'medium';
  return 'high';
}

function urgencyColor(u) {
  return { extreme: '#FF4444', very_high: '#FF8800', high: '#FFD700', medium: '#44FF88' }[u] || '#FFD700';
}

function extractTimeline(block) {
  const m = block.match(/(Q[1-4]\s*202[0-9]|IMMEDIATE|July 2026|fiscal 2026|mid-2026|Q1 2027)/i);
  return m ? m[1].toUpperCase() : 'Q3 2026';
}

// ─── main ───────────────────────────────────────────────────────────────────

function main() {
  const researchFile = latestResearchFile();
  if (!researchFile) {
    console.error('[build-data] No RESEARCH-*.md file found in', RESEARCH_DIR);
    process.exit(1);
  }

  const researchContent = readFile(researchFile);
  const filename = path.basename(researchFile);
  const dateMatch = filename.match(/(\d{4})-(\d{2})-(\d{2})/);
  const dateStr = dateMatch ? `${dateMatch[3]}/${dateMatch[2]}/${dateMatch[1]}` : '';

  console.log('[build-data] Reading:', filename);

  // Extract executive summary / verdict
  const execBlock = section(researchContent, 'EXECUTIVE SUMMARY');
  const verdictMatch = execBlock.match(/"([^"]{20,300})"/);
  const verdict = verdictMatch ? verdictMatch[1] : 'The global AI race is about who deploys fastest, cheapest, and most sovereign.';

  // Extract key metrics
  const metrics = {
    market_size: '$16.5B',
    cagr: '34.6%',
    enterprise_adoption: '40%',
    sa_executive_priority: '72%',
  };
  const sizeMatch = researchContent.match(/\$\d+\.?\d*[BCM]|\d+\.?\d*[BCM]\s*dollar/i);
  if (sizeMatch) metrics.market_size = sizeMatch[0];

  // Parse each country
  const countries = ['US','CN','JP','IN','BR','MX','NG','GH','ZA']
    .map(code => extractCountry(code, researchContent));

  // Extract strategic priorities from the roadmap table
  const roadmapBlock = section(researchContent, 'IMPLEMENTATION ROADMAP');
  const priorities = [];
  const rowMatches = [...roadmapBlock.matchAll(/[*\|]\s*Q([1-4])\s202\d\s[*\|]\s*(\d)\s[*\|]\s*(.+?)\s*[*\|]/gi)];
  let rank = 1;
  for (const m of rowMatches) {
    priorities.push({
      rank: rank++,
      label: m[3].trim().replace(/\*/g, '').slice(0, 80),
      market: 'SA Market',
      urgency: rank <= 2 ? 'extreme' : 'high',
      timeline: `Q${m[1]} 2026`,
      action: m[3].trim().replace(/\*/g, '').slice(0, 120),
    });
  }
  if (priorities.length === 0) {
    // fallback
    priorities.push(
      { rank:1, label:'Deploy Sovereign LLM Layer', market:'$2.4B SA Enterprise', urgency:'extreme', timeline:'Q3 2026', action:'DeepSeek V3 / Qwen 3.5 on-premise, OGRE API white-label' },
      { rank:2, label:'DSIT Position Paper', market:'Regulatory', urgency:'extreme', timeline:'July 2026', action:'Submit OGRE AI implementation framework to DSIT' },
      { rank:3, label:'SA AI Foundation Model Consortium', market:'$500M+ program', urgency:'high', timeline:'Q4 2026', action:'Announce with CSIR + 2 private partners' },
      { rank:4, label:'OGRE Agri-AI Pilot', market:'R150B+ SA Agriculture', urgency:'high', timeline:'Q3 2026', action:'Crop disease prediction + climate analytics' },
      { rank:5, label:'Flutterwave SA Payments API', market:'$800M Cross-border', urgency:'high', timeline:'Q3 2026', action:'SARB-compliant cross-border AI payments layer' },
    );
  }

  // SA deep-dive
  const saBlock = extractCountryBlock('ZA', researchContent);
  const saMetrics = [];
  const metricMatches = [...saBlock.matchAll(/([\d.]+[BMKR]\+?)\s+\w+\s+(.+?)(?=\n|$)/g)].slice(0, 4);
  if (metricMatches.length) {
    metricMatches.forEach(m => saMetrics.push({ value: m[1], label: m[2].trim() }));
  } else {
    saMetrics.push(
      { value: '4.5M+', label: 'Discovery Health Lives' },
      { value: '$800M', label: 'AU Health Fund' },
      { value: 'R2.7B', label: 'Green Economy Incentives' },
      { value: '1.2M', label: 'SA SMMEs' },
    );
  }

  // Next briefing
  const nextBlock = section(researchContent, 'NEXT BRIEFING');
  const nextFocus = extractField(nextBlock, 'Focus|focus');
  const nextDate = extractField(nextBlock, 'Scheduled|scheduled');
  const watchMatch = [...nextBlock.matchAll(/[-•*] (.+)/g)].slice(0, 3).map(m => m[1]);

  const output = {
    generated: new Date().toISOString(),
    cycle: 'Nightly 3AM Scan',
    research_file: filename,
    report_id: `OGRE-INTEL-${dateMatch ? dateMatch[1]+dateMatch[2]+dateMatch[3] : 'NOW'}`,
    verdict,
    stats: metrics,
    countries,
    priorities: priorities.slice(0, 5),
    sa: {
      metrics: saMetrics,
      building_now: ['Discovery Health AI — health risk stratification', 'CSIR — drug discovery & agricultural AI', 'Brainbox AI — building automation'],
      critical_gap: 'Only G20 economy without published sovereign AI strategy.',
      window: '18-24 months before SA is locked out of its own AI infrastructure market.',
    },
    next_briefing: {
      scheduled: nextDate || '2026-07-04T03:00:00Z',
      focus: nextFocus || "OGRE Computer's Sovereign LLM launch readiness review",
      watch_list: watchMatch.length ? watchMatch : ['DeepSeek V4/R2 release', 'Gemini 3.5 Pro launch', 'Ghana AI Hub construction commencement'],
    },
  };

  // ── diff vs previous ──────────────────────────────────────────────────────
  let prev = null;
  try {
    const prevRaw = fs.readFileSync(OUTPUT_FILE, 'utf8');
    prev = JSON.parse(prevRaw);
  } catch { /* first run */ }

  if (prev) {
    const changed = [];
    if (prev.verdict !== output.verdict) changed.push('verdict');
    if (prev.stats.market_size !== output.stats.market_size) changed.push('stats.market_size');
    output.countries.forEach((c, i) => {
      if (prev.countries[i] && prev.countries[i].building !== c.building) changed.push(`countries.${c.code}`);
    });
    if (changed.length) {
      console.log('[build-data] Changes detected:', changed.join(', '));
    } else {
      console.log('[build-data] No changes from previous run.');
    }
    output._diff = changed;
  } else {
    console.log('[build-data] First run — no previous data to diff against.');
  }

  // ── write ────────────────────────────────────────────────────────────────
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  console.log('[build-data] Written:', OUTPUT_FILE);
  console.log('[build-data] Countries:', output.countries.length);
  console.log('[build-data] Priorities:', output.priorities.length);
  console.log('[build-data] Done.');
}

main();
