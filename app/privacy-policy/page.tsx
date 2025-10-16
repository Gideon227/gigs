"use client"
import PolicyClient from '@/components/PolicyClient';
import { Metadata } from 'next';
import useGtagPageview from '@/hooks/useGtagPageview';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read Gigs.Tech’s privacy practices and how we handle your personal information.",
  alternates: {
    canonical: "https://test.gigs.tech/privacy-policy",
  }
};

const PrivacyPage = () => {
    useGtagPageview();
    return (
      <>
        <PolicyClient /> 
      </>
    )
}

export default PrivacyPage