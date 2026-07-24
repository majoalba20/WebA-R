import React from 'react';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth',
        });
    };

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
        const navbarHeight = 60;
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
        }
    };

    return (
        <footer className="relative bg-customBlack text-white pt-20 pb-12 font-montserrat overflow-hidden select-none border-t border-neutral-800/80">
        {/* Marca de agua decorativa de fondo */}
        <div className="absolute -bottom-10 right-0 text-[16vw] font-extralight text-neutral-900/40 leading-none pointer-events-none select-none z-0">
            A+R
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
            {/* Bloque Superior: Marca y Botón Back to Top */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-12 border-b border-neutral-800 gap-8">
            <div>
                <span className="text-[11px] uppercase tracking-[4px] text-customBlue font-semibold block mb-2">
                A+R Arquitectos Studio
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                Diseñamos el futuro de tus espacios.
                </h2>
            </div>

            <button
                onClick={scrollToTop}
                className="group flex items-center gap-3 text-xs uppercase tracking-[3px] text-neutral-400 hover:text-white transition-colors duration-300"
            >
                <span>Volver arriba</span>
                <div className="w-10 h-10 rounded-full border border-neutral-700 group-hover:border-white flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                </div>
            </button>
            </div>

            {/* Grid Principal de Contenido */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 border-b border-neutral-800">
            {/* Columna 1: Presentación Breve */}
            <div className="md:col-span-5">
                <h3 className="text-xl font-light text-white mb-6">
                A+R Arquitectos
                </h3>
                <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-sm mb-6">
                Estudio de arquitectura e interiorismo especializado en transformar visiones arquitectónicas en experiencias contemporáneas, funcionales y atemporales.
                </p>
                
                <div className="flex items-center gap-4 text-xs tracking-widest uppercase text-neutral-400 mb-6">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Disponible para nuevos proyectos
                </div>

                {/* Redes Sociales - Instagram */}
                <div className="pt-2">
                <a
                    href="https://www.instagram.com/a.r_arquitectos?igsh=eXp6cjRnN2F4azg="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-sm bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-customBlue transition-all duration-300 text-xs tracking-wider uppercase font-medium"
                >
                    <svg className="w-4 h-4 text-customBlue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>@ararquitectos.studio</span>
                </a>
                </div>
            </div>

            {/* Columna 2: Navegación Rápida */}
            <div className="md:col-span-3">
                <h4 className="text-xs font-semibold uppercase tracking-[3px] text-customBlue mb-6">
                Navegación
                </h4>
                <ul className="space-y-3 text-sm font-light text-neutral-300">
                {[
                    { name: 'Inicio', href: '#banner' },
                    { name: 'Nosotros', href: '#about' },
                    { name: 'Remodelaciones', href: '#renovations' },
                    { name: 'Modelos & Conceptos 3D', href: '#portfolio-3d' },
                ].map((item, i) => (
                    <li key={i}>
                    <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="hover:text-customBlue transition-colors duration-300 inline-block py-0.5"
                    >
                        {item.name}
                    </a>
                    </li>
                ))}
                </ul>
            </div>

            {/* Columna 3: Información de Contacto */}
            <div className="md:col-span-4">
                <h4 className="text-xs font-semibold uppercase tracking-[3px] text-customBlue mb-6">
                Contacto & Estudio
                </h4>
                <div className="space-y-4 text-sm font-light text-neutral-300">
                <div>
                    <span className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                    Ubicación
                    </span>
                    <p>Colombia</p>
                </div>

                <div>
                    <span className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                    Teléfono / WhatsApp
                    </span>
                    <a
                    href="https://wa.me/573212260840"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-customBlue transition-colors duration-300 font-normal"
                    >
                    +57 (321) 226-0840
                    </a>
                </div>

                <div>
                    <span className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                    Email
                    </span>
                    <a
                    href="mailto:contacto@ararquitectos.com"
                    className="hover:text-customBlue transition-colors duration-300"
                    >
                    contacto@ararquitectos.com
                    </a>
                </div>

                <div className="pt-2">
                    <span className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                    Dirección del Estudio
                    </span>
                    <p className="text-neutral-400">
                    David Rueda · Gerente General
                    </p>
                    <p className="text-neutral-400">
                    Jessica Alba · Coordinadora de Interiorismo
                    </p>
                </div>
                </div>
            </div>
            </div>

            {/* Bloque Inferior: Copyright & Legales */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-light">
            <p>
                © {new Date().getFullYear()} A+R Arquitectos Studio. Todos los derechos reservados.
            </p>
            <p className="tracking-widest uppercase text-[10px] text-neutral-600">
                Arquitectura · Interiorismo · Obras
            </p>
            </div>
        </div>
        </footer>
    );
}