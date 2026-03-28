import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, Playfair_Display } from "next/font/google";
import PWARegister from "@/components/PWARegister";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: '--font-dm-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  style: ['italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Edusphère | La gestion scolaire réinventée pour la Guinée",
  description: "Plateforme complète de gestion pour les écoles guinéennes : notes, bulletins, inscriptions et paiements Mobile Money.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Edusphère",
  },
};

export const viewport: Viewport = {
  themeColor: "#CE1126",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
