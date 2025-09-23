import { debounce } from "lodash";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
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
  clearAdminError,
  deleteMultipleWarrantyPackage,
  deleteWarrantyCard,
  getAllWarrantyPackages,
} from "../../../../redux/features/admin/adminSlice";
import WarrantyPagination from "../adminPagination/warrantyPagination/WarrantyPagination";
import WarrantyDeletePopUp from "./warrantyDeletePopUp/WarrantyDeletePopUp";

const AllWarrantyPackageList = () => {
  const { loading, error, allWarrantyPackagesList } = useSelector(
    (state) => state.admin
  );

  const warrantyPagination =
    useSelector((state) => state.admin.warrantyPagination) || {};
  const { page, total_pages, results_per_page } = warrantyPagination;
  const dispatch = useDispatch();

  const [selectedWarrantyId, setSelectedWarrantyId] = useState(null);
  const [selectedWarrantysId, setSelectedWarrantysId] = useState([]);
  const [searchByPackageType, setSearchByPackageType] = useState("");

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allWarrantysId = allWarrantyPackagesList.map(
        (warranty) => warranty.id
      );
      setSelectedWarrantysId(allWarrantysId);
    } else {
      setSelectedWarrantysId([]);
    }
  };

  const handleSelectWarranty = (event, warrantyId) => {
    if (event.target.checked) {
      setSelectedWarrantysId((prev) => [...prev, warrantyId]);
    } else {
      setSelectedWarrantysId((prev) => prev.filter((id) => id !== warrantyId));
    }
  };

  const handleMultipleDelete = () => {
    if (selectedWarrantysId.length > 0) {
      dispatch(
        deleteMultipleWarrantyPackage({
          form_ids: selectedWarrantysId,
          enqueueSnackbar,
        })
      ).then(() => {
        dispatch(getAllWarrantyPackages({ page, type: searchByPackageType }));
      });

      setSelectedWarrantysId([]);
    }
  };

  const handleOpenModal = (warrantyId) => {
    setSelectedWarrantyId(warrantyId);
  };

  const handleCloseModal = () => {
    setSelectedWarrantyId(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedWarrantyId !== null) {
      dispatch(
        deleteWarrantyCard({ form_id: selectedWarrantyId, enqueueSnackbar })
      );
      setSelectedWarrantyId(null);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      dispatch(getAllWarrantyPackages({ page: 1, type: query }));
    }, 300),
    [dispatch]
  );

  const handleInputChange = (e) => {
    setSearchByPackageType(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(
        getAllWarrantyPackages({ page: newPage, type: searchByPackageType })
      );
    },
    [dispatch, searchByPackageType]
  );

  const handleReset = () => {
    setSelectedWarrantyId(null);
    setSelectedWarrantysId([]);
    setSearchByPackageType("");
    dispatch(getAllWarrantyPackages({ page: newPage }));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(getAllWarrantyPackages({ page, type: searchByPackageType }));
  }, [dispatch, page, searchByPackageType]);

  return (
    <>
      <div className="font-gothamNarrow container mx-auto px-4 py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold font-gothamNarrow">
            All Warranty List
          </h2>
          <Link to="/baltra-admin-dashboard/add/warranty-package">
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded inline-flex items-center font-gothamNarrow">
              <FaPlusCircle className="mr-2" />
              Add Warranty Package
            </button>
          </Link>
        </div>

        <div className="bg-[#FFFFFF] px-2 py-4">
          <div className="flex mb-2 text-xs items-center">
            <div className="relative mr-2 flex items-center">
              <input
                type="text"
                placeholder="Search by Package Type"
                className="w-42 pl-4 pr-10 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-red-500 focus:ring-gray-300 font-gothamNarrow"
                value={searchByPackageType}
                onChange={handleInputChange}
              />
              <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 ml-1 inline-flex items-center rounded-sm font-gothamNarrow">
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

          {selectedWarrantysId.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm text-blue-700 font-medium mr-2">
                {selectedWarrantysId.length} item(s) selected
              </span>
            </div>
          )}

          <div className="bg-white font-sans table-container hide-scrollbar overflow-x-auto">
            {selectedWarrantysId?.length > 0 && (
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
                        allWarrantyPackagesList?.length > 0 &&
                        selectedWarrantysId?.length ===
                          allWarrantyPackagesList?.length
                      }
                    />
                  </th>
                  <th className="px-4 py-2 font-gothamNarrow text-left text-sm font-semibold text-black whitespace-nowrap">
                    S.N.
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    SubCategory
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Duration
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Package Type
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Amount
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Offers
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
                ) : allWarrantyPackagesList &&
                  allWarrantyPackagesList?.length > 0 ? (
                  allWarrantyPackagesList?.map((warranty, index) => (
                    <tr
                      key={warranty.id}
                      className="hover:bg-[#FFF0E5] hover:shadow-sm border-t border-b border-r border-l border-gray-300 cursor-pointer"
                    >
                      <td className="px-4 py-2 font-gothamNarrow text-sm font-semibold text-black whitespace-nowrap border-gray-300 border-l border-r accent-red-500">
                        <input
                          type="checkbox"
                          checked={selectedWarrantysId.includes(warranty.id)}
                          onChange={(e) => handleSelectWarranty(e, warranty.id)}
                        />
                      </td>
                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {page != null && results_per_page != null
                          ? (page - 1) * results_per_page + index + 1
                          : ""}
                      </td>
                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {warranty?.subcategory_name}
                      </td>
                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {warranty?.period}
                      </td>
                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {warranty?.type}
                      </td>
                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        Rs {warranty?.amt}
                      </td>
                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {warranty?.offers}
                      </td>
                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {moment(warranty.date_joined).format("DD MMM, YYYY")}
                      </td>
                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        <Link
                          to={`/baltra-admin-dashboard/edit/warranty-package/${warranty.id}`}
                        >
                          <button className="mr-2 text-green-600 hover:text-green-700">
                            <FaPencilAlt />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleOpenModal(warranty.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                        {selectedWarrantyId === warranty.id && (
                          <WarrantyDeletePopUp
                            isOpen={true}
                            onClose={handleCloseModal}
                            onConfirm={handleDeleteConfirm}
                          />
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={12}
                      className="text-center text-sm font-gothamNarrow"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {total_pages !== null && total_pages > 1 ? (
              <div className="flex justify-end mt-0">
                <WarrantyPagination
                  currentPage={page}
                  totalPages={total_pages}
                  onPageChange={handlePageChange}
                />
              </div>
            ) : (
              ""
            )}
          </div>

          {/* Pagination */}
          {/* <WarrantyPagination
            page={page}
            totalPages={total_pages}
            onPageChange={handlePageChange}
          /> */}
        </div>
      </div>
    </>
  );
};

export default React.memo(AllWarrantyPackageList);
