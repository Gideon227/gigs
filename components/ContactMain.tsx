import React from 'react'
import Card from './Card'
import Link from 'next/link'

const ContactMain = () => {
  return (
    <div className='bg-[#101217] max-w-[1600px] mx-auto px-12 max-md:px-6 max-lg:px-6'>
        <div className='py-16 flex flex-col justify-center items-center text-center space-y-2'>
            <h1 className='text-center text-[32px] leading-[48px] font-semibold text-heading max-md:text-[28px] max-md:leading-[35px]'>Get in Touch with Gigs.Tech</h1>
            <p className='text-paragraph text-[16px] leading-[24px] text-center'>Whether you&apos;re a <span className='text-primary'>Power Platform or Dynamics 365 professional</span> searching for your next opportunity,<br /> or a <span className='text-primary'>recruiter</span> looking to connect with qualified talent, we&apos;d love to hear from you.</p>
        </div>

        <div className='grid grid-cols-2 md:grid-rows-7 max-w-fit m-auto gap-6 xl:gap-8 max-md:grid-cols-1 max-md:space-y-0'>
            <Card 
                title={<span>General Inquiries</span>}
                text={<span>Got a question about how Gigs.Tech works? Want to partner with us or provide feedback?
                        <br /> <br /> 
                        <span className='text-white font-semibold'>Email:</span> <Link href='mailto:hello@gigs.tech' className='text-primary underline'>hello@gigs.tech</Link>
                    </span>}
                image='/Speech.svg'
                extraStyles='md:row-span-3'
                background='bg-[#1B1E28]'
                height='h-[265px]'
                width={300}
                mobileWidth={200}
                imageHeight={200}
            />

            <Card 
                title={<span>For Job Seekers</span>}
                text={<span>If you&apos;re having trouble finding the right roles, want to report an issue, or just want to tell us how we can make the site better for you:
                        <br /> <br /> 
                        <span className='text-heading font-semibold'>Reach out anytime:</span> <Link href='mailto:support@gigs.tech' className='text-primary underline'>support@gigs.tech</Link>
                        <br /><br />
                        We&apos;re building this platform with your voice in mind.
                    </span>}
                image='/Typing.svg'
                extraStyles='md:row-span-4'
                background='bg-[#1B1E28]'
                height='h-[344px]'
                width={290}
                mobileWidth={180}
                imageHeight={200}
            />
            <Card 
                title={<span>For Recruiters & Hiring Teams</span>}
                text={<span>Want to feature your jobs, discuss a future partnership, or be part of our early recruiter network?
                    <br /><br />
                    We&apos;re currently accepting recruiters to offer early access to:
                    <br /><br />  
                    <ul className='list-disc pl-6 max-lg:pb-1 2xl:pb-2'>
                        <li>Direct posting features (free postings)</li>
                        <li>Beta talent matching tools</li>
                        <li>Advertising tools</li>
                        <li>AI tools</li>    
                    </ul>  
                    <span className='text-heading font-semibold'>Let&apos;s connect:</span> <Link href='mailto:recruit@gigs.tech' className='text-primary underline'>recruit@gigs.tech</Link>
                    </span>}
                image='/Interview.svg'
                extraStyles='md:row-span-4'
                background='bg-[#1B1E28]'
                height='h-[344px]'
                width={250}
                mobileWidth={165}
                imageHeight={220}
            />
            <Card 
                title={<span>Business & Media</span>}
                text={<span>For press, media, investor inquiries, or business development discussions:
                        <br /> <br /> 
                       <span className='text-heading font-semibold'>Contact:</span> <Link href='mailto:hello@gigs.tech' className='text-primary underline'>hello@gigs.tech</Link>
                    </span>}
                image='/Group discussion.svg'
                extraStyles='md:row-span-3 md:-mt-4'
                background='bg-[#1B1E28]'
                height='h-[265px]'
                width={300}
                mobileWidth={200}
                imageHeight={200}
                
            />
        </div>


    </div>
  )
}

export default ContactMain