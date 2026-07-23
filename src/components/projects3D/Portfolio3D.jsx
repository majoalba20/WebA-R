import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Center, ContactShadows } from '@react-three/drei';
import { Search, X, RotateCw, Box } from 'lucide-react';
import { PROJECTS } from './projects'; // Importación desde tu archivo de proyectos

// Componente para cargar el modelo GLB
function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}
// Carga previa opcional de modelos
useGLTF.preload = (url) => useGLTF.preload(url);

export default function Portfolio3D() {
  const [selectedProject, setSelectedProject] = useState(null);
  return (
    <section className="min-h-screen bg-neutral-950 text-neutral-100 py-20 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Encabezado */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-3 block">
          Visualizacion Espacial
        </span>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
          Modelos & Conceptos 3D
        </h2>
        <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
          Explora la geometria, materialidad y volumetria de nuestras obras a traves de visores interactivos.
        </p>
      </div>
      {/* Grid de Proyectos */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group relative bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800/80 hover:border-neutral-600 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1"
          >
            {/* Contenedor de Imagen e Indicadores */}
            <div className="relative h-64 w-full bg-neutral-900 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />              
              {/* Overlay oscuro en hover */}
              <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                {/* Indicador con Lupa estilo Portafolio Premium */}
                <div className="flex items-center gap-2 bg-white text-neutral-900 px-5 py-2.5 rounded-full font-medium text-sm shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <Search className="w-4 h-4 text-neutral-700" />
                  <span>Inspeccionar 3D</span>
                </div>
              </div>

              {/* Tag Superior Discreto para Indicar 3D Disponible */}
              <div className="absolute top-4 right-4 bg-neutral-950/70 backdrop-blur-md text-neutral-300 border border-neutral-700/50 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-md">
                <Box className="w-3.5 h-3.5 text-neutral-400" />
                <span>3D</span>
              </div>
            </div>
            {/* Informacion del Proyecto */}
            <div className="p-6">
              <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                {project.category}
              </span>
              <h3 className="text-xl font-normal text-white mt-1 mb-1 group-hover:text-neutral-200 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-neutral-400">
                {project.location}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Modal Visor 3D Interactivo */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fadeIn">
          <div className="relative w-full max-w-5xl h-[85vh] bg-neutral-900 rounded-2xl border border-neutral-800 flex flex-col overflow-hidden shadow-2xl">
            {/* Cabecera del Modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur">
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                  {selectedProject.category}
                </span>
                <h3 className="text-lg font-medium text-white">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 text-neutral-400 hover:text-white bg-neutral-800/50 hover:bg-neutral-800 rounded-full transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Canvas de Three.js */}
            <div className="relative flex-1 bg-gradient-to-b from-neutral-950 to-neutral-900">
              <Canvas shadows camera={{ position: [5, 5, 5], fov: 45 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
                <Suspense fallback={null}>
                  <Stage environment="city" intensity={0.5} adjustCamera={1.2}>
                    <Center>
                      <Model url={selectedProject.glbUrl} />
                    </Center>
                  </Stage>
                  <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={10} blur={2} far={4} />
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
              {/* Guia de Control para el Usuario */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-neutral-900/80 backdrop-blur-md border border-neutral-700/50 text-neutral-300 px-4 py-2 rounded-full text-xs flex items-center gap-2 shadow-lg pointer-events-none">
                <RotateCw className="w-3.5 h-3.5 animate-spin-slow text-neutral-400" />
                <span>Arrastra para girar | Scroll para zoom</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}