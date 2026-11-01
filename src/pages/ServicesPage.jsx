import React from 'react';
import ServicesSection from '../components/ServicesSection';
import { Link } from 'react-router-dom';
import { ArrowUpRight, PhoneCall, ShieldCheck } from 'lucide-react';
import { companyInfo } from '../data/eboplastData';
import { TechLabel } from '../components/ui';
import { Reveal } from '../components/Reveal';

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-paper-2 border-b border-line-strong pt-28 pb-14 sm:pt-36 sm:pb-20">
        <div className="blueprint absolute inset-0 opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-10">
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <TechLabel index="05">
                Soporte Integral de Fábrica · Cobertura Nacional
              </TechLabel>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.98] text-ink">
                Servicios de Fabricación, Montaje y Garantía
              </h1>
              <p className="text-steel-600 text-base sm:text-lg font-sans leading-relaxed">
                Desde el asesoramiento inicial y cálculo de espesores hasta el traslado en carretones propios, izaje especializado y puesta en marcha en cualquier punto de Argentina.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Main Services Component */}
      <ServicesSection />

      {/* Direct Contact Banner */}
      <div className="border-t border-line-strong bg-paper-2 py-16">
        <div className="mx-auto max-w-4xl px-5 text-center space-y-4">
          <TechLabel index="05.B">Respaldo Formal Escrito</TechLabel>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-ink">
            Hable directamente con nuestros técnicos de planta
          </h2>
          <p className="text-steel-600 text-sm sm:text-base font-sans max-w-xl mx-auto leading-relaxed">
            Atención telefónica directa en nuestra planta de Rosario para coordinar visitas técnicas, relevamiento en obra o cotizaciones especiales.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-3">
            <a
              href={`tel:${companyInfo.contacts.phones[0].link}`}
              className="inline-flex items-center gap-2 bg-ink hover:bg-brand text-white text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full transition-colors uppercase tracking-wider"
            >
              <PhoneCall className="size-4" />
              <span>Llamar a Central: 0341 - 431 1112</span>
            </a>
            <Link
              to="/cotizador"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full transition-colors uppercase tracking-wider"
            >
              <span>Solicitar Presupuesto Online</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
