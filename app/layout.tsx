import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SGDiscos",
  icons: {
    icon: "/Icon/logoSgDiscosSemEscrita.png",
    shortcut: "/Icon/logoSgDiscosSemEscrita.png",
    apple: "/Icon/logoSgDiscosSemEscrita.png",
  },
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={montserrat.className}>
        {children}
        <Toaster richColors theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
