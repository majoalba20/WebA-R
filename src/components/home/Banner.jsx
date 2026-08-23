import React from 'react';
import banner from './../../assets/banner/house_desing_day_banner.webp';

function Banner() {
    const handleScrollToContent = () => {
        const nextSection = document.getElementById('beforeAndAfter') || document.getElementById('renovations');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <section 
            id="banner" 
            className="relative w-full h-screen overflow-hidden font-montserrat select-none bg-neutral-950"
            >
            {/* Imagen de Fondo con Tratamiento Visual */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                src={banner} 
                alt="Diseño de Interiores y Arquitectura" 
                fetchPriority="high" 
                loading="eager"
                className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-90 scale-105 animate-pulse-slow" 
                />
                
                {/* Gradiante Atmosférico para Legibilidad Impecable */}
                <div className="absolute inset-0 bg-gradient-to-t from-customBlack via-customBlack/40 to-customBlack/30" />
            </div>
            {/* Contenido Central */}
            <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 flex flex-col justify-center items-start text-left">
                
                {/* Subtítulo / Badge de Marca */}
                <div className="flex items-center gap-3 mb-6 animate-fadeIn">
                <span className="w-10 h-[2px] bg-customBlue"></span>
                <span className="uppercase tracking-[6px] text-xs md:text-sm font-semibold text-white/90">
                    Estudio de Arquitectura & Diseño
                </span>
                </div>
                {/* Titular Principal */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-tight max-w-4xl mb-8">
                    Convertimos tus ideas en{" "}
                    <span className="font-normal italic text-neutral-200">
                        espacios únicos
                    </span>
                    , combinando diseño, funcionalidad y detalle.
                </h1>
                {/* Botones de Acción (CTA) */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <button 
                    onClick={handleScrollToContent}
                    className="px-8 py-4 bg-customBlue hover:bg-white text-white hover:text-customBlack text-xs uppercase tracking-[3px] font-medium transition-all duration-300 rounded-sm shadow-xl flex items-center justify-center gap-3 group"
                >
                    <span>Conoce más</span>
                    <svg 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
                <a 
                    href="#renovations"
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 text-xs uppercase tracking-[3px] font-medium transition-all duration-300 rounded-sm flex items-center justify-center text-center"
                >
                    Ver Proyectos
                </a>
                </div>
            </div>
            {/* Indicador Flotante de Desplazamiento (Scroll Down) */}
            <button 
                onClick={handleScrollToContent}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 group cursor-pointer"
                aria-label="Desplazarse hacia abajo"
            >
                <span className="text-[10px] uppercase tracking-[4px] font-light">Explorar</span>
                <div className="w-5 h-9 rounded-full border border-white/30 flex items-start justify-center p-1 group-hover:border-white transition-colors duration-300">
                <div className="w-1 h-2 bg-customBlue rounded-full animate-bounce mt-1" />
                </div>
            </button>
        </section>
    );
}

export default Banner;