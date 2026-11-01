import React from 'react';
import { useSearchParams } from 'react-router-dom';
import QuoteCalculator from '../components/QuoteCalculator';
import { Shield, Clock, Phone } from 'lucide-react';
import { companyInfo } from '../data/eboplastData';
import { TechLabel } from '../components/ui';
import { Reveal } from '../components/Reveal';

export default function QuotePage() {
  const [searchParams] = useSearchParams();
  const preselectedProduct = searchParams.get('producto');

  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-paper-2 border-b border-line-strong pt-28 pb-14 sm:pt-36 sm:pb-20">
        <div className="blueprint absolute inset-0 opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-10">
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <TechLabel index="06">
                Configurador Técnico Online · Presupuesto Formal Inmediato
              </TechLabel>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.98] text-ink">
                Configure su Tanque o Poste en PRFV
              </h1>
              <p className="text-steel-600 text-base sm:text-lg font-sans leading-relaxed">
                Complete los 4 pasos para definir formato, volumen en litros, fluido químico y accesorios requeridos. Recibirá una memoria y presupuesto formal de fábrica.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Main 4-Step Configurator */}
      <QuoteCalculator preselectedProduct={preselectedProduct} />

      {/* Reassurance & Direct Assistance */}
      <div className="border-t border-line-strong bg-paper-2 py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="bg-paper border border-line-strong p-6 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2 text-ink font-bold mb-2">
                <Shield className="size-4 text-brand" />
                <span className="font-display uppercase tracking-tight text-sm">Garantía Escrita</span>
              </div>
              <p className="text-steel-600 text-xs font-sans leading-relaxed">
                Respaldamos cada unidad fabricada con un certificado formal de garantía por 1 año bajo normas ASTM, BS, ASME, NBS, IRAM y CIRSOC.
              </p>
            </div>

            <div className="bg-paper border border-line-strong p-6 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2 text-ink font-bold mb-2">
                <Clock className="size-4 text-brand" />
                <span className="font-display uppercase tracking-tight text-sm">Respuesta en 24 Horas</span>
              </div>
              <p className="text-steel-600 text-xs font-sans leading-relaxed">
                Revisamos la compatibilidad química y elaboramos la propuesta técnica y comercial en un plazo máximo de 24 horas hábiles.
              </p>
            </div>

            <div className="bg-paper border border-line-strong p-6 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2 text-ink font-bold mb-2">
                <Phone className="size-4 text-brand" />
                <span className="font-display uppercase tracking-tight text-sm">Asesoramiento Directo</span>
              </div>
              <p className="text-steel-600 text-xs font-sans leading-relaxed">
                ¿Dudas sobre dimensiones o bateas existentes? Comuníquese directamente a planta: <strong>0341 - 431 1112</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
