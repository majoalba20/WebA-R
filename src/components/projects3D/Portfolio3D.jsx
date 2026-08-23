import React, { useState, lazy, Suspense, useRef, useEffect } from 'react';
import { Box, Layers, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '../../data/models3D.js';

// Cargamos el Viewer3D liviano solo bajo demanda
const Viewer3D = lazy(() => import('./Viewer3D.jsx'));

export default function Portfolio3D() {
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Observa cuándo la sección entra al viewport antes de montar el motor 3D
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Desconecta el observer una vez activado
        }
      },
      { rootMargin: '200px' } // Comienza la carga 200px antes de llegar a la vista
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="portfolio-3d" 
      className="relative bg-white pt-12 pb-16 font-montserrat select-none"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        
        {/* Encabezado */}
        <div className="mb-10 border-b border-neutral-100 pb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-[2px] bg-customBlue"></span>
            <span className="uppercase tracking-[5px] text-xs font-semibold text-customBlue">
              Visualización Tridimensional
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-customBlack font-light tracking-tight">
              Explorador 3D de Proyectos
            </h2>
            <p className="text-customDarkerGray text-sm font-light max-w-md leading-relaxed">
              Selecciona cualquiera de nuestros modelos arquitectónicos para inspeccionar su volumen y espacio en tiempo real.
            </p>
          </div>
        </div>
        {/* Layout Principal: Visor + Info del Proyecto Seleccionado */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
          
          {/* Contenedor del Modelo 3D (8 columnas) */}
          <div className="lg:col-span-8 w-full">
            {isVisible ? (
              <Suspense 
                fallback={
                  <div className="w-full h-[480px] bg-neutral-900 rounded-lg flex items-center justify-center text-neutral-400 text-sm font-light animate-pulse">
                    Cargando entorno 3D...
                  </div>
                }
              >
                <Viewer3D modelUrl={activeProject.glbUrl} />
              </Suspense>
            ) : (
              <div className="w-full h-[480px] bg-neutral-900 rounded-lg flex items-center justify-center text-neutral-400 text-sm font-light">
                Preparando visor 3D...
              </div>
            )}
          </div>
          {/* Panel Lateral con Detalle del Proyecto (4 columnas) */}
          <div className="lg:col-span-4 bg-neutral-50 p-6 md:p-8 rounded-lg border border-neutral-100 flex flex-col justify-between h-full min-h-[480px]">
            <div>
              <div className="flex items-center gap-2 text-customBlue text-xs font-semibold uppercase tracking-wider mb-2">
                <Box className="w-4 h-4" />
                <span>Modelo Activo</span>
              </div>
              <h3 className="text-2xl font-light text-customBlack mb-2">
                {activeProject.title}
              </h3>
              <p className="text-xs text-customDarkerGray font-light mb-6">
                Ubicación: <strong className="font-normal text-neutral-700">{activeProject.location}</strong>
              </p>
              
              <div className="space-y-3 pt-4 border-t border-neutral-200/60 text-xs text-neutral-600 font-light">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-customBlue" />
                  <span>Categoría: {activeProject.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-customBlue" />
                  <span>Geometría y acabados optimizados</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-200/60">
              <span className="text-[11px] text-neutral-400 block mb-2">
                ¿Quieres explorar otro diseño?
              </span>
              <p className="text-xs text-neutral-500 font-light">
                Haz clic en cualquier proyecto del catálogo inferior para cambiar la vista 3D.
              </p>
            </div>
          </div>
        </div>
        {/* Catálogo de Selección (Grid de Tarjetas 2D) */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[3px] text-customBlack mb-6">
            Catálogo de Obras
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {PROJECTS.map((project) => {
              const isActive = activeProject.id === project.id;
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className={`group text-left relative rounded-md overflow-hidden border transition-all duration-300 ${
                    isActive 
                      ? 'border-customBlue ring-2 ring-customBlue/20 bg-white shadow-md' 
                      : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50'
                  }`}
                >
                  <div className="relative h-28 w-full overflow-hidden bg-neutral-200">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      width="300"
                      height="200"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-customBlue/20 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="bg-customBlue text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Viendo
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-2.5">
                    <h5 className="text-xs font-normal text-customBlack truncate">
                      {project.title}
                    </h5>
                    <span className="text-[10px] text-neutral-400 block truncate">
                      {project.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400 font-light">
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-customBlue" />
            Visor optimizado interactivo
          </span>
          <span className="uppercase tracking-[2px] text-customBlue font-medium">
            A+R Arquitectos Estudio
          </span>
        </div>
      </div>
    </section>
  );
}