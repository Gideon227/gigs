'use client'
import AboutHero from '@/components/AboutHero';
import AboutMain from '@/components/AboutMain';
import AboutSection from '@/components/AboutSection';
import Card from '@/components/Card';
import Cta from '@/components/Cta';
import React from 'react';
import { Metadata } from 'next';
import useGtagPageview from '@/hooks/useGtagPageview';
import AboutClientPage from '@/components/AboutClientPage';

export const metadata: Metadata = {
  title: "About Us",
  description: "Discover how Gigs.Tech connects Microsoft Business Apps professionals and employers.",
  alternates: {
    canonical: "https://test.gigs.tech/about",
  },
  openGraph: {
    title: "About Gigs.Tech",
    description: "Learn how Gigs.Tech connects Microsoft Power Platform professionals to top jobs.",
    url: "https://test.gigs.tech/about",
    type: "website",
  },
};

const About = () => {
  useGtagPageview()
  return (
    <AboutClientPage />
  )
}

export default About;