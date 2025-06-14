import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { JobProps } from '@/constants/Jobs';

const getJobTypeColor = (jobType: string): string => {
    switch (jobType.toLowerCase()) {
      case 'gig-work':
        return 'bg-[#008080]';
      case 'full-time':
        return 'bg-[#CC007A]';
      case 'contract to hire':
        return 'bg-[#4D4DFF]';
      case 'part-time':
        return 'bg-[#009900]';
      case 'temp contract':
        return 'bg-[#A52A2A]';
      default:
        return 'bg-[#CC007A]';
    }
};
  
interface JobCardProps {
    job: JobProps;
    hasBorder?: boolean;
    onClick: (job: JobProps) => void;
}

function truncateText(text: string, wordLimit: number) {
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  }

const JobCard = ({ job, hasBorder, onClick }: JobCardProps) => {
  const { title, description, location, country, state, city, jobType, salary, skills, applicationUrl, companyLogo, createdAt } = job
  
  const formattedCreatedDate = new Date(createdAt.replace(" ", "T")).toLocaleString();

  return (
    <div 
        onClick={() => onClick(job)} 
        className={`w-full pt-6 pb-8 space-y-5 ${hasBorder && 'border-b border-[#363636]'}`}>
        <div className='flex items-start justify-between w-full'>
            <div className='flex space-x-2 justify-start items-end'>
                {companyLogo && <Image src={companyLogo!} height={45} width={45} alt='company&apos;s logo' className='rounded-lg'/>}
                
                <div className='flex flex-col justify-between items-start'>
                    <div className='flex space-x-4'>
                        <h1 className='2xl:text-[20px] max-2xl:text-[19px] max-md:text-[16px] leading-[27px] font-semibold text-start text-heading'>{title}</h1>
                        <span className={`max-sm:hidden rounded-full py-0 px-4 flex items-center ${getJobTypeColor(jobType)}`}>
                            <p className='text-heading font-normal 2xl:text-[14px] max-2xl:text-[12px]'>{jobType}</p>
                        </span>
                    </div>
                    <div className='flex space-x-2 justify-start items-center'>
                        <div className='flex space-x-1.5'>
                            <Image src='/Building.svg' width={16} height={16} alt='building icon'/>
                            <p className='text-neutral md:text-[16px] max-md:text-[14px] leading-6'>Company Name</p>
                        </div>

                        <span className='inline-block w-1 h-1 bg-[#4F4F4F]'></span>

                        <div className='flex space-x-1.5'>
                            <Image src='/Map Point.svg' width={16} height={16} alt='building icon'/>
                            <p className='text-neutral md:text-[16px] max-md:text-[14px] leading-6'>{location}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex text-end flex-col justify-between max-sm:hidden'>
               {salary && (
                 <h1 className='text-heading text-end 2xl:text-[24px] max-2xl:text-[22px] max-sm:text-[16px] font-semibold leading-8'>
                    {salary}/
                    <span className='text-heading text-[16px] font-normal'>year</span>
                 </h1>
               )}
               <p className='text-neutral md:text-[16px] max-md:text-[14px] font-normal text-end'>{formattedCreatedDate}</p>
            </div>
        </div>

        <div className={`sm:hidden rounded-full py-1 px-4 items-center inline-block ${getJobTypeColor(jobType)}`}>
            <p className='text-heading font-normal 2xl:text-[14px] max-2xl:text-[12px]'>{jobType}</p>
        </div>

        <div className='sm:w-4/5 items-start flex'>
            <p className='text-paragraph md:text-[16px] max-md:text-[14px] leading-6 text-start'>
                {truncateText(description, 28)}
            </p>
        </div>

        <div className='flex text-end items-center justify-between sm:hidden'>
           {salary && (
             <h1 className='text-heading text-end 2xl:text-[24px] max-2xl:text-[22px] max-sm:text-[16px] font-semibold leading-8'>
                {salary}/
                <span className='text-heading text-[16px] font-normal'>year</span>
             </h1>
           )}
            <p className='text-neutral md:text-[16px] max-md:text-[14px] font-normal text-end'>{formattedCreatedDate}</p>
        </div>

        <div className='flex justify-between items-center w-full flex-1'>
           <div className='gap-2 flex flex-wrap'>
            {skills.map((skill: string) => (
                <div className='rounded-full border-neutral border py-0.5 px-4' key={skill}>
                    <p className='text-heading 2xl:text-[14px] max-2xl:text-[12px] leading-[21px]'>{skill}</p>
                </div>
            ))}
           </div>

           <Link href={applicationUrl}>
                <Image src='/share.svg' width={20} height={20} alt='share icon'/>
           </Link>
        </div>
    </div>
  )
}

export default JobCard