import { Helmet } from "react-helmet-async";

const SITE_NAME = "Baltra Nepal";
const SITE_URL = "https://np.baltra.in";
const DEFAULT_IMAGE = `${SITE_URL}/images/baltraAllProductsBanner.png`;

// MetaData Component to manage per-page SEO data
const MetaData = ({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  url,
  twitterCard = "summary_large_image",
  twitterSite = "@BaltraOfficial",
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  breadcrumbs, // optional: [{ name: "Home", url: "/" }, { name: "Products", url: "/products" }]
}) => {
  const canonicalUrl = url || SITE_URL;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonicalUrl,
    image,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  const breadcrumbSchema = breadcrumbs && {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Baltra Nepal" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage || image} />
      <meta property="og:url" content={ogUrl || canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || image} />

      {/* Page-level JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default MetaData;
