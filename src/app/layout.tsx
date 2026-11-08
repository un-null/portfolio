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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "null's portfolio",
    template: "%s | null",
  },
  description: "portfolio by null",
  openGraph: {
    type: "website",
    siteName: "null",
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    site: "@nu_____ll",
    creator: "@nu_____ll",
  },
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
