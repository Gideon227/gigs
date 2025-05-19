import React,{ JSX } from 'react';
import Link from 'next/link';

interface CtaProps{
  title: JSX.Element;
  text: JSX.Element;
  button: string;
  buttonLink: string;
}

const Cta = ({ title, text, button, buttonLink }: CtaProps) => {
  return (
    <div className='bg-[url(/cta-bg.png)] rounded-xl bg-cover max-md:bg-center'>
        <div className='py-16 px-20 items-center justify-center flex flex-col space-y-3 max-md:px-6 max-md:py-12'>
            <h1 className='text-dark text-[27px] font-semibold leading-[48px] text-center max-md:text-[21px] max-md:leading-[28px]'>
              {title}
            </h1>

            <p className='text-[15px] font-normal text-center leading-[27px] text-dark max-md:text-[13px] max-md: max-md:leading-[21px]'>
              {text}
            </p>
            
            <Link href={buttonLink} className="flex items-center mt-3 bg-dark px-8 py-3 rounded-md text-[#FCFCFC] text-[16px] font-semibold max-md:px-6 max-md:py-2 max-md:text-[14px]">
              {button}
            </Link>
        </div>
    </div>
  )
}

export default Cta