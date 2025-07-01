import React from "react";
import MetaData from "../../components/layout/metaData/MetaData";
import AllProductsBanner from "./allProductsBanner/AllProductsBanner";
import BaltraCategoryProducts from "./baltraCategory/BaltraCategoryProducts";
import BaltraCategoryBased from "./baltraCategory/baltraCategoryBased/BaltraCategoryBased";

const BaltraAllProducts = () => {
  return (
    <>
      <MetaData
        title="Baltra Products | Best Kitchen & Home Appliances Collection"
        description="Explore the complete range of Baltra kitchen and home appliances, including blenders, cooktops, kettles, mixers, fans, and more. Designed for efficiency, durability, and innovation."
        keywords="Baltra Products, Kitchen Appliances, Home Appliances, Blenders, Cooktops, Kettles, Mixers, Fans, Best Home Appliances, Energy Efficient Appliances, Smart Kitchen Gadgets"
        image="https://www.baltra.com/images/baltraAllProductsBanner.png"
        url="https://www.baltra.com/baltra-allProducts"
        twitterCard="summary_large_image"
        twitterSite="@baltra"
        ogTitle="Baltra Products | Explore the Best Home & Kitchen Appliances"
        ogDescription="Browse Baltra's complete product catalog, featuring top-quality kitchen and home appliances designed for efficiency and performance."
        ogImage="https://www.baltra.com/images/baltraAllProductsBanner.png"
        ogUrl="https://www.baltra.com/baltra-allProducts"
      />

      <AllProductsBanner />
      <BaltraCategoryProducts />
      <BaltraCategoryBased />
    </>
  );
};

export default BaltraAllProducts;
