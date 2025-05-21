import React from 'react'
import Image from 'next/image'

const Jobs = () => {
  return (
    <div className='bg-[#101217] md:px-16 max-md:px-4 py-8'>
        <div className='hero_bg w-full lg:h-[606px] flex-1 flex items-center justify-center max-lg:h-[350px] max-md:flex-col lg:px-20 max-lg:px-8 max-sm:px-4 lg:space-x-10 max-lg:space-x-4 max-sm:space-x-0 rounded-xl'>
            <div className='md:w-2/3 space-y-2 max-lg:space-y-3 lg:pr-6'>
                <div className='flex space-x-1 items-center'>
                    <p className='text-sm leading-[24px] text-[#E3E3E3]'>Welcome to Gigs.Tech</p>
                    <Image src='/waving.png' alt='waving emoji' width={28} height={28} className='flex items-center -mt-1 max-md:hidden'/>
                    <Image src='/waving.png' alt='waving emoji' width={18} height={18} className='flex items-center -mt-1 md:hidden'/>
                </div>

                <h1 className='font-semibold text-[40px] lg:leading-[60px] text-heading max-lg:text-[27px] max-lg:leading-[32px] max-sm:text-[21px] max-sm:leading-7'>Power Platform & Dynamics <br /> 365 jobs all in one place.</h1>
                
                <p className='text-heading text-[16px] leading-[27px] max-lg:leading-[25px] max-lg:text-[15px] max-sm:text-[14px]'>Gigs.Tech is a hyper-focused job aggregation platform built from the ground up to serve one mission: Help Microsoft job seekers discover the freshest roles, and help recruiters connect with qualified candidates — faster and smarter. </p>
            </div>
            <div className='md:w-1/3 flex items-end justify-center flex-1 max-md:hidden'>
                <Image src='/browse-jobs_hero.png' alt='About us page illustration' width={585} height={514}/>
            </div>  
        </div>
        
    </div>
  )
}

export default Jobs