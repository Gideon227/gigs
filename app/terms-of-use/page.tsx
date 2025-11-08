import TermClientPage from '@/components/TermClientPage';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Terms Of Use",
  description: "Understand the terms and conditions of using Gigs.Tech’s services and platform.",
  alternates: {
    canonical: "https://gigs.tech/terms-of-use",
  },
};


const TermPage = () => {
    return(
      <Suspense fallback={<>...</>}>
        <TermClientPage />
      </Suspense>
    )
}

export default TermPage;