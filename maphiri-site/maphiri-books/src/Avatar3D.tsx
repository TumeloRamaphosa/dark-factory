/// <reference types="three" />
/// <reference types="@react-three/fiber" />
import { useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Text, useCursor } from '@react-three/drei'
import { D, avatarMessages } from './ClaymorphismDesign'
import * as THREE from 'three'

// Speech synthesis helper
function speak(text: string, onEnd?: () => void) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.pitch = 1.1
  u.rate = 0.92
  u.volume = 1
  if (onEnd) u.onend = onEnd
  window.speechSynthesis.speak(u)
}

// ---- 3D Avatar Character ----
function MaphiriCharacter({ isTalking, waveAngle }: { isTalking: boolean; waveAngle: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const bodyRef = useRef<THREE.Mesh>(null)
  const headRef = useRef<THREE.Mesh>(null)
  const eyeLRef = useRef<THREE.Mesh>(null)
  const eyeRRef = useRef<THREE.Mesh>(null)
  const mouthRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    // Gentle idle float
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.08
    // Subtle body sway
    if (bodyRef.current) {
      bodyRef.current.rotation.z = Math.sin(t * 0.8) * 0.03
    }
    // Eye blink
    if (eyeLRef.current && eyeRRef.current) {
      const blink = Math.sin(t * 0.3) > 0.97 ? 0.1 : 1
      eyeLRef.current.scale.y = blink
      eyeRRef.current.scale.y = blink
    }
    // Mouth open/close when talking
    if (mouthRef.current) {
      mouthRef.current.scale.y = isTalking ? 0.6 + Math.sin(t * 12) * 0.4 : 0.1
    }
  })

  const skinColor = '#7D4A2C'
  const hairColor = '#1A0A00'
  const dressColor = D.PINK
  const eyeColor = '#2ECC71'

  return (
    <group ref={groupRef} rotation={[0, waveAngle, 0]}>
      {/* Body */}
      <mesh ref={bodyRef} position={[0, -0.7, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.42, 0.9, 16]} />
        <meshStandardMaterial color={dressColor} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.22, 12]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>

      {/* Head */}
      <mesh ref={headRef} position={[0, 0.25, 0]} castShadow>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshStandardMaterial color={skinColor} roughness={0.65} />
      </mesh>

      {/* Eyes */}
      <mesh ref={eyeLRef} position={[-0.14, 0.32, 0.38]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-0.14, 0.32, 0.43]}>
        <sphereGeometry args={[0.038, 10, 10]} />
        <meshStandardMaterial color={eyeColor} />
      </mesh>
      <mesh ref={eyeRRef} position={[0.14, 0.32, 0.38]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.14, 0.32, 0.43]}>
        <sphereGeometry args={[0.038, 10, 10]} />
        <meshStandardMaterial color={eyeColor} />
      </mesh>

      {/* Smile / Mouth */}
      <mesh ref={mouthRef} position={[0, 0.12, 0.41]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color="#C0392B" />
      </mesh>

      {/* Cheeks (blush) */}
      <mesh position={[-0.28, 0.18, 0.3]}>
        <sphereGeometry args={[0.075, 10, 10]} />
        <meshStandardMaterial color="#E91E8C" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0.28, 0.18, 0.3]}>
        <sphereGeometry args={[0.075, 10, 10]} />
        <meshStandardMaterial color="#E91E8C" transparent opacity={0.3} />
      </mesh>

      {/* Hair - Puffs */}
      {[
        [-0.3, 0.45, 0.1], [0.3, 0.45, 0.1],
        [-0.15, 0.6, 0.05], [0.15, 0.6, 0.05],
        [0, 0.65, 0.0], [-0.38, 0.25, 0.05],
        [0.38, 0.25, 0.05],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x as number, y as number, z as number]} castShadow>
          <sphereGeometry args={[0.16 - i * 0.01, 12, 12]} />
          <meshStandardMaterial color={hairColor} roughness={0.9} />
        </mesh>
      ))}

      {/* Hair top puff */}
      <mesh position={[0, 0.7, -0.05]} castShadow>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshStandardMaterial color={hairColor} roughness={0.9} />
      </mesh>

      {/* Arms - waving */}
      <mesh position={[-0.55, -0.55, 0]} rotation={[0, 0, 0.5]}>
        <capsuleGeometry args={[0.08, 0.5, 6, 12]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>
      <mesh position={[0.55, -0.45, 0.1]} rotation={[0.5, 0, -1.2 + (isTalking ? Math.sin(Date.now() * 0.005) * 0.3 : 0)]}>
        <capsuleGeometry args={[0.08, 0.5, 6, 12]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>

      {/* Book in hands */}
      <mesh position={[-0.6, -0.85, 0]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.35, 0.05, 0.28]} />
        <meshStandardMaterial color={D.PINK} roughness={0.5} />
      </mesh>
      <mesh position={[-0.6, -0.82, 0]}>
        <boxGeometry args={[0.33, 0.04, 0.26]} />
        <meshStandardMaterial color="#FFF8F0" roughness={0.8} />
      </mesh>
    </group>
  )
}

