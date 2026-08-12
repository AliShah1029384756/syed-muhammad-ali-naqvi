'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, Line, OrbitControls, Sparkles, Text } from '@react-three/drei'
import { useEffect, useMemo, useState } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import type { Group } from 'three'

type Project = {
  id: string
  name: string
  type: string
  detail: string
  result: string
  link: string
  position: [number, number, number]
  color: string
}

const projects: Project[] = [
  { id: 'autismart', name: 'AUTISMART', type: 'AI / HEALTHCARE', detail: 'Team-based Final Year Project for autism assessment and care support.', result: 'FYP-I A+ · FYP-II A- · Deployed & presented', link: 'https://alishah1029384756.github.io/AliShah1029384756/projects/autismart.html', position: [-3.25, 1.0, -0.15], color: '#7de7ff' },
  { id: 'clinicos', name: 'CLINICOS', type: 'HEALTHCARE OPERATIONS', detail: 'Clinic workflow software covering scheduling, records, and operational processes.', result: 'Systemized clinic operations lifecycle', link: 'https://alishah1029384756.github.io/AliShah1029384756/projects/clinicos.html', position: [3.15, 1.0, -0.45], color: '#c6a8ff' },
  { id: 'schooliep', name: 'SCHOOLIEP', type: 'EDUCATION', detail: 'Structured IEP records and role-aware workflows for school environments.', result: 'Auditable education record lifecycle', link: 'https://alishah1029384756.github.io/AliShah1029384756/projects/schooliep.html', position: [-2.45, -1.55, -0.7], color: '#b8f28b' },
  { id: 'educore', name: 'EDUCORE', type: 'OPEN LEARNING', detail: 'Student-first open-learning hub with 400+ curated technical resources.', result: 'Discoverable learning ecosystem', link: 'https://alishah1029384756.github.io/educore-open-learning-hub/', position: [2.55, -1.55, -0.9], color: '#f5c77a' },
]

const sections = [
  ['ABOUT', 'The thinking layer', '#about'],
  ['WORK', 'Systems built', '#projects'],
  ['SKILLS', 'The toolkit', '#skills'],
  ['EXPERIENCE', 'Where I learned', '#experience'],
  ['EDUCATION', 'Academic foundation', '#education'],
  ['CONTACT', 'Start a conversation', '#contact'],
]

function ProjectPanel({ project, active, onSelect }: { project: Project; active: boolean; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false)
  const scale = active || hovered ? 1.08 : 1

  return (
    <group
      position={project.position}
      scale={scale}
      onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect() }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <boxGeometry args={[2.35, 1.45, 0.08]} />
        <meshPhysicalMaterial color="#0b1324" transparent opacity={0.92} roughness={0.2} metalness={0.35} clearcoat={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.055]}>
        <planeGeometry args={[2.18, 1.28]} />
        <meshBasicMaterial color={active || hovered ? project.color : '#132039'} transparent opacity={active || hovered ? 0.12 : 0.06} />
      </mesh>
      <mesh position={[-1.0, 0.48, 0.08]}>
        <boxGeometry args={[0.035, 0.72, 0.02]} />
        <meshBasicMaterial color={project.color} />
      </mesh>
      <Text position={[-0.78, 0.35, 0.11]} fontSize={0.14} color="#f3f7ff" anchorX="left" letterSpacing={0.02}>{project.name}</Text>
      <Text position={[-0.78, 0.10, 0.11]} fontSize={0.065} color={project.color} anchorX="left" letterSpacing={0.04}>{project.type}</Text>
      <Text position={[-0.78, -0.20, 0.11]} maxWidth={1.55} fontSize={0.065} color="#8c9ab1" anchorX="left" lineHeight={1.35}>{project.detail}</Text>
      <Text position={[-0.78, -0.48, 0.11]} fontSize={0.052} color="#d6ddea" anchorX="left" letterSpacing={0.02}>{project.result}</Text>
      <mesh position={[0.82, 0.49, 0.12]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color={project.color} />
      </mesh>
    </group>
  )
}

