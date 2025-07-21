// app/job/[id]/page.tsx
import { notFound } from 'next/navigation';
import JobDrawerClient from '@/components/JobDrawerClient';
import { getJobById } from '@/libs/getJobById';
import { getJobs } from '@/libs/getJobs';
import type { JobProps } from '@/constants/Jobs';

import { Metadata } from 'next';

export async function generateStaticParams() {
  const jobs = await getJobs("limit=1000");

  return jobs.map((job: JobProps) => ({
    id: job.id, 
  }));
}

// Optional: SEO Metadata (recommended)
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const job = await getJobById(params.id);
  return {
    title: `${job.title} at ${job.company}`,
    description: job.description.slice(0, 160),
    robots: 'index, follow',
    alternates: {
      canonical: `https://test.gigs.tech/browse-jobs/${job.id}`,
    },
  };
}



const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const jobId = id.split('-').slice(-5).join('-').toString();

  const getJob = await getJobById(jobId!)
  const job = getJob.data

  if (!job) notFound()

  return (
    <div className="px-4 pt-6 pb-12">
      <JobDrawerClient job={job} />
    </div>
  )
}

export default page
