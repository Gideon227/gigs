"use client"
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import JobBoardHeader from './JobBoardHeader'
import { JobProps } from '@/constants/Jobs'
import JobCard from './JobCard'
import dynamic from 'next/dynamic'
import JobCardSkeleton from './JobCardSkeleton';
import SortFilter from './SortFilter';

import { getJobs } from '@/libs/getJobs';


const JobDrawer = dynamic(() => import('./JobDrawer'), {
    ssr: false
})

const JobBoard = () => {
    const [selectedJob, setSelectedJob] = useState<JobProps | null>(null)
    const searchParams = useSearchParams();
    const router = useRouter();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<number>(1);


    const fetchJobs = async () => {
        setLoading(true); 
        try {
            const query = searchParams.toString();
            const data = await getJobs(query)
            setJobs(data.data); 
            
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setLoading(false);
        }   
    };
    
    useEffect(() => {
        fetchJobs();
    }, [searchParams]);

    useEffect(() => {
        const id = searchParams.get("id");
      
        if (id) {
          const index = parseInt(id, 10);
          if (!isNaN(index) && jobs[index]) {
            setSelectedJob(jobs[index]);
          }
        }
    }, [searchParams]);


    const updateSearchParam = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams);
    
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
    
        params.set("page", "1"); // reset page to 1 on filter
        router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
    };

    const openJob = (job: JobProps) => {
        setSelectedJob(job)
    }

    const closeDrawer = () => {
        setSelectedJob(null)
        const params = new URLSearchParams(searchParams.toString());
        params.delete("id");

        router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
    }
  return (
    <div className='flex flex-col space-y-4'>
        <div className='bg-[#1B1E28] border border-[#363636] py-4 rounded-lg gap-y-2.5'>
            <JobBoardHeader />
            <div className='py-4 max-sm:px-2 sm:px-6 w-full'>
                <div className='flex w-full justify-between items-center'>
                    <h1 className='font-medium leading-[33px] 2xl:text-[18px] max-2xl:text-[18px] max-md:text-[16px] max-sm:text-sm text-heading '>{jobs.length} Jobs</h1>
                    <div className='flex sm:space-x-4 max-sm:space-x-2 items-center'>
                        <p className='max-sm:text-sm sm:text-[18px] max-2xl:text-[16px] leading-6 text-start text-heading'>Sort by:</p>
                        <SortFilter />
                    </div>
                </div>
            </div>
            <div className='2xl:px-12 md:px-8 max-md:px-4 mt-2 cursor-pointer'>
                {loading ? (
                    <div className='space-y-4'>
                        {Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)}
                    </div>
                    ) : jobs.length > 0 ? (
                    jobs.map((job, index) => (
                        <JobCard
                            key={index}
                            job={job}
                            hasBorder={index !== jobs.length - 1}
                            onClick={() => {
                                openJob(job)
                                updateSearchParam("id", index.toString())
                            }}
                        />
                    ))
                    ): (
                        <h1 className='text-heading text-[18px] py-4 text-center'>No jobs found</h1>
                    )
                }

            </div>
            {selectedJob && <JobDrawer job={selectedJob} onClose={closeDrawer} />}
        </div>

        <button
            // disabled={jobs.length < 20}
            onClick={() => {
                const newPage = pagination + 1;
                setPagination((prev) => prev + 1)
                const params = new URLSearchParams(searchParams.toString());
                params.set('page', newPage.toString());
                router.push(`?${params.toString()}`);
            }}
            className='w-full p-0.5 rounded-sm border-primary border bg-transparent text-primary text-[14px] text-center py-3 hover:bg-primary hover:text-[#101217] hover:font-medium cursor-pointer'
        >
            Load More
        </button>
    </div>
  )
}

export default JobBoard