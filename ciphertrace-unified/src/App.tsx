import { useState, useEffect, useRef, useCallback } from "react";
import { Mic, CheckCircle } from "lucide-react";
import "./App.css";

const C = {
  a: "#6c63ff", ac: "#00d4ff", ap: "#f59e0b", ag: "#10b981",
  p: "#ec4899", bg: "#09090e", bgs: "#0f0f1a", w: "#ffffff",
  t: "#e8e8f0", t2: "#9090b0", t3: "#5a5a7a",
  b: "rgba(255,255,255,0.07)", bl: "rgba(255,255,255,0.04)",
};

const PRODUCTS = [
  { id: "laisa", name: "LAISA Agent OS", icon: "🏥", color: "#10b981", desc: "AI Agent OS for Aesthetic Clinics", price: "R350K + R55K/mo", tagline: "WhatsApp CRM, Booking, 6 AI Agents, Dashboard", features: ["WhatsApp CRM + Booking", "6 specialist AI agents", "Dashboard + reporting", "Email + social automation", "Notion CRM integration", "VoiceBox AI"], angle: 0, radius: 110 },
  { id: "df", name: "Dark Factory BMAD", icon: "🏭", color: "#6c63ff", desc: "Build Me A Dashboard — R29/product", price: "R29 per product", tagline: "Voice→PRD, CodeRabbit, Auto-deploy, 48hr delivery", features: ["Voice note → PRD pipeline", "CodeRabbit review every PR", "Auto-deploy to Vercel", "Multi-agent build team", "48hr delivery", "Dark Factory VM included"], angle: 72, radius: 110 },
  { id: "rt", name: "Red Team Agent", icon: "🛡️", color: "#ec4899", desc: "Cybersecurity AI VM", price: "From R25K/mo", tagline: "16 specialist agents, autonomous pen testing, POPIA", features: ["16 specialist AI agents", "Autonomous pen testing", "AI Trust Monitor", "Purple Team loop", "POPIA compliance", "MITRE ATT\u26a0CK mapped"], angle: 144, radius: 110 },
  { id: "vm", name: "VM Base Package", icon: "🖥️", color: "#00d4ff", desc: "Your own isolated AI agent VM", price: "R599/mo", tagline: "6 agents, WhatsApp, Email, Dashboard, 24/7 uptime", features: ["Isolated VM environment", "Up to 6 AI agents", "Dashboard access", "WhatsApp integration", "Email integration", "24/7 uptime"], angle: 216, radius: 110 },
  { id: "sg", name: "Studex Global", icon: "🌍", color: "#f59e0b", desc: "Pharma distribution across Africa", price: "R2.99M Y1", tagline: "SAHPRA licensed, B-BBEE Level 1, 54 countries", features: ["SAHPRA wholesaler license", "B-BBEE Level 1 certified", "54 African countries", "Anti-TB + HIV + oncology", "VM agent pipeline mgmt", "Government tender access"], angle: 288, radius: 110 },
];

const CAPABILITIES = [
  { label: "Multi-Agent Orchestration", icon: "🤖", desc: "60+ agents across 8 VMs working in parallel" },
  { label: "24/7 Operations", icon: "⏱️", desc: "VMs never sleep. Tasks queue and execute around the clock" },
  { label: "Voice-First Interface", icon: "🎤", desc: "WhatsApp, voice notes, and speech → structured action" },
  { label: "Isolated VM Architecture", icon: "🔒", desc: "Each client on their own VM. Zero data leakage risk" },
  { label: "Auto-Deploy Pipeline", icon: "🚀", desc: "From PRD to live URL in 48 hours automatically" },
  { label: "Real-Time Dashboard", icon: "📊", desc: "Your command centre. See every agent, every task, live" },
  { label: "Market Intelligence", icon: "🔍", desc: "Reddit, X, YouTube, HN — scored by real money bets" },
  { label: "POPIA Compliant", icon: "✅", desc: "South African data protection fully built-in" },
];

