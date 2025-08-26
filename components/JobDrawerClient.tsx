'use client'

import { useRouter } from 'next/navigation'
import JobDrawer from '@/components/JobDrawer'
import type { JobProps } from '@/constants/Jobs'
import { AnimatePresence } from 'framer-motion'

export default function JobDrawerClient({ job, previousUrl }: { job: JobProps, previousUrl: string | null }) {
  const router = useRouter()
  

  const handleClose = () => {
    if (previousUrl) {
      router.replace(previousUrl); 
    } else {
      router.push('/browse-jobs'); 
    }
  };
  return (
    <AnimatePresence mode='wait'>
      <JobDrawer key={job?.id} job={job} onClose={handleClose} />
    </AnimatePresence>
  )
}
