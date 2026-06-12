import { CameraControls, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { degToRad } from "three/src/math/MathUtils.js";
import * as THREE from "three";
import { Model as Museo } from "./models/Museo.jsx";
import { Model as Galeria } from "./models/Galeria.jsx";

const DEBUG_CAMERA = false;

const DebugCamera = () => {
  const { camera } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key.toLowerCase() === "p" && controlsRef.current) {
        const pos = camera.position.toArray().map((n) => +n.toFixed(2));
        const target = controlsRef.current.target.toArray().map((n) => +n.toFixed(2));
        console.log("📷 position:", pos);
        console.log("🎯 target:  ", target);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [camera]);

  return <OrbitControls ref={controlsRef} makeDefault />;
};

export const Experience = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const [currentScene, setCurrentScene] = useState("museo"); 
  
  const museoGroupRef = useRef();
  const galeriaGroupRef = useRef(); // 🟦 NUEVO: Referencia para el grupo de la galería
  const cameraControlsRef = useRef();

  useEffect(() => {
    if (DEBUG_CAMERA) return;

    const animateIntro = async () => {
      if (!cameraControlsRef.current) return;
      const controls = cameraControlsRef.current;

      if (currentScene === "museo") {
        controls.setLookAt(-1.32, 15.41, 17.54, -0.57, 1.16, -0.6, false);
        controls.smoothTime = 0.8;
        await controls.setLookAt(-0.12, 2.75, 5.09, 0.09, 2.74, -0.68, true);
        controls.smoothTime = 0.6; 
        setIntroFinished(true);
      } 
      else if (currentScene === "galeria") {
        controls.setLookAt(-0.37, 2.4, 26.98, 0.07, 4.49, 0.64, false);
        controls.smoothTime = 0.8;
        await controls.setLookAt(0.77, 2.72, 14.83, 0.57, 3.97, 0.6, true);
        controls.smoothTime = 0.6;
      }
    };

    animateIntro();
  }, [currentScene]);

  const handleEdificioToggle = async (abierto) => {
    if (!cameraControlsRef.current) return;
    const controls = cameraControlsRef.current;

    if (abierto) {
      await controls.setLookAt(-1.09, 1.97, -0.09, -0.86, 1.94, -1.08, true);
    } else {
      await controls.setLookAt(-0.12, 2.75, 5.09, 0.09, 2.74, -0.68, true);
    }
  };

  const handleTransitionToGaleria = () => {
    setCurrentScene("galeria"); 
  };

  useFrame((state) => {
    // Calculamos los objetivos de rotación basados en la posición del mouse
    const targetRotY = state.pointer.x * 0.045;
    const targetRotX = -state.pointer.y * 0.01;

    // Parallax para la escena del Museo
    if (introFinished && museoGroupRef.current && currentScene === "museo") {
      museoGroupRef.current.rotation.y = THREE.MathUtils.lerp(museoGroupRef.current.rotation.y, targetRotY, 0.05);
      museoGroupRef.current.rotation.x = THREE.MathUtils.lerp(museoGroupRef.current.rotation.x, targetRotX, 0.05);
    }

    // 🟦 NUEVO: Parallax independiente para la escena de la Galería
    if (galeriaGroupRef.current && currentScene === "galeria") {
      galeriaGroupRef.current.rotation.y = THREE.MathUtils.lerp(galeriaGroupRef.current.rotation.y, targetRotY, 0.05);
      galeriaGroupRef.current.rotation.x = THREE.MathUtils.lerp(galeriaGroupRef.current.rotation.x, targetRotX, 0.05);
    }
  });

  return (
    <>
      {DEBUG_CAMERA ? (
        <>
          <DebugCamera />
          <axesHelper args={[5]} />
          <gridHelper args={[20, 20]} />
        </>
      ) : (
        <CameraControls
          ref={cameraControlsRef}
          makeDefault
          mouseButtons={{ left: 0, right: 0, wheel: 0, middle: 0 }}
          touches={{ one: 0, two: 0, three: 0 }}
          maxDistance={20}
          minDistance={1}
          minPolarAngle={0}
          maxPolarAngle={degToRad(80)}
        />
      )}

      <Environment preset="dawn" background={currentScene === "museo"} blur={3} />

      {currentScene === "galeria" && <color attach="background" args={["#1e293b"]} />}

      {currentScene === "museo" ? (
        <group ref={museoGroupRef}>
          <Museo 
            position={[0, 0, 0]} 
            scale={0.5} 
            onEdificioToggle={handleEdificioToggle} 
            onFullBlue={handleTransitionToGaleria} 
          />
        </group>
      ) : (
        /* 🟦 NUEVO: Envolvemos la galería en un grupo con su propia referencia para animar el Parallax */
        <group ref={galeriaGroupRef}>
          <Galeria 
            position={[0, 0, 0]} 
            rotation={[0, 0, 0]} 
            scale={1} 
          />
        </group>
      )}
    </>
  );
};

useGLTF.preload("/models/museo.glb");
useGLTF.preload("/models/galeria.glb");