'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'

const PROFESSIONAL = 'https://alishah1029384756.github.io/AliShah1029384756/'
const CV =
  'https://alishah1029384756.github.io/AliShah1029384756/assets/Syed-Muhammad-Ali-Naqvi-Resume.pdf'
const GITHUB = 'https://github.com/AliShah1029384756'
const LINKEDIN = 'https://www.linkedin.com/in/ali-naqvi-1a9576331'
const CONTACT = 'mailto:shahyed99@gmail.com'
const PROJECTS = 'https://alishah1029384756.github.io/AliShah1029384756/projects.html'
const AUTISMART_CASE =
  'https://alishah1029384756.github.io/AliShah1029384756/projects.html#autismart'
const EDUCORE = 'https://alishah1029384756.github.io/educore-open-learning-hub/index.html'
const UNI_HUB =
  'https://github.com/AliShah1029384756/university-course-projects-hub'

type ZoneId =
  | 'engineering'
  | 'ai'
  | 'academy'
  | 'knowledge'
  | 'journey'
  | 'career'

type Zone = {
  id: ZoneId
  label: string
  angle: number
  title: string
  kicker: string
  body: string
  points: string[]
  links: { label: string; href: string }[]
}

const ZONES: Zone[] = [
  {
    id: 'engineering',
    label: 'ENGINEERING',
    angle: 0,
    title: 'Engineering Lab',
    kicker: 'SYSTEMS · ARCHITECTURE · FULL-STACK',
    body: 'Practical full-stack systems: React, Node.js, Express, MongoDB, REST APIs, authentication, and structured product workflows. Breadth comes from university systems work and public case studies.',
    points: [
      'ClinicOS — healthcare workflow application (patients, sessions, plans, JWT + RBAC)',
      'SchoolIEP — education IEP lifecycle, goals, progress, parent coordination',
      '17+ university projects across systems, databases, networking, compilers, algorithms',
    ],
    links: [
      { label: 'Project directory', href: PROJECTS },
      { label: 'Professional portfolio', href: PROFESSIONAL },
    ],
  },
  {
    id: 'ai',
    label: 'AI / HEALTHCARE',
    angle: Math.PI / 3,
    title: 'AI / Healthcare Lab',
    kicker: 'FLAGSHIP · TEAM FYP · RESPONSIBLE AI',
    body: 'AutiSmart is the flagship: a team Final Year Project at FAST-NUCES — an AI-assisted autism assessment and therapy-support platform. Contribution is full-stack development and AI integration, consistent with public documentation. Not clinical validation or sole ownership.',
    points: [
      'Child management, assessments, progress tracking',
      'AI-powered recommendations (Groq), reports, therapy-oriented activities',
      'Stack: React, Vite, Node.js, Express, MongoDB, JWT',
      'Supporting: ClinicOS healthcare workflows',
    ],
    links: [
      { label: 'AutiSmart case study', href: AUTISMART_CASE },
      { label: 'FYP repository', href: 'https://github.com/AliShah1029384756/Fyp-Autismart' },
    ],
  },
  {
    id: 'academy',
    label: 'ACADEMY',
    angle: (2 * Math.PI) / 3,
    title: 'Academy',
    kicker: 'TEACH · MENTOR · STRUCTURE',
    body: 'CS educator and mentor alongside the degree. Structured guidance for programming fundamentals, project planning, and university coursework — not a formal teaching title, but consistent public mentoring and resource building.',
    points: [
      '3+ years supporting students in CS and technical projects',
      '20+ students mentored (public claim on professional site)',
      'Learning hubs and project-planning resources for peers',
    ],
    links: [
      { label: 'EduCore learning hub', href: EDUCORE },
      { label: 'Professional site', href: PROFESSIONAL },
    ],
  },
  {
    id: 'knowledge',
    label: 'KNOWLEDGE',
    angle: Math.PI,
    title: 'Knowledge Archive',
    kicker: 'CURATE · DOCUMENT · PRESERVE',
    body: 'A documentation mindset: curated links, open learning hubs, and academic project references so knowledge stays findable. The central axis in this hall is a reminder of that habit — stacked, ordered, durable.',
    points: [
      'EduCore — 400+ curated educational links',
      'Web Development Hub — 9-module pathway toward full-stack practice',
      'High-impact project guides and university course project hub',
    ],
    links: [
      { label: 'EduCore', href: EDUCORE },
      { label: 'University projects hub', href: UNI_HUB },
    ],
  },
  {
    id: 'journey',
    label: 'JOURNEY',
    angle: (4 * Math.PI) / 3,
    title: 'Journey',
    kicker: 'PATH · NOT INFLATED TIMELINE',
    body: 'A restrained chronological path. No invented metrics. Source of truth is the professional site and public repos.',
    points: [
      '2022–2026 · BSCS, FAST-NUCES (Chiniot-Faisalabad Campus)',
      'Teaching & mentoring alongside coursework',
      'AutiSmart team FYP — publicly documented case study',
      'Current: Digital Marketing Intern, Atlas Honda Pakistan',
      'Actively strengthening software engineering and data/BI profile',
    ],
    links: [
      { label: 'About', href: 'https://alishah1029384756.github.io/AliShah1029384756/about.html' },
      { label: 'Professional portfolio', href: PROFESSIONAL },
    ],
  },
  {
    id: 'career',
    label: 'CAREER',
    angle: (5 * Math.PI) / 3,
    title: 'Career Terminal',
    kicker: 'DIRECT ROUTES · RECRUITER-FIRST',
    body: 'One-click paths for hiring managers. The immersive world is optional; proof is always available without exploring 3D space.',
    points: [
      'Open to software engineering, full-stack, data/BI, AI/healthcare collaboration',
      'CV, GitHub, LinkedIn, and contact stay in the top bar at every stage',
    ],
    links: [
      { label: 'CV (PDF)', href: CV },
      { label: 'GitHub', href: GITHUB },
      { label: 'LinkedIn', href: LINKEDIN },
      { label: 'Email', href: CONTACT },
    ],
  },
]

