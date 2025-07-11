// app/sitemap_jobs.xml/route.ts
import { NextResponse } from 'next/server'
import { getJobs } from '@/libs/getJobs'
import type { JobProps } from '@/constants/Jobs'

export async function GET() {
  const getJobsData = await getJobs("sort: -1")
  const jobs: JobProps[] = getJobsData.data

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${jobs
      .map((job) => {
        const jobUrl = `https://gigs.tech/job/${job.id}`
        const lastMod = new Date(job.createdAt).toISOString().split('T')[0]
        return `
          <url>
            <loc>${jobUrl}</loc>
            <lastmod>${lastMod}</lastmod>
          </url>
        `
      })
      .join('')}
  </urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
