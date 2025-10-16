"use client"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import React, { useState, useEffect, ReactEventHandler } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import JobSidebar from './JobSidebar'

import { getLocationSuggestions } from '@/libs/getLocation'

interface Props{
    page: number;
    setPage: (value: any) => void
    location: string | null;
    setLocation: React.Dispatch<React.SetStateAction<string | null>>
}

const JobBoardHeader = ({ page, setPage, location, setLocation  }: Props) => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString())

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [keyword, setKeyword] = useState(params.get("keyword") || "");
    // const [location, setLocation] = useState("United States");
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [errMessage, setErrMessage] = useState<string>("");
    const [paramsReady, setParamsReady] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (!location) {
            setSuggestions([]);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            const data = await getLocationSuggestions(location);
            setSuggestions(data);
        }, 400); // debounce

        return () => clearTimeout(delayDebounce);
    }, [location]);

    useEffect(() => {
        if (!location?.trim()) {
            setShowSuggestions(false);
        }
    }, [location]);



    useEffect(() => {
        const currentCountry = searchParams.get("country");
        const currentLocation = searchParams.get("location");

        const params = new URLSearchParams(searchParams.toString());

        if (!currentCountry && !currentLocation) {
            params.set("country", "United States");
        } else if (currentLocation) {
            params.delete("country");
        }

        router.replace(`?${params.toString()}`);
        setParamsReady(true);
    }, []);

    useEffect(() => {
        if (openModal) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      
        return () => {
          document.body.style.overflow = '';
        };
    }, [openModal]);

    useEffect(() => {
        setLoading(false);
    }, [searchParams.toString()]);

    const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        try {
            const params = new URLSearchParams(searchParams.toString());

            if (keyword.trim()) {
                params.set("keyword", keyword.trim());
            } else {
                params.delete("keyword");
            }
            if (location?.trim()) {
                params.set("location", location.trim());
                params.delete("country");
                params.delete("state");
                params.delete("city");
            } else {
                params.delete("location");
                params.delete("country");
                params.delete("state");
                params.delete("city");
            }

            params.set("page", "1");
            params.set("sort", "-postedDate")
            setPage(1);

            router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });

        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 100);
        }
    };


  return (
    <div className='space-y-2 border-b border-[#363636] pb-3'>
        <form onSubmit={handleClick} className='flex max-md:flex-col max-md:space-y-2 space-x-0 my-2 md:px-10 max-md:px-4'>
            <div className='w-full border-[#363636] border bg-[#101217] py-1 max-md:py-3 md:rounded-s-lg max-md:rounded-lg flex justify-center items-center space-x-2'>
                <Image src='/Rounded Magnifer.svg' width={20} height={20} alt='Search icon' className='ml-4' />
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search job title or keyword..."
                    className="bg-transparent outline-none text-[#808080] 2xl:text-[16px] max-2xl:text-[14px] leading-[24px] w-full placeholder-[#7E7E7E]"
                />
            </div>

            <div className='relative w-full overflow-hidden border-[#363636] border bg-[#101217] py-1 md:rounded-e-lg max-md:rounded-lg flex justify-center items-center space-x-2'>
                <Command shouldFilter={false} className="bg-transparent !border-b-0 !border-none flex-1 min-w-0">
                    <CommandInput
                        placeholder="Enter city, state, zip, or country"
                        value={location || ""}
                        className="relative bg-transparent outline-none border-none focus:ring-0 focus:border-none text-[#808080] 2xl:text-[16px] max-2xl:text-[14px] w-full leading-[24px] ml-4 placeholder-[#7E7E7E]"
                        onValueChange={(val) => {
                            setLocation(val)
                            setShowSuggestions(true)
                        }}
                        onFocus={() => {
                            if (suggestions.length > 0) setShowSuggestions(true)
                        }}
                    />
                    {showSuggestions && (
                        <CommandList className="absolute top-full left-0 right-0 bg-[#101217] border border-[#363636] rounded-b-lg max-h-60 overflow-y-auto z-50">
                        {suggestions.length > 0 && (
                            <CommandGroup>
                                {suggestions.map((item: any, index) => (
                                    <CommandItem
                                        key={index}
                                        value={item.display_name}
                                        onSelect={(val) => {
                                            setLocation(val)
                                            setShowSuggestions(false)
                                        }}
                                        className="text-white text-[14px]"
                                    >
                                        {item.display_name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                            )}
                        </CommandList>
                    )}
                </Command>
               
                {/* <input
                    type="text"
                    value={location!}
                    onChange={(e) => {
                        setLocation(e.target.value)
                        //fetchLocationSuggestions(e.target.value)
                    }}
                    placeholder="Enter city, state, zip, or country"
                    className="relative bg-transparent outline-none text-[#808080] 2xl:text-[16px] max-2xl:text-[14px] leading-[24px] w-2/3 ml-4 placeholder-[#7E7E7E]"
                    onFocus={() => {
                        if (suggestions.length > 0) setShowSuggestions(true);
                    }}
                    onBlur={() => {
                        setTimeout(() => setShowSuggestions(false), 150);
                    }}
                /> */}

                {/* {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute z-50 bg-background border border-[#363636] w-full rounded-b-lg max-h-60 overflow-y-auto">
                        {suggestions.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setLocation(item);
                                    setShowSuggestions(false);
                                }}
                                className="px-4 py-2 cursor-pointer hover:bg-[#1c1f26] text-[#808080]"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )} */}

                <button 
                    type="submit"
                    disabled={loading}
                    className='bg-primary leading-6 shrink-0 flex-nowrap text-nowrap rounded-lg py-2 px-4 font-semibold 2xl:text-[16px] max-2xl:text-[14px] max-sm:text-[12px] text-dark cursor-pointer'>
                        Find Jobs
                </button>
            </div>
        </form>

        <button 
            disabled={loading}
            onClick={() => setOpenModal(true)} 
            className='text-[16px] px-6 lg:hidden text-primary font-normal text-start py-2 cursor-pointer'>
                Advanced search
        </button>

        <AnimatePresence>
            {openModal && (
                <motion.div 
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '100%', opacity: 0 }}
                    transition={{ type: 'tween', duration: 0.25 }}
                    onClick={() => setOpenModal(false)}
                    className='fixed inset-0 pointer-events-auto overflow-hidden w-full flex z-40 h-screen'
                >
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto"
                        onClick={() => setOpenModal(false)}
                    />

                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'tween', duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                        className='rounded-t-2xl overflow-x-hidden z-50 w-[-webkit-fill-available] pb-16 pt-10'
                    >
                        <JobSidebar page={page} setPage={setPage} setOpenModal={setOpenModal} setLocation={setLocation}/>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  )
}

export default JobBoardHeader