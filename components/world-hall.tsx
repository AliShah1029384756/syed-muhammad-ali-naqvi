'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'

const PROFESSIONAL = 'https://alishah1029384756.github.io/AliShah1029384756/'
const CV = 'https://alishah1029384756.github.io/AliShah1029384756/cv.html'
const GITHUB = 'https://github.com/AliShah1029384756'
const LINKEDIN = 'https://www.linkedin.com/in/ali-naqvi-1a9576331'
const CONTACT = 'mailto:shahyed99@gmail.com'

const ZONES = [
  { id: 'engineering', label: 'ENGINEERING', angle: 0 },
  { id: 'ai', label: 'AI / HEALTHCARE', angle: Math.PI / 3 },
  { id: 'academy', label: 'ACADEMY', angle: (2 * Math.PI) / 3 },
  { id: 'knowledge', label: 'KNOWLEDGE', angle: Math.PI },
  { id: 'journey', label: 'JOURNEY', angle: (4 * Math.PI) / 3 },
  { id: 'career', label: 'CAREER', angle: (5 * Math.PI) / 3 },
] as const

function CameraController({
  entered,
  focusAngle,
}: {
  entered: boolean
  focusAngle: number | null
}) {
  const { camera } = useThree()
  const start = useRef({ x: 0, y: 2.8, z: 11 })
  const goal = useRef({ x: 0, y: 1.6, z: 7.2 })

  useFrame((_, delta) => {
    const t = Math.min(delta * 1.4, 1)
    if (!entered) {
      // Slow cinematic settle into the hall
      camera.position.x += (start.current.x - camera.position.x) * t * 0.6
      camera.position.y += (start.current.y - camera.position.y) * t * 0.6
      camera.position.z += (start.current.z - camera.position.z) * t * 0.6
      camera.lookAt(0, 0.4, 0)
      return
    }

    let targetX = 0
    let targetY = 1.35
    let targetZ = 5.4

    if (focusAngle !== null) {
      // Glance toward the chosen architectural opening
      targetX = Math.sin(focusAngle) * 1.8
      targetZ = 5.4 - Math.cos(focusAngle) * 0.9
      targetY = 1.2
    }

    goal.current.x += (targetX - goal.current.x) * t
    goal.current.y += (targetY - goal.current.y) * t
    goal.current.z += (targetZ - goal.current.z) * t

    camera.position.x += (goal.current.x - camera.position.x) * t
    camera.position.y += (goal.current.y - camera.position.y) * t
    camera.position.z += (goal.current.z - camera.position.z) * t
    camera.lookAt(targetX * 0.35, 0.35, 0)
  })

  return null
}

function Hall({ entered }: { entered: boolean }) {
  const group = useRef<Group>(null)
  const pedestal = useRef<Mesh>(null)

  // Very subtle breathing — almost still
  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y = Math.sin(t * 0.04) * 0.012
    if (pedestal.current) {
      pedestal.current.position.y = 0.02 + Math.sin(t * 0.35) * 0.008
    }
  })

  const openings = useMemo(() => {
    return ZONES.map((z) => {
      const r = 6.4
      return {
        ...z,
        x: Math.sin(z.angle) * r,
        z: Math.cos(z.angle) * r,
      }
    })
  }, [])

  return (
    <group ref={group}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[8.5, 64]} />
        <meshStandardMaterial color="#0a0e16" roughness={0.92} metalness={0.08} />
      </mesh>

      {/* Soft floor ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[5.8, 6.1, 64]} />
        <meshStandardMaterial color="#141c2a" roughness={0.85} metalness={0.12} />
      </mesh>

      {/* Outer wall (rotunda) */}
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[8.2, 8.2, 4.6, 64, 1, true]} />
        <meshStandardMaterial
          color="#0c121c"
          side={THREE.BackSide}
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* Ceiling ring */}
      <mesh position={[0, 4.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 8.3, 64]} />
        <meshStandardMaterial color="#080c14" roughness={1} metalness={0} />
      </mesh>

      {/* Single overhead lamp (the one light source) */}
      <mesh position={[0, 4.15, 0]}>
        <cylinderGeometry args={[0.18, 0.32, 0.22, 16]} />
        <meshStandardMaterial color="#1a2233" roughness={0.4} metalness={0.6} />
      </mesh>
      <pointLight
        position={[0, 3.9, 0]}
        intensity={18}
        distance={14}
        decay={2}
        color="#e8e0d4"
        castShadow
      />
      <pointLight position={[0, 3.6, 0]} intensity={4} distance={8} color="#c9b8a0" />

      {/* Central object — quiet pedestal + simple form */}
      <group position={[0, 0, 0]}>
        <mesh ref={pedestal} position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.55, 0.68, 0.12, 32]} />
          <meshStandardMaterial color="#1a2230" roughness={0.55} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[0.42, 0.9, 0.42]} />
          <meshStandardMaterial color="#151d2a" roughness={0.45} metalness={0.4} />
        </mesh>
        {/* Thin vertical accent — not neon */}
        <mesh position={[0, 0.55, 0.215]}>
          <boxGeometry args={[0.02, 0.7, 0.01]} />
          <meshStandardMaterial color="#c4b59a" roughness={0.3} metalness={0.5} emissive="#c4b59a" emissiveIntensity={0.15} />
        </mesh>
      </group>

      {/* Architectural openings (empty for Phase 1) */}
      {openings.map((o) => (
        <group key={o.id} position={[o.x, 1.4, o.z]} rotation={[0, -o.angle, 0]}>
          {/* Opening frame */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.8, 2.6, 0.12]} />
            <meshStandardMaterial color="#0e1520" roughness={0.9} metalness={0.1} />
          </mesh>
          {/* Dark void beyond */}
          <mesh position={[0, 0, -0.08]}>
            <planeGeometry args={[1.55, 2.35]} />
            <meshBasicMaterial color="#04060c" />
          </mesh>
          {/* Soft edge light */}
          <mesh position={[0, 0, 0.07]}>
            <planeGeometry args={[1.65, 2.45]} />
            <meshBasicMaterial color="#1a2435" transparent opacity={0.35} />
          </mesh>
        </group>
      ))}

      {/* Ambient fill — restrained */}
      <ambientLight intensity={0.12} />
      <hemisphereLight color="#2a3344" groundColor="#05070c" intensity={0.35} />
    </group>
  )
}

