'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, OrbitControls, Sparkles, Text } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Group } from 'three'

const zones = [
  ['about','01 · ABOUT','The thinking layer','I build practical software with clear architecture, real workflows, and a strong focus on education and healthcare.',[-5.2,2.2,-1.4],'#73e5ff'],
  ['projects','02 · WORK','Systems built','AutiSmart, ClinicOS, SchoolIEP and EduCore — selected work spanning AI, healthcare, education and full-stack engineering.',[5.2,2,-1],'#b58cff'],
  ['skills','03 · SKILLS','The toolkit','JavaScript, React, Node.js, Express, MongoDB, Python, C/C++, REST APIs, Git/GitHub, Power BI and data-focused tooling.',[-5,-1.8,-1.6],'#a9ef8b'],
  ['experience','04 · EXPERIENCE','Where I learned','Software development, teaching, mentoring and digital marketing — combining technical work with communication and real-world workflows.',[5,-1.7,-1.4],'#f5c77a'],
  ['education','05 · EDUCATION','Academic foundation','FAST-NUCES BSCS graduate, with final-year work across systems, databases, networking, algorithms and software engineering.',[-2.8,-4.4,-2.4],'#7de7ff'],
  ['contact','06 · CONTACT','Start a conversation','Open to meaningful software products, junior engineering roles, internships and collaborations.',[2.8,-4.4,-2],'#d0b3ff'],
] as const

const projects = [
  ['AUTISMART','AI / HEALTHCARE','FYP-I A+ · FYP-II A- · Deployed & presented','#73e5ff','https://alishah1029384756.github.io/AliShah1029384756/projects/autismart.html'],
  ['CLINICOS','HEALTHCARE OPERATIONS','Scheduling, records and operational workflows','#b58cff','https://alishah1029384756.github.io/AliShah1029384756/projects/clinicos.html'],
  ['SCHOOLIEP','EDUCATION','Structured IEP records and role-aware workflows','#a9ef8b','https://alishah1029384756.github.io/AliShah1029384756/projects/schooliep.html'],
  ['EDUCORE','OPEN LEARNING','400+ curated technical learning resources','#f5c77a','https://alishah1029384756.github.io/educore-open-learning-hub/'],
]

function CameraRig({ target }: { target: [number,number,number] }) {
  const { camera } = useThree()
  const goal = useRef({ x: 0, y: 1.5, z: 11 })
  useFrame((_, delta) => {
    const desired = { x: target[0] * .42, y: target[1] * .28 + 1.5, z: 11 - Math.min(Math.abs(target[0]) * .16, 1.25) }
    goal.current.x += (desired.x-goal.current.x)*Math.min(delta*2.2,1)
    goal.current.y += (desired.y-goal.current.y)*Math.min(delta*2.2,1)
    goal.current.z += (desired.z-goal.current.z)*Math.min(delta*2.2,1)
    camera.position.lerp(goal.current as any, Math.min(delta*1.7,1))
    camera.lookAt(target[0]*.18,target[1]*.12,0)
  })
  return null
}

function Panel({ zone, active, onClick }: { zone: typeof zones[number]; active: boolean; onClick: () => void }) {
  const [id,label,title,body,pos,color] = zone
  return <group position={pos} onClick={(e)=>{e.stopPropagation();onClick()}}>
    <mesh scale={active?1.07:1}><boxGeometry args={[3.45,1.85,.16]}/><meshPhysicalMaterial color="#091322" metalness={.55} roughness={.2} clearcoat={1} transparent opacity={.94}/></mesh>
    <mesh position={[0,0,.095]}><planeGeometry args={[3.18,1.58]}/><meshBasicMaterial color={color} transparent opacity={active?.13:.045}/></mesh>
    <mesh position={[-1.48,0,.13]}><boxGeometry args={[.035,1.15,.025]}/><meshBasicMaterial color={color}/></mesh>
    <Text position={[-1.25,.55,.14]} fontSize={.09} color={color} anchorX="left" letterSpacing={.08}>{label}</Text>
    <Text position={[-1.25,.23,.14]} fontSize={.18} color="#f4f7fb" anchorX="left">{title}</Text>
    <Text position={[-1.25,-.25,.14]} maxWidth={2.35} fontSize={.065} color="#9aa8bd" anchorX="left" lineHeight={1.45}>{body}</Text>
  </group>
}

