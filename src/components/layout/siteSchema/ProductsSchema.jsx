import { Helmet } from "react-helmet-async";

const SITE_URL = "https://np.baltra.in";
const DEFAULT_IMAGE = `${SITE_URL}/images/baltraAllProductsBanner.png`;
const COLLECTION_URL = `${SITE_URL}/baltra-allProducts`;

const toAbsoluteUrl = (value) => {
  if (!value) return undefined;
  if (value.startsWith("http")) return value;
  return `${SITE_URL}${value.startsWith("/") ? "" : "/"}${value}`;
};

const ProductsSchema = ({ products = [] }) => {
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${COLLECTION_URL}#collection`,
    name: "Baltra Products Nepal",
    description:
      "Explore the complete range of Baltra home and kitchen appliances available in Nepal.",
    url: COLLECTION_URL,
    inLanguage: "en",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
  };

  const validProducts = (Array.isArray(products) ? products : []).filter(
    (product) => product?.id && product?.name,
  );

  const itemListSchema =
    validProducts.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": `${COLLECTION_URL}#products`,
          name: "Baltra Products",
          numberOfItems: validProducts.length,
          itemListElement: validProducts.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: product.name,
            url: `${SITE_URL}/baltra-product-view/${product.id}`,
            image:
              toAbsoluteUrl(product.image || product.image_url) ||
              DEFAULT_IMAGE,
          })),
        }
      : null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(collectionPageSchema)}
      </script>

      {itemListSchema && (
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default ProductsSchema;
