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
  // Detectar si el usuario está en un dispositivo móvil/tablet
    const isMobile = typeof window !== 'undefined' && /Android|iPhone|iPad/i.test(navigator.userAgent);
    // Si la propiedad modelUrl no ha cargado aún o viene vacía
    if (!modelUrl) {
        return (
        <div className="w-full h-[500px] bg-customGray rounded-2xl flex items-center justify-center">
            <span className="text-customDarkGray font-montserrat text-sm">
            Selecciona un proyecto para ver el modelo 3D
            </span>
        </div>
        );
    }
    return (
        <div className="w-full h-[500px] bg-customGray rounded-2xl overflow-hidden relative shadow-inner">
        <Canvas
            camera={{ position: [5, 5, 5], fov: 45 }}
            // 1. Limita la resolución máxima en móviles/tablets a 1.5x (evita renderizar en 2K/3K)
            dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)]}
            // 2. Reduce la carga del renderizador WebGL
            performance={{ min: 0.5 }}
            gl={{ 
            preserveDrawingBuffer: true, 
            antialias: !isMobile, // Desactiva antialias en móviles para ganar bastante fluidez
            powerPreference: "high-performance"
            }}
        >
            <ambientLight intensity={0.9} />
            {/* 3. Las sombras proyectadas solo se activan en computadores */}
            <directionalLight 
            position={[10, 15, 10]} 
            intensity={1.2} 
            castShadow={!isMobile} 
            />
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