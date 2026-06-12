// components/models/Calaco.jsx
import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Model({ isTransitioning, ...props }) {
  const { nodes, materials } = useGLTF('/models/calaco.glb')
  const groupRef = useRef();

  // Forzar reseteo de posición, rotación y escala 
  useEffect(() => {
    if (!isTransitioning && groupRef.current) {
      const pos = props.position || [-1.2, -1.4, 0];
      groupRef.current.position.set(pos[0], pos[1], pos[2]);
      groupRef.current.rotation.set(0, 0, 0);
      groupRef.current.scale.set(0.4, 0.4, 0.4); // Mantiene siempre el mismo tamaño inicial sin desconfigurarse
    }
  }, [isTransitioning, props.position]);

  // Animación fluida hacia la derecha (X+) y hacia enfrente de la pantalla (Z+)
  useFrame((state, delta) => {
    if (isTransitioning && groupRef.current) {
      groupRef.current.position.x += 4 * delta; // Avanza hacia la derecha
      groupRef.current.position.z += 6 * delta; // Avanza hacia la pantalla (enfrente)
      
      // Ligera inclinación orgánica hacia adelante por la inercia del movimiento
      groupRef.current.rotation.x += 0.2 * delta;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Mantiene tus offsets internos intactos */}
      <group position={[0.290, -1.45, 0]} rotation={[0, Math.PI/0.45, 0]}>
        <group position={[-0.028, 1.363, 0.178]} rotation={[Math.PI / 2, 0, 0]}>

          <group position={[-0.286, -0.219, -0.606]}>
            <mesh geometry={nodes.Tube_1.geometry} material={materials.Cardboard} />
            <mesh geometry={nodes.Tube_10.geometry} material={materials.Cardboard} />
            <mesh geometry={nodes.Tube_11.geometry} material={materials.Cardboard} />
            <mesh geometry={nodes.Tube_12.geometry} material={materials.Cardboard} />
            <mesh geometry={nodes.Tube_13.geometry} material={materials.Cardboard} />
            <mesh geometry={nodes.Tube_14.geometry} material={materials.Cardboard} />
            <mesh geometry={nodes.Tube_15.geometry} material={materials.Cardboard} />
            <mesh geometry={nodes.Tube_16.geometry} material={materials.Cardboard} />
            <mesh geometry={nodes.Tube_17.geometry} material={materials.Cardboard} />
            <mesh geometry={nodes.Tube_3.geometry} material={materials.Cardboard} />
            <mesh geometry={nodes.Tube_4.geometry} material={materials.Cardboard} />
            <mesh geometry={nodes.Tube_5.geometry} material={materials.Cardboard} />
            <mesh geometry={nodes.Tube_6.geometry} material={materials.Cardboard} />
            <mesh geometry={nodes.Tube_7.geometry} material={materials.Cardboard} />
            <mesh geometry={nodes.Tube_8.geometry} material={materials.Cardboard} />
            <mesh geometry={nodes.Tube_9.geometry} material={materials.Cardboard} />
            <mesh geometry={nodes.Tube006.geometry} material={materials.Cardboard} position={[0.034, 0.102, 0.686]} rotation={[-0.518, 0.835, 0.234]} />
          </group>

          <mesh geometry={nodes.Cylinder.geometry} material={materials.Cardboard} position={[0.075, 1.416, 1.369]} rotation={[0, -1.571, 0]} />
          <mesh geometry={nodes.Cylinder001.geometry} material={materials.Cardboard} position={[0.075, -1.589, 1.361]} rotation={[0, -1.571, 0]} />
          <mesh geometry={nodes.Quad_Sphere006.geometry} material={materials.Cardboard} position={[0.081, -0.634, -0.995]} rotation={[2.128, -1.267, 0.466]} />
        </group>
        <mesh geometry={nodes.Tube003.geometry} material={materials.Cardboard} position={[-0.008, 5.942, -0.086]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes.Box002.geometry} material={materials.Cardboard} position={[-0.008, 3.279, -0.448]} rotation={[1.808, 0, 0]} scale={[1.029, 1.029, 1.176]} />
        <mesh geometry={nodes.Quad_Sphere.geometry} material={materials.Cardboard} position={[-0.012, 6.178, -0.119]} rotation={[1.716, 0, 0]} scale={1.362} />
        <mesh geometry={nodes.Box.geometry} material={materials.Cardboard} position={[-0.008, 4.78, -0.308]} rotation={[1.808, 0, 0]} scale={[0.947, 0.951, 0.951]} />
        <mesh geometry={nodes.Tube.geometry} material={materials.Cardboard} position={[-0.012, 6.228, -0.195]} rotation={[1.716, 0, 0]} scale={0.962} />
        <mesh geometry={nodes.pataIzquierda.geometry} material={materials.Cardboard} position={[0.807, 0.797, 0.828]} rotation={[Math.PI / 2, 0, 0]} scale={[0.263, 0.932, 0.558]} />
        <mesh geometry={nodes.Quad_Sphere005.geometry} material={materials.Cardboard} position={[-0.69, 3.561, 0.646]} rotation={[Math.PI / 2, 0, -0.102]} scale={[0.398, 0.427, 0.312]} />
        <mesh geometry={nodes.Tube001.geometry} material={materials.Cardboard} position={[-0.008, 5.942, -0.086]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes.Box001.geometry} material={materials.Cardboard} position={[-0.318, 5.174, -0.555]} rotation={[1.989, 0.206, -0.28]} />
        <mesh geometry={nodes.Cone_split.geometry} material={materials.Cardboard} position={[-0.276, 6.079, 0.235]} rotation={[-0.02, 0, 0]} />
        <mesh geometry={nodes.Quad_Sphere001.geometry} material={materials.Cardboard} position={[-0.012, 6.228, -0.195]} rotation={[1.716, 0, 0]} scale={1.366} />
        <mesh geometry={nodes.Cone.geometry} material={materials.Cardboard} position={[-0.287, 6.079, 0.235]} rotation={[-0.02, 0, 0]} />
        <mesh geometry={nodes.Tube005.geometry} material={materials.Cardboard} position={[-0.008, 5.942, -0.086]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes.Quad_Sphere004.geometry} material={materials.Cardboard} position={[1.065, 3.965, 0.985]} rotation={[Math.PI / 2, 0, 0]} scale={[0.398, 0.427, 0.312]} />
        <mesh geometry={nodes.Tube004.geometry} material={materials.Cardboard} position={[-0.008, 5.942, -0.086]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes.pataDerecho001.geometry} material={materials.Cardboard} position={[-0.495, 1.442, 0.357]} rotation={[1.853, 0, 0]} scale={[0.263, 0.932, 0.557]} />
        <mesh geometry={nodes.Tube002.geometry} material={materials.Cardboard} position={[-0.008, 5.942, -0.086]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes.Box003.geometry} material={materials.Cardboard} position={[-0.318, 5.174, -0.555]} rotation={[1.989, 0.206, -0.28]} />
        <mesh geometry={nodes.Cube.geometry} material={materials.Cardboard} position={[0.818, 0.659, 0.537]} rotation={[0.268, 0, 0]} scale={[0.173, 0.055, 0.228]} />
        <mesh geometry={nodes.Cube001.geometry} material={materials.Cardboard} position={[-0.548, 1.439, -0.019]} rotation={[0.557, 0, 0]} scale={[0.173, 0.055, 0.228]} />
        <mesh geometry={nodes.Cylinder002.geometry} material={materials.Cardboard} position={[0.147, 0.372, -1.536]} rotation={[-0.342, 0, 0]} scale={[0.029, 0.341, 0.029]} />
        <mesh geometry={nodes.Cylinder003.geometry} material={materials.Cardboard} position={[0.147, -0.145, -1.751]} rotation={[-1.957, 0, 0]} scale={[0.029, 0.341, 0.029]} />
        <mesh geometry={nodes.Cylinder004.geometry} material={materials.Cardboard} position={[0.147, 0.138, -1.023]} rotation={[-1.957, 0, 0]} scale={[0.029, 0.341, 0.029]} />
        <mesh geometry={nodes.Cylinder005.geometry} material={materials.Cardboard} position={[0.147, -0.372, -1.27]} rotation={[-0.342, 0, 0]} scale={[0.029, 0.341, 0.029]} />
        <mesh geometry={nodes.Cylinder006.geometry} material={materials.Cardboard} position={[-0.05, 0.372, -1.536]} rotation={[-0.342, 0, 0]} scale={[0.029, 0.341, 0.029]} />
        <mesh geometry={nodes.Cylinder007.geometry} material={materials.Cardboard} position={[-0.05, -0.145, -1.751]} rotation={[-1.957, 0, 0]} scale={[0.029, 0.341, 0.029]} />
        <mesh geometry={nodes.Cylinder008.geometry} material={materials.Cardboard} position={[-0.05, 0.138, -1.023]} rotation={[-1.957, 0, 0]} scale={[0.029, 0.341, 0.029]} />
        <mesh geometry={nodes.Cylinder009.geometry} material={materials.Cardboard} position={[-0.05, -0.372, -1.27]} rotation={[-0.342, 0, 0]} scale={[0.029, 0.341, 0.029]} />
        <mesh geometry={nodes.Cylinder010.geometry} material={materials.Cardboard} position={[-0.05, 0.372, 1.498]} rotation={[-0.342, 0, 0]} scale={[0.029, 0.341, 0.029]} />
        <mesh geometry={nodes.Cylinder011.geometry} material={materials.Cardboard} position={[-0.05, -0.145, 1.284]} rotation={[-1.957, 0, 0]} scale={[0.029, 0.341, 0.029]} />
        <mesh geometry={nodes.Cylinder012.geometry} material={materials.Cardboard} position={[-0.05, 0.138, 2.011]} rotation={[-1.957, 0, 0]} scale={[0.029, 0.341, 0.029]} />
        <mesh geometry={nodes.Cylinder013.geometry} material={materials.Cardboard} position={[-0.05, -0.372, 1.764]} rotation={[-0.342, 0, 0]} scale={[0.029, 0.341, 0.029]} />
        <mesh geometry={nodes.Cylinder014.geometry} material={materials.Cardboard} position={[0.187, 0.372, 1.498]} rotation={[-0.342, 0, 0]} scale={[0.029, 0.341, 0.029]} />
        <mesh geometry={nodes.Cylinder015.geometry} material={materials.Cardboard} position={[0.187, -0.145, 1.284]} rotation={[-1.957, 0, 0]} scale={[0.029, 0.341, 0.029]} />
        <mesh geometry={nodes.Cylinder016.geometry} material={materials.Cardboard} position={[0.187, 0.138, 2.011]} rotation={[-1.957, 0, 0]} scale={[0.029, 0.341, 0.029]} />
        <mesh geometry={nodes.Cylinder017.geometry} material={materials.Cardboard} position={[0.187, -0.372, 1.764]} rotation={[-0.342, 0, 0]} scale={[0.029, 0.341, 0.029]} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/calaco.glb')