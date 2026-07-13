import { useEffect, useRef, useState } from 'react';
import './index.css';

// ── ALGORITHMIC CANVAS ──
function AlgorithmicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let frame = 0;
    let animId: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const nodes = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 2.5 + 1.0,
      pulse: Math.random() * Math.PI * 2,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame += 0.004;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,255,136,${(1 - dist / 200) * 0.35})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        n.x += n.vx + Math.sin(frame + n.y * 0.007) * 0.3;
        n.y += n.vy + Math.cos(frame + n.x * 0.007) * 0.3;
        if (n.x < 0) n.x = canvas.width; if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height; if (n.y > canvas.height) n.y = 0;
        const brightness = 0.55 + Math.sin(frame * 1.5 + n.pulse) * 0.25;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2.5);
        gradient.addColorStop(0, `rgba(150,255,200,${brightness})`);
        gradient.addColorStop(0.4, `rgba(0,255,136,${brightness * 0.8})`);
        gradient.addColorStop(1, 'rgba(0,255,136,0)');
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,255,220,${brightness})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
  }, []);
  return <canvas ref={canvasRef} className="canvas-bg" />;
}

// ── DATA ──
const TOOL_CATEGORIES = [
  {
    name: 'Communication',
    icon: '📡',
    color: '#00ff88',
    tools: ['WhatsApp Business', 'Telegram', 'Slack', 'Discord', 'Microsoft Teams', 'Email SMTP', 'SendGrid', 'Twilio SMS', 'MTN API', 'Vodacom API', 'Zoom', 'Google Meet'],
  },
  {
    name: 'AI & Research',
    icon: '🤖',
    color: '#4d9fff',
    tools: ['OpenAI API', 'Anthropic Claude', 'Google Gemini', 'DeepSeek V3', 'Perplexity API', 'Brave Search', 'Tavily', 'Jina AI', 'HuggingFace', 'OpenRouter'],
  },
  {
    name: 'CRM & Business',
    icon: '🏢',
    color: '#ffd700',
    tools: ['HubSpot', 'Salesforce', 'Zoho CRM', 'Pipedrive', 'Notion', 'Airtable', 'Google Sheets', 'Custom CRM', 'Freshsales', 'SugarCRM'],
  },
  {
    name: 'Payments (SA-First)',
    icon: '💳',
    color: '#ff4d88',
    tools: ['Paystack', 'Yoco', 'Peach Payments', 'Stripe', 'Square', 'PayPal', 'Swift', 'Coinbase', 'Binance API'],
  },
  {
    name: 'Marketing & Social',
    icon: '📣',
    color: '#a855f7',
    tools: ['Mailchimp', 'ActiveCampaign', 'ConvertKit', 'Sendinblue', 'Facebook Ads', 'Google Ads', 'LinkedIn Ads', 'Instagram API', 'Twitter/X API', 'TikTok API', 'YouTube API', 'Reddit API'],
  },
  {
    name: 'Storage & Data',
    icon: '🗄️',
    color: '#06b6d4',
    tools: ['Google Drive', 'Dropbox', 'OneDrive', 'AWS S3', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Notion API'],
  },
  {
    name: 'DevOps & Monitoring',
    icon: '⚙️',
    color: '#f97316',
    tools: ['GitHub', 'GitLab', 'Jenkins', 'Docker', 'Prometheus', 'Grafana', 'Datadog', 'PagerDuty', 'Sentry', 'Webhooks'],
  },
  {
    name: 'Document & Content',
    icon: '📄',
    color: '#84cc16',
    tools: ['Google Docs', 'Notion', 'Confluence', 'PDF.co', 'DocuSign', 'HelloSign', 'Pandadoc'],
  },
  {
    name: 'E-Commerce',
    icon: '🛒',
    color: '#ec4899',
    tools: ['Shopify', 'WooCommerce', 'Magento', 'Stripe Dashboard', 'PayPal Commerce'],
  },
  {
    name: 'African Data Sources',
    icon: '🌍',
    color: '#fbbf24',
    tools: ['SARB API', 'Stats SA', 'Africapay', 'M-Pesa API', 'Flutterwave', 'Mono', 'Paga', 'Jumo', 'Yoco API', 'Zapper API'],
  },
];

const PIPEDREAM_VS_N8N = [
  { feature: 'Visual workflow canvas', pipedream: '❌ Code-first only', n8n: '✅ Full visual canvas', make: '✅ Beautiful canvas' },
  { feature: 'Self-host', pipedream: '❌ Cloud only', n8n: '✅ Self-host free', make: '❌ Cloud only' },
  { feature: 'White-label', pipedream: '❌', n8n: '✅', make: '❌' },
  { feature: 'Multi-tenant', pipedream: '❌', n8n: '✅', make: '❌' },
  { feature: 'WhatsApp Business', pipedream: '❌', n8n: '✅', make: '❌' },
  { feature: 'Paystack/SA payments', pipedream: '❌', n8n: '✅', make: '❌' },
  { feature: 'AI agent nodes', pipedream: 'Basic', n8n: '✅ Full agent system', make: '✅ AI features' },
  { feature: 'Python support', pipedream: '✅', n8n: '✅', make: '❌' },
  { feature: 'Cost at 200 clients', pipedream: '$500+/mo', n8n: '$0 (self-hosted)', make: '$1,800+/mo' },
  { feature: 'African integrations', pipedream: '❌', n8n: '✅ Full SA stack', make: '❌' },
  { feature: 'Best for our use', pipedream: '❌ Not a fit', n8n: '✅ SELECTED', make: '❌ Too expensive' },
];

const ADVANTAGE_TABLE = [
  { feature: 'Research platforms', notebook: '1 (Gemini)', last30: '10 platforms', darkfactory: '10 + custom data' },
  { feature: 'Output channels', notebook: 'CLI only', last30: 'Email/HTML', darkfactory: 'WhatsApp + Email + Dashboard + Voice' },
  { feature: 'Memory persistence', notebook: '❌', last30: '❌', darkfactory: '✅ claude-mem + Obsidian' },
  { feature: 'Multi-agent', notebook: '❌', last30: '❌', darkfactory: '✅ 6 OpenClaw agents' },
  { feature: 'White-label', notebook: '❌', last30: '❌', darkfactory: '✅ Your brand' },
  { feature: 'VM hosted', notebook: '❌', last30: '❌', darkfactory: '✅ ORGO VM 24/7' },
  { feature: 'Business workflows', notebook: '❌', last30: '❌', darkfactory: '✅ CRM + invoicing + support' },
  { feature: 'Client portal', notebook: '❌', last30: '❌', darkfactory: '✅ Per-client dashboard' },
  { feature: 'Multi-tenant (200 clients)', notebook: '❌', last30: '❌', darkfactory: '✅ One VM, all clients' },
  { feature: 'Monthly cost', notebook: 'Free', last30: '$0–$50 in APIs', darkfactory: 'R2,500–R7,000/client' },
  { feature: 'Setup time', notebook: '30 min', last30: '2 hours', darkfactory: '5 min (we do it)' },
  { feature: 'API risk', notebook: 'HIGH (browser block)', last30: 'MEDIUM (multiple APIs)', darkfactory: 'LOW (our infra)' },
];

const SA_TARGETS = [
  { type: 'Small', count: 50, avg: 2500, segment: 'GPs, dentists, law firms, accountants, agencies, e-commerce, hospitality' },
  { type: 'Medium', count: 50, avg: 5500, segment: 'Clinics, legal firms 10-50 staff, accounting firms, financial services' },
  { type: 'Rest of Africa', count: 100, avg: 5000, segment: 'Nigeria fintechs, Kenya tech, Ghana finance, Botswana mining services' },
];

const HOT_PRODUCTS = [
  {
    name: 'OGRE Mission Control',
    tagline: 'Full business OS dashboard — one screen, every metric',
    tech: 'React + Express + SQLite + Tailwind',
    pricing: 'R2,500 – R15,000/mo',
    status: 'LIVE',
    url: 'https://9163jvmvzxn5.space.minimax.io',
    accent: '#D4AF37',
    badge: 'NASA Mission Control style',
  },
  {
    name: 'DarkDesk™',
    tagline: 'Voice + chat AI companion. POPIA-compliant. Sovereign SA VM.',
    tech: 'Electron + VoiceBox + OpenAI Realtime API',
    pricing: 'R2,500 – R25,000/mo',
    status: 'LIVE',
    url: 'https://hgjcgc2esiki.space.minimax.io',
    accent: '#6c63ff',
    badge: 'Voice AI Companion',
  },
  {
    name: 'AutoFlex Pro™',
    tagline: 'AI reads any website, fills forms, qualifies leads, books appointments.',
    tech: 'TypeScript + DOM Agent + MCP',
    pricing: 'R1,500 – R35,000/mo',
    status: 'LIVE',
    url: 'https://3twhamln9rsh.space.minimax.io',
    accent: '#00d4ff',
    badge: 'Web Automation Agent',
  },
  {
    name: 'Red Team Agent',
    tagline: 'AI cybersecurity — purple team, POPIA audits, Decepticon-powered.',
    tech: 'Decepticon + LangGraph + Neo4j + Kali',
    pricing: 'R25,000 – R85,000/mo',
    status: 'LIVE',
    url: 'https://w1tu0qxf216v.space.minimax.io',
    accent: '#ef4444',
    badge: 'AI Cybersecurity',
  },
  {
    name: 'OGRE Agent OS',
    tagline: 'Deploy a full multi-agent stack on any VM. Flask + Python agents.',
    tech: 'Flask + Python agents + app.py + n8n',
    pricing: 'R5,000 – R20,000/mo',
    status: 'SYNCED',
    url: '',
    accent: '#f59e0b',
    badge: 'Multi-Agent Stack',
  },
  {
    name: 'Ship Your SaaS in 30 Days',
    tagline: 'Agentic build programme — 1 session/week, ship live in 30 days.',
    tech: 'OpenClaw + Cursor + Supabase + Render',
    pricing: 'R2,500/mo retainer',
    status: 'READY TO BUILD',
    url: '',
    accent: '#10b981',
    badge: 'Agentic Build Pack',
  },
];

const OPERATING_SYSTEM = [
  { layer: 'CLIENT INPUT', icon: '📥', items: ['WhatsApp (SA #1)', 'Voice notes (VoiceBox)', 'Email', 'Telegram / IG DMs', 'White-label web portal'], color: '#00ff88' },
  { layer: 'RESEARCH LAYER', icon: '🔍', items: ['Reddit / X / YouTube / HN / Polymarket', 'News: SA + Africa sources', 'Finance: SARB, crypto, stocks', 'Custom: client CRM notes, contracts', 'Competitive: job posts, pricing, reviews'], color: '#4d9fff' },
  { layer: 'AGENT LAYER', icon: '🤖', items: ['Supervisor (Cipher Tr@ce)', 'Research Agent (briefs)', 'CRM Agent (client records)', 'Finance Agent (invoices, payments)', 'Social Agent (content, posting)', 'Support Agent (FAQ, tickets)'], color: '#ffd700' },
  { layer: 'BUSINESS TOOLS', icon: '⚡', items: ['Lead qualification + scoring', 'Invoice generation (Paystack/Yoco)', '7/14/30-day WhatsApp payment reminders', 'Daily/weekly/monthly reporting', 'Email nurturing sequences', 'Social media batching (7-day queue)'], color: '#ff4d88' },
  { layer: 'OUTPUT CHANNELS', icon: '📤', items: ['WhatsApp Business (client notifications)', 'Email (briefs, invoices, reports)', 'Dashboard (real-time, white-label)', 'Voice (VoiceBox — voice notes to clients)', 'Telegram / Discord (optional)'], color: '#a855f7' },
  { layer: 'MEMORY LAYER', icon: '🧠', items: ['claude-mem (agent context persistence)', 'nashsu/llm_wiki (structured knowledge)', 'Per-client memory (preferences, history)', 'Obsidian vault (human-readable)', 'Excalidraw playbook wiki'], color: '#06b6d4' },
];

// ── COMPONENTS ──
function HotProducts() {
  return (
    <section id="products">
      <div className="section-label">// READY TO SELL</div>
      <h2 className="section-title">Hot Products — Live & Deployable</h2>
      <p style={{ color: 'var(--text-dim)', marginBottom: '2rem', fontSize: '0.88rem' }}>
        6 products built, deployed, and ready to white-label for clients today.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {HOT_PRODUCTS.map((p, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: `1px solid ${p.accent}30`, borderRadius: '12px', padding: '1.5rem', borderTop: `3px solid ${p.accent}`, display: 'flex', flexDirection: 'column', gap: '0.75rem', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>{p.name}</div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <span style={{ background: p.accent + '20', color: p.accent, border: `1px solid ${p.accent}40`, borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '0.62rem', fontFamily: 'var(--mono)', whiteSpace: 'nowrap' }}>
                  {p.status}
                </span>
              </div>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>{p.tagline}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: p.accent, background: p.accent + '10', borderRadius: '4px', padding: '0.3rem 0.6rem', display: 'inline-block', width: 'fit-content' }}>
              {p.tech}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text-dim)', marginBottom: '0.15rem' }}>PRICING</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--gold)' }}>{p.pricing}</div>
              </div>
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ background: p.accent, color: '#000', borderRadius: '6px', padding: '0.45rem 0.9rem', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--mono)' }}>
                  VIEW LIVE →
                </a>
              ) : (
                <span style={{ background: 'var(--surface2)', color: 'var(--text-dim)', borderRadius: '6px', padding: '0.45rem 0.9rem', fontSize: '0.75rem', fontFamily: 'var(--mono)' }}>
                  DEPLOY ON DEMAND
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Navbar() {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <nav className="navbar">
      <div className="nav-logo">DARK<span style={{ color: 'var(--text-dim)' }}> FACTORY</span></div>
      <ul className="nav-links">
        {[['Overview', 'overview'], ['Products', 'products'], ['Tools', 'tools'], ['vs Competition', 'competition'], ['VM Stack', 'vmstack'], ['Target Market', 'market'], ['Integrations', 'integrations']].map(([l, id]) => (
          <li key={id}><a href="#" onClick={e => { e.preventDefault(); scroll(id); }}>{l}</a></li>
        ))}
      </ul>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="overview">
      <div className="hero-badge">Cipher Tr@ce · CEO · Dark Factory</div>
      <h1>
        We Research.<br />
        <span style={{ color: 'var(--text-dim)' }}>We Automate.</span><br />
        <span style={{ color: 'var(--accent)' }}>We Scale.</span>
      </h1>
      <p className="hero-sub">
        Dark Factory runs a <strong>full business OS</strong> for 200 African businesses — research,
        AI agents, WhatsApp, n8n workflows, VM hosting, white-label dashboards — all on one platform.
        Better than notebooklm-skill. Better than last30days-skill. Built for scale.
      </p>
      <div className="hero-cta">
        <button className="btn btn-primary" onClick={() => document.getElementById('market')?.scrollIntoView({ behavior: 'smooth' })}>
          See Target Market →
        </button>
        <button className="btn btn-outline" onClick={() => document.getElementById('integrations')?.scrollIntoView({ behavior: 'smooth' })}>
          Full Tool Map
        </button>
      </div>
    </section>
  );
}

