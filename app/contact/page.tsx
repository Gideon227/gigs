import React from 'react';
import { Metadata } from 'next';
import useGtagPageview from '@/hooks/useGtagPageview';
import ContactClientPage from '@/components/ContactClientPage';

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Gigs.Tech for partnerships, support, or community inquiries.",
  alternates: {
    canonical: "https://test.gigs.tech/contact",
  },
};

const Contact = () => {
  useGtagPageview()
  return (
   <ContactClientPage />
  )
}

export default Contact;