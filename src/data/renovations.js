// src/data/renovationsData.js

// 1. IMPORTACIÓN DE IMÁGENES DE COCINAS
import kitchen1 from '../assets/renovations/kitchens/kitchen1.jpeg';
import kitchen2 from '../assets/renovations/kitchens/kitchen2.jpeg';
import kitchen3 from '../assets/renovations/kitchens/kitchen3.jpeg';
import kitchen4 from '../assets/renovations/kitchens/kitchen4.jpeg';
import kitchen5 from '../assets/renovations/kitchens/kitchen5.jpeg';
import kitchen6 from '../assets/renovations/kitchens/kitchen6.jpeg';
import kitchen7 from '../assets/renovations/kitchens/kitchen7.jpeg';

// 2. IMPORTACIÓN DE IMÁGENES DE MUEBLES
import furniture1 from '../assets/renovations/furnitures/furniture1.jpeg';
import furniture2 from '../assets/renovations/furnitures/furniture2.jpeg';
import furniture3 from '../assets/renovations/furnitures/furniture3.jpeg';
import furniture4 from '../assets/renovations/furnitures/furniture4.jpeg';
import furniture5 from '../assets/renovations/furnitures/furniture5.jpeg';
import furniture6 from '../assets/renovations/furnitures/furniture6.jpeg';
import furniture7 from '../assets/renovations/furnitures/furniture7.jpeg';
import furniture8 from '../assets/renovations/furnitures/furniture8.jpeg';
import furniture9 from '../assets/renovations/furnitures/furniture9.jpeg';
import furniture11 from '../assets/renovations/furnitures/furniture11.jpeg';

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
            kitchen4,
            kitchen5,
            kitchen6,
            kitchen7
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
            furniture4,
            furniture5,
            furniture6,
            furniture7,
            furniture8,
            furniture9,
            furniture11
        ]
    },
    {
        title: "Exteriores",
        image: garden1,
        description: "Propuestas únicas para espacios al aire libre con personalidad.",
        images: [
            garden1,
            '/videos/garden.mp4'
        ]
    }
];