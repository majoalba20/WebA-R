import React, { useState, useEffect } from 'react';
import logo from './../../assets/utils/logo2-removebg.png';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 40);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lista completa de secciones con "&" en lugar de "Y"
    const navLinks = [
        { name: 'Inicio', href: '#banner' },
        { name: 'Antes & Después', href: '#beforeAndAfter' },
        { name: 'Remodelaciones', href: '#renovations' },
        { name: 'Modelos & Conceptos 3D', href: '#portfolio-3d' },
        { name: 'Timelapse', href: '#timeline' },
        { name: 'Nosotros', href: '#about' },
        { name: 'Reseñas', href: '#reviews' },
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setMenuOpen(false);
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header 
        className={`fixed top-0 left-0 w-full z-50 font-montserrat select-none transition-all duration-300 ${
            scrolled || menuOpen
            ? 'bg-customBlack/95 backdrop-blur-md py-3 border-b border-white/10 shadow-2xl' 
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4'
        }`}
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            
            {/* LOGO */}
            <a 
            href="#banner" 
            onClick={(e) => handleNavClick(e, '#banner')} 
            className="flex items-center group transition-transform duration-300 hover:scale-[1.02] shrink-0"
            >
            <img 
                src={logo} 
                className="h-8 sm:h-10 w-auto object-contain filter drop-shadow-md" 
                alt="Logo Arquitectura" 
            />
            </a>

            {/* NAVEGACIÓN DESKTOP */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
            <ul className="flex items-center gap-4 xl:gap-6 text-[11px] xl:text-xs uppercase tracking-[1.5px] xl:tracking-[2px] font-medium text-neutral-300">
                {navLinks.map((link) => (
                <li key={link.name}>
                    <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative py-1 transition-colors duration-300 hover:text-white group whitespace-nowrap"
                    >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-customBlue transition-all duration-300 group-hover:w-full" />
                    </a>
                </li>
                ))}
            </ul>

            {/* BOTÓN CONTACTO DIRECTO A WHATSAPP */}
            <a
                href="https://www.whatsapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-customBlue hover:bg-white text-white hover:text-customBlack text-[11px] xl:text-xs uppercase tracking-[2px] font-medium rounded-sm transition-all duration-300 shadow-md whitespace-nowrap"
            >
                Contacto
            </a>
            </nav>

            {/* BOTÓN HAMBURGUESA (MÓVIL / TABLET) */}
            <button
            className="lg:hidden p-2 text-white hover:text-customBlue transition-colors duration-300 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
            <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2 bg-customBlue' : ''}`} />
                <span className={`w-full h-[2px] bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`w-full h-[2px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2 bg-customBlue' : ''}`} />
            </div>
            </button>
        </div>

        {/* MENÚ MÓVIL DESPLEGABLE */}
        <div 
            className={`lg:hidden absolute top-full left-0 w-full bg-customBlack/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden shadow-2xl ${
            menuOpen ? 'max-h-[85vh] opacity-100 py-6 overflow-y-auto' : 'max-h-0 opacity-0 py-0'
            }`}
        >
            <ul className="flex flex-col items-center gap-4 text-xs uppercase tracking-[2.5px] font-medium text-neutral-300 px-6">
            {navLinks.map((link) => (
                <li key={link.name} className="w-full text-center">
                <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block py-2 text-white/90 hover:text-customBlue transition-colors duration-300"
                >
                    {link.name}
                </a>
                </li>
            ))}
            <li className="pt-2 w-full px-6 text-center">
                <a
                href="https://www.whatsapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="block w-full py-3 bg-customBlue hover:bg-white text-white hover:text-customBlack text-xs uppercase tracking-[2px] font-medium rounded-sm transition-all duration-300"
                >
                Contacto
                </a>
            </li>
            </ul>
        </div>
        </header>
    );
}

export default Navbar;