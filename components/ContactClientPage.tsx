import React from 'react'
import ContactMain from './ContactMain'
import Cta from './Cta'
import Image from 'next/image'
import useGtagPageview from '@/hooks/useGtagPageview'

const ContactClientPage = () => {
    useGtagPageview()
  return (
     <div className='bg-[#101217] overflow-hidden'>
      <div className='hero_bg w-full lg:h-[606px] flex-1 flex items-center justify-center max-lg:h-[350px] max-md:flex-col'>
        <div className='lg:w-1/2 px-28 relative flex flex-col justify-center items-center text-center py-20 space-x-2 md:py-16 max-md:text-center max-md:px-16 max-sm:px-10'>
          <Image src='/Group 6.png' alt='Glitters in about page' width={90} height={113} className='absolute left-28 top-0 max-lg:hidden'/>
          <Image src='/Group 6.png' alt='Glitters in about page' width={50} height={113} className='absolute max-md:left-0 max-md:top-8 left-16 top-0 lg:hidden'/>

          <p className='text-[16px] leading-[24px] font-normal text-heading'>We would love to hear from you!</p>
          <h1 className='text-heading lg:text-[56px] font-semibold lg:leading-[67.2px] max-md:text-[38px] max-lg:leading-[50px] max-lg:text-[45px] max-sm:text-[32px] max-sm:leading-[40px]'>Contact Us</h1>
          
          <Image src='/Group 5.png' alt='Glitters in about page' width={100} height={86} className='absolute right-28 bottom-3 max-lg:hidden'/>
          <Image src='/Group 5.png' alt='Glitters in about page' width={50} height={86} className='absolute max-md:right-0 max-md:bottom-10 right-15 bottom-5 lg:hidden'/>

        </div>
      </div>
      <ContactMain />
      <div className='bg-[#101217] max-w-[1600px] mx-auto flex justify-center items-center flex-1 py-28 px-8'>
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

export default ContactClientPage