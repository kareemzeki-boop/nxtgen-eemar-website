import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emaar Al Madina | NXT-GEN Facade Tech",
  description: "Emaar Al Madina — NXT-GEN Facade Tech. Specialists in GFRC, GFRP, UHPC, Veloce LTGRC, and GFRG architectural cladding systems across the GCC.",
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
        {children}
      </body>
    </html>
  );
}
