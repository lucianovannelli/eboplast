import React from 'react';
import { Fuel, Factory, Milk, Droplet, ShieldAlert, Zap, Building2, Sparkles } from 'lucide-react';
import { TechLabel } from './ui';

export default function IndustryMarquee() {
  const sectors = [
    { label: "Petroquímica & Ácidos", icon: Fuel },
    { label: "Agroindustria & Fertilizantes Líquidos", icon: Factory },
    { label: "Industria Láctea & Alimenticia", icon: Milk },
    { label: "Cooperativas de Agua Potable & CIRSOC", icon: Droplet },
    { label: "Redes Contra Incendio", icon: ShieldAlert },
    { label: "Postes PRFV & Alumbrado Eléctrico", icon: Zap },
    { label: "Tratamiento de Efluentes Industriales", icon: Building2 },
    { label: "Minería & Ambientes Extremos", icon: Sparkles },
  ];

  const items = [...sectors, ...sectors];

  return (
    <section className="grid items-center gap-px border-y border-line-strong bg-line-strong md:grid-cols-[280px_1fr]">
      {/* Columna Izquierda: Identificador Técnico */}
      <div className="bg-paper px-5 py-4 sm:px-8">
        <TechLabel index="00">Sectores & Aplicaciones</TechLabel>
        <p className="mt-1 text-sm font-bold uppercase tracking-tight text-ink">
          Ingeniería PRFV en Operación
        </p>
      </div>

      {/* Columna Derecha: Marquesina con máscara suave */}
      <div className="marquee-mask overflow-hidden bg-paper py-4">
        <div className="flex w-max animate-marquee items-center">
          {items.map((sec, i) => {
            const Icon = sec.icon;
            return (
              <span key={`${sec.label}-${i}`} className="flex items-center">
                <span className="flex items-center gap-2.5 rounded-full border border-line bg-paper-2 px-4 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 transition-colors hover:border-brand hover:text-brand">
                  <Icon className="size-3.5 text-brand shrink-0" />
                  <span>{sec.label}</span>
                </span>
                <span className="mx-4 text-xs font-mono text-steel-300">/</span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
