"use client"
import { useState, useEffect } from 'react'

const useIsMobile = (breakpoint: number = 768) => {
    const [isMobile, setisMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setisMobile(window.innerWidth < breakpoint);
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, [breakpoint])

    return isMobile;
}

export default useIsMobile;
