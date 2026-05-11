import type { Metadata } from "next";
import "./globals.css";
import CTAOverlay from "@/components/CTAOverlay";

export const metadata: Metadata = {
  title: "ELM Emaar Facades | GFRC · GFRP · UHPC · GRG",
  description: "Emaar Al Madina — specialists in GFRC, GFRP, UHPC, and GRG architectural facade systems across the GCC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full antialiased overflow-x-hidden">
        <div className="noise-overlay" />
        <CTAOverlay />
        {children}
      </body>
    </html>
  );
}
