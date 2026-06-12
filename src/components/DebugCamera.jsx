// components/DebugCamera.jsx
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export const DebugCamera = () => {
  const { camera } = useThree();
  const controls = useRef();

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "p") {
        console.log("position:", camera.position.toArray().map(n => +n.toFixed(2)));
        console.log("target:  ", controls.current.target.toArray().map(n => +n.toFixed(2)));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [camera]);

  return <OrbitControls ref={controls} makeDefault />;
};