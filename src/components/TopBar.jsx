import React from 'react';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';
import { companyInfo } from '../data/eboplastData';

export default function TopBar() {
  const whatsappUrl = `https://wa.me/${companyInfo.contacts.whatsapp.number}?text=${encodeURIComponent("Hola Eboplast, solicito contacto con el departamento técnico.")}`;

  return (
    <div className="bg-slate-100 border-b border-slate-200 text-[11px] font-mono text-slate-600 py-2 hidden lg:block select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Industrial Location & Norms */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-slate-900 font-medium">
            <span className="inline-block w-1.5 h-1.5 bg-[#5b8314] rounded-full" />
            <span className="font-semibold tracking-wide">Planta Industrial Rosario</span>
          </div>

          <div className="flex items-center space-x-1.5 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-[#5b8314]" />
            <span>Av. Pte. Perón 5938, Santa Fe</span>
          </div>

          <div className="flex items-center space-x-1.5 text-slate-600">
            <Shield className="w-3.5 h-3.5 text-[#5b8314]" />
            <span>NORMAS: ASTM · BS · ASME · NBS · IRAM · CIRSOC</span>
          </div>
        </div>

        {/* Direct Technical Lines */}
        <div className="flex items-center space-x-6">
          <a 
            href={companyInfo.contacts.phones[0].link}
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            CENTRAL: <span className="text-slate-900 font-bold">0341 - 431 1112</span>
          </a>

          <span className="text-slate-300">|</span>

          <a 
            href={`mailto:${companyInfo.contacts.email}`}
            className="text-slate-600 hover:text-[#5b8314] transition-colors"
          >
            {companyInfo.contacts.email}
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5b8314] hover:text-[#45630e] font-bold flex items-center space-x-1 border-l border-slate-200 pl-4"
          >
            <span>WHATSAPP INGENIERÍA: +54 9 341 665-7797</span>
          </a>
        </div>

      </div>
    </div>
  );
}
