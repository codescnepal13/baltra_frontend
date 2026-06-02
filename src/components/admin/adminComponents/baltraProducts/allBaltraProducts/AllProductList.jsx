import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import {
  FaEye,
  FaPencilAlt,
  FaPlusCircle,
  FaSearch,
  FaSyncAlt,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  allBaltraProducts,
  clearAdminError,
  deleteBaltraProduct,
  deleteMultipleProduct,
} from "../../../../../redux/features/admin/adminSlice";
import MetaData from "../../../../layout/metaData/MetaData";
import ProductPagination from "../../adminPagination/productPagination/ProductPagination";
import ProductDeleteModal from "../productDeleteModal/ProductDeleteModal";

const AllProductList = () => {
  const { loading, error, allProducts, dropdownCategories } = useSelector(
    (state) => state.admin,
  );
  const productPagination =
    useSelector((state) => state.admin.productPagination) || {};
  const { page, total_pages, results_per_page } = productPagination;
  const dispatch = useDispatch();
  const [selectedCategoryName, setSelectedCategoryName] = useState("All");
  const [searchProductName, setSearchProductName] = useState("");
  const [selectedProductsId, setSelectedProductsId] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allProductIds = allProducts.map((product) => product.id);
      setSelectedProductsId(allProductIds);
    } else {
      setSelectedProductsId([]);
    }
  };

  const handleSelectProduct = (event, id) => {
    if (event.target.checked) {
      setSelectedProductsId((prev) => [...prev, id]);
    } else {
      setSelectedProductsId((prev) => prev.filter((pid) => pid !== id));
    }
  };

  const handleMultipleDelete = () => {
    if (selectedProductsId.length > 0) {
      dispatch(
        deleteMultipleProduct({
          product_ids: selectedProductsId,
          enqueueSnackbar,
        }),
      ).then(() => {
        dispatch(allBaltraProducts(page));
      });
      setSelectedProductsId([]);
    }
  };

  const handleReset = () => {
    setSearchProductName("");
    setSelectedCategoryName("All");
    dispatch(allBaltraProducts({ page: 1 }));
    setSelectedProductsId([]);
  };

  const handleSearch = () => {
    dispatch(
      allBaltraProducts({
        name: searchProductName,
        category_name:
          selectedCategoryName === "All" ? "" : selectedCategoryName,
        page: 1,
      }),
    );
  };

  const handleOpenModal = (id) => setSelectedProductId(id);
  const handleCloseModal = () => setSelectedProductId(null);

  const handleDeleteConfirm = () => {
    if (selectedProductId !== null) {
      dispatch(
        deleteBaltraProduct({ product_id: selectedProductId, enqueueSnackbar }),
      );
      setSelectedProductId(null);
    }
  };

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(allBaltraProducts({ page: newPage }));
    },
    [dispatch],
  );

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(
      allBaltraProducts({
        category_name:
          selectedCategoryName === "All" ? "" : selectedCategoryName,
      }),
    );
  }, [dispatch, selectedCategoryName]);

  const allSelected =
    allProducts?.length > 0 && selectedProductsId.length === allProducts.length;

  return (
    <>
      <MetaData title="baltra-admin-dashboard-all-products-list" />

      <div className="bg-[#f5f6fa] font-inter px-4 py-4 max-w-screen-2xl">
        {/* ── Page Header ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Products
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Manage and monitor your product catalogue
            </p>
          </div>
          <Link to="/baltra-admin-dashboard/add-product">
            <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-red-200 transition-all duration-150">
              <FaPlusCircle className="text-base" />
              Add Product
            </button>
          </Link>
        </div>

        {/* ── Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* ── Toolbar ── */}
          <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-gray-100">
            {/* Search */}
            <div className="flex items-center gap-1.5 flex-1 min-w-[200px] max-w-xs">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  value={searchProductName}
                  placeholder="Search products…"
                  onChange={(e) => setSearchProductName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 transition"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-lg text-sm transition active:scale-95"
              >
                <FaSearch />
              </button>
            </div>

            {/* Category */}
            <select
              value={selectedCategoryName}
              onChange={(e) => setSelectedCategoryName(e.target.value)}
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 transition min-w-[160px]"
            >
              <option value="">Select category</option>
              <option value="All">All Categories</option>
              {dropdownCategories?.length > 0 ? (
                dropdownCategories.map((c) => (
                  <option key={c.category_id} value={c.category_name}>
                    {c.category_name}
                  </option>
                ))
              ) : (
                <option disabled>Loading…</option>
              )}
            </select>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
            >
              <FaSyncAlt className="text-xs" />
              Reset
            </button>

            {/* Bulk delete (shown when items selected) */}
            {selectedProductsId.length > 0 && (
              <div className="ml-auto flex items-center gap-3">
                <span className="text-sm font-medium text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full">
                  {selectedProductsId.length} selected
                </span>
                <button
                  onClick={handleMultipleDelete}
                  className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-3.5 py-2 rounded-lg shadow-sm shadow-red-200 transition active:scale-95"
                >
                  <FaTrashAlt />
                  Delete Selected
                </button>
              </div>
            )}
          </div>

          {/* ── Table ── */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-5 py-3 text-left w-10">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={allSelected}
                      className="accent-red-500 w-3 h-3 cursor-pointer rounded"
                    />
                  </th>
                  {[
                    "S.N.",
                    "Category",
                    "Sub Category",
                    "Product",
                    "Image",
                    "Created At",
                    "Actions",
                  ].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center">
                      <div className="inline-flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs text-gray-400">
                          Loading products…
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : allProducts?.length > 0 ? (
                  allProducts.map((product, index) => {
                    const isChecked = selectedProductsId.includes(product.id);
                    return (
                      <tr
                        key={product.id}
                        className={`group transition-colors duration-100 ${
                          isChecked ? "bg-red-50/60" : "hover:bg-gray-50/80"
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="px-5 py-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => handleSelectProduct(e, product.id)}
                            className="accent-red-500 w-3 h-3 cursor-pointer rounded"
                          />
                        </td>

                        {/* S.N. */}
                        <td className="px-4 py-2 text-gray-400 text-xs font-mono">
                          {page != null && results_per_page != null
                            ? (page - 1) * results_per_page + index + 1
                            : ""}
                        </td>

                        {/* Category */}
                        <td className="px-4 py-2">
                          <span className="inline-block bg-orange-50 text-orange-600 text-xs font-medium px-2.5 py-1 rounded-full border border-orange-100 whitespace-nowrap">
                            {product?.category?.category_name}
                          </span>
                        </td>

                        {/* Sub Category */}
                        <td className="px-4 py-2">
                          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-100 whitespace-nowrap">
                            {product?.sub_category?.sub_category_name}
                          </span>
                        </td>

                        {/* Product Name */}
                        <td className="px-4 py-2 max-w-[200px]">
                          <span className="text-gray-800 text-xs line-clamp-1 whitespace-nowrap overflow-hidden text-ellipsis block">
                            {product.name}
                          </span>
                        </td>

                        {/* Image */}
                        <td className="px-4 py-2">
                          <div className="w-12 h-12 rounded-xl border border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center shadow-sm">
                            <img
                              src={product?.main_image}
                              alt={product?.name}
                              className="w-full h-full object-contain p-1"
                            />
                          </div>
                        </td>

                        {/* Created At */}
                        <td className="px-4 py-2 whitespace-nowrap text-gray-500 text-xs">
                          {moment(product.date_joined).format("D MMM YYYY")}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                            <Link
                              to={`/baltra-admin-dashboard/single-product-view/${product.id}`}
                            >
                              <button
                                title="View"
                                className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-500 transition"
                              >
                                <FaEye className="text-xs" />
                              </button>
                            </Link>
                            <Link
                              to={`/baltra-admin-dashboard/edit-product/${product.id}`}
                            >
                              <button
                                title="Edit"
                                className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition"
                              >
                                <FaPencilAlt className="text-xs" />
                              </button>
                            </Link>
                            <button
                              title="Delete"
                              onClick={() => handleOpenModal(product.id)}
                              className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          </div>

                          {selectedProductId !== null && (
                            <ProductDeleteModal
                              onClose={handleCloseModal}
                              onConfirm={handleDeleteConfirm}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3 text-gray-400">
                        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                          <FaSearch className="text-xl text-gray-300" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            No products found
                          </p>
                          <p className="text-xs mt-0.5">
                            Try adjusting your search or filters
                          </p>
                        </div>
                        <button
                          onClick={handleReset}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          {total_pages !== null && total_pages > 1 && (
            <div className="flex justify-end px-5 py-4 border-t border-gray-100">
              <ProductPagination
                currentPage={page}
                totalPages={total_pages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProductList;
