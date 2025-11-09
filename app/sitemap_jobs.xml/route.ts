// app/sitemap_jobs.xml/route.ts
import { NextResponse } from 'next/server';
import { getJobs } from '@/libs/getJobs';
import type { JobProps } from '@/constants/Jobs';
import { generateJobSlug } from '@/utils/generateSlug';

function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  try {
    const getJobsData = await getJobs('sort=-createdAt&limit=1000000');
    const jobs: JobProps[] = getJobsData?.data.jobs || [];

    const urls = jobs
      .map((job) => {
        try {
          const slug = generateJobSlug(
            job.title,
            job.companyName || '',
            job.country,
            job.state || '',
            job.city || '',
            job.id
          );
          const jobUrl = `https://gigs.tech/browse-jobs/${encodeURIComponent(slug)}`;
          const lastMod = new Date(job.createdAt).toISOString().split('T')[0];
          
          return `  <url>
    <loc>${escapeXml(jobUrl)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
        } catch (error) {
          console.error('Error generating URL for job:', job.id, error);
          return null;
        }
      })
      .filter(Boolean) // Remove any null entries
      .join('\n');

    // Build sitemap with proper structure
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating jobs sitemap:', error);

    // Return a valid empty sitemap on error
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

    return new NextResponse(fallback, {
      headers: { 'Content-Type': 'application/xml' },
      status: 500,
    });
  }
}