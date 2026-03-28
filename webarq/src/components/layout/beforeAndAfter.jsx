import before1 from "../../assets/images/antes 1 .jpeg";
import after1 from "../../assets/images/despues 1.jpeg";
import nextIcon from "../../assets/images/two-arrows.png";
import { useState } from "react";

function BeforeAndAfter() {
  const [position, setPosition] = useState(50);
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative w-full aspect-[16/9] overflow-hidden shadow-xl rounded-2xl select-none">
        {/* Imagen DESPUÉS (fondo completo) */}
        <img
          src={after1}
          alt="Después"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div
          className={`absolute bottom-4 right-4 z-30 bg-customBlue text-white px-6 py-3 rounded-xl font-semibold transition-opacity duration-300 
        ${position > 90 ? "opacity-0" : "opacity-100"}`}
        >
          Después
        </div>

        {/* Imagen ANTES (completa, pero recortada visualmente) */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
          }}
        >
          <img
            src={before1}
            alt="Antes"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div
            className={`absolute bottom-4 left-4 z-30 bg-customBlue text-white px-6 py-3 rounded-xl font-semibold transition-opacity duration-300 ${
              position < 10 ? "opacity-0" : "opacity-100"
            }`}
          >
            Antes
          </div>
        </div>

        {/* Línea divisora */}
        <div
          className="absolute top-0 bottom-0 z-20"
          style={{
            left: `${position}%`,
            transform: "translateX(-50%)",
          }}
        >
          {/* Línea */}
          <div className="relative h-full w-[3px] bg-white shadow-lg">
            {/* Handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-xl p-2">
              <img
                src={nextIcon}
                alt="Mover comparador"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Slider invisible */}
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
        />
      </div>
    </div>
  );
}

export default BeforeAndAfter;
