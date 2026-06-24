import { Helmet } from "react-helmet-async";

const AboutSchema = () => {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Baltra Nepal",
    url: "https://np.baltra.in/about-us",
    mainEntity: {
      "@type": "Organization",
      name: "Baltra Nepal",
      url: "https://np.baltra.in/",
      foundingDate: "1994",
      foundingLocation: {
        "@type": "Place",
        name: "Kathmandu, Nepal",
      },
      description:
        "Baltra is Nepal's original home appliance brand, founded in 1994, known for kitchen, electrical, and glassware products before later expanding into Indian markets.",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(aboutPageSchema)}
      </script>
    </Helmet>
  );
};

export default AboutSchema;
