import React from "react";
import { useSelector } from "react-redux";
import MetaData from "../../components/layout/metaData/MetaData";
import ProductsSchema from "../../components/layout/siteSchema/ProductsSchema";
import AllProductsBanner from "./allProductsBanner/AllProductsBanner";
import BaltraCategoryProducts from "./baltraCategory/BaltraCategoryProducts";

const PAGE_URL = "https://np.baltra.in/baltra-allProducts";

const BaltraAllProducts = () => {
  // adjust this path to match your actual productSlice state shape
  const allProducts = useSelector((state) => state.product.allProducts) || [];

  return (
    <>
      <MetaData
        title="Baltra Products in Nepal | Home & Kitchen Appliances | Baltra Nepal"
        description="Explore the complete range of Baltra home and kitchen appliances in Nepal. Browse kettles, rice cookers, fans and more with prices, features and warranty information."
        keywords="Baltra Nepal, Baltra products Nepal, Baltra home appliances, Baltra kitchen appliances, Baltra price in Nepal"
        url={PAGE_URL}
        ogTitle="Baltra Products in Nepal | Baltra Nepal"
        ogDescription="Browse the complete range of Baltra home and kitchen appliances available in Nepal."
        ogUrl={PAGE_URL}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Products", url: "/baltra-allProducts" },
        ]}
      />

      {/* Catalog schema for the full, unfiltered product list */}
      <ProductsSchema products={allProducts} />

      <AllProductsBanner />

      <BaltraCategoryProducts />
    </>
  );
};

export default React.memo(BaltraAllProducts);
