import PolicyClient from '@/components/PolicyClient';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read GIGS.TECH's privacy practices and how we handle your personal information.",
  alternates: {
    canonical: "https://gigs.tech/privacy-policy",
  }
};

const PrivacyPage = () => {
    return (
      <Suspense fallback={<>...</>}>
        <PolicyClient /> 
      </Suspense>
    )
}

export default PrivacyPage