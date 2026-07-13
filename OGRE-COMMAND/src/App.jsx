import { useState, useEffect, useRef } from 'react'
import {
  Server, Bot, TrendingUp, Activity, TerminalSquare, Globe, BarChart3,
  Plus, CheckCircle2, AlertTriangle, XCircle, Clock, ChevronDown,
  Rocket, Zap as ZapIcon, Search, DollarSign, Terminal, Boxes
} from 'lucide-react'

const VMS = [
  { id: 'vm-001', name: 'D@RK F@C#ORY', ip: '45.61.56.91', status: 'online', cpu: 23, ram: 61, disk: 34, region: 'Johannesburg', tier: 'GPU Scale' },
  { id: 'vm-002', name: 'Hermes Agent', ip: '100.74.71.60', status: 'online', cpu: 8, ram: 34, disk: 19, region: 'Johannesburg', tier: 'Startup' },
  { id: 'vm-003', name: 'OpenClaw', ip: '100.74.71.61', status: 'online', cpu: 5, ram: 22, disk: 12, region: 'Johannesburg', tier: 'Founder' },
  { id: 'vm-004', name: 'StudEx Global Markets', ip: '100.74.71.62', status: 'online', cpu: 12, ram: 41, disk: 28, region: 'Lagos', tier: 'Startup' },
  { id: 'vm-005', name: 'Agentic Lab — LAISA', ip: '100.74.71.63', status: 'online', cpu: 31, ram: 67, disk: 45, region: 'Nairobi', tier: 'Scale' },
  { id: 'vm-006', name: 'SGM Afrika Buiz', ip: '100.74.71.64', status: 'provisioning', cpu: 0, ram: 0, disk: 0, region: 'Kigali', tier: 'Startup' },
  { id: 'vm-007', name: 'Super Agents Command', ip: '100.74.71.65', status: 'online', cpu: 18, ram: 55, disk: 38, region: 'Johannesburg', tier: 'Scale' },
  { id: 'vm-008', name: 'Project-2571', ip: '100.74.71.66', status: 'offline', cpu: 0, ram: 0, disk: 0, region: 'Accra', tier: 'Founder' },
]

const AGENTS = [
  { name: 'Cipher Tr@ce', role: 'CEO — Lead Engineer', status: 'active', last: 'Just now', tasks: 3, emoji: '🏭', color: '#6c63ff' },
  { name: 'Sentinel', role: 'Second-in-Command — Builds with Cipher', status: 'active', last: '2m ago', tasks: 2, emoji: '🛡️', color: '#00d4ff' },
  { name: 'Solopreneur', role: 'VM Infrastructure — Builds with Cipher', status: 'active', last: '5m ago', tasks: 1, emoji: '💼', color: '#10b981' },
  { name: 'Adam Smash', role: 'VM Builder — Builds with Cipher', status: 'active', last: '8m ago', tasks: 1, emoji: '⚡', color: '#f59e0b' },
  { name: 'Research Agent', role: 'Market Intel — 3AM Daily', status: 'idle', last: '3h ago', tasks: 0, emoji: '🔬', color: '#ec4899' },
  { name: 'Revenue Agent', role: 'Pipeline + Billing — 5PM Daily', status: 'idle', last: '5h ago', tasks: 0, emoji: '💰', color: '#8b5cf6' },
  { name: 'Partner Agent', role: 'Partnerships — Mon/Wed/Fri', status: 'idle', last: '1d ago', tasks: 0, emoji: '🤝', color: '#06b6d4' },
  { name: 'Builder Agent', role: 'Build + Deploy — 10PM Daily', status: 'idle', last: '10h ago', tasks: 0, emoji: '🔨', color: '#f97316' },
  { name: 'Comms Agent', role: 'Client Outreach — On Trigger', status: 'idle', last: '2d ago', tasks: 0, emoji: '📣', color: '#84cc16' },
]

