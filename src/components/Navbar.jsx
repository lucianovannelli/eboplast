import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Phone } from 'lucide-react';
import { companyInfo } from '../data/eboplastData';

const MENU_EASE = [0.21, 0.47, 0.32, 0.98];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  // Cerrar al navegar
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Cerrar al hacer click afuera o presionar Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const navLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Tecnología', path: '/tecnologia' },
    { label: 'Catálogo', path: '/productos' },
    { label: 'Resistencia Química', path: '/compatibilidad-quimica' },
    { label: 'Postes PRFV', path: '/postes-prfv' },
    { label: 'Servicios', path: '/servicios' },
    { label: 'Seguimiento / Planos', path: '/seguimiento' },
    { label: 'Contacto', path: '/contacto' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-5 pt-3 sm:pt-4">
      <motion.div
        ref={ref}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: MENU_EASE }}
        style={{ borderRadius: open ? "1.5rem" : "9999px" }}
        className="mx-auto max-w-7xl bg-ink/90 border border-white/10 p-2 sm:p-2.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-[border-radius] duration-300"
      >
        {/* Barra Principal */}
        <div className="relative flex items-center justify-between">
          
          {/* Marca / Identidad */}
          <Link
            to="/"
            aria-label="Eboplast S.A."
            className="flex items-center gap-2.5 pl-1.5 sm:pl-2 group"
          >
            <div className="flex size-8 sm:size-9 items-center justify-center rounded-full bg-white p-1 shadow-sm">
              <img
                src="/assets/logo-header-default.png"
                alt="Eboplast"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-sm sm:text-base font-extrabold uppercase tracking-tight text-white">
                EBOPLAST
              </span>
              <span className="font-mono text-[9px] px-1 py-0.2 bg-brand/25 text-brand-bright rounded border border-brand/40 uppercase font-bold tracking-wider">
                S.A.
              </span>
            </div>
          </Link>

          {/* Enlaces Desktop */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 xl:gap-1 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  [
                    "rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200",
                    isActive
                      ? "bg-white/10 text-white font-bold"
                      : "text-white/70 hover:text-white hover:bg-white/5",
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Acciones Desktop + Hamburguesa Mobile */}
          <div className="flex items-center gap-2">
            <Link
              to="/cotizador"
              className="group hidden sm:inline-flex items-center gap-1.5 rounded-full bg-brand px-4 sm:px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-brand-hover shadow-sm"
            >
              <span>Presupuesto</span>
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Botón Móvil */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              className="grid size-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={[
                    "absolute left-0 block h-[1.5px] w-4 rounded-[2px] bg-white transition-all duration-300",
                    open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute bottom-0 left-0 block h-[1.5px] w-4 rounded-[2px] bg-white transition-all duration-300",
                    open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "",
                  ].join(" ")}
                />
              </span>
            </button>
          </div>

        </div>

        {/* Menú Mobile Expandible */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: MENU_EASE }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="mt-3 px-2 pt-2 border-t border-white/10">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.03, ease: MENU_EASE }}
                    className="border-b border-white/5"
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        [
                          "flex items-center justify-between py-3 text-xs uppercase tracking-wider font-semibold transition-colors",
                          isActive ? "text-brand-bright font-bold" : "text-white/80 hover:text-white",
                        ].join(" ")
                      }
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="size-3.5 text-white/30" />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-4 p-2 space-y-2">
                <Link
                  to="/cotizador"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-hover w-full"
                >
                  <span>Configurar Presupuesto Online</span>
                  <ArrowUpRight className="size-4" />
                </Link>

                <a
                  href={`https://wa.me/${companyInfo.contacts.whatsapp.number}?text=${encodeURIComponent("Hola Eboplast, solicito asesoramiento técnico.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-mono text-white/80 hover:bg-white/10 transition-colors w-full"
                >
                  <Phone className="size-3.5 text-brand-bright" />
                  <span>WhatsApp: {companyInfo.contacts.whatsapp.display}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
