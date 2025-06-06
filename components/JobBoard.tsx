"use client"
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import JobBoardHeader from './JobBoardHeader'
import { JobProps, Jobs } from '@/constants/Jobs'
import JobCard from './JobCard'
import dynamic from 'next/dynamic'


const JobDrawer = dynamic(() => import('./JobDrawer'), {
    ssr: false
})

const JobBoard = () => {
    const [selectedJob, setSelectedJob] = useState<JobProps | null>(null)
    const searchParams = useSearchParams();
    const router = useRouter();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });


    useEffect(() => {
        const fetchJobs = async () => {
          setLoading(true);
    
          const queryString = searchParams.toString(); // Get current URL query
          const res = await fetch(`/api/jobs?${queryString}`);
          const data = await res.json();
    
          if (data.success) {
            setJobs(data.data);
            setPagination({
              currentPage: Number(searchParams.get('page') || 1),
              totalPages: data.totalPages || 1,
            });
          }
    
          setLoading(false);
        };
    
        fetchJobs();
      }, [searchParams]);

    const openJob = (job: JobProps) => {
        setSelectedJob(job)
    }

    const closeDrawer = () => {
        setSelectedJob(null)
    }
  return (
    <div className='flex flex-col space-y-4'>
        <div className='bg-[#1B1E28] border border-[#363636] py-4 rounded-lg gap-y-2.5'>
            <JobBoardHeader />
            <div className='py-4 px-6 w-full'>
                <div className='flex w-full justify-between'>
                    <h1 className='font-medium leading-[33px] 2xl:text-[18px] max-2xl:text-[16px] max-md:text-[14px] text-heading '>250 Jobs</h1>
                    <div className='flex space-x-4 items-center'>
                        <p className='text-[16px] max-2xl:text-[14px] leading-6 text-start text-heading'>Sort by:</p>
                        
                    </div>
                </div>
            </div>

            <div className='2xl:px-12 md:px-8 max-md:px-4 mt-2 cursor-pointer'>
                {Jobs.map((job, index) => (
                    <JobCard key={index} job={job} hasBorder= {index !== Jobs.length - 1} onClick={() => {openJob(job)}} />
                ))}

            </div>
            {selectedJob && <JobDrawer job={selectedJob} onClose={closeDrawer} />}
        </div>

        <button
            disabled={jobs.length < 20}
            onClick={() => {}}
            className='w-full rounded-lg border-primary border bg-transparent text-primary text-[16px] text-center py-2 hover:bg-primary hover:text-[#101217] disabled:opacity-60'
        >
            Load More
        </button>
    </div>
  )
}

export default JobBoard