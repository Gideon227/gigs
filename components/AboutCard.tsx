import React from 'react';
import Image from 'next/image';

interface AboutCardProps {
    image: string;
    title: string;
    text: string;
    position: "start" | "end";
    extraStyle?: string
}

const AboutCard = ({ image, title, text, position, extraStyle }: AboutCardProps) => {
  return (
    <div className={`flex flex-col flex-1  space-y-4 ${extraStyle} ${position === "start" ? 'justify-start items-start' : 'justify-end items-end'}`}>
        <Image src={image} width={75} height={40} alt="about us illustration" />
        <h1 className={`text-[#FCFCFC] text-[22px] leading-[31.2px] max-lg:text-[18px] max-md:text-[18px] ${position === "start" ? 'text-start' : 'text-end'}`}>{title}</h1>
        <p className={`text-[16px] leading-[24px] text-[#CACACA] max-md:text-[14px] ${position === "start" ? 'text-start' : 'text-end'}`}>{text}</p>
    </div>
  )
}

export default AboutCard