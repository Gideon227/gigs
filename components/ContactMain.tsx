import React from 'react'
import Card from './Card'
import Link from 'next/link'

const ContactMain = () => {
  return (
    <div className='bg-[#101217] px-12'>
        <div className='py-16 flex flex-col justify-center items-center text-center space-y-2'>
            <h1 className='text-center text-[32px] leading-[48px] font-semibold text-heading'>Get in Touch with Gigs.Tech</h1>
            <p className='text-paragraph text-[16px] leading-[24px] text-center'>Whether you&apos;re a <span className='text-primary'>Power Platform or Dynamics 365 professional</span> searching for your next opportunity,<br /> or a <span className='text-primary'>recruiter</span> looking to connect with qualified talent, we&apos;d love to hear from you.</p>
        </div>

        <div className='grid grid-cols-2 grid-rows-7 gap-6'>
            <Card 
                title={<span>General Inquiries</span>}
                text={<span>Got a question about how Gigs.Tech works? Want to partner with us or provide feedback?
                        <br /> <br /> 
                        Email: <Link href='mailto:hello@gigs.tech' className='text-primary underline'>hello@gigs.tech</Link>
                    </span>}
                image='/Speech bubbles-bro 1.png'
                extraStyles='row-span-3'
                background='bg-[#1B1E28]'
                height='h-[265px]'
                width={300}
                imageHeight={200}
            />

            <Card 
                title={<span>For Job Seekers</span>}
                text={<span>If you&apos;re having trouble finding the right roles, want to report an issue, or just want to tell us how we can make the site better for you:
                        <br /> <br /> 
                        Reach out anytime: <Link href='mailto:support@gigs.tech' className='text-primary underline'>support@gigs.tech</Link>
                        <br /><br />
                        We&apos;re building this platform with your voice in mind.
                    </span>}
                image='/Typing-bro 1.png'
                extraStyles='row-span-4'
                background='bg-[#1B1E28]'
                height='h-[344px]'
                width={300}
                imageHeight={200}
            />
            <Card 
                title={<span>For Recruiters & Hiring Teams</span>}
                text={<span>Want to feature your jobs, discuss a future partnership, or be part of our early recruiter network?
                    <br /><br />
                    We&apos;re currently accepting recruiters to offer early access to:
                    <br /><br />            
                    Direct posting features (free postings)
                    Beta talent matching tools
                    Advertising tools
                    AI tools    
                    <br />
                        Let&apos;s connect: <Link href='mailto:recruit@gigs.tech' className='text-primary underline'>recruit@gigs.tech</Link>
                    </span>}
                image='/Interview-bro 1.png'
                extraStyles='row-span-4'
                background='bg-[#1B1E28]'
                height='h-[344px]'
                width={300}
                imageHeight={200}
            />
            <Card 
                title={<span>Business & Media</span>}
                text={<span>For press, media, investor inquiries, or business development discussions:
                        <br /> <br /> 
                        Contact: <Link href='mailto:hello@gigs.tech' className='text-primary underline'>hello@gigs.tech</Link>
                    </span>}
                image='/Speech bubbles-bro 1.png'
                extraStyles='row-span-3'
                background='bg-[#1B1E28]'
                height='h-[265px]'
                width={300}
                imageHeight={200}
            />
        </div>


    </div>
  )
}

export default ContactMain