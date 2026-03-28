import before1 from "../../assets/images/antes 2.jpeg";
import after1 from "../../assets/images/despues 2.jpeg";
import nextIcon from "../../assets/images/two-arrows.png";
import { useState } from "react";

function BeforeAndAfter() {
  const [position, setPosition] = useState(50);
  return (
    <div className="w-full max-w-[100vw] h-screen overflow-hidden flex items-center justify-center">
      <div className="relative w-full h-full overflow-hidden shadow-2xl select-none">
        {/* Imagen DESPUÉS */}
        <img
          src={after1}
          alt="Después"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Label DESPUÉS */}
        <div
          className={`absolute bottom-4 right-4 md:bottom-6 md:right-6 z-30 bg-customBlue text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-opacity duration-300 ${
            position > 90 ? "opacity-0" : "opacity-100"
          }`}
        >
          Después
        </div>

        {/* Imagen ANTES */}
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

          {/* Label ANTES */}
          <div
            className={`absolute bottom-4 left-4 md:bottom-6 md:left-6 z-30 bg-customBlue text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-opacity duration-300 ${
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
          <div className="relative h-full w-[3px] bg-white shadow-lg">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white rounded-full shadow-xl p-2">
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