import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaSearch, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  allProductCatalog,
  clearAdminError,
  deleteProductCatalog,
} from "../../../../redux/features/admin/adminSlice";
import moment from "moment";
import ProductCatalogDeleteModal from "./addCatalog/ProductCatalogDeleteModal";
import { toast } from "react-toastify";

const AdminCatalogList = () => {
  const { loading, error, allProductCatalogList } = useSelector(
    (state) => state.admin
  );

  const [selectedCatalogId, setSelectedCatalogId] = useState(null);

  const handleOpenModal = (catalogId) => {
    setSelectedCatalogId(catalogId);
  };

  const handleCloseModal = () => {
    setSelectedCatalogId(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedCatalogId !== null) {
      dispatch(deleteProductCatalog({ id: selectedCatalogId, toast }));
      setSelectedCatalogId(null);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(allProductCatalog());
  }, [dispatch]);
  return (
    <>
      <div className="font-gothamNarrow container mx-auto px-8 py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold font-gothamNarrow">
            All CataLog List
          </h2>
          <Link to="/baltra-admin-dashboard/add/product-catalog">
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded inline-flex items-center font-gothamNarrow">
              <FaPlusCircle className="mr-2" />
              Add Catalog
            </button>
          </Link>
        </div>

        <div className="bg-[#FFFFFF] px-2 py-4">
          <div className="flex mb-2 text-xs items-center">
            <div className="relative mr-2 flex items-center">
              <input
                type="text"
                placeholder="Search by Catalog"
                className="w-42 pl-4 pr-10 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-red-500 focus:ring-gray-300 font-gothamNarrow"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 ml-1 inline-flex items-center rounded-sm font-gothamNarrow">
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="bg-white font-sans table-container hide-scrollbar overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead className="font-gothamNarrow">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-l border-r accent-red-500">
                    <input type="checkbox" />
                  </th>
                  <th className="px-4 py-2 font-gothamNarrow text-left text-sm font-semibold text-black whitespace-nowrap">
                    S.N.
                  </th>

                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Catalog Name
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Catalog Cover
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Catalog PDF
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
                ) : allProductCatalogList &&
                  allProductCatalogList?.length > 0 ? (
                  allProductCatalogList?.map((catalog, index) => (
                    <tr
                      key={catalog.id}
                      className="hover:bg-[#FFF0E5] hover:shadow-sm border-t border-b border-r border-l border-gray-300 cursor-pointer"
                    >
                      <td className="px-4 py-2 font-gothamNarrow text-sm font-semibold text-black whitespace-nowrap border-gray-300 border-l border-r accent-red-500">
                        <input type="checkbox" />
                      </td>
                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {index + 1}
                      </td>

                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {catalog?.catalogue_type}
                      </td>

                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                        <img
                          src={catalog?.catalogue_image}
                          alt={`Category Photo ${catalog?.catalogue_type}`}
                          className="h-10 w-12"
                        />
                      </td>

                      <td className="px-4 py-1 whitespace-nowrap text-sm text-gray-500">
                        {catalog?.file?.endsWith(".pdf") ? (
                          <a
                            href={catalog?.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-gothamNarrow text-black"
                          >
                            View PDF
                          </a>
                        ) : (
                          <img
                            src={catalog?.file}
                            alt={`Category Photo ${catalog?.catalogue_type}`}
                            className="h-8 w-8 object-contain"
                          />
                        )}
                      </td>

                      <td className="px-4 font-gothamNarrow py-1 whitespace-nowrap text-sm text-[#000000]">
                        {moment(catalog.date_joined).format("dddd, D MMM YYYY")}
                      </td>
                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        <FaTrash
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                          title="Delete"
                          onClick={() => handleOpenModal(catalog.id)}
                        />
                        {selectedCatalogId !== null && (
                          <ProductCatalogDeleteModal
                            onClose={handleCloseModal}
                            onConfirm={handleDeleteConfirm}
                          />
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12} className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCatalogList;
