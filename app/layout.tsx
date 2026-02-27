import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DžanAjla Studio – Ručni radovi s ljubavlju",
    template: "%s | DžanAjla Studio",
  },
  description:
    "Handmade dekorativne kutije, torbe, buketi, islamska kaligrafija i slike prirode. Ručni radovi Džane i Ajle.",
  keywords: [
    "ručni radovi",
    "handmade",
    "dekorativne kutije",
    "islamska kaligrafija",
    "levhe",
    "buketi",
    "DžanAjla Studio",
  ],
  openGraph: {
    type: "website",
    locale: "bs_BA",
    siteName: "DžanAjla Studio",
    title: "DžanAjla Studio – Ručni radovi s ljubavlju",
    description:
      "Handmade dekorativne kutije, torbe, buketi, islamska kaligrafija i slike prirode.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DžanAjla Studio",
    description: "Ručni radovi s ljubavlju",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bs" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
