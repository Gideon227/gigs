import React from 'react'

const JobCardSkeleton = () => {
  return (
    <div className="animate-pulse w-full space-y-4 p-4 border border-gray-700 rounded-lg bg-[#1a1a1a] shadow-sm">
        <div className='flex items-start justify-between w-full '>
            <div className='space-y-4 w-3/4'>
                {/* Title */}
                <div className="h-5 bg-gray-600 rounded w-full"></div>

                {/* Company name */}
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>

                {/* Location + Type (2 small pills) */}
                <div className="flex space-x-2">
                    <div className="h-4 w-16 bg-gray-700 rounded-full"></div>
                    <div className="h-4 w-12 bg-gray-700 rounded-full"></div>
                </div>
            </div>
            <div className='space-y-4 w-1/4 flex flex-col items-end'>
                <div className="h-5 bg-gray-600 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            </div>
        </div>
      

      {/* Salary or tags */}
      <div className="flex space-x-2 mt-2">
        <div className="h-4 w-20 bg-gray-700 rounded-full"></div>
        <div className="h-4 w-24 bg-gray-700 rounded-full"></div>
      </div>

      {/* Apply button or action */}
      <div className="h-10 w-24 bg-gray-800 rounded-md mt-4"></div>
    </div>
  )
}

export default JobCardSkeleton