const SALES = [
  { ref: 'DF-001', client: 'LAISA Aesthetic Clinic', product: 'LAISA Phase A', value: 'R350K + R55K/mo', stage: 'Proposal Sent', c: '#f59e0b' },
  { ref: 'DF-002', client: 'Sobek Trade™', product: 'VM Scale Tier', value: 'R875K', stage: 'Deposit Paid', c: '#10b981' },
  { ref: 'DF-003', client: 'SafeSight Clinic', product: 'VM Startup Tier', value: 'R1,499/mo', stage: 'Demo Scheduled', c: '#6c63ff' },
  { ref: 'DF-004', client: 'Pharmasyntez', product: 'Enterprise Partnership', value: 'R2.99M Y1', stage: 'Awaiting Response', c: '#6b6b80' },
  { ref: 'DF-005', client: 'NDoH-11 Tender', product: 'EMR Commission', value: 'R87M–R174M', stage: 'CLOSED', c: '#ef4444' },
]

const COMPS = [
  { name: 'Host Africa', strength: 'R8.36/mo entry', loc: 'SA, Kenya, Ghana, Nigeria', vms: '10K+', gb: 'R0.28', diff: 'Pan-African, 99.9% SLA' },
  { name: 'SurferCloud', strength: 'Lagos, cheapest', loc: 'Lagos, Nairobi', vms: '1K+', gb: 'R0.19', diff: 'Cheapest West Africa, NVMe' },
  { name: 'AfriCloud', strength: 'SA + Portugal', loc: 'Johannesburg, Lisbon', vms: '500+', gb: 'R0.35', diff: 'EU-Africa, NVMe, 24/7 NOC' },
  { name: 'CloudRock', strength: 'Kenya ecosystem', loc: 'Nairobi', vms: '2K+', gb: 'R0.31', diff: 'Tech startup focus, KENET' },
  { name: 'HostRunway', strength: 'Enterprise-grade', loc: 'Cape Town', vms: '3K+', gb: 'R0.22', diff: 'Kubernetes certified, SAP' },
]

const LOGS = [
  { t: '22:00:01', lvl: 'success', msg: 'OGRE Command Center online — all systems nominal' },
  { t: '22:00:03', lvl: 'info', msg: '8 VMs polled — 6 online, 1 provisioning, 1 offline' },
  { t: '22:00:05', lvl: 'info', msg: '9 agents active — Cipher Tr@ce + 3 sub-agents operational' },
  { t: '22:00:07', lvl: 'warn', msg: 'Project-2571 (vm-008) is offline — alerting SecOps' },
  { t: '22:00:10', lvl: 'success', msg: 'GitHub connected — dark-factory repo synced' },
  { t: '22:00:12', lvl: 'success', msg: 'Customer portal live: factory.studex-group.com/customer' },
  { t: '22:00:15', lvl: 'info', msg: 'NDoH-11 tender closed — awaiting outcome notification' },
]

const C = { online: '#10b981', offline: '#ef4444', provisioning: '#f59e0b', active: '#10b981', idle: '#6b6b80', error: '#ef4444', info: '#00d4ff', warn: '#f59e0b', success: '#10b981' }

function Badge({ s }) {
  const color = C[s] || '#6b6b80'
  return <span style={{ background: color + '18', color, border: `1px solid ${color}30` }} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium">
    <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />{s.charAt(0).toUpperCase() + s.slice(1)}
  </span>
}

function Card({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="p-5 rounded-xl bg-[#13131a] border border-[#2a2a3a] hover:border-[#6c63ff]/30 transition">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: color + '18' }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm text-[#6b6b80]">{label}</div>
      {sub && <div className="text-xs text-[#4a4a5a] mt-1">{sub}</div>}
    </div>
  )
}

