"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';

import useClearFilter from '@/utils/clearFilter';
import useMultiSearchParams from '@/utils/updateSearchParams';

const experienceOptions = ["beginner", "intermediate", "experienced"];

interface ExperienceLevelFilterProps {
    experienceLevel: string | null;
    setExperienceLevel: React.Dispatch<React.SetStateAction<string | null>>;
}

const ExperienceLevelFilter = ({ experienceLevel, setExperienceLevel }: ExperienceLevelFilterProps) => {
    
    const [open, setOpen] = useState<boolean>(false)
    const router = useRouter();
    const searchParams = useSearchParams();
    const clearFilter = useClearFilter()

    const updateSearchParam = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams);
        value ? params.set(key, value) : params.delete(key);
        router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
    };
    
    const handleSelect = (value: string) => {
        setExperienceLevel(value);
        updateSearchParam("experienceLevel", value);
        setOpen(false);
    };
    
  return (
    <div className='py-8 space-y-2 border-b border-[#363636]'>
        <div className='flex justify-between'>
            <h1 className='text-heading 2xl:text-[16px] max-2xl:text-[14px] font-medium'>Experience Level</h1>
            <button onClick={() => clearFilter(setExperienceLevel, "experienceLevel")} className='text-neutral cursor-pointer text-[14px] leading-6'>Clear</button>
        </div>

        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className='w-full rounded-lg cursor-pointer bg-[#101217] border border-gray py-2.5 px-4 flex items-center justify-between date_overlay'>
                    <p className='text-neutral text-sm leading-6'> {experienceLevel ? experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1) : "Experience Level"} </p>
                    <Image src='/arrow-down.svg' width={20} height={20} alt='arrow down icon'/>
                </div>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0 border-none">
                <div className='bg-[#101217] px-4 py-3 border-[#363636] border rounded-xl date_overlay min-w-[320px]'>
                    <div className='text-start w-full'>
                    {experienceOptions.map((level, index) => (
                        <h1
                            key={index}
                            onClick={() => handleSelect(level)}
                            className={`py-4 cursor-pointer text-[#F8F6F0] text-[14px] leading-6 capitalize ${index !== level.length - 1 && "border-b border-[#363636]" }`}
                        >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </h1>
                    ))}
                    </div>

                </div>
            </PopoverContent>
        </Popover>
    </div>
  )
}

export default ExperienceLevelFilter;