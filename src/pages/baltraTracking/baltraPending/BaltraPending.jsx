import { useEffect, useMemo, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiChevronDown, FiSearch, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import sessiorImg from "../../../assets/images/SessiorImg.png";
import trackingImg from "../../../assets/images/trackingserviceImg.png";
import {
  clearCustomerError,
  getAllTrackingProducts,
} from "../../../redux/features/customer/customerSlice";
import BaltraApplianceCareHeader from "../baltraApplianceCare/BaltraApplianceCareHeader";
import Pagination from "../Pagination";
import BaltraTrackingCard, { BaltraTrackingHeader } from "./BaltraTrackingCard";

/* ── Constants ─────────────────────────────────────────────── */

const PAGE_SIZE = 20;

// value = query param name your backend accepts (same as your original code)
const SEARCH_FIELDS = [
  { label: "Job ID", value: "job_no" },
  { label: "Model No.", value: "model_no" },
  { label: "Model Name", value: "model_name" },
  { label: "Serial No.", value: "serial_no" },
];

// "Completed" has its own tab, so it is not in this filter list
const PENDING_STATUSES = [
  "Unassigned",
  "Service Center Assigned",
  "Engineer Allocated",
  "Part Approval Pending from ASM",
  "Part Pending from HO",
  "Parts in Transit",
  "Part Consumed by Service Center",
  "On Service",
];

/* ── Small helpers ─────────────────────────────────────────── */

const useDebounced = (value, delay = 500) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

const RowSkeleton = () => (
  <div className="px-4 py-4 border-b border-gray-100 last:border-b-0 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
    <div className="h-3 bg-gray-100 rounded w-2/3" />
  </div>
);

/* ── Component ─────────────────────────────────────────────── */

const BaltraPending = () => {
  const { loading, error, trackingProducts } = useSelector(
    (state) => state.customer,
  );
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const listTopRef = useRef(null);

  const [activeTab, setActiveTab] = useState("pending"); // "pending" | "completed"
  const [page, setPage] = useState(1);

  const [searchField, setSearchField] = useState(SEARCH_FIELDS[0]);
  const [searchInput, setSearchInput] = useState("");
  const [activeStatus, setActiveStatus] = useState("");
  const [fieldDropdownOpen, setFieldDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const debouncedQuery = useDebounced(searchInput.trim(), 500);

  const isCompletedTab = activeTab === "completed";
  const isSearchActive = searchInput.trim().length > 0 || activeStatus !== "";

  /* ── API params ──
     Pending   → no status (backend returns pending by default)
                 or status = selected filter
     Completed → status = "Completed"
     Search    → { [field]: query }
     JSON key means we only refetch when the params really change. */
  const paramsKey = useMemo(() => {
    const params = {};
    if (debouncedQuery) params[searchField.value] = debouncedQuery;
    if (isCompletedTab) params.status = "Completed";
    else if (activeStatus) params.status = activeStatus;
    return JSON.stringify(params);
  }, [debouncedQuery, searchField.value, isCompletedTab, activeStatus]);

  useEffect(() => {
    dispatch(getAllTrackingProducts(JSON.parse(paramsKey)));
  }, [dispatch, paramsKey]);

  useEffect(() => {
    if (error) dispatch(clearCustomerError());
  }, [dispatch, error]);

  /* ── Close dropdowns on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setFieldDropdownOpen(false);
        setStatusDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Frontend pagination ── */
  const allItems = useMemo(() => {
    const list = Array.isArray(trackingProducts) ? trackingProducts : [];
    // newest first
    return [...list].sort((a, b) =>
      String(b.date_joined || "").localeCompare(String(a.date_joined || "")),
    );
  }, [trackingProducts]);

  const total = allItems.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const pagedItems = useMemo(
    () => allItems.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [allItems, safePage],
  );

  const hasData = pagedItems.length > 0;

  /* ── Handlers (only update state; the effect fetches) ── */
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  const handleFieldSelect = (field) => {
    setSearchField(field);
    setFieldDropdownOpen(false);
    setPage(1);
  };

  const handleStatusSelect = (status) => {
    setActiveStatus((prev) => (prev === status ? "" : status));
    setStatusDropdownOpen(false);
    setPage(1);
  };

  const handleClearStatus = (e) => {
    e.stopPropagation();
    setActiveStatus("");
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setActiveStatus("");
    setPage(1);
  };

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setSearchInput("");
    setActiveStatus("");
    setPage(1);
  };

  const handlePageChange = (p) => {
    setPage(p);
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* ── Hero banner ── */}
      <div className="w-full bg-gradient-to-r from-[#E91C1C] to-[#831010]">
        <BaltraApplianceCareHeader />
        <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-[278px] px-4 sm:px-8 lg:px-16 2xl:px-24">
          <img
            src={trackingImg}
            alt="Tracking"
            className="w-32 h-32 md:w-56 md:h-56 hidden md:block"
          />
          <div className="flex flex-col justify-center items-center text-white text-center mt-5 md:mt-0 h-[150px] sm:h-[200px] md:h-auto">
            <div className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-semibold font-gothamNarrow tracking-wide">
              Track Your Product
            </div>
            <div className="text-sm sm:text-base lg:text-lg font-gothamNarrow tracking-wide">
              Know the status of your Products
            </div>
          </div>
          <img
            src={sessiorImg}
            alt="Scissor"
            className="w-32 h-32 md:w-56 md:h-56 hidden md:block"
          />
        </div>
      </div>

      {/* ── Search bar ── */}
      <div className="flex justify-center relative md:-top-10 z-30 px-4">
        <div ref={dropdownRef} className="w-full max-w-[700px]">
          <div className="w-full h-12 bg-white rounded-xl shadow-lg flex items-center gap-2 px-3">
            {/* Search-by field selector */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => {
                  setFieldDropdownOpen((v) => !v);
                  setStatusDropdownOpen(false);
                }}
                className="flex items-center gap-1 text-xs font-semibold font-gothamNarrow text-red-500 border border-red-200 rounded-full px-2.5 py-1 hover:bg-red-50 transition-colors"
              >
                {searchField.label}
                <FiChevronDown
                  size={11}
                  className={`transition-transform ${fieldDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {fieldDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 min-w-[140px]">
                  {SEARCH_FIELDS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => handleFieldSelect(f)}
                      className={`w-full text-left px-3 py-1.5 text-xs font-gothamNarrow transition-colors ${
                        searchField.value === f.value
                          ? "text-red-600 font-semibold bg-red-50"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-px h-5 bg-gray-200 flex-shrink-0" />

            <FiSearch className="w-4 h-4 text-neutral-400 flex-shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder={`Search by ${searchField.label}...`}
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm text-black font-gothamNarrow placeholder:text-neutral-400"
            />

            {isSearchActive && (
              <button
                onClick={handleClearSearch}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                aria-label="Clear search"
              >
                <FiX size={16} />
              </button>
            )}

            {/* Status filter only on the Pending tab */}
            {!isCompletedTab && (
              <>
                <div className="w-px h-5 bg-gray-200 flex-shrink-0" />
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => {
                      setStatusDropdownOpen((v) => !v);
                      setFieldDropdownOpen(false);
                    }}
                    className={`flex items-center gap-1.5 text-xs font-semibold font-gothamNarrow px-2.5 py-1 rounded-full border transition-colors ${
                      activeStatus
                        ? "text-red-600 bg-red-50 border-red-200"
                        : "text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    {activeStatus ? (
                      <>
                        <span className="max-w-[110px] truncate">
                          {activeStatus}
                        </span>
                        <FiX
                          size={11}
                          onClick={handleClearStatus}
                          className="text-red-400 hover:text-red-600"
                        />
                      </>
                    ) : (
                      <>
                        Status
                        <FiChevronDown
                          size={11}
                          className={`transition-transform ${statusDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </>
                    )}
                  </button>

                  {statusDropdownOpen && (
                    <div className="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 min-w-[240px] max-h-[320px] overflow-y-auto">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-3 pt-1 pb-1.5">
                        Filter by status
                      </p>
                      {PENDING_STATUSES.map((s) => (
                        <button
                          key={s}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleStatusSelect(s)}
                          className={`w-full text-left px-3 py-1.5 text-xs font-gothamNarrow transition-colors flex items-center justify-between gap-2 ${
                            activeStatus === s
                              ? "text-red-600 font-semibold bg-red-50"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {s}
                          {activeStatus === s && (
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Pending / Completed tabs ── */}
      <div className="flex justify-center mb-6 mt-2">
        <div className="flex flex-wrap">
          {["pending", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-1 min-w-[120px] md:min-w-[200px] h-[50px] md:h-[60px] flex justify-center items-center font-gothamNarrow font-normal capitalize transition-colors ${
                activeTab === tab
                  ? "bg-[#F3232B] text-white"
                  : "bg-white border border-[#DDDDDD] text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results ── */}
      <div
        ref={listTopRef}
        className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48 pb-10 scroll-mt-4"
      >
        {/* Result count */}
        {!loading && total > 0 && (
          <p className="text-sm text-gray-500 font-gothamNarrow mb-2">
            <b className="text-gray-800">{total}</b>{" "}
            {isCompletedTab ? "completed" : "pending"} complaint
            {total === 1 ? "" : "s"}
            {isSearchActive && " found"}
          </p>
        )}

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <RowSkeleton key={i} />)
          ) : hasData ? (
            <>
              <BaltraTrackingHeader />
              {pagedItems.map((item) => (
                <BaltraTrackingCard key={item.id} item={item} />
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center py-16 text-gray-400">
              <FaSearch className="text-4xl mb-3" />
              <p className="font-semibold font-gothamNarrow text-lg text-gray-600">
                {isSearchActive ? "No results found" : "No Data Found"}
              </p>
              {isSearchActive && (
                <p className="text-sm mt-1">
                  Try a different {searchField.label} or clear the filters
                </p>
              )}
            </div>
          )}
        </div>

        {!loading && (
          <Pagination
            page={safePage}
            pageSize={PAGE_SIZE}
            total={total}
            onChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default BaltraPending;
