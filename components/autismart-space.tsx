'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'
import { STAGES, type StageId } from './autismart-data'

/** Angle of AI / HEALTHCARE zone opening in the hall. */
const AI_ANGLE = Math.PI / 3
const R = 4.2

type Props = {
  active: boolean
  stageId: StageId | null
}

/**
 * Conceptual AutiSmart pipeline near the AI zone opening.
 * Nodes = verified system stages. No invented architecture.
 */
export function AutiSmartSpace({ active, stageId }: Props) {
  const group = useRef<Group>(null)
  const nodes = useMemo(() => {
    const n = STAGES.length
    return STAGES.map((s, i) => {
      const t = (i / (n - 1)) * 2 - 1
      const x = Math.sin(AI_ANGLE) * R + Math.cos(AI_ANGLE) * t * 1.35
      const z = Math.cos(AI_ANGLE) * R - Math.sin(AI_ANGLE) * t * 1.35
      return { id: s.id, x, y: 0.55 + (i % 2) * 0.08, z, label: s.label }
    })
  }, [])

  useFrame((_, delta) => {
    if (!group.current) return
    const target = active ? 1 : 0
    group.current.scale.x += (target - group.current.scale.x) * Math.min(delta * 2.2, 1)
    group.current.scale.y = group.current.scale.x
    group.current.scale.z = group.current.scale.x
    group.current.visible = group.current.scale.x > 0.05
  })

  return (
    <group ref={group} scale={[0.001, 0.001, 0.001]} visible={false}>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[
          Math.sin(AI_ANGLE) * R,
          0.04,
          Math.cos(AI_ANGLE) * R,
        ]}
        receiveShadow
      >
        <circleGeometry args={[1.9, 40]} />
        <meshStandardMaterial color="#121820" roughness={0.85} metalness={0.1} />
      </mesh>

      {nodes.slice(0, -1).map((a, i) => {
        const b = nodes[i + 1]
        const mx = (a.x + b.x) / 2
        const my = (a.y + b.y) / 2
        const mz = (a.z + b.z) / 2
        const dx = b.x - a.x
        const dz = b.z - a.z
        const len = Math.sqrt(dx * dx + dz * dz)
        const ang = Math.atan2(dx, dz)
        return (
          <mesh key={`link-${a.id}`} position={[mx, my, mz]} rotation={[0, ang, 0]}>
            <boxGeometry args={[0.04, 0.03, len]} />
            <meshStandardMaterial color="#2a3344" roughness={0.6} metalness={0.2} />
          </mesh>
        )
      })}

      {nodes.map((n) => (
        <PipelineNode
          key={n.id}
          x={n.x}
          y={n.y}
          z={n.z}
          selected={stageId === n.id}
          active={active}
        />
      ))}
    </group>
  )
}

function PipelineNode({
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
    const target = selected ? 0.28 : active ? 0.08 : 0.02
    mat.emissiveIntensity += (target - mat.emissiveIntensity) * Math.min(delta * 3, 1)
  })

  return (
    <group position={[x, y, z]}>
      <mesh ref={ref} castShadow>
        <boxGeometry args={[0.38, 0.22, 0.38]} />
        <meshStandardMaterial
          color={selected ? '#2a303c' : '#1a2030'}
          roughness={0.45}
          metalness={0.35}
          emissive="#c4b59a"
          emissiveIntensity={0.08}
        />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[0.28, 0.06, 0.28]} />
        <meshStandardMaterial
          color={selected ? '#d4c8b0' : '#3a4250'}
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>
    </group>
  )
}