function CameraController({
  entered,
  focusAngle,
}: {
  entered: boolean
  focusAngle: number | null
}) {
  const { camera } = useThree()
  const start = useRef({ x: 0, y: 3.4, z: 12.5 })
  const goal = useRef({ x: 0, y: 1.55, z: 6.8 })
  const look = useRef({ x: 0, y: 0.55, z: 0 })

  useFrame((_, delta) => {
    const t = Math.min(delta * 1.35, 1)
    if (!entered) {
      camera.position.x += (start.current.x - camera.position.x) * t * 0.55
      camera.position.y += (start.current.y - camera.position.y) * t * 0.55
      camera.position.z += (start.current.z - camera.position.z) * t * 0.55
      look.current.y += (0.55 - look.current.y) * t * 0.5
      camera.lookAt(0, look.current.y, 0)
      return
    }

    let targetX = 0
    let targetY = 1.4
    let targetZ = 5.2
    let lookX = 0
    let lookY = 0.7

    if (focusAngle !== null) {
      targetX = Math.sin(focusAngle) * 2.1
      targetZ = 5.2 - Math.cos(focusAngle) * 1.05
      targetY = 1.25
      lookX = Math.sin(focusAngle) * 0.55
      lookY = 0.85
    }

    goal.current.x += (targetX - goal.current.x) * t
    goal.current.y += (targetY - goal.current.y) * t
    goal.current.z += (targetZ - goal.current.z) * t
    look.current.x += (lookX - look.current.x) * t
    look.current.y += (lookY - look.current.y) * t

    camera.position.x += (goal.current.x - camera.position.x) * t
    camera.position.y += (goal.current.y - camera.position.y) * t
    camera.position.z += (goal.current.z - camera.position.z) * t
    camera.lookAt(look.current.x, look.current.y, 0)
  })

  return null
}

