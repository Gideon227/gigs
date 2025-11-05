// app/job/[id]/page.tsx
import { notFound } from 'next/navigation';
import JobDrawerClient from '@/components/JobDrawerClient';
import { getJobById } from '@/libs/getJobById';
import { getJobs } from '@/libs/getJobs';
import type { JobProps } from '@/constants/Jobs';

import { Metadata } from 'next';

export async function generateStaticParams() {
  const jobs = await getJobs("limit=1000000");

  return jobs.data.jobs.map((job: JobProps) => ({
    id: job.id, 
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
   try {
    const { id } = await params; 
    const jobId = id.split('-').slice(-5).join('-').toString();
    
    const getJob = await getJobById(jobId);
    const job: JobProps = getJob?.data || getJob;
    
    if (!job) {
      return {
        title: 'Job Not Found | Gigs',
        description: 'The requested job could not be found.',
        robots: 'noindex, nofollow',
      };
    }
    
    return {
      title: `${job.title} at ${job.companyName}`,
      description: job.description?.slice(0, 160) || `${job.title} position at ${job.companyName}`,
      openGraph: {
        title: job.title,
        description: job.description,
        images: [
          {
            url: job.companyLogo!,
            width: 800,
            height: 600,
            alt: job.title
          }
        ],
        type: 'website'
      },
      robots: 'index, follow',
      alternates: {
        canonical: `https://gigs.tech/browse-jobs/${job.id}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Job | Gigs',
      description: 'Find your next opportunity.',
      robots: 'noindex, nofollow',
    };
  }
}

const Page = async ({params}: {params: Promise<{ id: string }>}) => {
  const { id } =  await params;
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

export default Page
