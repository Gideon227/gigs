"use client"
import React, { useState, useLayoutEffect } from 'react'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'

import { Popover, PopoverTrigger, PopoverContent } from './ui/popover'


const SortFilter = () => {
    const [sortBy, setSortBy] = useState<"relevancy" | "date_posted">("date_posted")
    const [open, setOpen] = useState<boolean>(false)

    const searchParams = useSearchParams()
    const router = useRouter()

    const updateSearchParam = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
    };


    useLayoutEffect(() => {
        updateSearchParam("sort", "-postedDate")
    }, [])
    
    const sortName = () => {
        let name = "Newest First";

        if (sortBy === "date_posted"){
            name = "Newest First"
        } else if (sortBy === "relevancy"){
            name = "Relevancy"
        }
        return name
    }

  return (
    <div className='lg:min-w-60 max-lg:min-w-48 max-sm:min-w-28'>
        <Popover open={open} onOpenChange={setOpen}>

            <PopoverTrigger asChild>
                <div className='w-full rounded-lg cursor-pointer bg-[#101217] border border-gray sm:py-2 max-sm:py-1.5 px-4 flex items-center justify-between date_overlay'>
                    <p className='text-neutral text-sm leading-6 max-sm:text-[12px]'> {sortName()} </p>
                    <Image src='/arrow-down.svg' width={16} height={16} alt='arrow down icon'/>
                </div>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0 border-none mt-2">
                <div className='bg-[#101217] px-4 py-3 border-[#363636] border rounded-xl date_overlay min-w-[275px]'>
                    <div className='text-start w-full'>
                        <h1
                            className='py-4 cursor-pointer border-b border-[#363636] text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px]'
                            onClick={() => {
                                setSortBy("relevancy")
                                setOpen(false)
                                updateSearchParam("sort", "-id" )
                            }}
                        >
                            Relevancy
                        </h1>

                        <h1
                            className='py-4 cursor-pointer text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px]'
                            onClick={() => {
                                setSortBy("date_posted")
                                setOpen(false)
                                updateSearchParam("sort", "-postedDate")
                            }}
                        >
                            Newest First
                        </h1>

                    </div>

                </div>
            </PopoverContent>
        </Popover>
    </div>
  )
}

export default SortFilter