import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch("https://uximjvcbkz.blogbowl.app/api/posts", {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch blog posts", await res.text());
      return new NextResponse(generateEmptySitemap(), {
        headers: { "Content-Type": "application/xml" },
        status: 500,
      });
    }

    const posts = await res.json();

    if (!Array.isArray(posts)) {
      console.error("Blog API returned unexpected format:", posts);
      return new NextResponse(generateEmptySitemap(), {
        headers: { "Content-Type": "application/xml" },
        status: 500,
      });
    }

    const urls = posts
      .map((post: any) => {
        const slug = post?.slug;

        if (!slug) return null;

        const loc = `https://gigs.tech/blog/posts/${slug}`;
        const lastMod = post.updatedAt || post.createdAt || new Date().toISOString();

        return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date(lastMod).toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      })
      .filter(Boolean)
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
