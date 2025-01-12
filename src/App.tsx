import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Model = ({ url }: { url: string }) => {
  const { scene, animations } = useGLTF(url); // Loads the .glb file
  const [mixer] = React.useState(() => new THREE.AnimationMixer(scene));

  // Adjust character rotation to face the camera
  React.useEffect(() => {
    scene.rotation.set(0, 0, 0); // Ensure the character faces the camera (default orientation)
  }, [scene]);

  // Set up animation
  React.useEffect(() => {
    if (animations.length) {
      animations.forEach((clip) => mixer.clipAction(clip).play());
    }

    return () => {
      // Clean up the mixer on unmount
      animations.forEach((clip) => mixer.clipAction(clip).stop());
    };
  }, [animations, mixer]);

  // Update the animation on every frame
  React.useEffect(() => {
    const animate = () => mixer.update(0.01);
    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, [mixer]);

  return <primitive object={scene} />;
};

const App = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const controlsRef = useRef<any>(null);
  const targetPosition = useRef(new THREE.Vector3(0, 2, 5)); // Final camera position in front of the character

  const zoomToCharacter = () => {
    if (cameraRef.current) {
      const startPosition = new THREE.Vector3(0, 10, 20); // Start far away
      const endPosition = targetPosition.current; // End position closer to the character
      const duration = 2000; // Duration of the zoom-in (ms)
      const startTime = performance.now();

      // Animate the camera position
      const animateCamera = (time: number) => {
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1); // Normalize elapsed time (0 to 1)

        // Interpolate between start and end positions
        cameraRef.current?.position.lerpVectors(startPosition, endPosition, t);
        cameraRef.current?.lookAt(0, 1, 0); // Keep the camera focused on the character

        if (t < 1) {
          requestAnimationFrame(animateCamera);
        }
      };

      requestAnimationFrame(animateCamera);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        style={{ background: '#3c4043' }} // Set background to white
        camera={{ position: [0, 3, 20], fov: 15 }} // Start far away
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} castShadow />
        <directionalLight position={[-5, 5, 5]} intensity={1} castShadow />

        {/* Model */}
        <Model url="/models/animation_movement.glb" />

        {/* OrbitControls with zoom and rotation disabled */}
        <OrbitControls
          ref={controlsRef}
          enableZoom={false} // Disable zoom
          enableRotate={false} // Disable rotation (mouse direction movement)
          maxPolarAngle={Math.PI / 2} // Prevent flipping below ground
        />
      </Canvas>

      {/* Button to trigger zoom-in */}
      <button
        onClick={zoomToCharacter}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        Zoom In
      </button>
    </div>
  );
};

export default App;
