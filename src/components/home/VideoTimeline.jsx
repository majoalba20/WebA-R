import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Sparkles } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Diseño & Concepto",
    desc: "Planificación volumétrica y planos de detalle.",
  },
  {
    num: "02",
    title: "Obra Gris",
    desc: "Estructura, cimentación y levantar espacios.",
  },
  {
    num: "03",
    title: "Acabados & Detalles",
    desc: "Materialidad, iluminación y carpintería.",
  },
  {
    num: "04",
    title: "Entrega Final",
    desc: "Espacio listo y habitado.",
  },
];

const VideoTimeline = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      id="timeline"
      className="relative bg-white pt-10 md:pt-14 pb-10 md:pb-14 font-montserrat overflow-hidden select-none"
    >
      {/* Elemento Decorativo Tipográfico de Fondo */}
      <div className="absolute top-1/2 -left-10 -translate-y-1/2 text-[18vw] font-extralight text-neutral-100/80 leading-none pointer-events-none select-none z-0">
        TIMELAPSE
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        
        {/* Header Elegante */}
        <div className="mb-16 md:mb-20 border-b border-neutral-100 pb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-customBlue"></span>
            <span className="uppercase tracking-[6px] text-xs font-semibold text-customBlue">
              Metodología de Trabajo
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-customBlack font-light tracking-tight">
            Del concepto a la realidad
          </h2>
        </div>

        {/* Layout Grid Asimétrico */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Columna Izquierda: Información + Timeline Vertical */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="uppercase tracking-[5px] text-xs font-medium text-customBlue block mb-3">
                Proceso Constructivo
              </span>
              <h3 className="text-2xl sm:text-3xl text-customBlack font-light leading-snug mb-6">
                Así transformamos una idea <br className="hidden sm:inline" />
                <span className="italic font-normal">en un hogar único.</span>
              </h3>
              <p className="text-customDarkerGray leading-relaxed text-[15px] sm:text-[16px] font-light mb-10">
                Cada obra representa meses de rigor técnico, diseño conceptual y ejecución artesanal. Este recorrido sintetiza las fases fundamentales de materialización de nuestros proyectos.
              </p>
            </div>

            {/* Timeline Estilo Cadena / Pasos */}
            <div className="relative pl-6 border-l border-neutral-200/80 space-y-8 my-2">
              {STEPS.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Punto Indicador */}
                  <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-white border-2 border-customBlue group-hover:bg-customBlue transition-colors duration-300" />
                  
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-semibold text-customBlue tracking-wider">
                      {step.num}
                    </span>
                    <h4 className="text-base font-medium text-customBlack group-hover:text-customBlue transition-colors">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-xs text-customDarkerGray/80 font-light mt-1">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Reproductor de Video Interactivo */}
          <div className="lg:col-span-7 relative group">
            
            {/* Contenedor del Video con Efecto Marco */}
            <div className="relative overflow-hidden bg-neutral-900 rounded-sm shadow-2xl border border-neutral-800">
              <video
                ref={videoRef}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                preload="none"
                className="w-full h-[450px] sm:h-[580px] object-cover filter contrast-[1.03] transition-transform duration-1000 group-hover:scale-[1.02]"
              >
                <source src="/videos/timeline.mp4" type="video/mp4" />
                Tu navegador no soporta el formato de video.
              </video>

              {/* Tag Flotante Superior */}
              <div className="absolute top-6 left-6 bg-customBlack/80 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-customBlue animate-pulse" />
                <span className="text-[11px] uppercase tracking-[3px] font-medium text-white">
                  Ejecución de Obra
                </span>
              </div>

              {/* Barra de Controles Discreta en Hover */}
              <div className="absolute bottom-6 right-6 flex items-center gap-3 bg-customBlack/70 backdrop-blur-md p-2 rounded-full border border-white/10 opacity-90 transition-opacity duration-300">
                <button
                  onClick={togglePlay}
                  className="p-2.5 text-white hover:text-customBlue transition-colors"
                  aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div className="w-[1px] h-4 bg-white/20" />
                <button
                  onClick={toggleMute}
                  className="p-2.5 text-white hover:text-customBlue transition-colors"
                  aria-label={isMuted ? "Activar sonido" : "Silenciar video"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Sombra de Acento Geométrico en el Fondo */}
            <div className="absolute -bottom-4 -left-4 w-full h-full border border-customBlue/20 -z-10 hidden sm:block pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default VideoTimeline;