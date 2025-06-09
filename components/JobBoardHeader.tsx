"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import JobSidebar from './JobSidebar'

const JobBoardHeader = () => {
    const [openModal, setOpenModal] = useState<boolean>(false)
  return (
    <div className='space-y-2 border-b border-[#363636] pb-3'>
        <div className='flex max-md:flex-col max-md:space-y-2 space-x-0 my-2 md:px-10 max-md:px-4'>
            <div className='w-full border-[#363636] border bg-[#101217] py-1 max-md:py-3 md:rounded-s-lg max-md:rounded-lg flex justify-center items-center space-x-2'>
                <Image src='/Rounded Magnifer.svg' width={20} height={20} alt='Search icon' className='ml-4' />
                <input
                    type="text"
                    placeholder="Search job title or keyword..."
                    className="bg-transparent outline-none text-[#808080] 2xl:text-[16px] max-2xl:text-[14px] leading-[24px] w-full placeholder-[#7E7E7E]"
                />
            </div>

            <div className='w-full border-[#363636] border bg-[#101217] py-1 md:rounded-e-lg max-md:rounded-lg flex justify-center items-center space-x-2'>
                <input
                    type="text"
                    placeholder="Enter city, state, zip, or country"
                    className="bg-transparent outline-none text-[#808080] 2xl:text-[16px] max-2xl:text-[14px] leading-[24px] w-full ml-4 placeholder-[#7E7E7E]"
                />
                <button className='bg-primary leading-6 text-nowrap rounded-lg py-2 px-4 font-semibold 2xl:text-[16px] max-2xl:text-[14px] max-sm:text-[12px] text-dark'>Find Jobs</button>
            </div>
        </div>

        <button onClick={() => setOpenModal(true)} className='text-[16px] px-6 lg:hidden text-primary font-normal text-start py-2'>Advanced search</button>

        <AnimatePresence>
            {openModal && (
                <motion.div 
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '100%', opacity: 0 }}
                    transition={{ type: 'tween', duration: 0.25 }}
                    onClick={() => setOpenModal(false)}
                    className='bg-[#181818] fixed bottom-0 top-0 right-0 left-0 w-full flex z-40 h-screen'
                >
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: '40%' }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'tween', duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                            className='rounded-t-2xl overflow-y-auto overflow-x-hidden z-50 px-4 py-8 min-h-[400px] w-[-webkit-fill-available]'
                        >
                            <JobSidebar />
                        </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  )
}

export default JobBoardHeader