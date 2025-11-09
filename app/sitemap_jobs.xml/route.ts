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
    const jobs: JobProps[] = getJobsData?.data || [];

    if (!jobs.length) {
      return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
        { headers: { 'Content-Type': 'application/xml' } }
      );
    }

    const urls = jobs
      .map((job) => {
        const slug = generateJobSlug(
          job.title,
          job.companyName!,
          job.country,
          job.state,
          job.city,
          job.id
        );
        const jobUrl = `https://gigs.tech/browse-jobs/${encodeURIComponent(slug)}`;
        const lastMod = new Date(job.createdAt).toISOString().split('T')[0];
        return `<url>
  <loc>${escapeXml(jobUrl)}</loc>
  <lastmod>${lastMod}</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.8</priority>
</url>`;
      })
      .join('\n');

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

    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;

    return new NextResponse(fallback, {
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}
