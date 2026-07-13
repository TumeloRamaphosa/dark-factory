"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ── Data ──────────────────────────────────────────────────────────
const NAV = ["Products","VM Ecosystem","Global Markets","Build Me A Dashboard","AI Agents","Global Launch","YouTube Scripts"];
const STATS = [["6","Live Products"],["5","AI Agents"],["R200M+","Tender Pipeline"],["$4K","MRR Target"]];
const PRODUCTS = [
  { icon:"V",bg:"rgba(236,72,153,.1)",name:"DarkDesk",tag:"Voice AI",tc:"",desc:"AI voice companion. Real-time voice + chat. Lives in your own sovereign SA VM. POPIA-compliant.",price:"From R2,500/mo",links:[{l:"Demo",h:"https://hgjcgc2esiki.space.minimax.io"},{l:"Proposal",h:"https://9w8nktistow4.space.minimax.io"}]},
  { icon:"W",bg:"rgba(16,185,129,.1)",name:"AutoFlex Pro",tag:"Web Automation",tc:"g",desc:"AI agent reads webpages, fills forms, qualifies leads, books appointments automatically.",price:"From R1,500/mo",links:[{l:"Demo",h:"https://3twhamln9rsh.space.minimax.io"},{l:"Build yours",h:"#bmad"}]},
  { icon:"S",bg:"rgba(245,158,11,.1)",name:"Red Team Agent",tag:"Cybersecurity AI",tc:"",desc:"AI VM monitoring other AI agents for hallucinations, prompt injection, PII leakage.",price:"R45,000/mo · Live MRR",links:[{l:"Demo",h:"https://w1tu0qxf216v.space.minimax.io"},{l:"Proposal",h:"https://kidvuwlj196t.space.minimax.io"}]},
  { icon:"I",bg:"rgba(108,99,255,.1)",name:"ICVMS Platform",tag:"Global Markets",tc:"c",desc:"Integrated Company VM System. 5 partner VMs connected through StudEx OS.",price:"$4,000/mo",links:[{l:"Proposal",h:"https://j3s0jkun4cbh.space.minimax.io"},{l:"Full Demo",h:"https://a5cjrm7f1x8s.space.minimax.io"}]},
  { icon:"B",bg:"rgba(0,212,255,.1)",name:"BMAD",tag:"Rapid Development",tc:"",desc:"Build Me A Dashboard. Describe what you want. We build it. Powered by AI agent teams.",price:"R29/once-off",links:[{l:"Start now",h:"#bmad"},{l:"View BMAD",h:"https://6g18k484b9fx.space.minimax.io"}]},
  { icon:"O",bg:"rgba(239,68,68,.1)",name:"Obsidian Mind",tag:"Enterprise AI OS",tc:"p",desc:"Persistent memory vault for AI agents. Every conversation, deal, document stored forever.",price:"$4,000/mo",links:[{l:"Proposal",h:"https://kidvuwlj196t.space.minimax.io"},{l:"VM Demo",h:"https://idsucux7j3e4.space.minimax.io"}]},
];
const AGENTS = [
  {a:"H",n:"Hermes",r:"Chief Technology Officer",d:"Self-hosted LLM, persistent memory, multi-agent orchestration. Zero external API calls for reasoning.",s:["Ollama Qwen 2.5","GitHub","Self-Hosted"]},
  {a:"N",n:"Naledi",r:"Chief Marketing Officer",d:"Manages content calendars, social media scheduling, and campaign drafting across all major platforms.",s:["20 posts/month","Analytics","Multi-platform"]},
  {a:"A",n:"Auto-Commerce",r:"E-Commerce Manager",d:"Manages Shopify, product listings, order workflows, inventory, and customer communication.",s:["Shopify","Inventory","Orders"]},
  {a:"R",n:"Robusca",r:"Chief of Staff",d:"Coordinates all agents, manages priorities, maintains the operational calendar.",s:["Coordination","War Room","Reporting"]},
  {a:"O",n:"Obsidian Mind",r:"Memory and Reasoning Core",d:"Persistent memory vault. Semantic search. Decision records. Client history. Agents never start from zero.",s:["Vault","Semantic Search","Memory"]},
  {a:"V",n:"Voice Agent",r:"Client Communications",d:"Real-time voice AI. Speaks to clients, qualifies leads, books appointments. 24/7.",s:["OpenAI Realtime","Eleven Labs","SA Phone"]},
];
const VMS = [
  {n:"AfricaBiz",s:"Trade and Commerce",p:"Trade flow · Compliance",o:false},
  {n:"NtechLab",s:"AI Facial Recognition",p:"Computer Vision · AI Models",o:false},
  {n:"VM 05 — OPEN",s:"Your Company Here",p:"Apply now · B-BBEE preferred",o:true},
  {n:"Pharmasyntez",s:"Pharma Distribution",p:"Cold Chain · SAHPRA licensed",o:false},
  {n:"ART Engineering",s:"Manufacturing",p:"Infrastructure · DevOps",o:false},
];
const SCRIPTS = [
  {i:"1",t:"How to Launch a Business in SA 2026",tag:"Business",dur:"12 min",desc:"The complete A-Z guide. Real story. Real lessons. Real revenue."},
  {i:"2",t:"The AI Opportunity for African Entrepreneurs",tag:"AI Opportunity",dur:"12 min",desc:"Why Africa is the biggest untapped AI market. Framework for finding your AI opportunities."},
  {i:"3",t:"Build a Global Business from Africa",tag:"Global Trade",dur:"16 min",desc:"Studex journey from butcher shop to Africa-Russia trade corridor platform."},
];

