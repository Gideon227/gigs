import AboutHero from '@/components/AboutHero';
import AboutMain from '@/components/AboutMain';
import AboutSection from '@/components/AboutSection';
import Card from '@/components/Card';
import Cta from '@/components/Cta';
import React from 'react'

const About = () => {
  return (
    <div className='bg-[#101217] m-0'>
        <AboutHero />
        <AboutSection />
        <div className='px-16 py-28 bg-[#101217] space-y-10'>
            <h1 className='text-heading font-semibold text-[32px] leading-[48px] text-center'>The Real Problem in the Market <br />(And Why No One Solved It Yet)</h1>
            <div className='flex space-x-6'>
                <Card 
                    title= { <span>For Job Seekers</span> }
                    text={ <span>Generic job boards are cluttered, full of outdated listings, and make it nearly impossible to discover real-time openings for niche roles in the Microsoft stack. Most job seekers end up navigating a maze of LinkedIn reposts, third-party listings, or worse — ghost jobs.</span> }
                    image= "/microsoft.png"
                    background='bg-[#FF33FF80]'
                    height='h-[264]'
                    width={168}
                    imageHeight={168}
                />

                <Card 
                    title= { <span>For Recruiters and Hiring Teams</span> }
                    text={ <span>Finding <b>qualified, available,</b> and <b>interested</b> candidates in Power Platform and Dynamics 365 is a daily struggle. Most talent marketplaces are too broad, too slow, or full of noise — making sourcing inefficient and expensive.<br />
                    <b>There hasn&amp;t been a single place</b> where this community can <b>connect quickly, transparently, and with purpose</b>. Until now.</span> }
                    image= "/icon-about.png"
                    width={168}
                    imageHeight={168}
                    image2= "/icon-about-2.png"
                    height2={140}
                    width2={117}
                    style2='absolute -top-20 right-24'
                    extraImage= {true}
                    background='bg-[#114ECE66]'
                    height='h-[264]'
                />
            </div>
        </div>

        <AboutMain />
        <div className='bg-black flex justify-center items-center flex-1 p-28'>
            <Cta 
                title={<span>Join Us in Redefining the Future of Microsoft Business Apps Careers</span>}
                text={<span>
                        Whether you&apos;re a <b>job seeker</b> searching for your next meaningful role or a <b>recruiter</b> trying to find the perfect candidate in a sea of noise, <b>Gigs.Tech is here to bridge the gap.</b> We&apos;re not just building a platform — we&apos;re building a community for the people who power digital transformation with Microsoft technologies.
                        <br /><br />
                        <b>This is your space. This is your moment.</b>
                        <br /><br />
        
                        <b>Join the community</b> and be among the first to access the freshest Power Platform & Dynamics 365 jobs — before anyone else.
                    </span>}
                button='Follow us on Linkedin'
                buttonLink='/'
            />
        </div>
        {/* <AboutCard /> */}
    </div>
  )
}

export default About;