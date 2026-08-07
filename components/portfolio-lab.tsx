'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Sparkles } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import type { Group, Mesh } from 'three'

const systems = [
  { id: 'autismart', name: 'AutiSmart', type: 'AI / Healthcare', color: '#f4b942', detail: 'Multimodal assessment, adaptive therapy, and progress reporting.' },
  { id: 'clinic', name: 'ClinicOS', type: 'Operations', color: '#8ba4ff', detail: 'A scheduling-to-billing workflow for modern clinics.' },
  { id: 'school', name: 'SchoolIEP', type: 'Education', color: '#c894ff', detail: 'Structured IEP records with role-based access.' },
  { id: 'edu', name: 'EduConnect', type: 'Community', color: '#65d7bd', detail: 'Student support, resources, forums, and analytics.' },
]

const skillNodes = ['React', 'Node.js', 'Python', 'AI / ML', 'MongoDB', 'Testing', 'Docker', 'System design']

function Core({ active }: { active: string }) {
  const group = useRef<Group>(null)
  const core = useRef<Mesh>(null)
  const nodes = useMemo(() => Array.from({ length: 18 }, (_, index) => {
    const angle = (index / 18) * Math.PI * 2
    return [Math.cos(angle) * 1.7, Math.sin(angle) * 1.7, Math.sin(angle * 2) * 0.55] as [number, number, number]
  }), [])

  useFrame((state, delta) => {
    if (!group.current || !core.current) return
    group.current.rotation.y += delta * 0.16
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08
    core.current.rotation.x += delta * 0.45
    core.current.rotation.y += delta * 0.6
  })

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.75, 2]} />
        <meshStandardMaterial color="#f4b942" emissive="#f4b942" emissiveIntensity={0.65} metalness={0.7} roughness={0.24} wireframe />
      </mesh>
      {nodes.map((position, index) => (
        <group key={index} position={position}>
          <mesh>
            <sphereGeometry args={[active === 'autismart' && index % 3 === 0 ? 0.14 : 0.09, 12, 12]} />
            <meshStandardMaterial color={index % 4 === 0 ? '#f4b942' : '#8ba4ff'} emissive={index % 4 === 0 ? '#f4b942' : '#8ba4ff'} emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.35, 0.008, 8, 96]} />
        <meshBasicMaterial color="#f4b942" transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[0.5, 0.8, 0.2]}>
        <torusGeometry args={[2.05, 0.006, 8, 96]} />
        <meshBasicMaterial color="#8ba4ff" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

export function PortfolioLab() {
  const [active, setActive] = useState('autismart')
  const [command, setCommand] = useState('')
  const current = systems.find((system) => system.id === active) ?? systems[0]

  function handleCommand(value: string) {
    const normalized = value.toLowerCase()
    if (normalized.includes('project') || normalized.includes('work')) document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
    if (normalized.includes('skill') || normalized.includes('stack')) document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' })
    if (normalized.includes('contact') || normalized.includes('hire')) document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
    setCommand('')
  }

  return (
    <section className="lab shell" aria-label="Interactive systems lab">
      <div className="lab-intro">
        <div>
          <p className="kicker">Interactive systems lab / 2026</p>
          <h1>I build systems that <em>make complex work clearer.</em></h1>
          <p className="hero-lede">Full-Stack Software Engineer · AI-Assisted Developer · Technical Mentor</p>
          <p className="hero-description">Move through the system, inspect the work, and see how healthcare, education, and engineering connect.</p>
          <div className="button-row"><a className="button button-primary" href="#projects">Explore the systems <span>↓</span></a><a className="button button-quiet" href="#contact">Start a conversation <span>↗</span></a></div>
        </div>
        <div className="lab-status"><span className="pulse" /> Available for software engineering, backend, and full-stack roles</div>
      </div>
      <div className="lab-stage">
        <div className="scene-wrap" aria-label="Rotating 3D engineering core">
          <Canvas camera={{ position: [0, 0, 6.1], fov: 42 }} dpr={[1, 1.6]}>
            <color attach="background" args={['#131a2b']} />
            <ambientLight intensity={0.7} />
            <pointLight position={[3, 3, 4]} color="#f4b942" intensity={18} />
            <pointLight position={[-4, -2, 2]} color="#8ba4ff" intensity={12} />
            <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.35}><Core active={active} /></Float>
            <Sparkles count={80} scale={6} size={1.2} speed={0.28} color="#f4b942" />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} minPolarAngle={Math.PI / 2.8} maxPolarAngle={Math.PI / 1.8} />
          </Canvas>
          <div className="scene-label"><span>CORE / ONLINE</span><strong>Systems thinking</strong><small>Drag to inspect</small></div>
        </div>
        <div className="system-panel">
          <div className="panel-top"><span>Choose a system</span><span className="mono">{String(systems.findIndex((system) => system.id === active) + 1).padStart(2, '0')} / 04</span></div>
          <div className="system-list">{systems.map((system) => <button key={system.id} className={`system-button ${active === system.id ? 'is-active' : ''}`} onClick={() => setActive(system.id)}><span className="system-dot" style={{ background: system.color }} /><span><b>{system.name}</b><small>{system.type}</small></span><span>↗</span></button>)}</div>
          <div className="system-detail"><span className="eyebrow">{current.type}</span><h3>{current.name}</h3><p>{current.detail}</p><a href="#projects">View case study <span>↓</span></a></div>
        </div>
      </div>
      <div className="lab-bottom"><div><span className="eyebrow">The stack behind the work</span><div className="skill-pills">{skillNodes.map((skill) => <button key={skill} onClick={() => { setCommand(skill); document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' }) }}>{skill}</button>)}</div></div><form className="command-box" onSubmit={(event) => { event.preventDefault(); handleCommand(command) }}><span className="mono">&gt;_</span><input aria-label="Ask the portfolio" placeholder="ask: projects, skills, contact" value={command} onChange={(event) => setCommand(event.target.value)} /><button type="submit">Run</button></form></div>
    </section>
  )
}