function MobileStage({
  entered,
  onEnter,
  focus,
  setFocus,
}: {
  entered: boolean
  onEnter: () => void
  focus: string | null
  setFocus: (id: string | null) => void
}) {
  return (
    <div className="mobile-stage">
      <div className={`mobile-hall ${entered ? 'is-entered' : ''}`}>
        <div className="mobile-lamp" />
        <div className="mobile-object" />
        {entered && (
          <div className="mobile-zones">
            {ZONES.map((z) => (
              <button
                key={z.id}
                type="button"
                className={focus === z.id ? 'active' : ''}
                onClick={() => setFocus(focus === z.id ? null : z.id)}
              >
                {z.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {!entered && (
        <div className="mobile-landing">
          <p className="kicker">DIGITAL WORKSPACE</p>
          <h1>Syed Muhammad Ali Naqvi</h1>
          <p className="tagline">I BUILD. I TEACH. I LEARN. I PRESERVE.</p>
          <div className="actions">
            <button type="button" onClick={onEnter}>
              Enter the world
            </button>
            <a href={PROFESSIONAL} target="_blank" rel="noopener noreferrer">
              Professional portfolio
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export function WorldHall() {
  const [entered, setEntered] = useState(false)
  const [focus, setFocus] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      setIsMobile(mq.matches)
      setReduced(motion.matches)
    }
    update()
    mq.addEventListener('change', update)
    motion.addEventListener('change', update)
    const t = setTimeout(() => setReady(true), 600)
    return () => {
      mq.removeEventListener('change', update)
      motion.removeEventListener('change', update)
      clearTimeout(t)
    }
  }, [])

  const focusAngle = focus
    ? ZONES.find((z) => z.id === focus)?.angle ?? null
    : null

  return (
    <main className="world-hall">
      {/* Persistent recruiter bar — always available */}
      <header className="world-bar">
        <a className="brand" href="#">
          SA
        </a>
        <nav className="recruiter-links" aria-label="Professional links">
          <a href={PROFESSIONAL} target="_blank" rel="noopener noreferrer">
            Professional Portfolio
          </a>
          <a href={CV} target="_blank" rel="noopener noreferrer">
            CV
          </a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={CONTACT}>Contact</a>
        </nav>
      </header>

      {isMobile ? (
        <MobileStage
          entered={entered}
          onEnter={() => setEntered(true)}
          focus={focus}
          setFocus={setFocus}
        />
      ) : (
        <>
          <div className="canvas-wrap">
            <Canvas
              camera={{ position: [0, 2.8, 11], fov: 42 }}
              dpr={[1, 1.4]}
              gl={{ antialias: true, powerPreference: 'high-performance' }}
              shadows
            >
              <color attach="background" args={['#06080f']} />
              <fog attach="fog" args={['#06080f', 9, 18]} />
              <Hall entered={entered} />
              <CameraController entered={entered} focusAngle={focusAngle} />
            </Canvas>
          </div>

          {/* Overlay UI */}
          <div className="world-ui">
            {!entered ? (
              <section className={`landing ${ready ? 'is-ready' : ''}`}>
                <p className="kicker">DIGITAL WORKSPACE</p>
                <h1>Syed Muhammad Ali Naqvi</h1>
                <p className="tagline">I BUILD. I TEACH. I LEARN. I PRESERVE.</p>
                <div className="actions">
                  <button
                    type="button"
                    disabled={!ready}
                    onClick={() => setEntered(true)}
                  >
                    {ready ? 'Enter the world' : '…'}
                  </button>
                  <a href={PROFESSIONAL} target="_blank" rel="noopener noreferrer">
                    Professional portfolio
                  </a>
                </div>
              </section>
            ) : (
              <>
                <nav className="zone-nav" aria-label="World zones">
                  {ZONES.map((z) => (
                    <button
                      key={z.id}
                      type="button"
                      className={focus === z.id ? 'active' : ''}
                      onClick={() => setFocus(focus === z.id ? null : z.id)}
                    >
                      {z.label}
                    </button>
                  ))}
                </nav>
                <p className="hint">Select a zone · rooms arrive in later phases</p>
              </>
            )}
          </div>
        </>
      )}

      <style jsx global>{`
        .world-hall {
          position: relative;
          height: 100svh;
          min-height: 100svh;
          background: #06080f;
          color: #e8e4dc;
          overflow: hidden;
          font-family: var(--font-geist), system-ui, sans-serif;
        }
        .canvas-wrap {
          position: absolute;
          inset: 0;
        }
        .canvas-wrap canvas {
          display: block;
        }

        /* Top bar */
        .world-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 28px;
          background: linear-gradient(180deg, rgba(6, 8, 15, 0.85), transparent);
          pointer-events: none;
        }
        .world-bar a,
        .world-bar button {
          pointer-events: auto;
        }
        .brand {
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: #c4b59a;
        }
        .recruiter-links {
          display: flex;
          gap: 22px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .recruiter-links a {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          color: #8a8490;
          transition: color 0.2s ease;
        }
        .recruiter-links a:hover {
          color: #e8e4dc;
        }

        /* Landing */
        .world-ui {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }
        .landing {
          position: absolute;
          left: 50%;
          top: 48%;
          transform: translate(-50%, -50%);
          text-align: center;
          max-width: 520px;
          width: calc(100% - 48px);
          pointer-events: auto;
          opacity: 0;
          transition: opacity 1.2s ease;
        }
        .landing.is-ready {
          opacity: 1;
        }
        .kicker {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          color: #9a9080;
          margin: 0 0 18px;
        }
        .landing h1 {
          font-size: clamp(1.8rem, 4.5vw, 2.6rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          margin: 0 0 16px;
          color: #f0ebe3;
        }
        .tagline {
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          letter-spacing: 0.16em;
          color: #b0a898;
          margin: 0 0 36px;
        }
        .actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .actions button {
          padding: 12px 28px;
          border: 1px solid #c4b59a;
          background: transparent;
          color: #c4b59a;
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .actions button:hover:not(:disabled),
        .actions button:focus-visible {
          background: #c4b59a;
          color: #0a0e16;
        }
        .actions button:disabled {
          opacity: 0.4;
          cursor: wait;
        }
        .actions a {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          color: #7a7480;
          transition: color 0.2s ease;
        }
        .actions a:hover {
          color: #c4b59a;
        }

        /* Zone nav after enter */
        .zone-nav {
          position: absolute;
          right: 28px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 6px;
          pointer-events: auto;
        }
        .zone-nav button {
          border: 0;
          background: transparent;
          color: #6a6470;
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          text-align: right;
          padding: 6px 0;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .zone-nav button:hover,
        .zone-nav button.active {
          color: #c4b59a;
        }
        .hint {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          color: #4a4650;
          white-space: nowrap;
        }

        /* Mobile 2.5D */
        .mobile-stage {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 24px 40px;
        }
        .mobile-hall {
          position: relative;
          width: min(320px, 90vw);
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle at 50% 30%, #121820 0%, #06080f 70%);
          border: 1px solid #1a2230;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.8s ease;
        }
        .mobile-hall.is-entered {
          transform: scale(1.05);
        }
        .mobile-lamp {
          position: absolute;
          top: 18%;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #c4b59a;
          box-shadow: 0 0 40px 12px rgba(196, 181, 154, 0.25);
        }
        .mobile-object {
          width: 28px;
          height: 48px;
          background: #1a2230;
          border: 1px solid #2a3448;
          position: relative;
        }
        .mobile-object::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 12%;
          width: 2px;
          height: 70%;
          background: #c4b59a;
          transform: translateX(-50%);
          opacity: 0.6;
        }
        .mobile-zones {
          position: absolute;
          inset: 0;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 40px 20px;
        }
        .mobile-zones button {
          border: 1px solid #2a3448;
          background: rgba(10, 14, 22, 0.7);
          color: #8a8490;
          font-family: var(--font-geist-mono), monospace;
          font-size: 8px;
          letter-spacing: 0.08em;
          padding: 5px 8px;
          cursor: pointer;
        }
        .mobile-zones button.active {
          border-color: #c4b59a;
          color: #c4b59a;
        }
        .mobile-landing {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 24px;
          background: rgba(6, 8, 15, 0.72);
        }
        .mobile-landing h1 {
          font-size: 1.6rem;
          font-weight: 500;
          margin: 0 0 12px;
        }
        .mobile-landing .tagline {
          margin-bottom: 28px;
        }

        @media (max-width: 768px) {
          .world-bar {
            padding: 14px 16px;
          }
          .recruiter-links {
            gap: 12px;
          }
          .recruiter-links a {
            font-size: 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .landing,
          .mobile-hall {
            transition: none;
          }
        }
      `}</style>
    </main>
  )
}
