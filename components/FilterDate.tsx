"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';


type OptionValue =
  'today'
  | 'last_3_days'
  | 'last_7_days'
  | 'last_15_days'

const options: { label: string; value: OptionValue }[] = [
    { label: 'Today', value: 'today' },
    { label: 'Last 3 days', value: 'last_3_days' },
    { label: 'Last 7 days', value: 'last_7_days' },
    { label: 'Last 15 days', value: 'last_15_days' }
]

interface DateProps {
    date:  string | null;
    setDate: (value: any) => void;
    setPage: (value: any) => void;
}
const FilterDate = ({ date, setDate, setPage }: DateProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const dateParam = searchParams.get('datePosted');
        if (dateParam) {
            const option = options.find((opt) => opt.value === dateParam);
            if (option) {
                setDate(option.label);
            }
        }
    }, []);

    useEffect(() => {
        // setPage(1);
    }, [searchParams.toString()]);
      
    const updateSearchParam = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        params.set('page', '1');

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
                        {options.map((option, index) => (
                            <h1
                                key={index}
                                className={`py-4 cursor-pointer text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px] ${index !== options.length - 1 && 'border-b border-gray'}`}
                                onClick={() => handleClick(option.value)}
                            >{option.label}</h1>
                        ))}
                    </div>

                </div>
            </PopoverContent>
        </Popover>
    </div>
  )
}

export default FilterDate