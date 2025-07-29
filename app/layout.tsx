export const dynamic = 'force-static';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Lora } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast"

import Script from "next/script";

import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Analytics from "@/components/Analytics";

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
  title: {
    default: "Gigs Tech",
    template: "%s - Gigs Tech"
  },
  description: "Power Platform & Dynamics 365 jobs all in one place.",
  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  
  return (
    <html lang="en">
      <head>
        {/* Google Analytics Script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${lora.variable}
          ${segoeUi.variable}
          antialiased overflow-x-hidden min-h-screen hide-scrollbar`}
      >
        <Toaster />
        <Analytics />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
