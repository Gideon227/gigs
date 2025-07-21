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
import { RxCross2  } from 'react-icons/rx';

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
  { value: 'On-site', label: 'On-site' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'remote', label: 'Remote' }
] 

const skillsOptions: Option[] = [
  { value: 'power platform', label: 'Power Platform' },
  { value: 'power apps', label: 'Power Apps' },
  { value: 'sql', label: 'SQL' },
  { value: 'microsoft', label: 'Microsoft' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
] 

interface Props{
  page: number;
  setPage: (value: any) => void
  setOpenModal?: (value: boolean) => void
}

const JobSidebar = ({ page, setPage, setOpenModal }: Props) => {
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
    setRole(searchParams.get('roleCategory'));
    setCountry(searchParams.get('country'));
    setState(searchParams.get('state'));
    setCity(searchParams.get('city'));
  }, [searchParams]);

  const minSalary = searchParams.get("minSalary");
  const maxSalary = searchParams.get("maxSalary");

  return (
    <div className='bg-[#1B1E28] border border-[#363636] rounded-lg gap-y-2.5 max-md:pb-10'>
      <div className='max-lg:fixed max-lg:-top-1 max-lg:bg-[#1B1E28] max-lg:z-50 flex justify-between px-4 py-4 border-b border-[#363636] overflow-y-clip w-full'>
        <div className='flex items-center justify-between space-x-4 lg:hidden'>
          <button onClick={() => setOpenModal && setOpenModal(false)}>
            <RxCross2  size={21} color='#FCFCFC'/>
          </button>
          <h1 className='text-[16px] font-medium text-heading'>Filter</h1>
        </div>
        <h1 className='text-heading text-[18px] font-medium max-lg:hidden'>Filter</h1>
        <button 
          onClick={() => {
            const updatedParams = new URLSearchParams();
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

            updatedParams.set("country", "United States");
            router.replace(`/browse-jobs?${updatedParams.toString()}`, { scroll: false });
          }}
          className='text-neutral text-[16px] max-md:text-[14px] leading-6 cursor-pointer'>
            Clear all
        </button>
      </div>

      <div className='max-lg:overflow-y-auto max-lg:hide-scrollbar max-lg:pb-12'>
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
            }} 
            setPage={setPage}
          />

          <FilterCard
            setPage={setPage}
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
              setPage={setPage}
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
                    max={350000}
                    defaultValue={[60000, 120000]}
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
            setPage={setPage}
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
            setPage={setPage}
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


      <div className='max-lg:fixed max-lg:bottom-0 lg:hidden max-lg:bg-[#1B1E28] max-lg:z-50 flex justify-between items-center space-x-4 px-4 py-4 border-t border-[#363636] overflow-y-clip w-full'>
        <button
          className='w-1/4 text-primary text-[12px] cursor-pointer font-semibold'
          onClick={() => {
            const updatedParams = new URLSearchParams();
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

            updatedParams.set("country", "United States");
            router.replace(`/browse-jobs?${updatedParams.toString()}`, { scroll: false });
            setOpenModal && setOpenModal(false)
          }}
        >
          RESET
        </button>

        <button 
          onClick={() => {
            setOpenModal && setOpenModal(false)
          }}
          className='cursor-pointer font-semibold text-dark text-[12px] leading-6 bg-primary py-2 rounded-md w-3/4'>
            SHOW 
        </button>
      </div>

    </div>
  )
}

export default JobSidebar