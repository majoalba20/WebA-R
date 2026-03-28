import cocina from '../../assets/images/fachada .jpeg'
import Card from '../layout/Card'

function Renovations() {
    return(
        <>
            <section id='renovations'>
                <Card 
                    image={cocina}
                    title={"Cocinas"}
                    desc={"Diseños modernos, funcionales y elegantes para transformar tus espacios."}
                />
            </section>
        </>
    )
}

export default Renovations