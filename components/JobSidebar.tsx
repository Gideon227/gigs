"use client"
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterDate from './FilterDate';
import LocationFilter from './LocationFilter';
import FilterCard from './FilterCard';
import RoleFilter from './RoleFilter';
import * as Slider from '@radix-ui/react-slider'
// import { useRouter } from 'next/router';


interface PriceSliderProps {
  value: [number, number];
  setValue: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
}

export type Option = {
  value: string;
  label: string;
};

const jobTypeOptions = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract-to-hire', label: 'Contract to hire' },
  { value: 'temp-contract', label: 'Temp contract' },
  { value: 'gig-work', label: 'Gig-work' },
] 

const workSettingsOptions = [
  { value: 'on-site', label: 'On-site' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'remote', label: 'Remote' }
] 

const skillsOptions = [
  { value: 'ui/ux-design', label: 'UI/UX Design' },
  { value: 'lavarel', label: 'Lavarel' },
  { value: 'webflow', label: 'Webflow' },
  { value: 'framer', label: 'Framer' },
  { value: 'php', label: 'Php' },
  { value: 'javascript', label: 'JavaScript' },
] 


const JobSidebar = () => {
  // const router = useRouter()
  const router = useRouter();
  const searchParams = useSearchParams();

  const [jobType, setJobType] = useState<string | null>(null)
  const [skills, setSkills] = useState<string | null>(null)
  const [workSettings, setWorkSettings] = useState<string | null>(null)

  const handleChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    params.set('page', '1'); // Reset to page 1 on filter change
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className='bg-[#1B1E28] border border-[#363636] rounded-lg gap-y-2.5'>
      <div className='flex justify-between px-4 py-4 border-b border-[#363636]'>
        <h1 className='text-heading text-[18px] font-medium'>Filter</h1>
        <button className='text-[#FB4D5C] text-[16px] leading-6'>Clear all</button>
      </div>

      <div className='px-4 space-y-4'>
        <FilterDate 
          onSelect={(date) => {
            // Convert to ISO string and call your job filter API
            const isoDate = date.toISOString()
            console.log("Filter jobs posted from:", isoDate)

            // For example:
            // router.push(`/jobs?fromDate=${isoDate}`)
          }}
        />

        {/* <LocationFilter /> */}

        <RoleFilter />

        <FilterCard 
          title='Job Type'
          state = {jobType}
          setState={setJobType}
          options={jobTypeOptions}
          changeKey= "jobType"
        />

        <FilterCard 
          title='Salary Range'
          state = {jobType}
          setState={setJobType}
          options={jobTypeOptions}
          changeKey= "salary"
        />
        <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-6"
            min={0}
            max={100}
            step={0}
            // value={0, 80}
            // onValueChange={setValue}
          >
            <Slider.Track className="bg-[#363636] relative grow rounded-full h-1">
              <Slider.Range className="absolute bg-primary rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-4 h-4 bg-primary rounded-sm shadow" />
            <Slider.Thumb className="block w-4 h-4 bg-primary rounded-sm shadow" />
        </Slider.Root>

        <div className='flex justify-between px-4'>
          <h1 className='text-heading text-[16px] leading'>$20K</h1>
          <h1 className='text-heading text-[16px] leading'>$200K</h1>
        </div>

        <FilterCard 
          title='Work Settings'
          state = {workSettings}
          setState={setWorkSettings}
          options={workSettingsOptions}
          changeKey= "workSettings"
        />


        <FilterCard 
          title='Required Skills'
          state = {skills}
          setState={setSkills}
          options={skillsOptions}
          changeKey= "skills"
        />

      </div>
    </div>
  )
}

export default JobSidebar