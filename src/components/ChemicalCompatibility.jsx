import React, { useState } from 'react';
import { Beaker, ArrowUpRight, Check, X, AlertCircle } from 'lucide-react';
import { companyInfo } from '../data/eboplastData';

export default function ChemicalCompatibility() {
  const chemicals = [
    {
      id: 'uan',
      name: 'Fertilizante UAN 32 / SolMix',
      category: 'Agroindustria',
      concentration: 'Hasta 32% N',
      resin: 'Resina Isoftálica Reforzada / Viniléster',
      tempMax: '65 °C',
      barrierThickness: '2.5 mm',
      steelCarbonStatus: 'Corrosión severa rápida por sales nitrogenadas',
      inoxStatus: 'Aceptable pero con costo 3.5x superior y peso elevado',
      eboplastAdvantage: '100% inerte. No produce óxido ni contamina la solución fertilizante con partículas férricas.'
    },
    {
      id: 'acido-clorhidrico',
      name: 'Ácido Clorhídrico (HCl)',
      category: 'Química Pesada',
      concentration: 'Hasta 33% concentración técnica',
      resin: 'Viniléster Novolac / Bisfenólica',
      tempMax: '85 °C',
      barrierThickness: '3.0 mm',
      steelCarbonStatus: 'Inviable (Destrucción inmediata)',
      inoxStatus: 'Ataque por cloruros severo (Picado y fractura)',
      eboplastAdvantage: 'Resistencia total a los iones cloruro. Cero corrosión en 25 años de servicio ininterrumpido.'
    },
    {
      id: 'acido-sulfurico',
      name: 'Ácido Sulfúrico (H₂SO₄)',
      category: 'Minería & Petroquímica',
      concentration: 'Hasta 70% dilución',
      resin: 'Viniléster Derakane® 411-350',
      tempMax: '75 °C',
      barrierThickness: '3.0 mm',
      steelCarbonStatus: 'Ataque ácido violento en concentraciones < 90%',
      inoxStatus: 'Corrosión intergranular progresiva',
      eboplastAdvantage: 'Capa rica en velo de superficie sintético antiácido C-Glass. Excelente vida útil.'
    },
    {
      id: 'soda-caustica',
      name: 'Soda Cáustica (NaOH)',
      category: 'Procesos Industriales',
      concentration: 'Hasta 50% líquida',
      resin: 'Viniléster con Velo Sintético de Poliéster',
      tempMax: '60 °C',
      barrierThickness: '2.5 mm',
      steelCarbonStatus: 'Fragilización por cáustica a temperaturas medias',
      inoxStatus: 'Aceptable a bajas temperaturas pero costoso',
      eboplastAdvantage: 'La barrera interna de velo sintético neutraliza el ataque alcalino sin desgastar la fibra interna.'
    },
    {
      id: 'lacteo',
      name: 'Leche Cruda y Suero Lácteo',
      category: 'Alimentos & Bebidas',
      concentration: 'Grado alimenticio',
      resin: 'Resina Isoftálica de Grado Sanitario / Alimenticio',
      tempMax: '45 °C (con aislación poliuretano)',
      barrierThickness: '2.0 mm (Acabado Espejo)',
      steelCarbonStatus: 'Totalmente prohibido por bromatología',
      inoxStatus: 'Aprobado pero transmite calor rápidamente y es pesado',
      eboplastAdvantage: 'Piso inclinado para descarga 100% CIP. Aislación térmica de poliuretano de 2" inyectada.'
    },
    {
      id: 'hipoclorito',
      name: 'Hipoclorito de Sodio (Cloro Industrial)',
      category: 'Tratamiento de Agua',
      concentration: '100 a 120 g/l Cl activo',
      resin: 'Viniléster Alta Resistencia Química',
      tempMax: '55 °C',
      barrierThickness: '3.0 mm',
      steelCarbonStatus: 'Inviable (Ataque oxidante extremo)',
      inoxStatus: 'Picado severo por cloruros activos',
      eboplastAdvantage: 'Diseñado bajo normas internacionales (ASTM, BS, ASME y otras) con pigmentación blanca exterior anti-degradación solar y sin soldadura entre fondo y cilindro para disminuir el riesgo de ataque químico.'
    }
  ];

  const [selectedChem, setSelectedChem] = useState(chemicals[0]);

  return (
    <section id="resinas" className="py-20 bg-white border-b border-slate-200 relative select-none">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="border-b border-slate-200 pb-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950">
              Guía de Compatibilidad Química y Resinas
            </h2>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-md">
            Consulte la selección de resina y el comportamiento del PRFV frente a fluidos agresivos comparado con el acero al carbono e inoxidable.
          </p>
        </div>

        {/* Chemical Grid Selector & Technical Data Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Chemical List Buttons (4 cols) */}
          <div className="lg:col-span-4 space-y-1.5 border border-slate-200 bg-slate-50 p-2 rounded-sm">
            <span className="font-mono text-[11px] text-slate-500 uppercase block p-1.5 font-bold">
              Compuesto a Contener:
            </span>

            {chemicals.map((chem) => {
              const isSelected = selectedChem.id === chem.id;
              return (
                <button
                  key={chem.id}
                  onClick={() => setSelectedChem(chem)}
                  className={`w-full text-left p-3 border transition-all text-xs font-mono flex items-center justify-between rounded-sm ${
                    isSelected
                      ? 'bg-white text-slate-950 border-[#5b8314] shadow-xs font-bold border-l-4'
                      : 'bg-white/80 text-slate-700 hover:bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <span className="block font-sans font-bold text-sm leading-tight text-slate-900">
                      {chem.name}
                    </span>
                    <span className="text-[11px] block mt-0.5 text-slate-500 font-normal">
                      {chem.category} • {chem.concentration}
                    </span>
                  </div>
                  <span className={`font-mono text-xs ${isSelected ? 'text-[#5b8314] font-bold' : 'text-slate-400'}`}>→</span>
                </button>
              );
            })}
          </div>

          {/* Technical Data Sheet Specimen in Light Mode (8 cols) */}
          <div className="lg:col-span-8">
            <div className="p-6 sm:p-8 bg-white border border-slate-200 shadow-sm rounded-sm">
              
              {/* Spec Sheet Header (Actual functional data labels) */}
              <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-4 mb-6 gap-2 font-mono text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] block font-semibold">FLUIDO DE ENSAYO:</span>
                  <span className="text-slate-950 text-lg font-bold font-sans">{selectedChem.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 text-[10px] block font-semibold">CATEGORÍA DE PROCESO:</span>
                  <span className="text-[#5b8314] font-bold">{selectedChem.category}</span>
                </div>
              </div>

              {/* Recommended Matrix Specs (Hairline ledger strip) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 border border-slate-200 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-slate-50/60 mb-6 font-mono text-xs">
                <div className="p-3.5">
                  <span className="text-slate-500 text-[10px] block uppercase font-semibold">Resina de Matriz:</span>
                  <span className="text-slate-950 font-bold text-sm block mt-1">{selectedChem.resin}</span>
                </div>
                <div className="p-3.5">
                  <span className="text-slate-500 text-[10px] block uppercase font-semibold">Temperatura Máxima:</span>
                  <span className="text-slate-950 font-bold text-sm block mt-1">{selectedChem.tempMax}</span>
                </div>
                <div className="p-3.5">
                  <span className="text-slate-500 text-[10px] block uppercase font-semibold">Barrera Química:</span>
                  <span className="text-[#5b8314] font-bold text-sm block mt-1">{selectedChem.barrierThickness}</span>
                </div>
              </div>

              {/* Material Behavior Spec Sheet Table (Hairline rules) */}
              <div className="mb-6">
                <span className="font-mono text-[11px] text-slate-500 uppercase block font-bold mb-2">
                  Matriz de Comportamiento Técnico por Material:
                </span>

                <div className="border border-slate-200 divide-y divide-slate-200 text-xs">
                  {/* Eboplast */}
                  <div className="p-3.5 bg-lime-50/40 flex items-start space-x-3">
                    <Check className="w-4 h-4 text-[#5b8314] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono font-bold text-[#45630e] uppercase block">
                        Eboplast S.A. (PRFV / Filament Winding):
                      </span>
                      <p className="font-sans text-xs text-slate-800 mt-1 leading-relaxed">
                        {selectedChem.eboplastAdvantage}
                      </p>
                    </div>
                  </div>

                  {/* Carbon Steel */}
                  <div className="p-3.5 bg-white flex items-start space-x-3">
                    <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono font-bold text-slate-900 uppercase block">
                        Acero al Carbono:
                      </span>
                      <p className="font-sans text-xs text-slate-600 mt-1 leading-relaxed">
                        {selectedChem.steelCarbonStatus}
                      </p>
                    </div>
                  </div>

                  {/* Stainless Steel */}
                  <div className="p-3.5 bg-white flex items-start space-x-3">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono font-bold text-slate-900 uppercase block">
                        Acero Inoxidable (AISI 304 / 316L):
                      </span>
                      <p className="font-sans text-xs text-slate-600 mt-1 leading-relaxed">
                        {selectedChem.inoxStatus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                <span className="text-slate-500 text-[11px]">
                  * Fabricamos bajo formulaciones de resina con trazabilidad certificada por lote.
                </span>
                <a
                  href={`https://wa.me/${companyInfo.contacts.whatsapp.number}?text=${encodeURIComponent(`Hola! Quisiera memoria técnica y cotización para almacenar ${selectedChem.name} en tanque de PRFV.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-[#5b8314] hover:text-[#45630e] font-bold uppercase"
                >
                  <span>SOLICITAR MEMORIA TÉCNICA PARA ESTE FLUIDO</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