function Opening({
  zone,
  active,
}: {
  zone: Zone & { x: number; z: number }
  active: boolean
}) {
  const frameRef = useRef<Mesh>(null)
  const planeRef = useRef<Mesh>(null)

  useFrame((_, delta) => {
    const t = Math.min(delta * 3, 1)
    if (frameRef.current) {
      const mat = frameRef.current.material as THREE.MeshStandardMaterial
      const target = active ? 0.22 : 0.04
      mat.emissiveIntensity += (target - mat.emissiveIntensity) * t
    }
    if (planeRef.current) {
      const mat = planeRef.current.material as THREE.MeshBasicMaterial
      const target = active ? 0.12 : 0.02
      mat.opacity += (target - mat.opacity) * t
    }
  })

  return (
    <group position={[zone.x, 1.45, zone.z]} rotation={[0, -zone.angle, 0]}>
      <mesh ref={frameRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.9, 2.7, 0.14]} />
        <meshStandardMaterial
          color="#10151e"
          roughness={0.88}
          metalness={0.1}
          emissive="#c4b59a"
          emissiveIntensity={0.04}
        />
      </mesh>
      <mesh ref={planeRef} position={[0, 0, -0.08]}>
        <planeGeometry args={[1.55, 2.35]} />
        <meshBasicMaterial color="#c4b59a" transparent opacity={0.02} />
      </mesh>
      <mesh position={[-0.92, 0, 0.04]}>
        <boxGeometry args={[0.06, 2.7, 0.1]} />
        <meshStandardMaterial color="#1a2030" roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh position={[0.92, 0, 0.04]}>
        <boxGeometry args={[0.06, 2.7, 0.1]} />
        <meshStandardMaterial color="#1a2030" roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh position={[0, 1.35, 0.04]}>
        <boxGeometry args={[1.9, 0.06, 0.1]} />
        <meshStandardMaterial color="#1a2030" roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.42, 0.2]}>
        <planeGeometry args={[1.7, 0.35]} />
        <meshStandardMaterial
          color={active ? '#2a2430' : '#12161f'}
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>
    </group>
  )
}

