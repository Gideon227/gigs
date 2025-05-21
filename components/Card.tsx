import React, { JSX } from 'react'
import Image from 'next/image';

interface CardProps {
    title: JSX.Element;
    text: JSX.Element; 
    image: string; // '/'
    width: number;
    mobileWidth?: number;
    imageHeight: number;
    image2?: string; // '/'
    width2?: number
    height2?: number
    style2?: string
    extraImage?: boolean; // true
    background: string; //bg-blue
    height: string; //h-[440px]
    extraStyles?: string;
}

const Card = ({ title, text, image, width, mobileWidth, imageHeight, image2, width2, height2, style2, extraImage = false, background, height, extraStyles }: CardProps) => {
  return (
    <div className={`rounded-[16px] py-8 lg:pl-8 lg:min-w-[600px] relative ${height} space-y-4 ${background} ${extraStyles} max-lg:w-[365px] max-lg:pl-4 max-lg:py-6 max-lg:space-y-2 max-lg:justify-self-center`}>
        <h1 className='font-semibold text-[#FCFCFC] text-[26px] leading-[31.2px] max-lg:text-[21px]'>{title}</h1>
        <p className='text-[14px] text-[#CACACA] leading-[24px] lg:w-2/3 items-start max-lg:leading-[21px] break-words max-lg:pr-[85px]'>{text}</p>

        <div className='absolute bottom-0 right-0 z-10'>
            {extraImage && (<Image src={image2!} alt='image' width={width2} height={height2}  className={style2}/>)}
            <Image src={image} alt='image' width={width} height={imageHeight} className='max-lg:hidden rounded-br-2xl'/>
            <Image src={image} alt='image' width={mobileWidth || 90} height={imageHeight} className='lg:hidden rounded-br-2xl' />

        </div>
    </div>
  )
}

export default Card