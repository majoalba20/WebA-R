import projects from '../../data/projects.json'
import Modal from '../layout/Modal'
import { useState } from "react";

function Renovations() {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleOpenModal = (project) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };
    return (
        <section
            id="renovations"
            className="w-full min-h-screen px-6 md:px-20 py-20 bg-white font-montserrat"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <div className="w-16 h-[2px] bg-customBlue mb-6"></div>
                    <h2 className="text-4xl md:text-5xl text-customBlack mb-4">
                        Remodelaciones
                    </h2>
                    <p className="text-customDarkGray max-w-xl">
                        Proyectos que transforman espacios existentes en experiencias contemporáneas.
                    </p>
                </div>
                {/* Grid PRO */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
                    {projects.map((p, index) => {
                        const isLarge = index === 0; // primer proyecto grande
                        return (
                            <div
                                key={index}
                                onClick={() => handleOpenModal(p)}
                                className={`group relative cursor-pointer overflow-hidden ${
                                isLarge ? "md:col-span-2 md:row-span-2" : ""
                                }`}
                            >
                                {/* Imagen */}
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition duration-700"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-500"></div>
                                {/* Texto */}
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <h3 className="text-lg md:text-xl mb-1">
                                        {p.title}
                                    </h3>
                                    <p className="text-sm opacity-80 line-clamp-2">
                                        {p.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        {/* Modal */}
        {selectedProject && (
            <Modal
            project={selectedProject}
            onClose={handleCloseModal}
            />
        )}
        </section>
    )
}

export default Renovations