// ── Canvas: VM Ecosystem ─────────────────────────────────────────
function VMCanvas() {
  const c = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = c.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let W = cv.offsetWidth || 600; cv.width = W;
    const H = 280; cv.height = H;
    const cx = W / 2, cy = H / 2;
    const r = Math.min(W, H) * 0.32;
    let t = 0;
    const vms = [{a:270,c:"#6c63ff"},{a:330,c:"#00d4ff"},{a:30,c:"#10b981"},{a:90,c:"#ec4899"},{a:150,c:"#f59e0b"}];
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      t += 0.008;
      vms.forEach((v, i) => {
        const rad = (v.a - 90) * Math.PI / 180;
        const x = cx + r * Math.cos(rad), y = cy + r * Math.sin(rad);
        ctx.beginPath();
        ctx.moveTo(cx, cy); ctx.lineTo(x, y);
        ctx.strokeStyle = v.c + "22"; ctx.lineWidth = 1; ctx.stroke();
        const g = ctx.createRadialGradient(x, y, 0, x, y, 30);
        g.addColorStop(0, v.c + "18"); g.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(x, y, 30, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        const pt = ((t * 0.8 + i * 0.3) % 1);
        const px = cx + (x - cx) * pt, py = cy + (y - cy) * pt;
        ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = v.c; ctx.shadowColor = v.c; ctx.shadowBlur = 6; ctx.fill(); ctx.shadowBlur = 0;
      });
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, 40 + i * 18 + Math.sin(t * 0.7 + i) * 3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(108,99,255,${0.06 / i})`;
        ctx.setLineDash([4, 6]); ctx.lineWidth = 0.5; ctx.stroke(); ctx.setLineDash([]);
      }
      requestAnimationFrame(draw);
    }
    draw();
    const ro = new ResizeObserver(() => { if (c.current) { W = c.current.offsetWidth; c.current.width = W; } });
    ro.observe(cv);
    return () => ro.disconnect();
  }, []);
  return <canvas ref={c} style={{ borderRadius: 10, height: 280, display: "block", width: "100%" }} />;
}

// ── Hero Canvas ──────────────────────────────────────────────
function HeroCanvas() {
  const c = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = c.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let W = cv.offsetWidth || 800, H = cv.offsetHeight || 600;
    cv.width = W; cv.height = H;
    const cx = W / 2, cy = H / 2, t0 = 0;
    let t = 0;
    const pts = [
      { a: 0, c: "#6c63ff" }, { a: 72, c: "#00d4ff" }, { a: 144, c: "#ec4899" },
      { a: 216, c: "#f59e0b" }, { a: 288, c: "#10b981" },
    ];
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      t += 0.006;
      const dist = Math.min(W, H) * 0.3;
      pts.forEach((p, i) => {
        const rad = (p.a + t * 20) * Math.PI / 180;
        const x = cx + dist * Math.cos(rad), y = cy + dist * Math.sin(rad);
        ctx.beginPath(); ctx.arc(x, y, 4 + Math.sin(t + i) * 2, 0, Math.PI * 2);
        ctx.fillStyle = p.c; ctx.shadowColor = p.c; ctx.shadowBlur = 12; ctx.fill(); ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.arc(x, y, 16 + Math.sin(t + i) * 4, 0, Math.PI * 2);
        ctx.strokeStyle = p.c + "20"; ctx.lineWidth = 1; ctx.stroke();
      });
      ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#6c63ff"; ctx.shadowColor = "#6c63ff"; ctx.shadowBlur = 16; ctx.fill(); ctx.shadowBlur = 0;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, 30 * i + Math.sin(t * 0.5) * 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(108,99,255,${0.08 / i})`; ctx.lineWidth = 0.5; ctx.stroke();
      }
      requestAnimationFrame(draw);
    }
    draw();
    const ro = new ResizeObserver(() => { if (c.current) { W = c.current.offsetWidth; H = c.current.offsetHeight; c.current.width = W; c.current.height = H; } });
    ro.observe(cv);
    return () => ro.disconnect();
  }, []);
  return <canvas ref={c} style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.5 }} />;
}

