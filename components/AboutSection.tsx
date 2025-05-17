import React from 'react'

const AboutSection = () => {
  return (
    <div className='px-16 pt-24 pb-12 bg-[#101217] space-y-6'>
       <h1 className='flex w-1/2 justify-start items-center font-semibold text-[32px] leading-[48px] text-heading text-start'>
            Built for the Power Platform & Dynamics 365 Community. By One of Us.
       </h1>
       <div className='flex justify-center items-start space-x-12'>
            <div>
                <p className='text-[16px] text-paragraph leading-[24px] '>After 15+ years in IT consulting and over a decade immersed in the Microsoft Business Applications ecosystem — I have experienced the pain points firsthand. Whether leading enterprise rollouts or mentoring junior consultants, one challenge kept surfacing:</p>
            </div>
            <div className='space-y-2 '>
                <p className='font-medium text-[16px] leading-[27px] text-heading'>“Why is it so hard to find the right opportunities in this space?”</p>

                <p className='font-medium text-[16px] leading-[27px] text-paragraph'>
                    <span className='text-primary font-lora'>Gigs.Tech</span> was born from that frustration. It&amp;s not just another job board. It&amp;s a specialized, recruiter-friendly, job seeker-first platform built exclusively for the Power Platform and Dynamics 365 ecosystem — so talent and opportunity can finally meet without the noise.
                </p>
            </div>
       </div> 
    </div>
  )
}

export default AboutSection