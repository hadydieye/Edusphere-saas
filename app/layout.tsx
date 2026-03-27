import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Edusphere",
  description: "SaaS éducatif",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
