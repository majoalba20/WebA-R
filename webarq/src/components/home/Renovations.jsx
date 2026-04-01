import Card from '../layout/Card'
import projects from '../../data/projects.json'

function Renovations() {
    return (
        <section
            id="renovations"
            className="w-full min-h-screen px-6 py-12 flex items-center justify-center"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {projects.map((p, index) => (
                    <Card
                        key={index}
                        image={p.image}
                        title={p.title}
                        desc={p.description}
                    />
                ))}
            </div>
        </section>
    )
}

export default Renovations