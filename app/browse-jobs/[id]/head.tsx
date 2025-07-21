import { getJobById } from '@/libs/getJobById'
import type { JobProps } from '@/constants/Jobs'

export default async function Head ({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const getJobs = await getJobById(id)
  const job: JobProps | null = getJobs.data;
  if (!job) {
    return (
      <>
        <title>Job not found – GIGS.TECH</title>
        <meta name="robots" content="noindex" />
      </>
    )
  }

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: `<p>${job.description}</p>`,
    identifier: {
      "@type": "PropertyValue",
      name: "GIGS.TECH",
      value: job.id
    },
    datePosted: job.postedDate,
    employmentType: job.workSettings,
    hiringOrganization: {
      "@type": "Organization",
      name: job.companyName,
      logo: job.companyLogo
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.city,
        addressRegion: job.state,
        addressCountry: job.country
      }
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: job.currency,
      value: {
        "@type": "QuantitativeValue",
        value: job.salary,
        unitText: "YEAR"
      }
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: job.location || job.country
    },
    jobLocationType: job.jobType,
    directApply: true
  }

  return (
    <>
      <title>{`${job.title} at ${job.companyName} | GIGS.TECH`}</title>
      <meta name="robots" content="index, follow" />
      <meta name="description" content={job.description.slice(0, 160)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
