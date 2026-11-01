import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Check, X, AlertTriangle, ArrowRight, Gauge } from 'lucide-react';
import { differentialFeatures, comparisonPoints } from '../data/eboplastData';

export default function Differentials() {
  const [liquidLevel, setLiquidLevel] = useState(85);
  const [fluidType, setFluidType] = useState('fertilizante');

  const densities = {
    agua: { name: 'Agua Potable', rho: 1.00, color: 'from-blue-500/80 to-blue-700/90' },
    fertilizante: { name: 'Fertilizante UAN / SolMix', rho: 1.32, color: 'from-emerald-600/80 to-teal-800/90' },
    acido: { name: 'Ácido Químico Concentrado', rho: 1.84, color: 'from-amber-600/80 to-rose-700/90' }
  };

  const currentFluid = densities[fluidType];
  const tankHeightMeters = 8.5;
  const heightFilled = (tankHeightMeters * (liquidLevel / 100)).toFixed(1);
  const bottomPressureKPa = (currentFluid.rho * 9.81 * heightFilled).toFixed(1);

  return (
    <section id="diferenciales" className="py-20 lg:py-24 bg-white border-b border-slate-200 relative overflow-hidden select-none">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
            Física Hidrostática y Cero Soldaduras en la Base
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-sans">
            La mayor presión hidrostática (<span className="font-mono text-xs font-semibold bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded border border-slate-200">P = ρ · g · h</span>) siempre se concentra en el fondo. Al no haber soldadura entre fondo y cilindro, el diseño monolítico de Eboplast elimina el punto crítico de rotura y disminuye también el riesgo de ataque químico.
          </p>
        </div>

        {/* SIMULADOR INTERACTIVO DE PRESIÓN HIDROSTÁTICA */}
        <div id="simulador" className="tech-panel-light p-6 sm:p-10 border border-slate-200 shadow-xl bg-white mb-20 rounded-sm">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 mb-8">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#5b8314] uppercase tracking-wider mb-1">
                <Gauge className="w-4 h-4" />
                <span>Simulador de Resistencia Estructural</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-950">
                Comportamiento ante Presión Hidrostática (P = ρ · g · h)
              </h3>
            </div>

            {/* Controls: Fluid type & slider */}
            <div className="flex flex-wrap items-center gap-4 bg-slate-50 p-3 border border-slate-200 rounded-sm">
              
              {/* Fluid selector */}
              <div className="text-xs">
                <span className="text-slate-500 block text-[10px] font-mono uppercase font-bold mb-1">Fluido:</span>
                <div className="flex space-x-1">
                  {Object.entries(densities).map(([key, item]) => (
                    <button
                      key={key}
                      onClick={() => setFluidType(key)}
                      className={`px-2.5 py-1 text-xs font-mono font-bold transition-colors rounded-sm ${
                        fluidType === key
                          ? 'bg-[#5b8314] text-white'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {key === 'agua' ? 'Agua' : key === 'fertilizante' ? 'Fertilizante' : 'Ácido'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for volume / level */}
              <div className="text-xs min-w-[180px]">
                <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase font-bold mb-1">
                  <span>Nivel de Carga:</span>
                  <span className="text-[#5b8314] font-bold">{liquidLevel}% ({heightFilled}m)</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={liquidLevel}
                  onChange={(e) => setLiquidLevel(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#5b8314]"
                />
              </div>

            </div>

          </div>

          {/* 3 Tank Interactive Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* 1. EBOPLAST (WINNER) */}
            <div className="p-5 bg-lime-50/40 border-2 border-[#5b8314] shadow-sm rounded-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-black uppercase px-2 py-0.5 bg-[#5b8314] text-white rounded-sm">
                  EBOPLAST S.A.
                </span>
                <span className="text-[10px] font-mono font-bold text-[#5b8314] bg-white px-2 py-0.5 border border-lime-300">
                  100% SEGURO
                </span>
              </div>

              {/* Interactive Visual Tank with dynamic fluid filling */}
              <div className="relative mx-auto w-36 h-64 bg-slate-100 rounded-t-3xl rounded-b-sm border-2 border-slate-300 flex flex-col justify-end overflow-hidden shadow-inner my-3">
                
                {/* Top Weld line - OUT OF LIQUID ZONE */}
                <div className="absolute top-3 inset-x-0 h-3.5 bg-rose-600 flex items-center justify-center z-20 shadow-sm">
                  <span className="text-[8px] text-white font-mono font-bold uppercase tracking-tighter">
                    Soldadura en Techo (0 kPa)
                  </span>
                </div>

                {/* Liquid fill container */}
                <div 
                  className={`w-full bg-gradient-to-t ${currentFluid.color} transition-all duration-300 relative`}
                  style={{ height: `${liquidLevel}%` }}
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-white/40 animate-pulse" />
                  <div className="absolute bottom-2 inset-x-0 text-center text-[9px] font-mono text-white font-bold">
                    Cuerpo Continuo
                  </div>
                </div>

                {/* Bottom Base (Monolithic) */}
                <div className="absolute bottom-0 inset-x-0 py-1 bg-emerald-600 border-t border-emerald-500 text-center text-[9px] font-mono font-bold text-white z-10">
                  Base sin soldadura
                </div>
              </div>

              {/* Stress Analysis Card */}
              <div className="space-y-1.5 pt-3 border-t border-slate-200 text-xs font-mono">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Presión en Soldadura:</span>
                  <span className="text-[#5b8314] font-bold">0.00 kPa</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Presión en Fondo:</span>
                  <span className="text-slate-900 font-bold">{bottomPressureKPa} kPa</span>
                </div>
                <div className="p-2 bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 font-sans mt-2 flex items-start space-x-1.5">
                  <Check className="w-4 h-4 text-[#5b8314] shrink-0 mt-0.5" />
                  <span>Sin soldadura entre fondo y cilindro: absorbe la presión hidrostática sin fatiga y disminuye el riesgo de ataque químico.</span>
                </div>
              </div>

            </div>

            {/* 2. COMPETIDOR A (Weld in the middle) */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 bg-slate-200 text-slate-700 rounded-sm">
                  COMPETIDOR A
                </span>
                <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 border border-amber-200">
                  RIESGO MEDIO
                </span>
              </div>

              {/* Interactive Visual Tank */}
              <div className="relative mx-auto w-36 h-64 bg-slate-100 rounded-t-3xl rounded-b-sm border border-slate-300 flex flex-col justify-end overflow-hidden shadow-inner my-3">
                
                {/* Middle Weld line */}
                <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-3.5 bg-amber-500 flex items-center justify-center z-20 shadow-sm">
                  <span className="text-[8px] text-white font-mono font-bold uppercase tracking-tighter">
                    Soldadura a Media Altura
                  </span>
                </div>

                {/* Liquid fill */}
                <div 
                  className={`w-full bg-gradient-to-t ${currentFluid.color} transition-all duration-300 relative`}
                  style={{ height: `${liquidLevel}%` }}
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-white/30" />
                </div>
              </div>

              {/* Stress Analysis Card */}
              <div className="space-y-1.5 pt-3 border-t border-slate-200 text-xs font-mono">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Presión en Soldadura:</span>
                  <span className="text-amber-700 font-bold">
                    {liquidLevel > 50 ? `${(bottomPressureKPa * 0.5).toFixed(1)} kPa` : '0.0 kPa'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Presión en Fondo:</span>
                  <span className="text-slate-900 font-bold">{bottomPressureKPa} kPa</span>
                </div>
                <div className="p-2 bg-amber-50 border border-amber-200 text-[11px] text-amber-800 font-sans mt-2 flex items-start space-x-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>La costura a media altura sufre flexión lateral con cargas cíclicas de llenado.</span>
                </div>
              </div>

            </div>

            {/* 3. COMPETIDOR B (Weld at the bottom) */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 bg-slate-200 text-slate-700 rounded-sm">
                  COMPETIDOR B
                </span>
                <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 border border-rose-200">
                  FALLA CRÍTICA
                </span>
              </div>

              {/* Interactive Visual Tank */}
              <div className="relative mx-auto w-36 h-64 bg-slate-100 rounded-t-3xl rounded-b-sm border border-slate-300 flex flex-col justify-end overflow-hidden shadow-inner my-3">
                
                {/* Liquid fill */}
                <div 
                  className={`w-full bg-gradient-to-t ${currentFluid.color} transition-all duration-300 relative`}
                  style={{ height: `${liquidLevel}%` }}
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-white/30" />
                </div>

                {/* Bottom Weld line - DIRECT HIT BY MAX PRESSURE */}
                <div className={`absolute bottom-0 inset-x-0 h-4 bg-rose-600 flex items-center justify-center z-20 shadow-sm ${liquidLevel > 50 ? 'animate-pulse' : ''}`}>
                  <span className="text-[8px] text-white font-mono font-bold uppercase tracking-tighter">
                    Soldadura en Fondo ({bottomPressureKPa} kPa)
                  </span>
                </div>
              </div>

              {/* Stress Analysis Card */}
              <div className="space-y-1.5 pt-3 border-t border-slate-200 text-xs font-mono">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Presión en Soldadura:</span>
                  <span className="text-rose-700 font-bold">{bottomPressureKPa} kPa</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Riesgo de Fisura:</span>
                  <span className="text-rose-700 font-bold">MÁXIMO ({liquidLevel}%)</span>
                </div>
                <div className="p-2 bg-rose-50 border border-rose-200 text-[11px] text-rose-800 font-sans mt-2 flex items-start space-x-1.5">
                  <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>La unión en la base soporta el 100% de la masa líquida, provocando delaminación y pérdidas.</span>
                </div>
              </div>

            </div>

          </div>

          <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4 font-mono">
            <p>
              💡 <strong>Conclusión Técnica:</strong> Al no haber soldadura entre fondo y cilindro y ubicar la unión en el techo torisférico, se aísla la costura de la presión hidrostática y se disminuye también el riesgo de ataque químico.
            </p>
            <Link
              to="/cotizador"
              className="inline-flex items-center space-x-1 text-[#5b8314] hover:text-[#45630e] font-bold shrink-0"
            >
              <span>COTIZAR CON INGENIERÍA EBOPLAST</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* PROCESO FILAMENT WINDING: CÓMO SE FABRICA */}
        <div className="p-8 sm:p-10 border border-slate-200 bg-slate-50 mb-20 rounded-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono font-bold text-[#5b8314] uppercase tracking-wider block">
                Manufactura Robotizada
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-950">
                Sistema Filament Winding (Normas ASTM, BS, ASME, NBS, IRAM, CIRSOC)
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                Consiste en la aplicación computarizada de hebras continuas de fibra de vidrio (*rovings*) que se impregnan en resina polimérica y se ovillan sobre un mandril giratorio bajo tensión constante. Aparte de las normas ASTM, trabajamos con BS, ASME, NBS, IRAM y CIRSOC; y previo estudio podemos trabajar con cualquier otra norma o reglamento.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-sans">
                <div className="p-3.5 bg-white border border-slate-200 rounded-sm">
                  <span className="font-bold text-slate-950 block mb-1">Ángulo Helicoidal Calculado</span>
                  <span className="text-slate-600">Orientación de fibras para resistir fuerzas circunferenciales y axiales simultáneas.</span>
                </div>
                <div className="p-3.5 bg-white border border-slate-200 rounded-sm">
                  <span className="font-bold text-slate-950 block mb-1">4.4x Más Liviano que Acero</span>
                  <span className="text-slate-600">Estructura ultra resistente con mínimo peso, abaratando fletes y maniobras de grúa.</span>
                </div>
              </div>
            </div>

            {/* Visual breakdown diagram */}
            <div className="lg:col-span-6 p-6 bg-white border border-slate-200 text-center space-y-4 rounded-sm shadow-sm">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Estructura Laminar del Tanque en PRFV
              </h4>
              
              {/* 3 Layer graphic */}
              <div className="space-y-2 text-left font-mono">
                <div className="p-3 bg-emerald-50 border border-emerald-200 flex items-center justify-between rounded-sm">
                  <div>
                    <span className="text-xs font-bold text-emerald-900 block">1. Barrera Química Interior (Gelcoat / Velo)</span>
                    <span className="text-[11px] text-emerald-700 font-sans">Rica en resina pura (80-90%). Inerte a ácidos, cloruros y bacterias.</span>
                  </div>
                  <span className="text-xs text-emerald-800 shrink-0 font-bold">1.5 a 2.5 mm</span>
                </div>

                <div className="p-3 bg-lime-50 border border-lime-200 flex items-center justify-between rounded-sm">
                  <div>
                    <span className="text-xs font-bold text-[#45630e] block">2. Capa Estructural Mecánica (Filament Winding)</span>
                    <span className="text-[11px] text-[#5b8314] font-sans">Fibras continuas cruzadas pretensadas. Soporta las cargas hidrostáticas.</span>
                  </div>
                  <span className="text-xs text-[#5b8314] shrink-0 font-bold">ASTM · BS · ASME</span>
                </div>

                <div className="p-3 bg-sky-50 border border-sky-200 flex items-center justify-between rounded-sm">
                  <div>
                    <span className="text-xs font-bold text-sky-900 block">3. Revestimiento Exterior Anti-UV</span>
                    <span className="text-[11px] text-sky-700 font-sans">Pigmentación con inhibidores ultravioleta para más de 20 años a la intemperie.</span>
                  </div>
                  <span className="text-xs text-sky-800 shrink-0 font-bold">Protección Total</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Capability Ledger Grid (Differentiated treatment, not uniform SaaS cards) */}
        <div className="border border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20">
          {differentialFeatures.map((feat, idx) => (
            <div 
              key={feat.id}
              className="p-6 sm:p-7 flex flex-col justify-between hover:bg-slate-50/70 transition-colors border-b lg:border-b-0 border-slate-200 last:border-b-0"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 p-2 bg-slate-50 border border-slate-200 rounded-sm">
                    <img src={feat.icon} alt={feat.title} className="w-full h-full object-contain" />
                  </div>
                  <span className="font-mono text-[11px] text-[#5b8314] font-semibold tracking-wider">
                    [{feat.badge}]
                  </span>
                </div>

                <h4 className="font-display text-lg font-bold text-slate-950 mb-1.5">
                  {feat.title}
                </h4>

                <p className="text-xs font-semibold text-slate-700 mb-2 font-sans">
                  {feat.shortDesc}
                </p>

                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {feat.fullDesc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Ref. EBO-0{idx + 1}</span>
                <span className="text-slate-900 font-medium">Especificación Fabril</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Comparison Table in Light Mode */}
        <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-sm shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-950">
              Cuadro Comparativo: Eboplast vs Alternativas Convencionales
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-mono">
              ¿Por qué las empresas líderes eligen la ingeniería de Eboplast S.A.?
            </p>
          </div>

          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full min-w-[620px] text-left border-collapse text-xs sm:text-sm font-sans">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono">
                  <th className="pb-3 px-4 font-semibold uppercase text-xs">Aspecto Técnico</th>
                  <th className="pb-3 px-4 font-bold text-[#5b8314] uppercase text-xs bg-lime-50 border-x border-lime-200">
                    Eboplast S.A. (PRFV)
                  </th>
                  <th className="pb-3 px-4 font-semibold text-slate-600 uppercase text-xs">
                    Competidores / Tanques de Chapa
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonPoints.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-900 font-mono text-xs">
                      {row.aspect}
                    </td>
                    <td className="py-4 px-4 text-slate-900 font-medium bg-lime-50/50 border-x border-lime-100">
                      <div className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-[#5b8314] shrink-0 mt-0.5" />
                        <span>{row.eboplast}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      <div className="flex items-start space-x-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{row.competitors}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </section>
  );
}
