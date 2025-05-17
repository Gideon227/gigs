import React, { JSX } from 'react'
import Image from 'next/image';

interface CardProps {
    title: JSX.Element;
    text: JSX.Element; 
    image: string; // '/'
    width: number;
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

const Card = ({ title, text, image, width, imageHeight, image2, width2, height2, style2, extraImage = false, background, height, extraStyles }: CardProps) => {
  return (
    <div className={`rounded-[16px] py-8 pl-8 min-w-[600px] relative ${height} space-y-4 ${background} ${extraStyles}`}>
        <h1 className='font-semibold text-[#FCFCFC] text-[26px] leading-[31.2px]'>{title}</h1>
        <p className='text-[14px] text-[#CACACA] leading-[24px] w-2/3 items-start'>{text}</p>

        <div className='absolute bottom-0 right-0 z-10'>
            {extraImage && (<Image src={image2!} alt='image' width={width2} height={height2}  className={style2}/>)}
            <Image src={image} alt='image' width={width} height={imageHeight} />
        </div>
    </div>
  )
}

export default Card