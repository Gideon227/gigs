"use client"
import React, { useState, useEffect, ReactEventHandler } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import JobSidebar from './JobSidebar'

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
            params.set("sort", "-datePosted")
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


    const fetchLocationSuggestions = async (query: string) => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(
                `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5`,
                {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
                        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
                    }
                }
            );
            if (!response.ok) {
                if (response.status === 429) throw new Error("Rate limit exceeded. Please try again later.");
                throw new Error("Network error");
            }

            const data = await response.json();

            setSuggestions(data.data.map((city: any) => `${city.city}, ${city.country}`));
            setShowSuggestions(true);
        } catch ( error ) {
            console.error("Error fetching location suggestions:", error);

            if (error instanceof Error) {
                setErrMessage(error.message);
            } else {
                setErrMessage("An unknown error occurred");
            }
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

            <div className='w-full border-[#363636] border bg-[#101217] py-1 md:rounded-e-lg max-md:rounded-lg flex justify-center items-center space-x-2'>
                <input
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
                />

                {showSuggestions && suggestions.length > 0 && (
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
                )}

                <button 
                    type="submit"
                    disabled={loading}
                    className='bg-primary leading-6 w-1/3 text-nowrap rounded-lg py-2 px-4 font-semibold 2xl:text-[16px] max-2xl:text-[14px] max-sm:text-[12px] text-dark cursor-pointer'>
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