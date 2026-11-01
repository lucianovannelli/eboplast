import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Search, 
  ArrowRight, 
  MessageCircle, 
  Layers, 
  Droplet, 
  Truck, 
  Zap, 
  Flame, 
  Sliders, 
  Maximize2,
  Crosshair
} from 'lucide-react';
import { productCategories, companyInfo } from '../data/eboplastData';

export default function ProductsSection({ onSelectProductForQuote }) {
  const navigate = useNavigate();
  const [selectedCatId, setSelectedCatId] = useState(productCategories[0].id);
  const [searchDim, setSearchDim] = useState('');
  const [selectedCapacityIndex, setSelectedCapacityIndex] = useState(0);

  const currentCategory = productCategories.find(c => c.id === selectedCatId) || productCategories[0];

  const filteredDimensions = currentCategory.dimensions.filter(d => 
    d.cap.toLowerCase().includes(searchDim.toLowerCase()) ||
    d.dia.toLowerCase().includes(searchDim.toLowerCase()) ||
    d.h.toLowerCase().includes(searchDim.toLowerCase())
  );

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'quimicos': return <Layers className="w-4 h-4" />;
      case 'lacteos': return <Droplet className="w-4 h-4" />;
      case 'agua': return <Droplet className="w-4 h-4" />;
      case 'transporte': return <Truck className="w-4 h-4" />;
      case 'postes': return <Zap className="w-4 h-4" />;
      case 'incendio': return <Flame className="w-4 h-4" />;
      default: return <Sliders className="w-4 h-4" />;
    }
  };

  const createWhatsAppLink = (categoryName) => {
    const msg = `Hola Eboplast! Quisiera recibir información técnica y cotización sobre ${categoryName}.`;
    return `https://wa.me/${companyInfo.contacts.whatsapp.number}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="productos" className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200 relative select-none">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
            Catálogo de Tanques y Postes en PRFV
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-sans">
            Especificaciones dimensionales y capacidades fabricadas bajo normas ASTM, BS, ASME, NBS, IRAM y CIRSOC (y cualquier otra norma o reglamento previo estudio).
          </p>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          {productCategories.map((cat) => {
            const isActive = cat.id === selectedCatId;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCatId(cat.id);
                  setSearchDim('');
                  setSelectedCapacityIndex(0);
                }}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-sm text-xs font-mono font-bold whitespace-nowrap transition-all duration-150 shrink-0 ${
                  isActive
                    ? 'bg-[#5b8314] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display Container in Light Mode */}
        <div className="p-6 sm:p-10 border border-slate-200 bg-white shadow-xl rounded-sm">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Product Details, Features and Optionals */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <span className="text-xs font-mono font-bold text-[#5b8314] uppercase tracking-wider block mb-1">
                  Especificación de Producto
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">
                  {currentCategory.name}
                </h3>
                <p className="text-sm font-semibold text-[#5b8314] mt-1 font-sans">
                  {currentCategory.tagline}
                </p>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                {currentCategory.description}
              </p>

              {/* Key Features Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase font-bold text-slate-500 tracking-wider">
                  Especificaciones Principales:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentCategory.features.map((feat, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-800 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-[#5b8314] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Accessories (Spec list with hairline) */}
              <div className="pt-3 border-t border-slate-200">
                <h4 className="text-xs font-mono uppercase font-bold text-slate-500 tracking-wider mb-2">
                  Configuraciones y Opcionales de Montaje:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-sans">
                  {currentCategory.optionals.map((opt, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-[#5b8314] font-bold mt-0.5">•</span>
                      <span>{opt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Actions */}
              <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs">
                <a
                  href={createWhatsAppLink(currentCategory.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-3 rounded-sm shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>CONSULTAR POR WHATSAPP</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    if (onSelectProductForQuote) onSelectProductForQuote(currentCategory.name);
                    navigate(`/cotizador?producto=${encodeURIComponent(currentCategory.name)}`);
                  }}
                  className="inline-flex items-center space-x-2 bg-[#5b8314] hover:bg-[#48680f] text-white font-bold px-5 py-3 rounded-sm shadow-sm transition-all text-xs font-mono uppercase"
                >
                  <span>Pedir Cotización Formal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right Column: Photo & Interactive Dimensions Table */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Product Photo Box in Light Mode */}
              <div className="p-6 bg-slate-50 border border-slate-200 text-center relative overflow-hidden rounded-sm">
                
                {/* Real Asset Label */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-sm bg-white/90 border border-slate-200 text-[10px] font-mono text-slate-700 shadow-2xs">
                  <span>Fotografía de Fábrica</span>
                </div>

                <div className="relative py-4">
                  <img 
                    src={currentCategory.image} 
                    alt={currentCategory.name} 
                    className="max-h-64 mx-auto object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.12)] select-none"
                  />
                </div>

                <div className="mt-2 text-[11px] font-mono text-slate-500 flex items-center justify-between border-t border-slate-200 pt-2">
                  <span>Modelo real fabricado por Eboplast</span>
                  <span className="font-mono text-[#5b8314] font-bold">1 a 250 m³</span>
                </div>
              </div>

              {/* Dimensions Table with Quick Filter in Light Mode */}
              <div className="p-4 bg-white border border-slate-200 rounded-sm shadow-sm">
                
                <div className="flex items-center justify-between mb-3 font-mono">
                  <h4 className="text-xs uppercase font-bold text-slate-700 tracking-wider flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-[#5b8314]" />
                    <span>Tabla de Medidas</span>
                  </h4>
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Filtrar m³..."
                      value={searchDim}
                      onChange={(e) => setSearchDim(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-sm px-2.5 py-1 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#5b8314] w-28 font-mono"
                    />
                    <Search className="w-3 h-3 text-slate-400 absolute right-2.5 top-2 pointer-events-none" />
                  </div>
                </div>

                <div className="max-h-56 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300">
                  <table className="w-full text-left text-xs border-collapse font-sans">
                    <thead className="sticky top-0 bg-slate-100 text-slate-600 border-b border-slate-200 font-mono">
                      <tr>
                        <th className="py-2 px-2.5 font-semibold">Capacidad</th>
                        <th className="py-2 px-2.5 font-semibold">Diámetro (Ø)</th>
                        <th className="py-2 px-2.5 font-semibold">Altura / Largo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredDimensions.length > 0 ? (
                        filteredDimensions.map((row, i) => (
                          <tr 
                            key={i} 
                            onClick={() => setSelectedCapacityIndex(i)}
                            className="hover:bg-lime-50 cursor-pointer text-slate-700 transition-colors"
                          >
                            <td className="py-2 px-2.5 font-bold text-[#5b8314] font-mono">{row.cap}</td>
                            <td className="py-2 px-2.5 font-mono">{row.dia}</td>
                            <td className="py-2 px-2.5 font-mono">{row.h}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="text-center py-4 text-slate-400 font-mono">
                            No se encontraron medidas coincidentes.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <p className="text-[10px] font-mono text-slate-400 text-right mt-2">
                  *Medidas estándar en milímetros. Fabricamos diámetros especiales a pedido.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
