import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "null's portfolio",
  description: "portfolio by null",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="mx-auto max-w-2xl bg-[#161616] font-sans text-[#FFFFFFAF]">
        <main className="min-h-dvh grid grid-rows-[auto_1fr_auto] p-6 pt-3 md:pt-6">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
