import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import {
  FaPencilAlt,
  FaSearch,
  FaSyncAlt,
  FaTrash,
  FaTrashAlt,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearAdminError,
  deleteCustomerRole,
  deleteMultipleCustomersRole,
  getAllCustomerList,
} from "../../../../redux/features/admin/adminSlice";
import CustomerPagination from "../adminPagination/customerPagination/CustomerPagination";
import "./AllCustomer.css";
import DeleteCustomerPopUp from "./deleteCustomerPopUp/DeleteCustomerPopUp";

const AllCustomerList = () => {
  const dispatch = useDispatch();
  const { loading, error, allCustomers } = useSelector((state) => state.admin);
  const CustomerListPagination =
    useSelector((state) => state.admin.customerPagination) || {};
  const {
    page = 1,
    total_pages = 1,
    results_per_page = 8,
  } = CustomerListPagination;

  const [selectGender, setSelectGender] = useState("All");
  const [selectTier, setSelectTier] = useState("All");
  const [searchCustomerName, setSearchCustomerName] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustomersId, setSelectedCustomersId] = useState([]);

  // Select All / Individual Checkboxes
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = allCustomers.map((c) => c.id);
      setSelectedCustomersId(allIds);
    } else {
      setSelectedCustomersId([]);
    }
  };

  const handleSelectCustomer = (e, id) => {
    if (e.target.checked) {
      setSelectedCustomersId((prev) => [...prev, id]);
    } else {
      setSelectedCustomersId((prev) => prev.filter((i) => i !== id));
    }
  };

  // Multi-delete
  const handleMultipleDelete = () => {
    if (selectedCustomersId.length === 0) return;
    dispatch(
      deleteMultipleCustomersRole({
        customer_ids: selectedCustomersId,
        enqueueSnackbar,
      })
    ).then(() => {
      fetchCustomers(page);
      setSelectedCustomersId([]);
    });
  };

  // Single delete
  const handleOpenModal = (customerId) => setSelectedCustomerId(customerId);
  const handleCloseModal = () => setSelectedCustomerId(null);
  const handleDeleteConfirm = () => {
    if (!selectedCustomerId) return;
    dispatch(
      deleteCustomerRole({
        customer_id: selectedCustomerId,
        enqueueSnackbar,
      })
    ).then(() => fetchCustomers(page));
    setSelectedCustomerId(null);
  };

  // Fetch customers
  const fetchCustomers = useCallback(
    (currentPage = 1) => {
      dispatch(
        getAllCustomerList({
          page: currentPage,
          gender: selectGender === "All" ? "" : selectGender,
          tier: selectTier === "All" ? "" : selectTier,
          firstname: searchCustomerName || "",
        })
      );
    },
    [dispatch, selectGender, selectTier, searchCustomerName]
  );

  // Pagination change
  const handlePageChange = (newPage) => fetchCustomers(newPage);

  // Search
  const handleSearch = () => fetchCustomers(1);

  // Reset
  const handleReset = () => {
    setSearchCustomerName("");
    setSelectGender("All");
    setSelectTier("All");
    fetchCustomers(1);
  };

  // Effects
  useEffect(() => {
    fetchCustomers(page);
  }, [fetchCustomers, page]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [error, dispatch]);

  return (
    <>
      <div className="font-gothamNarrow container mx-auto px-4 py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold font-gothamNarrow">
            Customer List
          </h2>
        </div>
        <div className="bg-[#FFFFFF] px-2 py-1">
          <div className="flex mb-2 text-xs">
            <div className="relative mr-2 flex items-center">
              <input
                type="text"
                placeholder="Search by Customer Name"
                className="w-42 pl-4 pr-10 py-2 border border-gray-300 text-sm rounded-sm focus:outline-none focus:border-red-500 focus:ring-gray-300 font-gothamNarrow"
                onChange={(e) => setSearchCustomerName(e.target.value)}
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
                className="w-42 font-gothamNarrow pl-4 pr-10 py-2 border text-sm border-gray-300 rounded-sm focus:outline-none focus:border-red-500 focus:ring-gray-300"
                value={selectGender}
                onChange={(e) => setSelectGender(e.target.value)}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="All">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="relative mr-2 flex items-center">
              <select
                className="w-42 font-gothamNarrow pl-4 pr-10 py-2 border text-sm border-gray-300 rounded-sm focus:outline-none focus:border-red-500 focus:ring-gray-300"
                value={selectTier}
                onChange={(e) => setSelectTier(e.target.value)}
              >
                <option value="" disabled>
                  Select Tier
                </option>
                <option value="All">All</option>
                <option value="Gold Tier">Gold Tier</option>
                <option value="Platinum Tier">Platinum Tier</option>
                <option value="Silver Tier">Silver Tier</option>
              </select>
            </div>
            <button
              className="flex cursor-pointer items-center gap-1 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              onClick={handleReset}
            >
              <FaSyncAlt className="text-gray-500" /> Reset
            </button>
          </div>

          {selectedCustomersId.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm text-blue-700 font-medium mr-2">
                {selectedCustomersId.length} item(s) selected
              </span>
            </div>
          )}

          <div className="bg-white font-sans table-container hide-scrollbar overflow-x-auto">
            {selectedCustomersId?.length > 0 && (
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

            <table className="min-w-full divide-y divide-gray-200 border border-gray-300 pt-2">
              <thead className="font-gothamNarrow">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap accent-red-500">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        allCustomers?.length > 0 &&
                        selectedCustomersId?.length === allCustomers?.length
                      }
                    />
                  </th>
                  <th className="px-4 py-2 font-gothamNarrow text-left text-sm font-semibold text-black">
                    S.N.
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300">
                    Image
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300">
                    Customer Name
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300">
                    Email
                  </th>

                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300">
                    ContactNo
                  </th>

                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300">
                    Gender
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300">
                    Role
                  </th>

                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300">
                    CreatedAt
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300">
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
                ) : allCustomers && allCustomers?.length > 0 ? (
                  allCustomers &&
                  allCustomers?.map((adminCustomer, index) => (
                    <tr
                      key={`${adminCustomer.id}-${index}`}
                      className="hover:bg-[#FFF0E5] hover:shadow-sm border-t border-b border-r border-l border-gray-300 cursor-pointer"
                    >
                      <td className="px-4 py-2 font-gothamNarrow text-sm font-semibold text-black whitespace-nowrap border-gray-300 border-l border-r accent-red-500">
                        <input
                          type="checkbox"
                          checked={selectedCustomersId.includes(
                            adminCustomer.id
                          )}
                          onChange={(e) =>
                            handleSelectCustomer(e, adminCustomer.id)
                          }
                        />
                      </td>
                      <td className="px-4 py-1 text-xs">
                        {(page - 1) * results_per_page + index + 1}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                        {adminCustomer?.image_url ? (
                          <img
                            src={adminCustomer.image_url}
                            alt={`User Photo ${adminCustomer?.name}`}
                            className="h-8 w-8 rounded-full object-contain"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <FaUser className="text-gray-600 text-sm" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {adminCustomer.firstname} {adminCustomer.lastname}
                      </td>

                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {adminCustomer.email}
                      </td>

                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {adminCustomer?.contact}
                      </td>

                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {adminCustomer?.gender ? adminCustomer?.gender : "-"}
                      </td>

                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {adminCustomer.role}
                      </td>

                      <td className="px-4 font-gothamNarrow py-1 whitespace-nowrap text-sm text-[#000000]">
                        {moment(adminCustomer.date_joined).format(
                          "dddd, D MMM YYYY"
                        )}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500 border-b border-gray-300">
                        <div className="flex space-x-2">
                          <Link
                            to={`/baltra-admin-dashboard/single-customer-view/${adminCustomer.id}`}
                          >
                            <FaPencilAlt
                              className="text-green-500 hover:text-green-700"
                              title="Edit"
                            />
                          </Link>
                          <FaTrash
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                            title="Delete"
                            onClick={() => handleOpenModal(adminCustomer.id)}
                          />
                          {selectedCustomerId !== null && (
                            <DeleteCustomerPopUp
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
              <CustomerPagination
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

export default AllCustomerList;
