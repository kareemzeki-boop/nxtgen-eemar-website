"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
}

const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

export default function MagneticEl({ children, strength = 0.3, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  if (isTouch) {
    return <div className={className} style={style}>{children}</div>;
  }

  const move = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - r.left - r.width / 2) * strength,
      y: (e.clientY - r.top - r.height / 2) * strength,
    });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={move}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={pos}
      transition={{ type: "spring", stiffness: 350, damping: 22, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
