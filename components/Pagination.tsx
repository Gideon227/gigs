"use client";
import React, { useMemo, useCallback, useState } from 'react';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useSearchParams, useRouter } from 'next/navigation';

import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

interface Props {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    pageSizeOptions?: number[];
    maxPageButtons?: number;
    scrollToSection: () => void
}
const Pagination: React.FC<Props> = React.memo(({
    totalItems,
    currentPage,
    pageSize,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [10, 25, 50],
    maxPageButtons = 5,
    scrollToSection
  })  => {
    const [open, setOpen] = useState<boolean>(false)
    const totalPages = useMemo(() => Math.ceil(totalItems / pageSize), [totalItems, pageSize]);

    const searchParams = useSearchParams();
    const router = useRouter();

    const pageButtons = useMemo(() => {
        const pages: (number | "...")[] = [];
        const half = Math.floor(maxPageButtons / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);
    
        if (end - start + 1 < maxPageButtons) {
          if (start === 1) end = Math.min(totalPages, start + maxPageButtons - 1);
          else if (end === totalPages) start = Math.max(1, end - maxPageButtons + 1);
        }
    
        if (start > 1) {
          pages.push(1);
          if (start > 2) pages.push("...");
        }
    
        for (let p = start; p <= end; p++) pages.push(p);
    
        if (end < totalPages) {
          if (end < totalPages - 1) pages.push("...");
          pages.push(totalPages);
        }
    
        return pages;
    }, [currentPage, totalPages, maxPageButtons]);
    
    const handlePageClick = useCallback((p: number | "...") => {
        if (typeof p === "number" && p !== currentPage) {
            onPageChange(p);
            const params = new URLSearchParams(searchParams.toString());
            // if (p > 1) {
            //     params.set("page", p.toString());
            // } else {
            //     params.delete("page");
            // }
            params.set("page", p.toString());
            router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
            scrollToSection()
        }
    }, [currentPage, onPageChange, searchParams, router]);
    
    // const resultsFrom = useMemo(() => (currentPage - 1) * pageSize + 1, [currentPage, pageSize]);
    // const resultsTo = useMemo(() => Math.min(totalItems, currentPage * pageSize), [currentPage, pageSize, totalItems]);
    
    const handleSelect = (size: number, e: React.FormEvent) => {
        e.preventDefault()
        setOpen(false);

        onPageChange(1);
        onPageSizeChange(size);

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1");
        params.set("pageSize", size.toString());

        router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
        scrollToSection();
    }
  return (
    <div className='flex items-center justify-between w-full space-y-2 md:space-y-0'>
        {/* Page Size Dropdown */}
        <div className='flex space-x-4 items-center justify-between max-lg:hidden w-full px-4'>
            <div className='flex items-center space-x-4'>
                <h1 className='text-heading text-[16px] font-medium'>Jobs Per Page:</h1>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <div className='px-4 py-2 border-gray border cursor-pointer rounded-lg flex space-x-2 items-center justify-between date_overlay'>
                            <p className='text-paragraph text-sm'>{pageSize}</p>
                            <Image src='/arrow-down.svg' width={14} height={14} alt='arrow down icon'/>
                        </div>
                    </PopoverTrigger>

                    <PopoverContent className='w-auto p-0 border-none'>
                        <div className='bg-[#101217] px-4 py-3 border-[#363636] border rounded-xl date_overlay min-w-[240px]'>
                        {pageSizeOptions.map((size, index) => (
                            <option 
                                key={size} 
                                onClick={(e) => handleSelect(size, e)}
                                value={size} 
                                className={`py-4 cursor-pointer text-[#F8F6F0] text-sm leading-6 ${index !== pageSizeOptions.length - 1 ? 'border-b border-[#363636]' : ""}`}>
                                {size}
                            </option>
                        ))}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Page Button */}
            <div className='flex space-x-1 items-center justify-end '>
                <button
                    disabled={currentPage <= 1}
                    className='text-heading disabled:opacity-50 cursor-pointer'
                    onClick={() => {
                        const newPage = currentPage - 1;
                        onPageChange(newPage);

                        const params = new URLSearchParams(searchParams.toString());
                        if (currentPage > 1) {
                            params.set("page", newPage.toString());
                        } else {
                            params.delete("page");
                        }
                        router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
                    }}
                >
                    <MdKeyboardArrowLeft size={18}/>
                </button>

                {pageButtons.map((p, i) =>
                    p === "..." ? (
                        <span key={`dots-${i}`} className="px-2 py-1 text-white ">…</span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => handlePageClick(p)}
                            className={`px-3 py-1 cursor-pointer text-white text-[14px] active:text-[15px] ${p === currentPage ? "border rounded-full border-white " : ""}`}
                        >
                        {p}
                        </button>
                    )
                )}

                <button
                    disabled={currentPage >= totalPages}
                    className='text-heading disabled:opacity-50 cursor-pointer'
                    onClick={() => {
                        const newPage = currentPage + 1;
                        onPageChange(newPage);

                        const params = new URLSearchParams(searchParams.toString());
                        if (currentPage > 1) {
                            params.set("page", newPage.toString());
                        } else {
                            params.delete("page");
                        }
                        router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
                    }}
                >
                    <MdKeyboardArrowRight size={18}/>
                </button>
            </div>            
        </div>

        {/* Page Button Mobile */}
        <div className='flex items-center justify-around mx-auto w-5/6 md:hidden'>
            <button
                disabled={currentPage <= 1}
                className='text-heading disabled:opacity-50'
                onClick={() => {
                    const newPage = currentPage - 1;
                    onPageChange(newPage);

                    const params = new URLSearchParams(searchParams.toString());
                    if (currentPage > 1) {
                        params.set("page", newPage.toString());
                    } else {
                        params.delete("page");
                    }
                    router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
                }}
            >
                <MdKeyboardArrowLeft size={18}/>
            </button>
            <h1 className='text-heading text-[16px] '>{currentPage} of {totalPages}</h1>

            <button
                disabled={currentPage >= totalPages}
                className='text-heading disabled:opacity-50'
                onClick={() => {
                    const newPage = currentPage + 1;
                    onPageChange(newPage);

                    const params = new URLSearchParams(searchParams.toString());
                    if (currentPage > 1) {
                        params.set("page", newPage.toString());
                    } else {
                        params.delete("page");
                    }
                    router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
                }}
            >
                <MdKeyboardArrowRight size={18}/>
            </button>

        </div>
    </div>
  )
})

export default Pagination