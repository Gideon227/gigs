"use client"
import React, { useState, useEffect, useMemo, useRef, useCallback, useLayoutEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import JobBoardHeader from './JobBoardHeader'
import { JobProps } from '@/constants/Jobs'
import JobCard from './JobCard'
import dynamic from 'next/dynamic'
import JobCardSkeleton from './JobCardSkeleton';
import SortFilter from './SortFilter';
import debounce from "lodash.debounce";

import { getJobs } from '@/libs/getJobs';

import ShareModal from './ShareModal';
import { getJobById } from '@/libs/getJobById';
import Pagination from './Pagination';
import { generateJobSlug } from '@/utils/generateSlug';
import Link from 'next/link';

const JobDrawer = dynamic(() => import('./JobDrawer'), {
    ssr: false
})

interface Props{
    page: number;
    setPage: (value: any) => void
    location?: string | null;
    setLocation: React.Dispatch<React.SetStateAction<string | null>>
}

const JobBoard = ({ page, setPage, location, setLocation }: Props ) => {
     // State Management
    const [selectedJob, setSelectedJob] = useState<JobProps | null>(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [jobLength, setJobLength] = useState<number>(0);
    const [pageSize, setPageSize] = useState(10);
    const [isInitialized, setIsInitialized] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    const [openShareModal, setOpenShareModal] = useState<JobProps | null>(null);
    const [userRemovedCountry, setUserRemovedCountry] = useState(false);

    // Hooks
    const searchParams = useSearchParams();
    const router = useRouter();

    // Refs
    const preloadRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const queryString = useMemo(() => {
        if (!isInitialized) {
            console.log('Query string not ready - not initialized');
            return '';
        }
        
        const params = new URLSearchParams(searchParams.toString());

        const hasLocationFilters =
            params.has('location') ||
            params.has('city') ||
            params.has('state') ||
            params.has('country');
        
        if (!hasLocationFilters && !hasFetched){
            params.set("country", "United States")
        }
        
        // Always include current page and limit
        params.set("page", page.toString());
        params.set("limit", pageSize.toString());
        setHasFetched(true)
        
        console.log('Generated query string:', params.toString());
       
        return params.toString();
    }, [searchParams.toString(), page, pageSize, isInitialized]);

    // Main jobs fetching function
    const fetchJobs = useCallback(async () => {
        if (!isInitialized || !queryString) {
            console.log('Skipping fetch - not initialized or no query string');
            return;
        }
        
        setLoading(true);
        console.log('Fetching jobs with query:', queryString);
        
        try {
            router.replace(`/browse-jobs?${queryString}`, { scroll: false })

            const data = await getJobs(queryString);
            const newJobs = data?.data.jobs || data.data || [];
            
            console.log('Jobs fetched:', newJobs.length, 'jobs');
            setJobs(newJobs);
            setJobLength(data?.data.totalJobs || 0);
            setHasFetched(true);

        } catch (error: any) {
            console.error('Failed to fetch jobs:', error.message);
            setJobs([]);
            setJobLength(0);
            setHasFetched(true);
        } finally {
            setLoading(false);
        }
    }, [queryString, isInitialized]);

    // Fetch jobs when query changes
    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    // Intersection Observer for prefetching next page
    useEffect(() => {
        if (loading || !preloadRef.current || !isInitialized) return;

        const observer = new IntersectionObserver(
        async ([entry]) => {
            if (entry.isIntersecting) {
            const query = new URLSearchParams(searchParams.toString());
            query.set("page", (page + 1).toString());
            query.set("limit", pageSize.toString());
            
            try {
                await getJobs(query.toString());
                console.log('Prefetched next page');
            } catch (err) {
                console.error("Prefetch failed", err);
            }
            }
        },
        { threshold: 1.0 }
        );

        observer.observe(preloadRef.current);

        return () => {
        if (preloadRef.current) {
            observer.unobserve(preloadRef.current);
        }
        };
    }, [page, searchParams, loading, isInitialized, pageSize]);

    useEffect(() => {
        return () => {
          updateSearchParam.cancel();
        };
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const hasLocation = params.has("location");
        const hasCountry = params.has("country");

        if (hasLocation && hasCountry) {
            params.delete("country");
            setIsInitialized(true);
            router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
            return;
        }
        setIsInitialized(true);
    }, [page]);


    const handlePageSizeChange = useCallback((newPageSize: number) => {
        const currentIndex = (page - 1) * pageSize;
        const newPage = Math.max(1, Math.floor(currentIndex / newPageSize) + 1);
        
        setPageSize(newPageSize);
        setPage(newPage);
        
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        params.set("limit", newPageSize.toString());
        
        router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
    }, [page, pageSize, searchParams, router, setPage]);

    const scrollToSection = useCallback((ref: React.RefObject<HTMLElement | null>) => {
        if (!ref.current || !containerRef.current) return;
        const top = ref.current.offsetTop;
        containerRef.current.scrollTo({ top, behavior: 'smooth' });
    }, []);

    // Update search parameters with debouncing
    const rawUpdateSearchParam = useCallback((key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        setPage(1);

        // if (key === 'country' && !value) {
        //     // If removing country, check if we need to add default
        //     const hasOtherLocation = params.has('location');
        //     if (!hasOtherLocation) {
        //         // No other location filters, keep the default country
        //         params.set('country', 'United States');
        //     }
        // }

        router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
    }, [searchParams, router, setPage]);

    // Memoized debounced function
    const updateSearchParam = useMemo(
        () => debounce(rawUpdateSearchParam, 250),
        [rawUpdateSearchParam]
    );

    // Cleanup debounced function
    useEffect(() => {
        return () => {
        updateSearchParam.cancel?.();
        };
    }, [updateSearchParam]);

    // Helper function to clear all location filters
    const clearLocationFilters = useCallback(() => {
        const params = new URLSearchParams(searchParams);
        params.delete('location');
        params.delete('country');
        params.delete('city');
        params.delete('state');
        
        // Add back default country
        params.set('country', 'United States');
        setPage(1);
        
        router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
    }, [searchParams, router, setPage]);

    const openJob = (job: JobProps) => {
        setSelectedJob(job)
    }

    const closeDrawer = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("id");
        const pageFromURL = Number(searchParams.get("page") || 1);
        setPage(pageFromURL);
        router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
        setSelectedJob(null)
    }
    
  return (
    <div className='flex flex-col space-y-4'>
        <div className='bg-[#1B1E28] border border-[#363636] py-4 rounded-lg gap-y-2.5'>
            <JobBoardHeader page={page} setPage={setPage} location={location!} setLocation={setLocation} />
            <div className='py-4 max-sm:px-4 sm:px-6 w-full' ref={containerRef}>
                <div className='flex w-full justify-between items-center'>
                    <h1 className='font-medium leading-[33px] 2xl:text-[18px] max-2xl:text-[18px] max-md:text-[16px] max-sm:text-sm text-heading '>{jobLength} Jobs</h1>
                    <div className='flex sm:space-x-4 max-sm:space-x-2 items-center'>
                        <p className='max-sm:text-sm sm:text-[16px] 2xl:text-[18px] leading-6 text-start text-heading'>Sort by:</p>
                        <SortFilter />
                    </div>
                </div>
            </div>
            <div className='2xl:px-12 md:px-8 max-md:px-4 mt-2 cursor-pointer'>
                {loading ? (
                    <div className='space-y-4'>
                        {Array.from({ length: 10 }).map((_, i) => <JobCardSkeleton key={i} />)}
                    </div>
                    ) : jobs.length > 0 ? (
                    jobs.map((job:JobProps, index) => {
                        const slug = generateJobSlug(job.title, job.companyName!, job.country, job.id);

                        return (
                            <JobCard
                                    key={index}
                                    job={job}
                                    hasBorder={index !== jobs.length - 1}
                                    onClick={() => {
                                        // openJob(job)
                                        // updateSearchParam("id", job.id.toString())
                                        // router.push(`/browse-jobs/${slug}`);
                                    }}
                                    slug={`/browse-jobs/${slug}`}
                                    setOpenShareModal={setOpenShareModal}
                            />
                        )
                    })
                    ): hasFetched ? (
                        <h1 className='text-heading text-[18px] py-4 text-center'>No jobs found</h1>
                    ) : null
                }
            </div>
            {/* {selectedJob && <JobDrawer job={selectedJob} onClose={closeDrawer} />} */}
        </div>

        {/* <button
            disabled={loading}
            onClick={(e) => {
                e.preventDefault()
                setPage((prev: any) => prev + 1)
            }}
            className='w-full p-0.5 rounded-sm border-primary border bg-transparent text-primary text-[14px] text-center py-3 hover:bg-primary hover:text-[#101217] hover:font-medium cursor-pointer'
        >
            {loading ? "Loading..." : "Load More"}
        </button> */}

        {!loading && jobs.length > 0 && (
            <Pagination 
                totalItems={jobLength}
                currentPage={page}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
                scrollToSection={() => scrollToSection(containerRef)}
            />
        )}

        {openShareModal && (
            <ShareModal
                job={openShareModal}
                onClose={() => {
                setOpenShareModal(null);
                }}
            />
        )}
    </div>
  )
}

export default JobBoard