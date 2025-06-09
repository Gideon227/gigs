"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';

interface DateFilterProps {
    onSelect: (date: Date) => void
    defaultDate?: Date 
}

const FilterDate = ({ onSelect, defaultDate }: DateFilterProps) => {
    const [date, setDate] = useState<Date | undefined>(new Date())


  return (
    <div className='py-8 space-y-2 border-b border-[#363636]'>
        <div className='flex justify-between'>
            <h1 className='text-heading 2xl:text-[16px] max-2xl:text-[14px] font-medium text-start'>Date Posted</h1>
        </div>

        <Popover>
            <PopoverTrigger asChild>
                <div className='w-full rounded-lg cursor-pointer bg-[#101217] border border-gray py-2.5 px-4 flex items-center justify-between date_overlay'>
                    <div className='flex justify-start space-x-2 items-center'>
                        <Image src='/Calendar.svg' width={20} height={20} alt="calender icon"/>
                        {/* <p className='text-neutral text-sm leading-6'> {date ? format(date, 'PPP') : 'Filter by Date Posted'} </p> */}
                        <p className='text-neutral text-sm leading-6'> Filter by Date Posted </p>
                    </div>

                    <Image src='/arrow-down.svg' width={14} height={14} alt='arrow down icon'/>
                </div>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0 border-none">
                <div className='bg-[#101217] px-4 py-3 border-[#363636] border rounded-xl date_overlay min-w-[320px]'>
                    <div className='text-start w-full'>
                        <h1
                            className='py-4 border-b border-[#363636] text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px]'
                            onClick={() => {}}
                        >
                            Today
                        </h1>

                        <h1
                            className='py-4 border-b border-[#363636] text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px]'
                            onClick={() => {}}
                        >
                            Last 3 days
                        </h1>

                        <h1
                            className='py-4 border-b border-[#363636] text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px]'
                            onClick={() => {}}
                        >
                            Last 7 days
                        </h1>

                        <h1
                            className='py-4 border-[#363636] text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px]'
                            onClick={() => {}}
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