function Scene({ active, onSelect, reduced }: { active: string; onSelect: (id: string) => void; reduced: boolean }) {
  const world = useMemo(() => ({ current: null as Group | null }), [])

  useFrame((state, delta) => {
    if (!world.current || reduced) return
    world.current.rotation.y += delta * 0.035
    world.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.015
  })

  const starPositions = useMemo(() => Array.from({ length: 90 }, (_, index) => {
    const a = index * 2.39996
    const r = 5.5 + (index % 7) * 0.45
    return [Math.cos(a) * r, Math.sin(a * 1.37) * 2.9, Math.sin(a) * r - 2] as [number, number, number]
  }), [])

  return (
    <>
      <color attach="background" args={['#050914']} />
      <fog attach="fog" args={['#050914', 7, 18]} />
      <ambientLight intensity={0.22} />
      <hemisphereLight color="#9feaff" groundColor="#090d19" intensity={0.42} />
      <pointLight position={[4, 5, 5]} color="#77e6ff" intensity={28} distance={14} />
      <pointLight position={[-5, 1, 2]} color="#9b7cff" intensity={22} distance={12} />
      <pointLight position={[0, -3, 4]} color="#f2b76b" intensity={12} distance={10} />

      <group ref={world}>
        {/* A real spatial floor: perspective, depth and light give the scene a room-like feel. */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.25, 0]}>
          <planeGeometry args={[18, 18]} />
          <meshStandardMaterial color="#07101f" metalness={0.72} roughness={0.48} />
        </mesh>
        <gridHelper args={[18, 36, '#1d5062', '#0d2034']} position={[0, -2.22, 0]} />

        {/* Floating architectural frames create a navigable digital room instead of a single object. */}
        <mesh position={[0, 0.35, -2.5]}>
          <boxGeometry args={[8.8, 5.2, 0.06]} />
          <meshBasicMaterial color="#163149" transparent opacity={0.18} wireframe />
        </mesh>
        <mesh position={[0, -0.2, -4.2]}>
          <planeGeometry args={[13, 7]} />
          <meshBasicMaterial color="#0a1222" transparent opacity={0.7} />
        </mesh>

        {/* Central identity object: layered geometry reads as a spatial sculpture, not a sphere. */}
        <Float speed={0.7} rotationIntensity={0.08} floatIntensity={0.22}>
          <group position={[0, 0.05, 0]}>
            <mesh>
              <icosahedronGeometry args={[0.82, 2]} />
              <meshStandardMaterial color="#08172a" emissive="#37dfff" emissiveIntensity={0.9} metalness={0.75} roughness={0.22} wireframe />
            </mesh>
            <mesh scale={[0.58, 1.05, 0.58]}>
              <sphereGeometry args={[0.62, 32, 20]} />
              <meshPhysicalMaterial color="#101b31" emissive="#251a55" emissiveIntensity={0.55} transparent opacity={0.88} metalness={0.55} roughness={0.18} clearcoat={1} />
            </mesh>
            {[1.35, 1.75, 2.2].map((radius, index) => (
              <mesh key={radius} rotation={[0.45 + index * 0.35, 0.25 + index * 0.55, index * 0.2]}>
                <torusGeometry args={[radius, 0.012, 8, 128]} />
                <meshBasicMaterial color={index === 1 ? '#b38cff' : '#63dfff'} transparent opacity={0.42 - index * 0.08} />
              </mesh>
            ))}
            <Text position={[0, -1.28, 0]} fontSize={0.11} color="#73e5ff" anchorX="center" letterSpacing={0.08}>ALI / DIGITAL IDENTITY</Text>
          </group>
        </Float>

        {projects.map((project) => (
          <ProjectPanel key={project.id} project={project} active={active === project.id} onSelect={() => onSelect(project.id)} />
        ))}

        {starPositions.map((position, index) => (
          <mesh key={index} position={position}>
            <sphereGeometry args={[0.018 + (index % 3) * 0.008, 6, 6]} />
            <meshBasicMaterial color={index % 4 === 0 ? '#c5a4ff' : '#71ddff'} transparent opacity={0.55} />
          </mesh>
        ))}

        <Sparkles count={reduced ? 35 : 110} scale={11} size={0.9} speed={reduced ? 0 : 0.18} color="#74ddff" />

        {/* Connecting beams make the projects feel like one system. */}
        {projects.map((project, index) => (
          <Line key={`beam-${project.id}`} points={[[0, 0.05, 0], project.position]} color={project.color} transparent opacity={active === project.id ? 0.45 : 0.10} lineWidth={active === project.id ? 1.2 : 0.45} />
        ))}
      </group>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduced} autoRotateSpeed={0.12} minPolarAngle={Math.PI / 2.65} maxPolarAngle={Math.PI / 1.7} />
    </>
  )
}

