import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

interface AvatarHeadProps {
  mouthOpen?: number
}

const clamp = (value: number) => Math.max(0, Math.min(1, value))

export default function AvatarHead({ mouthOpen = 0 }: AvatarHeadProps) {
  const mouthRef = useRef<Mesh>(null)
  const [reducedMotion] = useState(
    () =>
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useFrame(() => {
    if (!mouthRef.current || reducedMotion) return
    const open = clamp(mouthOpen)
    mouthRef.current.scale.y = 0.15 + open * 0.85
  })

  return (
    <group>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />

      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color="darkslategray" roughness={0.45} />
      </mesh>

      <mesh position={[-0.35, 0.25, 0.85]}>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial
          color="cyan"
          emissive="cyan"
          emissiveIntensity={1.4}
        />
      </mesh>

      <mesh position={[0.35, 0.25, 0.85]}>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial
          color="cyan"
          emissive="cyan"
          emissiveIntensity={1.4}
        />
      </mesh>

      <mesh ref={mouthRef} position={[0, -0.45, 0.9]} scale={[1, 0.15, 1]}>
        <boxGeometry args={[0.5, 0.14, 0.05]} />
        <meshStandardMaterial
          color="magenta"
          emissive="magenta"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  )
}
