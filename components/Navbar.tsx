"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

  return (
    <div className='bg-[#1B1E28] pt-4 px-8 flex justify-between items-center w-full'>
        <div className='items-start flex flex-1 justify-start'>
            <Image src='/logo.png' height={35} width={140} alt='logo image'/>
        </div>
        
        <div className='flex flex-1 justify-center items-center space-x-8 pb-0.5'>
            <Link 
                href="/" 
                className={`text-[14px] leading-[80px] text-heading ${pathname === "/" 
                    ? "border-b  border-b-primary " 
                    : "hover:text-primary"}
                    `}
                >
                    Home
            </Link>
            <Link 
                href="/browse-jobs" 
                className={`text-[14px] leading-[80px] text-heading ${pathname === "/browse-jobs" 
                    ? "border-b  border-b-primary " 
                    : "hover:text-primary"}
                    `}>
                    Browse Jobs
            </Link>
            <Link 
                href="/about" 
                className={`text-[14px] leading-[80px] text-heading ${pathname === "/about" 
                    ? "border-b  border-b-primary " 
                    : "hover:text-primary"}
                    `}>
                    About
            </Link>
            <Link 
                href="/contact" 
                className={`text-[14px] leading-[80px] text-heading ${pathname === "/contact" 
                    ? "border-b  border-b-primary " 
                    : "hover:text-primary"}
                    `}>
                    Contact
            </Link>
        </div>

        <div className='flex flex-1 items-end justify-end'>
            <Image src='/linkedin.png' width={25} height={30} alt='linkedin icon' />
        </div>
    </div>
  )
}

export default Navbar;