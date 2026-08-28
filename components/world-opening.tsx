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
  const lintelRef = useRef<Mesh>(null)

  useFrame((_, delta) => {
    const t = Math.min(delta * 2.6, 1)
    if (frameRef.current) {
      const mat = frameRef.current.material as THREE.MeshStandardMaterial
      const target = active ? 0.18 : 0.03
      mat.emissiveIntensity += (target - mat.emissiveIntensity) * t
    }
    if (planeRef.current) {
      const mat = planeRef.current.material as THREE.MeshBasicMaterial
      const target = active ? 0.1 : 0.015
      mat.opacity += (target - mat.opacity) * t
    }
    if (lintelRef.current) {
      const mat = lintelRef.current.material as THREE.MeshStandardMaterial
      const target = active ? 0.14 : 0.02
      mat.emissiveIntensity += (target - mat.emissiveIntensity) * t
    }
  })

  return (
    <group position={[zone.x, 1.45, zone.z]} rotation={[0, -zone.angle, 0]}>
      <mesh position={[0, 0, -0.32]}>
        <boxGeometry args={[1.7, 2.55, 0.55]} />
        <meshStandardMaterial color="#06080e" roughness={1} metalness={0} />
      </mesh>
      <mesh ref={frameRef} position={[0, 0, 0.02]}>
        <boxGeometry args={[2.05, 2.85, 0.12]} />
        <meshStandardMaterial
          color="#121822"
          roughness={0.82}
          metalness={0.12}
          emissive="#c4b59a"
          emissiveIntensity={0.03}
        />
      </mesh>
      <mesh ref={planeRef} position={[0, 0, -0.06]}>
        <planeGeometry args={[1.55, 2.4]} />
        <meshBasicMaterial color="#d4c4a8" transparent opacity={0.015} />
      </mesh>
      <mesh position={[-0.98, 0, 0.08]} castShadow>
        <boxGeometry args={[0.1, 2.85, 0.22]} />
        <meshStandardMaterial color="#1c2430" roughness={0.65} metalness={0.22} />
      </mesh>
      <mesh position={[0.98, 0, 0.08]} castShadow>
        <boxGeometry args={[0.1, 2.85, 0.22]} />
        <meshStandardMaterial color="#1c2430" roughness={0.65} metalness={0.22} />
      </mesh>
      <mesh ref={lintelRef} position={[0, 1.42, 0.1]} castShadow>
        <boxGeometry args={[2.1, 0.12, 0.26]} />
        <meshStandardMaterial
          color="#242c38"
          roughness={0.45}
          metalness={0.35}
          emissive="#c4b59a"
          emissiveIntensity={0.02}
        />
      </mesh>
      <mesh position={[0, -1.48, 0.28]} castShadow>
        <boxGeometry args={[2.0, 0.1, 0.55]} />
        <meshStandardMaterial color="#1a2030" roughness={0.55} metalness={0.25} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.42, 0.35]}>
        <planeGeometry args={[1.85, 0.5]} />
        <meshStandardMaterial
          color={active ? '#2a2830' : '#0e121a'}
          roughness={0.8}
          metalness={0.08}
        />
      </mesh>
    </group>
  )
}

export { CameraController, Opening }
