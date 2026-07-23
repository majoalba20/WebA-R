import { useState } from "react";

function Modal({ project, onClose }) {
    const [index, setIndex] = useState(0)

    const handleNextImage = (images) => {
        if (index == (images.length - 1)) {
            setIndex(0)
        } else {
            setIndex(index + 1);
        } 
    };

    const handlePreviousImage = (images) => {
        if (index == 0) {
            setIndex((images.length - 1))
        } else {
            setIndex(index - 1);
        } 
    };
    
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-6 font-montserrat">
                <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
                    
                    {/* Botón cerrar */}
                    <button
                        onClick={onClose}
                        className="absolute right-5 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-gray-800 shadow-md transition hover:scale-110 hover:bg-white"
                    >
                        ✕
                    </button>
                    {/* Imagen principal */}
                    <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden bg-gray-100">
                        
                        {/* Overlay elegante */}
                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                        {/* Flecha izquierda */}
                        <button
                            onClick={() => handlePreviousImage(project.images)}
                            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/85 p-3 text-2xl font-bold text-gray-900 shadow-lg backdrop-blur-md transition hover:scale-110 hover:bg-white"
                        >
                            {"<"}
                        </button>
                        <img
                            src={project.images[index]}
                            alt={project.title}
                            className="h-full w-full object-cover"
                        />
                        {/* Flecha derecha */}
                        <button
                            onClick={() => handleNextImage(project.images)}
                            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/85 p-3 text-2xl font-bold text-gray-900 shadow-lg backdrop-blur-md transition hover:scale-110 hover:bg-white"
                        >
                            {">"}
                        </button>
                        {/* Título sobre imagen */}
                        <div className="absolute bottom-6 left-6 z-20">
                            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-white/80">
                                Proyecto
                            </p>
                            <h2 className="text-3xl font-bold text-white md:text-4xl">
                                {project.title}
                            </h2>
                        </div>
                    </div>
                    {/* Contenido */}
                    <div className="px-6 py-6 md:px-8 md:py-8">
                        {/* Mini indicadores */}
                        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
                            <p className="text-sm font-medium text-gray-500">
                                Imagen {index + 1} de {project.images.length}
                            </p>
                            <div className="flex gap-2">
                                {project.images.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                                            i === index ? "bg-customBlue w-6" : "bg-gray-300"
                                        }`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                        {/* Descripción */}
                        <div className="max-w-3xl">
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">
                                Descripción
                            </h3>
                            <p className="text-base leading-relaxed text-gray-600">
                                {project.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;