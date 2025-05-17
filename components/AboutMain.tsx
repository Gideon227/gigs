import React from 'react'
import Image from 'next/image'
import AboutCard from './AboutCard';

const AboutMain = () => {
  return (
    <div className='bg-[#1B1E28] p-16 flex flex-col justify-start'>
        <Image src='/diamond sparkle.png' width={58} height={58} alt='diamond sparkle' className='object-contain'/>

        <div className='w-2/3 flex flex-col justify-start space-y-4'>
            <h1 className='text-[32px] font-semibold leading-[48px] text-start text-heading'>Our Solution: The Home for Microsoft Power Platform & Dynamics Jobs</h1>

            <p className='font-lora font-medium text-[16px] leading-[27px] text-start text-paragraph'> <span className='text-primary'>Gigs.Tech</span> is a hyper-focused job aggregation platform built from the ground up to serve one mission:</p>

            <p className='text-heading text-[21px] leading-[36px]'>Help job seekers discover the freshest roles, and help recruiters connect with qualified candidates — faster and smarter.</p>

            <p className='text-xs leading-[24px] text-start text-paragraph'>What we do:</p>
        </div>

        <div className='flex space-x-8 my-14'>
            <AboutCard 
                image='/about-icon-1.png'
                title='Aggregate Jobs in Real Time'
                text='Aggregate jobs in real time from the career pages of Microsoft partners, staffing firms, and consulting agencies — not reposts, not junk.'
                position='start'
            />

            <AboutCard 
                image='/about-icon-2.png'
                title='Clean, Focused Experience'
                text='Give job seekers a clean, focused experience to find roles that actually align with their skills.'
                position='start'
            />
            <AboutCard 
                image='/about-icon-3.png'
                title='Direct, Targeted Pipeline'
                text='Provide recruiters with a direct, targeted pipeline of talent already engaged in the Microsoft business apps space.'
                position='start'
            />
        </div>

        <p className='text-paragraph text-[14px] leading-[24px] text-start'>
            We&amp;re here to make sure no Dynamics or Power Platform opportunity gets missed again.
        </p>

        <span className='flex justify-center items-center my-24'>
            <Image src='/arrow.png' alt="an arrow" width={195} height={80}/>
        </span>

        <div className='flex flex-col justify-end items-end text-end space-y-4'>
            <h1 className='text-[32px] font-semibold leading-[48px] text-heading'>Why <span className='text-primary'>Gigs.Tech?</span> The Benefits for Everyone Involved</h1>

            <p className='text-paragraph text-[20px] leading-[30px]'>For Job seekers:</p>

            <div className='grid grid-cols-3 gap-12'>
                <AboutCard 
                    image='/about-illustration-1.png'
                    title='Be first in line'
                    text='Find jobs minutes after they&amp;re posted on official career sites.'
                    position='end'
                />
                <AboutCard 
                    image='/about-illustration-2.png'
                    title='No spam. No noise'
                    text='No spam, no noise. Just Power Platform & Dynamics 365 jobs, period.'
                    position='end'
                />
                <AboutCard 
                    image='/about-illustration-3.png'
                    title='Apply directly'
                    text='Apply directly on the company&amp;s site — no middlemen, no confusion.'
                    position='end'
                />
                <AboutCard 
                    image='/about-illustration-4.png'
                    title='Built by someone in your shoes'
                    text='Built by someone who&amp;s been in your shoes — not a faceless tech company.'
                    position='end'
                />
                <AboutCard 
                    image='/about-illustration-5.png'
                    title='Be first in line'
                    text='Find jobs minutes after they&amp;re posted on official career sites.'
                    position='end'
                />
                <AboutCard 
                    image='/about-illustration-6.png'
                    title='Finding roles'
                    text='Find roles that match your actual skills: Canvas Apps, Power Automate, CE, F&O, and more.'
                    position='end'
                />

            </div>   
        </div>

        <span className='flex justify-center items-center my-24'>
            <Image src='/arrow-2.png' alt="an arrow" width={195} height={80}/>
        </span>

        <div className='flex flex-col justify-start items-start text-start space-y-4'>
            <p className='text-paragraph text-[20px] leading-[30px] text-start'>For Recruiters and Hiring Teams:</p>

            <div className='grid grid-cols-3 gap-12'>
                <AboutCard 
                    image='/about-illustration-7.png'
                    title='Targeted exposure'
                    text='Targeted exposure to an audience of active Power Platform & Dynamics professionals.'
                    position='start'
                />

                <AboutCard 
                    image='/about-illustration-8.png'
                    title='Faster time to hire'
                    text='Reach candidates who are already in the ecosystem.'
                    position='start'
                />

                <AboutCard 
                    image='/about-illustration-9.png'
                    title='No job board clutter'
                    text='Your postings live among relevant roles only.'
                    position='start'
                />

                <AboutCard 
                    image='/about-illustration-10.png'
                    title='Passive and active talent'
                    text='Passive and active talent can both discover your openings.'
                    position='start'
                />

                <AboutCard 
                    image='/about-illustration-11.png'
                    title='Trust and credibility'
                    text='built on 15+ years of industry relationships.'
                    position='start'
                />

                <AboutCard 
                    image='/about-illustration-12.png'
                    title='A growing community'
                    text='A growing community of Microsoft consultants looking for their next gig.'
                    position='start'
                />
            </div>
        </div>
    </div>

  )
}

export default AboutMain