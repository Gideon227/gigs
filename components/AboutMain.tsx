import React from 'react'
import Image from 'next/image'
import AboutCard from './AboutCard';
import LastLineImage from './LastLineImage';

const AboutMain = () => {
  return (
    <div className='w-full bg-[#1B1E28]'>
        <div className='max-w-[1600px] mx-auto lg:p-16 flex flex-col justify-start max-lg:items-center max-lg:px-4 max-lg:py-16'>
            <Image src='/diamond sparkle.svg' width={58} height={58} alt='diamond sparkle' className='object-contain'/>

            <div className='lg:w-2/3 flex flex-col justify-start space-y-6 max-lg:mt-4 max-md:space-y-4'>
                <LastLineImage 
                    text='Our Solution: The Home for Microsoft Power Platform & Dynamics Jobs'
                    imageUrl='/diamond.svg'
                />
                {/* <h1 className=''>
                    <Image src='/diamond.svg' alt='diamond' className='absolute -bottom-4 xl:left-60 left-72'/>
                </h1> */}

                <p className='font-normal text-[16px] leading-[27px] text-start text-paragraph'> <span className='text-primary font-lora'>Gigs.Tech</span> is a hyper-focused job aggregation platform built from the ground up to serve one mission:</p>

                <p className='text-heading text-[24px] font-normal leading-[36px] max-lg:text-[18px] max-lg:leading-[27px]'>Help Microsoft job seekers discover the freshest roles, and help recruiters connect with qualified candidates — faster and smarter.</p>

                <p className='text-[16px] leading-[24px] text-start text-paragraph'>What we do:</p>
            </div>

            <div className='flex space-x-8 my-14 max-lg:flex-col max-lg:space-y-16'>
                <AboutCard 
                    image='/about-icon-1.svg'
                    title='Aggregate Jobs in Real Time'
                    text='Aggregate jobs in real time from the career pages of Microsoft partners, staffing firms, and consulting agencies — not reposts, not junk.'
                    position='start'
                />

                <AboutCard 
                    image='/about-icon-2.svg'
                    title='Clean, Focused Experience'
                    text='Give job seekers a clean, focused experience to find roles that actually align with their skills.'
                    position='start'
                />
                <AboutCard 
                    image='/about-icon-3.svg'
                    title='Direct, Targeted Pipeline'
                    text='Provide recruiters with a direct, targeted pipeline of talent already engaged in the Microsoft business apps space.'
                    position='start'
                />
            </div>

            <p className='text-paragraph text-[16px] leading-[24px] text-start'>
                We&apos;re here to make sure no Dynamics or Power Platform opportunity gets missed again.
            </p>

            <span className='flex justify-center items-center my-24'>
                <Image src='/arrow.png' alt="an arrow" width={195} height={80}/>
            </span>

            <div className='flex flex-col justify-end items-end text-end space-y-4'>
                <h1 className='text-[32px] font-semibold leading-[48px] text-heading max-lg:text-[27px] max-lg:leading-[36px]'>Why <span className='text-primary'>Gigs.Tech?</span> The Benefits for Everyone Involved</h1>

                <p className='text-paragraph text-[20px] leading-[30px] max-md:text-[16px] pb-6'>For Job Seekers:</p>

                <div className='grid grid-cols-3 gap-12 items-start auto-rows-[minmax(300px,_auto)] max-md:grid-cols-2 max-md:gap-4 '>
                    <AboutCard 
                        image='/about-illustration-1.svg'
                        title='Be first in line'
                        text='Find jobs minutes after they&apos;re posted on official career sites.'
                        position='end'
                    />
                    <AboutCard 
                        image='/about-illustration-2.svg'
                        title='No spam. No noise'
                        text='No spam, no noise. Just Power Platform & Dynamics 365 jobs.'
                        position='end'
                    />
                    <AboutCard 
                        image='/about-illustration-3.svg'
                        title='Apply directly'
                        text='Apply directly on the company&apos;s site — no middlemen, no confusion.'
                        position='end'
                    />
                    {/* desktop screens */}
                    <AboutCard 
                        image='/about-illustration-4.svg'
                        title='Built by someone like you'
                        text='Built by someone who&apos;s been in your shoes — not a faceless tech company.'
                        position='end'
                        extraStyle='max-md:hidden'
                    />
                    {/* Mobile screens */}
                    <AboutCard 
                        image='/about-illustration-4.svg'
                        title='Made from experience'
                        text='Built by someone who&apos;s been in your shoes — not a faceless tech company.'
                        position='end'
                        extraStyle='md:hidden'
                    />
                    <AboutCard 
                        image='/about-illustration-5.svg'
                        title='Stay ahead of the market'
                        text='Stay ahead of the market with fresh listings updated daily.'
                        position='end'
                    />

                    <AboutCard 
                        image='/about-illustration-6.svg'
                        title='Finding roles'
                        text='Find roles that match your actual skills: Canvas Apps, Power Automate, CE, F&O, and more.'
                        position='end'
                    />
                </div>   
            </div>

            <span className='flex justify-center items-center my-24'>
                <Image src='/arrow-2.png' alt="an arrow" width={195} height={80}/>
            </span>

            <div className='flex flex-col justify-start items-start text-start space-y-4 px-2'>
                <p className='text-paragraph text-[20px] leading-[30px] text-start max-md:mb-16 pb-6'>For Recruiters and Hiring Teams:</p>

                <div className='grid grid-cols-3 gap-12 auto-rows-[minmax(250px,_auto)] max-md:grid-cols-2 max-md:gap-4 '>
                    <AboutCard 
                        image='/about-illustration-7.svg'
                        title='Targeted exposure'
                        text='Targeted exposure to an audience of active Power Platform & Dynamics professionals.'
                        position='start'
                    />

                    <AboutCard 
                        image='/about-illustration-8.svg'
                        title='Faster time to hire'
                        text='Reach candidates who are already in the ecosystem.'
                        position='start'
                    />

                    <AboutCard 
                        image='/about-illustration-9.svg'
                        title='No job board clutter'
                        text='Your postings live among relevant roles only.'
                        position='start'
                    />
                    {/* Desktop screen */}
                    <AboutCard 
                        image='/about-illustration-10.svg'
                        title='Passive and active talent'
                        text='Passive and active talent can both discover your openings.'
                        position='start'
                        extraStyle='max-md:hidden'
                    />

                    {/* MOBILE SCREEN */}
                    <AboutCard 
                        image='/about-illustration-10.svg'
                        title='Passive & active talent'
                        text='Passive and active talent can both discover your openings.'
                        position='start'
                        extraStyle='md:hidden'
                    />

                    <AboutCard 
                        image='/about-illustration-11.svg'
                        title='Trust and credibility'
                        text='Built on 15+ years of industry relationships.'
                        position='start'
                    />

                    <AboutCard 
                        image='/about-illustration-12.svg'
                        title='A growing community'
                        text='A growing community of Microsoft consultants looking for their next gig.'
                        position='start'
                    />
                </div>
            </div>
        </div>

    </div>

  )
}

export default AboutMain