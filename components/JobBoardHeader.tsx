"use client"
import React, { useState, useEffect, ReactEventHandler } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import JobSidebar from './JobSidebar'

interface Props{
    page: number;
    setPage: (value: any) => void
}

const JobBoardHeader = ({ page, setPage }: Props) => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [keyword, setKeyword] = useState("")
    const [location, setLocation] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());

    useEffect(() => {
        if (openModal) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      
        return () => {
          document.body.style.overflow = '';
        };
    }, [openModal]);

    const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true)
        const params = new URLSearchParams(searchParams.toString())

        if (keyword.trim()) params.set("keyword", keyword.trim());
        else params.delete("keyword");

        if (location.trim()) params.set("location", location.trim());
        else params.delete("location");

        params.set("page", "1"); 
        setPage(1);

        router.push(`/browse-jobs?${params.toString()}`, { scroll: false });
        setLoading(false)
    }

  return (
    <div className='space-y-2 border-b border-[#363636] pb-3'>
        <form onSubmit={handleClick} className='flex max-md:flex-col max-md:space-y-2 space-x-0 my-2 md:px-10 max-md:px-4'>
            <div className='w-full border-[#363636] border bg-[#101217] py-1 max-md:py-3 md:rounded-s-lg max-md:rounded-lg flex justify-center items-center space-x-2'>
                <Image src='/Rounded Magnifer.svg' width={20} height={20} alt='Search icon' className='ml-4' />
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search job title or keyword..."
                    className="bg-transparent outline-none text-[#808080] 2xl:text-[16px] max-2xl:text-[14px] leading-[24px] w-full placeholder-[#7E7E7E]"
                />
            </div>

            <div className='w-full border-[#363636] border bg-[#101217] py-1 md:rounded-e-lg max-md:rounded-lg flex justify-center items-center space-x-2'>
                <input
                    type="text"
                    value={location || "USA"}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter city, state, zip, or country"
                    className="bg-transparent outline-none text-[#808080] 2xl:text-[16px] max-2xl:text-[14px] leading-[24px] w-2/3 ml-4 placeholder-[#7E7E7E]"
                />
                <button 
                    type="submit"
                    disabled={loading}
                    className='bg-primary leading-6 w-1/3 text-nowrap rounded-lg py-2 px-4 font-semibold 2xl:text-[16px] max-2xl:text-[14px] max-sm:text-[12px] text-dark cursor-pointer'>
                        Find Jobs
                </button>
            </div>
        </form>

        <button 
            disabled={loading}
            onClick={() => setOpenModal(true)} 
            className='text-[16px] px-6 lg:hidden text-primary font-normal text-start py-2 cursor-pointer'>
                Advanced search
        </button>

        <AnimatePresence>
            {openModal && (
                <motion.div 
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '100%', opacity: 0 }}
                    transition={{ type: 'tween', duration: 0.25 }}
                    onClick={() => setOpenModal(false)}
                    className='fixed inset-0 pointer-events-auto overflow-hidden w-full flex z-40 h-screen'
                >
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto"
                        onClick={() => setOpenModal(false)}
                    />

                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: '25%' }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'tween', duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                        className='rounded-t-2xl overflow-x-hidden z-50 px-4 w-[-webkit-fill-available]'
                    >
                        <JobSidebar page={page} setPage={setPage}/>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  )
}

export default JobBoardHeader