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
    (state) => state.admin
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
      setSelectedProductsId((prev) => prev.filter((id) => id !== id));
    }
  };

  const handleMultipleDelete = () => {
    if (selectedProductsId.length > 0) {
      dispatch(
        deleteMultipleProduct({
          product_ids: selectedProductsId,
          enqueueSnackbar,
        })
      ).then(() => {
        dispatch(allBaltraProducts(page));
      });

      setSelectedProductsId([]);
    }
  };

  const handleReset = () => {
    setSearchProductName(""); // clear input
    setSelectedCategoryName("All"); // reset category filter
    dispatch(allBaltraProducts({ page: 1 })); // reload first page with no filter
    setSelectedProductsId([]); // clear selected products
  };

  const handleSearch = () => {
    dispatch(
      allBaltraProducts({
        name: searchProductName, // search by product name
        category_name:
          selectedCategoryName === "All" ? "" : selectedCategoryName,
        page: 1, // always reset to first page for new search
      })
    );
  };

  const handleOpenModal = (id) => {
    setSelectedProductId(id);
  };

  const handleCloseModal = () => {
    setSelectedProductId(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedProductId !== null) {
      dispatch(
        deleteBaltraProduct({ product_id: selectedProductId, enqueueSnackbar })
      );
      setSelectedProductId(null);
    }
  };

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(allBaltraProducts({ page: newPage }));
    },
    [dispatch]
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
      })
    );
  }, [dispatch, selectedCategoryName]);

  return (
    <>
      <MetaData title="baltra-admin-dashboard-all-products-list" />
      <div className="font-gothamNarrow container mx-auto px-4 py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold font-gothamNarrow">
            Products List
          </h2>
          <Link to="/baltra-admin-dashboard/add-product">
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded inline-flex items-center font-gothamNarrow">
              <FaPlusCircle className="mr-2" />
              Add Product
            </button>
          </Link>
        </div>

        <div className="bg-[#FFFFFF] px-2 py-4">
          <div className="flex mb-2 text-xs">
            <div className="relative mr-2 flex items-center">
              <input
                type="text"
                placeholder="Search by Productname"
                className="w-42 pl-4 pr-10 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-red-500 focus:ring-gray-300 font-gothamNarrow"
                onChange={(e) => setSearchProductName(e.target.value)}
              />
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 ml-1 inline-flex items-center rounded-sm font-gothamNarrow"
                onClick={handleSearch}
              >
                <FaSearch />
              </button>
            </div>
            <div className="relative mr-2 flex items-center">
              <select
                className="w-42 pl-4 pr-10 py-2 border text-sm border-gray-300 rounded-sm focus:outline-none focus:border-red-500 focus:ring-gray-300 font-gothamNarrow"
                value={selectedCategoryName}
                onChange={(e) => setSelectedCategoryName(e.target.value)}
              >
                <option value="">Select a category</option>
                <option value="All">All</option>

                {dropdownCategories && dropdownCategories.length > 0 ? (
                  dropdownCategories.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_name}
                    >
                      {category.category_name}
                    </option>
                  ))
                ) : (
                  <option value="">Loading categories...</option>
                )}
              </select>
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

          <div className="bg-white font-sans table-container hide-scrollbar overflow-x-auto">
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
                        allProducts?.length > 0 &&
                        selectedProductsId?.length === allProducts?.length
                      }
                    />
                  </th>
                  <th className="px-4 py-2 font-gothamNarrow text-left text-sm font-semibold text-black whitespace-nowrap">
                    S.N.
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Category
                  </th>

                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Sub Category
                  </th>

                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Product Name
                  </th>

                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Product Image
                  </th>

                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Created At
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
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
                ) : allProducts && allProducts?.length > 0 ? (
                  allProducts &&
                  allProducts?.map((product, index) => (
                    <tr
                      key={product.id}
                      className="hover:bg-[#FFF0E5] hover:shadow-sm border-t border-b border-r border-l border-gray-300 cursor-pointer"
                    >
                      <td className="px-4 py-1 font-gothamNarrow text-sm font-semibold text-black whitespace-nowrap border-gray-300 border-l border-r accent-red-500">
                        <input
                          type="checkbox"
                          checked={selectedProductsId.includes(product.id)}
                          onChange={(e) => handleSelectProduct(e, product.id)}
                        />
                      </td>
                      <td className="px-4 font-gothamNarrow py-1 whitespace-nowrap text-xs text-gray-500">
                        {page != null && results_per_page != null
                          ? (page - 1) * results_per_page + index + 1
                          : ""}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {product?.category?.category_name}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {product?.sub_category?.sub_category_name}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-xs font-gothamNarrow text-[#000000]">
                        {product.name}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                        <img
                          src={product?.main_image}
                          alt={`Product Photo ${product?.name}`}
                          className="h-10 w-12 object-contain"
                        />
                      </td>

                      <td className="px-4 font-gothamNarrow py-1 whitespace-nowrap text-sm text-[#000000]">
                        {moment(product.date_joined).format("dddd, D MMM YYYY")}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500 border-b border-gray-300">
                        <div className="flex space-x-2">
                          <Link
                            to={`/baltra-admin-dashboard/single-product-view/${product.id}`}
                          >
                            <FaEye
                              className="text-blue-500 hover:text-blue-700"
                              title="Edit"
                            />
                          </Link>
                          <Link
                            to={`/baltra-admin-dashboard/edit-product/${product.id}`}
                          >
                            <FaPencilAlt
                              className="text-green-600 hover:text-green-700"
                              title="Edit"
                            />
                          </Link>
                          <FaTrash
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                            title="Delete"
                            onClick={() => handleOpenModal(product.id)}
                          />
                          {selectedProductId !== null && (
                            <ProductDeleteModal
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
          </div>
          {total_pages !== null && total_pages > 1 ? (
            <div className="flex justify-end mt-0">
              <ProductPagination
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
    </>
  );
};

export default AllProductList;
