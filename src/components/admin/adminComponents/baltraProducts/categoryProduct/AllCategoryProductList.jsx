import { debounce } from "lodash";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import {
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
  categoryProductsList,
  clearAdminError,
  deleteCategory,
  deleteMultipleCategoryProduct,
} from "../../../../../redux/features/admin/adminSlice";
import DeleteModal from "../../adminLayout/deleteModal/DeleteModal";
import CategoryPagination from "../../adminPagination/categoryPagination/CategoryPagination";
const AllCategoryProductList = () => {
  const { loading, isError, error, allCategoryProducts } = useSelector(
    (state) => state.admin
  );
  const categoryPagination =
    useSelector((state) => state.admin.categoryPagination) || {};
  const { page, total_pages, results_per_page } = categoryPagination;

  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [searchByCategoryName, setSearchByCategoryName] = useState("");
  const [selectedProductsId, setSelectedProductsId] = useState([]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allProductIds = allCategoryProducts.map((product) => product.id);
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
        deleteMultipleCategoryProduct({
          category_ids: selectedProductsId,
          enqueueSnackbar,
        })
      ).then(() => {
        dispatch(categoryProductsList(page));
      });

      setSelectedProductsId([]);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query === "") {
        dispatch(categoryProductsList());
      } else {
        dispatch(categoryProductsList({ name: query }));
      }
    }, 300),
    [dispatch]
  );

  const handleClose = () => {
    setOpenModal(!openModal);
  };

  const handleDeleteConfirm = useCallback(
    (id) => {
      setOpenModal(false);
      dispatch(deleteCategory({ category_id: id, enqueueSnackbar }));
    },
    [dispatch, enqueueSnackbar]
  );

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(categoryProductsList({ page: newPage }));
    },
    [dispatch]
  );

  const handleSearch = () => {
    debouncedSearch(searchByCategoryName);
  };

  const handleReset = () => {
    setSearchByCategoryName("");
    dispatch(categoryProductsList({ page: 1 }));
    setSelectedProductsId([]);
  };

  useEffect(() => {
    if (error) {
      dispatch(clearAdminError());
    }
    debouncedSearch(searchByCategoryName);
  }, [dispatch, searchByCategoryName, error, debouncedSearch]);
  useEffect(() => {
    if (isError) {
      enqueueSnackbar(isError, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [dispatch, isError]);
  return (
    <>
      <div className="font-gothamNarrow container mx-auto px-4 py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold font-gothamNarrow">
            Category Product List
          </h2>
          <Link to="/baltra-admin-dashboard/add-category-product">
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded inline-flex items-center font-gothamNarrow">
              <FaPlusCircle className="mr-2" />
              Add Category
            </button>
          </Link>
        </div>
        <div className="bg-[#FFFFFF] px-2 py-4">
          <div className="flex mb-2 text-xs">
            <div className="relative mr-2 flex items-center">
              <input
                type="text"
                placeholder="Search by categoryname"
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
            <button
              className="flex cursor-pointer items-center gap-1 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              onClick={handleReset}
            >
              <FaSyncAlt className="text-gray-500" /> Reset
            </button>
          </div>
          {selectedProductsId.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm text-blue-700 font-medium mr-2">
                {selectedProductsId.length} item(s) selected
              </span>
            </div>
          )}

          <div className="bg-white font-sans table-container">
            {selectedProductsId?.length > 0 && (
              <div className="mb-3 flex justify-start">
                <button
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg 
                   bg-red-500 text-white text-sm font-medium
                   hover:bg-red-600 transition"
                  onClick={handleMultipleDelete}
                >
                  <FaTrashAlt className="text-white" />
                  Delete Selected
                </button>
              </div>
            )}
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead className="font-gothamNarrow">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-l border-r accent-red-500">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        allCategoryProducts?.length > 0 &&
                        selectedProductsId?.length ===
                          allCategoryProducts?.length
                      }
                    />
                  </th>
                  <th className="px-4 py-2 font-gothamNarrow text-left text-sm font-semibold text-black ">
                    S.N.
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black  border-l border-r whitespace-nowrap border-gray-300">
                    Category Name
                  </th>

                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black  border-l border-r whitespace-nowrap border-gray-300">
                    BannerImage
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black  border-l border-r whitespace-nowrap border-gray-300">
                    CategoryImage
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
                ) : allCategoryProducts && allCategoryProducts?.length > 0 ? (
                  allCategoryProducts &&
                  allCategoryProducts?.map((categoryProduct, index) => (
                    <tr
                      key={categoryProduct.id}
                      className="hover:bg-[#FFF0E5] hover:shadow-sm border-t border-b border-r border-l border-gray-300 cursor-pointer"
                    >
                      <td className="px-4 py-1 font-gothamNarrow text-sm font-semibold text-black whitespace-nowrap border-gray-300 border-l border-r accent-red-500">
                        <input
                          type="checkbox"
                          checked={selectedProductsId.includes(
                            categoryProduct.id
                          )}
                          onChange={(e) =>
                            handleSelectProduct(e, categoryProduct.id)
                          }
                        />
                      </td>
                      <td className="px-4 font-gothamNarrow py-1 whitespace-nowrap text-xs text-gray-500">
                        {page != null && results_per_page != null
                          ? (page - 1) * results_per_page + index + 1
                          : ""}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {categoryProduct.name}
                      </td>

                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                        <img
                          src={categoryProduct?.banner}
                          alt={`Banner Photo ${categoryProduct?.name}`}
                          className="h-10 w-24 object-contain"
                        />
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                        <img
                          src={categoryProduct?.image_url}
                          alt={`Category Photo ${categoryProduct?.name}`}
                          className="h-10 w-12 object-contain"
                        />
                      </td>

                      <td className="px-4 font-gothamNarrow py-1 whitespace-nowrap text-sm text-[#000000]">
                        {moment(categoryProduct.date_joined).format(
                          "dddd, D MMM YYYY"
                        )}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500 border-b border-gray-300">
                        <div className="flex space-x-2">
                          <Link
                            to={`/baltra-admin-dashboard/edit-category-product/${categoryProduct.id}`}
                          >
                            <FaPencilAlt
                              className="text-green-500 hover:text-green-700"
                              title="Edit"
                            />
                          </Link>
                          <FaTrash
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                            title="Delete"
                            onClick={() => setOpenModal(true)}
                          />
                          {openModal && (
                            <DeleteModal
                              onClose={handleClose}
                              handleDelete={() =>
                                handleDeleteConfirm(categoryProduct.id)
                              }
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
                <CategoryPagination
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

export default AllCategoryProductList;
