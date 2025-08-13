// app/sitemap_jobs.xml/route.ts
import { NextResponse } from 'next/server'
import { getJobs } from '@/libs/getJobs'
import type { JobProps } from '@/constants/Jobs'

export async function GET() {
  try {
    const getJobsData = await getJobs("sort=-createdAt&limit=1000000")
    const jobs: JobProps[] = getJobsData.data

    if (!jobs || jobs.length === 0) {
      const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      </urlset>`
      
      return new NextResponse(emptySitemap, {
        headers: {
          'Content-Type': 'application/xml',
        },
      })
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${jobs
        .map((job) => {
          const jobUrl = `https://gigs.tech/browse-jobs/${job.id}`
          const lastMod = new Date(job.createdAt).toISOString().split('T')[0]
          return `
            <url>
              <loc>${jobUrl}</loc>
              <lastmod>${lastMod}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>
            </url>
          `
        })
        .join('')}
    </urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', 
      },
    })
  } catch (error) {
    console.error('Error generating jobs sitemap:', error)
    
    // Return empty sitemap on error to prevent build failure
    const errorSitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    </urlset>`
    
    return new NextResponse(errorSitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }

}
