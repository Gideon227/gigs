"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';
import clsx from 'clsx';
import useIsMobile from '@/hooks/useIsMobile';

const SkeletonLine = ({ width = 'w-full', height = 'h-4' }: { width?: string; height?: string }) => (
  <div className={clsx('bg-[#2c2c2c] rounded animate-pulse', width, height)} />
);

const JobDrawerSkeleton = () => {
  const isMobile = useIsMobile();

  const variants = {
    initial: isMobile ? { y: '100%' } : { x: '100%' },
    animate: isMobile ? { y: '0%' } : { x: '0%' },
    exit: isMobile ? { y: '100%' } : { x: '100%' },
  };

  return (
    <div className="fixed inset-0 z-50 flex w-full">
      <div className="flex-1 bg-black/60 backdrop-blur-sm" />

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ type: 'tween', duration: 0.25 }}
        variants={variants}
        className="fixed bottom-0 md:right-2 right-0 w-full md:w-3/4 h-full lg:rounded-t-3xl bg-[#1B1E28] z-50"
      >
        <div className="py-5 px-4 border-b-[#363636] border-b md:hidden flex justify-end items-center">
          <RxCross2 size={24} color="#fff" />
        </div>

        <div className="overflow-y-auto p-6 max-sm:p-5 h-full">
          <div className="max-md:hidden flex justify-between w-full items-center py-4 border-b border-[#363636]">
            <SkeletonLine width="w-20" height="h-5" />
            <SkeletonLine width="w-40" height="h-5" />
          </div>

          <div className="border-b border-[#363636] flex max-sm:flex-col justify-between md:py-8 max-md:py-4">
            <div className="space-y-2.5">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-[#2c2c2c] animate-pulse" />
                <SkeletonLine width="w-48" height="h-6" />
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                <SkeletonLine width="w-28" />
                <SkeletonLine width="w-28" />
                <SkeletonLine width="w-28" />
              </div>
            </div>

            <div className="flex items-center max-sm:justify-end mt-4 md:mt-0">
              <div className="w-10 h-10 bg-[#2c2c2c] rounded-lg animate-pulse" />
            </div>
          </div>

          <div className="py-8 w-full flex max-md:flex-col max-md:space-y-4 space-x-4 overflow-y-auto pb-24">
            <div className="md:w-3/5 max-md:w-full space-y-6">
              <SkeletonLine width="w-40" height="h-6" />
              <SkeletonLine width="w-full" />
              <SkeletonLine width="w-full" />
              <SkeletonLine width="w-2/3" />
              <SkeletonLine width="w-1/2" />
              <SkeletonLine width="w-3/4" />
            </div>

            <div className="md:w-2/5 max-md:w-full space-y-6">
              <div className="bg-[#151820] border border-gray p-6 rounded-2xl space-y-4">
                <SkeletonLine width="w-32" height="h-6" />
                <SkeletonLine width="w-24" height="h-4" />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="space-y-2">
                      <SkeletonLine width="w-28" height="h-4" />
                      <SkeletonLine width="w-16" height="h-3" />
                    </div>
                  ))}
                </div>

                <SkeletonLine width="w-full" height="h-10" />
                <SkeletonLine width="w-32" height="h-5" />
              </div>

              <div className="space-y-4">
                <SkeletonLine width="w-40" height="h-6" />
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-1 border-b border-[#363636] pb-4">
                    <SkeletonLine width="w-3/4" height="h-5" />
                    <SkeletonLine width="w-2/3" height="h-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JobDrawerSkeleton;
