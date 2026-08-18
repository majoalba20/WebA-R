import React, { useState, lazy, Suspense } from 'react';
// 1. Quitamos las importaciones de @react-three/fiber y @react-three/drei de aquí
import { Search, X, Box, Layers } from 'lucide-react';
import { PROJECTS } from '../../data/models3D.js';

// 2. Cargamos Viewer3D dinámicamente con lazy()
const Viewer3D = lazy(() => import('./Viewer3D.jsx'));

export default function Portfolio3D() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="portfolio-3d"
      className="relative bg-white pt-10 md:pt-14 pb-10 md:pb-14 font-montserrat overflow-hidden select-none"
    >
      {/* Elemento Decorativo Tipográfico de Fondo */}
      <div className="absolute top-1/3 -right-10 text-[20vw] font-extralight text-neutral-100/70 leading-none pointer-events-none select-none z-0">
        MODELADO
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Encabezado Elegante */}
        <div className="mb-14 md:mb-16 border-b border-neutral-100 pb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-customBlue"></span>
            <span className="uppercase tracking-[6px] text-xs font-semibold text-customBlue">
              Visualización Espacial
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-customBlack font-light tracking-tight">
              Modelos & Conceptos 3D
            </h2>
            <p className="text-customDarkerGray text-sm md:text-base font-light max-w-md leading-relaxed">
              Explora la geometría, materialidad y volumetría de nuestras obras a través de visores interactivos.
            </p>
          </div>
        </div>

        {/* Grid de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-neutral-50 rounded-sm overflow-hidden border border-neutral-100 hover:border-customBlue/40 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              {/* Contenedor de Imagen */}
              <div className="relative h-72 w-full bg-neutral-900 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.02]"
                />                    
                {/* Overlay en Hover */}
                <div className="absolute inset-0 bg-customBlack/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="flex items-center gap-2 bg-white text-customBlack px-5 py-2.5 rounded-full font-medium text-xs uppercase tracking-wider shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Search className="w-3.5 h-3.5 text-customBlue" />
                    <span>Inspeccionar 3D</span>
                  </div>
                </div>
                {/* Badge 3D */}
                <div className="absolute top-4 right-4 bg-customBlack/80 backdrop-blur-md text-white border border-white/10 px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                  <Box className="w-3.5 h-3.5 text-customBlue" />
                  <span>3D INTERACTIVO</span>
                </div>
              </div>
              {/* Info del Proyecto */}
              <div className="p-6 bg-white border-t border-neutral-100">
                <span className="text-xs font-semibold tracking-[2px] text-customBlue uppercase block mb-1">
                  {project.category}
                </span>
                <h3 className="text-xl font-light text-customBlack group-hover:text-customBlue transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-customDarkerGray font-light mt-1">
                  {project.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer de Sección */}
        <div className="mt-12 pt-8 border-t border-neutral-100 flex items-center justify-between text-xs text-customDarkerGray font-light">
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-customBlue" />
            Modelado tridimensional en tiempo real
          </span>
          <span className="hidden sm:inline uppercase tracking-[2px] text-customBlue font-medium">
            A+R Arquitectos Estudio
          </span>
        </div>
      </div>

      {/* Modal Visor 3D Interactivo */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-customBlack/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fadeIn">
          <div className="relative w-full max-w-5xl h-[85vh] bg-customBlack rounded-sm border border-neutral-800 flex flex-col overflow-hidden shadow-2xl"> 
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-customBlack">
              <div>
                <span className="text-[10px] uppercase tracking-[2px] text-customBlue font-semibold block">
                  {selectedProject.category}
                </span>
                <h3 className="text-lg font-light text-white">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-colors border border-neutral-800"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Carga dinámica del canvas 3D solo cuando el modal está abierto */}
            <Suspense fallback={
              <div className="flex-1 flex items-center justify-center text-white text-sm font-light">
                Cargando entorno 3D...
              </div>
            }>
              <Viewer3D glbUrl={selectedProject.glbUrl} />
            </Suspense>

          </div>
        </div>
      )}
    </section>
  );
}