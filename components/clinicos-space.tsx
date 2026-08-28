'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'
import type { ClinicStageId } from './clinicos-data'

/** ENGINEERING zone angle = 0 (forward opening). */
const ANGLE = 0
const R = 4.15

type Props = {
  active: boolean
  stageId: ClinicStageId | null
}

/**
 * ClinicOS "operations desk" — not a linear pipeline (AutiSmart).
 * Central desk + workflow cards + access block.
 */
export function ClinicOSSpace({ active, stageId }: Props) {
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

  const cards: { id: ClinicStageId; ox: number; oz: number; y: number }[] = [
    { id: 'patient', ox: -0.95, oz: 0.35, y: 0.42 },
    { id: 'session', ox: -0.3, oz: 0.55, y: 0.42 },
    { id: 'plan', ox: 0.35, oz: 0.55, y: 0.42 },
    { id: 'progress', ox: 1.0, oz: 0.35, y: 0.42 },
  ]

  return (
    <group ref={group} position={[cx, 0, cz]} scale={[0.001, 0.001, 0.001]} visible={false}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.28, 0.1]} receiveShadow>
        <boxGeometry args={[2.6, 1.4, 0.08]} />
        <meshStandardMaterial color="#151b26" roughness={0.7} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.12, 0.1]} castShadow>
        <boxGeometry args={[2.4, 0.24, 1.2]} />
        <meshStandardMaterial color="#10161f" roughness={0.8} metalness={0.08} />
      </mesh>

      {cards.map((c) => (
        <DeskCard
          key={c.id}
          x={c.ox}
          y={c.y}
          z={c.oz}
          selected={stageId === c.id}
          active={active}
        />
      ))}

      <group position={[-1.45, 0.55, -0.35]}>
        <mesh castShadow>
          <boxGeometry args={[0.45, 0.7, 0.45]} />
          <meshStandardMaterial
            color={stageId === 'access' ? '#2a303c' : '#1a2030'}
            roughness={0.5}
            metalness={0.3}
            emissive="#c4b59a"
            emissiveIntensity={stageId === 'access' ? 0.2 : 0.04}
          />
        </mesh>
        <mesh position={[0, 0.42, 0]}>
          <boxGeometry args={[0.32, 0.08, 0.32]} />
          <meshStandardMaterial
            color={stageId === 'access' ? '#d4c8b0' : '#3a4250'}
            roughness={0.35}
            metalness={0.4}
          />
        </mesh>
      </group>
    </group>
  )
}

function DeskCard({
  x,
  y,
  z,
  selected,
  active,
}: {
  x: number
  y: number
  z: number
  selected: boolean
  active: boolean
}) {
  const ref = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    const mat = ref.current.material as THREE.MeshStandardMaterial
    const target = selected ? 0.24 : active ? 0.06 : 0.02
    mat.emissiveIntensity += (target - mat.emissiveIntensity) * Math.min(delta * 3, 1)
  })

  return (
    <group position={[x, y, z]}>
      <mesh ref={ref} castShadow rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.52, 0.04, 0.7]} />
        <meshStandardMaterial
          color={selected ? '#2a303c' : '#1c2430'}
          roughness={0.4}
          metalness={0.25}
          emissive="#c4b59a"
          emissiveIntensity={0.06}
        />
      </mesh>
      <mesh position={[0, 0.04, 0.12]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.38, 0.015, 0.35]} />
        <meshStandardMaterial
          color={selected ? '#d4c8b0' : '#3a4454'}
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>
    </group>
  )
}
