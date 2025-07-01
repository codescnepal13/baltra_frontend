import React, { useCallback, useEffect, useState } from "react";
import {
  FaPencilAlt,
  FaPlusCircle,
  FaSearch,
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
import { debounce } from "lodash";
import moment from "moment";
import { toast } from "react-toastify";
import SubCategoryPagination from "../../adminPagination/subCategoryPagination/SubCategoryPagination";
import SubCategoryDeleteModal from "./SubCategoryDeleteModal/SubCategoryDeleteModal";
const AllSubCategoryList = () => {
  const { loading, error, allSubCategoryProducts } = useSelector(
    (state) => state.admin
  );
  const subCategoryPagination =
    useSelector((state) => state.admin.subCategoryPagination) || {};
  const { page, total_pages, results_per_page } = subCategoryPagination;

  const dispatch = useDispatch();

  const [searchByCategoryName, setSearchByCategoryName] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductsId, setSelectedProductsId] = useState([]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allProductIds = allSubCategoryProducts.map((product) => product.id);
      setSelectedProductsId(allProductIds);
    } else {
      setSelectedProductsId([]);
    }
  };

  const handleSelectProduct = (event, id) => {
    if (event.target.checked) {
      setSelectedProductsId((prev) => [...prev, id]);
    } else {
      setSelectedProductsId((prev) => prev.filter((id) => id !== id));
    }
  };

  const handleMultipleDelete = () => {
    if (selectedProductsId.length > 0) {
      dispatch(
        deleteMultipleSubCategoryProduct({
          subcategory_ids: selectedProductsId,
          toast,
        })
      ).then(() => {
        dispatch(subCategoryProductsList(page));
      });

      setSelectedProductsId([]);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query === "") {
        dispatch(subCategoryProductsList());
      } else {
        dispatch(subCategoryProductsList({ name: query }));
      }
    }, 300),
    [dispatch]
  );

  const handleOpenModal = (productId) => {
    setSelectedProductId(productId);
  };

  const handleCloseModal = () => {
    setSelectedProductId(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedProductId !== null) {
      dispatch(deleteSubCategory({ subcategory_id: selectedProductId, toast }));
      setSelectedProductId(null);
    }
  };

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(subCategoryProductsList({ page: newPage }));
    },
    [dispatch]
  );

  const handleSearch = () => {
    debouncedSearch(searchByCategoryName);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    debouncedSearch(searchByCategoryName);
  }, [dispatch, searchByCategoryName, debouncedSearch]);
  return (
    <>
      <div className="font-gothamNarrow container mx-auto px-8 py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold font-gothamNarrow">
            Sub Category List
          </h2>
          <Link to="/baltra-admin-dashboard/add-subCategory-product">
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded inline-flex items-center font-gothamNarrow">
              <FaPlusCircle className="mr-2" />
              Add SubCategory
            </button>
          </Link>
        </div>
        <div className="bg-[#FFFFFF] px-2 py-4">
          <div className="flex mb-2 text-xs">
            <div className="relative mr-2 flex items-center">
              <input
                type="text"
                placeholder="Search by subcategory"
                className="w-42 pl-4 pr-10 py-2 border text-sm border-gray-300 rounded-sm focus:outline-none focus:border-red-500 focus:ring-gray-300 font-gothamNarrow"
                onChange={(e) => setSearchByCategoryName(e.target.value)}
              />
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 ml-1 inline-flex items-center rounded-sm"
                onClick={handleSearch}
              >
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="bg-white font-sans table-container">
            {selectedProductsId?.length > 0 && (
              <button
                className="h-4 w-4 text-red-600 hover:text-red-700"
                onClick={handleMultipleDelete}
              >
                <FaTrashAlt />
              </button>
            )}
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead className="font-gothamNarrow">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-l border-r accent-red-500">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        allSubCategoryProducts?.length > 0 &&
                        selectedProductsId?.length ===
                          allSubCategoryProducts?.length
                      }
                    />
                  </th>
                  <th className="px-4 py-2 font-gothamNarrow text-left text-sm font-semibold text-black ">
                    S.N.
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black  border-l border-r whitespace-nowrap border-gray-300">
                    Sub Category Name
                  </th>

                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black  border-l border-r whitespace-nowrap border-gray-300">
                    SubCategoryImage
                  </th>

                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black  border-l border-r whitespace-nowrap border-gray-300">
                    CreatedAt
                  </th>

                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black  border-l border-r whitespace-nowrap border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={12} className="text-center">
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-gray-800 border-t-gray-800"></div>
                    </td>
                  </tr>
                ) : allSubCategoryProducts &&
                  allSubCategoryProducts?.length > 0 ? (
                  allSubCategoryProducts &&
                  allSubCategoryProducts?.map((subCategory, index) => (
                    <tr
                      key={subCategory.id}
                      className="hover:bg-[#FFF0E5] hover:shadow-sm border-t border-b border-r border-l border-gray-300 cursor-pointer"
                    >
                      <td className="px-4 py-1 font-gothamNarrow text-sm font-semibold text-black whitespace-nowrap border-gray-300 border-l border-r accent-red-500">
                        <input
                          type="checkbox"
                          checked={selectedProductsId.includes(subCategory.id)}
                          onChange={(e) =>
                            handleSelectProduct(e, subCategory.id)
                          }
                        />
                      </td>
                      <td className="px-4 font-gothamNarrow py-1 whitespace-nowrap text-xs text-gray-500">
                        {page != null && results_per_page != null
                          ? (page - 1) * results_per_page + index + 1
                          : ""}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {subCategory.name}
                      </td>

                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                        <img
                          src={subCategory?.image_url}
                          alt={`SubCategory Photo ${subCategory?.name}`}
                          className="h-10 w-12 object-contain"
                        />
                      </td>

                      <td className="px-4 font-gothamNarrow py-1 whitespace-nowrap text-sm text-[#000000]">
                        {moment(subCategory.date_joined).format(
                          "dddd, D MMM YYYY"
                        )}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500 border-b border-gray-300">
                        <div className="flex space-x-2">
                          <Link
                            to={`/baltra-admin-dashboard/edit-sub-category-product/${subCategory.id}`}
                          >
                            <FaPencilAlt
                              className="text-green-500 hover:text-green-700"
                              title="Edit"
                            />
                          </Link>
                          <FaTrash
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                            title="Delete"
                            onClick={() => handleOpenModal(subCategory.id)}
                          />
                          {selectedProductId !== null && (
                            <SubCategoryDeleteModal
                              onClose={handleCloseModal}
                              onConfirm={handleDeleteConfirm}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="text-gray-500 text-sm font-gothamNarrow"
                      colSpan={12}
                      style={{ textAlign: "center" }}
                    >
                      No Data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {total_pages !== null && total_pages > 1 ? (
              <div className="flex justify-end mt-0">
                <SubCategoryPagination
                  currentPage={page}
                  totalPages={total_pages}
                  onPageChange={handlePageChange}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllSubCategoryList;
