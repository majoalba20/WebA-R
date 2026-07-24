import React, { useState, useRef, useEffect } from 'react';
import { SHOWCASES } from "../../data/showCases.js";

export default function BeforeAfter() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const activeProject = SHOWCASES && SHOWCASES.length > 0 
    ? SHOWCASES[selectedProjectIndex] 
    : null;

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let newPosition = (x / rect.width) * 100;

    if (newPosition < 0) newPosition = 0;
    if (newPosition > 100) newPosition = 100;

    setPosition(newPosition);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleStopDrag = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleStopDrag);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleStopDrag);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleStopDrag);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleStopDrag);
    };
  }, [isDragging]);

  if (!activeProject) return null;

  return (
    <section 
      id="beforeAndAfter" 
      className="relative bg-white py-16 md:py-24 font-montserrat select-none overflow-hidden"
    >
      {/* Texto Tipográfico de Fondo */}
      <div className="absolute top-10 right-[-5vw] text-[16vw] font-extralight text-neutral-100/70 leading-none pointer-events-none z-0">
        TRANSFORMACIÓN
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Encabezado Editorial */}
        <div className="mb-10 md:mb-14 border-b border-neutral-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-customBlue"></span>
              <span className="uppercase tracking-[5px] text-xs font-semibold text-customBlue">
                {activeProject.subtitle}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-customBlack font-light tracking-tight">
              Antes & Después
            </h2>
          </div>
          <p className="text-customDarkerGray text-sm md:text-base font-light max-w-md leading-relaxed">
            {activeProject.description}
          </p>
        </div>
        {/* Selector de Proyectos */}
        {SHOWCASES.length > 1 && (
          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
            {SHOWCASES.map((item, idx) => (
              <button
                key={item.id || idx}
                onClick={() => {
                  setSelectedProjectIndex(idx);
                  setPosition(50);
                }}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 border ${
                  idx === selectedProjectIndex
                    ? 'bg-customBlack text-white border-customBlack shadow-md'
                    : 'bg-white text-customDarkerGray border-neutral-200 hover:border-neutral-400'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
        {/* MARCO DEL COMPARADOR CON SOPORTE DE PROPORCIONES DIVERSAS */}
        <div 
          ref={containerRef}
          className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] rounded-sm overflow-hidden border border-neutral-200/80 shadow-2xl bg-neutral-950 flex items-center justify-center group"
        >
          {/* Fondo difuminado sutil para rellenar vacíos si las imágenes son muy verticales u horizontales */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-2xl opacity-20 scale-110 pointer-events-none"
            style={{ backgroundImage: `url(${activeProject.afterImg})` }}
          />
          {/* CAPA DESPUÉS */}
          <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
            <img
              src={activeProject.afterImg}
              alt="Resultado Después"
              className="max-w-full max-h-full w-auto h-auto object-contain object-center drop-shadow-xl"
            />
          </div>
          {/* Label DESPUÉS */}
          <div
            className={`absolute bottom-6 right-6 z-20 bg-customBlack/80 backdrop-blur-md border border-white/10 text-white px-4 py-1.5 rounded-full text-[11px] font-light uppercase tracking-[3px] transition-opacity duration-300 pointer-events-none ${
              position > 88 ? 'opacity-0' : 'opacity-100'
            }`}
          >
            Después
          </div>
          {/* CAPA ANTES (CLIP-PATH) */}
          <div
            className="absolute inset-0 z-10"
            style={{
              clipPath: `inset(0 ${100 - position}% 0 0)`,
            }}
          >
            <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 bg-neutral-950">
              <img
                src={activeProject.beforeImg}
                alt="Resultado Antes"
                className="max-w-full max-h-full w-auto h-auto object-contain object-center drop-shadow-xl"
              />
            </div>
            {/* Label ANTES */}
            <div
              className={`absolute bottom-6 left-6 z-20 bg-customBlack/80 backdrop-blur-md border border-white/10 text-white px-4 py-1.5 rounded-full text-[11px] font-light uppercase tracking-[3px] transition-opacity duration-300 pointer-events-none ${
                position < 12 ? 'opacity-0' : 'opacity-100'
              }`}
            >
              Antes
            </div>
          </div>
          {/* LÍNEA DIVISORA & BOTÓN INTERACTIVO */}
          <div
            className="absolute top-0 bottom-0 z-30"
            style={{
              left: `${position}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="relative h-full w-[2px] bg-white/90 shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center">
              <div 
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
                className={`w-11 h-11 md:w-12 md:h-12 rounded-full bg-white text-customBlack shadow-2xl flex items-center justify-center border border-neutral-200 cursor-ew-resize transition-transform duration-200 ${
                  isDragging ? 'scale-110 ring-2 ring-customBlue shadow-2xl' : 'hover:scale-105'
                }`}
                aria-label="Arrastrar para comparar antes y después"
              >
                <svg className="w-5 h-5 text-customBlack pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Pie Informativo */}
        <div className="mt-4 flex items-center justify-between text-xs text-neutral-400 font-light">
          <span>Arrastra el botón central para revelar la transformación</span>
          <span className="hidden sm:inline-block tracking-widest uppercase text-[10px]">A+R Arquitectos Estudio</span>
        </div>
      </div>
    </section>
  );
}