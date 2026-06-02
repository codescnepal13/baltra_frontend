import { debounce } from "lodash";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import {
  FaPencilAlt,
  FaPlusCircle,
  FaSearch,
  FaSyncAlt,
  FaThList,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearAdminError,
  deleteMultipleSubCategoryProduct,
  deleteSubCategory,
  subCategoryProductsList,
} from "../../../../../redux/features/admin/adminSlice";
import SubCategoryPagination from "../../adminPagination/subCategoryPagination/SubCategoryPagination";
import SubCategoryDeleteModal from "./SubCategoryDeleteModal/SubCategoryDeleteModal";

const AllSubCategoryList = () => {
  const {
    loading,
    error,
    allSubCategoryProducts = [],
  } = useSelector((state) => state.admin);
  const subCategoryPagination =
    useSelector((state) => state.admin.subCategoryPagination) || {};
  const {
    page = 1,
    total_pages = 1,
    results_per_page = 8,
  } = subCategoryPagination;

  const dispatch = useDispatch();

  const [searchByCategoryName, setSearchByCategoryName] = useState("");
  const [deletingId, setDeletingId] = useState(null); // ✅ per-row modal
  const [selectedProductsId, setSelectedProductsId] = useState([]);

  const allSelected =
    allSubCategoryProducts.length > 0 &&
    selectedProductsId.length === allSubCategoryProducts.length;
  const hasSelected = selectedProductsId.length > 0;

  const handleSelectAll = (e) => {
    setSelectedProductsId(
      e.target.checked ? allSubCategoryProducts.map((p) => p.id) : [],
    );
  };

  // ✅ Bug fix: was comparing id !== id (always false)
  const handleSelectProduct = (e, productId) => {
    setSelectedProductsId((prev) =>
      e.target.checked
        ? [...prev, productId]
        : prev.filter((item) => item !== productId),
    );
  };

  const handleMultipleDelete = () => {
    if (!hasSelected) return;
    dispatch(
      deleteMultipleSubCategoryProduct({
        subcategory_ids: selectedProductsId,
        enqueueSnackbar,
      }),
    ).then(() => dispatch(subCategoryProductsList(page)));
    setSelectedProductsId([]);
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      dispatch(
        query
          ? subCategoryProductsList({ name: query })
          : subCategoryProductsList(),
      );
    }, 300),
    [dispatch],
  );

  const handleReset = () => {
    setSearchByCategoryName("");
    setSelectedProductsId([]);
    dispatch(subCategoryProductsList({ page: 1 }));
  };

  const handleDeleteConfirm = () => {
    if (deletingId !== null) {
      dispatch(
        deleteSubCategory({ subcategory_id: deletingId, enqueueSnackbar }),
      );
      setDeletingId(null);
    }
  };

  const handlePageChange = useCallback(
    (newPage) => dispatch(subCategoryProductsList({ page: newPage })),
    [dispatch],
  );

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    debouncedSearch(searchByCategoryName);
  }, [searchByCategoryName, debouncedSearch]);

  const COLUMNS = [
    "S.N.",
    "Sub Category Name",
    "Image",
    "Created At",
    "Actions",
  ];

  return (
    <div className="font-inter px-4 py-4 max-w-screen-2xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[15px] font-semibold tracking-[-0.01em] text-gray-900">
            Sub Category List
          </h1>
          <p className="text-[12px] text-gray-400 tracking-[0.01em] mt-0.5">
            Manage sub-categories and their images
          </p>
        </div>
        <Link to="/baltra-admin-dashboard/add-subCategory-product">
          <button className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-[12.5px] font-medium tracking-[0.02em] px-3.5 py-2 rounded-lg transition-colors">
            <FaPlusCircle size={12} />
            Add Sub Category
          </button>
        </Link>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100">
          {/* Search */}
          <div className="relative">
            <FaSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
              size={11}
            />
            <input
              type="text"
              value={searchByCategoryName}
              placeholder="Search sub category..."
              onChange={(e) => setSearchByCategoryName(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-[12.5px] tracking-[0.01em] text-gray-700 border border-gray-200 rounded-lg outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/10 w-48 placeholder:text-gray-300 transition-all"
            />
          </div>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium tracking-[0.02em] text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaSyncAlt size={10} />
            Reset
          </button>

          {/* Bulk delete */}
          {hasSelected && (
            <button
              onClick={handleMultipleDelete}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium tracking-[0.02em] text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
            >
              <FaTrashAlt size={11} />
              Delete ({selectedProductsId.length})
            </button>
          )}
        </div>

        {/* Selected banner */}
        {hasSelected && (
          <div className="px-4 py-2 bg-blue-50 border-b border-blue-100">
            <span className="text-[11.5px] font-medium tracking-[0.02em] text-blue-600">
              {selectedProductsId.length} item
              {selectedProductsId.length > 1 ? "s" : ""} selected
            </span>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-[12.5px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {/* Checkbox */}
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={allSelected}
                    className="accent-red-500 w-3.5 h-3.5 cursor-pointer"
                  />
                </th>
                {COLUMNS.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-[11px] font-semibold tracking-[0.08em] uppercase text-gray-400 whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <div className="inline-flex flex-col items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-200 border-t-red-500" />
                      <span className="text-[11.5px] text-gray-400 tracking-[0.03em]">
                        Loading...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : allSubCategoryProducts.length > 0 ? (
                allSubCategoryProducts.map((subCategory, index) => {
                  const isChecked = selectedProductsId.includes(subCategory.id);
                  return (
                    <tr
                      key={subCategory.id}
                      className={`transition-colors ${
                        isChecked ? "bg-red-50/50" : "hover:bg-gray-50/70"
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            handleSelectProduct(e, subCategory.id)
                          }
                          className="accent-red-500 w-3.5 h-3.5 cursor-pointer"
                        />
                      </td>

                      {/* S.N. */}
                      <td className="px-4 py-2 text-gray-400 tabular-nums w-12">
                        {(page - 1) * results_per_page + index + 1}
                      </td>

                      {/* Name + subtle tag */}
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-md bg-red-50 flex items-center justify-center flex-shrink-0">
                            <FaThList className="text-red-300" size={9} />
                          </div>
                          <span className="font-medium text-gray-800 whitespace-nowrap tracking-[0.01em]">
                            {subCategory.name}
                          </span>
                        </div>
                      </td>

                      {/* Image */}
                      <td className="px-4 py-2">
                        <div className="w-10 h-10 rounded-md overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                          {subCategory?.image_url ? (
                            <img
                              src={subCategory.image_url}
                              alt={`SubCategory – ${subCategory.name}`}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <span className="text-[10px] text-gray-300">–</span>
                          )}
                        </div>
                      </td>

                      {/* Created at */}
                      <td className="px-4 py-2 text-gray-500 whitespace-nowrap tracking-[0.01em]">
                        {moment(subCategory.date_joined).format("D MMM YYYY")}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <Link
                            to={`/baltra-admin-dashboard/edit-sub-category-product/${subCategory.id}`}
                            className="p-1.5 rounded-lg text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                            title="Edit"
                          >
                            <FaPencilAlt size={12} />
                          </Link>
                          <button
                            onClick={() => setDeletingId(subCategory.id)}
                            className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>

                        {/* ✅ Per-row modal — only renders for the row being deleted */}
                        {deletingId === subCategory.id && (
                          <SubCategoryDeleteModal
                            onClose={() => setDeletingId(null)}
                            onConfirm={handleDeleteConfirm}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-14">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <FaSearch className="text-gray-300" size={14} />
                      </div>
                      <p className="text-[12.5px] text-gray-400 tracking-[0.02em]">
                        No sub categories found
                      </p>
                      <button
                        onClick={handleReset}
                        className="text-[11.5px] text-red-400 hover:text-red-600 tracking-[0.02em] transition-colors"
                      >
                        Clear search
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {total_pages > 1 && (
          <div className="flex justify-end px-4 py-3 border-t border-gray-100">
            <SubCategoryPagination
              currentPage={page}
              totalPages={total_pages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSubCategoryList;