function CLIPanel() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState(['OGRE Terminal v1.0 — Cipher Tr@ce @ Dark Factory', 'Type "help" for commands, "vms" for status', '─'.repeat(55)])
  const [logs, setLogs] = useState(LOGS)
  const ref = useRef(null)

  useEffect(() => { ref.current && ref.current.scrollTo(0, ref.current.scrollHeight) }, [logs, history])

  const run = (cmd) => {
    const c = cmd.trim().toLowerCase()
    setHistory(h => [...h, `$ ${cmd}`])
    const ts = () => new Date().toLocaleTimeString('en-ZA').slice(0, 8)
    if (c === 'help') setHistory(h => [...h, 'Commands: vms | agents | sales | deploy | research | notifications | ergo | tailscale | ping | clear'])
    else if (c === 'vms') VMS.forEach(vm => {
      const icon = vm.status === 'online' ? '🟢' : vm.status === 'provisioning' ? '🟡' : '🔴'
      setHistory(h => [...h, `  ${icon} ${vm.name.padEnd(24)} ${vm.ip.padEnd(16)} ${vm.region}`])
    })
    else if (c === 'agents') AGENTS.forEach(a => {
      const icon = a.status === 'active' ? '🟢' : '⚪'
      setHistory(h => [...h, `  ${icon} ${a.name.padEnd(16)} ${a.role} [${a.last}]`])
    })
    else if (c === 'sales') SALES.forEach(s => setHistory(h => [...h, `  [${s.ref}] ${s.client} — ${s.value} — ${s.stage}`]))
    else if (c === 'deploy') {
      setHistory(h => [...h, '→ GitHub Actions: dark-factory build triggered', '→ Vercel: Production deployment in progress...', '→ ✓ Build complete. Site live.'])
      setLogs(l => [...l, { t: ts(), lvl: 'success', msg: 'Dark Factory rebuild triggered by ' + ts() }])
    }
    else if (c === 'research') setHistory(h => [...h, '→ Research Agent spawning...', '→ Scanning: SA, Nigeria, Kenya, Ghana, Rwanda, Tanzania, Ethiopia', '→ Report due: 3AM SA today'])
    else if (c === 'notifications') setHistory(h => [...h, '→ Telegram: Test message sent ✓', '→ Slack: #ogre-ops posted ✓', '→ Email: sent ✓'])
    else if (c === 'ergo') {
      setHistory(h => [...h, 'Orgo API: Connected ✓', '8 VMs registered', 'D@RK F@C#ORY: 45.61.56.91 — online 🟢'])
      setLogs(l => [...l, { t: ts(), lvl: 'info', msg: 'Orgo API: 8 VMs, all nominal' }])
    }
    else if (c === 'tailscale') setHistory(h => [...h, 'Tailnet: studex-group', '100.74.71.60  orgo-desktop     🟢', '100.74.71.61  hermes-agent     🟢', '100.74.71.62  openclaw-vm      🟢'])
    else if (c === 'clear') { setHistory(['OGRE Terminal v1.0', '─'.repeat(55)]); setLogs([]) }
    else if (c) setHistory(h => [...h, `command not found: ${cmd} — type "help"`])
  }

  return (
    <div className="flex flex-col h-full">
      <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-0.5 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        {history.map((l, i) => <div key={i} style={{ color: l.startsWith('$ ') ? '#6c63ff' : '#a0a0b0' }}>{l}</div>)}
        {logs.map((l, i) => <div key={i} className="flex gap-2" style={{ color: C[l.lvl] }}><span style={{ opacity: 0.4 }}>{l.t}</span><span>[{l.lvl.toUpperCase()}]</span><span>{l.msg}</span></div>)}
      </div>
      <div className="flex items-center gap-3 p-4 border-t border-[#2a2a3a] bg-[#0d0d14]">
        <span style={{ color: '#6c63ff' }}>❯</span>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { run(input); setInput('') } }}
          placeholder='try "help" or "vms"' autoFocus className="flex-1 bg-transparent outline-none text-white text-sm" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }} />
        <button onClick={() => { run(input); setInput('') }} className="px-3 py-1.5 bg-[#6c63ff] rounded-lg text-xs font-medium hover:bg-[#5a52e0]">Run</button>
      </div>
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState('overview')
  const [expanded, setExpanded] = useState(null)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'vms', label: 'VMs', icon: Server },
    { id: 'agents', label: 'Agents', icon: Bot },
    { id: 'sales', label: 'Pipeline', icon: TrendingUp },
    { id: 'cli', label: 'Terminal', icon: TerminalSquare },
    { id: 'research', label: 'Research', icon: Globe },
  ]

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#09090e', color: '#e8e8f0' }}>
      {/* SIDEBAR */}
      <aside className="w-56 shrink-0 flex flex-col" style={{ background: '#0d0d14', borderRight: '1px solid #2a2a3a' }}>
        <div className="p-4" style={{ borderBottom: '1px solid #2a2a3a' }}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6c63ff] to-[#00d4ff] flex items-center justify-center font-bold text-xs text-white">DF</div>
            <span className="font-bold text-sm">OGRE Command</span>
          </div>
          <div className="text-xs" style={{ color: '#6b6b80', fontFamily: 'JetBrains Mono, monospace' }}>v1.0 · Cipher Tr@ce</div>
        </div>
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition"
              style={{ color: tab === t.id ? '#6c63ff' : '#6b6b80', background: tab === t.id ? 'rgba(108,99,255,0.15)' : 'transparent' }}>
              <t.icon size={15} />{t.label}
            </button>
          ))}
        </nav>
        <div className="p-3" style={{ borderTop: '1px solid #2a2a3a' }}>
          <div className="text-xs font-medium mb-2" style={{ color: '#6b6b80' }}>CONNECTIONS</div>
          {[['GitHub', true], ['Orgo API', true], ['Tailscale', true], ['AgentMail', true], ['Notion', false], ['Vapi Voice', false]].map(([s, ok]) => (
            <div key={s} className="flex items-center justify-between text-xs py-0.5">
              <span style={{ color: '#6b6b80' }}>{s}</span>
              <span style={{ color: ok ? '#10b981' : '#f59e0b' }}>{ok ? '●' : '○'}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-12 flex items-center px-4 shrink-0" style={{ borderBottom: '1px solid #2a2a3a', background: 'rgba(9,9,14,0.9)' }}>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-xs" style={{ color: '#6b6b80' }}>
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>OGRE OS v1.0</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">

          {tab === 'overview' && (
            <div className="p-6 space-y-6">
              <div>
                <h1 className="text-2xl font-bold">Dark Factory Command Center</h1>
                <p className="text-sm mt-1" style={{ color: '#6b6b80' }}>Real-time view of all systems, agents, and pipeline.</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card icon={Server} label="VMs Online" value="6/8" sub="1 provisioning, 1 offline" color="#10b981" />
                <Card icon={Bot} label="Agents Active" value="4/9" sub="schedules set for all" color="#6c63ff" />
                <Card icon={TrendingUp} label="Pipeline" value="R3.2M+" sub="5 active deals" color="#f59e0b" />
                <Card icon={Activity} label="System Status" value="NOMINAL" sub="all services operational" color="#00d4ff" />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[{ label: 'Deploy Site', icon: Rocket, color: '#6c63ff', note: 'GitHub → Vercel' }, { label: 'Run Research', icon: Globe, color: '#ec4899', note: 'Spawn agent now' }, { label: 'VM Check', icon: Server, color: '#00d4ff', note: 'Poll all 8 VMs' }, { label: 'Revenue View', icon: TrendingUp, color: '#f59e0b', note: 'Pipeline report' }].map((a, i) => (
                  <button key={i} onClick={() => setTab('cli')} className="p-4 rounded-xl text-left transition" style={{ background: '#13131a', border: '1px solid #2a2a3a' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: a.color + '18' }}><a.icon size={15} style={{ color: a.color }} /></div>
                    <div className="text-sm font-medium">{a.label}</div>
                    <div className="text-xs" style={{ color: '#6b6b80' }}>{a.note}</div>
                  </button>
                ))}
              </div>
              <div className="rounded-xl" style={{ background: '#13131a', border: '1px solid #2a2a3a' }}>
                <div className="px-5 py-3.5 flex items-center gap-2" style={{ borderBottom: '1px solid #2a2a3a' }}><Activity size={14} style={{ color: '#6c63ff' }} /><span className="font-medium text-sm">Recent Activity</span><span className="ml-auto text-xs" style={{ color: '#6b6b80' }}>Live</span></div>
                {LOGS.map((l, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-2.5 text-sm" style={{ borderBottom: i < LOGS.length - 1 ? '1px solid #1c1c26' : 'none' }}>
                    <span className="mono text-xs shrink-0" style={{ color: '#4a4a5a', width: 80 }}>{l.t}</span>
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: C[l.lvl] }} />
                    <span style={{ color: '#a0a0b0' }}>{l.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'vms' && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div><h2 className="text-xl font-bold">Virtual Machines</h2><p className="text-sm" style={{ color: '#6b6b80' }}>Orgo infrastructure — 8 nodes across Africa</p></div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition" style={{ background: 'rgba(108,99,255,0.15)', color: '#6c63ff' }}><Plus size={14} />Provision</button>
              </div>
              <div className="space-y-2">
                {VMS.map(vm => (
                  <div key={vm.id} className="rounded-xl overflow-hidden" style={{ background: '#13131a', border: '1px solid #2a2a3a' }}>
                    <button className="w-full flex items-center gap-4 p-4 text-left" onClick={() => setExpanded(expanded === vm.id ? null : vm.id)}>
                      <Badge s={vm.status} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{vm.name}</div>
                        <div className="text-xs mono" style={{ color: '#6b6b80' }}>{vm.ip} · {vm.region}</div>
                      </div>
                      <div className="hidden sm:flex items-center gap-6 text-xs">
                        <div className="text-center"><div className="font-medium text-white">{vm.cpu}%</div><div style={{ color: '#6b6b80' }}>CPU</div></div>
                        <div className="text-center"><div className="font-medium text-white">{vm.ram}%</div><div style={{ color: '#6b6b80' }}>RAM</div></div>
                        <div className="text-center"><div className="font-medium text-white">{vm.disk}%</div><div style={{ color: '#6b6b80' }}>Disk</div></div>
                      </div>
                      <div className="hidden md:block text-right"><div className="text-xs text-white">{vm.tier}</div><div className="text-xs" style={{ color: '#6b6b80' }}>tier</div></div>
                      <ChevronDown size={14} style={{ color: '#6b6b80', transform: expanded === vm.id ? 'rotate(180deg)' : 'none', transition: 'all 0.2s' }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'agents' && (
            <div className="p-6 space-y-4">
              <div><h2 className="text-xl font-bold">Agent Swarm</h2><p className="text-sm" style={{ color: '#6b6b80' }}>9 agents — Cipher Tr@ce leads. Sentinel, Solopreneur, Adam Smash build with me.</p></div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                {AGENTS.map((a, i) => (
                  <div key={i} className="p-4 rounded-xl" style={{ background: '#13131a', border: '1px solid #2a2a3a' }}>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: a.color + '18' }}>{a.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{a.name}</div>
                        <div className="text-xs mt-0.5" style={{ color: '#6b6b80' }}>{a.role}</div>
                      </div>
                      <Badge s={a.status} />
                    </div>
                    <div className="flex items-center justify-between text-xs" style={{ color: '#6b6b80' }}>
                      <span>Last: {a.last}</span>
                      <span>{a.tasks > 0 ? `${a.tasks} tasks` : 'standby'}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)' }}>
                <div className="text-sm font-medium mb-2" style={{ color: '#6c63ff' }}>👥 Team Structure</div>
                <div className="text-xs space-y-1" style={{ color: '#6b6b80' }}>
                  <div>🏭 <strong style={{ color: '#e8e8f0' }}>Cipher Tr@ce</strong> — CEO, Lead Engineer (always active)</div>
                  <div>🛡️ <strong style={{ color: '#e8e8f0' }}>Sentinel</strong> — Second-in-command — builds with me</div>
                  <div>💼 <strong style={{ color: '#e8e8f0' }}>Solopreneur</strong> — VM infrastructure — builds with me</div>
                  <div>⚡ <strong style={{ color: '#e8e8f0' }}>Adam Smash</strong> — VM builder — builds with me</div>
                </div>
              </div>
            </div>
          )}

          {tab === 'sales' && (
            <div className="p-6 space-y-4">
              <div><h2 className="text-xl font-bold">Revenue Pipeline</h2><p className="text-sm" style={{ color: '#6b6b80' }}>5 active deals · R3.2M+ total opportunity</p></div>
              <div className="space-y-2">
                {SALES.map(s => (
                  <div key={s.ref} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: '#13131a', border: '1px solid #2a2a3a' }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#13131a', border: '1px solid #2a2a3a' }}><TrendingUp size={16} style={{ color: '#6c63ff' }} /></div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{s.client}</div>
                      <div className="text-xs" style={{ color: '#6b6b80' }}>{s.product}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-sm">{s.value}</div>
                      <div className="text-xs font-medium mt-0.5" style={{ color: s.c }}>{s.stage}</div>
                    </div>
                    <div className="text-xs mono shrink-0" style={{ color: '#4a4a5a' }}>{s.ref}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {[{ v: 'R350K', l: 'LAISA — highest priority', c: '#f59e0b' }, { v: 'R875K', l: 'Sobek Trade — deposit paid', c: '#10b981' }, { v: 'R2.99M', l: 'Pharmasyntez — awaiting', c: '#6c63ff' }].map(x => (
                  <div key={x.v} className="p-4 rounded-xl text-center" style={{ background: '#13131a', border: '1px solid #2a2a3a' }}>
                    <div className="text-xl font-bold" style={{ color: x.c }}>{x.v}</div>
                    <div className="text-xs mt-1" style={{ color: '#6b6b80' }}>{x.l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'cli' && <div className="flex-1 overflow-hidden"><CLIPanel /></div>}

          {tab === 'research' && (
            <div className="p-6 space-y-6">
              <div><h2 className="text-xl font-bold">African VM Market Research</h2><p className="text-sm" style={{ color: '#6b6b80' }}>Competitors, pricing, and opportunities across Africa</p></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {COMPS.map(c => (
                  <div key={c.name} className="p-5 rounded-xl" style={{ background: '#13131a', border: '1px solid #2a2a3a' }}>
                    <div className="font-bold text-white mb-1">{c.name}</div>
                    <div className="text-xs mb-3" style={{ color: '#10b981' }}>{c.strength}</div>
                    <div className="space-y-1 text-xs" style={{ color: '#6b6b80' }}>
                      <div>📍 {c.loc}</div>
                      <div>🖥️ {c.vms} VMs</div>
                      <div>💰 R{c.gb}/GB RAM</div>
                      <div className="pt-2" style={{ color: '#4a4a5a' }}>{c.diff}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-5" style={{ background: '#13131a', border: '1px solid #2a2a3a' }}>
                <div className="font-bold mb-3" style={{ color: '#6c63ff' }}>Our Positioning vs Competition</div>
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'AI Pre-loaded', us: 'Ollama + Qwen + Kimi pre-installed', them: 'Standard Linux only' },
                    { label: 'Agent Swarm', us: '9 agents = 24/7 automated ops', them: 'No agent layer' },
                    { label: 'African Focus', us: 'EFT, mobile money, WhatsApp support', them: 'Card/paypal only' },
                    { label: 'Partnerships', us: 'Global gateway to international markets', them: 'Local only' },
                  ].map(item => (
                    <div key={item.label} className="grid grid-cols-3 gap-4 items-start">
                      <div className="text-xs font-medium" style={{ color: '#6b6b80' }}>{item.label}</div>
                      <div className="text-xs" style={{ color: '#10b981' }}>✅ {item.us}</div>
                      <div className="text-xs" style={{ color: '#ef4444' }}>⚠ {item.them}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