function Hall({ focusId }: { focusId: string | null }) {
  const group = useRef<Group>(null)
  const axis = useRef<Group>(null)

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y = Math.sin(t * 0.035) * 0.01
    if (axis.current) {
      axis.current.position.y = Math.sin(t * 0.32) * 0.012
    }
  })

  const openings = useMemo(() => {
    return ZONES.map((z) => {
      const r = 6.6
      return {
        ...z,
        x: Math.sin(z.angle) * r,
        z: Math.cos(z.angle) * r,
      }
    })
  }, [])

  const pillars = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2
      return {
        x: Math.sin(a) * 7.35,
        z: Math.cos(a) * 7.35,
      }
    })
  }, [])

  const discs = [
    { y: 0.38, r: 0.72, h: 0.06 },
    { y: 0.62, r: 0.58, h: 0.055 },
    { y: 0.84, r: 0.44, h: 0.05 },
    { y: 1.04, r: 0.3, h: 0.045 },
    { y: 1.22, r: 0.18, h: 0.04 },
  ]

  return (
    <group ref={group}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[9.2, 72]} />
        <meshStandardMaterial color="#12161f" roughness={0.9} metalness={0.06} />
      </mesh>

      {[2.4, 4.1, 5.9, 7.7].map((radius) => (
        <mesh key={radius} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[radius - 0.03, radius + 0.03, 72]} />
          <meshStandardMaterial color="#1c2430" roughness={0.75} metalness={0.15} />
        </mesh>
      ))}

      <mesh position={[0, 2.15, 0]}>
        <cylinderGeometry args={[8.5, 8.5, 4.5, 64, 1, true]} />
        <meshStandardMaterial
          color="#0e131c"
          side={THREE.BackSide}
          roughness={0.94}
          metalness={0.04}
        />
      </mesh>

      <mesh position={[0, 4.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 8.6, 64]} />
        <meshStandardMaterial color="#0a0e16" roughness={1} metalness={0} />
      </mesh>

      {pillars.map((p, i) => (
        <mesh key={i} position={[p.x, 1.9, p.z]} castShadow>
          <boxGeometry args={[0.28, 3.8, 0.28]} />
          <meshStandardMaterial color="#151a24" roughness={0.88} metalness={0.08} />
        </mesh>
      ))}

      <mesh position={[0, 4.2, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.5, 8]} />
        <meshStandardMaterial color="#2a303c" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0, 3.95, 0]}>
        <cylinderGeometry args={[0.22, 0.38, 0.2, 20]} />
        <meshStandardMaterial color="#1a2030" roughness={0.4} metalness={0.55} />
      </mesh>
      <mesh position={[0, 3.84, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.2, 20]} />
        <meshBasicMaterial color="#f0dcc0" />
      </mesh>
      <pointLight
        position={[0, 3.7, 0]}
        intensity={22}
        distance={13}
        decay={2}
        color="#f0e2cc"
        castShadow
      />
      <pointLight position={[2.5, 2.2, 3.5]} intensity={3.5} distance={12} color="#d8d0c4" />
      <pointLight position={[-3, 1.8, -2]} intensity={2.2} distance={10} color="#b8c4d4" />

      <group ref={axis}>
        <mesh position={[0, 0.12, 0]} castShadow>
          <cylinderGeometry args={[0.95, 1.05, 0.22, 32]} />
          <meshStandardMaterial color="#1a1f2a" roughness={0.7} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 1.2, 12]} />
          <meshStandardMaterial color="#2a303c" roughness={0.4} metalness={0.55} />
        </mesh>
        {discs.map((d, i) => (
          <mesh key={i} position={[0, d.y, 0]} castShadow>
            <cylinderGeometry args={[d.r, d.r, d.h, 32]} />
            <meshStandardMaterial
              color="#e4ddd2"
              metalness={0.35}
              roughness={0.22}
              emissive="#cfc6b8"
              emissiveIntensity={0.12}
            />
          </mesh>
        ))}
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <circleGeometry args={[1.5, 40]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.45} />
      </mesh>

      {openings.map((o) => (
        <Opening key={o.id} zone={o} active={focusId === o.id} />
      ))}

      <ambientLight intensity={0.14} />
      <hemisphereLight color="#6a7888" groundColor="#121018" intensity={0.38} />
      <directionalLight
        position={[-5, 8, 4]}
        intensity={0.35}
        color="#c5d0dc"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </group>
  )
}

