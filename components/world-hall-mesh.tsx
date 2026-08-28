'use client'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Group } from 'three'
import * as THREE from 'three'
import { ZONES } from './world-data'
import { Opening } from './world-opening'

function Hall({ focusId }: { focusId: string | null }) {
  const group = useRef<Group>(null)
  const axis = useRef<Group>(null)

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y = Math.sin(t * 0.035) * 0.01
    if (axis.current) {
      axis.current.position.y = Math.sin(t * 0.32) * 0.012
    }
  })

  const openings = useMemo(() => {
    return ZONES.map((z) => {
      const r = 6.6
      return {
        ...z,
        x: Math.sin(z.angle) * r,
        z: Math.cos(z.angle) * r,
      }
    })
  }, [])

  const pillars = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2
      return {
        x: Math.sin(a) * 7.35,
        z: Math.cos(a) * 7.35,
      }
    })
  }, [])

  const discs = [
    { y: 0.38, r: 0.72, h: 0.06 },
    { y: 0.62, r: 0.58, h: 0.055 },
    { y: 0.84, r: 0.44, h: 0.05 },
    { y: 1.04, r: 0.3, h: 0.045 },
    { y: 1.22, r: 0.18, h: 0.04 },
  ]

  return (
    <group ref={group}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[9.2, 72]} />
        <meshStandardMaterial color="#12161f" roughness={0.9} metalness={0.06} />
      </mesh>

      {[2.4, 4.1, 5.9, 7.7].map((radius) => (
        <mesh key={radius} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[radius - 0.03, radius + 0.03, 72]} />
          <meshStandardMaterial color="#1c2430" roughness={0.75} metalness={0.15} />
        </mesh>
      ))}

      <mesh position={[0, 2.15, 0]}>
        <cylinderGeometry args={[8.5, 8.5, 4.5, 64, 1, true]} />
        <meshStandardMaterial
          color="#0e131c"
          side={THREE.BackSide}
          roughness={0.94}
          metalness={0.04}
        />
      </mesh>

      <mesh position={[0, 4.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 8.6, 64]} />
        <meshStandardMaterial color="#0a0e16" roughness={1} metalness={0} />
      </mesh>

      {pillars.map((p, i) => (
        <mesh key={i} position={[p.x, 1.9, p.z]} castShadow>
          <boxGeometry args={[0.28, 3.8, 0.28]} />
          <meshStandardMaterial color="#151a24" roughness={0.88} metalness={0.08} />
        </mesh>
      ))}

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
      <pointLight
        position={[0, 3.7, 0]}
        intensity={22}
        distance={13}
        decay={2}
        color="#f0e2cc"
        castShadow
      />
      <pointLight position={[2.5, 2.2, 3.5]} intensity={3.5} distance={12} color="#d8d0c4" />
      <pointLight position={[-3, 1.8, -2]} intensity={2.2} distance={10} color="#b8c4d4" />

      <group ref={axis}>
        <mesh position={[0, 0.12, 0]} castShadow>
          <cylinderGeometry args={[0.95, 1.05, 0.22, 32]} />
          <meshStandardMaterial color="#1a1f2a" roughness={0.7} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 1.2, 12]} />
          <meshStandardMaterial color="#2a303c" roughness={0.4} metalness={0.55} />
        </mesh>
        {discs.map((d, i) => (
          <mesh key={i} position={[0, d.y, 0]} castShadow>
            <cylinderGeometry args={[d.r, d.r, d.h, 32]} />
            <meshStandardMaterial
              color="#e4ddd2"
              metalness={0.35}
              roughness={0.22}
              emissive="#cfc6b8"
              emissiveIntensity={0.12}
            />
          </mesh>
        ))}
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <circleGeometry args={[1.5, 40]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.45} />
      </mesh>

      {openings.map((o) => (
        <Opening key={o.id} zone={o} active={focusId === o.id} />
      ))}

      <ambientLight intensity={0.14} />
      <hemisphereLight color="#6a7888" groundColor="#121018" intensity={0.38} />
      <directionalLight
        position={[-5, 8, 4]}
        intensity={0.35}
        color="#c5d0dc"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </group>
  )
}

export { Hall }
