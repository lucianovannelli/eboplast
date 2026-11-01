import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Calculator,
  FileCheck,
  DraftingCompass,
  Factory,
  Award,
  Mail,
  Search,
  RotateCcw,
  ArrowRight,
  Plus,
  Eye,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';
import BlueprintViewerModal from '../components/BlueprintViewerModal';
import EmailInspectorModal from '../components/EmailInspectorModal';
import {
  WORKFLOW_STAGES,
  getOrders,
  getSentEmails,
  resetDemoWorkflowData,
} from '../services/orderWorkflowService';

const STAGE_ICONS = {
  cotizacion_solicitada: FileText,
  presupuesto_enviado: Calculator,
  oc_recibida: FileCheck,
  plano_en_aprobacion: DraftingCompass,
  en_construccion: Factory,
  entregado_registro: Award,
};

export default function AdminOrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [outbox, setOutbox] = useState([]);
  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' | 'virtual_records' | 'emails'
  const [stageFilter, setStageFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewerDoc, setViewerDoc] = useState(null);
  const [viewerOrder, setViewerOrder] = useState(null);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedEmailForModal, setSelectedEmailForModal] = useState(null);

  const loadData = () => {
    setOrders(getOrders());
    setOutbox(getSentEmails());
  };

  useEffect(() => {
    loadData();
    const handler = () => loadData();
    window.addEventListener('eboplast-orders-updated', handler);
    window.addEventListener('eboplast-emails-updated', handler);
    return () => {
      window.removeEventListener('eboplast-orders-updated', handler);
      window.removeEventListener('eboplast-emails-updated', handler);
    };
  }, []);

  const handleResetDemo = () => {
    resetDemoWorkflowData();
    loadData();
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStage = stageFilter === 'all' || o.stageId === stageFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      o.code.toLowerCase().includes(q) ||
      o.client?.company?.toLowerCase().includes(q) ||
      o.client?.name?.toLowerCase().includes(q) ||
      o.technicalSpec?.fluid?.toLowerCase().includes(q) ||
      o.virtualRecord?.serialNumber?.toLowerCase().includes(q);
    return matchesStage && matchesSearch;
  });

  const completedOrders = orders.filter(
    (o) => o.stageId === 'entregado_registro' || o.virtualRecord
  );

  return (
    <div className="bg-paper min-h-screen pb-20">
      {/* Header */}
      <section className="relative border-b border-line-strong bg-ink text-paper overflow-hidden pt-28 pb-10 sm:pt-36 sm:pb-12">
        <div className="absolute inset-0 blueprint-dark pointer-events-none opacity-40" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2 h-2 bg-brand" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
                  PANEL OPERATIVO EBOPLAST S.A. · COMERCIAL, INGENIERÍA Y PLANTA
                </span>
              </div>
              <h1 className="font-display font-bold text-3xl md:text-5xl uppercase tracking-tight">
                Gestión Digital de <span className="text-brand">Pedidos y Registros</span>
              </h1>
              <p className="text-paper/75 text-sm md:text-base mt-2 max-w-2xl">
                Control centralizado del ciclo completo de venta de tanques PRFV: requerimientos
                técnicos, presupuestos, órdenes de compra, aprobación de planos de fabricación,
                avance en planta y archivo permanente de tanques entregados.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedEmailForModal(null);
                  setEmailModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-3 border border-white/25 bg-white/5 hover:bg-white/15 font-mono text-xs uppercase tracking-widest transition-colors"
              >
                <Mail className="w-4 h-4 text-brand" />
                Centro de Mails ({outbox.length})
              </button>
              <button
                type="button"
                onClick={handleResetDemo}
                className="flex items-center gap-2 px-4 py-3 border border-white/25 bg-white/5 hover:bg-white/15 font-mono text-xs uppercase tracking-widest transition-colors"
                title="Restaurar los 3 casos de demostración originales"
              >
                <RotateCcw className="w-4 h-4 text-paper/70" />
                Restaurar Demo
              </button>
              <Link
                to="/cotizador"
                className="flex items-center gap-2 px-5 py-3 bg-brand text-paper font-display font-bold text-xs uppercase tracking-widest hover:bg-brand-dark transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nuevo Requerimiento
              </Link>
            </div>
          </div>

          {/* KPI Strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {WORKFLOW_STAGES.map((s) => {
              const count = orders.filter((o) => o.stageId === s.id).length;
              const Icon = STAGE_ICONS[s.id] || FileText;
              const active = stageFilter === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setActiveTab('pipeline');
                    setStageFilter(active ? 'all' : s.id);
                  }}
                  className={`text-left p-3.5 border transition-all ${
                    active
                      ? 'bg-brand text-paper border-brand'
                      : 'bg-white/5 border-white/15 hover:border-brand/60 text-paper'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-75">
                      Etapa 0{s.step}
                    </span>
                    <Icon className={`w-4 h-4 ${active ? 'text-paper' : 'text-brand'}`} />
                  </div>
                  <div className="font-display font-bold text-2xl leading-none mb-1">{count}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider truncate opacity-90">
                    {s.shortLabel}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-10">
        {/* Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-line-strong">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('pipeline')}
              className={`px-5 py-2.5 font-display font-bold text-xs uppercase tracking-widest border transition-colors ${
                activeTab === 'pipeline'
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-white text-ink border-line-strong hover:bg-paper-2'
              }`}
            >
              Flujo de Pedidos ({orders.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('virtual_records')}
              className={`px-5 py-2.5 font-display font-bold text-xs uppercase tracking-widest border transition-colors flex items-center gap-2 ${
                activeTab === 'virtual_records'
                  ? 'bg-brand text-paper border-brand'
                  : 'bg-white text-ink border-line-strong hover:bg-paper-2'
              }`}
            >
              <Award className="w-4 h-4" />
              Registros Virtuales de Tanques ({completedOrders.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('emails')}
              className={`px-5 py-2.5 font-display font-bold text-xs uppercase tracking-widest border transition-colors flex items-center gap-2 ${
                activeTab === 'emails'
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-white text-ink border-line-strong hover:bg-paper-2'
              }`}
            >
              <Mail className="w-4 h-4" />
              Historial de Mails ({outbox.length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-steel-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar código, cliente, fluido, N° serie..."
                className="pl-9 pr-4 py-2 bg-white border border-line-strong font-mono text-xs text-ink w-72 focus:border-brand focus:outline-none"
              />
            </div>
            {stageFilter !== 'all' && (
              <button
                type="button"
                onClick={() => setStageFilter('all')}
                className="px-3 py-2 bg-paper-2 border border-line-strong font-mono text-[10px] uppercase tracking-widest text-ink hover:bg-white"
              >
                Ver Todos
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: PIPELINE */}
        {activeTab === 'pipeline' && (
          <div className="mt-8 space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="bg-white border border-line-strong p-12 text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-steel-500">
                  No se encontraron pedidos con los filtros seleccionados.
                </p>
              </div>
            ) : (
              filteredOrders.map((order) => {
                const stageObj =
                  WORKFLOW_STAGES.find((s) => s.id === order.stageId) || WORKFLOW_STAGES[0];
                const capM3 = ((order.technicalSpec?.capacityLiters || 0) / 1000).toFixed(0);

                return (
                  <div
                    key={order.code}
                    className="bg-white border-2 border-line-strong hover:border-ink transition-all p-6 grid lg:grid-cols-12 gap-6 items-center"
                  >
                    {/* Left: Code & Client */}
                    <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-line pb-4 lg:pb-0 lg:pr-6">
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="font-mono font-bold text-sm px-2.5 py-1 bg-ink text-paper">
                          {order.code}
                        </span>
                        <span
                          className={`font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 border ${
                            order.stageId === 'entregado_registro'
                              ? 'bg-brand/15 text-brand border-brand/40 font-bold'
                              : order.stageId === 'plano_en_aprobacion'
                              ? 'bg-amber-500/15 text-amber-800 border-amber-500/40 font-bold'
                              : 'bg-paper-2 text-ink border-line-strong'
                          }`}
                        >
                          Etapa {stageObj.step}/6 · {stageObj.shortLabel}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-xl uppercase text-ink">
                        {order.client?.company}
                      </h3>
                      <p className="font-mono text-xs text-steel-600 mt-1">
                        {order.client?.name} · {order.client?.email}
                      </p>
                      <p className="font-mono text-[11px] text-steel-500 mt-0.5">
                        Destino: {order.client?.location || 'Planta Industrial'}
                      </p>
                    </div>

                    {/* Middle: Technical Summary & Stage Progress Bar */}
                    <div className="lg:col-span-5 space-y-3">
                      <div className="grid grid-cols-3 gap-2 bg-paper p-3 border border-line">
                        <div>
                          <div className="font-mono text-[9px] uppercase text-steel-500">
                            Capacidad / Geom.
                          </div>
                          <div className="font-mono text-xs font-bold text-ink truncate">
                            {capM3} m³ · {order.technicalSpec?.format}
                          </div>
                        </div>
                        <div>
                          <div className="font-mono text-[9px] uppercase text-steel-500">
                            Fluido / Temp.
                          </div>
                          <div className="font-mono text-xs font-bold text-ink truncate">
                            {order.technicalSpec?.fluid} ({order.technicalSpec?.temperature})
                          </div>
                        </div>
                        <div>
                          <div className="font-mono text-[9px] uppercase text-steel-500">
                            Dimensiones / Norma
                          </div>
                          <div className="font-mono text-xs font-bold text-ink truncate">
                            Ø {order.technicalSpec?.diameter} ·{' '}
                            {order.quote?.standardApplied || 'ASTM / CIRSOC'}
                          </div>
                        </div>
                      </div>

                      {/* Mini 6-step bar */}
                      <div className="grid grid-cols-6 gap-1.5">
                        {WORKFLOW_STAGES.map((s) => {
                          const done = s.step <= stageObj.step;
                          return (
                            <div key={s.id} className="space-y-1">
                              <div
                                className={`h-1.5 ${
                                  s.step < stageObj.step
                                    ? 'bg-brand'
                                    : s.step === stageObj.step
                                    ? 'bg-ink'
                                    : 'bg-line-strong'
                                }`}
                              />
                              <div
                                className={`font-mono text-[9px] uppercase truncate ${
                                  done ? 'text-ink font-bold' : 'text-steel-400'
                                }`}
                              >
                                {s.step}. {s.shortLabel}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-end">
                      <button
                        type="button"
                        onClick={() => navigate(`/seguimiento/${order.code}?role=eboplast`)}
                        className="w-full px-4 py-3 bg-ink text-paper font-display font-bold text-xs uppercase tracking-widest hover:bg-brand transition-colors flex items-center justify-center gap-2"
                      >
                        <SlidersHorizontal className="w-4 h-4" />
                        Gestionar en Expediente
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate(`/seguimiento/${order.code}?role=cliente`)}
                        className="w-full px-4 py-2.5 bg-paper border border-line-strong text-ink font-mono text-[11px] uppercase tracking-widest hover:bg-paper-2 transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye className="w-3.5 h-3.5 text-brand" />
                        Ver Vista del Cliente
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 2: VIRTUAL TANK RECORDS (COMPLETED TANKS DOSSIER) */}
        {activeTab === 'virtual_records' && (
          <div className="mt-8 space-y-6">
            <div className="bg-ink text-paper p-6 border border-line-strong flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-brand mb-1">
                  TRAZABILIDAD DEFINITIVA POST-ENTREGA · INGENIERÍA EBOPLAST
                </div>
                <h3 className="font-display font-bold text-xl uppercase">
                  Archivo de Registros Virtuales de Tanques Fabricados
                </h3>
                <p className="text-xs text-paper/75 mt-1 max-w-2xl">
                  Cada tanque entregado conserva su ficha técnica perpetua con N° de serie, lote de
                  resina, plano aprobado por el cliente, orden de compra y certificado de garantía
                  escrita por 1 año.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {completedOrders.map((order) => {
                const vr = order.virtualRecord || {};
                const capM3 = ((order.technicalSpec?.capacityLiters || 0) / 1000).toFixed(0);

                return (
                  <div
                    key={order.code}
                    className="bg-white border-2 border-ink p-6 flex flex-col justify-between space-y-6"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 pb-4 border-b border-line">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 bg-brand text-paper font-bold">
                            SERIE: {vr.serialNumber || order.code}
                          </span>
                          <h4 className="font-display font-bold text-2xl uppercase text-ink mt-2">
                            {order.client?.company}
                          </h4>
                          <p className="font-mono text-xs text-steel-600">
                            Expediente {order.code} · Entregado el {vr.deliveryDate || '2026'}
                          </p>
                        </div>
                        <ShieldCheck className="w-10 h-10 text-brand shrink-0" />
                      </div>

                      <div className="grid grid-cols-2 gap-3 my-4 text-xs">
                        <div className="p-3 bg-paper border border-line">
                          <div className="font-mono text-[10px] uppercase text-steel-500">
                            Equipo Fabricado
                          </div>
                          <div className="font-mono font-bold text-ink mt-0.5">
                            Tanque PRFV {capM3} m³ (Ø {order.technicalSpec?.diameter} ×{' '}
                            {order.technicalSpec?.height})
                          </div>
                        </div>
                        <div className="p-3 bg-paper border border-line">
                          <div className="font-mono text-[10px] uppercase text-steel-500">
                            Fluido & Norma
                          </div>
                          <div className="font-mono font-bold text-ink mt-0.5">
                            {order.technicalSpec?.fluid} · {vr.normApplied || 'ASTM / CIRSOC'}
                          </div>
                        </div>
                        <div className="p-3 bg-paper border border-line">
                          <div className="font-mono text-[10px] uppercase text-steel-500">
                            Lote de Resina & Fibra
                          </div>
                          <div className="font-mono font-bold text-ink mt-0.5">
                            {vr.resinBatch || 'N/A'}
                          </div>
                        </div>
                        <div className="p-3 bg-paper border border-line">
                          <div className="font-mono text-[10px] uppercase text-steel-500">
                            Garantía Escrita (Vigencia)
                          </div>
                          <div className="font-mono font-bold text-brand mt-0.5">
                            {vr.warrantyExpiration || '1 Año Escrita'}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-paper-2 border border-line font-mono text-[11px] text-steel-700 space-y-1">
                        <div>
                          <strong>Ensayo Hidráulico / Barcol:</strong>{' '}
                          {vr.hydrostaticTest || 'Aprobado'} · {vr.barcolHardness || '42 Barcol'}
                        </div>
                        <div>
                          <strong>Unión Fondo-Cilindro:</strong> Monolítica en 1 sola pieza sin
                          soldadura (disminuye el riesgo de ataque químico)
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-line">
                      {order.blueprint?.file && (
                        <button
                          type="button"
                          onClick={() => {
                            setViewerOrder(order);
                            setViewerDoc(order.blueprint.file);
                          }}
                          className="px-3.5 py-2 bg-paper border border-line-strong font-mono text-[11px] uppercase tracking-wider hover:bg-paper-2 flex items-center gap-1.5"
                        >
                          <DraftingCompass className="w-3.5 h-3.5 text-brand" />
                          Ver Plano Aprobado
                        </button>
                      )}
                      {vr.certificateFile && (
                        <button
                          type="button"
                          onClick={() => {
                            setViewerOrder(order);
                            setViewerDoc(vr.certificateFile);
                          }}
                          className="px-3.5 py-2 bg-paper border border-line-strong font-mono text-[11px] uppercase tracking-wider hover:bg-paper-2 flex items-center gap-1.5"
                        >
                          <Award className="w-3.5 h-3.5 text-brand" />
                          Certificado Garantía
                        </button>
                      )}
                      <Link
                        to={`/seguimiento/${order.code}`}
                        className="ml-auto px-4 py-2 bg-ink text-paper font-mono text-[11px] uppercase tracking-widest hover:bg-brand transition-colors flex items-center gap-1.5"
                      >
                        Abrir Registro Completo
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: EMAIL LOGS */}
        {activeTab === 'emails' && (
          <div className="mt-8 bg-white border-2 border-line-strong">
            <div className="p-5 bg-paper-2 border-b border-line-strong flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg uppercase text-ink">
                  Bandeja de Notificaciones Transaccionales Disparadas
                </h3>
                <p className="font-mono text-xs text-steel-600">
                  Cada cambio de etapa envía automáticamente un correo con link directo al
                  expediente.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedEmailForModal(null);
                  setEmailModalOpen(true);
                }}
                className="px-4 py-2.5 bg-brand text-paper font-mono text-xs uppercase tracking-widest hover:bg-brand-dark transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Inspeccionar Plantillas HTML / Configurar API
              </button>
            </div>

            <div className="divide-y divide-line">
              {outbox.map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    setSelectedEmailForModal(m);
                    setEmailModalOpen(true);
                  }}
                  className="p-4 hover:bg-paper transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 bg-ink text-paper">
                        {m.orderCode}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 bg-brand/15 text-brand font-bold">
                        {m.stageName}
                      </span>
                      <span className="font-mono text-[11px] text-steel-500">
                        {new Date(m.timestamp).toLocaleString('es-AR')}
                      </span>
                    </div>
                    <div className="font-display font-bold text-sm text-ink">{m.subject}</div>
                    <div className="font-mono text-xs text-steel-600">
                      Para: {m.to} · CC: {m.cc} · Estado: <strong>{m.status}</strong>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-brand flex items-center gap-1 shrink-0">
                    Ver correo HTML <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Modals */}
      {viewerDoc && (
        <BlueprintViewerModal
          isOpen={!!viewerDoc}
          onClose={() => setViewerDoc(null)}
          order={viewerOrder}
          docType={viewerDoc.docType || 'blueprint'}
          customFile={viewerDoc}
        />
      )}

      <EmailInspectorModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        initialEmailId={selectedEmailForModal?.id}
      />
    </div>
  );
}
