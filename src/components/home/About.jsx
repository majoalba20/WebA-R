import React from "react";
import jessicaImage from "../../assets/utils/architect_jessica.jpeg";
import davidImage from "../../assets/utils/architect_david.jpeg";
import teamImage from "../../assets/utils/team.jpeg";

const About = () => {
  return (
    <section
      id="about"
      className="relative bg-white pt-10 md:pt-14 pb-10 md:pb-14 font-montserrat overflow-hidden select-none"
    >
      {/* Elemento Decorativo Arquitectónico de Fondo */}
      <div className="absolute top-12 right-0 text-[18vw] font-extralight text-neutral-100 leading-none pointer-events-none select-none z-0">
        01
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Header Elegante */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-100 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-customBlue"></span>
              <span className="uppercase tracking-[6px] text-xs font-medium text-customBlue">
                Manifiesto & Equipo
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-customBlack font-light tracking-tight">
              Sobre nosotros
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[4px] text-neutral-400 mt-6 md:mt-0 font-medium">
            A+R Arquitectos Studio ©
          </p>
        </div>

        {/* Sección Empresa / Filosofía */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-36">
          {/* Fotografía con Encuadre Arquitectónico */}
          <div className="lg:col-span-7 relative group">
            <div className="relative z-10 overflow-hidden bg-neutral-100 rounded-sm">
              <img
                src={teamImage}
                alt="Equipo A+R Arquitectos"
                loading="lazy"
                className="w-full h-[480px] sm:h-[600px] object-cover filter grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
              />
            </div>
            {/* Marco o Sombra Estructural en Capas */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-customBlue/30 z-0 pointer-events-none hidden sm:block transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
          </div>

          {/* Texto de Filosofía */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="uppercase tracking-[5px] text-xs font-semibold text-customBlue mb-3">
              Filosofía Espacial
            </span>
            <h3 className="text-3xl sm:text-4xl text-customBlack font-light leading-snug mb-8">
              Diseñamos espacios <br className="hidden sm:inline" />
              <span className="italic font-normal">que inspiran.</span>
            </h3>
            
            <div className="space-y-6 text-customDarkerGray leading-relaxed text-[16px] sm:text-[17px] font-light">
              <p>
                Somos una firma referente en arquitectura e interiorismo, reconocida por transformar espacios en experiencias sensoriales y funcionales mediante diseños innovadores, rigurosos y sostenibles.
              </p>
              <p className="border-l-2 border-customBlue/40 pl-6 italic text-customBlack/80 font-normal">
                "Superamos las expectativas en cada proyecto aportando valor, precisión técnica y una estética atemporal."
              </p>
            </div>

            {/* Micro Stats de Prestigio */}
            <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-neutral-100">
              <div>
                <span className="block text-3xl font-light text-customBlack">100%</span>
                <span className="text-xs uppercase tracking-wider text-neutral-400 mt-1 block">Compromiso en Obra</span>
              </div>
              <div>
                <span className="block text-3xl font-light text-customBlack">A+R</span>
                <span className="text-xs uppercase tracking-wider text-neutral-400 mt-1 block">Excelencia en Diseño</span>
              </div>
            </div>
          </div>
        </div>

        {/* Separador Editorial */}
        <div className="flex items-center gap-6 mb-20">
          <h3 className="text-xs uppercase tracking-[6px] font-semibold text-customBlue shrink-0">
            Liderazgo del Estudio
          </h3>
          <div className="w-full h-[1px] bg-neutral-100"></div>
        </div>

        {/* Arquitectos Principal Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* David Rueda */}
          <div className="group flex flex-col">
            <div className="relative overflow-hidden bg-neutral-100 rounded-sm mb-8">
              <img
                src={davidImage}
                alt="David Rueda"
                loading="lazy"
                className="w-full h-[520px] sm:h-[580px] object-cover object-center filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 border border-neutral-200/50">
                <span className="text-[11px] uppercase tracking-[3px] font-semibold text-customBlack">
                  01 / Dirección
                </span>
              </div>
            </div>

            <div className="flex flex-col flex-grow">
              <h4 className="text-2xl sm:text-3xl text-customBlack font-light">
                David Rueda
              </h4>
              <span className="text-customBlue text-xs font-medium tracking-[3px] uppercase mt-2 mb-6">
                Arquitecto · Gerente General
              </span>
              <p className="text-customDarkerGray leading-relaxed text-[15px] font-light">
                Especialista en Gerencia de Proyectos de Construcción e Infraestructura de la Universidad del Rosario. Lidera la dirección general de A+R Arquitectos Estudio, coordinando obras de alta complejidad, proyectos de remodelación e ingeniería de carpintería arquitectónica.
              </p>
            </div>
          </div>

          {/* Jessica Alba */}
          <div className="group flex flex-col">
            <div className="relative overflow-hidden bg-neutral-100 rounded-sm mb-8">
              <img
                src={jessicaImage}
                alt="Jessica Alba"
                loading="lazy"
                className="w-full h-[520px] sm:h-[580px] object-cover object-bottom filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 border border-neutral-200/50">
                <span className="text-[11px] uppercase tracking-[3px] font-semibold text-customBlack">
                  02 / Interiorismo
                </span>
              </div>
            </div>

            <div className="flex flex-col flex-grow">
              <h4 className="text-2xl sm:text-3xl text-customBlack font-light">
                Jessica Alba
              </h4>
              <span className="text-customBlue text-xs font-medium tracking-[3px] uppercase mt-2 mb-6">
                Arquitecta · Coordinadora de Interiorismo
              </span>
              <p className="text-customDarkerGray leading-relaxed text-[15px] font-light">
                Apasionada por el diseño de interiores y la composición volumétrica de espacios. Su enfoque se centra en coordinar cada fase del proyecto con máxima rigurosidad, atención al detalle y sensibilidad estética, creando atmósferas con personalidad única.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;