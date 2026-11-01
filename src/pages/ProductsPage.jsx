import React from 'react';
import ProductsSection from '../components/ProductsSection';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calculator } from 'lucide-react';
import { TechLabel } from '../components/ui';
import { Reveal } from '../components/Reveal';

export default function ProductsPage() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-paper-2 border-b border-line-strong pt-28 pb-14 sm:pt-36 sm:pb-20">
        <div className="blueprint absolute inset-0 opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-10">
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <TechLabel index="02">
                Catálogo Industrial · Normas ASTM, BS, ASME, NBS, IRAM y CIRSOC
              </TechLabel>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.98] text-ink">
                Líneas de Tanques y Postes en PRFV
              </h1>
              <p className="text-steel-600 text-base sm:text-lg font-sans leading-relaxed">
                Equipos de alta prestación química y mecánica desde 1.000 L hasta 250.000 L para la agroindustria, química pesada, minería, industria láctea y servicios públicos.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Catalog Component */}
      <ProductsSection />

      {/* Bottom CTA to Configurator */}
      <div className="border-t border-line-strong bg-paper-2 py-16 text-center">
        <div className="mx-auto max-w-3xl px-5 space-y-4">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-ink">
            ¿Necesita un tanque con medidas o accesorios a medida?
          </h2>
          <p className="text-steel-600 text-sm sm:text-base font-sans max-w-xl mx-auto">
            Fabricamos diámetros especiales y alturas según planos de planta o bateas existentes. Configure su equipo en nuestro cotizador online.
          </p>
          <div className="pt-2">
            <Link
              to="/cotizador"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full shadow-sm transition-all uppercase tracking-wider"
            >
              <Calculator className="size-4" />
              <span>Abrir Configurador Online</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
