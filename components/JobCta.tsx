"use client"
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const JobCta = () => {
    const [email, setEmail] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_CONTACT_BACKEND_URL}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, message }),
            });

            if (!res.ok) throw new Error("Failed to send");

            toast.success("Message sent successfully! We'll get back to you soon.", {
                style: { fontSize: "14px", background: "#101217", color: "#fff" },
            });

            setEmail("");
            setMessage("");
        } catch (error) {
            toast.error("Failed to send message", {
                style: { fontSize: "14px", background: "#101217", color: "#fff" },
            });
        } finally {
            setLoading(false);
        }
    };


  return (
    <div className='max-w-[1600px] mx-auto bg-[url(/cta-bg.png)] rounded-xl bg-cover max-md:bg-center'>
        <div className='py-16 px-40 items-center justify-center flex flex-col max-md:px-6 max-md:py-12'>
            <h2 className='text-center text-dark 2xl:text-[32px] max-2xl:text-[28px] leading-[48px] font-semibold'>How do you like Gigs.Tech? </h2>
            <p className='text-center text-[16px] max-md:text-[14px] leading-6 text-dark'>This isn&apos;t just another job site — we&apos;re building a community, and your feedback helps us shape it.</p>
        
            <div className='border-[1.5px] border-[#363636] my-6 rounded-lg bg-transparent w-full'>
                <input 
                    type='text' 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder='Enter your email'
                    className='text-[16px] py-2.5 max-2xl:text-[14px] leading-6 text-dark placeholder-[#4F4F4F] pl-4 outline-none'
                />
            </div>

            <div className='border-[1.5px] mb-6 border-[#363636] rounded-lg bg-transparent w-full'>
                <textarea 
                    rows={5}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    placeholder='Write us your message here...'
                    className='text-[16px] py-2.5 max-2xl:text-[14px] leading-6 text-dark placeholder-[#4F4F4F] pl-4 w-full outline-none'
                />
            </div>

            <button 
                disabled={loading}
                onClick={(e) => handleClick(e)} 
                className={`cursor-pointer font-semibold text-heading 2xl:text-[16px] max-2xl:text-[14px] leading-6 bg-dark w-full py-3 rounded-lg ${loading && 'opacity-85'}`}>
                    {loading ? 'Sending...' : 'Send'}
                </button>
        </div>
    </div>
  )
}

export default JobCta;