"use client"
import Link from 'next/link';
import React, { useState, useRef } from 'react'

const TermPage = () => {
    const [activeId, setActiveId] = useState('about-gig')

    const aboutGigRef = useRef<HTMLElement | null>(null);
    const usePlatformRef = useRef<HTMLElement | null>(null);
    const jobListingRef = useRef<HTMLElement | null>(null);
    const userAccountRef = useRef<HTMLElement | null>(null);
    const intellectualPropertyRef = useRef<HTMLElement | null>(null);
    const liabilityRef = useRef<HTMLElement | null>(null);
    const termRef = useRef<HTMLElement | null>(null);
    const lawRef = useRef<HTMLElement | null>(null);
    const contactRef = useRef<HTMLElement | null>(null);

  return (
    <div className='bg-[#101217] py-16 px-20 flex h-screen '>
        <div className='w-1/3 bg-[#101217] p-4 border-r border-r-[#363636] h-full overflow-y-auto flex flex-col space-y-6 items-start'>
            <Link href='#about-gig' onClick={() => setActiveId("about-gig")} className={`pl-4 leading-[18px] ${activeId === 'about-gig' ? 'text-primary border-l-2 border-l-primary text-[16px] font-semibold' : 'text-neutral text-[14px]'}`}>
                About Gig.Tech
            </Link>

            <Link href='#use-platform' onClick={() => setActiveId("use-platform")} className={`pl-4 leading-[18px] ${activeId === 'use-platform' ? 'text-primary border-l-2 border-l-primary text-[16px] font-semibold' : 'text-neutral text-[14px]'}`}>
                Your Use of the Platform
            </Link>

            <Link href='#job-listing' onClick={() => setActiveId("job-listing")} className={`pl-4 leading-[18px] ${activeId === 'job-listing' ? 'text-primary border-l-2 border-l-primary text-[16px] font-semibold' : 'text-neutral text-[14px]'}`}>
                Job Listings
            </Link>

            <Link href='#user-account' onClick={() => setActiveId("user-account")} className={`pl-4 leading-[18px] ${activeId === 'user-account' ? 'text-primary border-l-2 border-l-primary text-[16px] font-semibold' : 'text-neutral text-[14px]'}`}>
                User Accounts (Future Feature)  
            </Link>

            <Link href='#intellectual-property' onClick={() => setActiveId("intellectual-property")} className={`pl-4 leading-[18px] ${activeId === 'intellectual-property' ? 'text-primary border-l-2 border-l-primary text-[16px] font-semibold' : 'text-neutral text-[14px]'}`}>
                Intellectual Property
            </Link>

            <Link href='#liability' onClick={() => setActiveId("liability")} className={`pl-4 leading-[18px] ${activeId === 'liability' ? 'text-primary border-l-2 border-l-primary text-[16px] font-semibold' : 'text-neutral text-[14px]'}`}>
                Limitation of Liability
            </Link>

            <Link href='#term-changes' onClick={() => setActiveId("term-changes")} className={`pl-4 leading-[18px] ${activeId === 'term-changes' ? 'text-primary border-l-2 border-l-primary text-[16px] font-semibold' : 'text-neutral text-[14px]'}`}>
                Changes to These Terms
            </Link>

            <Link href='#law' onClick={() => setActiveId("law")} className={`pl-4 leading-[18px] ${activeId === 'law' ? 'text-primary border-l-2 border-l-primary text-[16px] font-semibold' : 'text-neutral text-[14px]'}`}>
                Governing Law
            </Link>

            <Link href='#contact' onClick={() => setActiveId("contact")} className={`pl-4 leading-[18px] ${activeId === 'contact' ? 'text-primary border-l-2 border-l-primary text-[16px] font-semibold' : 'text-neutral text-[14px]'}`}>
                Contact Us
            </Link>
        </div>

        <main className='w-2/3 pl-12 overflow-y-auto h-screen space-y-8 hide-scrollbar'>
            <section 
                id="about-gig"
                ref={aboutGigRef}
                className='flex flex-col space-y-1 text-start'
            >
                <h1 className='text-[21px] leading-[36px] font-semibold text-heading'>About Gigs.Tech</h1>
                <p className='text-[14px] leading-[24px] text-heading'>We&apos;re a <b>niche job aggregator</b> focused on Microsoft Power Platform & Dynamics 365 careers.</p>

                <p className='text-[14px] leading-[24px] text-heading mt-3'> Our goal: <b>Connect qualified professionals with real job opportunities — quickly and directly.</b></p>
            </section>

            <hr className='text-gray h-1'/>

            <section 
                id="use-platform"
                ref={usePlatformRef}
                className='flex flex-col space-y-1 text-start'
            >
                <h1 className='text-[21px] leading-[36px] font-semibold text-heading'>Your Use of the Platform</h1>
                <div className='text-[14px] leading-[24px] text-heading'>
                    You may use our platform as a:<br />
                    <ul className='list-disc pl-6'>
                        <li><b>Job Seeker</b> (searching for roles, saving jobs, applying through company pages or — in future — directly)</li>

                        <li><b>Recruiter</b> (viewing or posting jobs once that feature is live)</li>
                    </ul>
                    <br />
                    You agree not to:
                    <ul className='list-disc pl-6'>
                        <li>Violate applicable laws</li>
                        <li>Upload harmful or misleading content</li>
                        <li>Abuse or misuse the platform (scraping, impersonation, spam, etc.)</li>
                    </ul>
                    
                </div>
            </section>

            <hr className='text-gray h-1'/>

            <section 
                id="job-listing"
                ref={jobListingRef}
                className='flex flex-col space-y-1 text-start'
            >
                <h1 className='text-[21px] leading-[36px] font-semibold text-heading'>Job Listings</h1>
                <div className='text-[14px] leading-[24px] text-heading'>
                    <b>For Job Seekers:</b><br />
                    <br/>
                    <ul className='list-disc pl-6'>
                        <li>Listings are either aggregated or posted directly by hiring partners</li>
                        <li>We do our best to ensure accuracy but can&apos;t guarantee listings are always up to date
                        </li>
                        <li>Gigs.Tech is not responsible for hiring decisions or employer communications
                        </li>
                    </ul>
                    <br /><br />

                    <b>For Recruiters:</b><br />
                    <ul className='list-disc pl-6'>
                        <li>Once direct posting is live, you must post accurate, lawful, and                non-discriminatory job descriptions
                        </li>
                        <li>We may moderate or remove any listings that violate these Terms or community standards
                        </li>
                    </ul>
                    
                </div>
            </section>

            <hr className='text-gray h-1'/>

            <section 
                id="user-account"
                ref={userAccountRef}
                className='flex flex-col space-y-1 text-start'
            >
                <h1 className='text-[21px] leading-[36px] font-semibold text-heading'>User Accounts (Future Feature)</h1>
                <div className='text-[14px] leading-[24px] text-heading'>
                    When accounts launch:<br />

                    <ul className='list-disc pl-6'>
                        <li>You must provide true, complete information</li>
                        <li>You are responsible for your login credentials</li>
                        <li>We reserve the right to suspend accounts that violate our terms or policies
                        </li>
                    </ul>    
                </div>
            </section>

            <hr className='text-gray h-1'/>

            <section 
                id="intellectual-property"
                ref={intellectualPropertyRef}
                className='flex flex-col space-y-1 text-start'
            >
                <h1 className='text-[21px] leading-[36px] font-semibold text-heading'>Intellectual Property</h1>
                <div className='text-[14px] leading-[24px] text-heading'>
                    The Gigs.Tech brand, logo, and platform features are the intellectual property of Gigs.Tech and may not be copied or reused without permission.
                    
                </div>
            </section>

            <hr className='text-gray h-1'/>

            <section 
                id="liability"
                ref={liabilityRef}
                className='flex flex-col space-y-1 text-start'
            >
                <h1 className='text-[21px] leading-[36px] font-semibold text-heading'>Limitation of Liability</h1>
                <div className='text-[14px] leading-[24px] text-heading'>
                    We provide Gigs.Tech <b>“as-is”</b> without warranties of any kind.<br />
                    We are not liable for:<br />
                    <ul className='list-disc pl-6'>
                        <li>Employment outcomes</li>
                        <li>Decisions made by recruiters or candidates</li>
                        <li>Job data pulled from third-party sources</li>
                    </ul>
                </div>
            </section>

            <hr className='text-gray h-1'/>

            <section 
                id="term-changes"
                ref={termRef}
                className='flex flex-col space-y-1 text-start'
            >
                <h1 className='text-[21px] leading-[36px] font-semibold text-heading'>Changes to These Terms</h1>
                <div className='text-[14px] leading-[24px] text-heading'>
                    We may update these Terms as our platform grows. We&apos;ll post the latest version on this page.   
                </div>
            </section>

            <hr className='text-gray h-1'/>

            <section 
                id="law"
                ref={lawRef}
                className='flex flex-col space-y-1 text-start'
            >
                <h1 className='text-[21px] leading-[36px] font-semibold text-heading'>Governing Law</h1>
                <div className='text-[14px] leading-[24px] text-heading'>
                    These Terms are governed by the laws of the State of Delaware.    
                </div>
            </section>

            <hr className='text-gray h-1'/>

            <section 
                id="contact"
                ref={contactRef}
                className='flex flex-col space-y-1 text-start'
            >
                <h1 className='text-[21px] leading-[36px] font-semibold text-heading'>Intellectual Property</h1>
                <div className='text-[14px] leading-[24px] text-heading'>
                    Have a question?<br />
                    Reach out anytime: 
                    <Link href='mailto:support@gigs.tech' className='text-primary underline'>support@gigs.tech</Link>
                </div>
            </section>

        </main>

    </div>
  )
}

export default TermPage;