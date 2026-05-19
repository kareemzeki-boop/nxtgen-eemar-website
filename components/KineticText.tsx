"use client";
import { motion } from "framer-motion";
import React from "react";

type Tag = "h1" | "h2" | "h3" | "h4" | "span" | "p" | "div";

interface Props {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: Tag;
  wordStagger?: boolean;
}

export default function KineticText({
  text,
  delay = 0,
  stagger = 0.022,
  as: Tag = "span",
  className,
  style,
  wordStagger = false,
}: Props) {
  const words = text.split(" ");

  return (
    <Tag className={className} style={style}>
      {words.map((word, wi) => (
        <span
          key={wi}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          {wordStagger ? (
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                delay: delay + wi * stagger * 3,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ display: "inline-block" }}
            >
              {word}
            </motion.span>
          ) : (
            word.split("").map((char, ci) => (
              <motion.span
                key={ci}
                initial={{ y: "110%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{
                  delay: delay + (wi * word.length + ci) * stagger,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))
          )}
          <span style={{ display: "inline-block", width: "0.28em" }} />
        </span>
      ))}
    </Tag>
  );
}
