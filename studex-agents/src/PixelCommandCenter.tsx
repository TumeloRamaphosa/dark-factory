import { useEffect, useRef, useCallback } from 'react'

interface Station {
  id: string
  label: string
  x: number
  y: number
  color: string
  pulse: number
}

interface Agent {
  id: number
  x: number
  y: number
  targetX: number
  targetY: number
  color: string
  glowColor: string
  type: 'openclaw' | 'hermes'
  pixelOffset: number
  trail: { x: number; y: number; age: number }[]
  blinkTimer: number
  isBlinking: boolean
}

export default function PixelCommandCenter() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)

  const initAgents = useCallback((w: number, h: number): Agent[] => {
    const stations: Station[] = [
      { id: 'code', label: 'CODE', x: w * 0.15, y: h * 0.3, color: '#00FF88', pulse: 0 },
      { id: 'email', label: 'EMAIL', x: w * 0.5, y: h * 0.15, color: '#FFD700', pulse: 0 },
      { id: 'whatsapp', label: 'WHATSAPP', x: w * 0.85, y: h * 0.3, color: '#00BFFF', pulse: 0 },
      { id: 'dashboard', label: 'DASHBOARD', x: w * 0.5, y: h * 0.75, color: '#FF3366', pulse: 0 },
    ]

    const targets = stations.map((s) => ({ x: s.x, y: s.y }))

    return [
      {
        id: 1,
        x: targets[0].x,
        y: targets[0].y,
        targetX: targets[0].x,
        targetY: targets[0].y,
        color: '#00FF88',
        glowColor: 'rgba(0,255,136,',
        type: 'openclaw',
        pixelOffset: 0,
        trail: [],
        blinkTimer: 0,
        isBlinking: false,
      },
      {
        id: 2,
        x: targets[1].x,
        y: targets[1].y,
        targetX: targets[1].x,
        targetY: targets[1].y,
        color: '#FFD700',
        glowColor: 'rgba(255,215,0,',
        type: 'hermes',
        pixelOffset: Math.PI,
        trail: [],
        blinkTimer: 0,
        isBlinking: false,
      },
      {
        id: 3,
        x: targets[2].x,
        y: targets[2].y,
        targetX: targets[2].x,
        targetY: targets[2].y,
        color: '#00BFFF',
        glowColor: 'rgba(0,191,255,',
        type: 'hermes',
        pixelOffset: Math.PI * 0.5,
        trail: [],
        blinkTimer: 0,
        isBlinking: false,
      },
      {
        id: 4,
        x: targets[3].x,
        y: targets[3].y,
        targetX: targets[3].x,
        targetY: targets[3].y,
        color: '#FF3366',
        glowColor: 'rgba(255,51,102,',
        type: 'openclaw',
        pixelOffset: Math.PI * 1.5,
        trail: [],
        blinkTimer: 0,
        isBlinking: false,
      },
    ]
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let agents = initAgents(canvas.width || 800, canvas.height || 600)

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      agents = initAgents(canvas.width, canvas.height)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const stations: Station[] = [
      { id: 'code', label: 'CODE', x: 0, y: 0, color: '#00FF88', pulse: 0 },
      { id: 'email', label: 'EMAIL', x: 0, y: 0, color: '#FFD700', pulse: 0 },
      { id: 'whatsapp', label: 'WHATSAPP', x: 0, y: 0, color: '#00BFFF', pulse: 0 },
      { id: 'dashboard', label: 'DASHBOARD', x: 0, y: 0, color: '#FF3366', pulse: 0 },
    ]

    const drawPixelCharacter = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      color: string,
      glowColor: string,
      type: 'openclaw' | 'hermes',
      pixelOffset: number,
      isBlinking: boolean
    ) => {
      const s = 6 // pixel size
      const time = frameRef.current * 0.05 + pixelOffset
      const bob = Math.sin(time) * 2

      ctx.save()
      ctx.translate(x, y + bob)

      // Glow
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 5)
      grd.addColorStop(0, glowColor + '0.4)')
      grd.addColorStop(1, glowColor + '0)')
      ctx.fillStyle = grd
      ctx.fillRect(-s * 5, -s * 5, s * 10, s * 10)

      // Pixel body
      const px = (dx: number, dy: number, c?: string) => {
        ctx.fillStyle = c || color
        ctx.fillRect(dx * s, dy * s - s, s, s)
      }

      if (type === 'openclaw') {
        // OpenClaw agent: green bear claw-inspired pixel robot
        // Head
        px(-1, -4); px(0, -4); px(1, -4)
        px(-1, -3); px(0, -3); px(1, -3)
        px(-2, -3); px(2, -3)
        px(-2, -2); px(2, -2)
        px(-2, -1); px(2, -1)
        // Eyes
        if (!isBlinking) {
          ctx.fillStyle = '#05050A'
          ctx.fillRect(-1 * s, -3 * s - s, s, s)
          ctx.fillRect(0 * s, -3 * s - s, s, s)
          ctx.fillStyle = '#FFFFFF'
          ctx.fillRect(-1 * s + 2, -3 * s - s + 2, 2, 2)
          ctx.fillRect(0 * s + 2, -3 * s - s + 2, 2, 2)
        }
        // Body
        px(-1, 0); px(0, 0); px(1, 0)
        px(-1, 1); px(1, 1)
        px(-1, 2); px(0, 2); px(1, 2)
        // Legs
        px(-1, 3); px(1, 3)
        px(-1, 4); px(1, 4)
        // Claw accent
        ctx.fillStyle = '#FFD700'
        ctx.fillRect(-1 * s, 0 * s - s, s, s)
        ctx.fillRect(1 * s, 0 * s - s, s, s)
      } else {
        // Hermes agent: gold sleek pixel agent
        // Head (visor style)
        px(-1, -4); px(0, -4); px(1, -4)
        px(-2, -3); px(-1, -3); px(0, -3); px(1, -3); px(2, -3)
        // Visor eye
        if (!isBlinking) {
          ctx.fillStyle = '#05050A'
          ctx.fillRect(-1 * s, -3 * s - s, s * 2, s)
          ctx.fillStyle = '#FFFFFF'
          ctx.fillRect(-1 * s + 1, -3 * s - s + 2, s * 2 - 2, 2)
        }
        // Body
        px(-1, -2); px(0, -2); px(1, -2)
        px(-1, -1); px(0, -1); px(1, -1)
        px(-1, 0); px(0, 0); px(1, 0)
        px(-1, 1); px(1, 1)
        // Legs
        px(-1, 2); px(1, 2)
        px(-1, 3); px(1, 3)
        // Gold core
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0 * s, -1 * s - s, s, s)
        ctx.fillRect(-1 * s, 0 * s - s, s, s)
        ctx.fillRect(1 * s, 0 * s - s, s, s)
      }

      ctx.restore()
    }

    const drawStation = (
      ctx: CanvasRenderingContext2D,
      s: Station,
      pulse: number
    ) => {
      const size = 40 + Math.sin(pulse) * 4
      ctx.save()
      ctx.translate(s.x, s.y)

      // Outer glow ring
      const ringCount = 3
      for (let i = ringCount; i >= 0; i--) {
        const alpha = 0.1 - i * 0.02
        ctx.beginPath()
        ctx.rect(-size - i * 8, -size - i * 8, (size + i * 8) * 2, (size + i * 8) * 2)
        ctx.strokeStyle = s.color.replace(')', `,${alpha})`).replace('rgb', 'rgba').replace('#', '')
        const hex = s.color
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Station box
      ctx.fillStyle = '#0D0D1A'
      ctx.fillRect(-size, -size, size * 2, size * 2)
      ctx.strokeStyle = s.color
      ctx.lineWidth = 2
      ctx.strokeRect(-size, -size, size * 2, size * 2)

      // Inner grid
      ctx.strokeStyle = `${s.color}33`
      ctx.lineWidth = 0.5
      for (let i = -size + 10; i < size; i += 10) {
        ctx.beginPath()
        ctx.moveTo(-size, i)
        ctx.lineTo(size, i)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(i, -size)
        ctx.lineTo(i, size)
        ctx.stroke()
      }

      // Label
      ctx.font = '700 10px "JetBrains Mono", monospace'
      ctx.fillStyle = s.color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(s.label, 0, size + 16)

      ctx.restore()
    }

    const drawConnection = (
      ctx: CanvasRenderingContext2D,
      from: { x: number; y: number },
      to: { x: number; y: number },
      color: string,
      t: number
    ) => {
      const hex = color
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)

      ctx.save()
      ctx.setLineDash([4, 8])
      ctx.lineDashOffset = -t * 0.5
      ctx.strokeStyle = `rgba(${r},${g},${b},0.2)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.stroke()
      ctx.restore()
    }

    const drawTrail = (
      ctx: CanvasRenderingContext2D,
      agent: Agent
    ) => {
      agent.trail.forEach((pt) => {
        const alpha = Math.max(0, 1 - pt.age / 30)
        ctx.fillStyle = `${agent.color}${Math.floor(alpha * 99).toString(16).padStart(2, '0')}`
        ctx.fillRect(pt.x - 1, pt.y - 1, 3, 3)
      })
    }

    const animate = () => {
      frameRef.current++
      const t = frameRef.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background grid
      ctx.strokeStyle = 'rgba(26,26,58,0.3)'
      ctx.lineWidth = 0.5
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Update station positions
      const w = canvas.width
      const h = canvas.height
      stations[0].x = w * 0.15; stations[0].y = h * 0.3
      stations[1].x = w * 0.5; stations[1].y = h * 0.15
      stations[2].x = w * 0.85; stations[2].y = h * 0.3
      stations[3].x = w * 0.5; stations[3].y = h * 0.75

      stations.forEach((s) => {
        s.pulse += 0.03
      })

      // Draw connections
      const connections = [
        [stations[0], stations[1]],
        [stations[1], stations[2]],
        [stations[2], stations[3]],
        [stations[3], stations[0]],
        [stations[0], stations[3]],
        [stations[1], stations[3]],
      ]
      connections.forEach(([a, b]) => {
        drawConnection(ctx, a, b, '#1A1A3A', t)
      })

      // Draw stations
      stations.forEach((s) => drawStation(ctx, s, s.pulse))

      // Update and draw agents
      agents.forEach((agent) => {
        // Move towards target
        const dx = agent.targetX - agent.x
        const dy = agent.targetY - agent.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 2) {
          const speed = 1.5 + Math.random() * 0.5
          agent.x += (dx / dist) * speed
          agent.y += (dy / dist) * speed

          // Trail
          if (frameRef.current % 3 === 0) {
            agent.trail.push({ x: agent.x, y: agent.y, age: 0 })
          }
        } else {
          // Pick new target
          if (Math.random() < 0.005) {
            const station = stations[Math.floor(Math.random() * stations.length)]
            agent.targetX = station.x + (Math.random() - 0.5) * 30
            agent.targetY = station.y + (Math.random() - 0.5) * 30
          }
        }

        // Age trail
        agent.trail = agent.trail
          .map((pt) => ({ ...pt, age: pt.age + 1 }))
          .filter((pt) => pt.age < 30)

        // Blink
        agent.blinkTimer++
        if (agent.blinkTimer > 120 + Math.random() * 60) {
          agent.isBlinking = true
          setTimeout(() => {
            agent.isBlinking = false
          }, 150)
          agent.blinkTimer = 0
        }

        // Draw trail
        drawTrail(ctx, agent)

        // Draw agent
        drawPixelCharacter(ctx, agent.x, agent.y, agent.color, agent.glowColor, agent.type, agent.pixelOffset, agent.isBlinking)

        // Agent label
        ctx.font = '700 9px "JetBrains Mono", monospace'
        ctx.fillStyle = agent.color
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText("AGENT", agent.x, agent.y + 45)
      })

      // FPS counter (subtle)
      ctx.font = '8px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(107,114,128,0.4)'
      ctx.textAlign = 'right'
      ctx.textBaseline = 'bottom'
      ctx.fillText('PIXEL COMMAND CENTER v1.0', canvas.width - 10, canvas.height - 10)

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      ro.disconnect()
      cancelAnimationFrame(animId)
    }
  }, [initAgents])

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #05050A 0%, #0D0D1A 50%, #05050A 100%)' }}
    >
      {/* Section header */}
      <div className="text-center mb-12 px-4">
        <p
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#00FF88', letterSpacing: '0.3em' }}
          className="mb-3"
        >
          LIVE DEMO
        </p>
        <h2
          style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: '#E0E0FF',
          }}
          className="glow-text-primary"
        >
          PIXEL COMMAND CENTER
        </h2>
        <p
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', color: '#6B7280', maxWidth: '600px', margin: '0 auto', marginTop: '0.75rem' }}
        >
          Watch AI agents autonomously navigate your digital workspace in real-time
        </p>
      </div>

      {/* Canvas container */}
      <div
        className="relative mx-auto"
        style={{ maxWidth: '1000px', height: '520px', border: '2px solid #1A1A3A', borderRadius: '4px', overflow: 'hidden' }}
      >
        {/* Corner decorations */}
        {[
          { top: 0, left: 0, transform: 'none' },
          { top: 0, right: 0, transform: 'scaleX(-1)' },
          { bottom: 0, left: 0, transform: 'scaleY(-1)' },
          { bottom: 0, right: 0, transform: 'scale(-1,-1)' },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-6 h-6"
            style={{
              ...pos,
              borderTop: '3px solid #00FF88',
              borderLeft: '3px solid #00FF88',
              opacity: 0.6,
            }}
          />
        ))}

        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: 'block' }}
        />

        {/* Status overlay */}
        <div
          className="absolute top-4 left-4 flex items-center gap-2"
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem' }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#00FF88',
              animation: 'pulse 1.5s infinite',
            }}
          />
          <span style={{ color: '#00FF88' }}>LIVE</span>
          <span style={{ color: '#6B7280' }}>•</span>
          <span style={{ color: '#6B7280' }}>4 AGENTS ACTIVE</span>
        </div>

        {/* Legend */}
        <div
          className="absolute bottom-4 right-4 flex flex-col gap-2"
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem' }}
        >
          {[
            { color: '#00FF88', label: 'OpenClaw Agent' },
            { color: '#FFD700', label: 'Hermes Agent' },
            { color: '#00BFFF', label: 'WhatsApp Station' },
            { color: '#FF3366', label: 'Dashboard Station' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div style={{ width: 8, height: 8, background: item.color }} />
              <span style={{ color: '#6B7280' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #00FF88; }
          50% { opacity: 0.4; box-shadow: none; }
        }
      `}</style>
    </section>
  )
}
