import React, { useState } from "react";
import { Quote, ArrowRight, CheckCircle2 } from "lucide-react";

const reviews = [
  {
    id: 0,
    name: "Carlos Martínez",
    role: "Cliente Residencial",
    project: "Casa Vista Parques",
    text: "El resultado superó completamente nuestras expectativas. La forma en que integraron la luz natural y los materiales nobles transformó por completo la dinámica de nuestro hogar.",
  },
  {
    id: 1,
    name: "Laura Gómez",
    role: "Proyecto Comercial",
    project: "Oficinas Nexus",
    text: "Profesionalismo y atención al detalle en cada etapa del proyecto. El diseño final refleja exactamente la identidad y sofisticación que buscábamos para nuestra marca.",
  },
  {
    id: 2,
    name: "Andrés Ruiz",
    role: "Remodelación Integral",
    project: "Penthouse Chapinero",
    text: "Un proceso extraordinariamente fluido y un resultado impecable. Se nota la amplia experiencia del equipo en la toma de decisiones técnicas y de interiorismo.",
  },
];

const Reviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeReview = reviews[activeIndex];
  return (
    <section 
      id="reviews"
      className="relative bg-white pt-10 md:pt-14 pb-20 md:pb-32 font-montserrat overflow-hidden select-none"
    >
      {/* Elemento Decorativo Tipográfico de Fondo */}
      <div className="absolute bottom-0 left-0 text-[18vw] font-extralight text-neutral-100/70 leading-none pointer-events-none select-none z-0 translate-y-1/3">
        TESTIMONIOS
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Header Elegante */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-100 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-customBlue"></span>
              <span className="uppercase tracking-[6px] text-xs font-semibold text-customBlue">
                Experiencias & Confianza
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-customBlack font-light tracking-tight">
              Opiniones
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs uppercase tracking-[3px] text-neutral-400 font-medium">
            <CheckCircle2 className="w-4 h-4 text-customBlue" />
            <span>Proyectos Entregados con Éxito</span>
          </div>
        </div>
        {/* Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Columna Izquierda: Review Destacada Dinámica */}
          <div className="lg:col-span-7 relative bg-neutral-50/60 border border-neutral-100 p-8 sm:p-12 md:p-14 rounded-sm flex flex-col justify-between min-h-[420px] transition-all duration-500">            
            {/* Ícono de Comilla de Diseño */}
            <div className="mb-8">
              <Quote className="w-12 h-12 text-customBlue/30 rotate-180" />
            </div>
            {/* Texto del Testimonio Destacado */}
            <p className="text-xl sm:text-2xl md:text-3xl text-customBlack font-light leading-relaxed mb-10 tracking-tight">
              “{activeReview.text}”
            </p>
            {/* Autor y Detalles del Proyecto */}
            <div className="flex items-center justify-between pt-8 border-t border-neutral-200/60">
              <div>
                <h4 className="text-lg font-medium text-customBlack">
                  {activeReview.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs uppercase tracking-wider text-customBlue font-medium">
                    {activeReview.role}
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="text-xs text-customDarkerGray font-light">
                    {activeReview.project}
                  </span>
                </div>
              </div>
              {/* Indicadores de Selección (Dots) */}
              <div className="flex gap-2">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      activeIndex === idx
                        ? "w-8 bg-customBlue"
                        : "w-2 bg-neutral-300 hover:bg-neutral-400"
                    }`}
                    aria-label={`Ver testimonio ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Columna Derecha: Tarjetas Secundarias Seleccionables */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[4px] font-semibold text-neutral-400 mb-2 block">
              Seleccionar testimonio
            </span>
            {reviews.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`p-6 border rounded-sm cursor-pointer transition-all duration-300 group ${
                    isActive
                      ? "border-customBlue bg-white shadow-lg translate-x-2"
                      : "border-neutral-100 bg-white hover:border-neutral-300 hover:bg-neutral-50/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h5
                        className={`text-base font-medium transition-colors ${
                          isActive ? "text-customBlue" : "text-customBlack group-hover:text-customBlue"
                        }`}
                      >
                        {item.name}
                      </h5>
                      <span className="text-xs text-customDarkerGray font-light block mt-0.5">
                        {item.role}
                      </span>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 transition-all duration-300 shrink-0 ${
                        isActive
                          ? "text-customBlue opacity-100 translate-x-0"
                          : "text-neutral-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                    />
                  </div>
                  <p className="text-xs text-customDarkerGray/80 line-clamp-2 mt-3 font-light leading-relaxed">
                    “{item.text}”
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;