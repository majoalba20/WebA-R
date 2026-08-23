import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Bounds, Center, Html } from '@react-three/drei';

// Componente para cargar el modelo con validación de URL
function Model({ url }) {
    if (!url) return null;
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
}

function Loader() {
    return (
        <Html center>
        <div className="flex flex-col items-center justify-center bg-customBlack/80 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
            <div className="w-6 h-6 border-2 border-customBlue border-t-transparent rounded-full animate-spin mb-2"></div>
            <span className="text-xs font-montserrat">Cargando modelo 3D...</span>
        </div>
        </Html>
    );
}

export default function Viewer3D({ modelUrl }) {
    // Si la propiedad modelUrl no ha cargado aún o viene vacía, mostramos un estado de espera
    if (!modelUrl) {
        return (
        <div className="w-full h-[500px] bg-customGray rounded-2xl flex items-center justify-center">
            <span className="text-customDarkGray font-montserrat text-sm">Selecciona un proyecto para ver el modelo 3D</span>
        </div>
        );
    }
    return (
        <div className="w-full h-[500px] bg-customGray rounded-2xl overflow-hidden relative shadow-inner">
        <Canvas
            camera={{ position: [5, 5, 5], fov: 45 }}
            gl={{ preserveDrawingBuffer: true, antialias: true }}
        >
            <ambientLight intensity={0.9} />
            <directionalLight position={[10, 15, 10]} intensity={1.2} castShadow />
            <directionalLight position={[-10, -10, -10]} intensity={0.4} />
            <Suspense fallback={<Loader />}>
            <Bounds fit clip observe margin={1.2}>
                <Center>
                <Model url={modelUrl} />
                </Center>
            </Bounds>
            </Suspense>
            <OrbitControls
            makeDefault
            enableDamping
            dampingFactor={0.05}
            maxPolarAngle={Math.PI / 2 + 0.1}
            minDistance={1}
            maxDistance={50}
            />
        </Canvas>
        </div>
    );
}