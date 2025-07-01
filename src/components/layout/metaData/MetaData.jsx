import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

// MetaData Component to manage SEO data
const MetaData = ({
  title,
  description,
  keywords,
  image,
  url,
  twitterCard = "summary_large_image",
  twitterSite = "@baltra",
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: url,
    image: image,
    publisher: {
      "@type": "Organization",
      name: "Baltra",
      logo: {
        "@type": "ImageObject",
        url: "https://www.baltra.com/images/logo.png",
      },
    },
  };

  // JSON-LD for Sitelinks Search Box
  const sitelinksSearchBox = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.baltra.com/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.baltra.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <HelmetProvider>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Baltra" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={url} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={ogTitle || title} />
        <meta
          property="og:description"
          content={ogDescription || description}
        />
        <meta property="og:image" content={ogImage || image} />
        <meta property="og:url" content={ogUrl || url} />
        <meta property="og:site_name" content="Baltra" />

        {/* Twitter */}
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:site" content={twitterSite} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(sitelinksSearchBox)}
        </script>
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaData;