// ---- Scene ----
function Scene({ messageIndex, isTalking }: { messageIndex: number; isTalking: boolean }) {
  const [waveAngle, setWaveAngle] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setWaveAngle(a => {
        const next = a + (Math.random() - 0.5) * 0.4
        return Math.max(-0.8, Math.min(0.8, next))
      })
    }, 800)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 5, 3]} intensity={1.5} castShadow />
      <pointLight position={[-2, 2, 2]} color={D.PINK} intensity={0.8} />
      <pointLight position={[2, 1, -1]} color={D.LAVENDER} intensity={0.6} />

      <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.3}>
        <MaphiriCharacter isTalking={isTalking} waveAngle={waveAngle} />
      </Float>

      {/* Platform / ground shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]} receiveShadow>
        <cylinderGeometry args={[0.8, 0.9, 0.1, 32]} />
        <meshStandardMaterial color={D.PAPER_WARM} roughness={0.9} />
      </mesh>

      {/* Book floating next to avatar */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh position={[1.2, -0.2, 0]} rotation={[0.2, 0.5, 0.1]}>
          <boxGeometry args={[0.6, 0.08, 0.45]} />
          <meshStandardMaterial color={D.PINK} roughness={0.4} />
        </mesh>
      </Float>

      <Environment preset="sunset" />
    </>
  )
}

