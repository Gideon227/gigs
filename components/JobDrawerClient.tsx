'use client'

import { useRouter } from 'next/navigation'
import JobDrawer from '@/components/JobDrawer'
import type { JobProps } from '@/constants/Jobs'

export default function JobDrawerClient({ job }: { job: JobProps }) {
  const router = useRouter()

  const handleClose = () => {
    router.back()   
  }

  return <JobDrawer job={job} onClose={handleClose} />
}
