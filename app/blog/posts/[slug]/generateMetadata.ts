import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;

  const url = `https://uximjvcbkz.blogbowl.app/posts/${slug}`;
  const res = await fetch(url, { 
    cache: "no-store",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
  });

  if (!res.ok) return notFound();

  const html = await res.text();

  const getMeta = (target: string) => {
    const regex1 = new RegExp(`<meta[^>]+(?:property|name)=["']${target}["'][^>]+content=["']([^"']*)["']`, "i");
    const regex2 = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${target}["']`, "i");
    
    const match = html.match(regex1) || html.match(regex2);
    return match?.[1] ?? null;
  };

  // Extract OG metadata
  const title = getMeta("og:title") || getMeta("twitter:title") || getMeta("title");
  const desc = getMeta("og:description") || getMeta("description") || getMeta("twitter:description");
  const image = getMeta("og:image") || getMeta("twitter:image");
  const ogUrl = `https://gigs.tech/blog/posts/${slug}`;

  return {
    title: title ?? "Blog Post | GIGS.TECH",
    description: desc ?? "",
    alternates: {
      canonical: ogUrl,
    },
    openGraph: {
      title: title ?? "",
      description: desc ?? "",
      url: ogUrl,
      type: "article",
      images: image ? [{ url: image }] : [],
      siteName: "GIGS.TECH",
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? "",
      description: desc ?? "",
      images: image ? [image] : [],
    },
  };
}
