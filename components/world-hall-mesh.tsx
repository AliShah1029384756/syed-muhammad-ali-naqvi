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
      oculus.current.rotation.y = t * 0.008
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

  const archiveRibs = useMemo(() => Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8
    return { a, x: Math.sin(a) * 5.45, z: Math.cos(a) * 5.45 }
  }), [])

  const discs = [
    { y: 0.48, r: 0.88, h: 0.08 },
    { y: 0.74, r: 0.72, h: 0.072 },
    { y: 0.98, r: 0.56, h: 0.065 },
    { y: 1.2, r: 0.4, h: 0.058 },
    { y: 1.4, r: 0.26, h: 0.05 },
    { y: 1.58, r: 0.14, h: 0.042 },
  ]

  return (
    <group ref={group}>
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
      <pointLight position={[0, 3.75, 0]} intensity={30} distance={12} decay={2} color="#f2e4cc" castShadow />
      <spotLight
        position={[0, 3.9, 0]}
        angle={0.38}
        penumbra={0.55}
        intensity={18}
        distance={9}
        decay={2}
        color="#f5ebd8"
        castShadow
      />
      <pointLight ref={sweepLight} position={[4.5, 2.6, 0]} intensity={0.45} distance={9} decay={2} color="#b7c4d3" />
      <pointLight position={[3.2, 2.0, 3.8]} intensity={2.0} distance={11} color="#c8d0dc" />
      <pointLight position={[-3.4, 1.7, -2.4]} intensity={1.35} distance={10} color="#a8b4c4" />
      <pointLight position={[0, 2.4, -4]} intensity={1.0} distance={9} color="#d8d0c0" />

      <group ref={axis}>
        <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.28, 1.38, 0.16, 48]} />
          <meshStandardMaterial color="#12161f" roughness={0.72} metalness={0.18} />
        </mesh>
        <mesh position={[0, 0.22, 0]} castShadow>
          <cylinderGeometry args={[1.08, 1.18, 0.14, 48]} />
          <meshStandardMaterial color="#1a2030" roughness={0.55} metalness={0.28} />
        </mesh>
        <mesh position={[0, 0.34, 0]} castShadow>
          <cylinderGeometry args={[0.92, 0.98, 0.1, 40]} />
          <meshStandardMaterial color={BRASS} roughness={0.4} metalness={0.55} />
        </mesh>
        <mesh position={[0, 1.0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 1.7, 16]} />
          <meshStandardMaterial color="#2a323f" roughness={0.32} metalness={0.62} />
        </mesh>
        {discs.map((d, i) => (
          <group key={i} position={[0, d.y, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[d.r, d.r * 0.97, d.h, 48]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? IVORY : '#c4bcb0'}
                metalness={0.32}
                roughness={0.24}
                emissive="#cfc6b8"
                emissiveIntensity={0.1 + i * 0.014}
              />
            </mesh>
            <mesh position={[0, d.h * 0.55, 0]}>
              <cylinderGeometry args={[d.r * 0.92, d.r * 0.92, 0.012, 48]} />
              <meshStandardMaterial color={BRASS} roughness={0.35} metalness={0.6} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 1.82, 0]}>
          <sphereGeometry args={[0.09, 20, 20]} />
          <meshStandardMaterial
            color="#e4dccf"
            roughness={0.22}
            metalness={0.5}
            emissive="#cfc6b8"
            emissiveIntensity={0.14}
          />
        </mesh>
        <mesh position={[0, 1.95, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.08, 12]} />
          <meshStandardMaterial color={BRASS} roughness={0.3} metalness={0.65} />
        </mesh>
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, 0]}>
        <circleGeometry args={[1.7, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]} receiveShadow>
        <ringGeometry args={[1.45, 2.35, 64]} />
        <meshStandardMaterial color="#161b26" roughness={0.78} metalness={0.12} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[1.32, 1.38, 64]} />
        <meshStandardMaterial color={BRASS} roughness={0.4} metalness={0.5} />
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
