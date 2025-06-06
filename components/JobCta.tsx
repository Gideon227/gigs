"use client"
import React, { useState } from 'react'

const JobCta = () => {
    const [email, setEmail] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            await wait(5000)
            
            console.log(email, message)
        } catch (error) {
            console.error(error)
        } finally{
            setLoading(false)
        }
    }

  return (
    <div className='max-w-[1600px] mx-auto bg-[url(/cta-bg.png)] rounded-xl bg-cover max-md:bg-center'>
        <div className='py-16 px-40 items-center justify-center flex flex-col max-md:px-6 max-md:py-12'>
            <h1 className='text-center text-dark 2xl:text-[32px] max-2xl:text-[28px] leading-[48px] font-semibold'>How do you like Gigs.Tech? </h1>
            <p className='text-center text-[16px] max-md:text-[14px] leading-6 text-dark'>This isn&apos;t just another job site — we&apos;re building a community, and your feedback helps us shape it.</p>
        
            <div className='border-[1.5px] border-[#363636] my-6 rounded-lg bg-transparent w-full'>
                <input 
                    type='text' 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder='Enter your email'
                    className='text-[16px] py-2.5 max-2xl:text-[14px] leading-6 text-[#4F4F4F] pl-4 outline-none'
                />
            </div>

            <div className='border-[1.5px] mb-6 border-[#363636] rounded-lg bg-transparent w-full'>
                <textarea 
                    rows={5}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    placeholder='Write us your message here...'
                    className='text-[16px] py-2.5 max-2xl:text-[14px] leading-6 text-[#4F4F4F] pl-4 w-full outline-none'
                />
            </div>

            <button 
                disabled={loading}
                onClick={(e) => handleClick(e)} 
                className={`font-semibold text-heading 2xl:text-[16px] max-2xl:text-[14px] leading-6 bg-dark w-full py-3 rounded-lg ${loading && 'opacity-85'}`}>
                    {loading ? 'Sending...' : 'Send'}
                </button>
        </div>
    </div>
  )
}

export default JobCta;