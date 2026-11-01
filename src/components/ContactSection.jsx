import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { companyInfo } from '../data/eboplastData';
import { SectionHeading, TechLabel } from './ui';
import { Reveal } from './Reveal';
import PlantMap from './PlantMap';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Consulta General',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:${companyInfo.contacts.email}?subject=${encodeURIComponent(`${formData.subject} - ${formData.name}`)}&body=${encodeURIComponent(`Nombre: ${formData.name}\nEmail: ${formData.email}\nTeléfono: ${formData.phone}\n\nMensaje:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
    setSent(true);
  };

  return (
    <section id="contacto" className="py-20 sm:py-24 bg-paper border-b border-line-strong relative select-none">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        
        {/* Section Header con SectionHeading de tuttiRosca */}
        <Reveal>
          <SectionHeading
            index="07"
            kicker="Atención Comercial y Planta Fabril"
            title="Canales de Contacto Directo"
            intro="Planta industrial y oficinas comerciales en Rosario, Santa Fe. Asesoramiento técnico personalizado, memorias de cálculo y cotizaciones para todo el país."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Columna Izquierda: Directorio de Contacto */}
          <Reveal className="lg:col-span-5 space-y-4">
            <div className="overflow-hidden rounded-2xl border border-line-strong bg-paper-2 divide-y divide-line-strong shadow-xs">
              
              {/* Dirección */}
              <div className="p-6">
                <TechLabel index="01">Planta Fabril y Administración</TechLabel>
                <p className="mt-3 text-sm font-sans font-medium text-ink leading-relaxed">
                  {companyInfo.location.address}<br />
                  {companyInfo.location.city}, {companyInfo.location.state}, {companyInfo.location.country}
                </p>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyInfo.location.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-brand hover:text-brand-hover"
                >
                  <span>Abrir en Google Maps</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>

              {/* Teléfonos */}
              <div className="p-6">
                <TechLabel index="02">Líneas de Planta y Celulares</TechLabel>
                <div className="mt-3 space-y-2 font-mono text-xs">
                  {companyInfo.contacts.phones.map((ph, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1 border-b border-line/60 last:border-0">
                      <span className="text-steel-500">{ph.label}:</span>
                      <a href={ph.link} className="text-ink hover:text-brand font-bold">
                        {ph.number}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="p-6">
                <TechLabel index="03">Ingeniería & Ventas</TechLabel>
                <a 
                  href={`mailto:${companyInfo.contacts.email}`} 
                  className="mt-3 text-ink hover:text-brand font-bold font-mono text-sm block"
                >
                  {companyInfo.contacts.email}
                </a>
              </div>
            </div>

            {/* Horario de Atención */}
            <div className="p-4 rounded-xl bg-white border border-line-strong text-xs font-mono text-steel-600 flex items-center gap-3 shadow-xs">
              <Clock className="size-4 text-brand shrink-0" />
              <span>Lunes a Viernes de 07:30 a 16:30 hs (Planta y Despacho)</span>
            </div>
          </Reveal>

          {/* Columna Derecha: Formulario */}
          <Reveal className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-paper-2 border border-line-strong rounded-2xl shadow-xs">
              <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-ink mb-1">
                Envíenos su Consulta Técnica
              </h3>
              <p className="text-steel-600 text-xs sm:text-sm mb-6 font-sans">
                Le responderemos a la brevedad con el asesoramiento y cotización requerida.
              </p>

              {sent ? (
                <div className="text-center py-10 space-y-4">
                  <CheckCircle2 className="size-12 text-brand mx-auto" />
                  <h4 className="font-display text-xl font-bold uppercase text-ink">¡Consulta Preparada!</h4>
                  <p className="text-steel-600 text-sm max-w-md mx-auto font-sans">
                    Se ha abierto su cliente de correo electrónico para enviar el mensaje directamente a {companyInfo.contacts.email}.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-xs font-mono text-brand font-bold uppercase tracking-wider underline pt-2"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-steel-600 mb-1.5">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Ing. Martín Gómez"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-paper border border-line-strong rounded-xl px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-steel-400 focus:border-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-steel-600 mb-1.5">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ej: +54 9 341..."
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-paper border border-line-strong rounded-xl px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-steel-400 focus:border-ink"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-steel-600 mb-1.5">
                        Correo electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ejemplo@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-paper border border-line-strong rounded-xl px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-steel-400 focus:border-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-steel-600 mb-1.5">
                        Asunto
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full bg-paper border border-line-strong rounded-xl px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink font-sans"
                      >
                        <option value="Consulta por Tanques Químicos">Consulta por Tanques Químicos</option>
                        <option value="Consulta por Tanques Lácteos">Consulta por Tanques Lácteos</option>
                        <option value="Consulta por Tanques/Torres de Agua">Consulta por Tanques/Torres de Agua</option>
                        <option value="Consulta por Postes de PRFV">Consulta por Postes de PRFV</option>
                        <option value="Consulta por Tanques de Incendio">Consulta por Tanques de Incendio</option>
                        <option value="Consulta Comercial / Presupuesto">Consulta Comercial / Presupuesto</option>
                        <option value="Otro">Otro requerimiento</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-steel-600 mb-1.5">
                      Mensaje o Requerimiento Técnico *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describa el equipo, volumen en litros, fluido químico y lugar de entrega..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-paper border border-line-strong rounded-xl px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-steel-400 focus:border-ink resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink hover:bg-brand text-white font-mono font-bold py-4 px-6 shadow-sm transition-all text-xs uppercase tracking-wider"
                  >
                    <Send className="size-4" />
                    <span>ENVIAR CONSULTA AL DEPARTAMENTO TÉCNICO</span>
                  </button>
                </form>
              )}
            </div>
          </Reveal>

        </div>

        {/* MAPA GOOGLE EMBED AL ESTILO TUTTI ROSCA */}
        <div className="mt-12 sm:mt-16">
          <PlantMap index="07.B" />
        </div>

      </div>
    </section>
  );
}
