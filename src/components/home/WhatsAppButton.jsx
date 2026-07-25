import React from 'react';
import { SITE_CONFIG } from "../../constants/siteConfig";

export default function WhatsAppButton() {
    return (
        <a
        href={SITE_CONFIG.socialLinks.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group border border-white/20"
        >
        {/* Icono de WhatsApp (SVG directo para máxima velocidad) */}
        <svg
            className="w-7 h-7 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.67-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.197 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.808 0-3.582-.486-5.138-1.408l-.368-.218-3.82.1001 1.018-3.723-.24-.383c-1.012-1.611-1.547-3.518-1.547-5.474 0-5.632 4.582-10.214 10.216-10.214 2.73 0 5.295 1.063 7.223 2.993 1.928 1.929 2.99 4.494 2.99 7.223 0 5.633-4.583 10.215-10.215 10.215m0-22c-6.516 0-11.8 5.284-11.8 11.8 0 2.086.543 4.123 1.576 5.918l-1.674 6.12 6.262-1.642c1.733.944 3.69 1.442 5.636 1.442 6.515 0 11.8-5.284 11.8-11.8 0-3.151-1.228-6.115-3.457-8.344-2.229-2.229-5.193-3.456-8.343-3.456" />
        </svg>
        {/* Tooltip elegante al pasar el mouse (Desktop) */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl border border-neutral-800 hidden sm:block">
            ¿Hablamos de tu proyecto?
        </span>
        </a>
    );
}