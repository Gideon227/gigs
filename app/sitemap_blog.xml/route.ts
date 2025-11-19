import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const BLOG_URL = "https://uximjvcbkz.blogbowl.app"; 
    const res = await fetch(BLOG_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" 
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch blog homepage, status:", res.status);
      return new NextResponse(generateEmptySitemap(), {
        headers: { "Content-Type": "application/xml" },
        status: 500,
      });
    }

    const html = await res.text();

    const pathRegex = /href=["'](?:https?:\/\/[^"']*)?\/posts\/([^"'\/\?]+)["']/g;
    
    const slugs = new Set<string>();
    let match;
    
    while ((match = pathRegex.exec(html)) !== null) {
      if (match[1]) {
        slugs.add(match[1]);
      }
    }

    console.log(`Found ${slugs.size} blog posts`); 

    const urls = Array.from(slugs)
      .map((slug) => {
        const loc = `https://gigs.tech/blog/posts/${slug}`;
        const lastMod = new Date().toISOString().split("T")[0];

        return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      })
      .join("\n");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });

  } catch (err) {
    console.error("Sitemap generation error:", err);
    return new NextResponse(generateEmptySitemap(), {
      headers: { "Content-Type": "application/xml" },
      status: 500,
    });
  }
}

function generateEmptySitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
}