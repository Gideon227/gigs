export const dynamic = 'force-static';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Lora } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast"

import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const segoeUi = localFont({
  src: "../public/fonts/Segoe UI.ttf",
  variable: "--font-segoe-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gigs-Tech",
  description: "Gigs.Tech is a hyper-focused job aggregation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${lora.variable}
          ${segoeUi.variable}
          antialiased overflow-x-hidden min-h-screen hide-scrollbar`}
      >
        <Toaster />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
