"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    const [toggle, setToggle] = useState<Boolean>(false)

  return (
    <div className='bg-[#1B1E28] z-50 w-full '>
        <div className='max-w-[1600px] m-auto flex justify-between items-center pt-2 px-8 max-lg:py-4 max-lg:px-6'>
            <Link href='/browse-jobs?country=United+States&page=1&limit=10' className='items-start flex flex-1 justify-start'>
                <Image src='/logo.png' height={35} width={140} alt='logo image' className='max-lg:hidden'/>
                <Image src='/logo.png' height={35} width={110} alt='logo image' className='lg:hidden'/>
            </Link>
            
            <div className='flex flex-1 justify-center items-center space-x-8 pb-0.5 max-lg:hidden'>
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
                    href="/browse-jobs?country=United+States&page=1&limit=10" 
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

            <a 
                href="https://www.linkedin.com/company/gigs-dot-tech/" 
                className='flex flex-1 items-end justify-end max-lg:hidden'
                target="_blank"
                rel="noopener noreferrer">
                    <Image src='/Linkedin.svg' width={25} height={30} alt='linkedin icon' />
            </a>

            {/* MOBILE SCREEN NAV */}
            <button onClick={() => setToggle(prev => !prev)} className='lg:hidden bg-transparent justify-center items-center flex flex-col z-30 space-y-0.5'>
                <div className={`${toggle && 'bar-1 bg-white'} bg-white w-3.5 h-0.5 my-[3px] transition duration-300 rounded block cursor-pointer`}></div>
                <div className={`${toggle && 'bar-2 bg-white'} bg-white w-[25px] h-0.5 my-[3px] transition duration-300 rounded block cursor-pointer`}></div>
                <div className={`${toggle && 'bar-3 bg-white'} bg-white w-3.5 h-0.5 my-[3px] transition duration-300 rounded block cursor-pointer`}></div>
            </button>

            {toggle && (
                <div className={`py-20 pl-6 fixed top-0 right-0 w-full h-full bg-[#1B1E28] text-white z-20 transform transition-transform duration-300 ease-in-out ${
                    toggle ? 'translate-x-0' : 'translate-x-full'
                }`}>
                    <nav className='flex-col flex justify-start items-start space-y-8 font-normal text-start text-[18px] text-heading'>
                        <Link 
                            onClick={() => setToggle(false)}
                            href="/" 
                            className={`${pathname === "/" 
                                ? "text-primary " 
                                : "hover:text-primary"}
                                `}
                            >
                                Home
                        </Link>
                        <Link 
                            onClick={() => setToggle(false)}
                            href="/browse-jobs?country=United+States&page=1&limit=10" 
                            className={`s${pathname === "/browse-jobs" 
                                ? "text-primary " 
                                : "hover:text-primary"}
                                `}>
                                Browse Jobs
                        </Link>
                        <Link 
                            onClick={() => setToggle(false)}
                            href="/about" 
                            className={`s${pathname === "/about" 
                                ? "text-primary " 
                                : "hover:text-primary"}
                                `}>
                                About
                        </Link>
                        <Link 
                            onClick={() => setToggle(false)}
                            href="/contact" 
                            className={`s${pathname === "/contact" 
                                ? "text-primary " 
                                : "hover:text-primary"}
                                `}>
                                Contact
                        </Link>
                    </nav>

                    <a 
                        href='https://www.linkedin.com/company/gigs-dot-tech/' 
                        className='flex flex-1 items-start justify-start mt-16'
                        target="_blank"
                        rel="noopener noreferrer">
                            <Image src='/Linkedin.svg' width={25} height={30} alt='linkedin icon' />
                    </a>
                </div>
            )}
        </div>
    </div>
  )
}

export default Navbar;