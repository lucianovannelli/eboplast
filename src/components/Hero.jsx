import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, ShieldCheck, Check } from 'lucide-react';
import { TechLabel } from './ui';
import { Reveal } from './Reveal';

const galleryItems = {
  vertical: {
    src: '/assets/leche.png',
    title: 'Tanque Vertical Monolítico',
    badge: 'Matriz Ø 4.700 mm',
    desc: 'Cuerpo continuo sin costura en fondo · Soldadura superior a 0 kPa',
    fit: 'object-contain'
  },
  planta: {
    src: '/assets/section-bg-mobile.jpg',
    title: 'Batería de Tanques en Planta',
    badge: 'Instalación de Gran Porte',
    desc: 'Batería industrial de almacenamiento en predio de cliente',
    fit: 'object-cover'
  },
  transporte: {
    src: '/assets/camion.png',
    title: 'Transporte y Carretones Propios',
    badge: 'Logística Nacional',
    desc: 'Traslado seguro y descarga con cuadrilla de izaje en obra',
    fit: 'object-contain'
  },
  isotanque: {
    src: '/assets/prod.png',
    title: 'Isotanques y Estructuras Metálicas',
    badge: 'Contención Química',
    desc: 'Encuadre metálico intermodal para ácidos y fertilizantes',
    fit: 'object-contain'
  }
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState('vertical');
  const currentItem = galleryItems[activeTab];

  return (
    <section className="relative isolate overflow-hidden border-b border-line-strong bg-paper pt-36 pb-16 sm:pt-44 sm:pb-20">
      {/* Grilla milimetrada blueprint de fondo */}
      <div className="blueprint absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-10">
        
        {/* Grilla Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Columna Izquierda: Mensaje Central */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Kicker técnico tipo tuttiRosca */}
            <div className="flex items-center gap-3">
              <TechLabel index="00">Fábrica de Tanques PRFV · Rosario · Santa Fe</TechLabel>
            </div>

            {/* Titular en Archivo Uppercase */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[0.96] tracking-tight text-ink">
              Tanques de PRFV con{" "}
              <span className="text-brand">cero soldaduras</span> en la base.
            </h1>

            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-steel-600 font-sans">
              Fabricamos en Rosario tanques industriales por sistema <strong className="text-ink font-semibold">Filament Winding</strong> bajo normas <strong className="text-ink font-semibold">ASTM, BS, ASME, NBS, IRAM y CIRSOC</strong> (y, previo estudio, cualquier otra norma o reglamento). Gracias a nuestra matricería de gran porte, el fondo plano y el cilindro se conforman en <strong className="text-ink font-semibold">una sola pieza monolítica continua</strong>; al no haber soldadura entre fondo y cilindro, la única costura queda en el casquete superior (0 kPa) y se disminuye también el riesgo de ataque químico.
            </p>

            {/* Spec Sheet Ledger Block */}
            <div className="overflow-hidden rounded-2xl border border-line-strong bg-paper-2 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line-strong text-left">
                <div className="p-4">
                  <span className="text-[11px] text-steel-500 uppercase tracking-wider block">Soldadura</span>
                  <span className="text-ink font-extrabold text-sm block mt-1">Casquete Superior</span>
                  <span className="text-brand text-[11px] block mt-0.5 font-semibold">0 kPa en fondo</span>
                </div>
                <div className="p-4">
                  <span className="text-[11px] text-steel-500 uppercase tracking-wider block">Capacidad Unitaria</span>
                  <span className="text-ink font-extrabold text-sm block mt-1">Hasta 250.000 L</span>
                  <span className="text-steel-500 text-[11px] block mt-0.5">Ø hasta 4.700 mm</span>
                </div>
                <div className="p-4">
                  <span className="text-[11px] text-steel-500 uppercase tracking-wider block">Garantía Fabril</span>
                  <span className="text-ink font-extrabold text-sm block mt-1">1 Año Escrita</span>
                  <span className="text-brand text-[11px] block mt-0.5 font-semibold">Certificado oficial</span>
                </div>
              </div>
            </div>

            {/* Botones de acción pill */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/cotizador"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-hover text-white font-semibold uppercase tracking-wider px-7 py-4 text-xs sm:text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
              >
                <span>Solicitar Presupuesto</span>
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                to="/productos"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-line-strong bg-white hover:bg-paper-2 text-ink font-semibold uppercase tracking-wider px-6 py-4 text-xs sm:text-sm transition-colors"
              >
                <span>Ver Catálogo Técnico</span>
                <ArrowDown className="size-4 text-steel-500 transition-transform group-hover:translate-y-0.5" />
              </Link>
            </div>

            <div className="text-xs text-steel-500 flex items-center gap-2 pt-1 font-mono">
              <ShieldCheck className="size-4 text-brand shrink-0" />
              <span>Logística propia con carretones y cuadrilla de montaje en todo el país.</span>
            </div>

          </div>

          {/* Columna Derecha: Tarjeta Fotográfica de Ficha Técnica */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-line-strong bg-white p-3 sm:p-4 shadow-sm">
              
              {/* Selector de pestañas técnico */}
              <div className="grid grid-cols-4 gap-1.5 mb-3 font-mono text-[10px]">
                {Object.entries(galleryItems).map(([key, item]) => {
                  const isActive = activeTab === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`px-2 py-1.5 rounded-lg border text-center transition-all truncate font-bold uppercase tracking-wider ${
                        isActive
                          ? 'bg-ink text-white border-ink'
                          : 'bg-paper-2 text-steel-600 border-line hover:border-steel-400'
                      }`}
                    >
                      {key === 'vertical' ? 'Tanque' : key === 'planta' ? 'Planta' : key === 'transporte' ? 'Logística' : 'Isotanque'}
                    </button>
                  );
                })}
              </div>

              {/* Visor de Foto Real */}
              <div className="relative rounded-xl bg-paper-2 border border-line overflow-hidden h-72 sm:h-80 flex items-center justify-center">
                <img 
                  src={currentItem.src} 
                  alt={currentItem.title} 
                  className={`w-full h-full p-2 select-none transition-all duration-300 ${currentItem.fit}`}
                />
                
                {/* Franja de Especificación */}
                <div className="absolute bottom-0 inset-x-0 bg-ink/90 backdrop-blur-md text-white px-3.5 py-2.5 flex items-center justify-between text-xs font-mono border-t border-white/10">
                  <div className="truncate pr-2">
                    <span className="font-bold block truncate text-[11px] sm:text-xs">{currentItem.title}</span>
                    <span className="text-[10px] text-white/60 block truncate">{currentItem.desc}</span>
                  </div>
                  <span className="text-brand-bright font-mono font-bold text-[10px] shrink-0 bg-white/10 px-2 py-0.5 rounded border border-white/20">
                    {currentItem.badge}
                  </span>
                </div>
              </div>

              {/* Pie de ficha */}
              <div className="mt-3 pt-2.5 border-t border-line px-1 flex items-center justify-between text-[11px] font-mono text-steel-500">
                <span>Material: <strong className="text-ink">PRFV Filament Winding</strong></span>
                <span>Vida útil: <strong className="text-ink">+35 Años</strong></span>
              </div>

            </div>
          </div>

        </div>

        {/* Ledger Metric Strip de 4 Celdas Monolíticas */}
        <div className="mt-14 sm:mt-16 pt-10 border-t border-line-strong">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
            
            <div className="border-l-2 border-ink pl-4">
              <span className="text-[11px] text-steel-500 uppercase tracking-wider block">Trayectoria Fabril</span>
              <span className="text-2xl sm:text-3xl font-black text-ink block mt-1 tracking-tight">DESDE 1978</span>
              <span className="text-xs text-steel-500 font-sans">Fundada en 1978 en Rosario</span>
            </div>

            <div className="border-l-2 border-brand pl-4">
              <span className="text-[11px] text-steel-500 uppercase tracking-wider block">Capacidad Unitaria</span>
              <span className="text-2xl sm:text-3xl font-black text-ink block mt-1 tracking-tight">250.000 L</span>
              <span className="text-xs text-steel-500 font-sans">250 m³ por cilindro</span>
            </div>

            <div className="border-l-2 border-line-strong pl-4">
              <span className="text-[11px] text-steel-500 uppercase tracking-wider block">Normas de Fabricación</span>
              <span className="text-2xl sm:text-3xl font-black text-ink block mt-1 tracking-tight">ASTM · ASME · BS</span>
              <span className="text-xs text-steel-500 font-sans">NBS, IRAM, CIRSOC y otras normas</span>
            </div>

            <div className="border-l-2 border-line-strong pl-4">
              <span className="text-[11px] text-steel-500 uppercase tracking-wider block">Montaje en Obra</span>
              <span className="text-2xl sm:text-3xl font-black text-ink block mt-1 tracking-tight">NACIONAL</span>
              <span className="text-xs text-steel-500 font-sans">Cobertura en todo el país</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
