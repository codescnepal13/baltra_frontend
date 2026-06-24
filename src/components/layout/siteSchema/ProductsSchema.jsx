import { Helmet } from "react-helmet-async";

const ProductsSchema = ({ products = [] }) => {
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Baltra Products Nepal",
    description:
      "Complete catalog of Baltra home and kitchen appliances available in Nepal.",
    url: "https://np.baltra.in/baltra-allProducts",
  };

  // If product data is available, list real items for richer search results
  const itemListSchema = products.length
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
          url: `https://np.baltra.in/product/${product.slug}`,
          image: product.image,
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
