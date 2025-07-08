"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { JobProps } from '@/constants/Jobs';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatNumber } from '@/utils/formatNumber';

const getJobTypeColor = (jobType: string): string => {
    switch (jobType.toLowerCase()) {
      case 'gigswork':
        return 'bg-[#008080]';
      case 'fulltime':
        return 'bg-[#CC007A]';
      case 'contracttohire':
        return 'bg-[#4D4DFF]';
      case 'parttime':
        return 'bg-[#009900]';
      case 'tempcontract':
        return 'bg-[#A52A2A]';
      default:
        return 'bg-[#CC007A]';
    }
};

const getJobTypeText = (jobType: string): string => {
    switch (jobType.toLowerCase()) {
      case 'gigswork':
        return 'Gigs-work';
      case 'fulltime':
        return 'Full-time';
      case 'contracttohire':
        return 'Contract to hire';
      case 'parttime':
        return 'Part-time';
      case 'tempcontract':
        return 'Temp contract';
      default:
        return '';
    }
};
  
interface JobCardProps {
    job: JobProps;
    hasBorder?: boolean;
    onClick: (job: JobProps) => void;
    setOpenShareModal: any
}

function truncateText(text: string, wordLimit: number) {
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
}

const JobCard = ({ job, hasBorder, onClick, setOpenShareModal }: JobCardProps) => {
  const { title, description, location, country, state, city, jobType, salary, skills, applicationUrl, companyLogo, companyName, createdAt } = job

  function getTimeAgo(dateString: string): string {
    const createdDate = new Date(dateString.replace(" ", "T"));
    const now = new Date();
    const diffMs = now.getTime() - createdDate.getTime();
  
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    return `${seconds} second${seconds !== 1 ? "s" : ""}`;
  }
  
  // Usage:
  const timeAgo = getTimeAgo(createdAt); 
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleSkillClick = (value: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("skills", value);
    } else {
      params.delete("skills");
    }
    router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
};

  return (
    <div className={`w-full pt-6 pb-8 space-y-5 ${hasBorder && 'border-b border-[#363636]'}`}>
        <div onClick={() => onClick(job)} className='flex items-start justify-between w-full'>
            <div className='flex space-x-4 justify-start items-start'>
                <img src={companyLogo ? companyLogo : "/symbol.png"} alt='company logo' className={`w-12 h-12 rounded-full p-2 object-contain ${companyLogo ? "bg-white" : "bg-transparent"}`} />
                
                <div className='flex flex-col justify-between items-start'>
                  <div className='flex justify-baseline items-start space-x-4'>
                    <h1 className='text-[20px] max-md:text-[16px] leading-[27px] max-md:leading-6 font-semibold flex flex-wrap items-start flex-1 text-start text-heading md:max-w-4/5'>{title}</h1>
                    <span className={`max-sm:hidden rounded-full py-1 px-4 flex items-center ${getJobTypeColor(jobType)}`}>
                      <p className='text-heading font-normal 2xl:text-[14px] max-2xl:text-[12px] text-nowrap'>{getJobTypeText(jobType)}</p>
                    </span>
                  </div>
                  <div className='flex space-x-2 justify-start items-center flex-wrap pt-1 gap-y-0.5'>
                    <div className='flex space-x-1.5'>
                      <Image src='/Building.svg' width={16} height={16} alt='building icon'/>
                      <p className='text-neutral md:text-[16px] max-md:text-[14px] leading-6'>{companyName ? companyName.charAt(0).toUpperCase() + companyName.slice(1): "Company Name"}</p>
                    </div>

                    <span className='inline-block w-1 h-1 bg-[#4F4F4F] rounded-full'></span>

                    <div className='flex space-x-1.5'>
                      <Image src='/Map Point.svg' width={16} height={16} alt='building icon'/>
                      <p className='text-neutral md:text-[16px] max-md:text-[14px] leading-6'>{`${country}, ${state}` }</p>
                    </div>
                  </div>
                </div>
            </div>

            <div className='flex text-end flex-col justify-between max-sm:hidden'>
               {salary && salary !== "" && salary !== 'NA' ? (
                  <h1 className="text-heading text-nowrap text-end 2xl:text-[24px] max-2xl:text-[22px] max-sm:text-[16px] font-semibold leading-8">
                    {formatNumber(salary)}
                  </h1>
                ) : null}
               <p className='text-neutral md:text-[16px] max-md:text-[14px] font-normal text-end'>Posted {timeAgo} ago</p>
            </div>
        </div>

        <div className={`sm:hidden rounded-full py-1 px-4 items-center inline-block ${getJobTypeColor(jobType)}`}>
            <p className='text-heading font-normal 2xl:text-[14px] max-2xl:text-[12px]'>{getJobTypeText(jobType)}</p>
        </div>

        <div onClick={() => onClick(job)} className='sm:w-4/5 items-start flex'>
            <p className='text-paragraph md:text-[16px] max-md:text-[14px] leading-6 text-start'>
                {truncateText(description, 28)}
            </p>
        </div>

        <div className="flex justify-between sm:hidden items-start">
          {salary && salary !== "" ? (
            <h1 className="text-heading text-start text-[14px] font-semibold leading-6">
              {formatNumber(salary)}
            </h1>
          ) : null}
          
          <p className="text-neutral text-[12px] font-normal text-end leading-6">
            Posted {timeAgo} ago
          </p>
        </div>

        <div className='flex justify-between items-center w-full flex-1'>
           <div className='gap-2 flex flex-wrap w-9/10'>
            {skills && skills.slice(0, 10).map((skill: string) => (
                <button onClick={() => handleSkillClick(skill)} className='rounded-full border-neutral border py-0.5 px-4 cursor-pointer' key={skill}>
                    <p className='text-heading items-center flex 2xl:text-[16px] max-2xl:text-[14px] leading-[21px]'>{skill}</p>
                </button>
            ))}
            {skills.length > 10 && <span className='text-neutral-500'>...</span>}
           </div>

           <button onClick={() => setOpenShareModal(job)} className='cursor-pointer'>
              <Image src='/share.svg' width={20} height={20} alt='share icon'/>
           </button>
        </div>
    </div>
  )
}

export default JobCard