// ---- Avatar 3D Component (full page) ----
export default function Avatar3D({ onClose }: { onClose: () => void }) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [isTalking, setIsTalking] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  // TTS engine options: 'web' | 'voicebox' | 'kokoro' | 'edge'
  // VoiceBox.sh integration point: call window.voicebox.speak(text) when connected
  const message = avatarMessages[messageIndex]

  const advance = useCallback(() => {
    setIsTalking(false)
    setTimeout(() => {
      setMessageIndex(i => (i + 1) % avatarMessages.length)
    }, 400)
  }, [])

  const handleTalk = useCallback(() => {
    if (isTalking) { setIsTalking(false); window.speechSynthesis?.cancel(); return }
    setIsTalking(true)
    if (!isMuted) speak(message, () => { setIsTalking(false); advance() })
    else setTimeout(() => { setIsTalking(false); advance() }, 2500)
  }, [message, isMuted, isTalking, advance])

  const handleClose = () => {
    window.speechSynthesis?.cancel()
    onClose()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: `linear-gradient(135deg, ${D.PAPER} 0%, #FFF0F8 50%, #F0F8FF 100%)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: D.FONTS.body,
      overflow: 'hidden',
    }}>
      {/* Background blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[
          { w: 400, h: 400, x: '-10%', y: '-10%', bg: D.PEACH, op: 0.25 },
          { w: 350, h: 350, x: '60%', y: '5%', bg: D.LAVENDER, op: 0.2 },
          { w: 300, h: 300, x: '70%', y: '60%', bg: D.MINT, op: 0.2 },
          { w: 280, h: 280, x: '5%', y: '65%', bg: D.BABY_BLUE, op: 0.22 },
        ].map((b, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: b.x, top: b.y,
            width: b.w, height: b.h,
            borderRadius: '50%',
            background: b.bg,
            opacity: b.op,
            filter: 'blur(60px)',
            animation: `blob-float ${4 + i * 1.5}s ease-in-out ${i}s infinite alternate`,
          }} />
        ))}
      </div>

      {/* Close button */}
      <button onClick={handleClose} style={{
        position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10,
        background: D.CARD_BG, border: 'none',
        borderRadius: D.R_BUTTON, padding: '0.6rem 1.2rem',
        boxShadow: D.SHADOW_CLAY, cursor: 'pointer',
        fontFamily: D.FONTS.body, fontWeight: 700, fontSize: '0.85rem',
        color: D.TEXT, backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', gap: '0.4rem',
      }}>
        ✕ Close
      </button>

      {/* Label */}
      <div style={{
        position: 'absolute', top: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        fontFamily: D.FONTS.display, fontSize: '1rem', fontWeight: 600,
        color: D.TEXT_MUTED, letterSpacing: '0.1em',
      }}>
        �.Factory Avatar · VoiceBox.sh Ready
      </div>

      {/* 3D Canvas */}
      <div style={{
        width: 'min(480px, 85vw)', height: 'min(480px, 85vw)',
        borderRadius: D.R_CARD, overflow: 'hidden',
        boxShadow: D.SHADOW_CLAY_DEEP,
        background: `linear-gradient(145deg, ${D.PAPER_WARM}, ${D.PAPER})`,
        position: 'relative', zIndex: 2,
      }}>
        <Canvas shadows camera={{ position: [0, 0.2, 3.5], fov: 45 }}>
          <Scene messageIndex={messageIndex} isTalking={isTalking} />
        </Canvas>
      </div>

      {/* Message bubble */}
      <div style={{
        marginTop: '1.5rem', maxWidth: 500,
        background: D.CARD_BG, borderRadius: D.R_CARD,
        boxShadow: D.SHADOW_CLAY, backdropFilter: 'blur(20px)',
        padding: '1.2rem 1.5rem', textAlign: 'center', position: 'relative', zIndex: 2,
        border: '2px solid rgba(255,255,255,0.6)',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          {isTalking ? '💬' : '👋'}
        </div>
        <p style={{
          fontFamily: D.FONTS.body, fontSize: '1.05rem', color: D.TEXT,
          lineHeight: 1.6, margin: 0,
        }}>
          {message}
        </p>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', zIndex: 2,
      }}>
        <button onClick={handleTalk} style={{
          background: isTalking ? D.TEXT : D.PINK,
          color: '#fff', border: 'none',
          borderRadius: D.R_BUTTON, padding: '1rem 2.2rem',
          fontFamily: D.FONTS.heading, fontWeight: 800, fontSize: '1rem',
          cursor: 'pointer', boxShadow: isTalking ? 'none' : D.SHADOW_CLAY_PINK,
          transform: isTalking ? 'scale(0.97)' : 'scale(1)',
          transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          {isTalking ? '⏹ Stop' : '▶ Talk to Maphiri'}
        </button>

        <button onClick={advance} style={{
          background: D.CARD_BG, color: D.TEXT,
          border: 'none', borderRadius: D.R_BUTTON,
          padding: '1rem 1.5rem', fontFamily: D.FONTS.heading, fontWeight: 700, fontSize: '0.9rem',
          cursor: 'pointer', boxShadow: D.SHADOW_CLAY,
          backdropFilter: 'blur(12px)',
        }}>
          Next Message →
        </button>

        <button onClick={() => setIsMuted(m => !m)} style={{
          background: isMuted ? '#EF4444' : D.CARD_BG,
          color: isMuted ? '#fff' : D.TEXT,
          border: 'none', borderRadius: D.R_BUTTON,
          padding: '1rem 1.2rem', fontFamily: D.FONTS.body, fontWeight: 700, fontSize: '0.85rem',
          cursor: 'pointer', boxShadow: D.SHADOW_CLAY,
          backdropFilter: 'blur(12px)',
        }}>
          {isMuted ? '🔇 Muted' : '🔊 Sound On'}
        </button>
      </div>

      {/* Engine badge */}
      <div style={{
        marginTop: '1rem', fontFamily: D.FONTS.body, fontSize: '0.75rem',
        color: D.TEXT_LIGHT, display: 'flex', gap: '1rem', alignItems: 'center', zIndex: 2,
      }}>
        <span style={{
          background: D.CARD_GLASS, borderRadius: 20, padding: '0.3rem 0.8rem',
          backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.6)',
        }}>
          🌐 Web Speech API (active)
        </span>
        <span style={{
          background: D.CARD_GLASS, borderRadius: 20, padding: '0.3rem 0.8rem',
          backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.6)',
          opacity: 0.5,
        }}>
          🎙 VoiceBox.sh (connect on VM)
        </span>
        <span style={{
          background: D.CARD_GLASS, borderRadius: 20, padding: '0.3rem 0.8rem',
          backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.6)',
          opacity: 0.5,
        }}>
          🎤 Kokoro TTS (install on VM)
        </span>
      </div>

      <style>{`
        @keyframes blob-float {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(20px, -30px) scale(1.1); }
        }
      `}</style>
    </div>
  )
}
