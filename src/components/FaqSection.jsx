import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '../data/eboplastData';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200 relative select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center space-y-3 mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Preguntas Frecuentes de Ingeniería
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-sans">
            Información técnica sobre materiales, procesos constructivos, aplicaciones y logística en planta.
          </p>
        </div>

        {/* FAQ Accordion in Light Mode */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-sm shadow-2xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base sm:text-lg font-bold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-sm bg-slate-100 text-[#5b8314] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-lime-100' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4 font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
