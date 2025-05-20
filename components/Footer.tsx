import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#101217]'>
        <hr className='text-[#363636] bg-[#363636] w-full h-[1px] my-4'/>
        <div className='grid grid-cols-4 gap-16 max-lg:gap-10 px-12 py-24 max-md:grid-cols-3 max-md:px-6'>

            <div className='flex justify-start flex-col space-y-6 max-md:col-span-3'>
                <Image src='/logo.png' width={170} height={41} alt="Gigs logo"/>
                <p className='text-neutral text-sm leading-[21px]'>The only Microsoft Power Platform & Dynamics 365 job aggregator in the space.</p>
                <Link href='/' className='flex justify-start items-end'>
                    <Image src='/linkedin.png' width={28} height={28} alt="Linkedin logo"/>
                </Link>
            </div>

            {/* Footer item 2 */}
            <div className='flex justify-start flex-col space-y-6 col-span-1 max-md:space-y-5 max-md:mt-4'>
                <h2 className='text-primary text-[16px] font-semibold leading-[24px] max-md:text-[14px] max-md:font-medium'>COMPANY</h2>
                <div className=''>
                    <ul className='space-y-4'>
                        <li><Link href='/' className='text-neutral text-sm leading-[21px]'>Home</Link></li>
                        <li><Link href='/jobs' className='text-neutral text-sm leading-[21px]'>Browse Jobs</Link></li>
                        <li><Link href='/contact' className='text-neutral text-sm leading-[21px]'>Contact</Link></li>
                        <li><Link href='/about' className='text-neutral text-sm leading-[21px]'>About</Link></li>
                    </ul>
                </div>
            </div>

            {/* Footer item 3 */}
            <div className='flex justify-start flex-col space-y-6 col-span-1 max-md:space-y-5 max-md:mt-4'>
                <h2 className='text-primary text-[16px] font-semibold leading-[24px] max-md:text-[14px] max-md:font-medium'>RESOURCES</h2>
                <div className=''>
                    <ul className='space-y-4'>
                        <li><Link href='/term-of-use' className='text-neutral text-sm leading-[21px]'>Term of Use</Link></li>
                        <li><Link href='/privacy-policy' className='text-neutral text-sm leading-[21px]'>Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>

            {/* Footer item 4 */}
            <div className='flex justify-start flex-col space-y-6 col-span-1 max-md:space-y-5 max-md:mt-4'>
                <h2 className='text-primary text-[16px] font-semibold leading-[24px] max-md:text-[14px] max-md:font-medium'>HELP</h2>
                <div className=''>
                    <ul className='space-y-4'>
                        <li><Link href='/' className='text-neutral text-sm leading-[21px]'>Support</Link></li>
                    </ul>
                </div>
            </div>

        </div>

        <hr className='text-[#363636] bg-[#363636] w-6/7 h-[1px] mx-auto'/>

        <div className='flex justify-center items-center p-6'>
            <p className='text-center text-neutral text-sm leading-[21px] max-md:text-[1opx]'>{`© Copyright ${new Date().getFullYear()}, All Rights Reserved by Gigs.Tech`}</p>
        </div>  
    </div>
  )
}

export default Footer