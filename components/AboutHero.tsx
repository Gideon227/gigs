import React from 'react'
import Image from 'next/image'

const AboutHero = () => {
  return (
    <div className='hero_bg w-full lg:h-[606px] max-lg:h-[350px] flex justify-center'>
        <div className='max-w-[1800px] flex-1 flex items-center justify-center max-md:flex-col'>
          <div className='flex justify-center items-center flex-1 space-x-2 relative md:py-16 max-md:text-center px-12'>
              <Image src='/Group 6.png' alt='Glitters in about page' width={90} height={113} placeholder="blur" className='absolute left-36 2xl:left-48 top-0 max-lg:hidden'/>
              <Image src='/Group 6.png' alt='Glitters in about page' width={50} height={113} placeholder="blur" className='absolute max-md:left-0 max-md:top-10 left-4 top-0 lg:hidden'/>
              <div>
                  <p className='text-[16px] max-sm:text-sm font-medium font-lora leading-[24px] text-[#E3E3E3]'>Get to know who we are and the why</p>
                  <h1 className='text-heading lg:text-[56px] font-semibold lg:leading-[67.2px] max-md:text-[38px] max-lg:leading-[50px] max-lg:text-[45px] text-center'>About Us</h1>
              </div>
              <Image src='/Group 5.png' alt='Glitters in about page' width={100} height={86} placeholder="blur" className='absolute right-40 bottom-0 max-lg:hidden'/>
              <Image src='/Group 5.png' alt='Glitters in about page' width={50} height={86} placeholder="blur" className='absolute max-md:right-5 max-md:bottom-16 right-20 bottom-5 lg:hidden'/>
          </div>
          
          <div className='flex items-end justify-center flex-1 max-md:hidden'>
              <Image src='/about_hero.svg' alt='About us page illustration' placeholder="blur" width={585} height={514}/>
          </div>  
        </div>
        
    </div>
  )
}

export default AboutHero