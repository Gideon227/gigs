import { NextResponse } from "next/server";

export const config = {
  matcher: ["/blog/:path*", "/blog"],
};

export async function middleware(req: Request) {
  const url = new URL(req.url);
  const blogPath = url.pathname;

  const blogbowlUrl = `https://uximjvcbkz.blogbowl.app${blogPath}`;

  const externalRes = await fetch(blogbowlUrl, {
    headers: {
      "User-Agent": req.headers.get("User-Agent") || "",
      Accept: "text/html",
    },
  });

  if (!externalRes.ok) return NextResponse.next();

  let html = await externalRes.text();

  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : "GIGS TECH Blog";

  // Extract first paragraph as description
  const descMatch = html.match(/<p[^>]*>(.*?)<\/p>/i);
  const description = descMatch
    ? descMatch[1].replace(/<[^>]+>/g, "").slice(0, 160)
    : "Read the latest insights on Microsoft Power Platform, Dynamics 365, cloud engineering, and more.";

  const canonicalUrl = `https://gigs.tech${blogPath}`;

  const ogTags = `
    <link rel="canonical" href="${canonicalUrl}" />

    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="GIGS TECH" />

    <!-- You can replace this preview image -->
    <meta property="og:image" content="https://gigs.tech/og-blog.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter -->
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://gigs.tech/og-blog.png" />
  `;

  html = html
    .replace(/<meta[^>]+og:[^>]+>/gi, "")
    .replace(/<meta[^>]+twitter:[^>]+>/gi, "")
    .replace(/<link[^>]+canonical[^>]+>/gi, "");

  html = html.replace("</head>", `${ogTags}</head>`);

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
