"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';

import useClearFilter from '@/utils/clearFilter';

interface ExperienceLevelFilterProps {
    experienceLevel: string | null;
    setExperienceLevel: React.Dispatch<React.SetStateAction<string | null>>;
}

const ExperienceLevelFilter = ({ experienceLevel, setExperienceLevel }: ExperienceLevelFilterProps) => {
    
    const [open, setOpen] = useState<boolean>(false)

    const router = useRouter();
    const searchParams = useSearchParams();

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

    const clearFilter = useClearFilter()

  return (
    <div className='py-8 space-y-2 border-b border-[#363636]'>
        <div className='flex justify-between'>
            <h1 className='text-heading 2xl:text-[16px] max-2xl:text-[14px] font-medium'>Experience Level</h1>
            <button onClick={() => clearFilter(setExperienceLevel, "experienceLevel")} className='text-[#FB4D5C] cursor-pointer text-[14px] leading-6'>Clear all</button>
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
                        <h1
                            className='py-4 cursor-pointer border-b border-[#363636] text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px]'
                            onClick={() => {
                                setExperienceLevel("beginner")
                                setOpen(false)
                                updateSearchParam("experienceLevel", "beginner" )
                            }}
                        >
                            Beginner
                        </h1>

                        <h1
                            className='py-4 cursor-pointer border-b border-[#363636] text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px]'
                            onClick={() => {
                                setExperienceLevel("intermediate")
                                setOpen(false)
                                updateSearchParam("experienceLevel", "intermediate")
                            }}
                        >
                            Intermediate
                        </h1>

                        <h1
                            className='py-4 cursor-pointer border-[#363636] text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px]'
                            onClick={() => {
                                setExperienceLevel("experienced")
                                setOpen(false)
                                updateSearchParam("experienceLevel", "experienced" )
                            }}
                        >
                            Experienced
                        </h1>

                    </div>

                </div>
            </PopoverContent>
        </Popover>
    </div>
  )
}

export default ExperienceLevelFilter;