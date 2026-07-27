const whatsappNumber = '573212260840';
const defaultWhatsappMessage = 'Hola A+R Arquitectos Studio, vi su página web y me gustaría cotizar un proyecto.';

export const SITE_CONFIG = {
    name: 'A+R Arquitectos Studio',
    email: 'ararquitectosestudio@outlook.es',
    socialLinks: {
        instagram: 'https://www.instagram.com/a.r_arquitectos?igsh=eXp6cjRnN2F4azg=',
        whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultWhatsappMessage)}`
    },
};

export const NAVIGATION_LINKS = [
    { name: 'Inicio', href: '#banner' },
    { name: 'Antes & Después', href: '#beforeAndAfter' },
    { name: 'Remodelaciones', href: '#renovations' },
    { name: 'Modelos & Conceptos 3D', href: '#portfolio-3d' },
    { name: 'Timelapse', href: '#timeline' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Reseñas', href: '#reviews' },
];

export const NAVIGATION_LINKS_FOOTER = [
    { name: 'Inicio', href: '#banner' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Remodelaciones', href: '#renovations' },
    { name: 'Modelos & Conceptos 3D', href: '#portfolio-3d' },
];