import React from 'react';
import Differentials from '../components/Differentials';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { TechLabel, SectionHeading } from '../components/ui';
import { Reveal } from '../components/Reveal';

export default function TechnologyPage() {
  return (
    <div className="bg-white">
      {/* Page Hero Strip con blueprint */}
      <div className="relative overflow-hidden bg-paper-2 border-b border-line-strong pt-28 pb-14 sm:pt-36 sm:pb-20">
        <div className="blueprint absolute inset-0 opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-10">
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <TechLabel index="01">
                Ingeniería en Materiales Compuestos · Normas ASTM, BS, ASME, NBS, IRAM, CIRSOC
              </TechLabel>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.98] text-ink">
                Tecnología de Fabricación y Soldadura Superior
              </h1>
              <p className="text-steel-600 text-base sm:text-lg font-sans leading-relaxed">
                Por qué la física hidrostática exige eliminar las costuras entre fondo y cilindro —disminuyendo también el riesgo de ataque químico— y cómo el bobinado Filament Winding automatizado multiplica la vida útil frente a la fatiga y corrosión severa.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Main Technology & Simulator Component */}
      <Differentials />

      {/* Bottom CTA to Quote or Products */}
      <div className="border-t border-line-strong bg-paper-2 py-16 text-center">
        <div className="mx-auto max-w-4xl px-5 space-y-4">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-ink">
            ¿Listo para especificar un tanque con soldadura superior?
          </h2>
          <p className="text-steel-600 text-sm sm:text-base font-sans max-w-xl mx-auto">
            Utilice nuestro configurador online para definir dimensiones exactas o consulte nuestro catálogo completo de aplicaciones industriales.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-3">
            <Link
              to="/cotizador"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full shadow-sm transition-all uppercase tracking-wider"
            >
              <span>Configurar Presupuesto Online</span>
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 bg-white hover:bg-paper text-ink text-xs sm:text-sm font-semibold px-6 py-3.5 border border-line-strong rounded-full transition-colors uppercase tracking-wider"
            >
              <span>Ver Catálogo de Productos</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
