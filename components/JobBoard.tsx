"use client"
import React, { useState, useEffect, useMemo, useRef, useLayoutEffect, useCallback } from 'react';
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
}

const JobBoard = ({ page, setPage }: Props ) => {
    const [selectedJob, setSelectedJob] = useState<JobProps | null>(null)
    const searchParams = useSearchParams();

    const router = useRouter();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [jobLength, setJobLength] = useState<number>(0);
    // const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [countryReady, setCountryReady] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);


    const [openShareModal, setOpenShareModal] = useState<JobProps | null>(null)
    const id = searchParams.get("id");

    const preloadRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const queryString = useMemo(() => {
        const params = new URLSearchParams(searchParams.toString());
        // params.delete("id"); 
        
        params.set("page", page.toString());
        params.set("limit", pageSize.toString());
        
        return params.toString();
    }, [searchParams, page, pageSize]);

    // const queryString = searchParams.toString();

    useEffect(() => {
        if (!id) {
            setSelectedJob(null);
            return;
        }

        let cancelled = false;
        (async () => {
        try {
            const job = await getJobById(id);
            if (!cancelled) setSelectedJob(job.data);
        } catch (err) {
            console.error('Failed to load job by ID', err);
            if (!cancelled) setSelectedJob(null);
        }
        })();
        return () => { cancelled = true };
    }, [id]);


    const fetchJobs = async () => {
        const params = new URLSearchParams(searchParams.toString());
        setLoading(true); 
        console.log(queryString)
        
        try {
            const data = await getJobs(queryString);
            const newJobs = data?.data.jobs || data.data || [];
            console.log(data)
            setJobs(newJobs);
            setJobLength(data?.data.totalJobs)
            setHasFetched(true);
        } catch (error: any) {
            console.log(error.message)
            if (page === 1) setJobs([])
            setJobLength(0)
            setHasFetched(true);
        } finally {
            setLoading(false);
        }   
    };
    
    useEffect(() => {
        if (!countryReady) return;
        fetchJobs();
    }, [searchParams.toString(), countryReady, pageSize]);


    useEffect(() => {
        if (loading || !preloadRef.current) return;
      
        const observer = new IntersectionObserver(
          async ([entry]) => {
            if (entry.isIntersecting) {
              const query = new URLSearchParams(searchParams.toString());
              query.set("page", (page + 1).toString());
              query.set("limit", pageSize.toString());
              try {
                await getJobs(query.toString());
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
    }, [page, searchParams, loading]);
      
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
            setCountryReady(true);
            router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
            return;
        }

        if (!hasLocation && !hasCountry) {
            params.set("country", "United States");
            router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
            return;
        }

        setCountryReady(true);
    }, [searchParams.toString(), page]);


    useEffect(() => {
        if (searchParams.get("country")) {
            setCountryReady(true);
        } else {
            setCountryReady(false);
        }
    }, [searchParams]);

    const scrollToSection = useCallback((ref: React.RefObject<HTMLElement | null>) => {
        if (!ref.current || !containerRef.current) return;
        const top = ref.current.offsetTop;
        containerRef.current.scrollTo({ top, behavior: 'smooth' });
    }, []);
    
    const rawUpdateSearchParam = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams);
    
        if (value) {
        params.set(key, value);
        } else {
        params.delete(key);
        }
    
        setPage(1);
        // params.set("page", "1");
        router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
    };
    
    // Memoized debounced function
    const updateSearchParam = useMemo(
        () => debounce(rawUpdateSearchParam, 250),
        [searchParams]
    );

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
            <JobBoardHeader page={page} setPage={setPage}/>
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