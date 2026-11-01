import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Mail,
  ShieldCheck,
  Compass,
  Factory,
  UserCheck,
  ArrowRight,
  Download,
  Eye,
  PlusCircle,
  Layers,
  Award,
  Check,
  Send,
  RefreshCw,
} from 'lucide-react';
import { TechLabel } from '../components/ui';
import BlueprintViewerModal from '../components/BlueprintViewerModal';
import EmailInspectorModal from '../components/EmailInspectorModal';
import {
  WORKFLOW_STAGES,
  getOrders,
  getOrderByCode,
  fileToDataUrl,
  submitQuoteFromEboplast,
  submitPurchaseOrderFromClient,
  submitBlueprintFromEboplast,
  reviewBlueprintByClient,
  updateProductionMilestones,
  completeDeliveryAndVirtualRecord,
  createOrderFromRequirement,
} from '../services/orderWorkflowService';

export default function OrderPortalPage() {
  const { code } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [roleMode, setRoleMode] = useState(
    searchParams.get('role') === 'eboplast' ? 'eboplast' : 'cliente'
  ); // 'cliente' | 'eboplast'
  const [lastTriggeredEmail, setLastTriggeredEmail] = useState(null);
  const [busy, setBusy] = useState(false);

  // Modales de documentos y emails
  const [viewerModal, setViewerModal] = useState({ open: false, docType: 'blueprint', customFile: null });
  const [emailModal, setEmailModal] = useState({ open: false, emailId: null });
  const [newOrderModalOpen, setNewOrderModalOpen] = useState(false);

  // Formularios por etapa
  // Etapa 2 (Eboplast -> Presupuesto)
  const [quoteForm, setQuoteForm] = useState({
    quoteNumber: 'PRE-2026-0912',
    amount: '26.500',
    currency: 'USD',
    taxNote: '+ IVA (10.5%)',
    deliveryTime: '30 días desde aprobación de plano',
    paymentTerms: '40% Anticipo con Orden de Compra / 60% contra aviso de listo para despacho',
    standardApplied: 'ASTM, BS, ASME, NBS, IRAM, CIRSOC',
    resinSelected: 'Viniléster / Isoftálica y otras según fluido',
    conditionsNotes: 'Construcción monolítica por Filament Winding sin soldadura entre fondo y cilindro (disminuyendo riesgo de ataque químico). Garantía escrita por 1 año.',
    file: null,
  });

  // Etapa 3 (Cliente -> Orden de Compra)
  const [poForm, setPoForm] = useState({
    poNumber: '',
    acceptedBy: '',
    paymentReference: '',
    notes: '',
    file: null,
  });

  // Etapa 4A (Eboplast -> Subir Plano Técnico)
  const [bpForm, setBpForm] = useState({
    drawingNumber: '',
    revision: 'Rev. A',
    engineer: 'Dpto. Ingeniería Eboplast S.A.',
    diameter: '',
    totalHeight: '',
    wallThicknessBase: '13.5 mm',
    wallThicknessTop: '6.5 mm',
    nozzles: 'Carga 3" / Descarga 3" / Venteo 4" / Paso Hombre Ø500 mm',
    notes: 'Plano general de fabricación para aprobación previa al bobinado. Sin soldadura entre fondo y cilindro.',
    file: null,
  });

  // Etapa 4B (Cliente -> Aprobar o Observar Plano)
  const [reviewForm, setReviewForm] = useState({
    approvedBy: '',
    role: 'Gerencia Técnica / Ingeniería de Planta',
    comment: 'Plano verificado conforme a requerimiento. Autorizamos el inicio de fabricación.',
    observationText: '',
    showObservationInput: false,
  });

  // Etapa 6 (Eboplast -> Entrega y Registro Virtual)
  const [deliveryForm, setDeliveryForm] = useState({
    serialNumber: `SN-EBO-1978-${Math.floor(4900 + Math.random() * 500)}`,
    resinBatch: 'LOTE-VIN-2026-915',
    barcolHardness: '42 Barcol (Aprobado)',
    dispatchRemito: 'Remito Oficial N° 0004-00019502',
    receivedBy: '',
    file: null,
  });

  // Modal Nuevo Pedido Rápido
  const [newReqForm, setNewReqForm] = useState({
    clientName: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    format: 'Vertical Cilíndrico (Fondo Plano)',
    capacityLiters: 30000,
    fluid: 'Fertilizantes Líquidos (UAN / SolMix)',
    temperature: '45 °C',
    notes: '',
    file: null,
  });

  const refreshOrders = (targetCode) => {
    const list = getOrders();
    setOrders(list);
    const codeToFind = targetCode || code || selectedOrder?.code || list[0]?.code;
    const found = getOrderByCode(codeToFind) || list[0];
    setSelectedOrder(found);
    if (found) {
      setSearchInput(found.code);
      setPoForm((prev) => ({
        ...prev,
        acceptedBy: prev.acceptedBy || found.client.name,
      }));
      setReviewForm((prev) => ({
        ...prev,
        approvedBy: prev.approvedBy || found.client.name,
      }));
      setBpForm((prev) => ({
        ...prev,
        drawingNumber: `PL-${found.code}`,
        diameter: found.technicalSpec.diameter || '3.000 mm',
        totalHeight: found.technicalSpec.height || '4.720 mm',
      }));
      setDeliveryForm((prev) => ({
        ...prev,
        receivedBy: `${found.client.name} (${found.client.company})`,
      }));
    }
  };

  useEffect(() => {
    refreshOrders(code);
  }, [code]);

  const handleSelectOrder = (orderCode) => {
    navigate(`/seguimiento/${orderCode}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const found = getOrderByCode(searchInput);
    if (found) {
      navigate(`/seguimiento/${found.code}`);
    } else {
      alert(`No se encontró ningún expediente con el código "${searchInput}". Pruebe con EBO-2026-1048, EBO-2026-1035 o EBO-2026-1051.`);
    }
  };

  const handleFileInput = async (e, setter) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const dataObj = await fileToDataUrl(f);
    setter(dataObj);
  };

  // Acciones de cada etapa
  const onSendQuote = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setBusy(true);
    try {
      const { order, emailLog } = await submitQuoteFromEboplast(selectedOrder.code, quoteForm);
      setSelectedOrder(order);
      setOrders(getOrders());
      setLastTriggeredEmail(emailLog);
    } finally {
      setBusy(false);
    }
  };

  const onUploadPO = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setBusy(true);
    try {
      const { order, emailLog } = await submitPurchaseOrderFromClient(selectedOrder.code, poForm);
      setSelectedOrder(order);
      setOrders(getOrders());
      setLastTriggeredEmail(emailLog);
    } finally {
      setBusy(false);
    }
  };

  const onSendBlueprint = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setBusy(true);
    try {
      const { order, emailLog } = await submitBlueprintFromEboplast(selectedOrder.code, bpForm);
      setSelectedOrder(order);
      setOrders(getOrders());
      setLastTriggeredEmail(emailLog);
    } finally {
      setBusy(false);
    }
  };

  const onApproveBlueprint = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setBusy(true);
    try {
      const { order, emailLog } = await reviewBlueprintByClient(selectedOrder.code, {
        approved: true,
        approvedBy: reviewForm.approvedBy || selectedOrder.client.name,
        role: reviewForm.role,
        comment: reviewForm.comment,
      });
      setSelectedOrder(order);
      setOrders(getOrders());
      setLastTriggeredEmail(emailLog);
    } finally {
      setBusy(false);
    }
  };

  const onRequestBlueprintChanges = async (e) => {
    e.preventDefault();
    if (!selectedOrder || !reviewForm.observationText.trim()) return;
    setBusy(true);
    try {
      const { order, emailLog } = await reviewBlueprintByClient(selectedOrder.code, {
        approved: false,
        approvedBy: reviewForm.approvedBy || selectedOrder.client.name,
        role: reviewForm.role,
        comment: reviewForm.observationText,
      });
      setSelectedOrder(order);
      setOrders(getOrders());
      setLastTriggeredEmail(emailLog);
      setReviewForm((prev) => ({ ...prev, observationText: '', showObservationInput: false }));
    } finally {
      setBusy(false);
    }
  };

  const onToggleMilestone = async (milestoneId) => {
    if (!selectedOrder) return;
    const current = selectedOrder.production?.milestones || [];
    const updated = current.map((m) =>
      m.id === milestoneId
        ? {
            ...m,
            done: !m.done,
            date: !m.done ? new Date().toLocaleDateString('es-AR') : null,
          }
        : m
    );
    setBusy(true);
    try {
      const { order, emailLog } = await updateProductionMilestones(selectedOrder.code, updated, true);
      setSelectedOrder(order);
      setOrders(getOrders());
      if (emailLog) setLastTriggeredEmail(emailLog);
    } finally {
      setBusy(false);
    }
  };

  const onCompleteDelivery = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setBusy(true);
    try {
      const { order, emailLog } = await completeDeliveryAndVirtualRecord(
        selectedOrder.code,
        deliveryForm
      );
      setSelectedOrder(order);
      setOrders(getOrders());
      setLastTriggeredEmail(emailLog);
    } finally {
      setBusy(false);
    }
  };

  const onCreateNewRequirement = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { order, emailLog } = await createOrderFromRequirement({
        clientName: newReqForm.clientName,
        company: newReqForm.company,
        email: newReqForm.email,
        phone: newReqForm.phone,
        location: newReqForm.location,
        format: newReqForm.format,
        capacityLiters: newReqForm.capacityLiters,
        diameter: newReqForm.capacityLiters >= 50000 ? '4.000 mm' : '2.740 mm',
        height: newReqForm.capacityLiters >= 50000 ? '4.780 mm' : '4.200 mm',
        fluid: newReqForm.fluid,
        temperature: newReqForm.temperature,
        accessories: ['Escalera c/ Guardahombre', 'Banda Traslúcida de Nivel'],
        notes: newReqForm.notes,
        attachmentFile: newReqForm.file,
      });
      setNewOrderModalOpen(false);
      setOrders(getOrders());
      setSelectedOrder(order);
      setLastTriggeredEmail(emailLog);
      navigate(`/seguimiento/${order.code}`);
    } finally {
      setBusy(false);
    }
  };

  if (!selectedOrder) return null;

  return (
    <div className="bg-paper min-h-screen pb-20">
      {/* HERO HEADER DEL PORTAL */}
      <div className="relative overflow-hidden bg-paper-2 border-b border-line-strong pt-28 pb-10 sm:pt-36 sm:pb-12">
        <div className="blueprint absolute inset-0 opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <TechLabel index="PORTAL DIGITAL">
                Circuito Comercial, Aprobación de Planos y Registro Virtual
              </TechLabel>
              <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight leading-[0.98] text-ink">
                Seguimiento de Proyecto y Legajo Técnico
              </h1>
              <p className="text-steel-600 text-sm sm:text-base font-sans leading-relaxed">
                Gestione todo el ciclo de su tanque en PRFV: desde el pedido de cotización, recepción de presupuesto, carga de Orden de Compra y aprobación de planos hasta el Registro Virtual definitivo.
              </p>
            </div>

            {/* Botones Superiores: Bandeja de Mails, Nuevo Pedido y Panel Fábrica */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setNewOrderModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-brand hover:bg-brand-hover text-white px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider shadow-xs transition-all"
              >
                <PlusCircle className="size-4" />
                <span>Nuevo Pedido</span>
              </button>

              <button
                type="button"
                onClick={() => setEmailModal({ open: true, emailId: lastTriggeredEmail?.id || null })}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white hover:bg-paper px-4 py-2.5 text-xs font-mono font-bold uppercase text-ink transition-colors"
              >
                <Mail className="size-4 text-brand" />
                <span>Mails Enviados</span>
              </button>

              <Link
                to="/gestion"
                className="inline-flex items-center gap-2 rounded-full bg-ink hover:bg-slate-800 text-white px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors"
              >
                <Factory className="size-4 text-brand-bright" />
                <span>Tablero Eboplast</span>
              </Link>
            </div>
          </div>

          {/* Barra de Selección de Expediente y Conmutador de Rol (Cliente / Fábrica) */}
          <div className="mt-8 pt-6 border-t border-line-strong flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Selector rápido de expedientes de ejemplo + Buscador */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] font-bold uppercase text-steel-500 mr-1">
                Expedientes activos:
              </span>
              {orders.map((o) => {
                const isCurrent = o.code === selectedOrder.code;
                return (
                  <button
                    key={o.code}
                    type="button"
                    onClick={() => handleSelectOrder(o.code)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs border transition-all flex items-center gap-2 ${
                      isCurrent
                        ? 'bg-ink text-white border-ink font-bold shadow-xs'
                        : 'bg-white text-slate-700 border-line-strong hover:border-ink'
                    }`}
                  >
                    <span>{o.code}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded ${
                        isCurrent ? 'bg-brand text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Etapa {o.currentStep}/6
                    </span>
                  </button>
                );
              })}

              <form onSubmit={handleSearchSubmit} className="flex items-center ml-1">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Buscar código..."
                  className="bg-white border border-line-strong rounded-l-lg px-3 py-1.5 text-xs font-mono w-36 focus:outline-none focus:border-ink"
                />
                <button
                  type="submit"
                  className="bg-ink text-white px-2.5 py-1.5 rounded-r-lg border border-ink hover:bg-brand transition-colors"
                  title="Buscar expediente"
                >
                  <Search className="size-3.5" />
                </button>
              </form>
            </div>

            {/* Conmutador de Rol para probar el ida y vuelta en vivo */}
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-line-strong self-start lg:self-auto">
              <span className="text-[10px] font-mono uppercase text-steel-500 px-2 font-bold">
                Simular Vista:
              </span>
              <button
                type="button"
                onClick={() => setRoleMode('cliente')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-colors ${
                  roleMode === 'cliente'
                    ? 'bg-brand text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <UserCheck className="size-3.5" />
                <span>Vista Cliente</span>
              </button>
              <button
                type="button"
                onClick={() => setRoleMode('eboplast')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-colors ${
                  roleMode === 'eboplast'
                    ? 'bg-ink text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Factory className="size-3.5" />
                <span>Vista Eboplast (Fábrica)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL DEL EXPEDIENTE */}
      <div className="mx-auto max-w-7xl px-5 sm:px-10 pt-8 space-y-8">
        {/* Notificación de Email Recién Disparado */}
        {lastTriggeredEmail && (
          <div className="rounded-2xl border-2 border-brand bg-lime-50/90 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-brand text-white shrink-0 mt-0.5">
                <Mail className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold uppercase text-brand">
                    ✓ Notificación por Email Disparada Automáticamente
                  </span>
                  <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-lime-300 text-slate-700">
                    {lastTriggeredEmail.status}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {lastTriggeredEmail.subject}
                </p>
                <p className="text-xs font-mono text-slate-600">
                  Destinatario: <strong>{lastTriggeredEmail.to}</strong> · CC: {lastTriggeredEmail.cc}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setEmailModal({ open: true, emailId: lastTriggeredEmail.id })}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink hover:bg-brand text-white px-4 py-2 text-xs font-mono font-bold uppercase transition-colors"
              >
                <Eye className="size-3.5" />
                <span>Ver Email HTML Enviado</span>
              </button>
              <button
                type="button"
                onClick={() => setLastTriggeredEmail(null)}
                className="text-xs font-mono text-slate-500 hover:text-slate-900 px-2"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* FICHA RESUMEN DEL EXPEDIENTE Y BARRA DE 6 ETAPAS */}
        <div className="rounded-2xl border border-line-strong bg-white p-6 sm:p-8 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs font-bold uppercase px-2.5 py-1 rounded bg-ink text-white">
                  EXPEDIENTE {selectedOrder.code}
                </span>
                <span className="font-mono text-xs font-bold uppercase px-2.5 py-1 rounded bg-brand-soft text-brand border border-brand/30">
                  ETAPA {selectedOrder.currentStep} DE 6 · {WORKFLOW_STAGES[selectedOrder.currentStep - 1]?.shortLabel}
                </span>
                {selectedOrder.virtualRecord && (
                  <span className="font-mono text-xs font-bold uppercase px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                    SERIE: {selectedOrder.virtualRecord.serialNumber}
                  </span>
                )}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-ink mt-2">
                {selectedOrder.client.company} — {selectedOrder.technicalSpec.format} ({selectedOrder.technicalSpec.capacityLiters.toLocaleString('es-AR')} L)
              </h2>
              <p className="text-xs sm:text-sm text-steel-600 font-sans mt-1">
                Solicitante: <strong>{selectedOrder.client.name}</strong> ({selectedOrder.client.email}) · Destino: {selectedOrder.client.location} · Fluido: <strong>{selectedOrder.technicalSpec.fluid}</strong>
              </p>
            </div>

            <div className="text-left md:text-right font-mono text-xs shrink-0 bg-paper-2 p-3.5 rounded-xl border border-line">
              <span className="text-[10px] text-steel-500 block uppercase">DIMENSIONES NOMINALES</span>
              <span className="text-sm font-bold text-ink block mt-0.5">
                Ø {selectedOrder.technicalSpec.diameter} × H {selectedOrder.technicalSpec.height}
              </span>
              <span className="text-[11px] text-brand font-semibold block mt-0.5">
                Sin soldadura fondo-cilindro
              </span>
            </div>
          </div>

          {/* STEPPER INDUSTRIAL DE LAS 6 ETAPAS */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {WORKFLOW_STAGES.map((st) => {
                const isDone = selectedOrder.currentStep > st.step || selectedOrder.currentStep === 6;
                const isCurrent = selectedOrder.currentStep === st.step && selectedOrder.currentStep !== 6;
                return (
                  <div
                    key={st.id}
                    className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                      isCurrent
                        ? 'border-2 border-brand bg-lime-50/60 shadow-xs'
                        : isDone
                        ? 'border-emerald-300 bg-emerald-50/30'
                        : 'border-slate-200 bg-slate-50 opacity-65'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`size-6 rounded-full font-mono text-xs font-bold flex items-center justify-center ${
                          isDone
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-brand text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {isDone ? <Check className="size-3.5" /> : st.step}
                      </span>
                      <span className="font-mono text-[10px] uppercase text-slate-500 font-semibold">
                        {st.actor}
                      </span>
                    </div>
                    <div>
                      <span className="font-display text-xs font-bold uppercase text-slate-900 block leading-tight">
                        {st.shortLabel}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500 block mt-1">
                        {isDone ? '✓ Completado' : isCurrent ? '● En Curso Ahora' : 'Pendiente'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* GRILLA PRINCIPAL: IZQUIERDA (ACCIÓN DE ETAPA ACTUAL + REGISTRO VIRTUAL) / DERECHA (DOCUMENTOS Y BITÁCORA) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* COLUMNA IZQUIERDA (8 COLS): PANEL DE INTERACCIÓN SEGÚN ETAPA */}
          <div className="lg:col-span-8 space-y-6">
            {/* =====================================================================
                ETAPA 1: PEDIDO DE COTIZACIÓN INGRESADO -> ESPERANDO PRESUPUESTO
               ===================================================================== */}
            {selectedOrder.currentStep === 1 && (
              <div className="rounded-2xl border-2 border-ink bg-white p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase text-brand">
                      ETAPA ACTUAL (1 DE 6) · REQUERIMIENTO TÉCNICO RECIBIDO
                    </span>
                    <h3 className="font-display text-2xl font-black uppercase text-ink mt-1">
                      Elaboración de Presupuesto y Condiciones
                    </h3>
                  </div>
                  <Clock className="size-8 text-brand shrink-0" />
                </div>

                {roleMode === 'cliente' ? (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-700 font-sans leading-relaxed">
                      Su pedido de cotización <strong>{selectedOrder.code}</strong> fue enviado correctamente al Departamento de Ingeniería de Eboplast S.A. Recibirá un correo automático en <strong>{selectedOrder.client.email}</strong> apenas se cargue el presupuesto oficial con las condiciones comerciales.
                    </p>
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4">
                      <span className="text-xs font-mono text-amber-900">
                        💡 <strong>Modo Demostración:</strong> Cambie a &ldquo;Vista Eboplast (Fábrica)&rdquo; para responder este pedido con el presupuesto formal y disparar el mail al cliente.
                      </span>
                      <button
                        type="button"
                        onClick={() => setRoleMode('eboplast')}
                        className="shrink-0 rounded-lg bg-ink text-white px-3.5 py-2 text-xs font-mono font-bold uppercase hover:bg-brand transition-colors"
                      >
                        Cambiar a Vista Eboplast →
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={onSendQuote} className="space-y-4 font-sans">
                    <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300 text-xs font-mono text-slate-800">
                      🏭 <strong>Acción de Eboplast S.A.:</strong> Complete las condiciones del presupuesto para enviarlo por mail a <strong>{selectedOrder.client.email}</strong> y avanzar a la Etapa 2.
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                          N° de Presupuesto *
                        </label>
                        <input
                          type="text"
                          required
                          value={quoteForm.quoteNumber}
                          onChange={(e) => setQuoteForm({ ...quoteForm, quoteNumber: e.target.value })}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                          Moneda e Importe *
                        </label>
                        <div className="flex gap-1.5">
                          <select
                            value={quoteForm.currency}
                            onChange={(e) => setQuoteForm({ ...quoteForm, currency: e.target.value })}
                            className="border border-slate-300 rounded-lg px-2 py-2 text-sm font-mono bg-white"
                          >
                            <option value="USD">USD</option>
                            <option value="ARS">ARS</option>
                          </select>
                          <input
                            type="text"
                            required
                            value={quoteForm.amount}
                            onChange={(e) => setQuoteForm({ ...quoteForm, amount: e.target.value })}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                          Plazo de Entrega *
                        </label>
                        <input
                          type="text"
                          required
                          value={quoteForm.deliveryTime}
                          onChange={(e) => setQuoteForm({ ...quoteForm, deliveryTime: e.target.value })}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                          Normas de Fabricación Aplicadas
                        </label>
                        <input
                          type="text"
                          value={quoteForm.standardApplied}
                          onChange={(e) => setQuoteForm({ ...quoteForm, standardApplied: e.target.value })}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                          Resina Especificada
                        </label>
                        <input
                          type="text"
                          value={quoteForm.resinSelected}
                          onChange={(e) => setQuoteForm({ ...quoteForm, resinSelected: e.target.value })}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                        Condiciones de Pago *
                      </label>
                      <input
                        type="text"
                        required
                        value={quoteForm.paymentTerms}
                        onChange={(e) => setQuoteForm({ ...quoteForm, paymentTerms: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                        Adjuntar PDF del Presupuesto Formal (Opcional)
                      </label>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => handleFileInput(e, (f) => setQuoteForm({ ...quoteForm, file: f }))}
                        className="w-full text-xs font-mono file:mr-3 file:rounded-lg file:border-0 file:bg-ink file:px-3 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-brand"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={busy}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-hover text-white font-mono font-bold py-4 px-6 text-xs uppercase tracking-wider shadow-sm transition-all"
                    >
                      <Send className="size-4" />
                      <span>{busy ? 'Enviando...' : 'Enviar Presupuesto al Cliente'}</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* =====================================================================
                ETAPA 2: PRESUPUESTO ENVIADO -> CLIENTE CARGA ORDEN DE COMPRA + ARCHIVO
               ===================================================================== */}
            {selectedOrder.currentStep === 2 && selectedOrder.quote && (
              <div className="rounded-2xl border-2 border-brand bg-white p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-4 gap-4">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase text-brand">
                      ETAPA ACTUAL (2 DE 6) · PRESUPUESTO Y CONDICIONES RECIBIDAS
                    </span>
                    <h3 className="font-display text-2xl font-black uppercase text-ink mt-1">
                      Revisión de Presupuesto y Carga de Orden de Compra
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setViewerModal({ open: true, docType: 'quote', customFile: null })}
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink hover:bg-brand text-white px-4 py-2 text-xs font-mono font-bold uppercase transition-colors"
                  >
                    <Eye className="size-3.5" />
                    <span>Ver / Imprimir Presupuesto</span>
                  </button>
                </div>

                {/* Resumen de Condiciones Comerciales */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-paper-2 p-4 rounded-xl border border-line-strong font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-steel-500 block uppercase">VALOR PRESUPUESTADO</span>
                    <span className="text-lg font-black text-ink">
                      {selectedOrder.quote.currency} {selectedOrder.quote.amount}
                    </span>
                    <span className="text-[11px] text-brand block font-bold">{selectedOrder.quote.taxNote}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-steel-500 block uppercase">PLAZO DE FABRICACIÓN</span>
                    <span className="text-xs font-bold text-ink block mt-1">{selectedOrder.quote.deliveryTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-steel-500 block uppercase">NORMA Y RESINA</span>
                    <span className="text-xs font-bold text-ink block mt-1">{selectedOrder.quote.standardApplied}</span>
                    <span className="text-[11px] text-steel-600 block">{selectedOrder.quote.resinSelected}</span>
                  </div>
                  <div className="sm:col-span-3 pt-2 border-t border-line">
                    <span className="text-[10px] text-steel-500 uppercase">CONDICIONES DE PAGO: </span>
                    <strong className="text-ink">{selectedOrder.quote.paymentTerms}</strong>
                  </div>
                </div>

                {/* Formulario del Cliente para subir Orden de Compra / Comprobante */}
                <form onSubmit={onUploadPO} className="space-y-4 pt-2 border-t border-slate-200 font-sans">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-ink">
                    <Upload className="size-4 text-brand" />
                    <span>Formulario de Aceptación y Carga de Orden de Compra (Cliente)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1">
                        Número de Orden de Compra (OC) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: OC-2026-00412"
                        value={poForm.poNumber}
                        onChange={(e) => setPoForm({ ...poForm, poNumber: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1">
                        Responsable que Autoriza *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nombre y Cargo"
                        value={poForm.acceptedBy}
                        onChange={(e) => setPoForm({ ...poForm, acceptedBy: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1">
                      Referencia de Comprobante / Anticipo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Transferencia Bancaria Anticipo 40% - Comprobante adjunto"
                      value={poForm.paymentReference}
                      onChange={(e) => setPoForm({ ...poForm, paymentReference: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm"
                    />
                  </div>

                  {/* Carga de archivo comprobante */}
                  <div className="p-4 rounded-xl border-2 border-dashed border-brand/50 bg-lime-50/40">
                    <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5">
                      📎 Subir Archivo de Orden de Compra o Comprobante de Pago (PDF / Imagen)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,image/*,.doc,.docx"
                      onChange={(e) => handleFileInput(e, (f) => setPoForm({ ...poForm, file: f }))}
                      className="w-full text-xs font-mono file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:px-4 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-brand-hover cursor-pointer"
                    />
                    {poForm.file && (
                      <p className="mt-2 text-xs font-mono text-emerald-700 font-bold">
                        ✓ Archivo listo para adjuntar: {poForm.file.name} ({poForm.file.size})
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1">
                      Observaciones para Ingeniería (Planos / Bridas)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Indique cualquier detalle para la confección del plano de aprobación..."
                      value={poForm.notes}
                      onChange={(e) => setPoForm({ ...poForm, notes: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-hover text-white font-mono font-bold py-4 px-6 text-xs uppercase tracking-wider shadow-sm transition-all"
                  >
                    <CheckCircle2 className="size-4" />
                    <span>{busy ? 'Procesando...' : 'Aceptar Condiciones y Enviar Orden de Compra'}</span>
                  </button>
                </form>
              </div>
            )}

            {/* =====================================================================
                ETAPA 3: ORDEN DE COMPRA RECIBIDA -> EBOPLAST ENVÍA PLANO TÉCNICO
               ===================================================================== */}
            {selectedOrder.currentStep === 3 && (
              <div className="rounded-2xl border-2 border-ink bg-white p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase text-brand">
                      ETAPA ACTUAL (3 DE 6) · ORDEN DE COMPRA {selectedOrder.purchaseOrder?.poNumber} RECIBIDA
                    </span>
                    <h3 className="font-display text-2xl font-black uppercase text-ink mt-1">
                      Confección y Envío de Plano Técnico para Aprobación
                    </h3>
                  </div>
                  <Compass className="size-8 text-brand shrink-0" />
                </div>

                {roleMode === 'cliente' ? (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-700 font-sans leading-relaxed">
                      Hemos registrado su Orden de Compra <strong>{selectedOrder.purchaseOrder?.poNumber}</strong>. Nuestra Oficina Técnica está confeccionando el <strong>Plano Constructivo</strong> de su tanque. Recibirá un aviso por correo electrónico para revisarlo y aprobarlo antes de iniciar la construcción.
                    </p>
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4">
                      <span className="text-xs font-mono text-amber-900">
                        💡 <strong>Modo Demostración:</strong> Cambie a &ldquo;Vista Eboplast (Fábrica)&rdquo; para subir el plano técnico y enviarlo a aprobación del cliente.
                      </span>
                      <button
                        type="button"
                        onClick={() => setRoleMode('eboplast')}
                        className="shrink-0 rounded-lg bg-ink text-white px-3.5 py-2 text-xs font-mono font-bold uppercase hover:bg-brand transition-colors"
                      >
                        Subir Plano como Eboplast →
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={onSendBlueprint} className="space-y-4 font-sans">
                    <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300 text-xs font-mono text-slate-800">
                      🏭 <strong>Oficina Técnica Eboplast S.A.:</strong> Cargue el Plano Técnico del tanque para enviarlo por correo a <strong>{selectedOrder.client.email}</strong> y solicitar su aprobación previa a fabricar.
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                          Código de Plano *
                        </label>
                        <input
                          type="text"
                          required
                          value={bpForm.drawingNumber}
                          onChange={(e) => setBpForm({ ...bpForm, drawingNumber: e.target.value })}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                          Revisión *
                        </label>
                        <input
                          type="text"
                          required
                          value={bpForm.revision}
                          onChange={(e) => setBpForm({ ...bpForm, revision: e.target.value })}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                          Diámetro × Altura Total
                        </label>
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            value={bpForm.diameter}
                            onChange={(e) => setBpForm({ ...bpForm, diameter: e.target.value })}
                            placeholder="Ø mm"
                            className="w-1/2 border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-mono"
                          />
                          <input
                            type="text"
                            value={bpForm.totalHeight}
                            onChange={(e) => setBpForm({ ...bpForm, totalHeight: e.target.value })}
                            placeholder="H mm"
                            className="w-1/2 border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                        Detalle de Boquillas / Bridas en Plano
                      </label>
                      <input
                        type="text"
                        value={bpForm.nozzles}
                        onChange={(e) => setBpForm({ ...bpForm, nozzles: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
                      <label className="block text-xs font-mono font-bold uppercase text-slate-800 mb-1.5">
                        📐 Subir Archivo del Plano Técnico (PDF / Imagen / CAD exportado)
                      </label>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => handleFileInput(e, (f) => setBpForm({ ...bpForm, file: f }))}
                        className="w-full text-xs font-mono file:mr-3 file:rounded-lg file:border-0 file:bg-ink file:px-4 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-brand cursor-pointer"
                      />
                      {bpForm.file && (
                        <p className="mt-2 text-xs font-mono text-emerald-700 font-bold">
                          ✓ Plano adjunto: {bpForm.file.name} ({bpForm.file.size})
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={busy}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-hover text-white font-mono font-bold py-4 px-6 text-xs uppercase tracking-wider shadow-sm transition-all"
                    >
                      <Send className="size-4" />
                      <span>{busy ? 'Enviando Plano...' : 'Enviar Plano Técnico para Aprobación'}</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* =====================================================================
                ETAPA 4: PLANO TÉCNICO EN APROBACIÓN DEL CLIENTE (PASO CRÍTICO)
               ===================================================================== */}
            {selectedOrder.currentStep === 4 && selectedOrder.blueprint && (
              <div className="rounded-2xl border-2 border-brand bg-white p-6 sm:p-8 shadow-md space-y-6">
                <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-4 gap-4">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase text-brand">
                      ETAPA ACTUAL (4 DE 6) · APROBACIÓN DE PLANO PREVIA A FABRICACIÓN
                    </span>
                    <h3 className="font-display text-2xl font-black uppercase text-ink mt-1">
                      Plano Técnico {selectedOrder.blueprint.drawingNumber} ({selectedOrder.blueprint.revision})
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setViewerModal({ open: true, docType: 'blueprint', customFile: null })}
                    className="inline-flex items-center gap-2 rounded-full bg-ink hover:bg-brand text-white px-5 py-2.5 text-xs font-mono font-bold uppercase transition-colors shadow-xs"
                  >
                    <Compass className="size-4 text-brand-bright" />
                    <span>Abrir Plano Técnico Completo</span>
                  </button>
                </div>

                {/* Alerta si el plano fue observado por el cliente */}
                {selectedOrder.blueprintStatus === 'observado' && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 space-y-2">
                    <div className="flex items-center gap-2 text-amber-900 font-mono text-xs font-bold uppercase">
                      <AlertTriangle className="size-4 text-amber-600" />
                      <span>Plano con Observaciones del Cliente — Esperando Nueva Revisión de Eboplast</span>
                    </div>
                    {selectedOrder.blueprint.observations?.map((obs, i) => (
                      <p key={i} className="text-xs text-amber-800 font-sans">
                        <strong>{obs.author}:</strong> &ldquo;{obs.comment}&rdquo;
                      </p>
                    ))}
                    {roleMode === 'cliente' && (
                      <button
                        type="button"
                        onClick={() => setRoleMode('eboplast')}
                        className="mt-2 inline-flex items-center gap-1 rounded bg-amber-800 text-white px-3 py-1.5 text-xs font-mono font-bold uppercase"
                      >
                        Cambiar a Vista Eboplast para subir Rev. B →
                      </button>
                    )}
                  </div>
                )}

                {/* Vista Previa Embebida del Plano Técnico */}
                <div className="rounded-xl border border-slate-300 bg-slate-50 p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-600 gap-2">
                    <span>
                      <strong>DIMENSIONES:</strong> Ø {selectedOrder.blueprint.specs.diameter} × H {selectedOrder.blueprint.specs.totalHeight}
                    </span>
                    <span className="text-[#5b8314] font-bold">
                      ✓ SIN SOLDADURA ENTRE FONDO Y CILINDRO (MENOR RIESGO DE ATAQUE QUÍMICO)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono bg-white p-3.5 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-400 block">ESPESOR BASE / SUP.</span>
                      <strong className="text-slate-900">
                        {selectedOrder.blueprint.specs.wallThicknessBase} / {selectedOrder.blueprint.specs.wallThicknessTop}
                      </strong>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-[10px] text-slate-400 block">CONEXIONES Y BRIDAS ESPECIFICADAS</span>
                      <strong className="text-slate-900">{selectedOrder.blueprint.specs.nozzles}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    <strong>Notas de Ingeniería:</strong> {selectedOrder.blueprint.notes}
                  </p>
                </div>

                {/* Si está en Vista Eboplast y el plano fue observado, permitir subir nueva revisión */}
                {roleMode === 'eboplast' && (
                  <form onSubmit={onSendBlueprint} className="p-5 rounded-xl bg-slate-100 border border-slate-300 space-y-3">
                    <h4 className="font-mono text-xs font-bold uppercase text-ink">
                      🏭 Oficina Técnica Eboplast: Subir Nueva Revisión de Plano ({bpForm.revision})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={bpForm.revision}
                        onChange={(e) => setBpForm({ ...bpForm, revision: e.target.value })}
                        placeholder="Ej: Rev. B"
                        className="bg-white border border-slate-300 rounded px-3 py-2 text-xs font-mono"
                      />
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => handleFileInput(e, (f) => setBpForm({ ...bpForm, file: f }))}
                        className="text-xs font-mono"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={bpForm.notes}
                      onChange={(e) => setBpForm({ ...bpForm, notes: e.target.value })}
                      placeholder="Detalle los ajustes realizados en esta revisión..."
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs"
                    />
                    <button
                      type="submit"
                      disabled={busy}
                      className="rounded-full bg-ink hover:bg-brand text-white px-5 py-2.5 text-xs font-mono font-bold uppercase transition-colors"
                    >
                      Enviar Nueva Revisión al Cliente por Email
                    </button>
                  </form>
                )}

                {/* Formulario del Cliente para Aprobar el Plano e Iniciar Construcción */}
                <div className="pt-2 border-t border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase text-ink">
                      ✍️ Conformidad Técnica del Cliente para Iniciar Fabricación
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      Requisito obligatorio previo al bobinado
                    </span>
                  </div>

                  <form onSubmit={onApproveBlueprint} className="space-y-4 font-sans">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1">
                          Aprobado por (Nombre y Apellido) *
                        </label>
                        <input
                          type="text"
                          required
                          value={reviewForm.approvedBy}
                          onChange={(e) => setReviewForm({ ...reviewForm, approvedBy: e.target.value })}
                          className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1">
                          Cargo / Sector *
                        </label>
                        <input
                          type="text"
                          required
                          value={reviewForm.role}
                          onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                          className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1">
                        Nota de Conformidad
                      </label>
                      <input
                        type="text"
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-sm"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                      <button
                        type="submit"
                        disabled={busy}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-hover text-white font-mono font-bold py-4 px-6 text-xs uppercase tracking-wider shadow-md transition-all"
                      >
                        <CheckCircle2 className="size-4" />
                        <span>{busy ? 'Registrando...' : 'Aprobar Plano Técnico y Habilitar Construcción'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setReviewForm((prev) => ({
                            ...prev,
                            showObservationInput: !prev.showObservationInput,
                          }))
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-900 font-mono font-bold py-4 px-5 text-xs uppercase transition-colors"
                      >
                        <AlertTriangle className="size-4 text-amber-600" />
                        <span>Solicitar Cambio en Plano</span>
                      </button>
                    </div>
                  </form>

                  {/* Sub-formulario si el cliente quiere pedir una corrección al plano */}
                  {reviewForm.showObservationInput && (
                    <form
                      onSubmit={onRequestBlueprintChanges}
                      className="p-4 rounded-xl bg-amber-50 border border-amber-300 space-y-3"
                    >
                      <label className="block text-xs font-mono font-bold uppercase text-amber-950">
                        Indique las modificaciones requeridas en el plano (posiciones de bridas, cotas, accesorios):
                      </label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Ej: Necesitamos rotar la brida de descarga a 90° y agregar una cupla de 2 pulgadas en la cúpula..."
                        value={reviewForm.observationText}
                        onChange={(e) => setReviewForm({ ...reviewForm, observationText: e.target.value })}
                        className="w-full bg-white border border-amber-300 rounded-lg px-3 py-2 text-sm"
                      />
                      <button
                        type="submit"
                        disabled={busy}
                        className="inline-flex items-center gap-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 text-xs font-mono font-bold uppercase"
                      >
                        <Send className="size-3.5" />
                        <span>Enviar Observación a Ingeniería Eboplast</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* =====================================================================
                ETAPA 5: EN CONSTRUCCIÓN EN PLANTA (CON PLANO APROBADO)
               ===================================================================== */}
            {selectedOrder.currentStep === 5 && (
              <div className="rounded-2xl border-2 border-brand bg-white p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-4 gap-4">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase text-brand">
                      ETAPA ACTUAL (5 DE 6) · PLANO APROBADO · TANQUE EN CONSTRUCCIÓN
                    </span>
                    <h3 className="font-display text-2xl font-black uppercase text-ink mt-1">
                      Avance de Fabricación en Planta Rosario
                    </h3>
                  </div>
                  <span className="font-mono text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-300">
                    Plano {selectedOrder.blueprint?.drawingNumber} Aprobado ✓
                  </span>
                </div>

                {/* Constancia de Aprobación del Plano */}
                {selectedOrder.blueprint?.approval && (
                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs font-mono flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-emerald-900 font-bold block">
                        ✓ CONFORMIDAD DE PLANO REGISTRADA: {selectedOrder.blueprint.approval.approvedBy} ({selectedOrder.blueprint.approval.role})
                      </span>
                      <span className="text-emerald-700 text-[11px]">
                        Firma digital: {selectedOrder.blueprint.approval.digitalSignatureHash} · Fecha: {new Date(selectedOrder.blueprint.approval.approvedAt).toLocaleString('es-AR')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Hitos de Producción */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-xs font-bold uppercase text-slate-700">
                      Hitos de Manufactura Filament Winding:
                    </h4>
                    {roleMode === 'eboplast' && (
                      <span className="text-[11px] font-mono text-brand font-bold">
                        (Haga clic en un hito para marcar avance y notificar por mail)
                      </span>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    {(selectedOrder.production?.milestones || []).map((m) => (
                      <div
                        key={m.id}
                        onClick={() => roleMode === 'eboplast' && onToggleMilestone(m.id)}
                        className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                          roleMode === 'eboplast' ? 'cursor-pointer hover:border-ink' : ''
                        } ${
                          m.done
                            ? 'bg-lime-50/50 border-brand/50'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 size-5 rounded-full flex items-center justify-center shrink-0 ${
                              m.done ? 'bg-brand text-white' : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {m.done ? <Check className="size-3.5" /> : <Clock className="size-3" />}
                          </div>
                          <div>
                            <span className="font-display text-sm font-bold text-slate-900 block">
                              {m.title}
                            </span>
                            <span className="text-xs text-slate-600 font-sans">{m.desc}</span>
                          </div>
                        </div>
                        <span className="font-mono text-[11px] shrink-0 font-bold text-slate-600">
                          {m.done ? `✓ ${m.date}` : 'En proceso'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Si está en Vista Cliente, botón para simular el cierre de entrega como Eboplast */}
                {roleMode === 'cliente' ? (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4">
                    <span className="text-xs font-mono text-amber-900">
                      💡 <strong>Modo Demostración:</strong> Cambie a &ldquo;Vista Eboplast (Fábrica)&rdquo; para registrar la entrega del tanque y generar el <strong>Registro Virtual Permanente</strong>.
                    </span>
                    <button
                      type="button"
                      onClick={() => setRoleMode('eboplast')}
                      className="shrink-0 rounded-lg bg-ink text-white px-3.5 py-2 text-xs font-mono font-bold uppercase hover:bg-brand transition-colors"
                    >
                      Finalizar Entrega como Eboplast →
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={onCompleteDelivery}
                    className="p-5 rounded-xl bg-slate-100 border-2 border-ink space-y-4 font-sans"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-base font-black uppercase text-ink">
                        🏭 Cierre de Obra: Registrar Entrega y Emitir Registro Virtual del Tanque
                      </h4>
                      <Award className="size-5 text-brand" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                          N° de Serie Asignado al Tanque *
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryForm.serialNumber}
                          onChange={(e) => setDeliveryForm({ ...deliveryForm, serialNumber: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                          Lote de Resina Utilizada *
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryForm.resinBatch}
                          onChange={(e) => setDeliveryForm({ ...deliveryForm, resinBatch: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                          Remito de Despacho / Entrega *
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryForm.dispatchRemito}
                          onChange={(e) => setDeliveryForm({ ...deliveryForm, dispatchRemito: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                          Recibido en Conformidad por *
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryForm.receivedBy}
                          onChange={(e) => setDeliveryForm({ ...deliveryForm, receivedBy: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                        Adjuntar Acta de Recepción o Certificado Firmado (Opcional)
                      </label>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => handleFileInput(e, (f) => setDeliveryForm({ ...deliveryForm, file: f }))}
                        className="w-full text-xs font-mono file:mr-3 file:rounded-lg file:border-0 file:bg-ink file:px-3 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-brand"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={busy}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-hover text-white font-mono font-bold py-4 px-6 text-xs uppercase tracking-wider shadow-md transition-all"
                    >
                      <ShieldCheck className="size-4" />
                      <span>
                        {busy
                          ? 'Generando Registro Virtual...'
                          : 'Confirmar Entrega del Tanque y Emitir Registro Virtual'}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* =====================================================================
                ETAPA 6: REGISTRO VIRTUAL PERMANENTE DEL TANQUE (LEGAJO DIGITAL)
               ===================================================================== */}
            {selectedOrder.currentStep === 6 && selectedOrder.virtualRecord && (
              <div className="rounded-2xl border-2 border-[#5b8314] bg-white p-6 sm:p-8 shadow-md space-y-6">
                <div className="flex flex-wrap items-center justify-between border-b-2 border-slate-900 pb-5 gap-4">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase text-[#5b8314] block">
                      ✓ ETAPA 6 COMPLETADA · REGISTRO VIRTUAL PERMANENTE HABILITADO
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-slate-950 mt-1">
                      Pasaporte Técnico del Tanque · {selectedOrder.virtualRecord.serialNumber}
                    </h3>
                    <p className="text-xs font-mono text-slate-500 mt-0.5">
                      Expediente {selectedOrder.code} · Entregado el {selectedOrder.virtualRecord.deliveryDate}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setViewerModal({ open: true, docType: 'certificate', customFile: null })}
                    className="inline-flex items-center gap-2 rounded-full bg-[#5b8314] hover:bg-[#48680f] text-white px-5 py-3 text-xs font-mono font-bold uppercase shadow-sm transition-all"
                  >
                    <ShieldCheck className="size-4" />
                    <span>Ver / Imprimir Certificado Oficial</span>
                  </button>
                </div>

                {/* Placa de Identificación Industrial del Equipo */}
                <div className="rounded-xl border-2 border-slate-900 bg-slate-50 p-5 font-mono text-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-300 pb-2.5">
                    <span className="font-bold uppercase text-slate-900">
                      PLACA VIRTUAL DE TRAZABILIDAD — EBOPLAST S.A. (FUNDADA EN 1978)
                    </span>
                    <span className="bg-emerald-600 text-white px-2.5 py-0.5 rounded font-bold text-[10px]">
                      GARANTÍA ACTIVA
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-[10px] text-slate-500 block">N° DE SERIE DE FÁBRICA</span>
                      <strong className="text-slate-950 text-sm">{selectedOrder.virtualRecord.serialNumber}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">CAPACIDAD Y DIMENSIONES</span>
                      <strong className="text-slate-950">
                        {selectedOrder.technicalSpec.capacityLiters.toLocaleString('es-AR')} L (Ø {selectedOrder.technicalSpec.diameter} × {selectedOrder.technicalSpec.height})
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">FLUIDO / APLICACIÓN</span>
                      <strong className="text-slate-950">{selectedOrder.technicalSpec.fluid}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">NORMAS CONSTRUCTIVAS</span>
                      <strong className="text-slate-950">{selectedOrder.virtualRecord.normApplied}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">LOTE TRAZABILIDAD RESINA</span>
                      <strong className="text-slate-950">{selectedOrder.virtualRecord.resinBatch}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">DUREZA BARCOL / ENSAYO</span>
                      <strong className="text-emerald-700">{selectedOrder.virtualRecord.barcolHardness}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">ORDEN DE COMPRA CLIENTE</span>
                      <strong className="text-slate-950">{selectedOrder.purchaseOrder?.poNumber || '-'}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">PLANO CONSTRUCTIVO</span>
                      <strong className="text-slate-950">
                        {selectedOrder.blueprint?.drawingNumber} ({selectedOrder.blueprint?.revision})
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">REMITO Y GARANTÍA</span>
                      <strong className="text-[#5b8314]">{selectedOrder.virtualRecord.warrantyExpiration}</strong>
                    </div>
                  </div>
                </div>

                {/* Acceso directo a los documentos del Registro Virtual */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setViewerModal({ open: true, docType: 'blueprint', customFile: null })}
                    className="p-4 rounded-xl border border-slate-200 hover:border-ink bg-paper-2 text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-steel-500 block uppercase">PLANO FINAL</span>
                      <span className="font-display text-sm font-bold text-ink group-hover:text-brand">
                        {selectedOrder.blueprint?.drawingNumber}
                      </span>
                    </div>
                    <Compass className="size-5 text-brand" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewerModal({ open: true, docType: 'quote', customFile: null })}
                    className="p-4 rounded-xl border border-slate-200 hover:border-ink bg-paper-2 text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-steel-500 block uppercase">PRESUPUESTO</span>
                      <span className="font-display text-sm font-bold text-ink group-hover:text-brand">
                        {selectedOrder.quote?.quoteNumber}
                      </span>
                    </div>
                    <FileText className="size-5 text-brand" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewerModal({ open: true, docType: 'certificate', customFile: null })}
                    className="p-4 rounded-xl border border-brand/40 hover:border-brand bg-lime-50/50 text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-brand font-bold block uppercase">GARANTÍA 1 AÑO</span>
                      <span className="font-display text-sm font-bold text-ink">
                        Certificado Oficial
                      </span>
                    </div>
                    <ShieldCheck className="size-5 text-brand" />
                  </button>
                </div>
              </div>
            )}

            {/* FICHA TÉCNICA COMPLETA DEL REQUERIMIENTO ORIGINAL */}
            <div className="rounded-2xl border border-line-strong bg-white p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <TechLabel index="ESPECIFICACIÓN">Datos Técnicos del Tanque Solicitado</TechLabel>
                <span className="font-mono text-xs text-slate-500">
                  Ingresado el {new Date(selectedOrder.createdAt).toLocaleDateString('es-AR')}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-paper-2 border border-line">
                  <span className="text-[10px] text-steel-500 block uppercase">Formato Estructural</span>
                  <strong className="text-ink text-sm block mt-0.5">{selectedOrder.technicalSpec.format}</strong>
                </div>
                <div className="p-3.5 rounded-xl bg-paper-2 border border-line">
                  <span className="text-[10px] text-steel-500 block uppercase">Volumen Requerido</span>
                  <strong className="text-brand text-sm block mt-0.5">
                    {selectedOrder.technicalSpec.capacityLiters.toLocaleString('es-AR')} Litros
                  </strong>
                </div>
                <div className="p-3.5 rounded-xl bg-paper-2 border border-line">
                  <span className="text-[10px] text-steel-500 block uppercase">Fluido Químico</span>
                  <strong className="text-ink text-sm block mt-0.5">{selectedOrder.technicalSpec.fluid}</strong>
                </div>
                <div className="p-3.5 rounded-xl bg-paper-2 border border-line">
                  <span className="text-[10px] text-steel-500 block uppercase">Dimensiones Estimadas</span>
                  <strong className="text-ink block mt-0.5">
                    Ø {selectedOrder.technicalSpec.diameter} × H {selectedOrder.technicalSpec.height}
                  </strong>
                </div>
                <div className="p-3.5 rounded-xl bg-paper-2 border border-line">
                  <span className="text-[10px] text-steel-500 block uppercase">Temperatura / Densidad</span>
                  <strong className="text-ink block mt-0.5">
                    {selectedOrder.technicalSpec.temperature} · {selectedOrder.technicalSpec.density}
                  </strong>
                </div>
                <div className="p-3.5 rounded-xl bg-paper-2 border border-line">
                  <span className="text-[10px] text-steel-500 block uppercase">Unión Fondo-Cilindro</span>
                  <strong className="text-emerald-700 block mt-0.5">
                    Monolítica sin soldadura
                  </strong>
                </div>
              </div>

              {selectedOrder.technicalSpec.accessories?.length > 0 && (
                <div className="pt-2">
                  <span className="font-mono text-[11px] uppercase text-steel-500 font-bold block mb-2">
                    Accesorios y Opcionales Incluidos:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedOrder.technicalSpec.accessories.map((acc, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 rounded-full bg-lime-50 border border-lime-200 px-3 py-1 text-xs font-mono text-slate-800"
                      >
                        <Check className="size-3 text-brand" />
                        <span>{acc}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedOrder.technicalSpec.notes && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-700">
                  <strong className="font-mono uppercase text-[11px] text-slate-500 block mb-0.5">
                    Notas del Cliente:
                  </strong>
                  {selectedOrder.technicalSpec.notes}
                </div>
              )}
            </div>
          </div>

          {/* COLUMNA DERECHA (4 COLS): REPOSITORIO DE ARCHIVOS ADJUNTOS + BITÁCORA HISTÓRICA */}
          <div className="lg:col-span-4 space-y-6">
            {/* REPOSITORIO DOCUMENTAL DEL EXPEDIENTE */}
            <div className="rounded-2xl border border-line-strong bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <TechLabel index="ARCHIVOS">Documentación Adjunta</TechLabel>
                <FileText className="size-4 text-brand" />
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                {/* 1. Especificación inicial */}
                {selectedOrder.technicalSpec.attachment && (
                  <button
                    type="button"
                    onClick={() => setViewerModal({ open: true, docType: 'spec', customFile: null })}
                    className="w-full p-3 rounded-xl border border-slate-200 hover:border-ink bg-slate-50/70 text-left flex items-center justify-between gap-2 transition-colors"
                  >
                    <div className="truncate">
                      <span className="text-[10px] text-slate-500 block uppercase">1. REQUERIMIENTO CLIENTE</span>
                      <span className="font-bold text-slate-900 truncate block">
                        {selectedOrder.technicalSpec.attachment.name}
                      </span>
                    </div>
                    <Eye className="size-4 text-brand shrink-0" />
                  </button>
                )}

                {/* 2. Presupuesto Oficial */}
                {selectedOrder.quote?.file ? (
                  <button
                    type="button"
                    onClick={() => setViewerModal({ open: true, docType: 'quote', customFile: null })}
                    className="w-full p-3 rounded-xl border border-slate-200 hover:border-ink bg-slate-50/70 text-left flex items-center justify-between gap-2 transition-colors"
                  >
                    <div className="truncate">
                      <span className="text-[10px] text-slate-500 block uppercase">
                        2. PRESUPUESTO ({selectedOrder.quote.quoteNumber})
                      </span>
                      <span className="font-bold text-slate-900 truncate block">
                        {selectedOrder.quote.file.name}
                      </span>
                    </div>
                    <Eye className="size-4 text-brand shrink-0" />
                  </button>
                ) : (
                  <div className="p-3 rounded-xl border border-dashed border-slate-200 text-slate-400 text-[11px]">
                    2. Presupuesto Formal: Pendiente de emisión
                  </div>
                )}

                {/* 3. Orden de Compra / Comprobante */}
                {selectedOrder.purchaseOrder?.file ? (
                  <button
                    type="button"
                    onClick={() => setViewerModal({ open: true, docType: 'po', customFile: null })}
                    className="w-full p-3 rounded-xl border border-slate-200 hover:border-ink bg-slate-50/70 text-left flex items-center justify-between gap-2 transition-colors"
                  >
                    <div className="truncate">
                      <span className="text-[10px] text-slate-500 block uppercase">
                        3. ORDEN DE COMPRA ({selectedOrder.purchaseOrder.poNumber})
                      </span>
                      <span className="font-bold text-slate-900 truncate block">
                        {selectedOrder.purchaseOrder.file.name}
                      </span>
                    </div>
                    <Eye className="size-4 text-brand shrink-0" />
                  </button>
                ) : (
                  <div className="p-3 rounded-xl border border-dashed border-slate-200 text-slate-400 text-[11px]">
                    3. Orden de Compra / Comprobante: Pendiente
                  </div>
                )}

                {/* 4. Plano Técnico */}
                {selectedOrder.blueprint?.file ? (
                  <button
                    type="button"
                    onClick={() => setViewerModal({ open: true, docType: 'blueprint', customFile: null })}
                    className="w-full p-3 rounded-xl border border-brand/40 hover:border-brand bg-lime-50/40 text-left flex items-center justify-between gap-2 transition-colors"
                  >
                    <div className="truncate">
                      <span className="text-[10px] text-brand font-bold block uppercase">
                        4. PLANO TÉCNICO ({selectedOrder.blueprint.revision})
                      </span>
                      <span className="font-bold text-slate-900 truncate block">
                        {selectedOrder.blueprint.file.name}
                      </span>
                    </div>
                    <Compass className="size-4 text-brand shrink-0" />
                  </button>
                ) : (
                  <div className="p-3 rounded-xl border border-dashed border-slate-200 text-slate-400 text-[11px]">
                    4. Plano Técnico: Se emite tras Orden de Compra
                  </div>
                )}

                {/* 5. Certificado de Garantía y Registro Virtual */}
                {selectedOrder.virtualRecord?.certificateFile ? (
                  <button
                    type="button"
                    onClick={() => setViewerModal({ open: true, docType: 'certificate', customFile: null })}
                    className="w-full p-3 rounded-xl border-2 border-emerald-500 bg-emerald-50/50 text-left flex items-center justify-between gap-2 transition-colors"
                  >
                    <div className="truncate">
                      <span className="text-[10px] text-emerald-800 font-bold block uppercase">
                        5. CERTIFICADO Y REGISTRO VIRTUAL
                      </span>
                      <span className="font-bold text-slate-900 truncate block">
                        {selectedOrder.virtualRecord.certificateFile.name}
                      </span>
                    </div>
                    <ShieldCheck className="size-4 text-emerald-700 shrink-0" />
                  </button>
                ) : (
                  <div className="p-3 rounded-xl border border-dashed border-slate-200 text-slate-400 text-[11px]">
                    5. Registro Virtual y Garantía: Al finalizar entrega
                  </div>
                )}
              </div>
            </div>

            {/* BITÁCORA DE TRAZABILIDAD Y EVENTOS */}
            <div className="rounded-2xl border border-line-strong bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <TechLabel index="HISTORIAL">Bitácora de Eventos y Mails</TechLabel>
                <button
                  type="button"
                  onClick={() => setEmailModal({ open: true, emailId: null })}
                  className="text-[11px] font-mono font-bold text-brand hover:underline"
                >
                  Ver Mails →
                </button>
              </div>

              <ol className="relative border-l-2 border-slate-200 ml-2.5 space-y-5">
                {[...(selectedOrder.timeline || [])].reverse().map((ev) => (
                  <li key={ev.id} className="ml-4">
                    <div className="absolute -left-[7px] mt-1 size-3 rounded-full bg-brand border-2 border-white" />
                    <span className="font-mono text-[10px] text-slate-400 block">
                      {new Date(ev.date).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })} · {ev.actor}
                    </span>
                    <h4 className="font-display text-xs font-bold uppercase text-slate-900 mt-0.5">
                      {ev.title}
                    </h4>
                    <p className="text-xs text-slate-600 font-sans mt-0.5 leading-relaxed">
                      {ev.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL PARA CREAR UN NUEVO PEDIDO DE COTIZACIÓN DESDE CERO */}
      {newOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-line-strong bg-white shadow-2xl overflow-hidden my-auto">
            <div className="flex items-center justify-between bg-ink text-white px-6 py-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                Ingresar Nuevo Pedido de Cotización / Requerimiento Técnico
              </span>
              <button
                type="button"
                onClick={() => setNewOrderModalOpen(false)}
                className="text-white/70 hover:text-white text-sm font-mono"
              >
                ✕
              </button>
            </div>

            <form onSubmit={onCreateNewRequirement} className="p-6 space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono font-bold uppercase text-slate-700 mb-1">
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Ing. Mariano Rossi"
                    value={newReqForm.clientName}
                    onChange={(e) => setNewReqForm({ ...newReqForm, clientName: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono font-bold uppercase text-slate-700 mb-1">
                    Empresa / Razón Social *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Aceitera del Paraná S.A."
                    value={newReqForm.company}
                    onChange={(e) => setNewReqForm({ ...newReqForm, company: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono font-bold uppercase text-slate-700 mb-1">
                    Email para Recibir Notificaciones *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ingenieria@empresa.com.ar"
                    value={newReqForm.email}
                    onChange={(e) => setNewReqForm({ ...newReqForm, email: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono font-bold uppercase text-slate-700 mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+54 9 341..."
                    value={newReqForm.phone}
                    onChange={(e) => setNewReqForm({ ...newReqForm, phone: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-mono font-bold uppercase text-slate-700 mb-1">
                    Formato del Equipo
                  </label>
                  <select
                    value={newReqForm.format}
                    onChange={(e) => setNewReqForm({ ...newReqForm, format: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
                  >
                    <option value="Vertical Cilíndrico (Fondo Plano)">Vertical (Fondo Plano)</option>
                    <option value="Horizontal con Cunas">Horizontal con Cunas</option>
                    <option value="Sobre Chasis / Camión">Transporte / Camión</option>
                    <option value="Isotanque 20 Pies">Isotanque 20 Pies</option>
                    <option value="Torre y Tanque de Agua">Torre y Tanque Agua</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono font-bold uppercase text-slate-700 mb-1">
                    Volumen (Litros) *
                  </label>
                  <input
                    type="number"
                    min="1000"
                    max="250000"
                    step="1000"
                    required
                    value={newReqForm.capacityLiters}
                    onChange={(e) => setNewReqForm({ ...newReqForm, capacityLiters: Number(e.target.value) })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-mono font-bold uppercase text-slate-700 mb-1">
                    Localidad de Entrega
                  </label>
                  <input
                    type="text"
                    placeholder="Rosario, Santa Fe"
                    value={newReqForm.location}
                    onChange={(e) => setNewReqForm({ ...newReqForm, location: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono font-bold uppercase text-slate-700 mb-1">
                  Fluido / Compuesto Químico a Almacenar *
                </label>
                <input
                  type="text"
                  required
                  value={newReqForm.fluid}
                  onChange={(e) => setNewReqForm({ ...newReqForm, fluid: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block font-mono font-bold uppercase text-slate-700 mb-1">
                  Adjuntar Especificación / Croquis Preliminar (Opcional)
                </label>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(e) => handleFileInput(e, (f) => setNewReqForm({ ...newReqForm, file: f }))}
                  className="w-full text-xs font-mono file:mr-3 file:rounded-lg file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white"
                />
              </div>

              <div>
                <label className="block font-mono font-bold uppercase text-slate-700 mb-1">
                  Requerimientos Especiales (Bridas, Normas, Plazos)
                </label>
                <textarea
                  rows={2}
                  value={newReqForm.notes}
                  onChange={(e) => setNewReqForm({ ...newReqForm, notes: e.target.value })}
                  placeholder="Indique normas requeridas (ASTM, BS, ASME, NBS, IRAM, CIRSOC u otra)..."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewOrderModalOpen(false)}
                  className="rounded-full border border-slate-300 px-5 py-2.5 font-mono text-xs font-bold uppercase text-slate-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={busy}
                  className="rounded-full bg-brand hover:bg-brand-hover text-white px-6 py-2.5 font-mono text-xs font-bold uppercase shadow-sm"
                >
                  {busy ? 'Ingresando...' : 'Ingresar Pedido'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL VISOR DE PLANOS, PRESUPUESTOS Y CERTIFICADOS */}
      <BlueprintViewerModal
        isOpen={viewerModal.open}
        onClose={() => setViewerModal({ ...viewerModal, open: false })}
        order={selectedOrder}
        docType={viewerModal.docType}
        customFile={viewerModal.customFile}
      />

      {/* MODAL INSPECTOR DE CORREOS ENVIADOS */}
      <EmailInspectorModal
        isOpen={emailModal.open}
        onClose={() => setEmailModal({ open: false, emailId: null })}
        filterOrderCode={null}
        initialEmailId={emailModal.emailId}
      />
    </div>
  );
}
