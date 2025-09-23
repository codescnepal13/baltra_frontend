import { debounce } from "lodash";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { FaSearch, FaSyncAlt, FaTrash, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAdminError,
  trackingComplaintStatus,
} from "../../../../redux/features/admin/adminSlice";
import WarrantyComplaintPagination from "../adminPagination/warrantyComplaintPagination/WarrantyComplaintPagination";

const TrackingComplaintStatusList = () => {
  const { loading, complaintStatus, error } = useSelector(
    (state) => state.admin
  );
  const warrantyComplaintPagination =
    useSelector((state) => state.admin.warrantyComplaintPagination) || {};
  const { page, total_pages, results_per_page } = warrantyComplaintPagination;

  const dispatch = useDispatch();
  const [searchSerialNumber, setSearchSerialNumber] = useState("");
  const [selectedItemsIds, setSelectedItemsIds] = useState([]);

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      dispatch(trackingComplaintStatus({ serial_number: searchTerm }));
    }, 500),
    [dispatch]
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = complaintStatus.map((c) => c.id);
      setSelectedItemsIds(allIds);
    } else {
      setSelectedItemsIds([]);
    }
  };

  const handleMultipleDelete = () => {};

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchSerialNumber(value);
    debouncedSearch(value);
  };

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(trackingComplaintStatus(newPage));
    },
    [dispatch]
  );

  const handleSelectItem = (e, id) => {
    if (e.target.checked) {
      setSelectedItemsIds((prev) => [...prev, id]);
    } else {
      setSelectedItemsIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const handleReset = () => {
    setSearchSerialNumber("");
    setSelectedItemsIds([]);
    dispatch(trackingComplaintStatus());
  };

  useEffect(() => {
    if (error) {
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(trackingComplaintStatus());
  }, [dispatch]);
  return (
    <>
      <div className="font-gothamNarrow container mx-auto px-4 py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold font-gothamNarrow">
            Manage Warranry Complaints
          </h2>
        </div>

        <div className="bg-[#FFFFFF] px-2 py-4">
          <div className="flex mb-2 text-xs items-center">
            <div className="relative mr-2 flex items-center">
              <input
                type="text"
                placeholder="Search by serial number"
                className="w-42 pl-4 pr-10 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-red-500 focus:ring-gray-300 font-gothamNarrow"
                value={searchSerialNumber}
                onChange={handleSearchChange}
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

          {selectedItemsIds.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm text-blue-700 font-medium mr-2">
                {selectedItemsIds.length} item(s) selected
              </span>
            </div>
          )}

          <div className="bg-white font-sans table-container hide-scrollbar overflow-x-auto">
            {selectedItemsIds?.length > 0 && (
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
                  <th className="px-4 py-2 font-gothamNarrow text-left text-sm font-semibold text-black whitespace-nowrap">
                    S.N.
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    WarrantyImage
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    CustomerName
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    ModelName
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    ModelNumber
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    SerialNumber
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Status
                  </th>

                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Purchase Date
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    WarrantyExpired
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
                ) : complaintStatus && complaintStatus?.length > 0 ? (
                  complaintStatus?.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-[#FFF0E5] hover:shadow-sm border-t border-b border-r border-l border-gray-300 cursor-pointer"
                    >
                      <td className="px-4 py-1 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {/* {index + 1} */}
                        {page != null && results_per_page != null
                          ? (page - 1) * results_per_page + index + 1
                          : ""}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                        <img
                          src={item?.warranty_image}
                          alt={`Warranty Photo`}
                          className="h-10 w-12 object-contain"
                        />
                      </td>
                      <td className="px-4 py-1 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {item?.customer_name}
                      </td>
                      <td className="px-4 py-1 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {item?.model_name}
                      </td>
                      <td className="px-4 py-1 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {item?.model_num}
                      </td>

                      <td className="px-4 py-1 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {item?.serial_number}
                      </td>

                      <td className="px-4 py-1 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {moment(item.warranty_expire).isAfter(moment()) ? (
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full cursor-pointer">
                            Available
                          </span>
                        ) : (
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full cursor-pointer">
                            Expired
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-1 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {item?.purchase_date}
                      </td>
                      <td className="px-4 py-1 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {moment(item.warranty_expire).format(
                          "dddd, D MMM YYYY"
                        )}
                      </td>

                      <td className="px-4 py-1 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        <button className="text-red-600 hover:text-red-700">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12} className="text-center font-gothamNarrow">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {total_pages !== null && total_pages > 1 ? (
            <div className="flex justify-end mt-0">
              <WarrantyComplaintPagination
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

export default TrackingComplaintStatusList;
