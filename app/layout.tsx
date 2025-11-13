// export const dynamic = 'force-static';
export const revalidate = 3600;

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
import { Suspense } from "react";
import StructuredData from "@/components/StructuredData";

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
    default: "Microsoft Power Platform & Dynamics 365 Jobs | GIGS.TECH",
    template: "%s | GIGS.TECH"
  },
  description: "Find the latest Microsoft Power Platform & Dynamics 365 jobs worldwide. Discover roles for developers, consultants, and architects—all on GIGS.TECH.",
  openGraph: {
    title: "GIGS.TECH | Microsoft Power Platform & Dynamics 365 Jobs",
    description: "Find verified Microsoft Power Platform & Dynamics 365 jobs from developers to architects, updated daily from top Microsoft partners and recruiters. Start your next gig at GIGS.TECH.",
    url: "https://gigs.tech",
    siteName: "GIGS.TECH",
    images: [
      {
        url: "https://gigs.tech/_next/image?url=%2Flogo.png&w=256&q=75",
        width: 1200,
        height: 630,
        alt: "Microsoft Power Platform & Dynamics 365 Jobs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Microsoft Power Platform & Dynamics 365 Jobs | GIGS.TECH",
    description: "Find the latest Microsoft Power Platform & Dynamics 365 jobs worldwide. Discover roles for developers, consultants, and architects—all on GIGS.TECH.",
    images: ["https://gigs.tech/_next/image?url=%2Flogo.png&w=256&q=75"],
  },
  alternates: {
    canonical: "https://gigs.tech",
  },
  robots: "index, follow",
  keywords: ["Power Platform jobs", "Dynamics 365 jobs", "Microsoft jobs", "Power Apps developer", "Power BI consultant", "D365 architect"],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1B1E28" />
        <StructuredData />

        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
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
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <Suspense fallback={<div className="h-20 bg-[#1B1E28]" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