// ── Tag styles ────────────────────────────────────────────────
const TAGCLR = { "": "#6c63ff", g: "#10b981", c: "#00d4ff", p: "#ec4899" };

// ── Main App ──────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", company: "", type: "Dashboard", desc: "" });
  const onH = (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const onS = (e: React.ChangeEvent<HTMLTextAreaElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const onSel = (e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, type: e.target.value }));
  const onSub = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const sub = `New BMAD submission\n\nName: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nType: ${form.type}\n\n${form.desc}`;
    window.location.href = `mailto:cto@studex-group.com?subject=BMAD Submission&body=${encodeURIComponent(sub)}`;
  }, [form]);

  return (
    <div style={{ background: "#07070f", color: "#eeeef8", fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh", WebkitFontSmoothing: "antialiased" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 3rem", height: 62, background: "rgba(7,7,15,.93)", backdropFilter: "blur(20px)", borderBottom: "1px solid #1c1c32" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #6c63ff, #00d4ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem", fontWeight: 900, color: "#fff" }}>DF</div>
          <div>
            <div style={{ fontSize: ".7rem", fontWeight: 800, color: "#eeeef8", letterSpacing: ".1em", textTransform: "uppercase" }}>Dark Factory</div>
            <div style={{ fontSize: ".55rem", color: "#7070a8" }}>OGRE Computer · Studex Group</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem", flex: 1, justifyContent: "center" }}>
          {NAV.map((n, i) => (
            <a key={i} href={`#${n.toLowerCase().replace(/ /g, "-")}`} style={{ fontSize: ".72rem", color: "#7070a8", fontWeight: 500 }}>{n}</a>
          ))}
        </div>
        <a href="#bmad" style={{ display: "inline-flex", padding: "8px 18px", background: "#6c63ff", color: "#fff", borderRadius: 8, fontSize: ".72rem", fontWeight: 700 }}>Start a Project</a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "5rem 2rem 3rem", position: "relative", overflow: "hidden" }}>
        <HeroCanvas />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 900 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 16px", background: "rgba(108,99,255,.1)", border: "1px solid rgba(108,99,255,.2)", borderRadius: 999, fontSize: ".62rem", color: "#6c63ff", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.8rem" }}>
            Dark Factory · OGRE Computer · Studex Group · 2026
          </div>
          <h1 style={{ fontSize: "clamp(2.6rem,8vw,6rem)", fontWeight: 900, lineHeight: .95, letterSpacing: "-.03em", marginBottom: "1.2rem", background: "linear-gradient(135deg, #fff 30%,rgba(255,255,255,.4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Build. Ship.<br />Repeat.
          </h1>
          <p style={{ fontSize: ".98rem", color: "#7070a8", maxWidth: 500, margin: "0 auto 2.5rem" }}>
            A sovereign AI build factory. Multi-agent teams design, build, and deploy software from idea to live product in days.
          </p>
          <div style={{ display: "flex", gap: ".9rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#bmad" style={{ display: "inline-flex", padding: "13px 30px", background: "#6c63ff", color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: ".88rem", boxShadow: "0 8px 30px rgba(108,99,255,.4)" }}>Build Me A Dashboard — R29</a>
            <a href="#vms" style={{ display: "inline-flex", padding: "12px 26px", background: "transparent", border: "1px solid #272745", color: "#7070a8", borderRadius: 10, fontWeight: 600, fontSize: ".85rem" }}>Explore VM Ecosystem</a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "1.8rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, fontSize: ".56rem", letterSpacing: ".15em", textTransform: "uppercase", color: "#40406a", zIndex: 2 }}>
          <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, #6c63ff, transparent)", animation: "sc 2s ease-in-out infinite" }} />
          Scroll
        </div>
      </section>

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid #1c1c32", borderBottom: "1px solid #1c1c32", background: "#0d0d1c" }}>
        {STATS.map(([n,l]) => (
          <div key={n} style={{ textAlign: "center", padding: "1.5rem 1rem", borderRight: "1px solid #1c1c32" }}>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#6c63ff", display: "block" }}>{n}</div>
            <div style={{ fontSize: ".6rem", textTransform: "uppercase", letterSpacing: ".1em", color: "#40406a", marginTop: 4, fontWeight: 600 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* PRODUCTS */}
      <section id="products" style={{ padding: "6rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ fontSize: ".6rem", textTransform: "uppercase", letterSpacing: ".2em", color: "#6c63ff", fontWeight: 700, marginBottom: ".6rem" }}>The Products</div>
        <h2 style={{ fontSize: "clamp(1.5rem,4vw,2.4rem", fontWeight: 900, letterSpacing: "-.02rem", lineHeight: 1.1, marginBottom: ".6rem" }}>Everything We Build</h2>
        <p style={{ color: "#7070a8", maxWidth: 480, fontSize: ".9rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>Six live products. Each built, deployed, and earning. From voice AI to cybersecurity to global trade infrastructure.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(265px,1fr)", gap: "1rem" }}>
          {PRODUCTS.map(p => (
            <div key={p.name} style={{ background: "#0d0d1c", border: "1px solid #1c1c32", borderRadius: 16, padding: "1.7rem", transition: "all .3s" }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: ".9rem", background: p.bg }}>{p.icon}</div>
              <div style={{ fontSize: ".92rem", fontWeight: 800, marginBottom: 4 }}>{p.name}</div>
              <span style={{ display: "inline-flex", padding: "3px 10px", background: p.tc ? `${TAGCLR[p.tc].replace("#","rgba(").replace(/(..)(..)(..)/,(_,r,g,b) => `rgba(${parseInt(r,16)},${parseInt(g,16)},${parseInt(b,16)},.08)` : "rgba(108,99,255,.08)", border: "1px solid rgba(108,99,255,.15)", borderRadius: 999, fontSize: ".58rem", color: TAGCLR[p.tc] || "#6c63ff", fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: ".5rem" }}>{p.tag}</span>
              <p style={{ fontSize: ".76rem", color: "#7070a8", lineHeight: 1.6, marginBottom: ".5rem" }}>{p.desc}</p>
              <div style={{ fontSize: ".82rem", fontWeight: 700, color: "#6c63ff", marginBottom: ".5rem" }}>{p.price}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginTop: ".8rem" }}>
                {p.links.map(l => (
                  <a key={l.l} href={l.h} target="_blank" rel="noopener" style={{ padding: "5px 12px", background: "#11111f", border: "1px solid #1c1c32", borderRadius: 6, fontSize: ".66rem", color: "#7070a8" }}>{l.l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #1c1c32", maxWidth: 1200, margin: "0 auto" }} />

      {/* VM ECOSYSTEM */}
      <section id="vms" style={{ padding: "6rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ fontSize: ".6rem", textTransform: "uppercase", letterSpacing: ".2em", color: "#6c63ff", fontWeight: 700, marginBottom: ".6rem" }}>Live Now · Animated</div>
        <h2 style={{ fontSize: "clamp(1.5rem,4vw,2.4rem)", fontWeight: 900, letterSpacing: "-.02rem", lineHeight: 1.1, marginBottom: ".6rem" }}>ICVMS — VM Ecosystem</h2>
        <p style={{ color: "#7070a8", maxWidth: 480, fontSize: ".9rem", lineHeight: 1.8, marginBottom: "2rem" }}>Animated in real time. Six VMs connected through StudEx OS. B-BBEE Level 1 · POPIA compliant · Johannesburg SA.</p>
        <div style={{ background: "#0d0d1c", border: "1px solid #1c1c32", borderRadius: 16, padding: "2rem" }}>
          <VMCanvas />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: ".7rem", marginTop: "1.2rem" }}>
            {VMS.map(v => (
              <div key={v.n} style={{ background: "#11111f", border: `1px solid ${v.o ? "rgba(16,185,129,.4)" : "#1c1c32"}`, borderRadius: 10, padding: ".8rem", textAlign: "center", background: v.o ? "rgba(16,185,129,.03)" : "#11111f" }}>
                <div style={{ fontSize: ".72rem", fontWeight: 700, marginBottom: 2 }}>{v.n}</div>
                <div style={{ fontSize: ".58rem", color: v.o ? "#10b981" : "#6c63ff", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 700, marginBottom: 3 }}>{v.s}</div>
                <div style={{ fontSize: ".66rem", color: "#40406a", lineHeight: 1.5 }}>{v.p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #1c1c32", maxWidth: 1200, margin: "0 auto" }} />

      {/* GLOBAL MARKETS */}
      <section id="market" style={{ padding: "6rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: ".6rem", textTransform: "uppercase", letterSpacing: ".2em", color: "#6c63ff", fontWeight: 700, marginBottom: ".6rem" }}>Studex Global Markets</div>
            <h2 style={{ fontSize: "clamp(1.5rem,4vw,2.4rem)", fontWeight: 900, letterSpacing: "-.02rem", lineHeight: 1.1, marginBottom: ".6rem" }}>Africa-Russia Trade<br />Infrastructure</h2>
            <p style={{ color: "#7070a8", fontSize: ".9rem", lineHeight: 1.8, marginBottom: "1rem" }}>Built for the Africa-Russia trade corridor. B-BBEE Level 1. POPIA compliant.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginBottom: "1.5rem" }}>
              {[["Africa-Russia Trade","#6c63ff"],["B-BBEE Level 1","#10b981"],["Johannesburg SA","#00d4ff"],["6 VMs · 1 Platform","#f59e0b"]].map(([c,col]) => (
                <div key={c as string} style={{ padding: "7px 14px", background: "#0d0d1c", border: "1px solid #1c1c32", borderRadius: 8, fontSize: ".74rem", fontWeight: 600, color: "#7070a8", display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: col as string, flexShrink: 0 }} />
                  {c}
                </div>
              ))}
            </div>
            <div style={{ background: "linear-gradient(135deg,rgba(108,99,255,.12,rgba(0,212,255,.06)", border: "1px solid rgba(108,99,255,.2)", borderRadius: 16, padding: "1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: ".9rem", fontWeight: 800, marginBottom: ".4rem" }}>Apply for VM 05</div>
              <div style={{ fontSize: ".76rem", color: "#7070a8", marginBottom: ".8rem" }}>The final ICVMS partner slot. B-BBEE companies preferred.</div>
              <a href="mailto:hello@studexglobalmarkets.com?subject=VM 05 Application" style={{ display: "inline-block", background: "#6c63ff", color: "#fff", fontWeight: 700, padding: "8px 20px", borderRadius: 8, fontSize: ".78rem" }}>Apply via Email</a>
            </div>
          </div>
          <div>
            <div style={{ background: "#0d0d1c", border: "1px solid #1c1c32", borderRadius: 16, padding: "1.7rem", marginBottom: ".8rem" }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: ".9rem", background: "rgba(0,212,255,.1)" }}>I</div>
              <div style={{ fontSize: ".92rem", fontWeight: 800, marginBottom: 4 }}>ICVMS Official Proposal</div>
              <div style={{ display: "inline-flex", padding: "3px 10px", background: "rgba(0,212,255,.08)", border: "1px solid rgba(0,212,255,.2)", borderRadius: 999, fontSize: ".58rem", color: "#00d4ff", fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: ".5rem" }}>Official · Minima UI</div>
              <p style={{ fontSize: ".76rem", color: "#7070a8", lineHeight: 1.6, marginBottom: ".5rem" }}>All 5 partner logos, VM specs, pricing tiers, bank details.</p>
              <div style={{ fontSize: ".82rem", fontWeight: 700, color: "#6c63ff", marginBottom: ".5rem" }}>$4,000<span style={{ fontWeight: 400, color: "#40406a", fontSize: ".72rem" }}>/mo + $7,590 setup</span></div>
              <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
                <a href="https://j3s0jkun4cbh.space.minimax.io" target="_blank" style={{ padding: "5px 12px", background: "#11111f", border: "1px solid #1c1c32", borderRadius: 6, fontSize: ".66rem", color: "#7070a8" }}>Proposal</a>
                <a href="https://a5cjrm7f1x8s.space.minimax.io" target="_blank" style={{ padding: "5px 12px", background: "#11111f", border: "1px solid #1c1c32", borderRadius: 6, fontSize: ".66rem", color: "#7070a8" }}>Full Demo + Scripts</a>
              </div>
            </div>
            <div style={{ background: "#0d0d1c", border: "1px solid #1c1c32", borderRadius: 16, padding: "1.7rem" }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: ".9rem", background: "rgba(239,68,68,.1)" }}>M</div>
              <div style={{ fontSize: ".92rem", fontWeight: 800, marginBottom: 4 }}>MindX Voice Agent</div>
              <div style={{ display: "inline-flex", padding: "3px 10px", background: "rgba(108,99,255,.08)", border: "1px solid rgba(108,99,255,.15)", borderRadius: 999, fontSize: ".58rem", color: "#6c63ff", fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: ".5rem" }}>New Proposal</div>
              <p style={{ fontSize: ".76rem", color: "#7070a8", lineHeight: 1.6, marginBottom: ".5rem" }}>Voice AI for MindX. Own SA VM. 4 agents. Built in 4 weeks.</p>
              <div style={{ fontSize: ".82rem", fontWeight: 700, color: "#6c63ff", marginBottom: ".5rem" }}>$4,000<span style={{ fontWeight: 400, color: "#40406a", fontSize: ".72rem" }}>/mo + $7,590 setup</span></div>
              <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
                <a href="https://9w8nktistow4.space.minimax.io" target="_blank" style={{ padding: "5px 12px", background: "#11111f", border: "1px solid #1c1c32", borderRadius: 6, fontSize: ".66rem", color: "#7070a8" }}>Proposal</a>
                <a href="#bmad" style={{ padding: "5px 12px", background: "#11111f", border: "1px solid #1c1c32", borderRadius: 6, fontSize: ".66rem", color: "#7070a8" }}>Start PRD</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #1c1c32", maxWidth: 1200, margin: "0 auto" }} />

      {/*