import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Center, ContactShadows } from '@react-three/drei';
import { RotateCw } from 'lucide-react';

function Model({ url }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
}

export default function Viewer3D({ glbUrl }) {
    return (
        <div className="relative flex-1 bg-customBlack h-full w-full">
        <Canvas shadows camera={{ position: [5, 5, 5], fov: 45 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 12, 8]} intensity={1.8} castShadow />
            <Suspense fallback={null}>
            <Stage environment="city" intensity={0.5} adjustCamera={1.2}>
                <Center>
                <Model url={glbUrl} />
                </Center>
            </Stage>
            <ContactShadows position={[0, -0.01, 0]} opacity={0.6} scale={10} blur={2} far={4} />
            </Suspense>
            <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            autoRotate={true}
            autoRotateSpeed={0.8}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2 + 0.1}
            />
        </Canvas>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-neutral-900/90 backdrop-blur-md border border-neutral-700/60 text-neutral-200 px-5 py-2.5 rounded-full text-xs flex items-center gap-2.5 shadow-2xl pointer-events-none">
            <RotateCw className="w-3.5 h-3.5 animate-spin text-customBlue" />
            <span className="font-light tracking-wide">Arrastra para girar | Scroll para zoom</span>
        </div>
        </div>
    );
}