import jessicaImage from "../../assets/utils/architect_jessica.jpeg";
import davidImage from "../../assets/utils/architect_david.jpeg";
import teamImage from "../../assets/utils/team.jpeg";

const About = () => {
    return (
        <section
            id="about"
            className="bg-white py-28 font-montserrat"
        >
            <div className="max-w-7xl mx-auto px-8 lg:px-16">
                {/* Header */}
                <div className="mb-20">
                    <div className="w-16 h-[2px] bg-customBlue mb-6"></div>
                    <h2 className="text-4xl md:text-5xl text-customBlack font-light">
                        Sobre nosotros
                    </h2>
                </div>
                {/* Empresa */}
                <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
                    <div className="overflow-hidden rounded-sm">
                        <img
                            src={teamImage}
                            alt="Equipo A+R Arquitectos"
                            className="w-full h-[550px] object-cover hover:scale-105 duration-700"
                        />
                    </div>
                    <div>
                        <span className="uppercase tracking-[5px] text-xs text-customBlue">
                            A+R Arquitectos
                        </span>
                        <h3 className="text-3xl text-customBlack mt-5 mb-8 leading-snug">
                            Diseñamos espacios que inspiran.
                        </h3>
                        <p className="text-customDarkerGray leading-9 text-[17px]">
                            Somos una empresa referente en arquitectura e
                            interiorismo, reconocida por transformar espacios
                            en experiencias únicas mediante diseños innovadores,
                            funcionales y sostenibles.
                            <br />
                            <br />
                            Buscamos superar las expectativas de nuestros
                            clientes, aportando valor, calidad y excelencia
                            en cada proyecto, contribuyendo al desarrollo de
                            espacios que inspiren y mejoren la calidad de vida.
                        </p>
                    </div>
                </div>
                {/* Arquitectos */}
                <div className="grid md:grid-cols-2 gap-16">
                    {/* David */}
                    <div className="group">
                        <div className="overflow-hidden">
                            <img
                                src={davidImage}
                                alt="David Rueda"
                                className="w-full h-[520px] object-cover object-center group-hover:scale-105 duration-700"
                            />
                        </div>
                        <div className="mt-8">
                            <h3 className="text-2xl text-customBlack">
                                David Rueda
                            </h3>
                            <span className="block text-customBlue text-sm tracking-widest uppercase mt-2 mb-6">
                                Arquitecto · Gerente General
                            </span>
                            <p className="text-customDarkerGray leading-8">
                                Arquitecto y Especialista en Gerencia de
                                Proyectos de Construcción e Infraestructura de
                                la Universidad del Rosario.
                                Actualmente se desempeña como Gerente General
                                de A+R Arquitectos Estudio, liderando proyectos
                                de construcción, remodelación e interiorismo,
                                con experiencia en dirección de obras,
                                coordinación de equipos y carpintería
                                arquitectónica.
                            </p>
                        </div>
                    </div>
                    {/* Jessica */}
                    <div className="group">
                        <div className="overflow-hidden">
                            <img
                                src={jessicaImage}
                                alt="Jessica Alba"
                                className="w-full h-[520px] object-cover object-bottom group-hover:scale-105 duration-700"
                            />
                        </div>
                        <div className="mt-8">
                            <h3 className="text-2xl text-customBlack">
                                Jessica Alba
                            </h3>
                            <span className="block text-customBlue text-sm tracking-widest uppercase mt-2 mb-6">
                                Arquitecta · Interiorismo
                            </span>
                            <p className="text-customDarkerGray leading-8">
                                Soy arquitecta y coordinadora de proyectos de
                                interiorismo, apasionada por diseñar y gestionar
                                espacios funcionales, estéticos y de alta
                                calidad.
                                Me enfoco en coordinar cada etapa del proyecto
                                con organización, compromiso y atención al
                                detalle, transformando ideas en ambientes que
                                reflejan la esencia y las necesidades de cada
                                cliente.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;