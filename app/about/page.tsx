import React from 'react';
import { Metadata } from 'next';
import AboutClientPage from '@/components/AboutClientPage';

export const metadata: Metadata = {
  title: "About Us",
  description: "Discover how Gigs.Tech connects Microsoft Business Apps professionals and employers.",
  alternates: {
    canonical: "https://gigs.tech/about",
  },
  openGraph: {
    title: "About Gigs.Tech",
    description: "Learn how Gigs.Tech connects Microsoft Power Platform professionals to top jobs.",
    url: "https://gigs.tech/about",
    type: "website",
  },
};

const About = () => {
  return (
    <AboutClientPage />
  )
}

export default About;