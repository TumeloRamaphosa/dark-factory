import { useState, useRef } from "react";
import { Mic, CheckCircle, Globe, Shield, Zap, Users, TrendingUp, BookOpen } from "lucide-react";

const C = {
  a: "#6c63ff", ac: "#00d4ff", ap: "#f59e0b", ag: "#10b981",
  p: "#ec4899", bg: "#09090e", bgs: "#0f0f1a", w: "#ffffff",
  t: "#e8e8f0", t2: "#9090b0", t3: "#5a5a7a",
  b: "rgba(255,255,255,0.07)", bl: "rgba(255,255,255,0.04)",
};

function App({ products, capabilities }: { products: any[]; capabilities: any[] }) {
  const [prd, setPrd] = useState(false);
  const [sel, setSel] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [refId, setRefId] = useState("");
  const [sending, setSending] = useState(false);
  const [vn, setVn] = useState<File | null>(null);
  const [recording, setRecording] = useState(false);
  const [secs, setSecs] = useState(0);
  const mrRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [s, setS] = useState({ name: "", email: "", company: "", projectName: "", type: "", problem: "", budget: "", timeline: "" });

  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const up = (k: string, v: string) => setS(x => ({ ...x, [k]: v }));
  const fmt = (n: number) => `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;

  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const m = new MediaRecorder(stream, { mimeType: "audio/webm" });
      const chunks: Blob[] = [];
      m.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
      m.onstop = () => { const b = new Blob(chunks, { type: "audio/webm" }); setVn(new File([b], "voice-brief.webm")); stream.getTracks().forEach(t => t.stop()); };
      m.start();
      mrRef.current = m;
      setRecording(true);
      timerRef.current = setInterval(() => setSecs(n => n + 1), 1000);
    } catch { alert("Mic access denied. Please allow microphone access."); }
  };
  const stopRec = () => { mrRef.current?.stop(); setRecording(false); if (timerRef.current) clearInterval(timerRef.current); };

  const submit = async () => {
    setSending(true);
    await new Promise(r => setTimeout(r, 1800));
    setRefId("PRD-" + Date.now().toString(36).toUpperCase());
    setDone(true);
    setSending(false);
  };

  const sp = (n: number, label: string) => (
    <div style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0, background: n < step ? C.a : n === step ? C.a : "rgba(255,255,255,0.08)", color: n <= step ? "#fff" : "#5a5a7a", border: n < step ? "none" : "1px solid rgba(255,255,255,0.1)", boxShadow: n === step ? `0 4px 16px ${C.a}50` : "none", transition: "all 0.2s" }}>{n < step ? "✓" : n}</div>
      <span style={{ fontSize: "0.65rem", fontWeight: 600, marginLeft: 6, color: n === step ? C.a : "#5a5a7a", whiteSpace: "nowrap" }}>{label}</span>
      {n < 4 && <div style={{ width: 24, height: 2, background: n < step ? C.a : "rgba(255,255,255,0.08)", margin: "0 4px", flexShrink: 0 }} />}
    </div>
  );

  const fi = (label: string, key: string, placeholder: string, type = "text") => (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9090b0", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace" }}>{label}</label>
      <input type={type} value={s[key as keyof typeof s]} onChange={e => up(key, e.target.value)} placeholder={placeholder}
        style={{ width: "100%", padding: "0.625rem 0.875rem", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.875rem", fontFamily: "inherit", background: "rgba(255,255,255,0.05)", color: "#e8e8f0", outline: "none", boxSizing: "border-box" }}
      />
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "Plus Jakarta Sans, sans-serif", color: C.t, lineHeight: 1.6 }}>

      {sel && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={e => e.target === e.currentTarget && setSel(null)}>
          {(() => { const p = products.find(x => x.id === sel); if (!p) return null; return (
            <div style={{ background: "#111128", border: `1px solid ${p.color}30`, borderRadius: 24, width: "100%", maxWidth: 480, overflow: "hidden", boxShadow: `0 0 60px ${p.color}40`, position: "relative" }}>
              <button onClick={() => setSel(null)} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.08)", border: "none", color: "#9090b0", cursor: "pointer", padding: "6px 10px", borderRadius: 8, fontSize: "0.875rem" }}>✕</button>
              <div style={{ height: 4, background: `linear-gradient(90deg, ${p.color}, ${p.color}80)` }} />
              <div style={{ padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1.25rem" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: p.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem" }}>{p.icon}</div>
                  <div><h3 style={{ fontWeight: 900, fontSize: "1.2rem", color: "#e8e8f0" }}>{p.name}</h3><p style={{ fontSize: "0.8rem", color: "#9090b0" }}>{p.desc}</p></div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "1rem", marginBottom: "1.25rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "#5a5a7a", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "monospace", marginBottom: 4 }}>Investment</div>
                  <div style={{ fontSize: "1.75rem", fontWeight: 900, color: p.color }}>{p.price}</div>
                </div>
                <p style={{ fontSize: "0.875rem", color: "#9090b0", lineHeight: 1.7, marginBottom: "1.5rem" }}>{p.tagline}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: 8 }}>
                  {p.features.map((f: string) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.85rem", color: "#9090b0" }}>
                      <CheckCircle size={14} color="#6c63ff" style={{ flexShrink: 0, marginTop: 2 }} />{f}
                    </li>
                  ))}
                </ul>
                <button style={{ width: "100%", padding: "0.875rem", borderRadius: 12, background: p.color, color: "#fff", border: "none", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={() => setSel(null)}>Request Proposal →</button>
              </div>
            </div>
          ); })()}
        </div>
      )}

      {prd && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", overflowY: "auto" }}
          onClick={e => e.target === e.currentTarget && setPrd(false)}>
          <div style={{ background: "#0d0d20", border: "1px solid rgba(108,99,255,0.2)", borderRadius: 24, width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto", boxShadow: `0 0 80px ${C.a}20` }}>
            <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#0d0d20", zIndex: 1 }}>
              <div><div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#e8e8f0" }}>Drop a PRD</div><div style={{ fontSize: "0.75rem", color: "#5a5a7a", marginTop: 2, fontFamily: "monospace" }}>CipherTrace · Dark Factory</div></div>
              <button onClick={() => setPrd(false)} style={{ background: "rgba(255,255,255,0.06)", border: "none", cursor: "pointer", color: "#9090b0", padding: "8px 12px", borderRadius: 8 }}>✕</button>
            </div>
            {!done && (
              <div style={{ padding: "1rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 4, alignItems: "center", overflowX: "auto", background: "#0d0d20" }}>
                {sp(1, "Contact")}{sp(2, "Project")}{sp(3, "Assets")}{sp(4, "Review")}
              </div>
            )}
            <div style={{ padding: "1.5rem 2rem" }}>
              {step === 1 && !done && (
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: "1rem", color: "#e8e8f0", marginBottom: 4 }}>Who are you?</h3>
                  <p style={{ fontSize: "0.825rem", color: "#9090b0", marginBottom: "1.25rem" }}>Tell us about yourself and your company.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {fi("Full Name *", "name", "Tumelo Ramaphosa")}
                    {fi("Company", "company", "Studex Group")}
                  </div>
                  {fi("Email Address *", "email", "you@company.co.za", "email")}
                  <button onClick={() => s.name && s.email && setStep(2)} disabled={!s.name || !s.email}
                    style={{ width: "100%", padding: "0.8rem", borderRadius: 12, background: s.name && s.email ? C.a : "rgba(108,99,255,0.2)", color: "#fff", border: "none", fontWeight: 700, fontSize: "0.875rem", cursor: s.name && s.email ? "pointer" : "default", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }}>
                    Project Details →
                  </button>
                </div>
              )}
              {step === 2 && !done && (
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: "1rem", color: "#e8e8f0", marginBottom: 4 }}>What are we building?</h3>
                  <p style={{ fontSize: "0.825rem", color: "#9090b0", marginBottom: "1.25rem" }}>Describe your project clearly so we can scope it accurately.</p>
                  {fi("Project Name *", "projectName", "e.g. LAISA Agent OS, SafeSight CRM")}
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9090b0", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace" }}>Project Type</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {["AI Agent", "Website", "Mobile App", "Dashboard", "E-Commerce", "Automation"].map(t => (
                        <button key={t} onClick={() => up("type", t)} style={{ padding: "0.35rem 0.875rem", borderRadius: 100, fontSize: "0.775rem", fontWeight: 600, border: `1px solid ${s.type === t ? C.a : "rgba(255,255,255,0.1)"}`, background: s.type === t ? `${C.a}20` : "transparent", color: s.type === t ? C.a : "#9090b0", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>{t}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9090b0", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace" }}>Problem Statement *</label>
                    <textarea value={s.problem} onChange={e => up("problem", e.target.value)} placeholder="What problem are you solving?" rows={3}
                      style={{ width: "100%", padding: "0.625rem 0.875rem", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.875rem", fontFamily: "inherit", background: "rgba(255,255,255,0.05)", color: "#e8e8f0", resize: "vertical", lineHeight: 1.6, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                    <div>
                      <label style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9090b0", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace" }}>Budget</label>
                      <select value={s.budget} onChange={e => up("budget", e.target.value)} style={{ width: "100%", padding: "0.625rem 0.875rem", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.875rem", fontFamily: "inherit", background: "rgba(255,255,255,0.05)", color: "#e8e8f0", outline: "none", cursor: "pointer", appearance: "none" }}>
                        <option value="">— Select —</option>
                        <option>R5K – R15K</option><option>R15K – R50K</option><option>R50K – R150K</option><option>R150K – R350K</option><option>R350K+</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9090b0", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace" }}>Timeline</label>
                      <select value={s.timeline} onChange={e => up("timeline", e.target.value)} style={{ width: "100%", padding: "0.625rem 0.875rem", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.875rem", fontFamily: "inherit", background: "rgba(255,255,255,0.05)", color: "#e8e8f0", outline: "none", cursor: "pointer", appearance: "none" }}>
                        <option value="">— Select —</option>
                        <option>ASAP</option><option>Within 2 weeks</option><option>Within 1 month</option><option>1–3 months</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setStep(1)} style={{ flex: 1, padding: "0.75rem", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "none", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", color: "#9090b0", fontFamily: "inherit" }}>← Back</button>
                    <button onClick={() => s.projectName && s.problem && setStep(3)} disabled={!s.projectName || !s.problem}
                      style={{ flex: 2, padding: "0.75rem", borderRadius: 12, background: !s.projectName || !s.problem ? "rgba(108,99,255,0.2)" : C.a, color: "#fff", border: "none", fontWeight: 700, fontSize: "0.875rem", cursor: !s.projectName || !s.problem ? "default" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      Voice Note →
                    </button>
                  </div>
                </div>
              )}
              {step === 3 && !done && (
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: "1rem", color: "#e8e8f0", marginBottom: 4 }}>Attach your assets</h3>
                  <p style={{ fontSize: "0.825rem", color: "#9090b0", marginBottom: "1.25rem" }}>Voice note or document. Everything is scanned before we open it.</p>
                  <div onClick={recording ? stopRec : startRec} style={{ background: "rgba(255,255,255,0.03)", border: `2px dashed ${recording ? C.p : "rgba(255,255,255,0.1)"}`, borderRadius: 16, padding: "1.5rem", textAlign: "center", marginBottom: "1rem", cursor: "pointer", transition: "all 0.2s" }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: recording ? C.p : C.a, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem", boxShadow: `0 4px 16px ${recording ? "rgba(236,72,153,.3)" : "rgba(108,99,255,.3)"}`, transition: "all 0.2s", animation: recording ? "pulse-red 1s infinite" : "none" }}>
                      <Mic size={22} color="#fff" />
                    </div>
                    <p style={{ fontWeight: 700, fontSize: "0.875rem", color: recording ? C.p : "#e8e8f0" }}>{recording ? `Recording... ${fmt(secs)}` : "Tap to record a voice brief"}</p>
                    <p style={{ fontSize: "0.75rem", color: "#5a5a7a", marginTop: 4 }}>{vn ? `Voice note ready — ${vn.name}` : "Talk through your idea — 2 to 5 minutes"}</p>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setStep(2)} style={{ flex: 1, padding: "0.75rem", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "none", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", color: "#9090b0", fontFamily: "inherit" }}>← Back</button>
                    <button onClick={() => setStep(4)} style={{ flex: 2, padding: "0.75rem", borderRadius: 12, background: C.a, color: "#fff", border: "none", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>Review →</button>
                  </div>
                </div>
              )}
              {step === 4 && !done && (
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: "1rem", color: "#e8e8f0", marginBottom: 4 }}>Review your PRD</h3>
                  <p style={{ fontSize: "0.825rem", color: "#9090b0", marginBottom: "1.25rem" }}>Make sure everything looks right.</p>
                  <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "1rem", marginBottom: "1rem" }}>
                    {[["Name", s.name || "—"], ["Email", s.email || "—"], ["Project", s.projectName || "—"], ["Type", s.type || "—"], ["Budget", s.budget || "—"], ["Timeline", s.timeline || "—"], ["Voice", vn ? "✓ Voice note attached" : "— No voice note"]].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.825rem" }}>
                        <span style={{ fontSize: "0.75rem", color: "#5a5a7a", fontWeight: 600 }}>{k}</span>
                        <span style={{ fontWeight: 600, color: "#e8e8f0" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setStep(3)} style={{ flex: 1, padding: "0.75rem", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "none", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", color: "#9090b0", fontFamily: "inherit" }}>← Back</button>
                    <button onClick={submit} disabled={sending} style={{ flex: 2, padding: "0.75rem", borderRadius: 12, background: sending ? "rgba(108,99,255,0.2)" : C.a, color: "#fff", border: "none", fontWeight: 700, fontSize: "0.875rem", cursor: sending ? "default" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      {sending ? <><div style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />Submitting...</> : "Submit PRD →"}
                    </button>
                  </div>
                </div>
              )}
              {done && (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <CheckCircle size={48} color={C.a} style={{ margin: "0 auto 1rem", display: "block" }} />
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#e8e8f0", marginBottom: 8 }}>PRD Submitted!</h3>
                  <p style={{ fontSize: "0.875rem", color: "#9090b0", lineHeight: 1.7, marginBottom: "1rem" }}>Your brief is in. Our team will review it personally and be in touch within 24 hours.</p>
                  <div style={{ display: "inline-block", background: "rgba(108,99,255,0.1)", border: `1px solid ${C.a}30`, borderRadius: 8, padding: "0.5rem 1.25rem", fontFamily: "monospace", fontSize: "0.825rem", color: C.a, marginBottom: "1.5rem" }}>{refId}</div>
                  <br />
                  <button onClick={() => setPrd(false)} style={{ padding: "0.75rem 2rem", borderRadius: 12, background: C.a, color: "#fff", border: "none", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", fontFamily: "inherit" }}>Close</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(9,9,14,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", height: 64, display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scroll("hero")}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #6c63ff, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(108,99,255,0.35)" }}>🏭</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#e8e8f0", letterSpacing: "-0.01em" }}>CipherTrace</div>
              <div style={{ fontSize: "0.6rem", color: "#5a5a7a", fontFamily: "monospace" }}>Dark Factory | Studex Dev</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["clients", "products", "success", "founder"].map(id => (
              <button key={id} onClick={() => scroll(id)} style={{ padding: "0.45rem 0.875rem", borderRadius: 10, fontSize: "0.825rem", fontWeight: 600, border: "none", cursor: "pointer", background: "transparent", color: "#9090b0", fontFamily: "inherit", transition: "all 0.15s" }}>{id.charAt(0).toUpperCase() + id.slice(1)}</button>
            ))}
          </div>
          <button onClick={() => setPrd(true)} style={{ padding: "0.6rem 1.25rem", borderRadius: 12, background: "#6c63ff", color: "#fff", border: "none", fontWeight: 700, fontSize: "0.825rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, boxShadow: "0 4px 20px rgba(108,99,255,0.35)", fontFamily: "inherit", transition: "all 0.2s" }}>✨ Drop a PRD</button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "6rem 2rem 4rem", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)", width: 800, height: 800, background: "radial-gradient(ellipse, rgba(108,99,255,0.12) 0%, rgba(0,212,255,0.05) 40%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.25)", borderRadius: 100, padding: "0.3rem 1rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6c63ff", animation: "pulse-anim 2s infinite" }} />
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#6c63ff", letterSpacing: "0.08em", fontFamily: "monospace" }}>8 VMs · 60+ Agents · 24/7 Operations</span>
            </div>
            <h1 style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.03em", color: "#e8e8f0", marginBottom: "1.25rem" }}>
              An automated<br /><span style={{ color: "#6c63ff" }}>software</span><br /><span style={{ color: "#ec4899" }}>environment.</span>
            </h1>
            <p style={{ fontSize: "1.05rem", color: "#9090b0", lineHeight: 1.8, marginBottom: "2rem", maxWidth: 480 }}>We build Cyber Sapien companies — AI agents run operations, humans orchestrate from the command centre. Every business has the intelligence of a multinational at African prices.</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: "3rem" }}>
              <button onClick={() => setPrd(true)} style={{ padding: "0.8rem 1.75rem", borderRadius: 14, background: "#6c63ff", color: "#fff", border: "none", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 6px 24px rgba(108,99,255,0.3)", fontFamily: "inherit", transition: "all 0.2s" }}>✨ Drop a PRD</button>
              <button onClick={() => scroll("products")} style={{ padding: "0.8rem 1.75rem", borderRadius: 14, background: "rgba(255,255,255,0.04)", color: "#9090b0", border: "1px solid rgba(255,255,255,0.08)", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>⚙️ See Products</button>
            </div>
            <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
              {[{ v: "8", l: "VMs Active" }, { v: "60+", l: "AI Agents" }, { v: "24/7", l: "Operations" }].map(x => (
                <div key={x.l}>
                  <div style={{ fontSize: "2.25rem", fontWeight: 900,