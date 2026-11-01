import React from "react";

/** Etiqueta monoespaciada estilo ficha técnica: "[ 01 ] SECTORES INDUSTRIALES". */
export function TechLabel({
  index,
  children,
  dark = false,
  className = "",
}) {
  return (
    <span
      className={[
        "label inline-flex items-center gap-2",
        dark ? "text-white/60" : "text-steel-500",
        className,
      ].join(" ")}
    >
      {index && <span className={dark ? "text-brand-bright font-bold" : "text-brand font-bold"}>[{index}]</span>}
      <span>{children}</span>
    </span>
  );
}

/**
 * Encabezado de sección técnico: marcador numerado + regla horizontal fina + título grande en Archivo.
 */
export function SectionHeading({
  index,
  kicker,
  title,
  intro,
  dark = false,
  className = "",
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <TechLabel index={index} dark={dark}>
          {kicker}
        </TechLabel>
        <span
          className={[
            "h-px flex-1",
            dark ? "bg-line-dark" : "bg-line-strong",
          ].join(" ")}
        />
      </div>
      <h2
        className={[
          "mt-5 max-w-4xl font-display text-3xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-ink",
        ].join(" ")}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={[
            "mt-4 max-w-2xl text-base leading-relaxed sm:text-lg",
            dark ? "text-white/60" : "text-steel-600",
          ].join(" ")}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
