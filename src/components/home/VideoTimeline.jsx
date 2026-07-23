const VideoTimeline = () => {
    return (
        <section
            id="timeline"
            className="bg-white py-10 font-montserrat"
        >
            <div className="max-w-7xl mx-auto px-8 lg:px-16">
                {/* Header */}
                <div className="mb-20">
                    <div className="w-16 h-[2px] bg-customBlue mb-6"></div>
                    <h2 className="text-4xl md:text-5xl text-customBlack font-light">
                        Del concepto a la realidad
                    </h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Texto */}
                    <div>
                        <span className="uppercase tracking-[5px] text-xs text-customBlue">
                            PROCESO CONSTRUCTIVO
                        </span>
                        <h3 className="text-3xl text-customBlack mt-5 mb-8 leading-snug">
                            Así transformamos una idea en un hogar.
                        </h3>
                        <p className="text-customDarkerGray leading-9 text-[17px]">
                            Cada proyecto representa meses de planificación,
                            diseño y ejecución. Este recorrido resume el proceso
                            completo de construcción de una vivienda, mostrando
                            cada etapa con el mismo compromiso, precisión y
                            atención al detalle que caracteriza nuestro trabajo.
                        </p>
                        {/* Timeline */}
                        <div className="mt-14">
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-customBlue"></div>
                                <div className="flex-1 h-px bg-gray-300"></div>
                                <div className="w-3 h-3 rounded-full bg-customBlue"></div>
                                <div className="flex-1 h-px bg-gray-300"></div>
                                <div className="w-3 h-3 rounded-full bg-customBlue"></div>
                                <div className="flex-1 h-px bg-gray-300"></div>
                                <div className="w-3 h-3 rounded-full bg-customBlue"></div>
                            </div>
                            <div className="grid grid-cols-4 mt-5 text-center">
                                <span className="text-sm uppercase tracking-widest text-customDarkerGray">
                                    Diseño
                                </span>
                                <span className="text-sm uppercase tracking-widest text-customDarkerGray">
                                    Obra
                                </span>
                                <span className="text-sm uppercase tracking-widest text-customDarkerGray">
                                    Acabados
                                </span>
                                <span className="text-sm uppercase tracking-widest text-customDarkerGray">
                                    Entrega
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Video */}
                    <div className="overflow-hidden">
                        <video 
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className="w-full h-[600px] object-cover"
                        >
                            <source
                                src="/videos/timeline.mp4"
                                type="video/mp4"
                            />
                            Tu navegador no soporta video.
                        </video>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoTimeline;