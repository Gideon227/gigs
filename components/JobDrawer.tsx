"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { JobProps } from '@/constants/Jobs';
import Image from 'next/image';
import Link from 'next/link';
import useIsMobile from '@/hooks/useIsMobile'
import { getRelatedJobs } from '@/libs/getRelatedJobs';
import { formatNumber } from '@/utils/formatNumber';
import { Country, State } from 'country-state-city';

import { RxCross2 } from "react-icons/rx";
import { URL } from 'url';
import ShareModal from './ShareModal';
import JobBoard from './JobBoard';
import { PiShareNetworkFill } from "react-icons/pi";

type JobDrawerProps = {
    job: JobProps | null;
    onClose: () => void
}

const JobDrawer: React.FC<JobDrawerProps> = ({ job, onClose }) => {
    const isMobile = useIsMobile(); // screens < 768px
    const [hasMounted, setHasMounted] = useState(false);
    const [loading, setLoading] = useState(false)
    const [relatedJobs, setRelatedJobs] = useState([])
    const [openShareModal, setOpenShareModal] = useState<JobProps | null>(null)

    useEffect(() => {
        setHasMounted(true);
        document.body.style.overflow = 'hidden'
        return () => {
          document.body.style.overflow = ''
        }
    }, [])

    useEffect(() => {
        const fetchRelatedJobs = async () => {
            setLoading(true); 
            try {
                const data = await getRelatedJobs(job!.id)
                setRelatedJobs(data.data); 
            } catch (error: any) {
                console.error(error.message)
                setRelatedJobs([])
            } finally {
                setLoading(false);
            } 
        }
        
        fetchRelatedJobs()
    }, [])

    const timeAgo = React.useMemo(() => {
        if (!job?.postedDate) return '';
        
        const postedDate = new Date(job.postedDate.replace(' ', 'T'));
        const now = new Date();
        const diffMs = now.getTime() - postedDate.getTime();
      
        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
      
        if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
        return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    }, [job?.postedDate]);  
    
    const stateAbbr = React.useMemo(() => {
        if (!job?.country || !job?.state) return null;
        const normalize = (str: string) => typeof str === 'string' && str.trim().toLowerCase();

        const country = Country.getAllCountries().find(
            c => normalize(c.name) === normalize(job.country)
        );
        if (!country) return null;

        const states = State.getStatesOfCountry(country.isoCode);
        if (!states?.length) return null;

        let found = states.find(s => normalize(s.name) === normalize(job.state));

        if (!found) {
            found = states.find(s => normalize(s.isoCode) === normalize(job.state));
        }

        return found?.isoCode || null;
    }, [job?.country, job?.state]);

    if (!hasMounted) return null;

    if (!job) {
        return (
          <motion.div className="flex items-center justify-center">
            <div className="p-6 text-lg">This Job is no longer available</div>
          </motion.div>
        );
    }

    const getJobTypeText = (jobType: string): string => {
        switch (jobType?.toLowerCase()) {
          case 'gigswork':
            return 'Gigs-work';
          case 'fulltime':
            return 'Full-time';
          case 'contracttohire':
            return 'Contract to Hire';
          case 'parttime':
            return 'Part-time';
          case 'tempcontract':
            return 'Temp Contract';
          default:
            return '';
        }
    };

    const getWorkSettingsText = (workSettings: string): string => {
        switch (workSettings.toLowerCase()) {
          case 'onsite':
            return 'On-Site';
          case 'remote':
            return 'Remote';
          default:
            return workSettings;
        }
    };

    const variants = {
        initial: isMobile ? { y: '100%' } : { x: '100%' },
        animate: isMobile ? { y: '0%' } : { x: '0%' },
        exit: isMobile ? { y: '100%' } : { x: '100%' },
    };

  return (
    <div className='fixed inset-0 z-50 flex w-full'>
        <div
            onClick={onClose}
            className="flex-1 overflow-hidden bg-black/60 backdrop-blur-sm pointer-events-auto"
        />
        
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'tween', duration: 0.25 }}
            variants={variants}
            className="
            fixed
            bottom-0
            md:right-2
            right-0
            w-full
            md:w-3/4 
            h-full
            lg:rounded-t-3xl
            bg-[#1B1E28] 
            browse-job_overlay
            z-50"
        >   
            <div className='py-5 px-4 border-b-[#363636] border-b md:hidden flex justify-end items-center overflow-hidden'>
                <button onClick={onClose}>
                    <RxCross2 size={24} color='#fff'/>
                </button>
            </div>
            <div className='overflow-y-auto p-6 max-sm:p-5 h-full'>
                <div className='max-md:hidden flex justify-between w-full items-center py-4 border-b border-[#363636]'>
                    <button onClick={onClose} className='cursor-pointer'>
                        <Image src='/arrow-left.svg' width={20} height={20} alt='left facing arrow' />
                    </button>

                    <Link target="_blank" href={job.applicationUrl} className='text-[16px] items-center space-x-2 font-normal text-primary leading-6 flex'>
                        <Image src='/link.svg' width={18} height={18} alt='link icon'/>
                        <p>Open in a new window</p>
                    </Link>
                </div>


                <div className='border-b border-[#363636] flex max-sm:flex-col justify-between md:py-8 max-md:py-4'>
                    <div className='space-y-2.5'>
                        <div className='flex items-center space-x-3'>
                            <img src={job.companyLogo ? job.companyLogo : "/symbol.png"} alt='company logo' className={`w-12 h-12 rounded-full p-2 object-contain bg-[#777777]`}/>
                            <h2 className='text-heading font-semibold 2xl:text-[22px] max-2xl:text-[20px] max-ms:text-[18px]'>{job.title}</h2>
                        </div>
                        <div className='flex space-x-2 justify-start items-center max-sm:flex-col max-sm:space-y-1.5 max-sm:items-start'>
                            <div className='flex items-center'>
                                <span className='sm:hidden inline-block rounded-full w-1 mx-2 h-1 bg-[#4F4F4F]'></span>
                                <div className='flex space-x-1.5'>
                                    <Image src='/Building.svg' width={16} height={16} alt='building icon'/>
                                    <p className='text-neutral md:text-[16px] max-md:text-[14px] leading-6'>{job.companyName ? job.companyName.charAt(0).toUpperCase() + job.companyName.slice(1): "Company Name"}</p>
                                </div>
                            </div>

                            <div className='flex items-center'>
                                <span className='inline-block rounded-full w-1 mx-2 h-1 bg-[#4F4F4F]'></span>
                                <div className='flex space-x-1.5'>
                                    <Image src='/Map Point.svg' width={16} height={16} alt='building icon'/>
                                    <p className='text-neutral md:text-[16px] max-md:text-[14px] leading-6'>{`${job.city} ${job.state && `, ${stateAbbr}`}`} {!job.city && !job.state && job.country}</p>
                                </div>
                            </div>

                            <div className='flex items-center'>
                                <span className='inline-block rounded-full w-1 mx-2 h-1 bg-[#4F4F4F]'></span>
                                <div className='flex space-x-1.5'>
                                    <Image src='/clock.svg' width={16} height={16} alt='clock icon'/>
                                    <p className='text-neutral md:text-[16px] max-md:text-[14px] leading-6'>Posted {timeAgo} ago</p>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className='flex items-center max-sm:justify-end'>
                        <button onClick={() => setOpenShareModal(job)} className='border-[#363636] border rounded-lg bg-[#151820] p-2'>
                            <Image src='/share.svg' width={20} height={20} alt='share icon' />
                        </button>
                    </div>

                    {openShareModal && (
                        <ShareModal
                            job={openShareModal}
                            onClose={() => {
                            setOpenShareModal(null);
                        }}
                        />
                    )}
                </div>


                <div className='py-8 w-full flex max-md:flex-col max-md:space-y-4 space-x-4 hide-scrollbar overflow-y-auto pb-24'>
                    <div className='md:w-3/5 max-md:w-full space-y-6'>
                        <div className='space-y-4 text-start'>
                            <h1 className='font-semibold 2xl:text-[20px] max-2xl:text-[18px] text-white leading-[30px]'>About the job</h1>
                            <p className='2xl:text-[18px] max-2xl:text-[16px] max-sm:text-sm leading-6 text-paragraph'>{job.description}</p>
                        </div>

                        {job.responsibilities.length > 0 && <div className='text-start space-y-4'>
                            <h2 className='text-[20px] max-2xl:text-[18px] font-medium leading-6 text-white'>Responsibilities</h2>
                            <ul className='flex flex-col space-y-2 list-disc pl-4'>
                                {job.responsibilities.map((item, index) => (
                                    <li key={index} className='2xl:text-[18px] max-2xl:text-[16px] max-sm:text-sm leading-6 text-paragraph text-start'>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className='text-[16px] font-light text-paragraph text-nowrap px-4'></p>
                        </div>}

                        {job.qualifications.length > 0 && <div className='text-start space-y-4'>
                            <h2 className='text-[20px] max-2xl:text-[18px] font-medium leading-6 text-white'>Qualifications</h2>
                            <ul className='flex flex-col space-y-2 list-disc pl-4'>
                                {job.qualifications.map((item, index) => (
                                    <li key={index} className='2xl:text-[18px] max-2xl:text-[16px] max-sm:text-sm leading-6 text-paragraph text-start'>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className='text-[16px] font-light text-paragraph text-nowrap px-4'></p>
                        </div>}
                                    
                    </div>
                    <div className='md:w-2/5 max-md:w-full'>
                        <div className='bg-[#151820] border border-gray p-6 rounded-2xl space-y-6 text-start'>
                            <div className=''>
                                <h1 className='text-heading text-start 2xl:text-[24px] max-2xl:text-[22px] max-sm:text-[18px] font-semibold leading-8'>
                                    {formatNumber(job.salary) || "Salary not specified"} 
                                </h1>
                                <p className='text-neutral text-[16px] max-sm:text-sm leading-6'>Salary range</p>
                            </div>

                            <div className='space-y-6 text-start max-md:grid max-md:grid-cols-2 max-sm:grid-cols-1 max-md:justify-between'>
                                <div className='flex space-x-2.5 items-center'>
                                    <Image src='/location-03.svg' width={20} height={20} alt='building icon'/>
                                    <div className='flex flex-col'>
                                        <h1 className='2xl:text-[16px] max-2xl:text-[14px] text-white leading-6'>{`${job.city}, ${job.state && stateAbbr}`} {!job.city && !job.state && job.country}</h1>
                                        <p className='text-neutral text-[14px] leading-5'>Location</p>
                                    </div>
                                </div>

                                <div className='flex space-x-2.5 items-center'>
                                    <Image src='/building-2.svg' width={20} height={20} alt='building icon'/>
                                    <div className='flex flex-col'>
                                        <h1 className='2xl:text-[16px] max-2xl:text-[14px] text-white leading-6'>{job && getJobTypeText(job.jobType) || "Job Type not specified"}</h1>
                                        <p className='text-neutral text-[14px] leading-5'>Job Type</p>
                                    </div>
                                </div>

                                <div className='flex space-x-2.5 items-center'>
                                    <Image src='/work-update.svg' width={20} height={20} alt='building icon'/>
                                    <div className='flex flex-col'>
                                        <h1 className='2xl:text-[16px] max-2xl:text-[14px] text-white leading-6'>{getWorkSettingsText(job.workSettings).charAt(0).toUpperCase() + getWorkSettingsText(job.workSettings).slice(1) || "On site"}</h1>
                                        <p className='text-neutral text-[14px] leading-5'>Work Setting</p>
                                    </div>
                                </div>

                                <div className='flex space-x-2.5 items-center'>
                                    <Image src='/mentoring.svg' width={20} height={20} alt='building icon'/>
                                    <div className='flex flex-col'>
                                        <h1 className='2xl:text-[16px] max-2xl:text-[14px] text-white leading-6'>{job.roleCategory.charAt(0).toUpperCase() + job.roleCategory.slice(1)}</h1>
                                        <p className='text-neutral text-[14px] leading-5'>Role Category</p>
                                    </div>
                                </div>
                            </div>

                            
                            <div className='space-y-4 flex flex-col items-center'>
                            {job.applicationUrl && (<Link target="_blank" href={job.applicationUrl} className='bg-primary py-3 sm:px-16  max-sm:px-4 text-nowrap w-full text-center rounded-lg font-semibold text-dark text-[16px] max-md:text-[14px]'>Apply for Job</Link>)}
                                <button onClick={() => setOpenShareModal(job)} className='flex items-center space-x-2'>
                                    {/* <Image src='/Bookmark.svg' width={24} height={24} alt='Bookmark icon' className='max-md:w-4'/> */}
                                    <span className='text-primary max-md:w-4'><PiShareNetworkFill size={24}/></span>
                                    <h2 className='text-primary text-[16px] max-md:text-[14px] text-nowrap font-semibold leading-6'>Share Job</h2>
                                </button>
                            </div>
                        </div>

                        <div className='flex flex-col justify-start items-start'>
                            <h1 className='text-white font-semibold text-[20px] max-sm:text-[16px] leading-[30px] pt-8'>Related Jobs</h1>
                    
                            {relatedJobs.length > 0 ? (
                                relatedJobs.map((relatedJob: JobProps, index) => (
                                    <Link target="_blank" href={`/browse-jobs/${relatedJob.id}`} className={`flex flex-col space-y-1.5 py-6 w-full cursor-pointer ${index !== relatedJobs.length - 1 ? 'border-b border-[#4F4F4F]' : ""}`} key={index}>
                                        <h1 className='font-semibold 2xl:text-[20px] max-2xl:text-[18px] max-sm:text-[16px] leading-7 text-heading'>{relatedJob.title}</h1>
                                        <p className='text-paragraph text-[18px] max-sm:text-sm leading-6 max-2xl:text-[16px]'>{`At ${ relatedJob && relatedJob.companyName!.charAt(0).toUpperCase() + relatedJob.companyName!.slice(1)}`}</p>
                                    </Link>
                                ))
                            ): (
                                <h1 className='text-paragraph text-[21px] max-2xl:text-[16px]'>No Related Job Found</h1>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    </div>
  )
}

export default JobDrawer