function ProjectRing({ onOpen }: { onOpen:(url:string)=>void }) {
  const group=useRef<Group>(null)
  useFrame((state)=>{if(group.current)group.current.rotation.y=state.clock.elapsedTime*.12})
  return <group ref={group} position={[0,.2,0]}>
    <mesh><torusGeometry args={[2.15,.025,10,128]}/><meshBasicMaterial color="#55dfff" transparent opacity={.35}/></mesh>
    {projects.map(([name,type,result,color,url],i)=>{const a=i*Math.PI/2;return <group key={name} position={[Math.cos(a)*2.15,Math.sin(a)*.9,Math.sin(a)*2.15]} rotation={[0,-a,0]}>
      <mesh onClick={(e)=>{e.stopPropagation();onOpen(url)}}><boxGeometry args={[1.85,.95,.12]}/><meshPhysicalMaterial color="#0b1527" metalness={.5} roughness={.18} clearcoat={1}/></mesh>
      <Text position={[-.72,.22,.08]} fontSize={.09} color="#f4f7fb" anchorX="left">{name}</Text>
      <Text position={[-.72,-.02,.08]} fontSize={.047} color={color} anchorX="left">{type}</Text>
      <Text position={[-.72,-.23,.08]} maxWidth={1.35} fontSize={.042} color="#94a1b4" anchorX="left">{result}</Text>
    </group>})}
  </group>
}

function World({ active,setActive,onOpen }: { active:string;setActive:(v:string)=>void;onOpen:(url:string)=>void }) {
  const world=useRef<Group>(null)
  const stars=useMemo(()=>Array.from({length:180},(_,i)=>{const a=i*2.399,r=7+(i%9)*.52;return [Math.cos(a)*r,((i%19)-9)*.65,Math.sin(a)*r-3] as [number,number,number]}),[])
  const target=(zones.find(z=>z[0]===active)?.[5] ? zones.find(z=>z[0]===active)![4] : [0,0,0]) as [number,number,number]
  useFrame((state,delta)=>{if(world.current){world.current.rotation.y+=delta*.009;world.current.position.y=Math.sin(state.clock.elapsedTime*.16)*.08}})
  return <>
    <color attach="background" args={['#02050c']}/><fog attach="fog" args={['#02050c',8,25]}/>
    <ambientLight intensity={.2}/><hemisphereLight color="#8fe9ff" groundColor="#070a13" intensity={.45}/>
    <pointLight position={[5,5,5]} color="#66e5ff" intensity={35} distance={18}/><pointLight position={[-6,1,1]} color="#9b7cff" intensity={28} distance={16}/><pointLight position={[0,-5,3]} color="#f5b86f" intensity={18} distance={14}/>
    <group ref={world}>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,-5.35,0]}><planeGeometry args={[30,30]}/><meshStandardMaterial color="#050b16" metalness={.75} roughness={.5}/></mesh>
      <gridHelper args={[30,60,'#16455a','#0b1b2c']} position={[0,-5.31,0]}/>
      <mesh position={[0,0,-6]}><boxGeometry args={[15,12,.08]}/><meshBasicMaterial color="#12263a" wireframe transparent opacity={.13}/></mesh>
      <Float speed={.55} floatIntensity={.25} rotationIntensity={.12}><group>
        <mesh><icosahedronGeometry args={[1.05,3]}/><meshStandardMaterial color="#071629" emissive="#27dfff" emissiveIntensity={1.1} metalness={.8} roughness={.2} wireframe/></mesh>
        <mesh scale={[.62,1.08,.62]}><sphereGeometry args={[.78,32,24]}/><meshPhysicalMaterial color="#101b30" emissive="#251752" emissiveIntensity={.65} metalness={.6} roughness={.15} clearcoat={1} transparent opacity={.86}/></mesh>
        {[1.45,1.9,2.4].map((r,i)=><mesh key={r} rotation={[i*.55,i*.8,i*.25]}><torusGeometry args={[r,.014,8,128]}/><meshBasicMaterial color={i===1?'#b18cff':'#5fe3ff'} transparent opacity={.45-i*.08}/></mesh>)}
        <Text position={[0,-1.45,0]} fontSize={.12} color="#72e5ff" anchorX="center" letterSpacing={.1}>SYED MUHAMMAD ALI NAQVI</Text>
      </group></Float>
      <ProjectRing onOpen={onOpen}/>
      {zones.map(zone=><Panel key={zone[0]} zone={zone} active={active===zone[0]} onClick={()=>setActive(zone[0])}/>)}
      {zones.map(zone=><mesh key={'beam'+zone[0]} position={[zone[4][0]/2,zone[4][1]/2,zone[4][2]/2]} rotation={[0,Math.atan2(zone[4][0],zone[4][2]),-Math.atan2(zone[4][1],Math.hypot(zone[4][0],zone[4][2]))]}><cylinderGeometry args={[.008,.008,Math.hypot(...zone[4]),6]}/><meshBasicMaterial color={zone[5]} transparent opacity={active===zone[0]?.38:.08}/></mesh>)}
      {stars.map((p,i)=><mesh key={i} position={p}><sphereGeometry args={[.014+(i%3)*.006,6,6]}/><meshBasicMaterial color={i%4===0?'#b895ff':'#72ddff'} transparent opacity={.5}/></mesh>)}
      <Sparkles count={130} scale={18} size={1} speed={.18} color="#75ddff"/>
    </group>
    <CameraRig target={target}/>
    <OrbitControls enablePan={false} minDistance={8} maxDistance={13} minPolarAngle={Math.PI/3.1} maxPolarAngle={Math.PI/1.65} autoRotate autoRotateSpeed={.08}/>
  </>
}

