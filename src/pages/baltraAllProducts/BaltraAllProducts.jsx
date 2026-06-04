import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import MetaData from "../../components/layout/metaData/MetaData";
import { clearSearch } from "../../redux/features/product/productSlice";
import AllProductsBanner from "./allProductsBanner/AllProductsBanner";
import BaltraCategoryProducts from "./baltraCategory/BaltraCategoryProducts";
import BaltraCategoryBased from "./baltraCategory/baltraCategoryBased/BaltraCategoryBased";

const BaltraAllProducts = () => {
  const dispatch = useDispatch();

  const [searchState, setSearchState] = useState({
    query: "",
    filter: "",
    isActive: false,
  });

  const handleSearchChange = useCallback(({ query, filter, isActive }) => {
    setSearchState({ query, filter, isActive });
  }, []);

  const handleClearSearch = useCallback(() => {
    dispatch(clearSearch());
    setSearchState({ query: "", filter: "", isActive: false });
  }, [dispatch]);

  return (
    <>
      <MetaData
        title="Baltra Products | Best Kitchen & Home Appliances Collection"
        description="Explore the complete range of Baltra kitchen and home appliances, including blenders, cooktops, kettles, mixers, fans, and more."
        keywords="Baltra Products, Kitchen Appliances, Home Appliances, Blenders, Cooktops, Kettles, Mixers, Fans"
        image="https://www.baltra.com/images/baltraAllProductsBanner.png"
        url="https://www.baltra.com/baltra-allProducts"
        twitterCard="summary_large_image"
        twitterSite="@baltra"
        ogTitle="Baltra Products | Explore the Best Home & Kitchen Appliances"
        ogDescription="Browse Baltra's complete product catalog."
        ogImage="https://www.baltra.com/images/baltraAllProductsBanner.png"
        ogUrl="https://www.baltra.com/baltra-allProducts"
      />

      <AllProductsBanner
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        searchState={searchState}
      />

      {/* Hide category grid while search is active */}
      {!searchState.isActive && <BaltraCategoryProducts />}

      <BaltraCategoryBased searchState={searchState} />
    </>
  );
};

export default React.memo(BaltraAllProducts);
