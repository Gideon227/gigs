import PolicyClient from '@/components/PolicyClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read Gigs.Tech’s privacy practices and how we handle your personal information.",
  alternates: {
    canonical: "https://gigs.tech/privacy-policy",
  }
};

const PrivacyPage = () => {
    return (
      <>
        <PolicyClient /> 
      </>
    )
}

export default PrivacyPage