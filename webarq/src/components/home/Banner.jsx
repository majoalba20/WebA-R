import './../../App.css'
import banner from './../../assets/images/fachada .jpeg'

function Banner() {
    return(
        <>
        {/* 
            relative: Permite que el texto absoluto se posicione respecto al banner.
        */}
        <section id='banner' className='relative text-center text-white'>
            {/* 
                h-screen: Hace que el banner ocupe toda la altura de la pantalla.
                object-cover: Hace que la imagen se vea mejor como “hero section”.
            */}
            <img src={banner} className='w-full h-screen object-cover grayscale-50' alt="" />
            {/* 
                absolute e inset-0: Hace que el texto ocupe toda el área del banner.
                flex, items-center y justify-center: Centra el texto perfectamente.
                flex-col: organiza todo verticalmente.
            */}
            <div className="absolute inset-0 flex flex-col items-center justify-center font-montserrat px-6 text-center">
                <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">
                    Convertimos tus ideas en espacios únicos, 
                    combinando diseño, funcionalidad y detalle.
                </h1>
                <button className="mt-6 bg-customBlue hover:bg-customDarkGray rounded-xl px-6 py-3 font-semibold">
                    Conoce más
                </button>
            </div>
        </section>
        </>
    )
}

export default Banner