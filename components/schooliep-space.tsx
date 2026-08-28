'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'
import type { IepStageId } from './schooliep-data'

/** ACADEMY zone angle ≈ 2π/3 */
const ANGLE = (2 * Math.PI) / 3
const R = 4.2

type Props = {
  active: boolean
  stageId: IepStageId | null
}

/**
 * SchoolIEP "planning board" — not a pipeline (AutiSmart) and not a desk (ClinicOS).
 * Board plane + goal markers + student / collab columns.
 */
export function SchoolIEPSpace({ active, stageId }: Props) {
  const group = useRef<Group>(null)
  const cx = Math.sin(ANGLE) * R
  const cz = Math.cos(ANGLE) * R

  useFrame((_, delta) => {
    if (!group.current) return
    const target = active ? 1 : 0
    group.current.scale.x += (target - group.current.scale.x) * Math.min(delta * 2.2, 1)
    group.current.scale.y = group.current.scale.x
    group.current.scale.z = group.current.scale.x
    group.current.visible = group.current.scale.x > 0.05
  })

  const goals: { id: IepStageId; ox: number; oy: number; oz: number }[] = [
    { id: 'goals', ox: -0.45, oy: 0.55, oz: 0.15 },
    { id: 'goals', ox: 0.0, oy: 0.72, oz: 0.2 },
    { id: 'goals', ox: 0.45, oy: 0.6, oz: 0.12 },
    { id: 'progress', ox: -0.2, oy: 0.95, oz: 0.05 },
    { id: 'progress', ox: 0.25, oy: 1.05, oz: 0.08 },
  ]

  return (
    <group ref={group} position={[cx, 0, cz]} rotation={[0, -ANGLE, 0]} scale={[0.001, 0.001, 0.001]} visible={false}>
      <mesh rotation={[-Math.PI / 2.4, 0, 0]} position={[0, 0.35, 0]} receiveShadow>
        <boxGeometry args={[2.4, 1.6, 0.06]} />
        <meshStandardMaterial color="#141a24" roughness={0.75} metalness={0.12} />
      </mesh>
      <mesh position={[0, 0.22, -0.55]} castShadow>
        <boxGeometry args={[2.5, 0.12, 0.12]} />
        <meshStandardMaterial color="#1a2030" roughness={0.6} metalness={0.2} />
      </mesh>

      <Marker
        x={-1.05}
        y={0.55}
        z={0.05}
        h={0.85}
        selected={stageId === 'student'}
        active={active}
        wide
      />

      <mesh position={[0, 0.48, 0.05]} rotation={[-0.35, 0, 0]} castShadow>
        <boxGeometry args={[1.1, 0.05, 0.7]} />
        <meshStandardMaterial
          color={stageId === 'iep' ? '#2a303c' : '#1c2430'}
          roughness={0.45}
          metalness={0.25}
          emissive="#c4b59a"
          emissiveIntensity={stageId === 'iep' ? 0.2 : 0.04}
        />
      </mesh>

      {goals.map((g, i) => (
        <mesh key={i} position={[g.ox, g.oy, g.oz]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.12 + (i % 3) * 0.08, 8]} />
          <meshStandardMaterial
            color={
              stageId === g.id ? '#d4c8b0' : g.id === 'progress' ? '#3a4454' : '#2a3444'
            }
            roughness={0.4}
            metalness={0.3}
            emissive="#c4b59a"
            emissiveIntensity={stageId === g.id ? 0.22 : 0.03}
          />
        </mesh>
      ))}

      <Marker
        x={1.05}
        y={0.5}
        z={0.05}
        h={0.7}
        selected={stageId === 'collab'}
        active={active}
        wide={false}
      />
    </group>
  )
}

function Marker({
  x,
  y,
  z,
  h,
  selected,
  active,
  wide,
}: {
  x: number
  y: number
  z: number
  h: number
  selected: boolean
  active: boolean
  wide: boolean
}) {
  const ref = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    const mat = ref.current.material as THREE.MeshStandardMaterial
    const target = selected ? 0.22 : active ? 0.05 : 0.02
    mat.emissiveIntensity += (target - mat.emissiveIntensity) * Math.min(delta * 3, 1)
  })
  const w = wide ? 0.28 : 0.22
  return (
    <group position={[x, y, z]}>
      <mesh ref={ref} castShadow>
        <boxGeometry args={[w, h, w]} />
        <meshStandardMaterial
          color={selected ? '#2a303c' : '#1a2030'}
          roughness={0.5}
          metalness={0.28}
          emissive="#c4b59a"
          emissiveIntensity={0.05}
        />
      </mesh>
      <mesh position={[0, h / 2 + 0.04, 0]}>
        <boxGeometry args={[w * 0.7, 0.06, w * 0.7]} />
        <meshStandardMaterial
          color={selected ? '#d4c8b0' : '#3a4250'}
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>
    </group>
  )
}
