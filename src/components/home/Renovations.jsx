import React, { useState } from 'react';
// Importamos la constante con las imágenes importadas desde src/assets/renovations/
import { RENOVATIONS_DATA } from '../../data/renovations.js';

// --- MODAL PREMIUM CON FLUIDEZ DE IMAGEN Y FONDO ATMOSFÉRICO ---
function Modal({ project, onClose }) {
  const [index, setIndex] = useState(0);

  if (!project) return null;

  // Garantizar array de imágenes estables
  const projectImages = project.images && project.images.length > 0 
    ? project.images 
    : [project.image];

  const currentImage = projectImages[index];

  const handleNextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % projectImages.length);
  };

  const handlePreviousImage = () => {
    setIndex((prevIndex) => (prevIndex - 1 + projectImages.length) % projectImages.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fadeIn font-montserrat select-none">
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
        {/* Visor de Galería: Fondo Difuminado Premium */}
        <div className="relative flex-1 bg-neutral-950 flex items-center justify-center p-4 md:p-8 min-h-[320px] overflow-hidden">          
          {/* Fondo Atmosférico (Replica la imagen con desenfoque suave) */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-3xl opacity-35 scale-125 transition-all duration-700 ease-in-out pointer-events-none"
            style={{ backgroundImage: `url(${currentImage})` }}
          />        
          {/* Capa de contraste sofisticado */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-transparent to-neutral-950/80 pointer-events-none" />          
          
          {/* Contenedor de Imagen Central */}
          <div className="relative z-10 w-full h-full flex items-center justify-center max-h-[60vh]">
            <img
              src={currentImage}
              alt={`${project.title} - ${index + 1}`}
              className="max-w-full max-h-[60vh] w-auto h-auto object-contain block mx-auto select-none rounded-sm shadow-2xl transition-opacity duration-300"
            />
          </div>
          {/* Flechas de Navegación Flotantes */}
          {projectImages.length > 1 && (
            <>
              <button
                onClick={handlePreviousImage}
                className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-900/60 hover:bg-white text-white hover:text-customBlack border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-2xl z-20"
                aria-label="Imagen anterior"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-900/60 hover:bg-white text-white hover:text-customBlack border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-2xl z-20"
                aria-label="Siguiente imagen"
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
          {/* Indicadores de Galería */}
          {projectImages.length > 1 && (
            <div className="flex items-center gap-2 mb-3">
              {projectImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    i === index ? 'w-8 bg-customBlue' : 'w-2 bg-neutral-200 hover:bg-neutral-300'
                  }`}
                  aria-label={`Ver imagen ${i + 1}`}
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
      className="relative bg-white pt-10 md:pt-14 pb-10 md:pb-14 font-montserrat overflow-hidden select-none"
    >
      {/* Tipografía Decorativa de Fondo */}
      <div className="absolute top-1/4 -left-12 text-[18vw] font-extralight text-neutral-100/80 leading-none pointer-events-none select-none z-0">
        REFORMAS
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">      
        {/* Encabezado Editorial */}
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
            return (
              <div
                key={project.id || index}
                onClick={() => setSelectedProject(project)}
                className={`group relative cursor-pointer overflow-hidden rounded-sm border border-neutral-100 bg-neutral-900 transition-all duration-700 hover:shadow-2xl ${
                  isLarge ? 'md:col-span-2 md:row-span-2' : 'col-span-1 row-span-1'
                }`}
              >
                {/* Imagen del Proyecto en Grid */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center filter contrast-[1.03] grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out opacity-90 group-hover:opacity-100"
                />
                {/* Overlays Progresivos */}
                <div className="absolute inset-0 bg-gradient-to-t from-customBlack/90 via-customBlack/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
                {/* Info Flotante */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">                  
                  {/* Badge Superior */}
                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] uppercase tracking-[3px] text-white/90 bg-customBlack/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      Explorar Galería
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white text-customBlack flex items-center justify-center transform translate-x-2 group-hover:translate-x-0 transition-transform duration-300 shadow-md">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                  {/* Textos */}
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
      {/* Modal Integrado */}
      <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}