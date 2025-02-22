import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

const WaveShaderMaterial = shaderMaterial(
  { time: 0 },
  // vertex shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // fragment shader
  `
  uniform float time;
  varying vec2 vUv;
  void main() {
    float strength = 0.1;
    vec2 uv = vUv;
    float wave = sin(uv.x * 10.0 + time * 2.0) * strength;
    gl_FragColor = vec4(vec3(wave), 1.0);
  }
  `
);

const Card = ({ position, url }) => {
  const [texture] = useTexture([url]);
  const ref = React.useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.material.uniforms.time.value = t;
  });

  return (
    <mesh ref={ref} position={position} rotation={[0, Math.PI, 0]}>
      <planeGeometry args={[1, 1.5]} />
      <meshBasicMaterial map={texture} />
      <waveShaderMaterial attach="material" />
    </mesh>
  );
};

const CardGame = ({ isPaused }) => {
  const cardPositions = [
    [-2.5, 0, 0],
    [-1.5, 0, -1],
    [-0.5, 0, -2],
    [0.5, 0, -3],
    [1.5, 0, -4],
    [2.5, 0, -5],
  ];

  return (
    <group>
      {cardPositions.map((pos, index) => (
        <Card key={index} position={pos} url="/card.png" />
      ))}
    </group>
  );
};

export default CardGame;
