"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import JobSidebar from "./JobSidebar";
import { getLocationSuggestions } from "@/libs/getLocation";

interface Props {
  page: number;
  setPage: (value: any) => void;
  location: string | null;
  setLocation: React.Dispatch<React.SetStateAction<string | null>>;
}

const JobBoardHeader = ({ page, setPage, location, setLocation }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 🔍 Debounced location search
  useEffect(() => {
    if (!location?.trim()) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const data = await getLocationSuggestions(location);
        setSuggestions(data || []);
      } catch (error) {
        console.error("Suggestion fetch failed:", error);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [location]);

  // 🔒 Close suggestions if input is empty
  useEffect(() => {
    if (!location?.trim()) setShowSuggestions(false);
  }, [location]);

  // 🖱️ Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🧭 Search handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const params = new URLSearchParams(searchParams.toString());
    keyword.trim() ? params.set("keyword", keyword.trim()) : params.delete("keyword");

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
    params.set("sort", "-postedDate");
    setPage(1);

    router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });

    setTimeout(() => setLoading(false), 200);
  };

  // 🔒 Disable background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = openModal ? "hidden" : "";
  }, [openModal]);

  return (
    <div className="space-y-2 border-b border-[#363636] pb-3">
      <form
        onSubmit={handleSubmit}
        className="flex max-md:flex-col max-md:space-y-2 my-2 md:px-10 max-md:px-4"
      >
        {/* 🔎 Keyword search */}
        <div className="w-full border border-[#363636] bg-[#101217] py-1 max-md:py-3 md:rounded-s-lg max-md:rounded-lg flex items-center">
          <Image
            src="/Rounded Magnifer.svg"
            width={20}
            height={20}
            alt="Search icon"
            className="ml-4 shrink-0"
          />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search job title or keyword..."
            className="bg-transparent outline-none text-[#808080] w-full ml-3 text-sm md:text-base placeholder-[#7E7E7E]"
          />
        </div>

        {/* 📍 Location search */}
        <div
          ref={containerRef}
          className="relative w-full border border-[#363636] bg-[#101217] py-1 max-md:py-3 md:rounded-e-lg max-md:rounded-lg flex items-center justify-between"
        >
          <Command shouldFilter={false} className="bg-transparent border-none flex-1">
            <CommandInput
              placeholder="Enter city, state, zip, or country"
              value={location || ""}
              onValueChange={(val) => {
                setLocation(val);
                setShowSuggestions(true);
              }}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              className="bg-transparent border-none focus:ring-0 text-[#808080] w-full ml-4 text-sm md:text-base placeholder-[#7E7E7E]"
            />

            {showSuggestions && suggestions.length > 0 && (
              <CommandList className="absolute top-full left-0 right-0 bg-[#101217] border border-[#363636] rounded-b-lg max-h-60 overflow-y-auto z-50">
                <CommandGroup>
                  {suggestions.map((item: any, index) => (
                    <CommandItem
                      key={index}
                      value={item.display_name}
                      onSelect={(val) => {
                        setLocation(val);
                        setShowSuggestions(false);
                      }}
                      className="text-white text-[14px]"
                    >
                      {item.display_name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            )}

            {showSuggestions && suggestions.length === 0 && (
              <CommandEmpty className="absolute top-full left-0 right-0 bg-[#101217] border border-[#363636] rounded-b-lg text-[#7E7E7E] text-sm py-3 text-center">
                No locations found
              </CommandEmpty>
            )}
          </Command>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary flex-shrink-0 whitespace-nowrap rounded-lg py-2 px-4 font-semibold text-dark cursor-pointer text-sm md:text-base mr-2"
          >
            {loading ? "Searching..." : "Find Jobs"}
          </button>
        </div>
      </form>

      {/* 📱 Advanced search toggle */}
      <button
        disabled={loading}
        onClick={() => setOpenModal(true)}
        className="text-[16px] px-6 lg:hidden text-primary font-normal text-start py-2 cursor-pointer"
      >
        Advanced search
      </button>

      {/* 📱 Slide-up modal */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
            onClick={() => setOpenModal(false)}
            className="fixed inset-0 pointer-events-auto overflow-hidden flex z-40 h-screen"
          >
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setOpenModal(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-t-2xl overflow-x-hidden z-50 w-full pb-16 pt-10 bg-[#101217]"
            >
              <JobSidebar
                page={page}
                setPage={setPage}
                setOpenModal={setOpenModal}
                setLocation={setLocation}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobBoardHeader;
