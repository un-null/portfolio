import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "null's portfolio",
  description: "portofolio by null",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="mx-auto max-w-2xl bg-[#161616] font-mono text-[#FFFFFFAF]">
        <main className="min-h-dvh grid grid-rows-[auto_1fr_auto] p-6 pt-3 md:pt-6">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
