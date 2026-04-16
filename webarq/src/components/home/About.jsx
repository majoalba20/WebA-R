const About = () => {
    return (
        <section className="h-screen pt-20 bg-white font-montserrat overflow-hidden">
            <div className="h-full grid md:grid-cols-2">
                {/* Arquitecto 1 */}
                <div className="group relative flex items-center justify-center px-10">
                    {/* Background Image */}
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                        src="/arquitecto1.jpg"
                        alt="Arquitecto 1"
                        className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition duration-700"
                        />
                    </div>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-white/80 group-hover:bg-white/60 transition duration-500"></div>
                    {/* Content */}
                    <div className="relative text-center max-w-sm">
                        <h3 className="text-2xl md:text-3xl text-customBlack mb-3">
                        Nombre Arquitecto 1
                        </h3>
                        <span className="block text-sm text-customDarkerGray mb-4">
                        Arquitecto · Diseño Urbano
                        </span>
                        <p className="text-customDarkGray text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition duration-500">
                        Especializado en arquitectura contemporánea, desarrollando espacios 
                        que integran contexto, funcionalidad y estética.
                        </p>
                    </div>
                </div>
                {/* Arquitecto 2 */}
                <div className="group relative flex items-center justify-center px-10 border-l border-customGray">
                    {/* Background Image */}
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                        src="/arquitecto2.jpg"
                        alt="Arquitecto 2"
                        className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition duration-700"
                        />
                    </div>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-white/80 group-hover:bg-white/60 transition duration-500"></div>
                    {/* Content */}
                    <div className="relative text-center max-w-sm">
                        <h3 className="text-2xl md:text-3xl text-customBlack mb-3">
                        Nombre Arquitecto 2
                        </h3>
                        <span className="block text-sm text-customDarkerGray mb-4">
                        Arquitecto · Interiorismo
                        </span>
                        <p className="text-customDarkGray text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition duration-500">
                        Enfocado en la experiencia espacial, trabajando con luz, materiales 
                        y proporción para crear ambientes equilibrados.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;