import type { MouseEvent } from "react";

export function ctaClick(e: MouseEvent) {
  e.preventDefault();
  const overlay = document.getElementById("cta-overlay");
  const contact = document.getElementById("contact");

  if (!overlay || !contact) {
    contact?.scrollIntoView({ behavior: "smooth" });
    return;
  }

  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "auto";

  setTimeout(() => {
    contact.scrollIntoView({ behavior: "instant" });
    setTimeout(() => {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
    }, 160);
  }, 400);
}
