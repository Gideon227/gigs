import React, { Suspense } from 'react'
import Image from 'next/image'
import JobCta from '@/components/JobCta'
import JobMain from '@/components/JobMain'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Browse Jobs",
  description: "Discover how Gigs.Tech connects Microsoft Business Apps professionals and employers.",
  alternates: {
    canonical: "https://gigs.tech/browse-jobs",
  },
  openGraph: {
    title: "Gigs.Tech",
    description: "Learn how Gigs.Tech connects Microsoft Power Platform professionals to top jobs.",
    url: "https://gigs.tech/browse-jobs",
    type: "website",
  },
};

function JobsLoading() {
  return (
    <>
    </>
  );
}

const Jobs = () => {

  return (
    <div className='bg-[#101217]'>
        <div className='browse-jobs_bg w-full lg:h-[606px] max-lg:h-[350px] flex justify-center lg:px-20 max-lg:px-8 max-sm:px-4 lg:space-x-10 max-lg:space-x-4 max-sm:space-x-0'>
            <div className='max-w-[1600px] flex-1 flex items-center justify-center max-md:flex-col'>
                <div className='md:w-2/3 max-sm:space-y-0 space-y-2 max-lg:space-y-3 lg:pr-6'>
                    <div className='flex space-x-1 items-center'>
                        <p className='text-sm leading-[24px] text-[#E3E3E3]'>Welcome to Gigs.Tech</p>
                        <Image src='/waving.png' alt='waving emoji' width={21} height={21} className='flex items-center object-contain -mt-1 max-md:hidden'/>
                        <Image src='/waving.png' alt='waving emoji' width={18} height={18} className='flex items-center object-contain -mt-1 md:hidden'/>
                    </div>

                    <h1 className='font-semibold text-[40px] lg:leading-[60px] text-heading max-lg:text-[27px] max-lg:leading-[32px] max-sm:text-[24px] max-sm:leading-8'>Power Platform & Dynamics <br /> 365 jobs all in one place.</h1>
                    
                    <p className='text-heading text-[16px] leading-[27px] max-lg:leading-[25px] max-lg:text-[15px] max-sm:text-[13px] max-sm:leading-6 max-sm:pt-4'>Gigs.Tech is a hyper-focused job aggregation platform built from the ground up to serve<br className='max-md:hidden'/> one mission: Help Microsoft job seekers discover the freshest roles, and help recruiters<br className='max-md:hidden'/> connect with qualified candidates — faster and smarter. </p>
                </div>
                <div className='md:w-1/3 flex items-end justify-center flex-1 max-md:hidden'>
                    <Image src='/browse-jobs_hero.svg' alt='About us page illustration' width={585} height={514} className='object-contain'/>
                </div>  
            </div>
        </div>

        <Suspense fallback={<JobsLoading />}>
          <div className='max-w-[1600px] p-4 m-auto'>
              <JobMain />
          </div>
        </Suspense>
        
        <div className='bg-black flex justify-center items-center flex-1 p-20 max-md:px-8 max-md:py-16'>
            <JobCta />
        </div>
    </div>
  )
}

export default Jobs