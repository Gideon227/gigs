
import TermClientPage from '@/components/TermClientPage';
import { Metadata } from 'next';
import useGtagPageview from '@/hooks/useGtagPageview';

export const metadata: Metadata = {
  title: "Terms Of Use",
  description: "Understand the terms and conditions of using Gigs.Tech’s services and platform.",
  alternates: {
    canonical: "https://test.gigs.tech/terms-of-use",
  },
};


const TermPage = () => {
  useGtagPageview()
    return(
        <>
            <TermClientPage />
        </>
    )
}

export default TermPage;