function ComparisonTable() {
  return (
    <section id="competition">
      <div className="section-label">// ADVANTAGE TABLE</div>
      <h2 className="section-title">Better Than Both. Built on Top of Both.</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
          <thead>
            <tr style={{ background: 'var(--surface2)' }}>
              {['Feature', 'NotebookLM-Skill', 'last30days-Skill', '🏭 Dark Factory'].map((h, i) => (
                <th key={i} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: i === 3 ? 'var(--accent)' : 'var(--text)', borderBottom: '1px solid var(--border)', fontFamily: 'var(--mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ADVANTAGE_TABLE.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.65rem 1rem', color: 'var(--text)', fontWeight: 500 }}>{row.feature}</td>
                <td style={{ padding: '0.65rem 1rem', color: 'var(--text-dim)' }}>{row.notebook}</td>
                <td style={{ padding: '0.65rem 1rem', color: 'var(--text-dim)' }}>{row.last30}</td>
                <td style={{ padding: '0.65rem 1rem', color: 'var(--accent)', fontWeight: 600 }}>{row.darkfactory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function N8nVsPipeDream() {
  return (
    <section id="competition">
      <div className="section-label">// PLATFORM BATTLE</div>
      <h2 className="section-title">n8n Wins. Here's Why.</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { name: 'PipeDream', bg: 'rgba(255,77,136,0.08)', border: 'rgba(255,77,136,0.3)', label: '❌ Not Selected', accent: 'var(--pink)' },
          { name: 'n8n (WE USE)', bg: 'rgba(0,255,136,0.08)', border: 'rgba(0,255,136,0.3)', label: '✅ SELECTED', accent: 'var(--accent)' },
          { name: 'Make.com', bg: 'rgba(255,215,0,0.08)', border: 'rgba(255,215,0,0.3)', label: '❌ Too Expensive', accent: 'var(--gold)' },
        ].map(p => (
          <div key={p.name} style={{ background: p.bg, border: `1px solid ${p.border}`, borderRadius: '10px', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.3rem', color: p.accent }}>{p.name}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: p.accent, letterSpacing: '0.1em' }}>{p.label}</div>
          </div>
        ))}
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
          <thead>
            <tr style={{ background: 'var(--surface2)' }}>
              {['Feature', 'PipeDream', 'n8n ✅', 'Make.com'].map((h, i) => (
                <th key={i} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: i === 2 ? 'var(--accent)' : 'var(--text)', borderBottom: '1px solid var(--border)', fontFamily: 'var(--mono)', fontSize: '0.7rem', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PIPEDREAM_VS_N8N.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.6rem 1rem', fontWeight: 500 }}>{row.feature}</td>
                <td style={{ padding: '0.6rem 1rem', color: row.pipedream.startsWith('❌') ? 'var(--pink)' : row.pipedream.startsWith('✅') ? 'var(--accent)' : 'var(--text-dim)' }}>{row.pipedream}</td>
                <td style={{ padding: '0.6rem 1rem', color: 'var(--accent)', fontWeight: row.n8n.includes('SELECTED') ? 700 : 400 }}>{row.n8n}</td>
                <td style={{ padding: '0.6rem 1rem', color: row.make.startsWith('❌') ? 'var(--pink)' : row.make.startsWith('✅') ? 'var(--accent)' : 'var(--text-dim)' }}>{row.make}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: '8px', fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
        💡 Cost reality: Make.com at 200 clients = $1,800+/month. n8n self-hosted on ORGO VM = <strong style={{ color: 'var(--accent)' }}>$0/month in software</strong>. We pass that savings to clients.
      </div>
    </section>
  );
}

function OperatingSystem() {
  return (
    <section id="vmstack">
      <div className="section-label">// THE STACK</div>
      <h2 className="section-title">Dark Factory Operating System</h2>
      <p style={{ color: 'var(--text-dim)', marginBottom: '2rem', fontSize: '0.9rem' }}>Full toolchain. Every layer built and running. Not just notebooks — an entire business OS.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {OPERATING_SYSTEM.map((layer, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: `1px solid ${layer.color}30`, borderRadius: '10px', padding: '1.5rem', borderLeft: `3px solid ${layer.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.4rem' }}>{layer.icon}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: layer.color, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>{layer.layer}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {layer.items.map((item, j) => (
                <span key={j} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '5px', padding: '0.35rem 0.75rem', fontSize: '0.78rem', color: 'var(--text)' }}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MarketTarget() {
  return (
    <section id="market">
      <div className="section-label">// TARGET MARKET</div>
      <h2 className="section-title">200 Clients. 6 Countries. R1.1M/month.</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {SA_TARGETS.map((t, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.75rem' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.4rem' }}>{t.type}</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.2rem' }}>{t.count} <span style={{ fontSize: '1rem', color: 'var(--text-dim)', fontWeight: 400 }}>clients</span></div>
            <div style={{ fontSize: '1rem', color: 'var(--gold)', fontFamily: 'var(--mono)', marginBottom: '0.75rem' }}>R{((t.count * t.avg).toLocaleString())}/mo</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>{t.segment}</div>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: '10px', padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent)' }}>200</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Total clients target</div>
        </div>
        <div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--gold)' }}>R1.1M</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Monthly revenue</div>
        </div>
        <div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--blue)' }}>6</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Countries (SA + Africa)</div>
        </div>
      </div>
    </section>
  );
}

function Integrations() {
  const [active, setActive] = useState(0);
  return (
    <section id="integrations">
      <div className="section-label">// INTEGRATIONS</div>
      <h2 className="section-title">400+ Tools We Connect</h2>
      <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>n8n on ORGO VM. Every integration runs on our infrastructure — not the client's.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {TOOL_CATEGORIES.map((cat, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ background: active === i ? cat.color + '22' : 'var(--surface)', border: `1px solid ${active === i ? cat.color : 'var(--border)'}`, borderRadius: '6px', padding: '0.4rem 0.9rem', fontSize: '0.78rem', cursor: 'pointer', color: active === i ? cat.color : 'var(--text-dim)', fontFamily: 'var(--mono)', transition: 'all 0.2s' }}>
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>
      <div style={{ background: 'var(--surface)', border: `1px solid ${TOOL_CATEGORIES[active].color}30`, borderRadius: '10px', padding: '1.5rem', borderTop: `3px solid ${TOOL_CATEGORIES[active].color}` }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: TOOL_CATEGORIES[active].color, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>{TOOL_CATEGORIES[active].icon} {TOOL_CATEGORIES[active].name}</div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {TOOL_CATEGORIES[active].tools.map((tool, j) => (
            <span key={j} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '5px', padding: '0.45rem 0.85rem', fontSize: '0.82rem', color: 'var(--text)' }}>{tool}</span>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {TOOL_CATEGORIES.map((cat, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1rem', borderTop: `2px solid ${cat.color}` }}>
            <div style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{cat.icon}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>{cat.name}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: cat.color }}>{cat.tools.length} integrations</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickWin() {
  return (
    <section>
      <div className="section-label">// WHAT TO BUILD NEXT</div>
      <h2 className="section-title">The 5-Day Sprint</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {[
          { day: 'Day 1', title: 'GitHub PAT + Gmail App Password', desc: 'Unblock repo push + email cron briefings', owner: 'Tumelo', color: 'var(--pink)' },
          { day: 'Day 2', title: 'VoiceBox on ORGO VM', desc: 'MCP install. Clone Cipher Tr@ce voice. Test WhatsApp voice.', owner: 'Cipher Tr@ce', color: 'var(--gold)' },
          { day: 'Day 3', title: '10 SA Data Sources → n8n', desc: 'SARB API, Stats SA, Paystack, Yoco, News24, IOL, EWN', owner: 'Cipher Tr@ce', color: 'var(--accent)' },
          { day: 'Day 4', title: 'Client Onboarding Flow', desc: 'WhatsApp → CRM → invoice in 1 automated flow', owner: 'Cipher Tr@ce', color: 'var(--blue)' },
          { day: 'Day 5', title: 'White-label Dashboard', desc: 'Per-client portal. Branded. Live data. Deploy.', owner: 'Cipher Tr@ce', color: 'var(--pink)' },
        ].map((w, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.25rem', borderTop: `3px solid ${w.color}` }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: w.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>{w.day}</div>
            <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.5rem' }}>{w.title}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.6rem', lineHeight: 1.4 }}>{w.desc}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>👤 {w.owner}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <>
      <div className="divider" />
      <footer className="footer">
        <div className="footer-left">DARK FACTORY © 2026 · Cipher Tr@ce, CEO · Full Business OS · 200 Clients · 6 Countries</div>
        <div className="footer-right">
          <a href="#overview">Top</a>
          <a href="#competition">vs Competition</a>
          <a href="#market">Market</a>
          <a href="#integrations">Tools</a>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <>
      <AlgorithmicCanvas />
      <Navbar />
      <Hero />
      <div className="divider" />
      <HotProducts />
      <div className="divider" />
      <ComparisonTable />
      <div className="divider" />
      <N8nVsPipeDream />
      <div className="divider" />
      <OperatingSystem />
      <div className="divider" />
      <MarketTarget />
      <div className="divider" />
      <Integrations />
      <div className="divider" />
      <QuickWin />
      <Footer />
    </>
  );
}