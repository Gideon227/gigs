"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';
import { FaWhatsapp, FaFacebookF, FaRegClipboard, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { PiLinkSimpleLight } from "react-icons/pi";
import { createPortal } from 'react-dom';
import { JobProps } from '@/constants/Jobs';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { generateJobSlug } from '@/utils/generateSlug';

const truncateText = (text: string, wordLimit: number) => {
   const words = text.trim().split(/\s+/);
   if (words.length <= wordLimit) return text;
   return words.slice(0, wordLimit).join(' ') + '...';
};
  
interface ShareModalProps {
  job: JobProps;
  onClose: () => void;
}

const ShareModal = ({ job, onClose }: ShareModalProps) => {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString());

  useEffect(() => setMounted(true), []);
  const slug = generateJobSlug(job.title, job.companyName!, job.country, job.id);

  const displayLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/browse-jobs/${slug}`;
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(displayLink)}`;
  const twitterLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(displayLink)}&hashtags=gigs-tech`;
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(displayLink)}`;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center px-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        <motion.div
          className="bg-[#101217] max-md:overflow-y-scroll rounded-lg w-full max-w-[750px] py-8 px-10 max-md:px-4 border border-[#363636] relative space-y-6"
          initial={{ y: "50%", opacity: 0 }}
          animate={{ y: "0", opacity: 1 }}
          exit={{ y: "50%", opacity: 0 }}
        >
          <div className="flex items-center justify-between space-x-4">
            <h1 className="text-[27px] max-md:text-[18px] font-medium max-md:font-semibold text-heading">Share {job.title}</h1>
            <button onClick={onClose} className="text-paragraph cursor-pointer">
              <RxCross2 size={24} />
            </button>
          </div>

          <div className='flex space-x-6 max-sm:space-x-3 items-start'>
            <img src={job.companyLogo ? job.companyLogo : "/symbol.png"} alt='company&apos;s logo' className={`w-12 h-12 rounded-full p-2 object-contain ${job.companyLogo ? "bg-white" : "bg-transparent"}`}/>
            <div className='flex flex-col text-start'>
                <h1 className='font-medium text-heading text-[18px] max-md:text-[16px]'>{job.companyName?.toUpperCase()}</h1>
                <h1 className='text-paragraph text-[16px] space-y-6 max-md:space-y-4 max-md:text-[14px]'>
                    {job.title}
                    <div className='flex flex-wrap items-center -ml-2'>
                        {job.skills.slice(0, 10).map((item, index) => (
                            <div key={item} className={`flex items-center h-3 mt-2 ${index !== job.skills.length - 1 && "border-r-1 border-paragraph"}`}>
                              <p className={`text-[14px] max-md:text-[12px] font-light text-paragraph text-wrap px-2 `}>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
                            </div>
                        ))}
                    </div>
                </h1>
            </div>
          </div>

          <p className="text-[16px] max-md:text-[14px] max-md:leading-6 font-normal mb-4 text-paragraph leading-6">{truncateText(job.description, 36)}</p>
          
          <div className="flex justify-around max-md:justify-between max-md:pt-2 max-md:px-4">
            <button 
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(displayLink)}`, '_blank')} 
              className="rounded-lg md:border-[#363636] md:min-w-32 max-md:min-w-12 md:border flex flex-col space-y-2 max-md:space-y-1 items-center justify-center bg-transparent md:p-4 cursor-pointer">
              <FaLinkedinIn color="white" size={20} />
              <p className='text-[14px] max-md:text-[12px] text-heading leading-7 text-nowrap'>LinkedIn</p>
            </button>

            <button 
              onClick={() => window.open(whatsappLink, '_blank')} 
              className="rounded-lg md:border-[#363636] md:min-w-32 max-md:min-w-12 md:border flex flex-col space-y-2 max-md:space-y-1 items-center justify-center bg-transparent md:p-4 cursor-pointer">
                <FaWhatsapp color="white" size={20} />
                <p className='text-[14px] max-md:text-[12px] text-heading leading-7 text-nowrap'>WhatsApp</p>
            </button>

            <button 
              onClick={async () => {
                await navigator.clipboard.writeText(displayLink)
                toast.success(`Successfully copied job url link`, {
                  style: {
                    fontSize: "14px",
                    background: "#101217",
                    color: "#fff"
                  }
                })
              }} 
              className="rounded-lg md:border-[#363636] md:min-w-32 max-md:min-w-12 md:border flex flex-col space-y-2 max-md:space-y-1 items-center justify-center bg-transparent md:p-4 cursor-pointer">
              <FaRegClipboard color="white" size={20} />
              <p className='text-[14px] max-md:text-[12px] text-heading leading-7 text-nowrap'>Copy Link</p>
            </button>

            <button 
              onClick={() => window.open(twitterLink, '_blank')} 
              className="rounded-lg md:border-[#363636] md:min-w-32 max-md:min-w-12 md:border flex flex-col space-y-2 max-md:space-y-1 items-center justify-center bg-transparent md:p-4 cursor-pointer">
                <FaXTwitter color="white" size={18} />
                <p className='text-[14px] max-md:text-[12px] text-heading leading-7 text-nowrap'>Twiter</p>
            </button>

            {/* <button 
              onClick={() => window.open(facebookLink, '_blank')} 
              className="rounded-lg md:border-[#363636] md:min-w-32 max-md:min-w-12 md:border flex flex-col space-y-2 max-md:space-y-1 items-center justify-center bg-transparent md:p-4 cursor-pointer">
              <FaFacebookF color="white" size={20} />
              <p className='text-[14px] max-md:text-[12px] text-heading leading-7 text-nowrap'>Facebook</p>
            </button> */}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

export default ShareModal