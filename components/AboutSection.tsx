import Link from 'next/link'
import React from 'react'

const AboutSection = () => {
  return (
    <div className='max-w-[1600px] mx-auto px-16 md:pt-20 md:pb-12 bg-[#101217] space-y-6 max-lg:px-6 max-md:py-12'>
       <h1 className='flex lg:w-1/2 justify-start items-center font-semibold text-[32px] leading-[48px] text-heading text-start max-md:text-[25px] max-lg:leading-[35px]'>
            Built for the Power Platform & Dynamics 365 Community. By One of Us.
       </h1>
       <div className='flex justify-center items-start lg:space-x-12 max-lg:flex-col max-lg:space-y-4'>
            <div>
                <p className='text-[16px] text-paragraph leading-[24px] max-md:text-sm max-md:leading-[24px]'>After 15+ years in IT consulting and over a decade immersed in the Microsoft Business Applications ecosystem — <a href='https://www.linkedin.com/in/shahenudu/' className='underline' target="_blank" rel="noopener noreferrer">I have</a> experienced the pain points firsthand. Whether leading enterprise rollouts or mentoring junior consultants, one challenge kept surfacing:</p>
            </div>
            <div className='space-y-2 '>
                <p className='font-medium text-[16px] leading-[27px] text-heading max-md:text-sm max-md:leading-[24px]'>“Why is it so hard to find the right opportunities in this space?”</p>

                <p className='font-normal text-[16px] leading-[27px] text-paragraph max-md:text-sm max-md:leading-[24px]'>
                    <span className='text-primary font-normal'>GIGS.TECH</span> was born from that frustration. It&apos;s not just another job board. It&apos;s a specialized, recruiter-friendly, job seeker-first platform built exclusively for the Power Platform and Dynamics 365 ecosystem — so talent and opportunity can finally meet without the noise.
                </p>
            </div>
       </div> 
    </div>
  )
}

export default AboutSection