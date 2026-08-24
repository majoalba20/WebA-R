import React, { useState, useEffect } from 'react';
import { RENOVATIONS_DATA } from '../../data/renovations.js';

// Helper para detectar si un recurso es video
const isVideo = (url) => {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov)$/i.test(url);
};

// --- MODAL PREMIUM CON SOPORTE PARA IMÁGENES Y VIDEOS ---
function Modal({ project, onClose }) {
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const projectImages = project?.images && project.images.length > 0 
    ? project.images 
    : (project?.image ? [project.image] : []);

  // Pre-cargar solo si el elemento vecino es una imagen
  useEffect(() => {
    if (!projectImages.length) return;

    const nextIdx = (index + 1) % projectImages.length;
    const nextSrc = projectImages[nextIdx];
    if (!isVideo(nextSrc)) {
      const nextImg = new Image();
      nextImg.src = nextSrc;
    }

    const prevIdx = (index - 1 + projectImages.length) % projectImages.length;
    const prevSrc = projectImages[prevIdx];
    if (!isVideo(prevSrc)) {
      const prevImg = new Image();
      prevImg.src = prevSrc;
    }
  }, [index, projectImages]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePreviousImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, projectImages]);

  if (!project) return null;

  const currentMedia = projectImages[index];
  const currentIsVideo = isVideo(currentMedia);

  const handleNextImage = () => {
    setIsLoaded(false);
    setIndex((prevIndex) => (prevIndex + 1) % projectImages.length);
  };

  const handlePreviousImage = () => {
    setIsLoaded(false);
    setIndex((prevIndex) => (prevIndex - 1 + projectImages.length) % projectImages.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fadeIn font-montserrat select-none">
      <div className="relative w-full max-w-5xl bg-white rounded-sm border border-neutral-800/20 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"> 
        
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-white z-20 shrink-0">
          <div>
            <span className="text-[10px] uppercase tracking-[3px] text-customBlue font-semibold block">
              Galería de Proyecto
            </span>
            <h3 className="text-lg font-light text-customBlack tracking-tight">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 text-customDarkerGray hover:text-customBlack bg-neutral-100 hover:bg-neutral-200 rounded-full transition-all duration-300 flex items-center justify-center"
            aria-label="Cerrar modal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Visor de Galería */}
        <div className="relative flex-1 bg-neutral-950 flex items-center justify-center p-4 md:p-8 min-h-[350px] overflow-hidden">     
          {/* Fondo Atmosférico (Si es video no renderizamos background-image) */}
          {!currentIsVideo && (
            <div 
              className="absolute inset-0 bg-cover bg-center blur-3xl opacity-30 scale-125 transition-all duration-500 ease-out pointer-events-none"
              style={{ backgroundImage: `url(${currentMedia})` }}
            />
          )}               
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-transparent to-neutral-950/80 pointer-events-none" />                    
          {/* Contenedor Multimedia Central */}
          <div className="relative z-10 w-full h-full flex items-center justify-center max-h-[60vh]">
            {currentIsVideo ? (
              <video
                key={currentMedia}
                src={currentMedia}
                controls
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={() => setIsLoaded(true)}
                className={`max-w-full max-h-[60vh] w-auto h-auto object-contain block mx-auto rounded-sm shadow-2xl transition-all duration-500 ${
                  isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              />
            ) : (
              <img
                key={currentMedia}
                src={currentMedia}
                alt={`${project.title} - ${index + 1}`}
                loading='lazy'
                onLoad={() => setIsLoaded(true)}
                className={`max-w-full max-h-[60vh] w-auto h-auto object-contain block mx-auto select-none rounded-sm shadow-2xl transition-all duration-500 ${
                  isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              />
            )}
          </div>
          {/* Flechas de Navegación */}
          {projectImages.length > 1 && (
            <>
              <button
                onClick={handlePreviousImage}
                className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-900/60 hover:bg-white text-white hover:text-customBlack border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-2xl z-20"
                aria-label="Anterior"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-900/60 hover:bg-white text-white hover:text-customBlack border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-2xl z-20"
                aria-label="Siguiente"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          {/* Tag de Posición */}
          {projectImages.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-neutral-900/80 backdrop-blur-md text-white border border-white/10 px-3.5 py-1 rounded-full text-[11px] font-light tracking-widest z-20">
              {index + 1} / {projectImages.length}
            </div>
          )}
        </div>
        {/* Info & Detalles Inferiores */}
        <div className="p-5 md:p-6 bg-white border-t border-neutral-100 overflow-y-auto shrink-0 z-20">
          {projectImages.length > 1 && (
            <div className="flex items-center gap-2 mb-3">
              {projectImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsLoaded(false);
                    setIndex(i);
                  }}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    i === index ? 'w-8 bg-customBlue' : 'w-2 bg-neutral-200 hover:bg-neutral-300'
                  }`}
                  aria-label={`Ver elemento ${i + 1}`}
                />
              ))}
            </div>
          )}
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[2px] text-customBlue block mb-1">
              Descripción del Espacio
            </span>
            <p className="text-customDarkerGray font-light text-sm md:text-base leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL RENOVATIONS ---
export default function Renovations() {
  const [selectedProject, setSelectedProject] = useState(null);
  return (
    <section
      id="renovations"
      className="relative bg-white pt-10 md:pt-14 pb-10 md:pb-14 font-montserrat overflow-hidden select-none scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="absolute top-1/4 -left-12 text-[18vw] font-extralight text-neutral-100/80 leading-none pointer-events-none select-none z-0">
        REFORMAS
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">     
        <div className="mb-14 md:mb-16 border-b border-neutral-100 pb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-customBlue"></span>
            <span className="uppercase tracking-[6px] text-xs font-semibold text-customBlue">
              Intervenciones Arquitectónicas
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-customBlack font-light tracking-tight">
              Remodelaciones
            </h2>
            <p className="text-customDarkerGray text-sm md:text-base font-light max-w-md leading-relaxed">
              Proyectos que transforman estructuras existentes en experiencias contemporáneas y funcionales.
            </p>
          </div>
        </div>
        {/* Bento Grid Pro */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[280px] md:auto-rows-[320px]">
          {RENOVATIONS_DATA.map((project, index) => {
            const isLarge = index === 0;
            const projectIsVideo = isVideo(project.image);
            return (
              <div
                key={project.id || index}
                onClick={() => setSelectedProject(project)}
                className={`group relative cursor-pointer overflow-hidden rounded-sm border border-neutral-100 bg-neutral-900 transition-all duration-700 hover:shadow-2xl ${
                  isLarge ? 'md:col-span-2 md:row-span-2' : 'col-span-1 row-span-1'
                }`}
              >
                {/* Visualización en la Tarjeta (Video o Imagen) */}
                {projectIsVideo ? (
                  <video
                    src={project.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center filter contrast-[1.03] grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out opacity-90 group-hover:opacity-100 pointer-events-none"
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading='lazy'
                    className="w-full h-full object-cover object-center filter contrast-[1.03] grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out opacity-90 group-hover:opacity-100"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-customBlack/90 via-customBlack/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />                
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">                   
                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] uppercase tracking-[3px] text-white/90 bg-customBlack/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      {projectIsVideo ? 'Ver Video' : 'Explorar Galería'}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white text-customBlack flex items-center justify-center transform translate-x-2 group-hover:translate-x-0 transition-transform duration-300 shadow-md">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[2px] text-customBlue block mb-1">
                      {project.category || 'Remodelación'}
                    </span>
                    <h3 className={`font-light text-white tracking-tight ${isLarge ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-300 font-light mt-2 line-clamp-2 leading-relaxed opacity-90">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {selectedProject && (
        <Modal 
          key={selectedProject.id || selectedProject.title} 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}