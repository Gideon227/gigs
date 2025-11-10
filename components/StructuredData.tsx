import Script from 'next/script';

export default function StructuredData() {
  const jobPostingSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GIGS.TECH",
    "url": "https://gigs.tech",
    "description": "Find the latest Microsoft Power Platform & Dynamics 365 jobs worldwide",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://gigs.tech/browse-jobs?keyword={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GIGS.TECH",
    "url": "https://gigs.tech",
    "logo": "https://gigs.tech/logo.png",
    "description": "Microsoft Power Platform & Dynamics 365 job board",
    "sameAs": [
        "https://www.linkedin.com/company/gigs-dot-tech/"
    ]
  };

  return (
    <>
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSiteSchema) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}