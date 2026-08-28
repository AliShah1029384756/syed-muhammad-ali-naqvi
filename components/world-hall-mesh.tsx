'use client'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Group } from 'three'
import * as THREE from 'three'
import { ZONES } from './world-data'
import { Opening } from './world-opening'
import { AutiSmartSpace } from './autismart-space'
import type { StageId } from './autismart-data'
import { ClinicOSSpace } from './clinicos-space'
import type { ClinicStageId } from './clinicos-data'
import { SchoolIEPSpace } from './schooliep-space'
import type { IepStageId } from './schooliep-data'

const STONE = '#151a23'
const STONE_DARK = '#0d1119'
const METAL = '#282d36'
const IVORY = '#d8d0c3'
const BRASS = '#b9a887'

function Hall({ focusId, stageId, clinicStageId, iepStageId }: { focusId: string | null; stageId: StageId | null; clinicStageId: ClinicStageId | null; iepStageId: IepStageId | null }) {
  const group = useRef<Group>(null)
  const axis = useRef<Group>(null)
  const oculus = useRef<Group>(null)
  const sweepLight = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y = Math.sin(t * 0.035) * 0.01
    if (axis.current) {
      axis.current.position.y = Math.sin(t * 0.32) * 0.012
    }
    if (oculus.current) {
      oculus.current.rotation.y = t * 0.018
    }
    if (sweepLight.current) {
      sweepLight.current.position.x = Math.sin(t * 0.08) * 4.5
      sweepLight.current.position.z = Math.cos(t * 0.08) * 4.5
    }
  })

  const openings = useMemo(() => {
    const r = 6.6
    return ZONES.map((z) => ({ ...z, x: Math.sin(z.angle) * r, z: Math.cos(z.angle) * r }))
  }, [])

  const pillars = useMemo(() => Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2
    return { x: Math.sin(a) * 7.35, z: Math.cos(a) * 7.35 }
  }), [])

  const archiveRibs = useMemo(() => Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2 + Math.PI / 18
    return { a, x: Math.sin(a) * 5.45, z: Math.cos(a) * 5.45 }
  }), [])

  const discs = [
    { y: 0.52, r: 0.78, h: 0.07 },
    { y: 0.78, r: 0.64, h: 0.065 },
    { y: 1.02, r: 0.5, h: 0.06 },
    { y: 1.24, r: 0.36, h: 0.055 },
    { y: 1.44, r: 0.22, h: 0.05 },
    { y: 1.6, r: 0.12, h: 0.04 },
  ]

  return (
    <group ref={group}>
      {/* Floor: a dark stone disc with restrained brass/ivory inlays. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[9.2, 80]} />
        <meshStandardMaterial color="#0f131b" roughness={0.92} metalness={0.04} />
      </mesh>
      {[2.55, 4.2, 5.95, 7.75].map((radius) => (
        <mesh key={radius} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
          <ringGeometry args={[radius - 0.025, radius + 0.025, 80]} />
          <meshStandardMaterial color={radius === 4.2 ? '#665e50' : '#262d38'} roughness={0.7} metalness={0.18} />
        </mesh>
      ))}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2
        return (
          <mesh key={`floor-ray-${i}`} rotation={[-Math.PI / 2, 0, a]} position={[0, 0.015, 0]}>
            <planeGeometry args={[0.025, 7.2]} />
            <meshBasicMaterial color="#85795f" transparent opacity={0.18} />
          </mesh>
        )
      })}

      {/* Architectural shell. */}
      <mesh position={[0, 2.15, 0]}>
        <cylinderGeometry args={[8.5, 8.5, 4.5, 64, 1, true]} />
        <meshStandardMaterial color="#0e131c" side={THREE.BackSide} roughness={0.94} metalness={0.04} />
      </mesh>
      <mesh position={[0, 4.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 8.6, 64]} />
        <meshStandardMaterial color="#090d14" roughness={1} metalness={0} />
      </mesh>

      {pillars.map((p, i) => (
        <group key={i} position={[p.x, 0, p.z]}>
          <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.48, 0.24, 0.48]} />
            <meshStandardMaterial color={STONE} roughness={0.7} metalness={0.15} />
          </mesh>
          <mesh position={[0, 1.95, 0]} castShadow>
            <boxGeometry args={[0.34, 3.5, 0.34]} />
            <meshStandardMaterial color="#141a24" roughness={0.86} metalness={0.1} />
          </mesh>
          <mesh position={[0, 3.78, 0]} castShadow>
            <boxGeometry args={[0.46, 0.18, 0.46]} />
            <meshStandardMaterial color="#1e2632" roughness={0.6} metalness={0.22} />
          </mesh>
        </group>
      ))}

      {/* Archive ribs: the room now reads as a working archive rather than an empty lobby. */}
      {archiveRibs.map((r, i) => (
        <group key={`archive-${i}`} position={[r.x, 0, r.z]} rotation={[0, -r.a, 0]}>
          <mesh position={[0, 1.72, -0.12]} castShadow>
            <boxGeometry args={[0.075, 3.15, 0.22]} />
            <meshStandardMaterial color={i % 3 === 0 ? METAL : STONE} roughness={0.64} metalness={0.2} />
          </mesh>
          {[0.62, 1.08, 1.54, 2.0, 2.46].map((y, j) => (
            <mesh key={y} position={[0.02, y, 0]} castShadow>
              <boxGeometry args={[0.72 - j * 0.035, 0.045, 0.34]} />
              <meshStandardMaterial color={j === 0 ? BRASS : '#343a43'} roughness={0.52} metalness={0.28} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Ceiling oculus: slow mechanical rotation gives the architecture a living rhythm. */}
      <group ref={oculus} position={[0, 4.03, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.25, 2.35, 64]} />
          <meshStandardMaterial color="#1b2028" roughness={0.45} metalness={0.48} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.92, 0.98, 48]} />
          <meshBasicMaterial color="#d9ccb5" transparent opacity={0.42} />
        </mesh>
        <mesh position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.32, 16]} />
          <meshStandardMaterial color={BRASS} roughness={0.34} metalness={0.5} />
        </mesh>
      </group>

      {/* Central lamp and soft gallery illumination. */}
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
      <pointLight position={[0, 3.75, 0]} intensity={26} distance={14} decay={2} color="#f0e2cc" castShadow />
      <pointLight ref={sweepLight} position={[4.5, 2.6, 0]} intensity={0.65} distance={9} decay={2} color="#b7c4d3" />
      <pointLight position={[3.2, 2.0, 3.8]} intensity={2.8} distance={11} color="#c8d0dc" />
      <pointLight position={[-3.4, 1.7, -2.4]} intensity={1.8} distance={10} color="#a8b4c4" />
      <pointLight position={[0, 2.4, -4]} intensity={1.4} distance={9} color="#d8d0c0" />

      {/* Knowledge axis: a physical artifact rather than a generic 3D object. */}
      <group ref={axis}>
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.15, 1.25, 0.2, 40]} />
          <meshStandardMaterial color="#171c28" roughness={0.68} metalness={0.22} />
        </mesh>
        <mesh position={[0, 0.28, 0]} castShadow>
          <cylinderGeometry args={[0.98, 1.05, 0.16, 40]} />
          <meshStandardMaterial color="#1e2430" roughness={0.55} metalness={0.28} />
        </mesh>
        <mesh position={[0, 0.95, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 1.55, 12]} />
          <meshStandardMaterial color="#2e3644" roughness={0.35} metalness={0.55} />
        </mesh>
        <mesh position={[0, 1.78, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#d8cfc2" roughness={0.25} metalness={0.45} emissive="#cfc6b8" emissiveIntensity={0.08} />
        </mesh>
        {discs.map((d, i) => (
          <mesh key={i} position={[0, d.y, 0]} castShadow>
            <cylinderGeometry args={[d.r, d.r * 0.98, d.h, 40]} />
            <meshStandardMaterial color={i % 2 === 0 ? IVORY : '#c8c0b5'} metalness={0.28} roughness={0.28} emissive="#cfc6b8" emissiveIntensity={0.08 + i * 0.012} />
          </mesh>
        ))}
        <mesh position={[0, 1.9, 0]}>
          <boxGeometry args={[0.06, 0.06, 0.06]} />
          <meshBasicMaterial color="#f0dfc1" />
        </mesh>
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, 0]}>
        <circleGeometry args={[1.55, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <ringGeometry args={[1.35, 2.15, 64]} />
        <meshStandardMaterial color="#161b26" roughness={0.78} metalness={0.12} />
      </mesh>

      {openings.map((o) => <Opening key={o.id} zone={o} active={focusId === o.id} />)}

      <AutiSmartSpace active={focusId === 'ai'} stageId={stageId} />
      <ClinicOSSpace active={focusId === 'engineering'} stageId={clinicStageId} />
      <SchoolIEPSpace active={focusId === 'academy'} stageId={iepStageId} />

      <ambientLight intensity={0.12} />
      <hemisphereLight color="#6a7888" groundColor="#0e1016" intensity={0.32} />
      <directionalLight position={[-5.5, 8.5, 4.5]} intensity={0.28} color="#c5d0dc" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
    </group>
  )
}

export { Hall }
