import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  SequenceTiming,
} from 'remotion';
import {
  Canvas,
  useFrame,
  useThree,
} from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// ─── COLORS ───────────────────────────────────────────────────────────────────
const PINK = '#E91E8C';
const GREEN = '#2ECC71';
const NAVY = '#1A1A2E';
const WHITE = '#FFFFFF';

// ─── FLOATING COIN ────────────────────────────────────────────────────────────
function Coin({ x, y, z, delay, speed }: { x: number; y: number; z: number; delay: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const startTime = delay * fps;
  const elapsed = Math.max(0, frame - startTime);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.02;
    const t = (elapsed / fps) * speed;
    ref.current.position.y = y + t * 1.5;
    const alpha = Math.max(0, 1 - (t / 3));
    (ref.current.material as THREE.MeshStandardMaterial).opacity = alpha;
  });

  return (
    <mesh ref={ref} position={[x, y, z]}>
      <cylinderGeometry args={[0.12, 0.12, 0.02, 32]} />
      <meshStandardMaterial
        color={GREEN}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={1}
      />
    </mesh>
  );
}

// ─── SPHERE ───────────────────────────────────────────────────────────────────
function MaphiriSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { viewport } = useThree();

  const pinkMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: PINK,
        metalness: 0.3,
        roughness: 0.4,
        transparent: true,
        opacity: 1,
      }),
    []
  );

  const greenMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: GREEN,
        metalness: 0.3,
        roughness: 0.4,
        transparent: true,
        opacity: 0.6,
      }),
    []
  );

  const sphereY = useMemo(() => viewport.height / 2 - 60, [viewport]);

  useFrame(() => {
    if (!sphereRef.current) return;
    const t = frame / fps;
    sphereRef.current.rotation.y = t * 0.4;
    sphereRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    // Gentle floating
    sphereRef.current.position.y = sphereY + Math.sin(t * 0.8) * 8;
  });

  const sphereScale = spring({ frame, fps, config: { damping: 200, stiffness: 50 } });

  return (
    <group>
      {/* Outer glow sphere */}
      <mesh ref={sphereRef} scale={sphereScale * 1.05}>
        <sphereGeometry args={[80, 64, 64]} />
        <meshStandardMaterial
          color={PINK}
          metalness={0.1}
          roughness={0.8}
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Main sphere */}
      <mesh ref={sphereRef} scale={sphereScale}>
        <sphereGeometry args={[80, 64, 64]} />
        <meshPhysicalMaterial
          color={PINK}
          metalness={0.2}
          roughness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* Green gradient overlay — second sphere slightly smaller */}
      <mesh ref={sphereRef} scale={sphereScale * 0.92}>
        <sphereGeometry args={[80, 64, 64]} />
        <meshStandardMaterial
          color={GREEN}
          metalness={0.1}
          roughness={0.5}
          transparent
          opacity={0.35}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Specular highlight */}
      <mesh position={[30, 40, 60]} scale={sphereScale}>
        <sphereGeometry args={[15, 16, 16]} />
        <meshStandardMaterial
          color={WHITE}
          metalness={0}
          roughness={0}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Floating coins */}
      {[
        { x: -80, y: -20, z: 20, delay: 0, speed: 0.8 },
        { x: 60, y: -40, z: 10, delay: 0.4, speed: 1.0 },
        { x: -40, y: -10, z: -30, delay: 0.8, speed: 0.6 },
        { x: 90, y: -60, z: 0, delay: 1.2, speed: 0.9 },
        { x: -90, y: -50, z: -10, delay: 1.6, speed: 0.7 },
        { x: 0, y: -30, z: 50, delay: 2.0, speed: 1.1 },
      ].map((c, i) => (
        <Coin key={i} {...c} />
      ))}
    </group>
  );
}

// ─── TEXT LAYER (pure HTML via AbsoluteFill) ──────────────────────────────────
function TextLayer() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const titleOpacity = spring({ frame, fps, config: { damping: 200, stiffness: 60 }, delay: 20 });
  const titleY = interpolate(titleOpacity, [0, 1], [20, 0]);

  const subtitleOpacity = spring({ frame, fps, config: { damping: 200, stiffness: 60 }, delay: 35 });
  const subtitleY = interpolate(subtitleOpacity, [0, 1], [15, 0]);

  const ctaOpacity = spring({ frame, fps, config: { damping: 200, stiffness: 60 }, delay: 50 });

  return (
    <>
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          bottom: height * 0.12,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: 'Nunito, system-ui, sans-serif',
            fontSize: Math.min(width * 0.065, 52),
            fontWeight: 800,
            color: WHITE,
            textShadow: `0 0 40px ${PINK}88, 0 2px 8px rgba(0,0,0,0.8)`,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Maphiri's Marvellous
        </div>
        <div
          style={{
            fontFamily: 'Nunito, system-ui, sans-serif',
            fontSize: Math.min(width * 0.065, 52),
            fontWeight: 800,
            color: PINK,
            textShadow: `0 0 40px ${PINK}66, 0 2px 8px rgba(0,0,0,0.8)`,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Money Moves
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: 'absolute',
          bottom: height * 0.04,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: 'Nunito, system-ui, sans-serif',
            fontSize: Math.min(width * 0.022, 18),
            fontWeight: 600,
            color: GREEN,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            textShadow: `0 0 20px ${GREEN}88`,
          }}
        >
          Financial Literacy for Kids
        </div>
      </div>

      {/* Pink decorative line above subtitle */}
      <div
        style={{
          position: 'absolute',
          bottom: height * 0.075,
          left: '50%',
          transform: `translateX(-50%) translateY(${(1 - subtitleOpacity) * 10}px)`,
          width: 80,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${PINK}, transparent)`,
          opacity: subtitleOpacity,
          borderRadius: 2,
        }}
      />
    </>
  );
}

// ─── BACKGROUND GRADIENT ──────────────────────────────────────────────────────
function Background() {
  const { width, height } = useVideoConfig();
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse 70% 60% at 50% 50%, #2A1040 0%, ${NAVY} 60%, #0a0a12 100%)`,
      }}
    />
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function MaphiriSphereScene() {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: NAVY }}>
      <Background />

      {/* 3D Canvas — full screen behind text */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 280], fov: 55 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[100, 100, 100]} intensity={1.2} color={WHITE} />
          <pointLight position={[-100, -50, 50]} intensity={0.8} color={PINK} />
          <pointLight position={[80, 80, -60]} intensity={0.6} color={GREEN} />
          <MaphiriSphere />
        </Canvas>
      </div>

      {/* Text overlay */}
      <TextLayer />

      {/* Subtle vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(10,10,20,0.6) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
}