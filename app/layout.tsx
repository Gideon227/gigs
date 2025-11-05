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
import CookieBanner from "@/components/CookieBanner";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

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
  metadataBase: new URL("https://gigs.tech"), 
  title: {
    default: "Gigs Tech",
    template: "%s - Gigs Tech"
  },
  description: "Power Platform & Dynamics 365 jobs all in one place.",
  openGraph: {
    title: "Gigs Tech",
    description: "Power Platform & Dynamics 365 jobs all in one place.",
    url: "https://gigs.tech",
    siteName: "Gigs Tech",
    images: [
      {
        url: "https://gigs.tech/_next/image?url=%2Flogo.png&w=256&q=75",
        width: 1200,
        height: 630,
        alt: "Gigs Tech",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gigs Tech",
    description: "Power Platform & Dynamics 365 jobs all in one place.",
    images: ["https://gigs.tech//_next/image?url=%2Flogo.png&w=256&q=75"],
  },
  alternates: {
    canonical: "https://gigs.tech",
  },
  robots: "index, follow",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        {/* Google Analytics Script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
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
        <CookieBanner />
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
