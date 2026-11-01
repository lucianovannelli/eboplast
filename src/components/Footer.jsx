import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, MapPin, Phone, Mail } from 'lucide-react';
import { companyInfo } from '../data/eboplastData';
import { TechLabel } from './ui';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Tecnología & Soldadura', path: '/tecnologia' },
    { label: 'Catálogo de Tanques', path: '/productos' },
    { label: 'Compatibilidad Química', path: '/compatibilidad-quimica' },
    { label: 'Postes PRFV e Incendio', path: '/postes-prfv' },
    { label: 'Servicios de Montaje', path: '/servicios' },
    { label: 'Portal de Seguimiento & Planos', path: '/seguimiento' },
    { label: 'Panel de Gestión y Registros', path: '/gestion' },
    { label: 'Cotizador Online', path: '/cotizador' },
    { label: 'Contacto Directo', path: '/contacto' },
  ];

  return (
    <footer className="bg-paper-2 text-ink border-t border-line-strong">
      {/* Grilla técnica con blueprint */}
      <div className="blueprint border-b border-line-strong">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-10 md:grid-cols-[1.5fr_1fr_1fr]">
          
          {/* Columna 1: Marca e Identidad */}
          <div>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex size-9 items-center justify-center rounded-full bg-white border border-line-strong p-1 shadow-sm">
                <img
                  src="/assets/logo-header-default.png"
                  alt="Eboplast"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-display text-base font-extrabold uppercase tracking-tight text-ink">
                  EBOPLAST
                </span>
                <span className="ml-1.5 font-mono text-[9px] px-1 py-0.5 rounded bg-brand/15 text-brand font-bold uppercase">
                  S.A.
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-steel-600 font-sans">
              Líderes en ingeniería y fabricación de tanques industriales de PRFV por sistema Filament Winding bajo normas ASTM, BS, ASME, NBS, IRAM y CIRSOC. Fundada en 1978, con trayectoria ininterrumpida desde Rosario hacia todo el país.
            </p>

            {/* Redes Sociales en píldora segmentada */}
            <div className="mt-6 flex w-fit gap-px overflow-hidden rounded-full border border-line-strong bg-line-strong">
              <a
                href={companyInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid size-10 place-items-center bg-paper text-steel-500 transition-colors hover:bg-ink hover:text-white"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={companyInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid size-10 place-items-center bg-paper text-steel-500 transition-colors hover:bg-ink hover:text-white"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={companyInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid size-10 place-items-center bg-paper text-steel-500 transition-colors hover:bg-ink hover:text-white"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación Numerada */}
          <div>
            <TechLabel index="01">Navegación</TechLabel>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((l, i) => (
                <li key={l.path} className="flex items-center gap-3">
                  <span className="label text-steel-300 font-mono text-[10px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Link
                    to={l.path}
                    className="text-xs sm:text-sm text-steel-600 transition-colors hover:text-ink font-medium"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Datos de Contacto Fabril */}
          <div>
            <TechLabel index="02">Planta & Contacto</TechLabel>
            <ul className="mt-5 space-y-3 text-xs sm:text-sm text-steel-600 font-sans">
              <li className="flex items-start gap-2">
                <MapPin className="size-4 text-brand shrink-0 mt-0.5" />
                <span>{companyInfo.location.full}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-brand shrink-0" />
                <a href={companyInfo.contacts.phones[0].link} className="hover:text-ink font-mono">
                  0341 - 431 1112 / 1113
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-brand shrink-0" />
                <a href={`mailto:${companyInfo.contacts.email}`} className="hover:text-ink font-mono">
                  {companyInfo.contacts.email}
                </a>
              </li>
              <li className="pt-2">
                <span className="font-mono text-[11px] text-steel-500 block uppercase">
                  Horario de Planta y Despacho:
                </span>
                <span className="text-xs text-ink font-medium">Lunes a Viernes 07:30 a 16:30 hs</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Franja Inferior */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-steel-400 sm:flex-row sm:px-10 font-mono text-[11px]">
        <p className="label">
          © {new Date().getFullYear()} EBOPLAST S.A. · TODOS LOS DERECHOS RESERVADOS
        </p>

        <div className="flex items-center gap-4">
          <span className="label text-steel-400 hidden sm:inline-block">
            NORMAS ASTM · BS · ASME · NBS · IRAM · CIRSOC · ROSARIO
          </span>
          <button
            onClick={scrollToTop}
            className="grid size-8 place-items-center rounded-full border border-line-strong bg-paper text-steel-500 transition-colors hover:bg-ink hover:text-white"
            aria-label="Volver arriba"
          >
            <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
