"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterDate from './FilterDate';
import FilterCard from './FilterCard';
import ExperienceLevelFilter from './ExperienceFilter';
import dynamic from 'next/dynamic';
import RoleFilter from './RoleFilter';
import useUpdateSearchParams from '@/utils/updateSearchParams';
// const CountryFilter = dynamic(() => import('./CountryFilter'), { ssr: false })

export type Option = {
  value: string;
  label: string;
};

const jobTypeOptions: Option[] = [
  { value: 'fullTime', label: 'Full-time' },
  { value: 'partTime', label: 'Part-time' },
  { value: 'contractToHire', label: 'Contract to hire' },
  { value: 'tempContract', label: 'Temp contract' },
  { value: 'gigWork', label: 'Gig-work' },
] 

const salaryRangeOptions: Option[] = [
  { value: 'unders50k', label: 'Under $50K' },
  { value: '51k-100k', label: '$51K-$100K' },
  { value: '101k-150k', label: '$101K-$150K' },
  { value: '151k-200k', label: '$151K-$200K' },
  { value: '200k', label: '$200K+' },
  { value: 'custom', label: 'Custom' }
] 

const workSettingsOptions: Option[] = [
  { value: 'onSite', label: 'On-site' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'remote', label: 'Remote' }
] 

const skillsOptions: Option[] = [
  { value: 'ui/ux-design', label: 'UI/UX Design' },
  { value: 'lavarel', label: 'Lavarel' },
  { value: 'webflow', label: 'Webflow' },
  { value: 'framer', label: 'Framer' },
  { value: 'php', label: 'PHP' },
  { value: 'javascript', label: 'JavaScript' },
] 


const JobSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  
  const [jobType, setJobType] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [workSettings, setWorkSettings] = useState<string[]>([]);

  const [salaryRange, setSalaryRange] = useState<string | null>(null)
  const [experienceLevel, setExperienceLevel] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [country, setCountry] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);

  const getParam = (key: string) => searchParams.get(key)

  // Multi-select update
  const updateMultiSelectParam = (key: string, value: string) => {
    const values = new Set(searchParams.getAll(key));

    if (values.has(value)) {
      values.delete(value);
    } else {
      values.add(value);
    }

    params.delete(key);
    for (const v of values) {
      params.append(key, v);
    }

    params.set("page", "1");
    router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
  };

  // Single-select update
  const updateSingleParam = (key: string, value: string | null) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");
    router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    setJobType(searchParams.getAll('jobType'));
    setSkills(searchParams.getAll('skills'));
    setWorkSettings(searchParams.getAll('workSettings'));

    setSalaryRange(searchParams.get('salary'));
    setExperienceLevel(searchParams.get('experienceLevel'));
    setRole(searchParams.get('role'));
    setCountry(searchParams.get('country'));
    setState(searchParams.get('state'));
    setCity(searchParams.get('city'));
  }, [searchParams]);


  return (
    <div className='bg-[#1B1E28] border border-[#363636] rounded-lg gap-y-2.5 max-lg:pb-48 '>
      <div className='max-lg:sticky max-lg:-top-1 max-lg:bg-[#1B1E28] max-lg:rounded-t-lg max-lg:z-50 flex justify-between px-4 py-4 border-b border-[#363636] overflow-y-clip'>
        <h1 className='text-heading text-[18px] font-medium'>Filter</h1>
        <button 
          onClick={() => {
            setJobType([]);
            setSkills([]);
            setWorkSettings([]);
            setSalaryRange(null);
            setExperienceLevel(null);
            setRole(null);
            router.replace('/browse-jobs');
          }}
          className='text-[#FB4D5C] text-[16px] leading-6'>
            Clear all
        </button>
      </div>

      <div className='max-lg:overflow-y-auto max-lg:max-h-[calc(100vh-80px)] max-lg:hide-scrollbar'>
        <div className='px-4'>
          <FilterDate />

          {/* <CountryFilter
            onChange={({ country, state, city }) => {
              setCountry(country);
              setState(state);
              setCity(city);
            }}
          /> */}

          <RoleFilter 
            role={role} 
            setRole={(val) => {
              setRole(val);
              const resolvedVal = typeof val === 'function' ? val(experienceLevel) : val;
              updateSingleParam("role", resolvedVal);
            }} />

          <FilterCard
            title='Job Type'
            state={jobType}
            setState={setJobType}
            options={jobTypeOptions}
            changeKey='jobType'
            onChange={updateMultiSelectParam}
            isMulti
          />

          <FilterCard
            title='Salary Range'
            state={salaryRange}
            setState={setSalaryRange}
            options={salaryRangeOptions}
            changeKey='salary'
            onChange={updateSingleParam}
            extraStyles='rounded-full'
          />

          <FilterCard
            title='Work Settings'
            state={workSettings}
            setState={setWorkSettings}
            options={workSettingsOptions}
            changeKey='workSettings'
            onChange={updateMultiSelectParam}
            isMulti
          />

          <ExperienceLevelFilter
            experienceLevel={experienceLevel}
            setExperienceLevel={(val) => {
              setExperienceLevel(val);
              const resolvedVal = typeof val === 'function' ? val(experienceLevel) : val;
              updateSingleParam("experienceLevel", resolvedVal);
            }}
          />

          <FilterCard
            title='Required Skills'
            state={skills}
            setState={setSkills}
            options={skillsOptions}
            changeKey='skills'
            onChange={updateMultiSelectParam}
            hasBorderBottom={false}
            isMulti
          />
        </div>
      </div>

    </div>
  )
}

export default JobSidebar