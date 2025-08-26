'use client'

import { useRouter } from 'next/navigation'
import JobDrawer from '@/components/JobDrawer'
import type { JobProps } from '@/constants/Jobs'
import { AnimatePresence } from 'framer-motion'
import { useNavigationStore } from '@/app/stores/useNavigationStore'

export default function JobDrawerClient({ job }: { job: JobProps }) {
  const router = useRouter()

  const { previousUrl } = useNavigationStore();

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