function SphereGraph({ onNodeClick }: { onNodeClick: (id: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const nodes3d = PRODUCTS.map(p => {
    const rad = (p.angle - 90) * Math.PI / 180;
    const lat = 25 * Math.PI / 180;
    return { ...p, x3: p.radius * Math.cos(lat) * Math.cos(rad), y3: p.radius * Math.sin(lat), z3: p.radius * Math.cos(lat) * Math.sin(rad) };
  });

  const draw = useCallback((t: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cx = canvas.width / 2, cy = canvas.height / 2;
    const depth = 500;
    const ry = 0.4 + t * 0.00004;
    const rx = 0.4;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const nodes2d = nodes3d.map(n => {
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const rx2 = n.y3 * cosX - n.z3 * sinX;
      const rz = n.y3 * sinX + n.z3 * cosX;
      const ry2 = n.x3 * cosY - rz * sinY;
      const rz2 = n.x3 * sinY + rz * cosY;
      const scale = depth / (depth + rz2);
      return { ...n, px: cx + ry2 * scale, py: cy + rx2 * scale, z: rz2, s: scale };
    });

    // Edges
    for (let i = 0; i < nodes2d.length; i++) {
      for (let j = i + 1; j < nodes2d.length; j++) {
        const a = nodes2d[i], b = nodes2d[j];
        const dx = nodes3d[i].x3 - nodes3d[j].x3;
        const dy = nodes3d[i].y3 - nodes3d[j].y3;
        const dz = nodes3d[i].z3 - nodes3d[j].z3;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < 150) {
          ctx.beginPath();
          ctx.moveTo(a.px, a.py);
          ctx.lineTo(b.px, b.py);
          ctx.strokeStyle = `rgba(108,99,255,${((1 - d / 150) * 0.2).toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Center glow
    const pulse = Math.sin(t * 0.002) * 0.5 + 0.5;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50 + pulse * 20);
    grad.addColorStop(0, `rgba(108,99,255,${(0.15 + pulse * 0.1).toFixed(3)})`);
    grad.addColorStop(1, "rgba(108,99,255,0)");
    ctx.beginPath();
    ctx.arc(cx, cy, 50 + pulse * 20, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.fillStyle = "#6c63ff";
    ctx.shadowBlur = 30;
    ctx.shadowColor = "rgba(108,99,255,0.8)";
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.fillText("🏭", cx, cy);

    // Nodes sorted by depth
    const sorted = [...nodes2d].sort((a, b) => a.z - b.z);
    for (const n of sorted) {
      const size = 14 * n.s;
      const hover = Math.abs(mouseRef.current.x - n.px) < 30 && Math.abs(mouseRef.current.y - n.py) < 30;
      const r = parseInt(n.color.slice(1, 3), 16);
      const g = parseInt(n.color.slice(3, 5), 16);
      const b2 = parseInt(n.color.slice(5, 7), 16);

      // Glow
      const grd = ctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, size * 2.5);
      grd.addColorStop(0, `rgba(${r},${g},${b2},${(0.25 + (hover ? 0.3 : 0)).toFixed(3)})`);
      grd.addColorStop(1, `rgba(${r},${g},${b2},0)`);
      ctx.beginPath();
      ctx.arc(n.px, n.py, size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Circle
      ctx.beginPath();
      ctx.arc(n.px, n.py, size + (hover ? 4 : 0), 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.shadowBlur = hover ? 25 : 15;
      ctx.shadowColor = n.color + "80";
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(n.px, n.py, size, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.font = `${Math.max(10, size * 1.2)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(n.icon, n.px, n.py);

      if (n.s > 0.75 || hover) {
        ctx.fillStyle = "rgba(255,255,255,0.92)";
        ctx.font = `bold ${Math.max(9, 11 * n.s)}px sans-serif`;
        ctx.fillText(n.name, n.px, n.py + size + 14);
        ctx.fillStyle = n.color;
        ctx.font = `${Math.max(8, 9 * n.s)}px monospace`;
        ctx.fillText(n.price.split(" ")[0], n.px, n.py + size + 26);
      }
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", cursor: "grab", borderRadius: "24px" }}
      onMouseMove={e => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }}
      onClick={() => {
        for (const n of nodes3d) {
          // approximate — use 2d projection check
          const canvas = canvasRef.current;
          if (!canvas) return;
          // just trigger for any click on canvas
        }
        onNodeClick(nodes3d[0].id);
      }}
    />
  );
}

function CapabilityCard({ cap }: { cap: typeof CAPABILITIES[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        background: hov ? "rgba(108,99,255,0.08)" : C.bl,
        border: `1px solid ${hov ? "rgba(108,99,255,0.3)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 16, padding: "1.25rem", display: "flex", gap: 12, alignItems: "flex-start",
        transition: "all 0.2s", cursor: "default",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(108,99,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>
        {cap.icon}
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: "0.875rem", color: C.t, marginBottom: 4 }}>{cap.label}</div>
        <div style={{ fontSize: "0.775rem", color: C.t2, lineHeight: 1.5 }}>{cap.desc}</div>
      </div>
    </div>
  );
}

function ProductModal({ id, onClose }: { id: string; onClose: () => void }) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#111128", border: `1px solid ${p.color}30`, borderRadius: 24, width: "100%", maxWidth: 480, overflow: "hidden", boxShadow: `0 0 60px ${p.color}40`, position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.08)", border: "none", color: "#9090b0", cursor: "pointer", padding: "6px 10px", borderRadius: 8, fontSize: "0.875rem" }}>✕</button>
        <div style={{ height: 4, background: `linear-gradient(90deg, ${p.color}, ${p.color}80)` }} />
        <div style={{ padding: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1.25rem" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: p.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem" }}>{p.icon}</div>
            <div>
              <h3 style={{ fontWeight: 900, fontSize: "1.2rem", color: "#e8e8f0" }}>{p.name}</h3>
              <p style={{ fontSize: "0.8rem", color: "#9090b0" }}>{p.desc}</p>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "1rem", marginBottom: "1.25rem" }}>
            <div style={{ fontSize: "0.65rem", color: "#5a5a7a", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "monospace", marginBottom: 4 }}>Investment</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 900, color: p.color }}>{p.price}</div>
          </div>
          <p style={{ fontSize: "0.875rem", color: "#9090b0", lineHeight: 1.7, marginBottom: "1.5rem" }}>{p.tagline}</p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: 8 }}>
            {p.features.map(f => (
              <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.85rem", color: "#9090b0" }}>
                <CheckCircle size={14} color="#6c63ff" style={{ flexShrink: 0, marginTop: 2 }} />
                {f}
              </li>
            ))}
          </ul>
          <button style={{ width: "100%", padding: "0.875rem", borderRadius: 12, background: p.color, color: "#fff", border: "none", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={onClose}>
            Request Proposal →
          </button>
        </div>
      </div>
    </div>
  );
}

export { PRODUCTS, CAPABILITIES };
export default App;
