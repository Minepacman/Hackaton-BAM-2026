// App.jsx
import { Canvas, useThree } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import { Experience } from "./components/Experience";
import { Model as Calaco } from "./components/models/Calaco";
import { IntroUI } from "./components/IntroUI";

function IntroCamera() {
  const { camera, scene } = useThree();

  useEffect(() => {
    // Forzar reseteo de cámara
    camera.position.set(0, 1.5, 6);
    camera.lookAt(0, 0, 0);
    camera.scale.set(1, 1, 1);
    camera.updateProjectionMatrix();

    // VITAL: Limpiar el fondo y entorno 3D para que el HTML vuelva a ser visible
    scene.background = null;
    scene.environment = null;
  }, [camera, scene]);

  return null;
}

function App() {
  const [scene, setScene] = useState("intro"); // "intro", "transition", "museo"

  const handleStart = () => {
    setScene("transition");

    // El Calaco avanza 6 en Z por segundo y la cámara está a 6 de distancia.
    // 1.2 segundos es el tiempo exacto en el que cruza la cámara y sale de pantalla.
    setTimeout(() => {
      setScene("museo");
    }, 1200);
  };

  const handleBack = () => {
    setScene("intro");
  };

  return (
    <>
      <Loader />
      <div id="escenario">

        {/* Renderizamos el HTML del menú durante el inicio y la transición */}
        {(scene === "intro" || scene === "transition") && (
          <IntroUI isTransitioning={scene === "transition"} onStart={handleStart} />
        )}

        <Canvas
          shadows
          className="canvas-container"
          style={{ pointerEvents: scene === "museo" ? "auto" : "none" }}
          camera={{
            position: [0, 1.5, 6],
            fov: 30
          }}
        >
          {(scene === "intro" || scene === "transition") && <IntroCamera />}

          {scene === "museo" && (
            <color attach="background" args={["#111"]} />
          )}

          <Suspense fallback={null}>
            {/* ESCENA 1: Calaco */}
            {(scene === "intro" || scene === "transition") && (
              <group>
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 10, 5]} intensity={2} />
                <Calaco
                  isTransitioning={scene === "transition"}
                  position={[-1.2, -1.5, 0]}
                />
              </group>
            )}

            {/* ESCENA 2: Museo (Carga instantánea al ocultarse el calaco) */}
            {scene === "museo" && (
              <Experience />
            )}
          </Suspense>
        </Canvas>
      </div>

      {scene === "museo" && (
        <button
          onClick={handleBack}
          style={{ position: "fixed", top: "20px", left: "20px", zIndex: 1000 }}
        >
          Volver al Inicio
        </button>
      )}
    </>
  );
}

export default App;