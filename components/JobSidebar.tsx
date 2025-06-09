"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterDate from './FilterDate';
import CountryFilter from './CountryFilter';
import FilterCard from './FilterCard';
import RoleFilter from './RoleFilter';


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

const salaryRangeOptions = [
  { value: 'under-50k', label: 'Under $50K' },
  { value: '51k-100k', label: '$51K-$100K' },
  { value: '101k-150k', label: '$101K-$150K' },
  { value: '151k-200k', label: '$151K-$200K' },
  { value: '200k', label: '$200K+' },
  { value: 'custom', label: 'Custom' }
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
  const [salaryRange, setSalaryRange] = useState<string | null>(null)
  const [skills, setSkills] = useState<string | null>(null)
  const [workSettings, setWorkSettings] = useState<string | null>(null)

  const [country, setCountry] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);

  const getParam = (key: string) => searchParams.get(key)

  const params = new URLSearchParams(searchParams);
  
  const updateSearchParam = (key: string, value: string | null) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1"); // reset page to 1 on filter
    router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
  };



  useEffect(() => {
    // Initialize from query params
    const jobTypeParam = getParam("jobType");
    const salaryParam = getParam("salary");
    const skillsParam = getParam("skills");
    const workSettingsParam = getParam("workSettings");
    const countryParam = getParam("country")
    const cityParam = getParam("city")
    const stateParam = getParam("state")


    if (jobTypeParam) setJobType(jobTypeParam);
    if (salaryParam) setSalaryRange(salaryParam);
    if (skillsParam) setSkills(skillsParam);
    if (workSettingsParam) setWorkSettings(workSettingsParam);
    if (countryParam) setCountry(countryParam);
    if (stateParam) setState(stateParam);
    if (cityParam) setCity(cityParam);

    // Optionally call job fetcher API here
  }, [searchParams]);


  return (
    <div className='bg-[#1B1E28] border border-[#363636] rounded-lg gap-y-2.5'>
      <div className='flex justify-between px-4 py-4 border-b border-[#363636]'>
        <h1 className='text-heading text-[18px] font-medium'>Filter</h1>
        <button 
          onClick={() => {
            setJobType(null);
            setSalaryRange(null);
            setSkills(null);
            setWorkSettings(null);
            router.replace('/browse-jobs'); // clear all
          }}
          className='text-[#FB4D5C] text-[16px] leading-6'>
            Clear all
        </button>
      </div>

      <div className='px-4'>
        <FilterDate 
          onSelect={(date) => {
            const isoDate = date.toISOString()
            console.log("Filter jobs posted from:", isoDate)
          }}
        />

        {/* <CountryFilter
          onChange={({ country, state, city }) => {
          setCountry(country);
          setState(state);
          setCity(city);
        }}
        /> */}

        <RoleFilter />

        <FilterCard 
          title='Job Type'
          state = {jobType}
          setState={setJobType}
          options={jobTypeOptions}
          changeKey= "jobType"
          onChange={updateSearchParam}
        />

        <FilterCard 
          title='Salary Range'
          state = {salaryRange}
          setState={setSalaryRange}
          options={salaryRangeOptions}
          changeKey= "salary"
          onChange={updateSearchParam}
          extraStyles= "rounded-full"
        />

        <FilterCard 
          title='Work Settings'
          state = {workSettings}
          setState={setWorkSettings}
          options={workSettingsOptions}
          changeKey= "workSettings"
          onChange={updateSearchParam}
        />


        <FilterCard 
          title='Required Skills'
          state = {skills}
          setState={setSkills}
          options={skillsOptions}
          changeKey= "skills"
          onChange={updateSearchParam}
          hasBorderBottom = {false}
        />

      </div>
    </div>
  )
}

export default JobSidebar