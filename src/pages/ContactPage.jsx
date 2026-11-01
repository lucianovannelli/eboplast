import React from 'react';
import ContactSection from '../components/ContactSection';
import FaqSection from '../components/FaqSection';
import { TechLabel } from '../components/ui';
import { Reveal } from '../components/Reveal';

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-paper-2 border-b border-line-strong pt-28 pb-14 sm:pt-36 sm:pb-20">
        <div className="blueprint absolute inset-0 opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-10">
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <TechLabel index="07">
                Atención Comercial y Departamento Técnico · Planta Fabril
              </TechLabel>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.98] text-ink">
                Contacto y Planta Rosario
              </h1>
              <p className="text-steel-600 text-base sm:text-lg font-sans leading-relaxed">
                Estamos a su disposición para coordinar visitas a planta, relevamientos técnicos y cotizaciones de equipamiento en PRFV para todo el país.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Main Contact Directory & Form */}
      <ContactSection />

      {/* Technical FAQ Accordion */}
      <FaqSection />
    </div>
  );
}
