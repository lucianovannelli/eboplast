import React from 'react';
import { ArrowUpRight, MapPin, Navigation } from 'lucide-react';
import { TechLabel } from './ui';
import { Reveal } from './Reveal';
import { companyInfo } from '../data/eboplastData';

export default function PlantMap({ className = "", index = "06" }) {
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Eboplast S.A., Av. Pte. Perón 5938, Rosario, Santa Fe, Argentina")}`;
  const embedUrl = "https://maps.google.com/maps?q=Eboplast+S.A.,+Av.+Pte.+Per%C3%B3n+5938,+Rosario,+Santa+Fe,+Argentina&output=embed";

  return (
    <Reveal className={`overflow-hidden rounded-2xl border border-line-strong bg-paper shadow-sm ${className}`}>
      {/* Barra técnica superior de cota y ubicación */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-line-strong bg-paper px-5 py-3.5 sm:px-6">
        <TechLabel index={index}>Ubicación de Planta & Despacho</TechLabel>
        
        <a
          href={mapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="label text-steel-500 hover:text-brand transition-colors inline-flex items-center gap-1.5"
        >
          <span>{companyInfo.location.full}</span>
          <ArrowUpRight className="size-3.5 text-steel-400 group-hover:text-brand" />
        </a>
      </div>

      {/* Visor interactivo de Google Maps con filtro grayscale al estilo tuttiRosca */}
      <div className="relative w-full overflow-hidden bg-paper-2">
        <iframe
          title="Ubicación de Planta Industrial Eboplast S.A."
          src={embedUrl}
          className="h-80 sm:h-96 w-full border-0 grayscale contrast-125 transition-[filter] duration-500 hover:grayscale-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Badge flotante en esquina */}
        <div className="pointer-events-none absolute bottom-4 left-4 hidden sm:flex items-center gap-2 rounded-full border border-line-strong bg-white/95 px-3.5 py-1.5 font-mono text-[11px] text-ink shadow-md backdrop-blur-xs">
          <MapPin className="size-3.5 text-brand" />
          <span className="font-bold">Planta Industrial Rosario</span>
          <span className="text-steel-400">· Acceso logístico para carretones</span>
        </div>
      </div>

      {/* Franja técnica inferior */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-line-strong bg-paper-2 px-5 py-2.5 sm:px-6 font-mono text-[11px] text-steel-500">
        <div className="flex items-center gap-2">
          <Navigation className="size-3 text-brand" />
          <span>Ruta Nacional 33 / Av. Pte. Perón · Fácil maniobra de bateas y semirremolques</span>
        </div>
        <div>
          <span>Horario de Carga: <strong className="text-ink">07:30 a 16:30 hs</strong></span>
        </div>
      </div>
    </Reveal>
  );
}
