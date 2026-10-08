import { useEffect, useState } from "react";
import { FaSearch, FaTh, FaThList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import MetaData from "../../components/layout/metaData/MetaData";
import {
  baltraSearchProducts,
  clearProductError,
} from "../../redux/features/product/productSlice";
import AllProductsBanner from "../baltraAllProducts/allProductsBanner/AllProductsBanner";
import BaltraSearchCard from "./BaltraSearchCard";
import BaltraSearchSkeleton from "./BaltraSearchSkeleton";

const BaltraSearchProducts = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { isProcessing, error, baltraSearchProductsList } = useSelector(
    (state) => state.product,
  );

  // URL first (?q=fan), fallback to old navigate state
  const productName =
    searchParams.get("q") || location.state?.query?.product_name || "";

  const [view, setView] = useState("grid");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    dispatch(
      baltraSearchProducts({
        product_name: productName,
        sort_order: sortOrder,
      }),
    );
  }, [dispatch, productName, sortOrder]);

  useEffect(() => {
    if (error) dispatch(clearProductError());
  }, [dispatch, error]);

  const products = baltraSearchProductsList || [];

  return (
    <>
      <MetaData title="Baltra Search Products" />
      <AllProductsBanner />

      <section className="bg-[#FAFAFA] min-h-[60vh]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 2xl:px-24 py-6 sm:py-10">
          {/* Heading + toolbar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-medium text-gray-900 font-gothamNarrow break-words">
                {productName ? (
                  <>
                    Search results for{" "}
                    <span className="text-red-600">“{productName}”</span>
                  </>
                ) : (
                  "Search results"
                )}
              </h1>
              {!isProcessing && (
                <p className="text-sm text-gray-500 font-gothamNarrow mt-1">
                  {products.length}{" "}
                  {products.length === 1 ? "product" : "products"} found
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <select
                id="sort"
                name="sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                aria-label="Sort products"
                className="h-10 px-4 border border-gray-300 rounded-sm bg-white text-sm text-gray-900 font-gothamNarrow focus:outline-none focus:border-red-600 cursor-pointer"
              >
                <option value="">Sort By Featured</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>

              <div className="flex border border-gray-300 rounded-sm bg-white overflow-hidden">
                <button
                  type="button"
                  aria-label="Grid view"
                  aria-pressed={view === "grid"}
                  onClick={() => setView("grid")}
                  className={`h-10 w-10 flex items-center justify-center transition-colors ${
                    view === "grid"
                      ? "bg-red-600 text-white"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  <FaTh />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                  className={`h-10 w-10 flex items-center justify-center border-l border-gray-300 transition-colors ${
                    view === "list"
                      ? "bg-red-600 text-white"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  <FaThList />
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          {isProcessing ? (
            <BaltraSearchSkeleton view={view} />
          ) : products.length > 0 ? (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {products.map((item) => (
                <BaltraSearchCard key={item.id} item={item} view={view} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 bg-white border border-[#E4E4E4]">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <FaSearch className="text-red-600 text-2xl" />
              </div>
              <h2 className="text-lg font-medium text-gray-900 font-gothamNarrow">
                No products found
              </h2>
              <p className="text-sm text-gray-500 font-gothamNarrow mt-1 max-w-sm px-4">
                We couldn’t find anything for “{productName}”. Try a different
                keyword or check the spelling.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BaltraSearchProducts;
