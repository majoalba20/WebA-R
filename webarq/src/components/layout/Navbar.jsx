import './../../App.css'
import { useState } from "react";
import logo from './../../assets/images/logo2-removebg.png'

function Navbar() {
    // Estado para abrir/cerrar el menú en móvil
    const [menuOpen, setMenuOpen] = useState(false);
    return (
    <>
        {/* 
            fixed: Hace que el navbar se quede pegado a la pantalla.
            top-0, left-0: Lo coloca arriba del todo.
            z-50: Hace que esté encima del banner.
        */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/10  backdrop-blur-xs">
            {/* 
                flex: Ubica los elementos en fila.
                items-center: Alinea los elementos verticalmente. 
                justify-between: Deja un espacio equitativo entre cada elemento. 
            */}
            <div className="flex items-center justify-between px-8 py-4 font-montserrat font-semibold text-white">
                {/* Logo */}
                <img src={logo} className="w-30 h-auto" alt="Logo" />
                {/* Menú desktop */}
                <ul className="hidden md:flex items-center gap-8">
                    <li><a className="hover:text-black" href="/">HOME</a></li>
                    <li><a className="hover:text-black" href="/projects">PROJECTS</a></li>
                    <li><a className="hover:text-black" href="/about">ABOUT US</a></li>
                    <li><a className="hover:text-black" href="/reviews">REVIEWS</a></li>
                    <li><a className="hover:text-black" href="/contact">CONTACT</a></li>
                </ul>
                {/* Botón hamburguesa (solo móvil) */}
                <button
                    className="md:hidden flex flex-col justify-center items-center gap-1"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="w-6 h-0.5 bg-white"></span>
                    <span className="w-6 h-0.5 bg-white"></span>
                    <span className="w-6 h-0.5 bg-white"></span>
                </button>  
            </div>

            {/* Menú móvil desplegable */}
            {menuOpen && (
                <ul className="md:hidden flex flex-col items-center gap-6 py-6 bg-customDarkerGray font-montserrat font-semibold text-white">
                    <li><a href="/">HOME</a></li>
                    <li><a href="/projects">PROJECTS</a></li>
                    <li><a href="/about">ABOUT US</a></li>
                    <li><a href="/reviews">REVIEWS</a></li>
                    <li><a href="/contact">CONTACT</a></li>
                </ul>
            )}
        </nav>
    </>
  )
}

export default Navbar
