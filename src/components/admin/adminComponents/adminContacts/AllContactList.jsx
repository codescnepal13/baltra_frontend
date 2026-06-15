import { debounce } from "lodash";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import {
  FaDownload,
  FaEye,
  FaSearch,
  FaSyncAlt,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import {
  clearContactError,
  deleteContactData,
  deleteMultipleContacts,
  getAllContactList,
} from "../../../../redux/features/contact/contactSlice";
import MetaData from "../../../layout/metaData/MetaData";
import ContactPagination from "../adminPagination/contactPagination/ContactPagination";
import ContactDeletePopUp from "./contactDeletePopUp/ContactDeletePopUp";
import SingleViewContact from "./singleViewContact/SingleViewContact";

// ─── Avatar initials ──────────────────────────────────────────────────────────
const Avatar = ({ name }) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";
  return (
    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0 bg-blue-100 text-blue-500">
      {initials}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
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

  // Add state (alongside selectedContactId)
  const [viewContact, setViewContact] = useState(null);

  // Add handlers
  const handleOpenView = (contact) => setViewContact(contact);
  const handleCloseView = () => setViewContact(null);

  // ── Select ────────────────────────────────────────────────────────────────
  const allSelected =
    allContacts?.length > 0 && selectedContactsId.length === allContacts.length;

  const handleSelectAll = (e) => {
    setSelectedContactsId(e.target.checked ? allContacts.map((c) => c.id) : []);
  };

  const handleSelectContact = (e, contactId) => {
    setSelectedContactsId((prev) =>
      e.target.checked
        ? [...prev, contactId]
        : prev.filter((id) => id !== contactId),
    );
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleOpenModal = (id) => setSelectedContactId(id);
  const handleCloseModal = () => setSelectedContactId(null);

  const handleDeleteConfirm = () => {
    if (selectedContactId !== null) {
      dispatch(
        deleteContactData({ contact_id: selectedContactId, enqueueSnackbar }),
      );
      setSelectedContactId(null);
    }
  };

  const handleMultipleDelete = () => {
    if (selectedContactsId.length > 0) {
      dispatch(
        deleteMultipleContacts({
          contact_ids: selectedContactsId,
          enqueueSnackbar,
        }),
      ).then(() =>
        dispatch(
          getAllContactList({
            page,
            name: searchByCustomerName,
            phone: searchByCustomerNumber,
          }),
        ),
      );
      setSelectedContactsId([]);
    }
  };

  // ── Search ────────────────────────────────────────────────────────────────
  const debouncedSearch = useCallback(
    debounce((query, type) => {
      const searchQuery = { page: 1 };
      if (type === "name") searchQuery.name = query;
      if (type === "phone") searchQuery.phone = query;
      dispatch(getAllContactList(searchQuery));
    }, 300),
    [dispatch],
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
    dispatch(getAllContactList({ page: 1, name: "", phone: "" }));
  };

  // ── Pagination ────────────────────────────────────────────────────────────
  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(
        getAllContactList({
          page: newPage,
          name: searchByCustomerName,
          phone: searchByCustomerNumber,
        }),
      );
    },
    [dispatch, searchByCustomerName, searchByCustomerNumber],
  );

  // ── Excel Export ──────────────────────────────────────────────────────────
  const handleExportExcel = () => {
    if (!allContacts || allContacts.length === 0) {
      enqueueSnackbar("No data to export", { variant: "warning" });
      return;
    }

    const exportData = allContacts.map((contact, index) => ({
      "S.N.":
        page != null && results_per_page != null
          ? (page - 1) * results_per_page + index + 1
          : index + 1,
      "Customer Name": contact.name,
      Email: contact.email,
      "Contact No": contact.phone,
      "Created At": moment(contact.created_at).format("MMM Do YYYY, h:mm:ss A"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

    worksheet["!cols"] = [
      { wch: 5 },
      { wch: 20 },
      { wch: 28 },
      { wch: 15 },
      { wch: 24 },
    ];

    XLSX.writeFile(workbook, `contacts-${Date.now()}.xlsx`);
    enqueueSnackbar("Exported successfully", { variant: "success" });
  };

  // ── Effects ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (error) dispatch(clearContactError());
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(
      getAllContactList({
        page,
        name: searchByCustomerName,
        phone: searchByCustomerNumber,
      }),
    );
  }, [dispatch]);

  return (
    <>
      <MetaData title="Baltra-admin-dashboard-all-contact-list" />
      <div className="font-inter px-4 py-4 max-w-screen-2xl mx-auto">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[15px] font-semibold tracking-[-0.01em] text-gray-900">
              All Contact List
            </h1>
            <p className="text-[12px] text-gray-400 tracking-[0.01em] mt-0.5">
              View and manage customer contact enquiries
            </p>
          </div>
        </div>

        {/* Table card */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100">
            {/* Search by name */}
            <div className="relative">
              <FaSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                size={11}
              />
              <input
                type="text"
                value={searchByCustomerName}
                onChange={handleInputChange}
                placeholder="Search by contact name..."
                className="pl-8 pr-3 py-1.5 text-[12.5px] tracking-[0.01em] text-gray-700 border border-gray-200 rounded-lg outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/10 w-48 placeholder:text-gray-300 transition-all"
              />
            </div>

            {/* Search by number */}
            <div className="relative">
              <FaSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                size={11}
              />
              <input
                type="text"
                value={searchByCustomerNumber}
                onChange={handleNumberInputChange}
                placeholder="Search by contact number..."
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
            {selectedContactsId.length > 0 && (
              <button
                onClick={handleMultipleDelete}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium tracking-[0.02em] text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
              >
                <FaTrashAlt size={11} />
                Delete ({selectedContactsId.length})
              </button>
            )}

            {/* Excel export */}
            {allContacts?.length > 0 && (
              <button
                onClick={handleExportExcel}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium tracking-[0.02em] text-emerald-600 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors ml-auto"
              >
                <FaDownload size={10} />
                Export Excel
              </button>
            )}
          </div>

          {/* Selected banner */}
          {selectedContactsId.length > 0 && (
            <div className="px-4 py-2 bg-blue-50 border-b border-blue-100">
              <span className="text-[11.5px] font-medium tracking-[0.02em] text-blue-600">
                {selectedContactsId.length} contact
                {selectedContactsId.length > 1 ? "s" : ""} selected
              </span>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto hide-scrollbar">
            <table className="min-w-full text-[12.5px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={allSelected}
                      className="accent-red-500 w-3.5 h-3.5 cursor-pointer"
                    />
                  </th>
                  {[
                    "S.N.",
                    "Customer Name",
                    "Email",
                    "Contact No",
                    "Created At",
                    "Actions",
                  ].map((col) => (
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
                    <td colSpan={7} className="text-center py-10">
                      <div className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-red-500" />
                    </td>
                  </tr>
                ) : allContacts && allContacts.length > 0 ? (
                  allContacts.map((adminContact, index) => {
                    const isChecked = selectedContactsId.includes(
                      adminContact.id,
                    );
                    return (
                      <tr
                        key={adminContact.id}
                        className={`transition-colors cursor-pointer ${
                          isChecked ? "bg-red-50/40" : "hover:bg-[#FFF0E5]/60"
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) =>
                              handleSelectContact(e, adminContact.id)
                            }
                            className="accent-red-500 w-3.5 h-3.5 cursor-pointer"
                          />
                        </td>

                        {/* S.N. */}
                        <td className="px-4 py-2 text-gray-400 tabular-nums w-10">
                          {page != null && results_per_page != null
                            ? (page - 1) * results_per_page + index + 1
                            : index + 1}
                        </td>

                        {/* Customer Name */}
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-2.5">
                            <Avatar name={adminContact.name} />
                            <span className="font-medium text-gray-800 whitespace-nowrap tracking-[0.01em]">
                              {adminContact.name}
                            </span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-4 py-2 text-gray-500 whitespace-nowrap tracking-[0.01em]">
                          {adminContact.email}
                        </td>

                        {/* Phone */}
                        <td className="px-4 py-2 text-gray-600 font-mono tracking-[0.03em] whitespace-nowrap">
                          {adminContact.phone}
                        </td>

                        {/* Created At */}
                        <td className="px-4 py-2 text-gray-500 whitespace-nowrap tabular-nums tracking-[0.01em]">
                          {moment(adminContact.date_joined).format(
                            "MMM Do YYYY, h:mm A",
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-1">
                            {/* Replace the FaEye Link with: */}
                            <button
                              onClick={() => handleOpenView(adminContact)}
                              className="p-1.5 rounded-lg text-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                              title="View contact"
                            >
                              <FaEye size={12} />
                            </button>
                            <button
                              onClick={() => handleOpenModal(adminContact.id)}
                              className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete contact"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                          {selectedContactId === adminContact.id && (
                            <ContactDeletePopUp
                              isOpen={true}
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
                    <td colSpan={7} className="text-center py-14">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <FaSearch className="text-gray-300" size={14} />
                        </div>
                        <p className="text-[12.5px] text-gray-400 tracking-[0.02em]">
                          No contacts found
                        </p>
                        <button
                          onClick={handleReset}
                          className="text-[11.5px] text-red-400 hover:text-red-600 tracking-[0.02em] transition-colors"
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

          <SingleViewContact
            contact={viewContact}
            isOpen={!!viewContact}
            onClose={handleCloseView}
          />

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-100 min-h-[44px]">
            <span className="text-[11px] text-gray-400 tabular-nums">
              {allContacts?.length ?? 0} result
              {allContacts?.length !== 1 ? "s" : ""}
            </span>

            {total_pages > 1 && (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-gray-400 mr-1">
                  Page {page} of {total_pages}
                </span>
                <ContactPagination
                  currentPage={page}
                  totalPages={total_pages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(AllContactList);
