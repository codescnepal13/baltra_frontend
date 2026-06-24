import { Helmet } from "react-helmet-async";

const SiteSchema = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Baltra Nepal",
    url: "https://np.baltra.in/",
    logo: "https://np.baltra.in/images/baltraLogo.png",
    foundingDate: "1994",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+977 980-1200505",
      contactType: "Customer Service",
      areaServed: "NP",
      availableLanguage: ["English", "Nepali"],
    },
    sameAs: [
      "https://www.facebook.com/BaltraHomeAppliancesNepal/",
      "https://www.instagram.com/baltra.nepal/",
      "https://np.linkedin.com/company/baltra-home-appliances-nepal",
    ],
  };

  const sitelinksSearchBox = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://np.baltra.in/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://np.baltra.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(sitelinksSearchBox)}
      </script>
    </Helmet>
  );
};

export default SiteSchema;
