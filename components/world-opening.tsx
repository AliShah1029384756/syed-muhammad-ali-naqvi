'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import type { Mesh } from 'three'
import * as THREE from 'three'
import type { Zone } from './world-data'

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

export { CameraController, Opening }
