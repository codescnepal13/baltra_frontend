import { Helmet } from "react-helmet-async";

const SITE_NAME = "Baltra Nepal";
const SITE_URL = "https://np.baltra.in";
const DEFAULT_IMAGE = `${SITE_URL}/images/baltraAllProductsBanner.png`;
const DEFAULT_TITLE = "Baltra Nepal";
const DEFAULT_DESCRIPTION = "Shop Baltra products online in Nepal.";

const toAbsoluteUrl = (value) =>
  value?.startsWith("http") ? value : `${SITE_URL}${value || ""}`;

const MetaData = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords,
  image = DEFAULT_IMAGE,
  url,
  twitterCard = "summary_large_image",
  twitterSite = "@BaltraOfficial",
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  breadcrumbs,
  extraSchemas,
  noindex = false,
}) => {
  const canonicalUrl = url ? toAbsoluteUrl(url) : SITE_URL;
  const resolvedImage = toAbsoluteUrl(ogImage || image);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    name: title,
    description,
    url: canonicalUrl,
    image: resolvedImage,
    inLanguage: "en",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
  };

  const breadcrumbSchema =
    Array.isArray(breadcrumbs) && breadcrumbs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: toAbsoluteUrl(item.url),
          })),
        }
      : null;

  return (
    <Helmet>
      <html lang="en" />

      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={SITE_NAME} />

      {/* Robots */}
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:alt" content={ogTitle || title} />
      <meta property="og:url" content={ogUrl || canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={resolvedImage} />

      {/* WebSite Schema */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {/* WebPage Schema */}
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>

      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* Additional Schemas */}
      {extraSchemas?.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default MetaData;
