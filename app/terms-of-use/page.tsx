import TermClientPage from '@/components/TermClientPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Term of use"
}

const TermPage = () => {
    return(
        <>
            <TermClientPage />
        </>
    )
}

export default TermPage;