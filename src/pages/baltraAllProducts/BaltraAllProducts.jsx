import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../components/layout/metaData/MetaData";
import ProductsSchema from "../../components/layout/siteSchema/ProductsSchema";
import { clearSearch } from "../../redux/features/product/productSlice";
import AllProductsBanner from "./allProductsBanner/AllProductsBanner";
import BaltraCategoryProducts from "./baltraCategory/BaltraCategoryProducts";
import BaltraCategoryBased from "./baltraCategory/baltraCategoryBased/BaltraCategoryBased";

const BaltraAllProducts = () => {
  const dispatch = useDispatch();

  // adjust this path to match your actual productSlice state shape
  const allProducts = useSelector((state) => state.product.allProducts);

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
      {!searchState.isActive && <ProductsSchema products={allProducts} />}

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
