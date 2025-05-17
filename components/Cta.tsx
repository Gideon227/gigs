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
    <div className='bg-[url(/cta-bg.png)] rounded-xl bg-cover'>
        <div className='py-16 px-20 items-center justify-center flex flex-col space-y-3'>
            <h1 className='text-dark text-[27px] font-semibold line-height-[48px] text-center'>
              {title}
            </h1>

            <p className='text-[15px] font-normal text-center line-height-[27px] text-dark'>
              {text}
            </p>
            
            <Link href={buttonLink} className="flex items-center mt-3 bg-dark px-8 py-3 rounded-md text-[#FCFCFC] text-[16px]font-semibold">
              {button}
            </Link>
        </div>
    </div>
  )
}

export default Cta