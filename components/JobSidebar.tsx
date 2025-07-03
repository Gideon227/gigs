"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import FilterDate from './FilterDate';
import FilterCard from './FilterCard';
import ExperienceLevelFilter from './ExperienceFilter';
import dynamic from 'next/dynamic';
import RoleFilter from './RoleFilter';
import useUpdateSearchParams from '@/utils/updateSearchParams';
import CountryFilter from './CountryFilter';
import CustomSalarySlider from './CustomSalarySlider';

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
  { value: '0-50000', label: 'Under $50K' },
  { value: '51000-100000', label: '$51K-$100K' },
  { value: '101000-150000', label: '$101K-$150K' },
  { value: '151000-200000', label: '$151K-$200K' },
  { value: '200000-', label: '$200K+' },
  { value: 'custom', label: 'Custom' }
];

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

interface Props{
  page: number;
  setPage: (value: any) => void
}

const JobSidebar = ({ page, setPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const [date, setDate] = useState<string | null>(null);
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
    router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
  };

  // Single-select update
  const updateSingleParam = (key: string, value: string | null) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete("page");

    if (key === "salary") {
      updatedParams.delete("minSalary");
      updatedParams.delete("maxSalary");

      if (value && value !== "custom") {
        const [min, max] = value.split("-");
        if (min) updatedParams.set("minSalary", min);
        if (max) updatedParams.set("maxSalary", max);
        updatedParams.set("salary", value); 
      } else {
        updatedParams.delete("salary");
      }
    } else if (key === "minSalary" || key === "maxSalary") {
  if (value) {
          updatedParams.set(key, value);
          updatedParams.delete("salary");  // remove preset because user is using custom
        } else {
          updatedParams.delete(key);
          if (!updatedParams.get("minSalary") && !updatedParams.get("maxSalary")) {
            updatedParams.delete("salary");
          }
        }
      }else {
      if (value) {
        updatedParams.set(key, value);
      } else {
        updatedParams.delete(key);
      }
    }

    router.replace(`/browse-jobs?${updatedParams.toString()}`, { scroll: false });
  };

  const updateSalaryRange = (range: [number, number]) => {
    const updatedParams = new URLSearchParams(searchParams);

    updatedParams.delete("salary"); // remove preset salary key
    updatedParams.delete("minSalary");
    updatedParams.delete("maxSalary");

    updatedParams.set("salary", "custom"); // set custom flag
    updatedParams.set("minSalary", range[0].toString());
    updatedParams.set("maxSalary", range[1].toString());

    router.replace(`/browse-jobs?${updatedParams.toString()}`, { scroll: false });
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

  const minSalary = searchParams.get("minSalary");
  const maxSalary = searchParams.get("maxSalary");

  return (
    <div className='bg-[#1B1E28] border border-[#363636] rounded-lg gap-y-2.5 max-lg:pb-48 '>
      <div className='max-lg:sticky max-lg:-top-1 max-lg:bg-[#1B1E28] max-lg:rounded-t-lg max-lg:z-50 flex justify-between px-4 py-4 border-b border-[#363636] overflow-y-clip'>
        <h1 className='text-heading text-[18px] font-medium'>Filter</h1>
        <button 
          onClick={() => {
            setDate(null);
            setCountry(null);
            setState(null);
            setCity(null);
            setRole(null);
            setJobType([]);
            setSalaryRange(null);
            setSkills([]);
            setWorkSettings([]);
            setExperienceLevel(null);

            const updatedParams = new URLSearchParams();
            router.replace(`/browse-jobs?${updatedParams.toString()}`, { scroll: false });
          }}
          className='text-neutral text-[16px] leading-6 cursor-pointer'>
            Clear all
        </button>
      </div>

      <div className='max-lg:overflow-y-auto max-lg:max-h-[calc(100vh-80px)] max-lg:hide-scrollbar'>
        <div className='px-4'>
          <FilterDate 
            date={date}
            setDate={setDate}
            setPage={setPage}
          />

          <CountryFilter
            onChange={({ country, state, city }) => {
              setCountry(country);
              setState(state);
              setCity(city);
            }}
          />

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

          <div className='border-b border-[#363636] pb-4'>
            <FilterCard
              title='Salary Range'
              state={salaryRange}
              setState={setSalaryRange}
              options={salaryRangeOptions}
              changeKey='salary'
              onChange={updateSingleParam}
              extraStyles='rounded-full'
              hasBorderBottom={false}
            />

            {salaryRange === 'custom' && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "tween", duration: 0.5 }}
                  className='py-5 px-3'
                >
                  <CustomSalarySlider
                    min={0}
                    max={500000}
                    defaultValue={[60000, 210000]}
                    disabled = {salaryRange !== 'custom'}
                    currentMinSalary={minSalary ? Number(minSalary) : undefined}
                    currentMaxSalary={maxSalary ? Number(maxSalary) : undefined}
                    onChangeCommitted={(range) => {
                      updateSalaryRange(range);
                    }}
                    // onChangeCommitted={(range) => {
                    //   console.log('Selected salary range:', range);
                    //   updateSingleParam('minSalary', range[0].toString());
                    //   updateSingleParam('maxSalary', range[1].toString());
                    // }}
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <FilterCard
            title='Work Setting'
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