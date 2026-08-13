import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://www.elysof.com";

type SEOProps = {
  title: string;
  description: string;
  path: string; // e.g. "/" or "/products"
  image?: string; // absolute or site-relative
  type?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function absUrl(p: string) {
  return p.startsWith("http") ? p : `${SITE_URL}${p}`;
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ElySof",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: "info@elysof.com",
  telephone: "+91-83697-29653",
  sameAs: ["https://www.instagram.com/elysof"],
};

export function breadcrumbSchema(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name, item: absUrl(path) },
    ],
  };
}

export function SEO({
  title,
  description,
  path,
  image = "/og/combo-pack.jpeg",
  type = "website",
  jsonLd,
}: SEOProps) {
  const url = absUrl(path);
  const img = absUrl(image);
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={img} />
      <meta property="og:site_name" content="ElySof" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(b)}
        </script>
      ))}
    </Helmet>
  );
}
