'use client'

import { useRouter } from 'next/navigation'
import JobDrawer from '@/components/JobDrawer'
import type { JobProps } from '@/constants/Jobs'
import { AnimatePresence } from 'framer-motion'

export default function JobDrawerClient({ job }: { job: JobProps }) {
  const router = useRouter()

  const handleClose = () => {
    router.back()   
  }

  return (
    <AnimatePresence mode='wait'>
      <JobDrawer key={job?.id} job={job} onClose={handleClose} />
    </AnimatePresence>
  )
}