export function Full3DPortfolio(){
  const [active,setActive]=useState('about'),[entered,setEntered]=useState(false),[ready,setReady]=useState(false)
  const activeZone=zones.find(z=>z[0]===active)??zones[0]
  const open=(url:string)=>window.open(url,'_blank','noopener,noreferrer')
  useEffect(()=>{const t=setTimeout(()=>setReady(true),450);return()=>clearTimeout(t)},[])
  return <main className="full3d-site">
    <Canvas className="full3d-canvas" camera={{position:[0,1.5,11],fov:48}} dpr={[1,1.5]} gl={{antialias:true,powerPreference:'high-performance'}}>
      <World active={active} setActive={setActive} onOpen={open}/>
    </Canvas>
    <div className="full3d-ui">
      <header><a className="full3d-logo" href="#">SA <span>· DIGITAL SPACE</span></a><span className="live-dot">AVAILABLE · 2026</span></header>
      {!entered?<section className="full3d-landing"><small>FULL-STACK DEVELOPER · AI BUILDER · FAST-NUCES</small><h1>Build systems.<br/><em>Shape impact.</em></h1><p>Welcome to my digital workspace — an interactive 3D representation of my work, skills, experience and academic journey.</p><button disabled={!ready} onClick={()=>setEntered(true)}>{ready?'ENTER THE SPACE ↗':'INITIALIZING SPACE…'}</button></section>:<>
        <aside className="full3d-info"><small>{activeZone[1]}</small><h2>{activeZone[2]}</h2><p>{activeZone[3]}</p>{active==='projects'&&<div className="project-links">{projects.map(([n,, ,c,u])=><button key={n} style={{borderColor:c}} onClick={()=>open(u)}>{n} ↗</button>)}</div>}</aside>
        <nav className="full3d-nav">{zones.map(z=><button key={z[0]} className={active===z[0]?'active':''} onClick={()=>setActive(z[0])}><i style={{background:z[5]}}/>{z[1]}</button>)}</nav>
        <button className="full3d-exit" onClick={()=>setEntered(false)}>EXIT</button><div className="full3d-hint">DRAG TO EXPLORE · SELECT A ZONE · CAMERA WILL FOLLOW</div>
      </>}
    </div>
    <style jsx global>{`.full3d-site{position:relative;height:100svh;min-height:720px;background:#02050c;color:#f4f7fb;overflow:hidden}.full3d-canvas{position:absolute!important;inset:0!important}.full3d-ui{position:absolute;inset:0;z-index:5;pointer-events:none;font-family:var(--font-sans,Arial,sans-serif)}.full3d-ui header{position:absolute;top:0;left:0;right:0;padding:28px 42px;display:flex;justify-content:space-between;align-items:center;pointer-events:auto;border-bottom:1px solid rgba(255,255,255,.08);background:linear-gradient(180deg,rgba(2,5,12,.7),transparent)}.full3d-logo{font-family:var(--font-mono,monospace);font-weight:700;letter-spacing:.12em;font-size:12px}.full3d-logo span{color:#728198;font-weight:400}.live-dot{font:10px var(--font-mono,monospace);color:#73e5ff;letter-spacing:.1em}.live-dot:before{content:'●';margin-right:8px}.full3d-landing{position:absolute;left:7vw;top:50%;transform:translateY(-48%);max-width:560px;pointer-events:auto}.full3d-landing small,.full3d-info small{color:#73e5ff;font:10px var(--font-mono,monospace);letter-spacing:.12em}.full3d-landing h1{font-size:clamp(3.4rem,7vw,6.5rem);line-height:.95;letter-spacing:-.055em;margin:20px 0}.full3d-landing em{color:#73e5ff;font-style:normal;text-shadow:0 0 40px rgba(115,229,255,.25)}.full3d-landing p{color:#a3afc0;max-width:510px;font-size:16px;line-height:1.7}.full3d-landing button,.full3d-exit{margin-top:28px;padding:13px 18px;border:1px solid #73e5ff;background:rgba(115,229,255,.08);color:#73e5ff;font:11px var(--font-mono,monospace);letter-spacing:.08em;cursor:pointer;pointer-events:auto}.full3d-landing button:disabled{opacity:.5;cursor:wait}.full3d-info{position:absolute;left:5vw;bottom:8vh;max-width:390px;padding:22px;border:1px solid rgba(255,255,255,.11);background:rgba(5,10,20,.72);backdrop-filter:blur(18px);pointer-events:auto}.full3d-info h2{font-size:28px;line-height:1.05;margin:8px 0 12px}.full3d-info p{color:#a3afc0;font-size:13px;line-height:1.6;margin:0}.full3d-nav{position:absolute;right:4vw;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:8px;pointer-events:auto}.full3d-nav button{border:0;background:rgba(4,8,16,.45);color:#748297;padding:8px 10px;text-align:right;font:9px var(--font-mono,monospace);letter-spacing:.07em;cursor:pointer;transition:.2s}.full3d-nav button:hover,.full3d-nav button.active{color:#f4f7fb;background:rgba(115,229,255,.08)}.full3d-nav i{display:inline-block;width:6px;height:6px;border-radius:50%;margin-left:8px}.project-links{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px}.project-links button{padding:7px 9px;background:rgba(255,255,255,.03);color:#dce4ef;border:1px solid;font:9px var(--font-mono,monospace);cursor:pointer}.full3d-exit{position:absolute;right:4vw;bottom:5vh;margin:0;padding:7px 10px;border-color:rgba(255,255,255,.16);color:#8b98aa;background:rgba(4,8,16,.45)}.full3d-hint{position:absolute;left:50%;bottom:2.8vh;transform:translateX(-50%);color:#64748a;font:9px var(--font-mono,monospace);letter-spacing:.09em;white-space:nowrap}@media(max-width:800px){.full3d-site{min-height:620px}.full3d-ui header{padding:18px 20px}.full3d-logo span{display:none}.live-dot{font-size:8px}.full3d-landing{left:20px;right:20px;top:48%;}.full3d-landing h1{font-size:clamp(3rem,15vw,5rem)}.full3d-landing p{font-size:14px}.full3d-info{left:16px;right:16px;bottom:88px;max-width:none;padding:16px}.full3d-info h2{font-size:22px}.full3d-nav{top:auto;right:12px;left:12px;bottom:20px;transform:none;display:grid;grid-template-columns:repeat(3,1fr);gap:4px}.full3d-nav button{padding:7px 4px;text-align:center;font-size:7px}.full3d-nav i{margin-left:0;margin-right:4px}.full3d-exit{right:16px;top:78px;bottom:auto}.full3d-hint{display:none}}@media(prefers-reduced-motion:reduce){.full3d-site *{scroll-behavior:auto!important}}`}</style>
  </main>
}