export function SpaceProfile() {
  const [entered, setEntered] = useState(false)
  const [active, setActive] = useState('autismart')
  const [reduced, setReduced] = useState(false)
  const [command, setCommand] = useState('')
  const current = projects.find((project) => project.id === active) ?? projects[0]

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  function runCommand(value: string) {
    const query = value.toLowerCase().trim()
    const project = projects.find((item) => query.includes(item.id))
    if (project) setActive(project.id)
    const section = sections.find((item) => query.includes(item[0].toLowerCase()))
    if (section) document.querySelector(section[2])?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
    setCommand('')
  }

  return (
    <section className={`immersive-profile ${entered ? 'is-entered' : 'is-landing'}`} aria-label="Immersive portfolio for Syed Muhammad Ali Naqvi">
      <div className="immersive-vignette" />
      <div className="immersive-topbar">
        <a href="#top" className="immersive-brand"><span>SA</span><b>SYED MUHAMMAD ALI NAQVI</b></a>
        <span className="immersive-status"><i /> AVAILABLE · 2026</span>
      </div>

      <div className="immersive-canvas" aria-hidden={!entered}>
        <Canvas camera={{ position: [0, 1.15, 9.6], fov: 47 }} dpr={[1, 1.45]}>
          <Scene active={active} onSelect={setActive} reduced={reduced} />
        </Canvas>
      </div>

      {!entered && (
        <div className="immersive-landing">
          <div className="immersive-kicker">FULL-STACK DEVELOPER · AI BUILDER · FAST-NUCES GRADUATE</div>
          <h1>Syed Muhammad<br /><em>Ali Naqvi.</em></h1>
          <p>Step into the space where I keep the systems I have built, the problems they solve, and the engineering behind them.</p>
          <div className="immersive-actions">
            <button type="button" onClick={() => setEntered(true)}>ENTER MY SPACE <span>↗</span></button>
            <a href="#about">Skip to portfolio</a>
          </div>
          <small>Move your pointer to feel the depth · Drag to explore</small>
        </div>
      )}

      {entered && (
        <>
          <div className="immersive-project-info">
            <span>01 / ACTIVE PROJECT</span>
            <strong>{current.name}</strong>
            <b>{current.type}</b>
            <p>{current.detail}</p>
            <small>{current.result}</small>
            <a href={current.link} target="_blank" rel="noopener noreferrer">OPEN PROJECT ↗</a>
          </div>

          <nav className="immersive-nav" aria-label="Portfolio sections">
            {sections.map(([label, detail, href]) => <a key={label} href={href}><span>{label}</span><small>{detail}</small></a>)}
          </nav>

          <form className="immersive-command" onSubmit={(event) => { event.preventDefault(); runCommand(command) }}>
            <span>⌘</span>
            <input aria-label="Navigate portfolio" value={command} onChange={(event) => setCommand(event.target.value)} placeholder="projects / autismart / education / contact" />
          </form>

          <button className="immersive-exit" type="button" onClick={() => setEntered(false)}>EXIT SPACE</button>
          <div className="immersive-hint">DRAG TO ORBIT · CLICK A PROJECT PANEL</div>
        </>
      )}

      <style>{`
        .immersive-profile{position:relative;isolation:isolate;height:100svh;min-height:720px;overflow:hidden;background:#040711;color:#f4f7fb}
        .immersive-profile::before{content:"";position:absolute;inset:0;z-index:0;background:radial-gradient(circle at 50% 44%,rgba(54,175,220,.12),transparent 24%),radial-gradient(circle at 72% 22%,rgba(143,103,255,.11),transparent 28%),linear-gradient(180deg,#07101d 0%,#040711 65%,#02040a 100%);pointer-events:none}
        .immersive-vignette{position:absolute;inset:0;z-index:3;pointer-events:none;background:radial-gradient(circle,transparent 38%,rgba(1,3,8,.52) 100%);mix-blend-mode:multiply}
        .immersive-canvas{position:absolute;inset:0;z-index:1;transition:transform 1.1s cubic-bezier(.2,.8,.2,1),opacity 900ms ease;transform:scale(1)}
        .is-landing .immersive-canvas{opacity:.72;transform:scale(1.04)}
        .immersive-canvas canvas{display:block}
        .immersive-topbar{position:absolute;top:0;left:0;right:0;z-index:5;display:flex;align-items:center;justify-content:space-between;padding:24px 34px;border-bottom:1px solid rgba(255,255,255,.09);background:linear-gradient(180deg,rgba(3,7,15,.72),rgba(3,7,15,0));backdrop-filter:blur(8px)}
        .immersive-brand{display:flex;align-items:center;gap:12px;font-family:var(--font-mono),monospace;font-size:10px;letter-spacing:.14em}.immersive-brand span{display:grid;place-items:center;width:31px;height:31px;border:1px solid #78ddff;color:#78ddff;box-shadow:0 0 24px rgba(91,217,255,.16)}.immersive-brand b{font-weight:500}.immersive-status{font-family:var(--font-mono),monospace;font-size:9px;letter-spacing:.12em;color:rgba(235,243,255,.58)}.immersive-status i{display:inline-block;width:6px;height:6px;margin-right:8px;border-radius:50%;background:#b7ed8a;box-shadow:0 0 12px #b7ed8a}
        .immersive-landing{position:relative;z-index:4;display:flex;flex-direction:column;justify-content:center;width:min(690px,calc(100% - 48px));height:100%;margin-inline:auto;text-align:center;pointer-events:none}.immersive-landing>*{pointer-events:auto}.immersive-kicker{color:#79dfff;font-family:var(--font-mono),monospace;font-size:10px;letter-spacing:.18em}.immersive-landing h1{margin:24px 0 20px;max-width:none;font-size:clamp(4.1rem,9vw,8.2rem);font-weight:500;line-height:.88;letter-spacing:-.075em;text-shadow:0 16px 60px rgba(0,0,0,.48)}.immersive-landing h1 em{color:#d4b5ff;font-style:normal}.immersive-landing p{max-width:510px;margin:0 auto;color:rgba(235,242,255,.68);font-size:16px;line-height:1.7}.immersive-actions{display:flex;justify-content:center;align-items:center;gap:20px;margin-top:30px}.immersive-actions button{padding:14px 18px;border:1px solid #78ddff;background:rgba(77,201,255,.12);color:#eaf9ff;font-family:var(--font-mono),monospace;font-size:10px;letter-spacing:.12em;cursor:pointer;box-shadow:0 0 36px rgba(67,205,255,.12);transition:transform .2s ease,background .2s ease}.immersive-actions button:hover{transform:translateY(-3px);background:rgba(77,201,255,.2)}.immersive-actions button span{margin-left:16px;color:#78ddff}.immersive-actions a{color:rgba(235,242,255,.52);font-family:var(--font-mono),monospace;font-size:9px}.immersive-landing small{margin-top:24px;color:rgba(235,242,255,.34);font-family:var(--font-mono),monospace;font-size:9px;letter-spacing:.08em}
        .immersive-project-info{position:absolute;left:34px;bottom:34px;z-index:5;width:310px;padding:18px 20px;border:1px solid rgba(120,221,255,.22);background:rgba(4,9,19,.7);backdrop-filter:blur(18px);box-shadow:0 18px 70px rgba(0,0,0,.34)}.immersive-project-info span{color:#79dfff;font-family:var(--font-mono),monospace;font-size:8px;letter-spacing:.15em}.immersive-project-info strong{display:block;margin-top:8px;font-size:27px;letter-spacing:-.04em}.immersive-project-info b{display:block;margin-top:2px;color:#c7a9ff;font-family:var(--font-mono),monospace;font-size:9px;letter-spacing:.12em}.immersive-project-info p{margin:12px 0 7px;color:rgba(235,242,255,.62);font-size:11px;line-height:1.55}.immersive-project-info small{display:block;color:rgba(235,242,255,.78);font-size:9px}.immersive-project-info a{display:inline-block;margin-top:14px;color:#79dfff;font-family:var(--font-mono),monospace;font-size:9px;letter-spacing:.1em}
        .immersive-nav{position:absolute;right:34px;bottom:34px;z-index:5;display:grid;width:185px;gap:1px}.immersive-nav a{display:grid;gap:3px;padding:10px 12px;border:1px solid rgba(255,255,255,.08);background:rgba(4,9,19,.58);backdrop-filter:blur(12px);transition:transform .2s ease,border-color .2s ease,background .2s ease}.immersive-nav a:hover{transform:translateX(-5px);border-color:rgba(120,221,255,.4);background:rgba(20,37,61,.72)}.immersive-nav span{color:#79dfff;font-family:var(--font-mono),monospace;font-size:9px;letter-spacing:.12em}.immersive-nav small{color:rgba(235,242,255,.42);font-size:9px}
        .immersive-command{position:absolute;left:50%;bottom:28px;z-index:6;display:flex;align-items:center;gap:10px;width:min(340px,calc(100% - 40px));padding:10px 13px;transform:translateX(-50%);border:1px solid rgba(199,169,255,.3);background:rgba(4,9,19,.76);backdrop-filter:blur(16px);box-shadow:0 0 40px rgba(122,93,255,.08)}.immersive-command span{color:#c7a9ff;font-family:var(--font-mono),monospace}.immersive-command input{min-width:0;flex:1;border:0;outline:0;background:transparent;color:#eef6ff;font-family:var(--font-mono),monospace;font-size:9px}.immersive-command input::placeholder{color:rgba(235,242,255,.34)}
        .immersive-exit{position:absolute;top:88px;right:34px;z-index:6;padding:7px 10px;border:1px solid rgba(255,255,255,.1);background:rgba(4,9,19,.42);color:rgba(235,242,255,.54);font-family:var(--font-mono),monospace;font-size:8px;letter-spacing:.1em;cursor:pointer}.immersive-exit:hover{color:#79dfff;border-color:rgba(120,221,255,.4)}.immersive-hint{position:absolute;left:50%;top:104px;z-index:5;transform:translateX(-50%);color:rgba(235,242,255,.3);font-family:var(--font-mono),monospace;font-size:8px;letter-spacing:.13em;pointer-events:none}
        @media (prefers-reduced-motion:reduce){.immersive-canvas{transition:none}.immersive-actions button:hover,.immersive-nav a:hover{transform:none}}
        @media (max-width:760px){.immersive-profile{min-height:680px}.immersive-topbar{padding:16px}.immersive-brand b{display:none}.immersive-status{font-size:7px}.immersive-landing{width:calc(100% - 30px)}.immersive-landing h1{font-size:4rem}.immersive-landing p{font-size:13px}.immersive-actions{flex-direction:column;gap:14px}.immersive-project-info{left:15px;bottom:74px;width:calc(100% - 30px);padding:14px}.immersive-project-info strong{font-size:22px}.immersive-nav{right:15px;top:82px;bottom:auto;width:126px}.immersive-nav a{padding:7px 9px}.immersive-nav small{display:none}.immersive-command{bottom:16px}.immersive-exit{top:55px;right:15px}.immersive-hint{display:none}}
      `}</style>
    </section>
  )
}
