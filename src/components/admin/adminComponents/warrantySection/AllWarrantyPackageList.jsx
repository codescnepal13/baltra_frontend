import { debounce } from "lodash";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { HiOutlineRefresh, HiOutlineSearch } from "react-icons/hi";
import {
  HiOutlinePencilSquare,
  HiOutlinePlus,
  HiOutlineShieldCheck,
  HiOutlineTrash,
} from "react-icons/hi2";
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
    (state) => state.admin,
  );
  const warrantyPagination =
    useSelector((state) => state.admin.warrantyPagination) || {};
  const { page, total_pages, results_per_page } = warrantyPagination;
  const dispatch = useDispatch();

  const [selectedWarrantyId, setSelectedWarrantyId] = useState(null);
  const [selectedWarrantysId, setSelectedWarrantysId] = useState([]);
  const [searchByPackageType, setSearchByPackageType] = useState("");

  const selectAllRef = useRef(null);

  // Sync indeterminate state
  useEffect(() => {
    if (!selectAllRef.current) return;
    const total = allWarrantyPackagesList?.length ?? 0;
    const n = selectedWarrantysId.length;
    selectAllRef.current.indeterminate = n > 0 && n < total;
  }, [selectedWarrantysId, allWarrantyPackagesList]);

  const handleSelectAll = (e) => {
    setSelectedWarrantysId(
      e.target.checked ? allWarrantyPackagesList.map((w) => w.id) : [],
    );
  };

  const handleSelectWarranty = (e, id) => {
    setSelectedWarrantysId((prev) =>
      e.target.checked ? [...prev, id] : prev.filter((i) => i !== id),
    );
  };

  const handleMultipleDelete = () => {
    if (!selectedWarrantysId.length) return;
    dispatch(
      deleteMultipleWarrantyPackage({
        form_ids: selectedWarrantysId,
        enqueueSnackbar,
      }),
    ).then(() =>
      dispatch(getAllWarrantyPackages({ page, type: searchByPackageType })),
    );
    setSelectedWarrantysId([]);
  };

  const handleOpenModal = (id) => setSelectedWarrantyId(id);
  const handleCloseModal = () => setSelectedWarrantyId(null);

  const handleDeleteConfirm = () => {
    if (selectedWarrantyId == null) return;
    dispatch(
      deleteWarrantyCard({ form_id: selectedWarrantyId, enqueueSnackbar }),
    );
    setSelectedWarrantyId(null);
  };

  const debouncedSearch = useCallback(
    debounce((q) => {
      dispatch(getAllWarrantyPackages({ page: 1, type: q }));
    }, 300),
    [dispatch],
  );

  const handleInputChange = (e) => {
    setSearchByPackageType(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(
        getAllWarrantyPackages({ page: newPage, type: searchByPackageType }),
      );
    },
    [dispatch, searchByPackageType],
  );

  const handleReset = () => {
    setSelectedWarrantyId(null);
    setSelectedWarrantysId([]);
    setSearchByPackageType("");
    dispatch(getAllWarrantyPackages({ page: 1 }));
  };

  useEffect(() => {
    if (error) dispatch(clearAdminError());
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(getAllWarrantyPackages({ page, type: searchByPackageType }));
  }, [dispatch]);

  const allSelected =
    (allWarrantyPackagesList?.length ?? 0) > 0 &&
    selectedWarrantysId.length === allWarrantyPackagesList?.length;

  return (
    <div className="font-gothamNarrow max-w-screen-2xl mx-auto px-4 py-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
            <HiOutlineShieldCheck size={20} className="text-amber-500" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900 tracking-tight">
              Warranty packages
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {allWarrantyPackagesList?.length ?? 0} packages total
            </p>
          </div>
        </div>

        <Link to="/baltra-admin-dashboard/add/warranty-package">
          <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors">
            <HiOutlinePlus size={14} />
            Add warranty package
          </button>
        </Link>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="relative flex items-center">
          <HiOutlineSearch
            size={14}
            className="absolute left-3 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search by package type…"
            value={searchByPackageType}
            onChange={handleInputChange}
            className="pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 w-52 text-gray-700 placeholder:text-gray-400"
          />
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <HiOutlineRefresh size={13} />
          Reset
        </button>

        {selectedWarrantysId.length > 0 && (
          <button
            onClick={handleMultipleDelete}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors"
          >
            <HiOutlineTrash size={13} />
            Delete {selectedWarrantysId.length} selected
          </button>
        )}
      </div>

      {/* ── Selection banner ── */}
      {selectedWarrantysId.length > 0 && (
        <div className="flex items-center gap-2 mb-4 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-semibold text-amber-600">
            {selectedWarrantysId.length} item
            {selectedWarrantysId.length > 1 ? "s" : ""} selected
          </span>
        </div>
      )}

      {/* ── Table Card ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 w-10">
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    className="w-3 h-3 cursor-pointer accent-amber-500"
                  />
                </th>
                {[
                  "S.N.",
                  "Subcategory",
                  "Duration",
                  "Package type",
                  "Amount",
                  "Offers",
                  "Created at",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-7 h-7 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                      <span className="text-xs text-gray-400">
                        Loading packages…
                      </span>
                    </div>
                  </td>
                </tr>
              ) : allWarrantyPackagesList?.length > 0 ? (
                allWarrantyPackagesList.map((warranty, index) => {
                  const isSelected = selectedWarrantysId.includes(warranty.id);
                  const sn =
                    page != null && results_per_page != null
                      ? (page - 1) * results_per_page + index + 1
                      : index + 1;

                  return (
                    <tr
                      key={warranty.id}
                      className={`transition-colors duration-100 ${
                        isSelected ? "bg-amber-50/60" : "hover:bg-gray-50/70"
                      }`}
                    >
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          className="w-3 h-3 cursor-pointer accent-amber-500"
                          checked={isSelected}
                          onChange={(e) => handleSelectWarranty(e, warranty.id)}
                        />
                      </td>

                      <td className="px-4 py-2">
                        <span className="text-xs font-medium text-gray-400">
                          {sn}
                        </span>
                      </td>

                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-800">
                          {warranty?.subcategory_name || "—"}
                        </span>
                      </td>

                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-600">
                          {warranty?.period || "—"}
                        </span>
                      </td>

                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-600">
                          {warranty?.type || "—"}
                        </span>
                      </td>

                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-800">
                          <span className="text-xs font-normal text-gray-400 mr-0.5">
                            Rs
                          </span>
                          {warranty?.amt || "—"}
                        </span>
                      </td>

                      <td className="px-4 py-2 whitespace-nowrap">
                        {warranty?.offers ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-600">
                            {warranty.offers}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>

                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className="text-xs text-gray-400">
                          {moment(warranty.date_joined).format("D MMM YYYY")}
                        </span>
                      </td>

                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Link
                            to={`/baltra-admin-dashboard/edit/warranty-package/${warranty.id}`}
                          >
                            <button
                              className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center hover:bg-emerald-100 transition-colors"
                              title="Edit"
                            >
                              <HiOutlinePencilSquare
                                size={13}
                                className="text-emerald-500"
                              />
                            </button>
                          </Link>

                          <button
                            onClick={() => handleOpenModal(warranty.id)}
                            className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center hover:bg-red-100 transition-colors"
                            title="Delete"
                          >
                            <HiOutlineTrash
                              size={13}
                              className="text-red-500"
                            />
                          </button>
                        </div>

                        {selectedWarrantyId === warranty.id && (
                          <WarrantyDeletePopUp
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
                  <td colSpan={9} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                        <HiOutlineShieldCheck
                          size={22}
                          className="text-amber-300"
                        />
                      </div>
                      <p className="text-sm text-gray-400">No packages found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {total_pages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 bg-slate-50/50">
            <p className="text-xs text-slate-400 font-medium">
              Page {page} of {total_pages}
            </p>
            <WarrantyPagination
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

export default React.memo(AllWarrantyPackageList);
