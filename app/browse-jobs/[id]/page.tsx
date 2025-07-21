// app/job/[id]/page.tsx
import { notFound } from 'next/navigation';
import JobDrawerClient from '@/components/JobDrawerClient';
import { getJobById } from '@/libs/getJobById';
import { getJobs } from '@/libs/getJobs';
import type { JobProps } from '@/constants/Jobs';

export async function getStaticPaths() {
  const jobs = await getJobs("limit=10000"); // all job IDs
  return {
    paths: jobs.map((job: JobProps) => ({ params: { id: job.id } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const jobId = id.split('-').slice(-5).join('-').toString();

  const job = await getJobById(jobId);
  return { props: { job } };
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
