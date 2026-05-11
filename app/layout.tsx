import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NXTGEN by Eemar Al Madina | Engineering Living Facades",
  description: "We Engineer Living Facades For The Middle East. Specialists in GFRC, GFRP, UHPC, Veloce LTGRC, and GFRG architectural cladding systems.",
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full antialiased overflow-x-hidden">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
