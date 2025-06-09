import React from 'react'
import JobSidebar from './JobSidebar'
import JobBoard from './JobBoard'
import { JobProps } from '@/constants/Jobs'

const JobMain = () => {
  return (
    <div className='grid grid-cols-7 md:gap-6 max-sm:gap-2'>
        <div className='col-span-2 max-lg:hidden'>
            <JobSidebar />
        </div>
        <div className='col-span-5 max-lg:col-span-7'>
            <JobBoard />
        </div>
    </div>
  )
}

export default JobMain