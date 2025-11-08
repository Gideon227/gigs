"use client"
import React, { useEffect, useState } from 'react'
import JobSidebar from './JobSidebar'
import JobBoard from './JobBoard'
import { JobProps } from '@/constants/Jobs'
import { useSearchParams } from 'next/navigation'

export interface SelectedLocation {
  country?: string;
  state?: string;
  city?: string;
  locality?: string;
  region?: string;
}


const JobMain = () => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const params = new URLSearchParams(searchParams.toString())
  const getPage = Number(currentPage);

  const [page, setPage] = useState<number>(getPage || 1);
  // const [location, setLocation] = useState<string | null>(params.get('location') || "");
  const [location, setLocation] = useState<SelectedLocation | null>(null);

  return (
    <div className='grid grid-cols-7 md:gap-6 max-sm:gap-2'>
        <div className='col-span-2 max-lg:hidden'>
            <JobSidebar 
              page={page} 
              setPage={setPage} 
              setLocation={setLocation} 
              location={location} />
        </div>
        <div className='col-span-5 max-lg:col-span-7'>
            <JobBoard page={page} setPage={setPage} setLocation={setLocation} location={location}/>
        </div>
    </div>
  )
}

export default JobMain