// app/job/[id]/page.tsx
import { notFound } from 'next/navigation';
import JobDrawerClient from '@/components/JobDrawerClient';
import { getJobById } from '@/libs/getJobById';
import type { JobProps } from '@/constants/Jobs';

export default async function Page({ params }: { params: { id: string } }) {
  const job = await getJobById(params.id)
  if (!job) notFound()

  return (
    <div className="px-4 pt-6 pb-12">
      <JobDrawerClient job={job.data} />
    </div>
  )
}
