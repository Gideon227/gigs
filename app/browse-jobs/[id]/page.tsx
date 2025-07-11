// app/job/[id]/page.tsx
import { notFound } from 'next/navigation';
import JobDrawerClient from '@/components/JobDrawerClient';
import { getJobById } from '@/libs/getJobById';
import type { JobProps } from '@/constants/Jobs';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const getJob = await getJobById(id)
  const job = getJob.data

  console.log(job)
  if (!job) notFound()

  return (
    <div className="px-4 pt-6 pb-12">
      <JobDrawerClient job={job} />
    </div>
  )
}

export default page
