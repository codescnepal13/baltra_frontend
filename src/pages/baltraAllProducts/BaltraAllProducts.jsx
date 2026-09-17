import React from "react";
import { useSelector } from "react-redux";
import MetaData from "../../components/layout/metaData/MetaData";
import ProductsSchema from "../../components/layout/siteSchema/ProductsSchema";
import AllProductsBanner from "./allProductsBanner/AllProductsBanner";
import BaltraCategoryProducts from "./baltraCategory/BaltraCategoryProducts";

const BaltraAllProducts = () => {
  // adjust this path to match your actual productSlice state shape
  const allProducts = useSelector((state) => state.product.allProducts);

  return (
    <>
      <MetaData
        title="Baltra Products Nepal | Kitchen & Home Appliances Price List"
        description="Browse the full range of Baltra products in Nepal — blenders, induction cooktops, rice cookers, water purifiers, kettles, mixers, fans, and more. Compare prices and find Baltra appliances near you."
        keywords="Baltra products Nepal, Baltra price in Nepal, Baltra appliances catalog, Baltra blender Nepal, Baltra induction cooktop Nepal, Baltra rice cooker Nepal, Baltra kettle Nepal, Baltra mixer grinder Nepal, Baltra fan Nepal, buy Baltra online Nepal"
        image="https://np.baltra.in/images/baltraAllProductsBanner.png"
        url="https://np.baltra.in/baltra-allProducts"
        ogTitle="Baltra Products Nepal | Full Appliance Catalog & Price List"
        ogDescription="Browse Baltra Nepal's complete product catalog — kitchen and home appliances at the best prices, available across Nepal."
        ogImage="https://np.baltra.in/images/baltraAllProductsBanner.png"
        ogUrl="https://np.baltra.in/baltra-allProducts"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Products", url: "/baltra-allProducts" },
        ]}
      />

      {/* Only emit the catalog schema for the full, unfiltered product list */}
      <ProductsSchema products={allProducts} />

      <AllProductsBanner />

      <BaltraCategoryProducts />
    </>
  );
};

export default React.memo(BaltraAllProducts);
