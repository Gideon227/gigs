import ContactMain from '@/components/ContactMain';
import Cta from '@/components/Cta';
import React from 'react'

const Contact = () => {
  return (
    <div className='bg-[#101217]'>
        <ContactMain />
        <div className='bg-[#101217] flex justify-center items-center flex-1 py-28 px-8'>
            <Cta 
                title={<span>We typically respond within 24–48 business hours</span>}
                text={<span>In the meantime, feel free to explore the freshest jobs in Power Platform & Dynamics.</span>}
                button='Browse Jobs'
                buttonLink='/browse-jobs'
            />
        </div>
    </div>
  )
}

export default Contact;