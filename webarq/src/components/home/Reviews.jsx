import React from "react";

const reviews = [
    {
        name: "Carlos Martínez",
        role: "Cliente residencial",
        text: "El resultado superó completamente nuestras expectativas. La forma en que integraron la luz natural transformó el espacio.",
    },
    {
        name: "Laura Gómez",
        role: "Proyecto comercial",
        text: "Profesionalismo y atención al detalle en cada etapa. El diseño final refleja exactamente lo que buscábamos.",
    },
    {
        name: "Andrés Ruiz",
        role: "Remodelación",
        text: "Un proceso fluido y un resultado impecable. Se nota la experiencia en cada decisión.",
    },
];

const Reviews = () => {
    return (
        <section className="h-screen pt-20 px-6 md:px-20 bg-white font-montserrat overflow-hidden">
            <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
                {/* Header */}
                <div className="mb-16">
                    <div className="w-16 h-[2px] bg-customBlue mb-6"></div>
                    <h2 className="text-4xl md:text-5xl text-customBlack">
                        Opiniones
                    </h2>
                </div>
                {/* Layout */}
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Review grande */}
                    <div className="md:col-span-2">
                        <p className="text-2xl md:text-3xl text-customBlack leading-relaxed mb-6">
                        “El resultado superó completamente nuestras expectativas. 
                        La forma en que integraron la luz natural transformó el espacio.”
                        </p>
                        <div>
                            <p className="text-customBlack font-medium">
                                Carlos Martínez
                            </p>
                            <span className="text-sm text-customDarkerGray">
                                Cliente residencial
                            </span>
                        </div>
                    </div>
                    {/* Reviews pequeños */}
                    <div className="flex flex-col justify-between gap-8">
                        {reviews.slice(1).map((r, i) => (
                        <div key={i} className="border-l border-customGray pl-4">
                            <p className="text-customDarkGray mb-3 leading-relaxed">
                            “{r.text}”
                            </p>
                            <div>
                                <p className="text-customBlack text-sm">
                                    {r.name}
                                </p>
                                <span className="text-xs text-customDarkerGray">
                                    {r.role}
                                </span>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;