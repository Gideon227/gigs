import React, { Suspense } from 'react';
import { Metadata } from 'next';
import AboutClientPage from '@/components/AboutClientPage';

export const metadata: Metadata = {
  title: "About Us",
  description: "Discover how GIGS.TECH connects Microsoft Business Apps professionals and employers.",
  alternates: {
    canonical: "https://gigs.tech/about",
  },
  openGraph: {
    title: "About GIGS.TECH",
    description: "Learn how GIGS.TECH connects Microsoft Power Platform professionals to top jobs.",
    url: "https://gigs.tech/about",
    type: "website",
  },
};

const About = () => {
  return (
    <Suspense fallback={<>...</>}>
      <AboutClientPage />
    </Suspense>
  )
}

export default About;