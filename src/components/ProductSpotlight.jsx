import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Flame, Shield, Clock, Award, ArrowRight, MessageCircle } from 'lucide-react';
import { companyInfo } from '../data/eboplastData';

export default function ProductSpotlight() {
  const whatsappPostes = `https://wa.me/${companyInfo.contacts.whatsapp.number}?text=${encodeURIComponent("Hola! Quisiera solicitar cotización e información técnica sobre los Postes de PRFV.")}`;
  const whatsappIncendio = `https://wa.me/${companyInfo.contacts.whatsapp.number}?text=${encodeURIComponent("Hola! Quisiera solicitar cotización sobre Tanques de PRFV para Redes de Incendio.")}`;

  return (
    <section id="destacados" className="py-20 bg-white border-b border-slate-200 relative select-none">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SPOTLIGHT 1: POSTES DE PRFV */}
        <div className="p-6 sm:p-10 border border-slate-200 bg-slate-50 rounded-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left image */}
            <div className="lg:col-span-5 text-center">
              <div className="bg-white p-4 border border-slate-200 shadow-sm">
                <img 
                  src="/assets/phone_3.png" 
                  alt="Postes de PRFV Eboplast para tendidos eléctricos" 
                  className="max-h-72 mx-auto object-contain select-none"
                />
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
                  <span>Línea Urbana & Rural</span>
                  <span className="text-[#5b8314] font-bold">Aislación Clase II</span>
                </div>
              </div>
            </div>

            {/* Right content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#5b8314] uppercase tracking-wider block mb-1">
                  Distribución Eléctrica y Alumbrado
                </span>
                <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-950">
                  Postes Dieléctricos en PRFV
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed font-sans">
                  Reemplazan con ventajas contundentes al hormigón y a la madera en tendidos de media y baja tensión, telefonía y luminarias urbanas. Totalmente aislantes y sin mantenimiento.
                </p>
              </div>

              {/* Differentiated Specification Grid (Hairline rules) */}
              <div className="border border-slate-200 divide-y divide-slate-200 bg-white font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                  <div className="p-3.5 flex items-start space-x-3">
                    <Zap className="w-4 h-4 text-[#5b8314] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block text-sm">Seguridad Dieléctrica Clase II</span>
                      <span className="text-slate-600 text-xs block mt-0.5">Elimina riesgo de choque eléctrico; no requiere jabalina de tierra.</span>
                    </div>
                  </div>
                  <div className="p-3.5 flex items-start space-x-3">
                    <Shield className="w-4 h-4 text-[#5b8314] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block text-sm">Inmune a Intemperie y Salitre</span>
                      <span className="text-slate-600 text-xs block mt-0.5">No se pudre, no se oxida y resiste ataques de hongos e insectos.</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                  <div className="p-3.5 flex items-start space-x-3">
                    <Award className="w-4 h-4 text-[#5b8314] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block text-sm">Montaje e Izaje Liviano</span>
                      <span className="text-slate-600 text-xs block mt-0.5">Peso 4 veces menor al hormigón; manipulación ágil sin grúas pesadas.</span>
                    </div>
                  </div>
                  <div className="p-3.5 flex items-start space-x-3">
                    <Clock className="w-4 h-4 text-[#5b8314] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block text-sm">Flexión Mecánica Comprobada</span>
                      <span className="text-slate-600 text-xs block mt-0.5">Excelente elasticidad estructural ante vientos extremos y cargas axiales.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1 font-sans text-xs">
                <a
                  href={whatsappPostes}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#5b8314] hover:bg-[#48680f] text-white font-bold px-5 py-3 rounded-sm shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Cotizar Postes de PRFV</span>
                </a>
                <Link
                  to="/cotizador"
                  className="inline-flex items-center space-x-2 bg-white hover:bg-slate-100 text-slate-800 font-semibold px-4 py-3 border border-slate-300 rounded-sm transition-all"
                >
                  <span>Presupuesto Online</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* SPOTLIGHT 2: TANQUES DE PRFV PARA REDES DE INCENDIO */}
        <div className="p-6 sm:p-10 border border-slate-200 bg-slate-50 rounded-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left content */}
            <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
              <div>
                <span className="text-xs font-mono font-bold text-rose-700 uppercase tracking-wider block mb-1">
                  Protección Contra Incendio en Parques Industriales
                </span>
                <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-950">
                  Tanques de PRFV para Redes de Incendio
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed font-sans">
                  Almacenamiento de agua de respuesta inmediata para rociadores y líneas de hidrantes en plantas industriales, depósitos y centros logísticos.
                </p>
              </div>

              {/* Differentiated Specification Grid (Hairline rules) */}
              <div className="border border-slate-200 divide-y divide-slate-200 bg-white font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                  <div className="p-3.5 flex items-start space-x-3">
                    <Flame className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block text-sm">Capacidad de 2.500 a 250.000 L</span>
                      <span className="text-slate-600 text-xs block mt-0.5">Volúmenes adaptados a la reserva hídrica requerida por cálculo de carga de fuego.</span>
                    </div>
                  </div>
                  <div className="p-3.5 flex items-start space-x-3">
                    <Clock className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block text-sm">Cero Mantenimiento Interior</span>
                      <span className="text-slate-600 text-xs block mt-0.5">No requiere pintura periódica ni arenado. Totalmente hermético y duradero.</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                  <div className="p-3.5 flex items-start space-x-3">
                    <Shield className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block text-sm">Sin Corrosión Acuosa</span>
                      <span className="text-slate-600 text-xs block mt-0.5">Agua libre de óxido o partículas ferrosas que taponen cañerías o bombas.</span>
                    </div>
                  </div>
                  <div className="p-3.5 flex items-start space-x-3">
                    <Award className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block text-sm">Instalación Rápida en Obra</span>
                      <span className="text-slate-600 text-xs block mt-0.5">Bajo peso propio y conexiones bridadas normalizadas para electrobombas.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1 font-sans text-xs">
                <a
                  href={whatsappIncendio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-rose-700 hover:bg-rose-800 text-white font-bold px-5 py-3 rounded-sm shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar Tanque de Incendio</span>
                </a>
                <Link
                  to="/cotizador"
                  className="inline-flex items-center space-x-2 bg-white hover:bg-slate-100 text-slate-800 font-semibold px-4 py-3 border border-slate-300 rounded-sm transition-all"
                >
                  <span>Pedir Cotización</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right image */}
            <div className="lg:col-span-5 text-center order-1 lg:order-2">
              <div className="bg-white p-4 border border-slate-200 shadow-sm">
                <img 
                  src="/assets/phone_4.png" 
                  alt="Tanque de Incendio PRFV Eboplast" 
                  className="max-h-72 mx-auto object-contain select-none"
                />
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
                  <span>Reserva Hídrica Industrial</span>
                  <span className="text-rose-700 font-bold">Normas de Seguridad</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
