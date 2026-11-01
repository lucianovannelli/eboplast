import React from 'react';
import ProductSpotlight from '../components/ProductSpotlight';
import { Link } from 'react-router-dom';
import { Zap, Flame, ArrowUpRight } from 'lucide-react';
import { TechLabel } from '../components/ui';
import { Reveal } from '../components/Reveal';

export default function PolesAndFirePage() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-paper-2 border-b border-line-strong pt-28 pb-14 sm:pt-36 sm:pb-20">
        <div className="blueprint absolute inset-0 opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-10">
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <TechLabel index="04">
                Líneas Especializadas de Seguridad · Infraestructura Crítica
              </TechLabel>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.98] text-ink">
                Postes Dieléctricos y Redes de Incendio
              </h1>
              <p className="text-steel-600 text-base sm:text-lg font-sans leading-relaxed">
                Equipamiento técnico en PRFV desarrollado para infraestructura crítica: distribución eléctrica segura con aislación dieléctrica intrínseca y reservas hídricas contra incendio de alta capacidad.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Main Spotlights Component */}
      <ProductSpotlight />

      {/* Bottom CTA */}
      <div className="border-t border-line-strong bg-paper-2 py-16 text-center">
        <div className="mx-auto max-w-3xl px-5 space-y-4">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-ink">
            ¿Solicita pliego o licitación para postes o redes contra incendio?
          </h2>
          <p className="text-steel-600 text-sm sm:text-base font-sans max-w-xl mx-auto">
            Emitimos certificados de aislación, protocolos de ensayo destructivo y memorias de cálculo para cooperativas eléctricas, municipios y aseguradoras de plantas industriales.
          </p>
          <div className="pt-2">
            <Link
              to="/cotizador"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full shadow-sm transition-all uppercase tracking-wider"
            >
              <span>Solicitar Cotización y Pliegos Técnicos</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
