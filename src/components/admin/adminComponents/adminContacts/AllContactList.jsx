import { debounce } from "lodash";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import {
  FaEye,
  FaSearch,
  FaSyncAlt,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearContactError,
  deleteContactData,
  deleteMultipleContacts,
  getAllContactList,
} from "../../../../redux/features/contact/contactSlice";
import MetaData from "../../../layout/metaData/MetaData";
import ContactPagination from "../adminPagination/contactPagination/ContactPagination";
import ContactDeletePopUp from "./contactDeletePopUp/ContactDeletePopUp";

const AllContactList = () => {
  const { loading, error, allContacts } = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  const contactPagination =
    useSelector((state) => state.contact.contactPagination) || {};
  const { page, total_pages, results_per_page } = contactPagination;
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [selectedContactsId, setSelectedContactsId] = useState([]);
  const [searchByCustomerName, setSearchByCustomerName] = useState("");
  const [searchByCustomerNumber, setSearchByCustomerNumber] = useState("");

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allContactsId = allContacts.map((contact) => contact.id);
      setSelectedContactsId(allContactsId);
    } else {
      setSelectedContactsId([]);
    }
  };

  const handleSelectContact = (event, contactId) => {
    if (event.target.checked) {
      setSelectedContactsId((prev) => [...prev, contactId]);
    } else {
      setSelectedContactsId((prev) => prev.filter((id) => id !== contactId));
    }
  };

  const handleMultipleDelete = () => {
    if (selectedContactsId.length > 0) {
      dispatch(
        deleteMultipleContacts({
          contact_ids: selectedContactsId,
          enqueueSnackbar,
        })
      ).then(() => {
        dispatch(
          getAllContactList({
            page,
            name: searchByCustomerName,
            phone: searchByCustomerNumber,
          })
        );
      });

      setSelectedContactsId([]);
    }
  };

  const handleOpenModal = (contactId) => {
    setSelectedContactId(contactId);
  };

  const handleCloseModal = () => {
    setSelectedContactId(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedContactId !== null) {
      dispatch(
        deleteContactData({ contact_id: selectedContactId, enqueueSnackbar })
      );

      setSelectedContactId(null);
    }
  };

  // Generic debounced search function
  const debouncedSearch = useCallback(
    debounce((query, type) => {
      const searchQuery = { page: 1 };
      if (type === "name") searchQuery.name = query;
      if (type === "phone") searchQuery.phone = query;

      dispatch(getAllContactList(searchQuery));
    }, 300),
    [dispatch]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchByCustomerName(value);
    debouncedSearch(value, "name");
  };

  const handleNumberInputChange = (e) => {
    const value = e.target.value;
    setSearchByCustomerNumber(value);
    debouncedSearch(value, "phone");
  };

  const handleReset = () => {
    setSearchByCustomerName("");
    setSearchByCustomerNumber("");
    setSelectedContactsId([]);
    setSelectedContactId(null);

    dispatch(
      getAllContactList({
        page: 1,
        name: "",
        phone: "",
      })
    );
  };

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(
        getAllContactList({
          page: newPage,
          name: searchByCustomerName,
          phone: searchByCustomerNumber,
        })
      );
    },
    [dispatch, searchByCustomerName, searchByCustomerNumber]
  );

  useEffect(() => {
    if (error) {
      dispatch(clearContactError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(
      getAllContactList({
        page,
        name: searchByCustomerName,
        phone: searchByCustomerNumber,
      })
    );
  }, [dispatch, page, searchByCustomerName, searchByCustomerNumber]);

  return (
    <>
      <MetaData title="Baltra-admin-dashboard-all-contact-list" />
      <div className="font-gothamNarrow container mx-auto px-4 py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold font-gothamNarrow">
            All Contact List
          </h2>
        </div>
        <div className="bg-[#FFFFFF] px-2 py-4">
          <div className="flex mb-2 text-xs">
            <div className="relative mr-2 flex items-center">
              <input
                type="text"
                placeholder="Search by contact name"
                className="w-42 pl-4 pr-10 py-2 border text-sm border-gray-300 rounded-sm focus:outline-none focus:border-red-500 focus:ring-gray-300 font-gothamNarrow"
                value={searchByCustomerName}
                onChange={handleInputChange}
              />
              <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 ml-1 inline-flex items-center rounded-sm">
                <FaSearch />
              </button>
            </div>

            <div className="relative mr-2 flex items-center">
              <input
                type="text"
                placeholder="Search by contact number"
                className="w-42 pl-4 pr-10 py-2 border text-sm border-gray-300 rounded-sm focus:outline-none focus:border-red-500 focus:ring-gray-300 font-gothamNarrow"
                value={searchByCustomerNumber}
                onChange={handleNumberInputChange}
              />
              <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 ml-1 inline-flex items-center rounded-sm">
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

          {selectedContactsId.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm text-blue-700 font-medium mr-2">
                {selectedContactsId.length} item(s) selected
              </span>
            </div>
          )}

          <div className="bg-white font-sans table-container hide-scrollbar overflow-x-auto">
            {selectedContactsId?.length > 0 && (
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
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap accent-red-500">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        allContacts.length > 0 &&
                        selectedContactsId.length === allContacts.length
                      }
                    />
                  </th>
                  <th className="px-4 py-1 text-left text-sm font-semibold text-black font-gothamNarrow">
                    S.N.
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    Customer Name
                  </th>

                  <th className="px-4 py-2  text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    ContactNo
                  </th>

                  <th className="px-4 py-2 text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    CreatedAt
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 font-gothamNarrow">
                {loading ? (
                  <tr>
                    <td colSpan={12} className="text-center">
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-gray-800 border-t-gray-800"></div>
                    </td>
                  </tr>
                ) : allContacts && allContacts.length > 0 ? (
                  allContacts.map((adminContact, index) => (
                    <tr
                      key={adminContact.id}
                      className="hover:bg-[#FFF0E5] hover:shadow-sm border-t border-b border-r border-l border-gray-300 cursor-pointer"
                    >
                      <td className="px-4 py-2 font-gothamNarrow text-sm font-semibold text-black whitespace-nowrap border-gray-300 border-l border-r accent-red-500">
                        <input
                          type="checkbox"
                          checked={selectedContactsId.includes(adminContact.id)}
                          onChange={(e) =>
                            handleSelectContact(e, adminContact.id)
                          }
                        />
                      </td>
                      <td className="px-4 py-1 text-left text-sm text-black font-gothamNarrow border-l whitespace-nowrap">
                        {page != null && results_per_page != null
                          ? (page - 1) * results_per_page + index + 1
                          : ""}
                      </td>
                      <td className="px-4 py-1 text-sm text-black">
                        {adminContact.name}
                      </td>
                      <td className="px-4 py-1 text-sm text-black">
                        {adminContact.email}
                      </td>
                      <td className="px-4 py-1 text-sm text-black">
                        {adminContact.phone}
                      </td>
                      <td className="px-4 py-1 text-sm text-black">
                        {moment(adminContact.created_at).format(
                          "MMM Do YYYY, h:mm:ss A"
                        )}
                      </td>
                      <td className="px-4 py-1 text-sm text-black">
                        <div className="flex">
                          <Link
                            to={`/baltra-admin-dashboard/single-view-contact/${adminContact.id}`}
                          >
                            <FaEye className="text-blue-600 hover:text-black mx-1" />
                          </Link>
                          <button
                            onClick={() => handleOpenModal(adminContact.id)}
                          >
                            <FaTrash className="text-red-600 hover:text-red-700 mx-1" />
                          </button>
                          {selectedContactId === adminContact.id && (
                            <ContactDeletePopUp
                              isOpen={true}
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
                    <td colSpan={12} className="text-center text-sm">
                      No contacts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {total_pages !== null && total_pages > 1 ? (
            <div className="flex justify-end mt-0">
              <ContactPagination
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

export default React.memo(AllContactList);
