import PolicyClient from '@/components/PolicyClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Privacy Policy"
}

const PrivacyPage = () => {
    <>
        <PolicyClient /> 
    </>
}

export default PrivacyPage