function ZonePanel({
  zone,
  onClose,
}: {
  zone: Zone
  onClose: () => void
}) {
  return (
    <aside className="zone-panel" role="dialog" aria-labelledby="zone-title">
      <div className="zone-panel-inner">
        <header className="zone-panel-head">
          <p className="zone-kicker">{zone.kicker}</p>
          <h2 id="zone-title">{zone.title}</h2>
          <button type="button" className="zone-close" onClick={onClose} aria-label="Close zone">
            Close
          </button>
        </header>
        <p className="zone-body">{zone.body}</p>
        <ul className="zone-points">
          {zone.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <div className="zone-links">
          {zone.links.map((l) => (
            <a key={l.href + l.label} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
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
  const activeZone = focus ? ZONES.find((z) => z.id === focus) ?? null : null

  return (
    <div className="mobile-stage">
      <div className={`mobile-hall ${entered ? 'is-entered' : ''}`}>
        <div className="mobile-lamp" />
        <div className="mobile-rings" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="mobile-object">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        {entered && !activeZone && (
          <div className="mobile-zones">
            {ZONES.map((z) => (
              <button
                key={z.id}
                type="button"
                className={focus === z.id ? 'active' : ''}
                onClick={() => setFocus(z.id)}
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
      {entered && activeZone && (
        <div className="mobile-panel">
          <ZonePanel zone={activeZone} onClose={() => setFocus(null)} />
        </div>
      )}
    </div>
  )
}

export function WorldHall() {
  const [entered, setEntered] = useState(false)
  const [focus, setFocus] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    const t = setTimeout(() => setReady(true), 500)
    return () => {
      mq.removeEventListener('change', update)
      clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    if (!entered) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFocus(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [entered])

  const focusAngle = focus ? ZONES.find((z) => z.id === focus)?.angle ?? null : null
  const activeZone = focus ? ZONES.find((z) => z.id === focus) ?? null : null

  return (
    <main className="world-hall">
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
              camera={{ position: [0, 3.4, 12.5], fov: 38 }}
              dpr={[1, 1.4]}
              gl={{ antialias: true, powerPreference: 'high-performance' }}
              shadows
            >
              <color attach="background" args={['#080a10']} />
              <fog attach="fog" args={['#080a10', 10, 22]} />
              <Hall focusId={focus} />
              <CameraController entered={entered} focusAngle={focusAngle} />
            </Canvas>
          </div>

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
                {activeZone ? (
                  <ZonePanel zone={activeZone} onClose={() => setFocus(null)} />
                ) : (
                  <p className="hint">Select a zone · camera glances toward the opening</p>
                )}
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
          background: #080a10;
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
          background: linear-gradient(180deg, rgba(8, 10, 16, 0.82), transparent);
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
          text-decoration: none;
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
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .recruiter-links a:hover {
          color: #e8e4dc;
        }
        .world-ui {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }
        .landing {
          position: absolute;
          left: 7vw;
          bottom: 9vh;
          max-width: 420px;
          pointer-events: auto;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .landing.is-ready {
          opacity: 1;
          transform: translateY(0);
        }
        .kicker {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          color: #8a8490;
          margin: 0 0 14px;
        }
        .landing h1,
        .mobile-landing h1 {
          font-size: clamp(1.75rem, 3.2vw, 2.35rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          margin: 0 0 12px;
          color: #f0ebe3;
        }
        .tagline {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          color: #a0988c;
          margin: 0 0 28px;
        }
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: center;
        }
        .actions button {
          pointer-events: auto;
          border: 1px solid #c4b59a;
          background: rgba(196, 181, 154, 0.08);
          color: #e8e4dc;
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          padding: 12px 18px;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .actions button:hover:not(:disabled) {
          background: rgba(196, 181, 154, 0.18);
        }
        .actions button:disabled {
          opacity: 0.5;
          cursor: default;
        }
        .actions a {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: #8a8490;
          text-decoration: none;
        }
        .actions a:hover {
          color: #e8e4dc;
        }
        .zone-nav {
          position: absolute;
          left: 50%;
          bottom: 28px;
          transform: translateX(-50%);
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          max-width: min(920px, 94vw);
          pointer-events: auto;
          padding: 8px;
          background: rgba(8, 10, 16, 0.55);
          border: 1px solid rgba(42, 52, 72, 0.6);
          backdrop-filter: blur(8px);
        }
        .zone-nav button {
          border: 1px solid transparent;
          background: transparent;
          color: #7a7480;
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          padding: 8px 12px;
          cursor: pointer;
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }
        .zone-nav button:hover {
          color: #c4beb4;
        }
        .zone-nav button.active {
          color: #c4b59a;
          border-color: #3a342c;
          background: rgba(196, 181, 154, 0.06);
        }
        .hint {
          position: absolute;
          left: 50%;
          bottom: 88px;
          transform: translateX(-50%);
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          color: #5a5460;
          margin: 0;
          pointer-events: none;
        }
        .zone-panel {
          position: absolute;
          right: 28px;
          top: 72px;
          bottom: 100px;
          width: min(380px, 36vw);
          pointer-events: auto;
          display: flex;
          flex-direction: column;
        }
        .zone-panel-inner {
          flex: 1;
          overflow: auto;
          padding: 22px 24px 28px;
          background: rgba(10, 13, 20, 0.88);
          border: 1px solid rgba(42, 52, 72, 0.75);
          backdrop-filter: blur(12px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
        }
        .zone-panel-head {
          position: relative;
          margin-bottom: 16px;
          padding-right: 64px;
        }
        .zone-kicker {
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.14em;
          color: #8a8490;
          margin: 0 0 8px;
        }
        .zone-panel h2 {
          font-size: 1.35rem;
          font-weight: 500;
          letter-spacing: -0.02em;
          margin: 0;
          color: #f0ebe3;
        }
        .zone-close {
          position: absolute;
          top: 0;
          right: 0;
          border: 1px solid #2a3448;
          background: transparent;
          color: #8a8490;
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.08em;
          padding: 6px 10px;
          cursor: pointer;
        }
        .zone-close:hover {
          color: #e8e4dc;
          border-color: #4a5468;
        }
        .zone-body {
          font-size: 13px;
          line-height: 1.55;
          color: #b8b2a8;
          margin: 0 0 18px;
        }
        .zone-points {
          margin: 0 0 22px;
          padding: 0 0 0 16px;
          color: #9a948a;
          font-size: 12.5px;
          line-height: 1.5;
        }
        .zone-points li {
          margin-bottom: 8px;
        }
        .zone-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .zone-links a {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          color: #c4b59a;
          text-decoration: none;
          border-bottom: 1px solid rgba(196, 181, 154, 0.25);
          padding-bottom: 4px;
          width: fit-content;
        }
        .zone-links a:hover {
          color: #e8e4dc;
          border-color: rgba(232, 228, 220, 0.4);
        }
        .mobile-stage {
          position: absolute;
          inset: 0;
          z-index: 5;
        }
        .mobile-hall {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at 50% 40%, #141a24 0%, #080a10 70%);
          transition: opacity 0.6s ease;
        }
        .mobile-lamp {
          position: absolute;
          top: 12%;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: radial-gradient(circle, #f0dcc0 0%, transparent 70%);
          opacity: 0.35;
          filter: blur(8px);
        }
        .mobile-rings {
          position: absolute;
          width: min(70vw, 280px);
          height: min(70vw, 280px);
        }
        .mobile-rings span {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(42, 52, 72, 0.7);
          border-radius: 50%;
        }
        .mobile-rings span:nth-child(2) {
          inset: 24%;
        }
        .mobile-rings span:nth-child(3) {
          inset: 36%;
        }
        .mobile-object {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          z-index: 1;
        }
        .mobile-object i {
          display: block;
          height: 7px;
          border-radius: 999px;
          background: #c4beb4;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
        }
        .mobile-object i:nth-child(1) {
          width: 72px;
        }
        .mobile-object i:nth-child(2) {
          width: 58px;
        }
        .mobile-object i:nth-child(3) {
          width: 44px;
        }
        .mobile-object i:nth-child(4) {
          width: 30px;
        }
        .mobile-object i:nth-child(5) {
          width: 16px;
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
          pointer-events: auto;
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
          background: rgba(8, 10, 16, 0.55);
          pointer-events: auto;
        }
        .mobile-landing h1 {
          font-size: 1.55rem;
          font-weight: 500;
          margin: 0 0 12px;
        }
        .mobile-landing .tagline {
          margin-bottom: 28px;
        }
        .mobile-landing .actions {
          flex-direction: column;
        }
        .mobile-panel {
          position: absolute;
          inset: 56px 12px 12px;
          z-index: 8;
          pointer-events: auto;
          overflow: auto;
        }
        .mobile-panel .zone-panel {
          position: relative;
          right: auto;
          top: auto;
          bottom: auto;
          width: 100%;
          height: 100%;
        }
        .mobile-panel .zone-panel-inner {
          min-height: 100%;
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
