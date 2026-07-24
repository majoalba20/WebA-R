// src/data/renovationsData.js

// 1. IMPORTACIÓN DE IMÁGENES DE COCINAS
import kitchen1 from '../assets/renovations/kitchens/kitchen1.jpeg';
import kitchen2 from '../assets/renovations/kitchens/kitchen2.jpeg';
import kitchen3 from '../assets/renovations/kitchens/kitchen3.jpeg';
import kitchen4 from '../assets/renovations/kitchens/kitchen4.jpeg';

// 2. IMPORTACIÓN DE IMÁGENES DE MUEBLES
import furniture1 from '../assets/renovations/furnitures/furniture1.jpeg';
import furniture2 from '../assets/renovations/furnitures/furniture2.jpeg';
import furniture3 from '../assets/renovations/furnitures/furniture3.jpeg';
import furniture4 from '../assets/renovations/furnitures/furniture4.jpeg';

// 3. IMPORTACIÓN DE IMÁGENES DE EXTERIORES
import garden1 from '../assets/renovations/gardens/garden1.jpeg';

// 4. ESTRUCTURA DE DATOS EXPORTADA
export const RENOVATIONS_DATA = [
    {
        title: "Cocinas",
        image: kitchen1,
        description: "Diseños modernos, funcionales y elegantes para transformar tus espacios.",
        images: [
            kitchen1,
            kitchen2,
            kitchen3,
            kitchen4
        ]
    },
    {
        title: "Muebles",
        image: furniture1,
        description: "Mobiliario a medida con estilo, calidad y funcionalidad para cada ambiente.",
        images: [
            furniture1,
            furniture2,
            furniture3,
            furniture4
        ]
    },
    {
        title: "Exteriores",
        image: garden1,
        description: "Propuestas únicas para espacios al aire libre con personalidad.",
        images: [
            garden1
        ]
    }
];