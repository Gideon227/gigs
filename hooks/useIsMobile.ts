import { useState, useEffect } from "react";

const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < breakpoint);
      };
  
      handleResize(); // initial check
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);
  
    return isMobile;
};

export default useIsMobile;
