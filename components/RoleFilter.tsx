"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';

enum RoleProps {
    BEGINNER = "beginner" ,
    INTERMEDIATE = "intermediate",
    EXPERIENCED = "experienced" 
}

const RoleFilter = () => {
    const [role, setRole] = useState(null)


  return (
    <div className='py-6 space-y-2 border-b border-[#363636]'>
        <div className='flex justify-between'>
            <h1 className='text-heading 2xl:text-[16px] max-2xl:text-[14px] font-medium'>Role Category</h1>
            <button onClick={() => setRole(null)} className='text-[#FB4D5C] text-[14px] leading-6'>Clear all</button>
        </div>

        <Popover>
            <PopoverTrigger asChild>
                <div className='w-full rounded-lg cursor-pointer bg-[#101217] border border-gray py-2.5 px-4 flex items-center justify-between date_overlay'>
                    <p className='text-neutral text-sm leading-6'> Filter by Date Posted </p>
                    <Image src='/arrow-down.svg' width={14} height={14} alt='arrow down icon'/>
                </div>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
                <div className='bg-[#101217] p-6 border border-[#363636] date_overlay w-[250px]'>
                    <div className='text-start w-full'>
                        <h1
                            className='py-4 border-b border-[#363636] text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px]'
                            onClick={() => {}}
                        >
                            Beginner
                        </h1>

                        <h1
                            className='py-4 border-b border-[#363636] text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px]'
                            onClick={() => {}}
                        >
                            Intermediate
                        </h1>

                        <h1
                            className='py-4 border-b border-[#363636] text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px]'
                            onClick={() => {}}
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

export default RoleFilter