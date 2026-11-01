import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Gauge, 
  Beaker, 
  Calculator, 
  ShieldCheck, 
  Check, 
  ChevronRight 
} from 'lucide-react';
import Hero from '../components/Hero';
import IndustryMarquee from '../components/IndustryMarquee';
import CustomWork from '../components/CustomWork';
import { SectionHeading, TechLabel } from '../components/ui';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal';
import PlantMap from '../components/PlantMap';
import { productCategories, companyInfo } from '../data/eboplastData';

export default function HomePage() {
  const previewCategories = productCategories.slice(0, 4);

  return (
    <div className="space-y-0">
      {/* 00: Hero Principal */}
      <Hero />

      {/* Marquee de Industrias / TrustBar (2 columnas) */}
      <IndustryMarquee />

      {/* 01: Diferencial de Ingeniería & Cero Soldadura en Fondo */}
      <section className="relative overflow-hidden border-b border-line-strong bg-paper px-5 py-20 sm:px-10 sm:py-24">
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              index="01"
              kicker="Ingeniería Estructural Exclusiva"
              title={
                <>
                  ¿Por qué los tanques Eboplast
                  <br className="hidden sm:block" /> no tienen soldaduras en el fondo?
                </>
              }
              intro="La mayor presión hidrostática (P = ρ · g · h) siempre se concentra en el fondo del tanque. Al fabricar el cilindro y el fondo en una sola pieza monolítica por Filament Winding, eliminamos el punto donde fallan los tanques convencionales y disminuimos también el riesgo de ataque químico."
            />
          </Reveal>

          <div className="mt-12 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Explicación Técnica */}
            <Reveal className="lg:col-span-6 space-y-6">
              <p className="text-base text-steel-600 leading-relaxed font-sans">
                En Eboplast el fondo plano y el cilindro se conforman simultáneamente sobre matricería de gran porte. Al no haber soldadura entre fondo y cilindro, se disminuye el riesgo de ataque químico y la única unión soldada se traslada al casquete superior torisférico, donde la carga del líquido es exactamente <strong className="text-ink">0 kPa</strong>.
              </p>

              <div className="space-y-3 font-sans text-sm text-steel-600">
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <Check className="size-3.5" />
                  </span>
                  <span><strong>Sin riesgo de fisura en base:</strong> Cero tensiones residuales térmicas en la zona sometida a la columna hidrostática.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <Check className="size-3.5" />
                  </span>
                  <span><strong>Menor riesgo de ataque químico:</strong> Al no haber soldadura entre fondo y cilindro, la barrera química interior permanece continua e inalterable frente a ácidos, fertilizantes y otros fluidos.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <Check className="size-3.5" />
                  </span>
                  <span><strong>Múltiples Normas Internacionales:</strong> Aparte de las normas ASTM, trabajamos con BS, ASME, NBS, IRAM y CIRSOC. Previo estudio podemos trabajar con cualquier otra norma o reglamento.</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/tecnologia"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-brand hover:-translate-y-0.5"
                >
                  <span>Ver Explicación Técnica y Simulador</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>

            {/* Comparativa Estructural (Card de Spec Sheet) */}
            <Reveal className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl border border-line-strong bg-paper-2 p-6 sm:p-8">
                <div className="flex items-center justify-between pb-4 border-b border-line-strong">
                  <TechLabel index="01.A">Análisis Comparativo</TechLabel>
                  <span className="font-mono text-xs text-steel-500">ASTM · BS · ASME vs Típico</span>
                </div>

                <div className="mt-5 space-y-4">
                  {/* Eboplast */}
                  <div className="rounded-xl border border-brand/30 bg-white p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-black uppercase text-ink">Eboplast S.A.</span>
                      <span className="font-mono text-[11px] font-bold text-brand bg-brand-soft px-2 py-0.5 rounded-full border border-brand/20">
                        0 Esfuerzo en Fondo
                      </span>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-steel-600 font-sans">
                      Fondo y cilindro en una sola pieza continua. Sin soldadura inferior, disminuyendo el riesgo de ataque químico y ubicando la única unión arriba (0 kPa).
                    </p>
                  </div>

                  {/* Convencional */}
                  <div className="rounded-xl border border-line-strong bg-white p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold uppercase text-steel-500">Fabricación Convencional</span>
                      <span className="font-mono text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                        Punto Crítico de Falla
                      </span>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-steel-500 font-sans">
                      Costura soldada perimetral en la base, sometida al 100% del empuje y peso del fluido en reposo o agitación constante.
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-line-strong flex items-center justify-between text-xs font-mono text-steel-500">
                  <span>Presión en Base: <strong className="text-brand font-bold">Sin Soldadura</strong></span>
                  <span>Garantía: <strong className="text-ink">1 Año Certificada</strong></span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02: Fabricación a Medida (Proceso en 3 Pasos tipo tuttiRosca CustomWork) */}
      <CustomWork />

      {/* 03: Herramientas Técnicas Interactivas */}
      <section className="relative overflow-hidden border-b border-line-strong bg-paper px-5 py-20 sm:px-10 sm:py-24">
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              index="03"
              kicker="Herramientas de Cálculo y Consulta"
              title={
                <>
                  Ingeniería Digital a su Disposición
                </>
              }
              intro="Herramientas desarrolladas por nuestro departamento técnico para evaluar resistencia química, simular esfuerzos de fluidos y configurar especificaciones completas."
            />
          </Reveal>

          <RevealGroup className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Simulador */}
            <RevealItem className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-line-strong bg-paper-2 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_20px_40px_-20px_rgba(12,13,15,0.2)]">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white border border-line-strong text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <Gauge className="size-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-tight text-ink">
                  Simulador de Presión
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600 font-sans">
                  Calcule el gradiente de presión según densidad (1.0 a 1.84 g/cm³) y altura del tanque. Compruebe la curva de fatiga hidrostática en tiempo real.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-line-strong">
                <Link
                  to="/tecnologia#simulador"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-ink transition-colors group-hover:text-brand"
                >
                  <span>Probar Simulador</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </RevealItem>

            {/* Matriz Química */}
            <RevealItem className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-line-strong bg-paper-2 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_20px_40px_-20px_rgba(12,13,15,0.2)]">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white border border-line-strong text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <Beaker className="size-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-tight text-ink">
                  Matriz Química
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600 font-sans">
                  Consulte el comportamiento de resinas Viniléster, Isoftálicas y otras frente a ácido clorhídrico, sulfúrico, fertilizantes UAN, soda cáustica y leche.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-line-strong">
                <Link
                  to="/compatibilidad-quimica"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-ink transition-colors group-hover:text-brand"
                >
                  <span>Ver Tabla de Resinas</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </RevealItem>

            {/* Cotizador */}
            <RevealItem className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-brand bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(91,131,20,0.3)] shadow-xs">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <Calculator className="size-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-tight text-ink">
                  Configurador en 4 Pasos
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600 font-sans">
                  Especifique volumen requerido, orientación (vertical/horizontal), fluido a contener y accesorios para generar una cotización formal inmediata.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-brand-border">
                <Link
                  to="/cotizador"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand hover:text-brand-hover"
                >
                  <span>Configurar Presupuesto</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </RevealItem>
          </RevealGroup>

          {/* Circuito Digital de Pedido, Aprobación de Plano y Registro Virtual */}
          <Reveal className="mt-8">
            <div className="overflow-hidden rounded-2xl border-2 border-ink bg-ink text-paper p-7 sm:p-9 relative">
              <div className="blueprint-dark absolute inset-0 opacity-35 pointer-events-none" />
              <div className="relative grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/20 border border-brand/40 rounded-full font-mono text-[10px] uppercase tracking-widest text-brand-bright font-bold">
                    <span>NUEVO · TRAZABILIDAD DIGITAL DE VENTA Y FABRICACIÓN CON AVISOS POR MAIL</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight">
                    Portal de Seguimiento, Aprobación de Planos y Registro Virtual del Tanque
                  </h3>
                  <p className="text-sm text-paper/80 font-sans leading-relaxed max-w-2xl">
                    Digitalizamos todo el ida y vuelta técnico y comercial con notificaciones por correo electrónico en cada hito: <strong>1. Requerimiento Técnico</strong> → <strong>2. Presupuesto y Condiciones</strong> → <strong>3. Carga de Orden de Compra</strong> → <strong>4. Revisión y Aprobación de Plano</strong> → <strong>5. Construcción</strong> → <strong>6. Registro Virtual Perpetuo</strong> con N° de serie y certificado de garantía.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
                    <Link
                      to="/seguimiento/EBO-2026-1048"
                      className="p-2.5 bg-white/5 hover:bg-white/15 border border-white/15 rounded-lg transition-colors"
                    >
                      <span className="text-brand-bright block font-bold">EBO-2026-1048</span>
                      <span className="text-paper/70 text-[10px]">Etapa 4: Aprobar Plano 50m³</span>
                    </Link>
                    <Link
                      to="/seguimiento/EBO-2026-1035"
                      className="p-2.5 bg-white/5 hover:bg-white/15 border border-white/15 rounded-lg transition-colors"
                    >
                      <span className="text-brand-bright block font-bold">EBO-2026-1035</span>
                      <span className="text-paper/70 text-[10px]">Etapa 6: Registro Virtual Final</span>
                    </Link>
                    <Link
                      to="/seguimiento/EBO-2026-1051"
                      className="p-2.5 bg-white/5 hover:bg-white/15 border border-white/15 rounded-lg transition-colors col-span-2 sm:col-span-1"
                    >
                      <span className="text-brand-bright block font-bold">EBO-2026-1051</span>
                      <span className="text-paper/70 text-[10px]">Etapa 2: Subir Orden Compra</span>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                  <Link
                    to="/seguimiento"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-xs font-display font-bold uppercase tracking-widest text-white hover:bg-brand-hover transition-all"
                  >
                    <span>Ingresar al Portal del Cliente</span>
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    to="/gestion"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-white/15 transition-all"
                  >
                    <span>Panel de Gestión Eboplast (Fábrica)</span>
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 04: Catálogo de Productos y Fichas Técnicas */}
      <section className="relative overflow-hidden border-b border-line-strong bg-paper-2 px-5 py-20 sm:px-10 sm:py-24">
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <SectionHeading
                index="04"
                kicker="Líneas de Fabricación en PRFV"
                title="Catálogo de Tanques y Postes"
                intro="Matricería propia de hasta 4.700 mm de diámetro y capacidades unitarias de hasta 250.000 litros bajo normas ASTM, BS, ASME, NBS, IRAM y CIRSOC."
              />
              <Link
                to="/productos"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-ink hover:text-brand shrink-0 pb-1"
              >
                <span>Ver todas las líneas</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          <RevealGroup className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewCategories.map((cat, idx) => (
              <RevealItem key={cat.id}>
                <Link
                  to="/productos"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line-strong bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_20px_40px_-20px_rgba(12,13,15,0.25)]"
                >
                  {/* Imagen */}
                  <div className="relative aspect-[4/3] w-full bg-paper-2 border-b border-line-strong flex items-center justify-center p-4">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="size-full object-contain select-none transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3">
                      <TechLabel index={`0${idx + 1}`}>{cat.id.toUpperCase()}</TechLabel>
                    </span>
                  </div>

                  {/* Contenido */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="font-display text-lg font-bold uppercase tracking-tight text-ink group-hover:text-brand transition-colors">
                        {cat.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-steel-600 line-clamp-2 font-sans">
                        {cat.tagline}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-line-strong flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-ink group-hover:text-brand">
                        Ver Medidas
                      </span>
                      <span className="grid size-7 place-items-center rounded-full border border-line-strong text-steel-500 transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-12 text-center">
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-brand hover:-translate-y-0.5 shadow-sm"
            >
              <span>Explorar Tablas Dimensionales y Catálogo Completo</span>
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 05: Ubicación de Planta & Logística Nacional (Mapa al estilo tuttiRosca) */}
      <section className="relative overflow-hidden border-b border-line-strong bg-paper px-5 py-20 sm:px-10 sm:py-24">
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              index="05"
              kicker="Planta Industrial Rosario · Cobertura Nacional"
              title="Ubicación y Despacho a Todo el País"
              intro="Nuestra nave fabril en Av. Pte. Perón 5938 cuenta con matricería de gran porte, puente grúa para izaje pesado, playa de maniobras para bateas y salida directa hacia las principales rutas y corredores industriales."
            />
          </Reveal>

          <div className="mt-12 sm:mt-14">
            <PlantMap index="05.A" />
          </div>
        </div>
      </section>

      {/* 06: Respaldo y Contacto (Dark Blueprint Banner) */}
      <section className="relative overflow-hidden bg-ink text-white px-5 py-20 sm:px-10 sm:py-24">
        <div className="blueprint-dark absolute inset-0 opacity-40 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <TechLabel index="06" dark>
                Fábrica en Rosario, Santa Fe · Cobertura Nacional
              </TechLabel>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[0.98]">
                ¿Tiene un proyecto industrial o requerimiento especial?
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-white/70 font-sans">
                Nuestro departamento de ingeniería realiza el cálculo de espesores según fluido, trabaja con normas ASTM, BS, ASME, NBS, IRAM y CIRSOC (o cualquier otra norma o reglamento previo estudio) y gestiona la logística con izaje en destino.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              <Link
                to="/cotizador"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-hover text-white font-semibold uppercase tracking-wider px-7 py-4 text-xs sm:text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
              >
                <span>Configurar Cotización</span>
                <ArrowUpRight className="size-4" />
              </Link>

              <Link
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold uppercase tracking-wider px-6 py-4 text-xs sm:text-sm transition-colors"
              >
                <span>Canales de Contacto</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
