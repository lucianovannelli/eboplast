import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  CheckCircle,
  Layers,
  Truck,
  Droplet,
  Zap,
  Sliders,
  Building2,
  Mail,
  Upload,
  ArrowRight,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';
import { companyInfo } from '../data/eboplastData';
import { createOrderFromRequirement, fileToDataUrl } from '../services/orderWorkflowService';

export default function QuoteCalculator({ preselectedProduct }) {
  const [format, setFormat] = useState('Vertical Cilíndrico');
  const [capacityLiters, setCapacityLiters] = useState(25000);
  const [fluid, setFluid] = useState('Fertilizantes Líquidos (UAN / SolMix)');
  const [temperature, setTemperature] = useState('45');
  const [norma, setNorma] = useState('ASTM D3299 / BS 4994');
  const [resina, setResina] = useState('Viniléster / Isoftálica según fluido');
  const [hasThermalInsulation, setHasThermalInsulation] = useState(false);
  const [hasAgitator, setHasAgitator] = useState(false);
  const [hasAccessLadder, setHasAccessLadder] = useState(true);
  const [hasLevelBand, setHasLevelBand] = useState(true);

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [attachmentFile, setAttachmentFile] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  React.useEffect(() => {
    if (preselectedProduct) {
      const lower = preselectedProduct.toLowerCase();
      if (lower.includes('poste')) {
        setFormat('Postes de PRFV');
      } else if (lower.includes('transporte') || lower.includes('camion')) {
        setFormat('Sobre Chasis / Camión');
      } else if (lower.includes('isotanque')) {
        setFormat('Isotanque de 20 Pies');
      } else if (lower.includes('agua') || lower.includes('torre')) {
        setFormat('Torre Elevada CIRSOC');
      } else if (lower.includes('horizontal')) {
        setFormat('Horizontal con Cunas');
      } else {
        setFormat('Vertical Cilíndrico');
      }
    }
  }, [preselectedProduct]);

  const formatOptions = [
    {
      id: 'Vertical Cilíndrico',
      name: 'Vertical (Fondo Plano)',
      desc: 'Unión monolítica sin soldadura entre fondo y cilindro (disminuye riesgo de ataque químico)',
      icon: <Layers className="w-5 h-5 text-[#5b8314]" />,
    },
    {
      id: 'Horizontal con Cunas',
      name: 'Horizontal cilíndrico',
      desc: 'Con cunas de PRFV, para depósitos o naves bajas',
      icon: <Sliders className="w-5 h-5 text-emerald-700" />,
    },
    {
      id: 'Sobre Chasis / Camión',
      name: 'Transporte Carretero',
      desc: 'Con rompeolas internos para camión o semirremolque',
      icon: <Truck className="w-5 h-5 text-amber-700" />,
    },
    {
      id: 'Isotanque de 20 Pies',
      name: 'Isotanques PRFV',
      desc: 'Encuadrado en estructura metálica intermodal',
      icon: <Building2 className="w-5 h-5 text-blue-700" />,
    },
    {
      id: 'Torre Elevada CIRSOC',
      name: 'Torre y Tanque Agua',
      desc: 'Estructura metálica tubular bajo reglamento CIRSOC',
      icon: <Droplet className="w-5 h-5 text-sky-700" />,
    },
    {
      id: 'Postes de PRFV',
      name: 'Postes Dieléctricos',
      desc: 'Línea eléctrica e iluminación clase II',
      icon: <Zap className="w-5 h-5 text-yellow-700" />,
    },
  ];

  const fluidPresets = [
    'Fertilizantes Líquidos (UAN / SolMix)',
    'Ácidos (Sulfúrico, Clorhídrico, Fosfórico)',
    'Soda Cáustica / Álcalis',
    'Leche Cruda / Suero (Grado Sanitario)',
    'Agua Potable para Consumo Humano',
    'Agua para Red de Incendio',
    'Agroquímicos / Fitoterapéuticos',
    'Efluentes Químicos Industriales',
  ];

  const estimateDimensions = (liters) => {
    const m3 = (liters / 1000).toFixed(0);
    let dia = '2.200 mm';
    let h = '3.070 mm';
    let diaNum = 2200;
    let hNum = 3070;
    if (liters <= 5000) {
      dia = '1.600 mm';
      h = '2.800 mm';
      diaNum = 1600;
      hNum = 2800;
    } else if (liters <= 15000) {
      dia = '2.500 mm';
      h = '3.550 mm';
      diaNum = 2500;
      hNum = 3550;
    } else if (liters <= 30000) {
      dia = '3.000 mm';
      h = '4.720 mm';
      diaNum = 3000;
      hNum = 4720;
    } else if (liters <= 50000) {
      dia = '3.500 mm';
      h = '5.450 mm';
      diaNum = 3500;
      hNum = 5450;
    } else if (liters <= 100000) {
      dia = '4.000 mm';
      h = '8.760 mm';
      diaNum = 4000;
      hNum = 8760;
    } else {
      dia = '4.700 mm';
      h = '12.440 mm';
      diaNum = 4700;
      hNum = 12440;
    }
    return { m3, dia, h, diaNum, hNum };
  };

  const currentEst = estimateDimensions(capacityLiters);

  const getAccessoriesList = () => {
    const extras = [];
    if (hasThermalInsulation) extras.push('Aislación térmica poliuretano');
    if (hasAgitator) extras.push('Sistema de agitación mecánica');
    if (hasAccessLadder) extras.push('Escalera c/ guardahombre reglamentario');
    if (hasLevelBand) extras.push('Banda traslúcida de nivel');
    return extras;
  };

  const generateWhatsAppText = (orderCode) => {
    let text = `*SOLICITUD DE COTIZACIÓN - EBOPLAST S.A.*\n`;
    if (orderCode) text += `*Expediente Digital:* ${orderCode}\n\n`;
    text += `*Formato Seleccionado:* ${format}\n`;
    text += `*Capacidad Solicitada:* ${capacityLiters.toLocaleString('es-AR')} Litros (${currentEst.m3} m³)\n`;
    text += `*Dimensiones Estimadas:* Ø aprox. ${currentEst.dia} | Altura/Largo ${currentEst.h}\n`;
    text += `*Fluido / Sustancia:* ${fluid} (${temperature}°C)\n`;
    text += `*Norma Constructiva:* ${norma}\n\n`;

    const extras = getAccessoriesList();
    if (extras.length > 0) text += `*Opcionales:* ${extras.join(', ')}\n\n`;

    text += `*Datos del Solicitante:*\n`;
    if (name) text += `*Nombre:* ${name}\n`;
    if (company) text += `*Empresa:* ${company}\n`;
    if (email) text += `*Email:* ${email}\n`;
    if (phone) text += `*Teléfono:* ${phone}\n`;
    if (location) text += `*Destino de Entrega:* ${location}\n`;
    if (notes) text += `*Notas:* ${notes}\n`;

    return text;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let attachmentData = null;
      if (attachmentFile) {
        attachmentData = await fileToDataUrl(attachmentFile);
      }

      const extras = getAccessoriesList();
      const combinedNotes = [
        notes,
        `Norma solicitada: ${norma}`,
        `Resina sugerida: ${resina}`,
      ]
        .filter(Boolean)
        .join(' · ');

      const { order } = await createOrderFromRequirement({
        clientName: name || 'Ing. Solicitante',
        company: company || 'Planta Industrial',
        cuit: '30-00000000-0',
        email: email || 'ingenieria@cliente.com.ar',
        phone: phone || '+54 9 341',
        location: location || 'Argentina',
        format,
        capacityLiters,
        diameter: currentEst.dia,
        height: currentEst.h,
        fluid,
        density: '1.20 g/cm³',
        temperature: `${temperature || '45'} °C máx.`,
        accessories: extras,
        notes: combinedNotes,
        attachmentFile: attachmentData,
      });

      setCreatedOrder(order);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="cotizador"
      className="py-20 lg:py-24 bg-white border-b border-slate-200 relative select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime-50 border border-[#5b8314]/30 font-mono text-[11px] uppercase tracking-widest text-[#5b8314]">
            <span>ETAPA 1 DEL FLUJO DIGITAL · PEDIDO DE COTIZACIÓN Y REQUERIMIENTO TÉCNICO</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight uppercase">
            Ingreso de Pedido de Cotización
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-sans">
            Al ingresar su requerimiento técnico se genera su <strong>Expediente Digital</strong> y se
            dispara automáticamente el aviso por mail para iniciar el flujo de Presupuesto → Orden de
            Compra → Aprobación de Plano → Construcción → Registro Virtual del Tanque.
          </p>
        </div>

        {/* Configurator Container */}
        <div className="max-w-5xl mx-auto tech-panel-light p-6 sm:p-10 border-2 border-slate-300 bg-white shadow-xl rounded-sm">
          {createdOrder ? (
            <div className="py-8 space-y-6">
              <div className="bg-lime-50/80 border-2 border-[#5b8314] p-6 sm:p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#5b8314] text-white mx-auto flex items-center justify-center">
                  <CheckCircle className="w-9 h-9" />
                </div>
                <div className="font-mono text-xs uppercase tracking-widest text-[#5b8314] font-bold">
                  ETAPA 1 REGISTRADA · NOTIFICACIÓN ENVIADA POR MAIL
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 uppercase">
                  Expediente N°{' '}
                  <span className="text-[#5b8314] underline">{createdOrder.code}</span> Generado
                </h3>
                <p className="text-slate-700 max-w-2xl mx-auto text-sm font-sans">
                  Hemos registrado su requerimiento técnico para un equipo{' '}
                  <strong>
                    {createdOrder.technicalSpec?.format} de{' '}
                    {createdOrder.technicalSpec?.capacityLiters?.toLocaleString('es-AR')} Litros
                  </strong>{' '}
                  y enviamos el correo automático de confirmación a{' '}
                  <strong>{createdOrder.client?.email}</strong> y a Ingeniería de Eboplast S.A.
                </p>

                {/* Primary CTA: Go to Order Tracking Portal */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to={`/seguimiento/${createdOrder.code}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-950 hover:bg-[#5b8314] text-white font-display font-bold px-8 py-4 text-xs uppercase tracking-widest transition-colors shadow-md"
                  >
                    <span>ABRIR PORTAL DE SEGUIMIENTO ({createdOrder.code})</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={`https://wa.me/${companyInfo.contacts.whatsapp.number}?text=${encodeURIComponent(
                      generateWhatsAppText(createdOrder.code)
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-mono font-bold px-6 py-4 text-xs uppercase tracking-wider transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enviar copia por WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Next Steps Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 font-mono text-[11px] bg-slate-50 p-4 border border-slate-200">
                <div className="p-3 bg-white border-l-4 border-[#5b8314]">
                  <div className="text-[#5b8314] font-bold">1. REQUERIMIENTO</div>
                  <div className="text-slate-600 text-[10px] mt-0.5">Completado hoy · Mail enviado</div>
                </div>
                <div className="p-3 bg-white border border-slate-200">
                  <div className="text-slate-900 font-bold">2. PRESUPUESTO</div>
                  <div className="text-slate-500 text-[10px] mt-0.5">Cotización y condiciones</div>
                </div>
                <div className="p-3 bg-white border border-slate-200">
                  <div className="text-slate-900 font-bold">3. ORDEN DE COMPRA</div>
                  <div className="text-slate-500 text-[10px] mt-0.5">Carga de OC / comprobante</div>
                </div>
                <div className="p-3 bg-white border border-slate-200">
                  <div className="text-slate-900 font-bold">4. PLANO TÉCNICO</div>
                  <div className="text-slate-500 text-[10px] mt-0.5">Aprobación previa a fabricar</div>
                </div>
                <div className="p-3 bg-white border border-slate-200">
                  <div className="text-slate-900 font-bold">5-6. PLANTA Y REGISTRO</div>
                  <div className="text-slate-500 text-[10px] mt-0.5">Fabricación y legajo virtual</div>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setCreatedOrder(null)}
                  className="text-xs text-slate-500 hover:text-slate-900 underline font-mono"
                >
                  Cargar otro pedido de cotización
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitOrder} className="space-y-10">
              {/* PASO 1: Formato Estructural */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 font-mono">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-sm bg-[#5b8314] text-white font-bold flex items-center justify-center text-[10px]">
                      1
                    </span>
                    Seleccione el Formato del Equipo
                  </h3>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0 font-medium">
                    Paso 1 de 4
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {formatOptions.map((opt) => {
                    const isSelected = format === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setFormat(opt.id)}
                        className={`p-4 rounded-sm cursor-pointer transition-all duration-150 border text-left flex items-start space-x-3.5 ${
                          isSelected
                            ? 'bg-lime-50/60 border-[#5b8314] shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className={`p-2.5 rounded-sm shrink-0 ${
                            isSelected ? 'bg-lime-100' : 'bg-slate-100'
                          }`}
                        >
                          {opt.icon}
                        </div>
                        <div>
                          <span
                            className={`text-sm font-bold block ${
                              isSelected ? 'text-[#45630e]' : 'text-slate-900'
                            }`}
                          >
                            {opt.name}
                          </span>
                          <span className="text-xs text-slate-500 leading-tight block mt-0.5 font-sans">
                            {opt.desc}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PASO 2: Capacidad y Cálculo en Vivo */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 font-mono">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-sm bg-[#5b8314] text-white font-bold flex items-center justify-center text-[10px]">
                      2
                    </span>
                    Ajuste el Volumen Requerido
                  </h3>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0 font-medium">
                    Paso 2 de 4
                  </span>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-200 rounded-sm space-y-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-slate-500 block uppercase font-mono font-bold">
                        Capacidad Seleccionada:
                      </span>
                      <div className="flex items-baseline space-x-2">
                        <span className="font-display text-3xl sm:text-4xl font-black text-slate-950">
                          {capacityLiters.toLocaleString('es-AR')}
                        </span>
                        <span className="text-[#5b8314] font-bold text-lg font-mono">
                          Litros ({currentEst.m3} m³)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-white px-4 py-2 border border-slate-200 rounded-sm text-xs font-mono shadow-2xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">DIÁMETRO APROX:</span>
                        <span className="text-slate-900 font-bold">{currentEst.dia}</span>
                      </div>
                      <div className="h-6 w-px bg-slate-200" />
                      <div>
                        <span className="text-slate-400 block text-[10px]">ALTURA APROX:</span>
                        <span className="text-[#5b8314] font-bold">{currentEst.h}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="range"
                      min="1000"
                      max="250000"
                      step="1000"
                      value={capacityLiters}
                      onChange={(e) => setCapacityLiters(Number(e.target.value))}
                      className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#5b8314]"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                      <span>1.000 L (1 m³)</span>
                      <span>50.000 L</span>
                      <span>100.000 L</span>
                      <span>250.000 L (250 m³)</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                    <span className="text-slate-500 self-center mr-1">Preset rápido:</span>
                    {[5000, 10000, 25000, 50000, 100000, 200000].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => setCapacityLiters(val)}
                        className={`px-2.5 py-1 rounded-sm transition-colors ${
                          capacityLiters === val
                            ? 'bg-[#5b8314] text-white font-bold'
                            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {val / 1000} m³
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* PASO 3: Fluido, Norma, Matriz Química y Opcionales */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 font-mono">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-sm bg-[#5b8314] text-white font-bold flex items-center justify-center text-[10px]">
                      3
                    </span>
                    Fluido Químico, Norma Constructiva y Opcionales
                  </h3>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0 font-medium">
                    Paso 3 de 4
                  </span>
                </div>

                <div className="space-y-4 font-sans">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2 font-mono">
                      Seleccione o ingrese el producto químico / fluido:
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {fluidPresets.map((fp, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => setFluid(fp)}
                          className={`text-xs px-3 py-1.5 rounded-sm transition-colors ${
                            fluid === fp
                              ? 'bg-emerald-700 text-white font-bold'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                          }`}
                        >
                          {fp}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="O especifique otro fluido / concentración particular..."
                      value={fluid}
                      onChange={(e) => setFluid(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#5b8314]"
                    />
                  </div>

                  {/* Technical selectors: Norma, Resina, Temp */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 font-mono">
                        Norma / Reglamento
                      </label>
                      <select
                        value={norma}
                        onChange={(e) => setNorma(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#5b8314]"
                      >
                        <option value="ASTM D3299 / BS 4994">ASTM D3299 / BS 4994</option>
                        <option value="ASME RTP-1 / NBS PS 15-69">ASME RTP-1 / NBS PS 15-69</option>
                        <option value="IRAM / CIRSOC">IRAM / CIRSOC</option>
                        <option value="Otra norma bajo estudio previo">
                          Otra norma (previo estudio)
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 font-mono">
                        Matriz de Resina
                      </label>
                      <select
                        value={resina}
                        onChange={(e) => setResina(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#5b8314]"
                      >
                        <option value="Viniléster / Isoftálica según fluido">
                          Viniléster / Isoftálica según fluido
                        </option>
                        <option value="Viniléster Epoxi-Novolaca">Viniléster Epoxi-Novolaca</option>
                        <option value="Poliéster Isoftálica">Poliéster Isoftálica</option>
                        <option value="Viniléster, Isoftálicas y otras">
                          Otras resinas especiales
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 font-mono">
                        Temp. Máx. Operación (°C)
                      </label>
                      <input
                        type="number"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#5b8314]"
                      />
                    </div>
                  </div>

                  {/* Accessories Checkboxes */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm">
                    <span className="block text-xs font-mono font-bold text-slate-700 mb-3 uppercase">
                      Opcionales de Fábrica (Seleccionar los deseados):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-700">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasThermalInsulation}
                          onChange={(e) => setHasThermalInsulation(e.target.checked)}
                          className="rounded-sm border-slate-300 text-[#5b8314] focus:ring-[#5b8314]"
                        />
                        <span>Aislación Térmica (Poliuretano)</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasAgitator}
                          onChange={(e) => setHasAgitator(e.target.checked)}
                          className="rounded-sm border-slate-300 text-[#5b8314] focus:ring-[#5b8314]"
                        />
                        <span>Sistema de Agitación</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasAccessLadder}
                          onChange={(e) => setHasAccessLadder(e.target.checked)}
                          className="rounded-sm border-slate-300 text-[#5b8314] focus:ring-[#5b8314]"
                        />
                        <span>Escalera c/ Guardahombre</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasLevelBand}
                          onChange={(e) => setHasLevelBand(e.target.checked)}
                          className="rounded-sm border-slate-300 text-[#5b8314] focus:ring-[#5b8314]"
                        />
                        <span>Banda Traslúcida de Nivel</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* PASO 4: Datos de Contacto y Archivo Adjunto */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 font-mono">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-sm bg-[#5b8314] text-white font-bold flex items-center justify-center text-[10px]">
                      4
                    </span>
                    Datos del Cliente, Email para Notificaciones y Adjuntos
                  </h3>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0 font-medium">
                    Paso 4 de 4
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 font-mono">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Ing. Carlos Gómez"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#5b8314]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 font-mono">
                      Empresa / Planta Industrial *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Agroquímica del Litoral S.A."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#5b8314]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 font-mono">
                      Email Corporativo (Recibe Avisos y Plano) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ingenieria@suempresa.com.ar"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#5b8314]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 font-mono">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+54 9 341..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#5b8314]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1 font-mono">
                      Localidad / Planta de Destino
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Parque Industrial San Lorenzo, Santa Fe"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#5b8314]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 font-sans">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 font-mono">
                      Especificaciones de boquillas, bridas o plazos
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Indique diámetros de carga/descarga, venteo, entrada de hombre o condiciones de emplazamiento..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#5b8314]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 font-mono">
                      Adjuntar Croquis, Pliego Técnico o Especificación (Opcional)
                    </label>
                    <label className="flex flex-col items-center justify-center h-[84px] px-4 border-2 border-dashed border-slate-300 hover:border-[#5b8314] bg-slate-50 cursor-pointer transition-colors">
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-700">
                        <Upload className="w-4 h-4 text-[#5b8314]" />
                        {attachmentFile ? (
                          <span className="font-bold text-[#5b8314]">{attachmentFile.name}</span>
                        ) : (
                          <span>Subir PDF, Imagen o Plano de referencia</span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 mt-1">
                        Quedará vinculado al expediente digital del tanque
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg,.dwg"
                        onChange={(e) => setAttachmentFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Bottom Action Ribbon */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 font-mono">
                <div className="text-xs text-slate-600 space-y-0.5 text-center sm:text-left">
                  <p className="text-slate-900 font-bold flex items-center justify-center sm:justify-start gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#5b8314]" />
                    Expediente Digital + Notificación Automática por Mail
                  </p>
                  <p className="text-slate-500 font-sans">
                    Genera código de seguimiento para cotización, OC, plano de aprobación y registro
                    virtual final.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#5b8314] hover:bg-[#48680f] disabled:opacity-60 text-white font-bold px-8 py-4 rounded-sm shadow-md transition-all text-xs tracking-wider uppercase group"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>
                    {submitting ? 'INGRESANDO PEDIDO...' : 'INGRESAR PEDIDO'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
