import React from 'react';
import { X, Printer, Download, CheckCircle2, FileText, ShieldCheck, Compass } from 'lucide-react';

export default function BlueprintViewerModal({ isOpen, onClose, order, docType = 'blueprint', customFile = null }) {
  if (!isOpen || !order) return null;

  const activeFile =
    customFile ||
    (docType === 'blueprint'
      ? order.blueprint?.file
      : docType === 'quote'
      ? order.quote?.file
      : docType === 'po'
      ? order.purchaseOrder?.file
      : docType === 'certificate'
      ? order.virtualRecord?.certificateFile
      : order.technicalSpec?.attachment);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (activeFile?.dataUrl) {
      const a = document.createElement('a');
      a.href = activeFile.dataUrl;
      a.download = activeFile.name || `${order.code}-${docType}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-line-strong bg-white shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Barra Superior de Acciones */}
        <div className="flex items-center justify-between bg-ink text-white px-5 py-3.5 border-b border-white/10 shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <Compass className="size-4 text-brand-bright" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              {docType === 'blueprint' && `Plano Técnico Constructivo · ${order.blueprint?.drawingNumber || order.code}`}
              {docType === 'quote' && `Presupuesto Oficial · ${order.quote?.quoteNumber || order.code}`}
              {docType === 'po' && `Orden de Compra / Comprobante · ${order.purchaseOrder?.poNumber || order.code}`}
              {docType === 'certificate' && `Certificado de Garantía y Registro Virtual · ${order.virtualRecord?.serialNumber || order.code}`}
              {docType === 'spec' && `Especificación Técnica Adjunta · ${order.code}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand hover:bg-brand-hover px-3.5 py-1.5 text-xs font-mono font-bold uppercase text-white transition-colors"
            >
              <Download className="size-3.5" />
              <span>{activeFile?.dataUrl ? 'Descargar Archivo Original' : 'Descargar / PDF'}</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-mono text-white transition-colors"
            >
              <Printer className="size-3.5" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="grid size-8 place-items-center rounded-full bg-white/10 hover:bg-rose-600 text-white transition-colors"
              aria-label="Cerrar"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Contenido del Visor */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-paper">
          {/* Si el usuario subió una imagen o PDF real con DataURL, lo mostramos arriba */}
          {activeFile?.dataUrl && (
            <div className="rounded-xl border border-brand/40 bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-ink">
                  <FileText className="size-4 text-brand" />
                  <span>Archivo subido: {activeFile.name} ({activeFile.size})</span>
                </div>
                <a
                  href={activeFile.dataUrl}
                  download={activeFile.name}
                  className="text-xs font-mono font-bold text-brand hover:underline"
                >
                  Guardar copia local →
                </a>
              </div>
              {activeFile.type?.startsWith('image/') ? (
                <img
                  src={activeFile.dataUrl}
                  alt={activeFile.name}
                  className="max-h-96 mx-auto object-contain rounded border border-slate-200"
                />
              ) : activeFile.type === 'application/pdf' ? (
                <iframe
                  src={activeFile.dataUrl}
                  title={activeFile.name}
                  className="w-full h-96 rounded border border-slate-200"
                />
              ) : null}
            </div>
          )}

          {/* VISTA 1: PLANO TÉCNICO CAD / BLUEPRINT */}
          {docType === 'blueprint' && (
            <div className="border-2 border-slate-900 bg-white p-5 sm:p-7 font-mono text-xs text-slate-900 shadow-sm">
              {/* Encabezado de Plano */}
              <div className="flex flex-wrap items-center justify-between border-b-2 border-slate-900 pb-4 mb-6 gap-4">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">
                    DEPARTAMENTO DE INGENIERÍA Y MATRICERÍA · FUNDADA EN 1978
                  </span>
                  <h3 className="font-display text-xl font-black uppercase tracking-tight text-slate-950">
                    EBOPLAST S.A. — PLANO GENERAL PARA APROBACIÓN DE CLIENTE
                  </h3>
                </div>
                <div className="text-right border border-slate-900 px-3 py-1.5 bg-slate-50">
                  <span className="block text-[10px] text-slate-500">PLANO N° / REVISIÓN</span>
                  <span className="font-bold text-sm text-[#5b8314]">
                    {order.blueprint?.drawingNumber || `PL-${order.code}`} · {order.blueprint?.revision || 'Rev. A'}
                  </span>
                </div>
              </div>

              {/* Esquema CAD SVG del Tanque + Cotas */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 border border-slate-300 bg-[#f8fafc] p-4 rounded relative blueprint">
                  <svg viewBox="0 0 500 380" className="w-full h-auto max-h-80 mx-auto">
                    {/* Eje de simetría */}
                    <line x1="230" y1="15" x2="230" y2="350" stroke="#94a3b8" strokeWidth="1" strokeDasharray="6,4" />

                    {/* Cúpula / Casquete Torisférico Superior */}
                    <path
                      d="M 130 85 Q 230 35 330 85"
                      fill="#e2e8f0"
                      stroke="#0f172a"
                      strokeWidth="2.5"
                    />

                    {/* Línea de Única Soldadura Superior (0 kPa) */}
                    <line x1="122" y1="85" x2="338" y2="85" stroke="#dc2626" strokeWidth="3" strokeDasharray="4,2" />
                    <text x="345" y="82" fill="#dc2626" fontSize="9" fontWeight="bold" fontFamily="monospace">
                      ← ÚNICA SOLDADURA SUPERIOR (0 kPa)
                    </text>

                    {/* Cuerpo Cilíndrico + Fondo Monolítico en 1 pieza */}
                    <path
                      d="M 130 85 L 130 315 L 330 315 L 330 85"
                      fill="#f1f5f9"
                      stroke="#0f172a"
                      strokeWidth="3"
                    />

                    {/* Banda traslúcida de nivel */}
                    <rect x="295" y="100" width="12" height="200" fill="#dcfce7" stroke="#5b8314" strokeWidth="1.2" />
                    <text x="255" y="200" fill="#5b8314" fontSize="8" fontFamily="monospace">
                      VISOR NIVEL
                    </text>

                    {/* Escalera lateral con guardahombre */}
                    <line x1="105" y1="75" x2="105" y2="315" stroke="#334155" strokeWidth="2" />
                    <line x1="118" y1="75" x2="118" y2="315" stroke="#334155" strokeWidth="2" />
                    {[95, 120, 145, 170, 195, 220, 245, 270, 295].map((y) => (
                      <line key={y} x1="105" y1={y} x2="118" y2={y} stroke="#334155" strokeWidth="1.5" />
                    ))}

                    {/* Boca Paso Hombre Inferior */}
                    <circle cx="175" cy="275" r="16" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                    <circle cx="175" cy="275" r="12" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="150" y="302" fill="#0f172a" fontSize="8" fontFamily="monospace">
                      PASO HOMBRE Ø500
                    </text>

                    {/* Brida de Descarga */}
                    <rect x="330" y="290" width="22" height="10" fill="#0f172a" />
                    <line x1="352" y1="285" x2="352" y2="305" stroke="#0f172a" strokeWidth="3" />
                    <text x="358" y="298" fill="#0f172a" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
                      BRIDA DESCARGA
                    </text>

                    {/* Base / Losa de Hormigón y Cero Soldadura entre Fondo y Cilindro */}
                    <rect x="95" y="315" width="270" height="14" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
                    <text x="132" y="343" fill="#15803d" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                      ✓ FONDO Y CILINDRO MONOLÍTICO SIN SOLDADURA
                    </text>
                    <text x="142" y="355" fill="#15803d" fontSize="8.5" fontFamily="monospace">
                      (Disminuye el riesgo de ataque químico y fatiga)
                    </text>

                    {/* Cota de Altura Total */}
                    <line x1="55" y1="58" x2="55" y2="315" stroke="#0f172a" strokeWidth="1.5" />
                    <line x1="48" y1="58" x2="62" y2="58" stroke="#0f172a" strokeWidth="1.5" />
                    <line x1="48" y1="315" x2="62" y2="315" stroke="#0f172a" strokeWidth="1.5" />
                    <text x="12" y="190" fill="#0f172a" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                      H: {order.blueprint?.specs?.totalHeight || order.technicalSpec?.height}
                    </text>

                    {/* Cota de Diámetro */}
                    <line x1="130" y1="28" x2="330" y2="28" stroke="#0f172a" strokeWidth="1.5" />
                    <line x1="130" y1="22" x2="130" y2="34" stroke="#0f172a" strokeWidth="1.5" />
                    <line x1="330" y1="22" x2="330" y2="34" stroke="#0f172a" strokeWidth="1.5" />
                    <text x="190" y="20" fill="#0f172a" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      Ø {order.blueprint?.specs?.diameter || order.technicalSpec?.diameter}
                    </text>
                  </svg>
                </div>

                {/* Tabla de Cotas y Materiales del Plano */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="border border-slate-900 divide-y divide-slate-200">
                    <div className="p-2.5 bg-slate-900 text-white font-bold uppercase text-[11px]">
                      Especificación Constructiva del Plano
                    </div>
                    <div className="p-2.5 flex justify-between">
                      <span className="text-slate-500">Cliente:</span>
                      <span className="font-bold text-right">{order.client.company}</span>
                    </div>
                    <div className="p-2.5 flex justify-between">
                      <span className="text-slate-500">Capacidad Nominal:</span>
                      <span className="font-bold">{order.technicalSpec.capacityLiters.toLocaleString('es-AR')} L</span>
                    </div>
                    <div className="p-2.5 flex justify-between">
                      <span className="text-slate-500">Diámetro Interno (Ø):</span>
                      <span className="font-bold">{order.blueprint?.specs?.diameter || order.technicalSpec.diameter}</span>
                    </div>
                    <div className="p-2.5 flex justify-between">
                      <span className="text-slate-500">Altura Total (H):</span>
                      <span className="font-bold">{order.blueprint?.specs?.totalHeight || order.technicalSpec.height}</span>
                    </div>
                    <div className="p-2.5 flex justify-between">
                      <span className="text-slate-500">Espesor Base / Sup.:</span>
                      <span className="font-bold">
                        {order.blueprint?.specs?.wallThicknessBase || '12.5 mm'} / {order.blueprint?.specs?.wallThicknessTop || '6.5 mm'}
                      </span>
                    </div>
                    <div className="p-2.5 flex justify-between">
                      <span className="text-slate-500">Fluido de Diseño:</span>
                      <span className="font-bold text-right">{order.technicalSpec.fluid}</span>
                    </div>
                    <div className="p-2.5 flex justify-between">
                      <span className="text-slate-500">Normas Constructivas:</span>
                      <span className="font-bold text-right">{order.quote?.standardApplied || 'ASTM / BS / ASME / CIRSOC'}</span>
                    </div>
                    <div className="p-2.5 flex justify-between">
                      <span className="text-slate-500">Resina Química:</span>
                      <span className="font-bold text-right">{order.quote?.resinSelected || 'Viniléster / Isoftálica'}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-300 text-[11px]">
                    <span className="font-bold block uppercase text-slate-700 mb-1">Boquillas y Notas:</span>
                    <p className="text-slate-600 font-sans leading-relaxed">
                      {order.blueprint?.notes || order.technicalSpec.notes}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rótulo de Aprobación Inferior */}
              <div className="mt-6 pt-4 border-t-2 border-slate-900 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px]">
                <div>
                  <span className="text-slate-500 block">ELABORÓ (OFICINA TÉCNICA):</span>
                  <span className="font-bold">{order.blueprint?.engineer || 'Dpto. Ingeniería Eboplast S.A.'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">ESTADO DEL PLANO:</span>
                  <span className={`font-bold uppercase ${order.blueprint?.approval ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {order.blueprint?.approval ? '✓ APROBADO PARA CONSTRUCCIÓN' : '⏳ PENDIENTE DE APROBACIÓN DEL CLIENTE'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">CONFORMIDAD CLIENTE:</span>
                  <span className="font-bold">
                    {order.blueprint?.approval
                      ? `${order.blueprint.approval.approvedBy} (${new Date(order.blueprint.approval.approvedAt).toLocaleDateString('es-AR')})`
                      : 'Sin firma aún'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 2: PRESUPUESTO FORMAL */}
          {docType === 'quote' && order.quote && (
            <div className="border border-slate-300 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-wrap items-start justify-between border-b border-slate-200 pb-5 gap-4">
                <div>
                  <span className="font-mono text-xs font-bold text-[#5b8314] uppercase">
                    EBOPLAST S.A. · FUNDADA EN 1978 · ROSARIO
                  </span>
                  <h3 className="font-display text-2xl font-black uppercase text-slate-950 mt-1">
                    PRESUPUESTO OFICIAL N° {order.quote.quoteNumber}
                  </h3>
                  <p className="text-xs font-mono text-slate-500 mt-0.5">
                    Expediente: {order.code} · Fecha: {new Date(order.quote.sentAt).toLocaleDateString('es-AR')}
                  </p>
                </div>
                <div className="bg-lime-50 border border-lime-300 px-4 py-2.5 rounded text-right font-mono">
                  <span className="text-[10px] text-slate-500 block uppercase">VALOR TOTAL COTIZADO</span>
                  <span className="text-xl font-black text-slate-950">
                    {order.quote.currency} {order.quote.amount}
                  </span>
                  <span className="text-[11px] text-[#5b8314] block font-bold">{order.quote.taxNote}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans bg-slate-50 p-4 rounded border border-slate-200">
                <div>
                  <span className="font-mono text-[10px] text-slate-500 uppercase block">Destinatario:</span>
                  <strong className="text-sm text-slate-900">{order.client.company}</strong>
                  <p className="text-slate-600">At.: {order.client.name} ({order.client.email})</p>
                  <p className="text-slate-600">Destino: {order.client.location}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-500 uppercase block">Equipo Cotizado:</span>
                  <strong className="text-sm text-slate-900">
                    {order.technicalSpec.format} — {order.technicalSpec.capacityLiters.toLocaleString('es-AR')} Litros
                  </strong>
                  <p className="text-slate-600">Fluido: {order.technicalSpec.fluid}</p>
                  <p className="text-slate-600">Medidas: Ø {order.technicalSpec.diameter} × H {order.technicalSpec.height}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs font-sans">
                <h4 className="font-mono font-bold uppercase text-slate-800 border-b border-slate-200 pb-1.5">
                  Condiciones Comerciales y Técnicas del Presupuesto
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 border border-slate-200 rounded">
                    <span className="font-mono text-[10px] text-slate-500 uppercase block">Forma de Pago:</span>
                    <span className="font-semibold text-slate-900">{order.quote.paymentTerms}</span>
                  </div>
                  <div className="p-3 border border-slate-200 rounded">
                    <span className="font-mono text-[10px] text-slate-500 uppercase block">Plazo de Entrega:</span>
                    <span className="font-semibold text-slate-900">{order.quote.deliveryTime}</span>
                  </div>
                  <div className="p-3 border border-slate-200 rounded">
                    <span className="font-mono text-[10px] text-slate-500 uppercase block">Normas de Fabricación:</span>
                    <span className="font-semibold text-slate-900">{order.quote.standardApplied}</span>
                  </div>
                  <div className="p-3 border border-slate-200 rounded">
                    <span className="font-mono text-[10px] text-slate-500 uppercase block">Resina Química Seleccionada:</span>
                    <span className="font-semibold text-slate-900">{order.quote.resinSelected}</span>
                  </div>
                </div>
                {order.quote.conditionsNotes && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <span className="font-mono text-[10px] text-slate-500 uppercase block mb-1">Alcance e Inclusiones:</span>
                    <p className="text-slate-700 leading-relaxed">{order.quote.conditionsNotes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VISTA 3: CERTIFICADO DE GARANTÍA Y REGISTRO VIRTUAL */}
          {docType === 'certificate' && order.virtualRecord && (
            <div className="border-2 border-[#5b8314] bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between border-b-2 border-slate-900 pb-4 gap-4">
                <div>
                  <span className="font-mono text-xs font-bold text-[#5b8314] uppercase">
                    CERTIFICADO OFICIAL DE CALIDAD Y GARANTÍA ESCRITA
                  </span>
                  <h3 className="font-display text-2xl font-black uppercase text-slate-950">
                    REGISTRO VIRTUAL DEL TANQUE · SERIE {order.virtualRecord.serialNumber}
                  </h3>
                </div>
                <ShieldCheck className="size-10 text-[#5b8314]" />
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                <strong>EBOPLAST S.A.</strong> (fundada en 1978) certifica que el equipo detallado a continuación ha sido fabricado en nuestra planta industrial de Rosario mediante sistema <strong>Filament Winding</strong> sin soldadura entre fondo y cilindro (disminuyendo el riesgo de ataque químico y fatiga en la base), habiendo superado satisfactoriamente los ensayos de calidad y estanqueidad.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs bg-slate-50 p-4 border border-slate-200 rounded">
                <div>
                  <span className="text-slate-500 text-[10px] block">N° DE SERIE DE FÁBRICA:</span>
                  <strong className="text-slate-950">{order.virtualRecord.serialNumber}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">EXPEDIENTE / ORDEN DE COMPRA:</span>
                  <strong className="text-slate-950">{order.code} / {order.purchaseOrder?.poNumber || '-'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">PROPIETARIO / PLANTA:</span>
                  <strong className="text-slate-950">{order.client.company} ({order.client.location})</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">PLANO CONSTRUCTIVO APROBADO:</span>
                  <strong className="text-slate-950">{order.blueprint?.drawingNumber} ({order.blueprint?.revision})</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">LOTE TRAZABILIDAD DE RESINA:</span>
                  <strong className="text-slate-950">{order.virtualRecord.resinBatch}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">ENSAYO DUREZA BARCOL / HIDROSTÁTICO:</span>
                  <strong className="text-emerald-700">{order.virtualRecord.barcolHardness} · {order.virtualRecord.hydrostaticTest}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">NORMAS APLICADAS:</span>
                  <strong className="text-slate-950">{order.virtualRecord.normApplied}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">VIGENCIA DE GARANTÍA ESCRITA:</span>
                  <strong className="text-[#5b8314]">{order.virtualRecord.warrantyExpiration}</strong>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 4: ORDEN DE COMPRA O ESPECIFICACIÓN */}
          {(docType === 'po' || docType === 'spec') && (
            <div className="border border-slate-300 bg-white p-6 rounded shadow-xs space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                <CheckCircle2 className="size-6 text-[#5b8314]" />
                <div>
                  <h3 className="font-display text-lg font-bold uppercase text-slate-950">
                    {docType === 'po'
                      ? `Comprobante de Orden de Compra: ${order.purchaseOrder?.poNumber}`
                      : `Documento de Requerimiento Técnico: ${order.code}`}
                  </h3>
                  <p className="text-xs font-mono text-slate-500">
                    Archivo registrado: {activeFile?.name || 'Documento adjunto'}
                  </p>
                </div>
              </div>
              {docType === 'po' && order.purchaseOrder && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono bg-slate-50 p-4 rounded border border-slate-200">
                  <div>
                    <span className="text-slate-500 block text-[10px]">N° ORDEN DE COMPRA:</span>
                    <strong className="text-slate-900">{order.purchaseOrder.poNumber}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">AUTORIZADO POR:</span>
                    <strong className="text-slate-900">{order.purchaseOrder.acceptedBy}</strong>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block text-[10px]">REFERENCIA DE PAGO / ANTICIPO:</span>
                    <strong className="text-slate-900">{order.purchaseOrder.paymentReference}</strong>
                  </div>
                  {order.purchaseOrder.notes && (
                    <div className="sm:col-span-2">
                      <span className="text-slate-500 block text-[10px]">OBSERVACIONES:</span>
                      <span className="font-sans text-slate-700">{order.purchaseOrder.notes}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
