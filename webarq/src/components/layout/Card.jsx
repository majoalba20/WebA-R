function Card({image, title, desc, onViewMore}) {
  return (
    <div className="group w-[280px] overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-[220px] w-full overflow-hidden">
        <img
          src={image}
          alt="Cocinas modernas"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay oscuro sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
        {/* Badge opcional */}
        <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 shadow font-montserrat">
          Categoría
        </span>
      </div>

      <div className="p-5">
        <h1 className="text-xl font-bold text-gray-900 font-montserrat">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-600 font-montserrat">
            {desc}
        </p>

        <button className="mt-4 rounded-xl bg-customBlue px-4 py-2 text-sm font-semibold text-white transition hover:bg-customDarkGray font-montserrat"
            onClick={onViewMore}
        >
          Ver más
        </button>
      </div>
    </div>
  );
}

export default Card