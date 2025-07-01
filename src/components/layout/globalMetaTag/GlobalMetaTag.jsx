import React from "react";
import { Helmet } from "react-helmet-async";

const GlobalMetaTag = () => {
  return (
    <>
      <Helmet>
        <title>Baltra Home Appliances - Innovation for Modern Living</title>
        <meta
          name="description"
          content="Baltra Home Appliances offers a wide range of innovative, high-quality, and affordable kitchen and home solutions designed to enhance your daily life."
        />
        <meta
          name="keywords"
          content="Baltra, home appliances, kitchen appliances, innovative appliances, modern home solutions, Baltra products, affordable appliances, quality appliances"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Baltra Home Appliances - Innovation for Modern Living" />
        <meta
          property="og:description"
          content="Explore Baltra's range of innovative home and kitchen appliances crafted for convenience and style."
        />
        <meta property="og:image" content="/images/baltraAllProductsBanner.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://baltra.com" />
        <meta
          property="og:site_name"
          content="Baltra Home Appliances - Innovation for Modern Living"
        />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Baltra Home Appliances - Innovation for Modern Living"
        />
        <meta
          name="twitter:description"
          content="Discover Baltra's innovative and affordable home appliances that bring style and convenience to your everyday life."
        />
        <meta name="twitter:image" content="/images/baltraLogo.png" />
        <meta name="twitter:site" content="@BaltraHome" />
        <meta name="twitter:creator" content="@BaltraHome" />
      </Helmet>
    </>
  );
};

export default GlobalMetaTag;
