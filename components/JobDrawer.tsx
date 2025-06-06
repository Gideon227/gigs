"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { JobProps } from '@/constants/Jobs';
import Image from 'next/image';
import Link from 'next/link';
import useIsMobile from '@/hooks/useIsMobile';

type JobDrawerProps = {
    job: JobProps | null;
    onClose: () => void
}

const JobDrawer: React.FC<JobDrawerProps> = ({ job, onClose }) => {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
        document.body.style.overflow = 'hidden'
        return () => {
          document.body.style.overflow = ''
        }
    }, [])

    if (!job || !hasMounted) return null;


    const isMobile = useIsMobile(); // screens < 768px

    const variants = {
        initial: isMobile ? { y: '100%' } : { x: '100%' },
        animate: isMobile ? { y: '0%' } : { x: '35%' },
        exit: isMobile ? { y: '100%' } : { x: '100%' },
    };

  return (
    <div className='fixed inset-0 z-50 flex w-full'>
        <div
            onClick={onClose}
            className="absolute inset-0 bg-transparent bg-opacity-50 bg-blend-darken"
        />
        
        <motion.div
            // initial={{ x: '100%' }}
            // animate={{ x: '35%' }} // push from 100% to 25% => occupies right 75%
            // exit={{ x: '100%' }}
            // transition={{ type: 'tween', duration: 0.25 }}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'tween', duration: 0.25 }}
            variants={variants}
            className="
            fixed
            bottom-0
            right-0
            w-full
            md:w-3/4 
            h-full
            bg-[#1B1E28] 
            overflow-y-auto
            browse-job_overlay
            p-8
            z-50"
        >
            <div className='flex justify-between w-full items-center py-4 border-b border-[#363636]'>
                <button onClick={onClose} className='cursor-pointer'>
                    <Image src='/arrow-left.svg' width={20} height={20} alt='left facing arrow' />
                </button>

                <Link href='/' className='text-[16px] items-center space-x-2 font-normal text-primary leading-6 flex'>
                    <Image src='/link.svg' width={18} height={18} alt='link icon'/>
                    <p>Open in a new window</p>
                </Link>
            </div>


            <div className='border-b border-[#363636] flex justify-between py-8'>
                <div className='space-y-2.5'>
                    <div className='flex items-center space-x-3'>
                        <Image src={job.image} width={35} height={35} alt='company logo' className='rounded-lg'/>
                        <h2 className='text-heading font-semibold 2xl:text-[22px] max-2xl:text-[18px] '>{job.title}</h2>
                    </div>
                    <div className='flex space-x-2 justify-start items-center'>
                        <div className='flex space-x-1.5'>
                            <Image src='/Building.svg' width={16} height={16} alt='building icon'/>
                            <p className='text-neutral md:text-[16px] max-md:text-[14px] leading-6'>{job.companyName}</p>
                        </div>

                        <span className='inline-block w-1 h-1 bg-[#4F4F4F]'></span>

                        <div className='flex space-x-1.5'>
                            <Image src='/Map Point.svg' width={16} height={16} alt='building icon'/>
                            <p className='text-neutral md:text-[16px] max-md:text-[14px] leading-6'>{job.location}</p>
                        </div>

                        <span className='inline-block w-1 h-1 bg-[#4F4F4F]'></span>

                        <div className='flex space-x-1.5'>
                            <Image src='/clock.svg' width={16} height={16} alt='clock icon'/>
                            <p className='text-neutral md:text-[16px] max-md:text-[14px] leading-6'>{job.datePosted}</p>
                        </div>
                    </div> 
                </div>
                <div className='flex items-center'>
                    <Link href={job.shareLink} className='border-[#363636] border rounded-lg bg-[#151820] p-2'>
                        <Image src='/share.svg' width={20} height={20} alt='share icon' />
                    </Link>
                </div>
            </div>


            <div className='py-8 w-full flex space-x-4 hide-scrollbar overflow-y-auto'>
                <div className='w-3/5 space-y-6'>
                    <div className='space-y-4 text-start'>
                        <h1 className='font-semibold 2xl:text-[20px] max-2xl:text-[18px] text-white leading-[30px]'>About the job</h1>
                        <p className='text-[16px] max-2xl:text-[14px] leading-6 text-paragraph'>{job.description}</p>
                    </div>

                    <div className='text-start'>
                        <h2 className='text-[16px] max-2xl:text-[14px] leading-6 text-white'>Responsibilities</h2>

                    </div>
                                   
                </div>
                <div className='w-2/5'>
                    <div className='bg-[#151820] border border-gray p-6 rounded-2xl space-y-6 text-start'>
                        <div className=''>
                            <h1 className='text-heading text-start 2xl:text-[24px] max-2xl:text-[22px] font-semibold leading-8'>
                                {job.salary}/
                                <span className='text-heading text-[16px] font-normal'>year</span>
                            </h1>
                            <p className='text-neutral text-[16px] leading-6'>Salary range</p>
                        </div>

                        <div className=''>
                            <p className='text-neutral text-sm leading-5 '></p>
                            <div className='flex space-x-2.5 items-center'>
                                <Image src='/location-03.svg' width={20} height={20} alt='building icon'/>
                                <div className='flex flex-col space-y-1'>
                                    <h1 className='2xl:text-[16px] max-2xl:text-[14px] font-lora font-medium text-white leading-6'>{job.location}</h1>
                                    <p className='text-neutral text-[14px] leading-5'>Location</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex space-x-2.5 items-center'>
                            <Image src='/building-2.svg' width={20} height={20} alt='building icon'/>
                            <div className='flex flex-col space-y-1'>
                                <h1 className='2xl:text-[16px] max-2xl:text-[14px] font-lora font-medium text-white leading-6'>{job.jobType}</h1>
                                <p className='text-neutral text-[14px] leading-5'>Job-type</p>
                            </div>
                        </div>

                        <div className='flex space-x-2.5 items-center'>
                            <Image src='/work-update.svg' width={20} height={20} alt='building icon'/>
                            <div className='flex flex-col space-y-1'>
                                <h1 className='2xl:text-[16px] max-2xl:text-[14px] font-lora font-medium text-white leading-6'>{job.jobType}</h1>
                                <p className='text-neutral text-[14px] leading-5'>Work Settings</p>
                            </div>
                        </div>

                        <div className='flex space-x-2.5 items-center'>
                            <Image src='/mentoring.svg' width={20} height={20} alt='building icon'/>
                            <div className='flex flex-col space-y-1'>
                                <h1 className='2xl:text-[16px] max-2xl:text-[14px] font-lora font-medium text-white leading-6'>{job.jobType}</h1>
                                <p className='text-neutral text-[14px] leading-5'>Role Category</p>
                            </div>
                        </div>
                        
                        <div className='space-y-4 flex flex-col items-center'>
                            <Link href='/' className='bg-primary py-3 px-16 w-full text-center rounded-lg font-semibold text-dark text-[16px]'>Apply for Job</Link>
                            <button className='flex items-center space-x-2'>
                                <Image src='/Bookmark.svg' width={24} height={24} alt='Bookmark icon' />
                                <h2 className='text-primary text-[16px] font-semibold leading-6'>Save job for later</h2>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
  )
}

export default JobDrawer