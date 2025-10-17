import React from 'react';
import { Metadata } from 'next';
import ContactClientPage from '@/components/ContactClientPage';

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Gigs.Tech for partnerships, support, or community inquiries.",
  alternates: {
    canonical: "https://gigs.tech/contact",
  },
};

const Contact = () => {
  return (
   <ContactClientPage />
  )
}

export default Contact;