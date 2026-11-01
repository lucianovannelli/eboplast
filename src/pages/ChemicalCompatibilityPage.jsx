import React from 'react';
import ChemicalCompatibility from '../components/ChemicalCompatibility';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Mail } from 'lucide-react';
import { companyInfo } from '../data/eboplastData';
import { TechLabel } from '../components/ui';
import { Reveal } from '../components/Reveal';

export default function ChemicalCompatibilityPage() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-paper-2 border-b border-line-strong pt-28 pb-14 sm:pt-36 sm:pb-20">
        <div className="blueprint absolute inset-0 opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-10">
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <TechLabel index="03">
                Ingeniería Química de Materiales Compuestos
              </TechLabel>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.98] text-ink">
                Guía de Compatibilidad Química y Resinas
              </h1>
              <p className="text-steel-600 text-base sm:text-lg font-sans leading-relaxed">
                Selección de formulaciones de resina termoestable (Viniléster, Isoftálicas y otras) diseñadas a medida según el compuesto químico y temperatura de operación.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Main Interactive Guide Component */}
      <ChemicalCompatibility />

      {/* Custom Fluid Consultation Banner */}
      <div className="border-t border-line-strong bg-paper-2 py-16">
        <div className="max-w-5xl mx-auto px-5 sm:px-10">
          <div className="overflow-hidden rounded-2xl border border-line-strong bg-paper p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-3">
              <TechLabel index="03.B">Ensayos y Trazabilidad de Resina</TechLabel>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">
                ¿Su fluido no aparece en el listado o requiere una mezcla específica?
              </h2>
              <p className="text-steel-600 text-sm font-sans max-w-xl leading-relaxed">
                Nuestro departamento técnico evalúa hojas de seguridad (MSDS), temperatura pico, concentración y diseña la barrera química interior correspondiente.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={`mailto:${companyInfo.contacts.email}?subject=Consulta%20de%20Resistencia%20Qu%C3%ADmica%20Eboplast`}
                className="inline-flex items-center gap-2 bg-ink hover:bg-brand text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full transition-colors uppercase tracking-wider"
              >
                <Mail className="size-4" />
                <span>Consultar por Email</span>
              </a>

              <Link
                to="/cotizador"
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full transition-colors uppercase tracking-wider"
              >
                <span>Cotizador Online</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
