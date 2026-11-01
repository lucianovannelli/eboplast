import React from 'react';
import { MessageCircle } from 'lucide-react';
import { companyInfo } from '../data/eboplastData';

export default function WhatsAppFloating() {
  const whatsappUrl = `https://wa.me/${companyInfo.contacts.whatsapp.number}?text=${encodeURIComponent(companyInfo.contacts.whatsapp.defaultMessage)}`;

  return (
    <aside aria-label="Contacto por WhatsApp" className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip on hover */}
      <div 
        role="tooltip"
        className="mr-3 hidden sm:block bg-slate-950 text-slate-100 text-xs font-semibold py-2 px-3.5 rounded-xl border border-slate-700 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap"
      >
        <span>¿Necesita asesoramiento? Escríbanos por WhatsApp</span>
      </div>

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Abrir chat de WhatsApp con Eboplast S.A."
      >
        {/* Radar ping ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-75 animate-ping" />
        
        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 relative z-10 fill-white text-emerald-500" />
      </a>
    </aside>
  );
}
