import { debounce } from "lodash";
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
import { RiFileExcel2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  allBaltraProducts,
  bulkUploadBaltraProducts,
  clearAdminError,
  deleteBaltraProduct,
  deleteMultipleProduct,
} from "../../../../../redux/features/admin/adminSlice";
import ExcelUploadLayout from "../../../../layout/excelLayoutUpload/ExcelUploadLayout";
import MetaData from "../../../../layout/metaData/MetaData";
import ProductPagination from "../../adminPagination/productPagination/ProductPagination";
import ProductDeleteModal from "../productDeleteModal/ProductDeleteModal";

const AllProductList = () => {
  const { loading, error, allProducts, isLoading } = useSelector(
    (state) => state.admin,
  );
  const productPagination =
    useSelector((state) => state.admin.productPagination) || {};
  const { page, total_pages, results_per_page } = productPagination;
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductsId, setSelectedProductsId] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // ── Select ────────────────────────────────────────────────────────────────
  const allSelected =
    allProducts?.length > 0 && selectedProductsId.length === allProducts.length;

  const handleSelectAll = (e) => {
    setSelectedProductsId(e.target.checked ? allProducts.map((p) => p.id) : []);
  };

  const handleSelectProduct = (e, id) => {
    setSelectedProductsId((prev) =>
      e.target.checked ? [...prev, id] : prev.filter((pid) => pid !== id),
    );
  };

  // ── Delete ────────────────────────────────────────────────────────────────
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

  const handleMultipleDelete = () => {
    if (selectedProductsId.length > 0) {
      dispatch(
        deleteMultipleProduct({
          product_ids: selectedProductsId,
          enqueueSnackbar,
        }),
      ).then(() => {
        dispatch(allBaltraProducts({ page: 1, search: searchQuery }));
      });
      setSelectedProductsId([]);
    }
  };

  // ── Search (debounced — matches model name / model number / category) ─────
  const debouncedSearch = useCallback(
    debounce((query) => {
      dispatch(allBaltraProducts({ page: 1, search: query }));
    }, 300),
    [dispatch],
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedProductsId([]);
    dispatch(allBaltraProducts({ page: 1, search: "" }));
  };

  // ── Bulk upload ──────────────────────────────────────────────────────────
  const handleBulkUpload = useCallback(
    async (file) => {
      try {
        await dispatch(
          bulkUploadBaltraProducts({ file, enqueueSnackbar }),
        ).unwrap();
        setShowUploadModal(false);
        dispatch(allBaltraProducts({ page: 1 }));
      } catch {
        /* error already handled by action via rejectWithValue */
      }
    },
    [dispatch],
  );

  // ── Pagination ───────────────────────────────────────────────────────────
  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(allBaltraProducts({ page: newPage, search: searchQuery }));
    },
    [dispatch, searchQuery],
  );

  // ── Effects ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(allBaltraProducts({ page: 1 }));
  }, [dispatch]);

  return (
    <>
      <MetaData title="baltra-admin-dashboard-all-products-list" />

      <div className="bg-[#f5f6fa] font-inter px-4 py-4 max-w-screen-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Products
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Manage and monitor your product catalogue
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-200 transition-all duration-150"
            >
              <RiFileExcel2Fill className="text-base" />
              Bulk Upload
            </button>

            <Link to="/baltra-admin-dashboard/add-product">
              <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-red-200 transition-all duration-150">
                <FaPlusCircle className="text-base" />
                Add Product
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-gray-100">
            {/* Live search */}
            <div className="relative flex-1 min-w-[240px] max-w-sm">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="text"
                value={searchQuery}
                placeholder="Search by model name, number, or category…"
                onChange={handleSearchChange}
                className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-400 transition"
              />
            </div>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
            >
              <FaSyncAlt className="text-xs" />
              Reset
            </button>

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

          {/* Table */}
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
                    "Model No.",
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
                        <td className="px-5 py-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => handleSelectProduct(e, product.id)}
                            className="accent-red-500 w-3 h-3 cursor-pointer rounded"
                          />
                        </td>

                        <td className="px-4 py-2 text-gray-400 text-xs font-mono">
                          {page != null && results_per_page != null
                            ? (page - 1) * results_per_page + index + 1
                            : ""}
                        </td>

                        <td className="px-4 py-2">
                          <span className="inline-block bg-orange-50 text-orange-600 text-xs font-medium px-2.5 py-1 rounded-full border border-orange-100 whitespace-nowrap">
                            {product?.category?.category_name}
                          </span>
                        </td>

                        <td className="px-4 py-2">
                          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-100 whitespace-nowrap">
                            {product?.sub_category?.sub_category_name}
                          </span>
                        </td>

                        <td className="px-4 py-2 max-w-[200px]">
                          <span className="text-gray-800 text-xs line-clamp-1 whitespace-nowrap overflow-hidden text-ellipsis block">
                            {product.name}
                          </span>
                        </td>

                        {/* Model No. */}
                        <td className="px-4 py-2 whitespace-nowrap">
                          <span className="text-gray-600 text-xs font-mono">
                            {product?.model_num || "—"}
                          </span>
                        </td>

                        <td className="px-4 py-2">
                          <div className="w-12 h-12 rounded-xl border border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center shadow-sm">
                            <img
                              src={product?.main_image}
                              alt={product?.name}
                              className="w-full h-full object-contain p-1"
                            />
                          </div>
                        </td>

                        <td className="px-4 py-2 whitespace-nowrap text-gray-500 text-xs">
                          {moment(product.date_joined).format("D MMM YYYY")}
                        </td>

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

                          {selectedProductId === product.id && (
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
                            Try adjusting your search
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

          {total_pages > 1 && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 bg-slate-50/50">
              <p className="text-xs text-slate-400 font-medium">
                Page {page} of {total_pages}
              </p>
              <ProductPagination
                currentPage={page}
                totalPages={total_pages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>

      {showUploadModal && (
        <ExcelUploadLayout
          onClose={() => setShowUploadModal(false)}
          onBulkUpload={handleBulkUpload}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default AllProductList;
