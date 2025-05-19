"use client"
import Link from 'next/link';
import React, { useState, useRef, useEffect, useCallback } from 'react'

const TermPage = () => {
    const [activeId, setActiveId] = useState('about-gig')

    const containerRef = useRef<HTMLDivElement>(null);
    const aboutGigRef = useRef<HTMLElement | null>(null);
    const usePlatformRef = useRef<HTMLElement | null>(null);
    const jobListingRef = useRef<HTMLElement | null>(null);
    const userAccountRef = useRef<HTMLElement | null>(null);
    const intellectualPropertyRef = useRef<HTMLElement | null>(null);
    const liabilityRef = useRef<HTMLElement | null>(null);
    const termRef = useRef<HTMLElement | null>(null);
    const lawRef = useRef<HTMLElement | null>(null);
    const contactRef = useRef<HTMLElement | null>(null);


    const scrollToSection = useCallback((ref: React.RefObject<HTMLElement | null>) => {
        if (!ref.current || !containerRef.current) return;
        const top = ref.current.offsetTop;
        containerRef.current.scrollTo({ top, behavior: 'smooth' });
      }, []);


    useEffect(() => {
        // const handleScroll = () => {
        //   const scrollY = window.scrollY;
    
        //   const buffer = 100; // offset for header spacing
        //   const refs = [
        //     { id: 'about-gig', ref: aboutGigRef },
        //     { id: 'use-platform', ref: usePlatformRef },
        //     { id: 'job-listing', ref: jobListingRef },
        //     { id: 'user-account', ref: userAccountRef },
        //     { id: 'intellectual-property', ref: intellectualPropertyRef },
        //     { id: 'liability', ref: liabilityRef },
        //     { id: 'term-changes', ref: termRef },
        //     { id: 'law', ref: lawRef },
        //     { id: 'contact', ref: contactRef },
        //   ];
    
        //   for (let i = refs.length - 1; i >= 0; i--) {
        //     const el = refs[i].ref.current;
        //     if (el && el.offsetTop <= scrollY + buffer) {
        //       setActiveId(refs[i].id);
        //       break;
        //     }
        //   }
        // };
    
        // window.addEventListener('scroll', handleScroll);
        // return () => window.removeEventListener('scroll', handleScroll);


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
    [aboutGigRef, usePlatformRef, jobListingRef, userAccountRef,intellectualPropertyRef, liabilityRef, termRef, lawRef, contactRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
      }, []);

  return (
    <div className='bg-[#101217] lg:py-16 lg:px-20 px-6 py-10 flex h-screen '>
        <div className='w-1/3 bg-[#101217] p-4 border-r border-r-[#363636] h-full overflow-y-auto flex flex-col space-y-6 items-start max-lg:hidden'>
            <Link href='#about-gig' onClick={() => scrollToSection(aboutGigRef)} className={`pl-4 leading-[18px] ${activeId === 'about-gig' ? 'text-primary border-l-2 border-l-primary text-[16px] font-semibold' : 'text-neutral text-[14px]'}`}>
                About Gig.Tech
            </Link>

            <Link 
                href='#use-platform' 
                onClick={() => scrollToSection(usePlatformRef)} 
                className={`pl-4 leading-[18px] ${activeId === 'use-platform' ? 'text-primary border-l-2 border-l-primary text-[16px] font-semibold' : 'text-neutral text-[14px]'}`}>
                    Your Use of the Platform
            </Link>

            <Link href='#job-listing' onClick={() => scrollToSection(jobListingRef)} className={`pl-4 leading-[18px] ${activeId === 'job-listing' ? 'text-primary border-l-2 border-l-primary text-[16px] font-semibold' : 'text-neutral text-[14px]'}`}>
                Job Listings
            </Link>

            <Link href='#user-account' onClick={() => scrollToSection(userAccountRef)} className={`pl-4 leading-[18px] ${activeId === 'user-account' ? 'text-primary border-l-2 border-l-primary text-[16px] font-semibold' : 'text-neutral text-[14px]'}`}>
                User Accounts (Future Feature)  
            </Link>

            <Link href='#intellectual-property' onClick={() => scrollToSection(intellectualPropertyRef)} className={`pl-4 leading-[18px] ${activeId === 'intellectual-property' ? 'text-primary border-l-2 border-l-primary text-[16px] font-semibold' : 'text-neutral text-[14px]'}`}>
                Intellectual Property
            </Link>

            <Link href='#liability' onClick={() => scrollToSection(liabilityRef)} className={`pl-4 leading-[18px] ${activeId === 'liability' ? 'text-primary border-l-2 border-l-primary text-[16px] font-semibold' : 'text-neutral text-[14px]'}`}>
                Limitation of Liability
            </Link>

            <Link href='#term-changes' onClick={() => scrollToSection(termRef)} className={`pl-4 leading-[18px] ${activeId === 'term-changes' ? 'text-primary border-l-2 border-l-primary text-[16px] font-semibold' : 'text-neutral text-[14px]'}`}>
                Changes to These Terms
            </Link>

            <Link href='#law' onClick={() => scrollToSection(lawRef)} className={`pl-4 leading-[18px] ${activeId === 'law' ? 'text-primary border-l-2 border-l-primary text-[16px] font-semibold' : 'text-neutral text-[14px]'}`}>
                Governing Law
            </Link>

            <Link href='#contact' onClick={() => scrollToSection(contactRef)} className={`pl-4 leading-[18px] ${activeId === 'contact' ? 'text-primary border-l-2 border-l-primary text-[16px] font-semibold' : 'text-neutral text-[14px]'}`}>
                Contact Us
            </Link>
        </div>

        <main className='lg:w-2/3 lg:pl-12 overflow-y-auto h-full space-y-8 hide-scrollbar lg:pb-96' ref={containerRef}>
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