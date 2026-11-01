import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, FlaskConical, Ruler, Cog } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionHeading } from './ui';
import { companyInfo } from '../data/eboplastData';

const STEPS = [
  {
    n: "01",
    icon: FlaskConical,
    title: "Fluido y Requerimiento",
    text: "Definimos sustancia (ácidos, fertilizantes, lácteos, agua), concentración, temperatura operativa y volumen requerido.",
  },
  {
    n: "02",
    icon: Ruler,
    title: "Cálculo y Resina Química",
    text: "Calculamos espesores estructurales según normas ASTM, BS, ASME, NBS, IRAM o CIRSOC (u otras previo estudio) y seleccionamos la resina óptima: Viniléster, Isoftálica y otras.",
  },
  {
    n: "03",
    icon: Cog,
    title: "Bobinado y Montaje",
    text: "Fabricación monolítica continua por Filament Winding sin soldadura entre fondo y cilindro (disminuyendo también el riesgo de ataque químico), ensayos de estanqueidad y despacho a planta.",
  },
];

export default function CustomWork() {
  const whatsappUrl = `https://wa.me/${companyInfo.contacts.whatsapp.number}?text=${encodeURIComponent("Hola Eboplast, tengo un requerimiento para fabricar un tanque o pieza especial en PRFV.")}`;

  return (
    <section
      id="fabricacion-especial"
      className="relative overflow-hidden border-b border-line-strong bg-paper-2 px-5 py-20 sm:px-10 sm:py-24"
    >
      {/* Grilla milimetrada de plano */}
      <div className="blueprint absolute inset-0 opacity-60 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            index="02"
            kicker="Fabricación e Ingeniería a Medida"
            title={
              <>
                ¿Necesita un tanque o pieza especial?
                <br className="hidden sm:block" /> Lo diseñamos y fabricamos.
              </>
            }
            intro="Si su proyecto requiere volúmenes específicos, bridas especiales, agitación o resistencia química severa, nuestro equipo técnico lo materializa en tres etapas rigurosas."
          />
        </Reveal>

        <Reveal className="mt-12 sm:mt-14 grid overflow-hidden rounded-2xl border border-line-strong bg-paper md:grid-cols-3 shadow-sm">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.n}
                className={[
                  "group relative p-7 sm:p-9 transition-colors hover:bg-paper-2",
                  i !== 0 ? "border-t border-line-strong md:border-l md:border-t-0" : "",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon className="size-6" />
                  </span>
                  <span className="font-display text-5xl font-extrabold text-steel-200 transition-colors group-hover:text-brand">
                    {step.n}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-xl font-bold uppercase tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">
                  {step.text}
                </p>
              </div>
            );
          })}
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/cotizador"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all duration-200 hover:bg-brand hover:-translate-y-0.5 shadow-sm"
          >
            <span>Configurar especificación técnica</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-6 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-paper-2"
          >
            <span>Consultar por WhatsApp</span>
            <ArrowUpRight className="size-4 text-steel-400" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
