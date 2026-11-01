import React from "react";
import { motion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

const variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

/** Anima la entrada (fade + slide) cuando el elemento entra en viewport. */
export function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/** Contenedor con stagger para listas o grillas de tarjetas. */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.08,
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
}) {
  return (
    <motion.div
      className={className}
      variants={variants}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
