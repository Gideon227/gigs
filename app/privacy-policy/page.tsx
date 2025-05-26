"use client"
import Link from 'next/link';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const PrivacyPage = () => {
    const [activeId, setActiveId] = useState('data')

    const containerRef = useRef<HTMLDivElement>(null);
    const dataRef = useRef<HTMLElement | null>(null);
    const informationRef = useRef<HTMLElement | null>(null);
    const cookiesRef = useRef<HTMLElement | null>(null);
    const securityRef = useRef<HTMLElement | null>(null);
    const rightRef = useRef<HTMLElement | null>(null);
    const policyRef = useRef<HTMLElement | null>(null);
    const contactRef = useRef<HTMLElement | null>(null);


    const scrollToSection = useCallback((ref: React.RefObject<HTMLElement | null>) => {
        if (!ref.current || !containerRef.current) return;
        const top = ref.current.offsetTop;
        containerRef.current.scrollTo({ top, behavior: 'smooth' });
      }, []);


    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const options: IntersectionObserverInit = {
        root: container,
        rootMargin: '0px 0px -60% 0px', // fire when section crosses 40% from top
        threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break; // only need the first visible
            }
        }
    }, options);

    // observe each section
    [dataRef, informationRef, cookiesRef, securityRef,rightRef, policyRef, contactRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
      }, []);

  return (
    <div className='overflow-hidden'>
        <div className='hero_bg w-full h-[605px] bg-bottom -mt-20 -mb-20 flex items-center justify-center'>
            <div className='max-w-[1800px] flex items-center justify-center'>
                <div className='lg:w-2/3 lg:px-36 max-lg:px-24 max-md:px-6 relative flex flex-col max-sm:space-y-2 sm:space-y-6 justify-center items-center text-center py-8'>
                    <Image src='/Group 6.png' width={90} height={114} alt='sparkles' className='absolute left-0 top-0 max-lg:hidden'/>
                    <Image src='/Group 6.png' alt='Glitters in about page' width={50} height={113} className='absolute max-md:left-5 max-md:top-0 left-28 top-0 lg:hidden'/>

                    <Image src='/Group 5.png' width={100} height={86} alt='sparkles' className='absolute right-0 bottom-0 max-lg:hidden'/>
                    <Image src='/Group 5.png' alt='sparkles' width={50} height={86} className='absolute max-md:right-7 max-md:-bottom-10 right-36 -bottom-10 lg:hidden'/>

                    <h1 className='leading-[84px] text-[56px] font-semibold text-heading max-md:text-[38px] max-lg:leading-[50px] max-lg:text-[45px] max-sm:text-[27px] max-sm:leading-[36px]'>Privacy Policy</h1>

                    <p className='text-[16px] leading-[24px] font-normal text-heading max-sm:text-sm'><b>Welcome to Gigs.Tech.</b> This Privacy Policy explains how we collect, use, and protect your information — whether you're a <b>job seeker</b> looking for your next Microsoft Business Apps role or a <b>recruiter</b> sourcing top Power Platform & Dynamics 365 talent.</p>

                    <div className='flex space-x-6 items-center justify-center lg:w-1/2'>
                        <div className='space-y-2 '>
                            <p className='text-[16px] font-semibold leading-[27px] text-heading '>Effective Date:</p>
                            <p className='text-sm text-heading'>April 16th 2025</p>
                        </div>

                        <span className='w-[1px] text-heading'>|</span> 

                        <div className='space-y-2 '>
                            <p className='text-[16px] font-semibold leading-[27px] text-heading '>Last Updated:</p>
                            <p className='text-sm text-heading'>April 16th 2025</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* MAIN CONTENT */}
        <div className='bg-[#101217] '>
            <div className='max-w-[1800px] flex items-start m-auto lg:py-16 lg:px-20 px-6 py-10 h-screen'>
                <div className='w-1/3 bg-[#101217] p-4 border-r border-r-[#363636] h-full overflow-y-auto flex flex-col space-y-6 items-start max-lg:hidden'>
                    <Link href='#data' onClick={() => scrollToSection(dataRef)} className={`pl-4 leading-[18px] text-[16px] ${activeId === 'data' ? 'text-primary border-l-2 border-l-primary font-semibold' : 'text-neutral'}`}>
                        What We Collect (Now and in the Future)
                    </Link>

                    <Link 
                        href='#information' 
                        onClick={() => scrollToSection(informationRef)} 
                        className={`pl-4 leading-[18px] text-[16px] ${activeId === 'information' ? 'text-primary border-l-2 border-l-primary font-semibold' : 'text-neutral'}`}>
                            How We Use Your Information
                    </Link>

                    <Link href='#cookies' onClick={() => scrollToSection(cookiesRef)} className={`pl-4 leading-[18px] text-[16px] ${activeId === 'cookies' ? 'text-primary border-l-2 border-l-primary font-semibold' : 'text-neutral'}`}>
                        Cookies and Tracking
                    </Link>

                    <Link href='#security' onClick={() => scrollToSection(securityRef)} className={`2xl:hidden pl-4 leading-[18px] text-[16px] ${activeId === 'security' ? 'text-primary border-l-2 border-l-primary font-semibold' : 'text-neutral'}`}>
                        Data Sharing and Security  
                    </Link>

                    <Link href='#right' onClick={() => scrollToSection(rightRef)} className={`2xl:hidden pl-4 leading-[18px] text-[16px] ${activeId === 'right' ? 'text-primary border-l-2 border-l-primary font-semibold' : 'text-neutral'}`}>
                        Your Rights
                    </Link>

                    <Link href='#policy' onClick={() => scrollToSection(policyRef)} className={`2xl:hidden pl-4 leading-[18px] text-[16px] ${activeId === 'policy' ? 'text-primary border-l-2 border-l-primary font-semibold' : 'text-neutral'}`}>
                        Changes to This Policy
                    </Link>

                    <Link href='#contact' onClick={() => scrollToSection(contactRef)} className={`2xl:hidden pl-4 leading-[18px] text-[16px] ${activeId === 'contact' ? 'text-primary border-l-2 border-l-primary font-semibold' : 'text-neutral'}`}>
                        Contact
                    </Link>
                </div>

                <main className='lg:w-2/3 lg:pl-12 overflow-y-auto h-full space-y-8 hide-scrollbar lg:pb-96 2xl:pb' ref={containerRef}>
                    <section 
                        id="data"
                        ref={dataRef}
                        className='flex flex-col space-y-1 text-start'
                    >
                        <h1 className='text-[21px] leading-[36px] font-semibold text-heading'>What We Collect (Now and in the Future)</h1>
                        <p className='text-[16px] leading-[24px] text-heading'>Current <b>(MVP Stage)</b></p>
                        <br />

                        <div className='text-[16px] leading-[24px] text-heading'>
                            <ul className='list-disc pl-6'>
                                <li>We do not collect personal information (like names or emails).</li>
                                <li>We use cookies and analytics to improve site performance (Google Analytics, etc.).</li>
                            </ul>
                            <br /> 
                            Future (Post-login phase):<br />
                            We may collect and store the following:
                            <br /> <br />

                            <b>For Job Seekers:</b>
                            <ul className='list-disc pl-6'>
                                <li>Name, email, resume, skills, and application history</li>
                                <li>Saved job alerts and preferences</li>
                                <li>Communications and feedback</li>
                            </ul>
                            <br />

                            <b>For Recruiters:</b>
                            <ul className='list-disc pl-6'>
                                <li>Name, company details, email, job listings</li>
                                <li>Candidate outreach activity and engagement metrics</li>
                                <li>Payment information for job post purchases (if applicable)</li>
                            </ul>
                        </div>
                    </section>

                    <hr className='text-gray h-1'/>

                    <section 
                        id="information"
                        ref={informationRef}
                        className='flex flex-col space-y-1 text-start'
                    >
                        <h1 className='text-[21px] leading-[36px] font-semibold text-heading'>How We Use Your Information</h1>
                        <br />
                        <div className='text-[16px] leading-[24px] text-heading'>
                            For Job Seekers:<br />
                            <ul className='list-disc pl-6'>
                                <li>To personalize job feeds and alerts</li>
                                <li>To facilitate job applications</li>
                                <li>To improve your experience with tailored recommendations</li>
                            </ul>
                            <br />
                            For Recruiters:
                            <ul className='list-disc pl-6'>
                                <li>To display your job postings</li>
                                <li>To provide candidate analytics and interactions</li>
                                <li>To communicate updates and marketing (you can opt out anytime)</li>
                            </ul>
                            <br />

                            <p className=''>We will <b>never sell your data</b> to third parties.</p>
                            
                        </div>
                    </section>

                    <hr className='text-gray h-1'/>

                    <section 
                        id="cookies"
                        ref={cookiesRef}
                        className='flex flex-col space-y-1 text-start'
                    >
                        <h1 className='text-[21px] leading-[36px] font-semibold text-heading'>Cookies and Tracking</h1>
                        <br />
                        <div className='text-[16px] leading-[24px] text-heading'>
                            We use cookies to:<br />
                            <br/>
                            <ul className='list-disc pl-6'>
                                <li>Track usage (Google Analytics)</li>
                                <li>Understand audience behavior</li>
                                <li>Improve user experience</li>
                            </ul>
                            <br />
                            You can disable cookies through your browser settings.    
                        </div>
                    </section>

                    <hr className='text-gray h-1'/>

                    <section 
                        id="security"
                        ref={securityRef}
                        className='flex flex-col space-y-1 text-start'
                    >
                        <h1 className='text-[21px] leading-[36px] font-semibold text-heading'>Data Sharing and Security</h1>
                        <div className='text-[16px] leading-[24px] text-heading'>
                            We only share your data with trusted third-party providers (analytics, cloud hosting, email systems), strictly to improve Gigs.Tech services. All data is stored securely.  
                        </div>
                    </section>

                    <hr className='text-gray h-1'/>

                    <section 
                        id="right"
                        ref={rightRef}
                        className='flex flex-col space-y-1 text-start'
                    >
                        <h1 className='text-[21px] leading-[36px] font-semibold text-heading'>Your Rights</h1>
                        <div className='text-[16px] leading-[24px] text-heading'>
                            You can:

                            <ul className='list-disc pl-6'>
                                <li>Request a copy of your personal data</li>
                                <li>Ask us to delete your information</li>
                                <li>Unsubscribe from communications</li>
                                <li>Manage cookie preferences</li>
                            </ul>
                        </div>
                    </section>

                    <hr className='text-gray h-1'/>

                    <section 
                        id="policy"
                        ref={policyRef}
                        className='flex flex-col space-y-1 text-start'
                    >
                        <h1 className='text-[21px] leading-[36px] font-semibold text-heading'>Changes to This Policy</h1>
                        <div className='text-[16px] leading-[24px] text-heading'>
                            We&apos;ll update this policy as new features launch or laws change. The latest version will always be posted here.
                        </div>
                    </section>

                    <hr className='text-gray h-1'/>

                    <section 
                        id="contact"
                        ref={contactRef}
                        className='flex flex-col space-y-1 text-start'
                    >
                        <h1 className='text-[21px] leading-[36px] font-semibold text-heading'>Contact</h1>
                        <div className='text-[16px] leading-[24px] text-heading'>
                            <Link href='mailto:support@gigs.tech' className='text-primary underline'>support@gigs.tech</Link>
                            <br /><br />
                            <p>We&apos;re committed to protecting your privacy — every click, post, and application. 
                            </p>
                        </div>
                    </section>

                </main>
            </div>

        </div>
    </div>
  )
}

export default PrivacyPage