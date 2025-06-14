"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';


enum DateOptions {
    TODAY= "today",
    LAST_3_DAYS = "last_3_days",
    LAST_7_DAYS = "last_7_days",
    LAST_15_DAYS = "last_15_days"
}
const FilterDate = () => {
    const [date, setDate] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);

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

    const handleClick = (value: string) => {
        switch (value) {
            case 'today':
              setDate('Today') 
              break;
            case 'last_3_days':
              setDate('Last 3 days') 
              break;
            case 'last_7_days':
              setDate('Last 7 days') 
              break;
            case 'last_15_days':
              setDate('Last 15 days') 
              break;
          }
        setOpen(false)
        updateSearchParam("datePosted", value)
    }

  return (
    <div className='py-8 space-y-2 border-b border-[#363636]'>
        <div className='flex justify-between'>
            <h1 className='text-heading 2xl:text-[16px] max-2xl:text-[14px] font-medium text-start'>Date Posted</h1>
        </div>

        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className='w-full rounded-lg cursor-pointer bg-[#101217] border border-gray py-2.5 px-4 flex items-center justify-between date_overlay'>
                    <div className='flex justify-start space-x-2 items-center'>
                        <Image src='/Calendar.svg' width={20} height={20} alt="calender icon"/>
                        <p className='text-neutral text-sm leading-6'>{date ? date.charAt(0).toUpperCase() + date.slice(1) : "Filter by Date Posted"}  </p>
                    </div>

                    <Image src='/arrow-down.svg' width={14} height={14} alt='arrow down icon'/>
                </div>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0 border-none">
                <div className='bg-[#101217] px-4 py-3 border-[#363636] border rounded-xl date_overlay min-w-[320px]'>
                    <div className='text-start w-full'>
                        <h1
                            className='py-4 border-b border-[#363636] text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px]'
                            onClick={() => handleClick("today")}
                        >
                            Today
                        </h1>

                        <h1
                            className='py-4 border-b border-[#363636] text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px]'
                            onClick={() => handleClick("last_3_days")}
                        >
                            Last 3 days
                        </h1>

                        <h1
                            className='py-4 border-b border-[#363636] text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px]'
                            onClick={() => handleClick("last_7_days")}
                        >
                            Last 7 days
                        </h1>

                        <h1
                            className='py-4 border-[#363636] text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px]'
                            onClick={() => handleClick("last_15_days")}
                        >
                            Last 15 days
                        </h1>
                    </div>

                </div>
            </PopoverContent>
        </Popover>
    </div>
  )
}

export default FilterDate