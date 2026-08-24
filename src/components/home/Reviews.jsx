import React, { useState, useEffect } from "react";
import { Quote, ArrowRight, CheckCircle2, Star, ChevronLeft, ChevronRight } from "lucide-react";

// Helper para parsear CSV respetando comillas y saltos de línea dentro de los campos
const parseCSV = (text) => {
  const lines = [];
  let row = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      row.push(current.trim());
      current = "";
    } else if ((char === "\r" || char === "\n") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") i++;
      row.push(current.trim());
      if (row.some((cell) => cell.length > 0)) lines.push(row);
      row = [];
      current = "";
    } else {
      current += char;
    }
  }
  if (current || row.length > 0) {
    row.push(current.trim());
    lines.push(row);
  }
  return lines;
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSKypGYSbJB6MUyUPwEOSIdfaNPHu-Nv_pPbrf88SGYeOXaK90Xl32GFbXzKS3RyI_bJR0bzakKBmC4/pub?output=csv";
        const response = await fetch(URL);
        const csvText = await response.text();
        const parsedRows = parseCSV(csvText);
        
        if (parsedRows.length <= 1) {
          setLoading(false);
          return;
        }

        const headers = parsedRows[0].map((h) => h.toLowerCase());
        const dataRows = parsedRows.slice(1).map((row, idx) => {
          const rowObj = {};
          headers.forEach((header, i) => {
            rowObj[header] = row[i] || "";
          });

          const ratingNumber = parseInt(rowObj["valoración"] || "5", 10);

          return {
            id: idx,
            name: rowObj["nombre completo"],
            role: rowObj["tipo de proyecto"],
            project: "Cliente Verificado",
            text: rowObj["comentarios"],
            rating: isNaN(ratingNumber) ? 5 : Math.min(Math.max(ratingNumber, 1), 5),
          };
        });

        const topReviews = dataRows.filter((item) => item.rating >= 4 && item.text.length > 0);
        setReviews(topReviews);
      } catch (error) {
        console.error("Error al cargar las reseñas desde Google Sheets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (loading) {
    return (
      <section className="bg-white py-24 text-center font-montserrat">
        <span className="text-xs uppercase tracking-[4px] text-neutral-400 animate-pulse">
          Cargando experiencias...
        </span>
      </section>
    );
  }

  if (!reviews.length) return null;

  const activeReview = reviews[activeIndex];

  return (
    <section 
      id="reviews"
      className="relative bg-white pt-10 md:pt-14 pb-20 md:pb-32 font-montserrat overflow-hidden select-none"
    >
      <div className="absolute bottom-0 left-0 text-[18vw] font-extralight text-neutral-100/70 leading-none pointer-events-none select-none z-0 translate-y-1/3">
        TESTIMONIOS
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Cabecera */}
        <div className="mb-14 md:mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-100 pb-10">
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
            <span>{reviews.length} Proyectos Entregados</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Columna Izquierda: Review Destacada */}
          <div className="lg:col-span-7 bg-neutral-50/60 border border-neutral-100 p-8 sm:p-12 rounded-sm flex flex-col justify-between min-h-[460px] shadow-sm">            
            <div>
              <div className="mb-8 flex items-center justify-between">
                <Quote className="w-10 h-10 text-customBlue/30 rotate-180" />
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < activeReview.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-neutral-200 fill-neutral-100"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xl sm:text-2xl text-customBlack font-light leading-relaxed mb-8 tracking-tight">
                “{activeReview.text}”
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-neutral-200/60 gap-4">
              <div>
                <h4 className="text-lg font-medium text-customBlack">
                  {activeReview.name}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs uppercase tracking-wider text-customBlue font-medium">
                    {activeReview.role}
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="text-xs text-customDarkerGray font-light">
                    {activeReview.project}
                  </span>
                </div>
              </div>

              {/* Controles de Navegación Adaptativos */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-full border border-neutral-200 hover:border-customBlue text-customBlack hover:text-customBlue transition-all duration-300 bg-white shadow-sm"
                  aria-label="Reseña anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-neutral-400">
                  {activeIndex + 1} / {reviews.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-full border border-neutral-200 hover:border-customBlue text-customBlack hover:text-customBlue transition-all duration-300 bg-white shadow-sm"
                  aria-label="Siguiente reseña"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Lista de Reseñas con Scroll Limitado */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-[3px] font-semibold text-neutral-400">
                Todas las experiencias
              </span>
              <span className="text-[11px] text-customBlue bg-customBlue/10 px-2.5 py-0.5 rounded-full font-medium">
                {reviews.length} disponibles
              </span>
            </div>

            {/* Contenedor scrolleable suave */}
            <div className="flex flex-col gap-3 max-h-[460px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-200 hover:scrollbar-thumb-neutral-300">
              {reviews.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className={`p-5 border rounded-sm cursor-pointer transition-all duration-300 group ${
                      isActive
                        ? "border-customBlue bg-white shadow-md translate-x-1"
                        : "border-neutral-100 bg-white hover:border-neutral-300 hover:bg-neutral-50/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h5
                          className={`text-sm font-medium transition-colors ${
                            isActive ? "text-customBlue" : "text-customBlack group-hover:text-customBlue"
                          }`}
                        >
                          {item.name}
                        </h5>
                        <span className="text-xs text-customDarkerGray font-light block mt-0.5">
                          {item.role}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < item.rating
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-neutral-200"
                              }`}
                            />
                          ))}
                        </div>
                        <ArrowRight
                          className={`w-3.5 h-3.5 transition-all duration-300 ${
                            isActive
                              ? "text-customBlue opacity-100 translate-x-0"
                              : "text-neutral-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                          }`}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-customDarkerGray/80 line-clamp-2 mt-2 font-light leading-relaxed">
                      “{item.text}”
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Reviews;