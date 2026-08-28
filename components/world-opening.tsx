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
  const start = useRef({ x: 0, y: 3.55, z: 12.4 })
  const goal = useRef({ x: 0, y: 1.48, z: 6.35 })
  const look = useRef({ x: 0, y: 1.05, z: 0 })

  useFrame((_, delta) => {
    // Opening settles gently; zone focus stays more responsive.
    const rate = !entered ? 1.15 : focusAngle !== null ? 1.85 : 1.25
    const ease = 1 - Math.exp(-delta * rate)
    if (!entered) {
      camera.position.x += (start.current.x - camera.position.x) * ease * 0.55
      camera.position.y += (start.current.y - camera.position.y) * ease * 0.55
      camera.position.z += (start.current.z - camera.position.z) * ease * 0.55
      look.current.y += (1.05 - look.current.y) * ease * 0.5
      camera.lookAt(0, look.current.y, 0)
      return
    }

    let targetX = 0
    let targetY = 1.32
    let targetZ = 4.55
    let lookX = 0
    let lookY = 0.95

    if (focusAngle !== null) {
      targetX = Math.sin(focusAngle) * 2.45
      targetZ = 4.65 - Math.cos(focusAngle) * 1.3
      targetY = 1.28
      lookX = Math.sin(focusAngle) * 0.82
      lookY = 0.92
    }

    goal.current.x += (targetX - goal.current.x) * ease
    goal.current.y += (targetY - goal.current.y) * ease
    goal.current.z += (targetZ - goal.current.z) * ease
    look.current.x += (lookX - look.current.x) * ease
    look.current.y += (lookY - look.current.y) * ease

    camera.position.x += (goal.current.x - camera.position.x) * ease
    camera.position.y += (goal.current.y - camera.position.y) * ease
    camera.position.z += (goal.current.z - camera.position.z) * ease
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
  const thresholdRef = useRef<Mesh>(null)

  useFrame((_, delta) => {
    const t = Math.min(delta * 2.6, 1)
    if (frameRef.current) {
      const mat = frameRef.current.material as THREE.MeshStandardMaterial
      const target = active ? 0.28 : 0.025
      mat.emissiveIntensity += (target - mat.emissiveIntensity) * t
    }
    if (planeRef.current) {
      const mat = planeRef.current.material as THREE.MeshBasicMaterial
      const target = active ? 0.14 : 0.012
      mat.opacity += (target - mat.opacity) * t
    }
    if (lintelRef.current) {
      const mat = lintelRef.current.material as THREE.MeshStandardMaterial
      const target = active ? 0.2 : 0.02
      mat.emissiveIntensity += (target - mat.emissiveIntensity) * t
    }
    if (thresholdRef.current) {
      const mat = thresholdRef.current.material as THREE.MeshStandardMaterial
      const target = active ? 0.2 : 0.03
      mat.emissiveIntensity += (target - mat.emissiveIntensity) * t
    }
  })

  return (
    <group position={[zone.x, 1.45, zone.z]} rotation={[0, -zone.angle, 0]}>
      <mesh position={[0, 0, -0.55]}>
        <boxGeometry args={[1.72, 2.58, 1.05]} />
        <meshStandardMaterial color="#05070d" roughness={1} metalness={0} />
      </mesh>

      <mesh ref={frameRef} position={[0, 0, 0.02]}>
        <boxGeometry args={[2.05, 2.85, 0.12]} />
        <meshStandardMaterial color="#121822" roughness={0.82} metalness={0.12} emissive="#c4b59a" emissiveIntensity={0.025} />
      </mesh>
      <mesh ref={planeRef} position={[0, 0, -0.07]}>
        <planeGeometry args={[1.55, 2.4]} />
        <meshBasicMaterial color="#d4c4a8" transparent opacity={0.012} />
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
        <meshStandardMaterial color="#242c38" roughness={0.45} metalness={0.35} emissive="#c4b59a" emissiveIntensity={0.02} />
      </mesh>
      <mesh ref={thresholdRef} position={[0, -1.48, 0.28]} castShadow>
        <boxGeometry args={[2.0, 0.1, 0.55]} />
        <meshStandardMaterial color="#1a2030" roughness={0.55} metalness={0.25} emissive="#b9a887" emissiveIntensity={0.03} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.42, 0.35]}>
        <planeGeometry args={[1.85, 0.5]} />
        <meshStandardMaterial color={active ? '#343027' : '#0e121a'} roughness={0.8} metalness={0.08} />
      </mesh>

      {active && (
        <pointLight position={[0, -0.55, 0.55]} intensity={1.4} distance={3.8} decay={2} color="#d9c8a8" />
      )}
    </group>
  )
}

export { CameraController, Opening }
