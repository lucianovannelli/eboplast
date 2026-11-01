import React, { useState, useEffect } from 'react';
import { X, Mail, Send, Settings, ExternalLink, CheckCircle2, Eye } from 'lucide-react';
import {
  getSentEmails,
  getEmailConfig,
  saveEmailConfig,
  dispatchWorkflowEmail,
} from '../services/orderWorkflowService';

export default function EmailInspectorModal({ isOpen, onClose, filterOrderCode = null, initialEmailId = null }) {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [config, setConfig] = useState(getEmailConfig());
  const [savedNotice, setSavedNotice] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const all = getSentEmails();
    const list = filterOrderCode
      ? all.filter((e) => e.orderCode === filterOrderCode)
      : all;
    setEmails(list);
    if (initialEmailId) {
      const found = all.find((e) => e.id === initialEmailId);
      setSelectedEmail(found || list[0] || null);
    } else {
      setSelectedEmail(list[0] || null);
    }
    setConfig(getEmailConfig());
  }, [isOpen, filterOrderCode, initialEmailId]);

  if (!isOpen) return null;

  const handleSaveConfig = (e) => {
    e.preventDefault();
    saveEmailConfig(config);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleResend = async () => {
    if (!selectedEmail) return;
    setResending(true);
    const newRecord = await dispatchWorkflowEmail({
      orderCode: selectedEmail.orderCode,
      stageStep: selectedEmail.stageStep,
      stageName: `${selectedEmail.stageName} (Reenvío)`,
      to: selectedEmail.to,
      cc: selectedEmail.cc,
      subject: selectedEmail.subject,
      html: selectedEmail.html,
    });
    const all = getSentEmails();
    const list = filterOrderCode
      ? all.filter((e) => e.orderCode === filterOrderCode)
      : all;
    setEmails(list);
    setSelectedEmail(newRecord);
    setResending(false);
  };

  const handleOpenMailto = (mail) => {
    const body = `Hola,\n\nActualización del Pedido ${mail.orderCode} (${mail.stageName}).\n\nAcceda al seguimiento y documentos en:\n${window.location.origin}/seguimiento/${mail.orderCode}\n\nSaludos,\nEboplast S.A.`;
    window.open(
      `mailto:${encodeURIComponent(mail.to)}?cc=${encodeURIComponent(mail.cc || '')}&subject=${encodeURIComponent(mail.subject)}&body=${encodeURIComponent(body)}`,
      '_blank'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl border border-line-strong bg-white shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-ink text-white px-5 py-3.5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <Mail className="size-4 text-brand-bright" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              Centro de Notificaciones por Email {filterOrderCode ? `· Pedido ${filterOrderCode}` : '· Todos los Pedidos'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSettings((v) => !v)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-mono font-bold uppercase transition-colors ${
                showSettings ? 'bg-brand text-white' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Settings className="size-3.5" />
              <span>Configurar SMTP / Resend</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="grid size-8 place-items-center rounded-full bg-white/10 hover:bg-rose-600 text-white transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Panel de Configuración de Envío */}
        {showSettings && (
          <form onSubmit={handleSaveConfig} className="bg-slate-100 border-b border-slate-300 p-5 text-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display text-sm font-bold uppercase text-slate-900">
                  Configuración del Motor de Envío de Correos
                </h4>
                <p className="text-slate-600 font-sans">
                  Cada cambio de etapa dispara una llamada a <code className="bg-white px-1 py-0.5 rounded border">/api/send-email</code>. Si ingresa una API Key de Resend (<code className="bg-white px-1 py-0.5 rounded border">re_...</code>), los correos se envían de forma transaccional directa.
                </p>
              </div>
              {savedNotice && (
                <span className="inline-flex items-center gap-1 text-emerald-700 font-mono font-bold bg-emerald-50 px-3 py-1 rounded border border-emerald-200">
                  <CheckCircle2 className="size-3.5" /> Guardado
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                  Email Receptor de Eboplast (Fábrica)
                </label>
                <input
                  type="email"
                  value={config.adminEmail}
                  onChange={(e) => setConfig({ ...config, adminEmail: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-900"
                  placeholder="info@eboplast.com.ar"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                  API Key de Resend (Opcional para envío directo)
                </label>
                <input
                  type="password"
                  value={config.resendApiKey}
                  onChange={(e) => setConfig({ ...config, resendApiKey: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-900"
                  placeholder="re_123456789..."
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer mb-2 font-sans text-slate-700">
                  <input
                    type="checkbox"
                    checked={config.autoOpenMailto}
                    onChange={(e) => setConfig({ ...config, autoOpenMailto: e.target.checked })}
                    className="rounded border-slate-300 text-[#5b8314]"
                  />
                  <span>Abrir también cliente de correo al disparar</span>
                </label>
                <button
                  type="submit"
                  className="bg-[#5b8314] hover:bg-[#48680f] text-white font-bold py-2 px-4 rounded uppercase text-xs"
                >
                  Guardar Configuración
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Cuerpo: Lista izquierda + Previsualización HTML derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden min-h-[460px]">
          {/* Lista de Correos */}
          <div className="lg:col-span-4 border-r border-slate-200 bg-slate-50 overflow-y-auto divide-y divide-slate-200 max-h-[70vh]">
            {emails.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono text-slate-400">
                No hay correos registrados para este filtro.
              </div>
            ) : (
              emails.map((mail) => {
                const active = selectedEmail?.id === mail.id;
                return (
                  <button
                    key={mail.id}
                    type="button"
                    onClick={() => setSelectedEmail(mail)}
                    className={`w-full text-left p-4 transition-colors ${
                      active ? 'bg-white border-l-4 border-l-[#5b8314] shadow-2xs' : 'hover:bg-white/70'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                      <span className="font-bold text-[#5b8314]">{mail.orderCode}</span>
                      <span>{new Date(mail.timestamp).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })}</span>
                    </div>
                    <div className="font-sans text-xs font-bold text-slate-900 line-clamp-1">
                      {mail.subject}
                    </div>
                    <div className="text-[11px] text-slate-600 truncate mt-0.5 font-mono">
                      Para: {mail.to}
                    </div>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="text-[10px] font-mono bg-slate-200/80 text-slate-700 px-1.5 py-0.5 rounded">
                        {mail.stageName}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 font-semibold">
                        ● {mail.status}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Visor de Email HTML */}
          <div className="lg:col-span-8 flex flex-col bg-white overflow-y-auto max-h-[70vh]">
            {selectedEmail ? (
              <>
                <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold uppercase text-[#5b8314] bg-lime-50 border border-lime-200 px-2.5 py-0.5 rounded">
                      {selectedEmail.stageName}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={resending}
                        className="inline-flex items-center gap-1 rounded bg-[#5b8314] hover:bg-[#48680f] text-white px-3 py-1.5 font-mono text-[11px] font-bold uppercase transition-colors"
                      >
                        <Send className="size-3" />
                        <span>{resending ? 'Enviando...' : 'Reenviar por API'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenMailto(selectedEmail)}
                        className="inline-flex items-center gap-1 rounded border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase transition-colors"
                      >
                        <ExternalLink className="size-3" />
                        <span>Abrir en Correo Local</span>
                      </button>
                    </div>
                  </div>

                  <h3 className="font-display text-base font-bold text-slate-950">
                    {selectedEmail.subject}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] font-mono text-slate-600 pt-1">
                    <div><strong>De:</strong> {selectedEmail.from}</div>
                    <div><strong>Fecha:</strong> {new Date(selectedEmail.timestamp).toLocaleString('es-AR')}</div>
                    <div><strong>Para:</strong> <span className="text-slate-900 font-bold">{selectedEmail.to}</span></div>
                    <div><strong>CC:</strong> {selectedEmail.cc || '-'}</div>
                  </div>
                </div>

                {/* Renderizado del cuerpo HTML del correo */}
                <div className="p-4 bg-slate-100 flex-1">
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                    <iframe
                      title="Vista previa del correo"
                      srcDoc={selectedEmail.html}
                      className="w-full h-[420px] border-0"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 text-center text-slate-400 font-mono text-xs my-auto">
                Seleccione un correo de la lista para ver su contenido HTML.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
