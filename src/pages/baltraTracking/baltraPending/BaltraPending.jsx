import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
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
import BaltraCompleted from "../baltraCompleted/BaltraCompleted";
import BaltraPendingSkeleton from "./baltraPendingSkeleton/BaltraPendingSkeleton";
import BaltraTrackingCard from "./BaltraTrackingCard";

/* ── Constants ─────────────────────────────────────────────── */

const SEARCH_FIELDS = [
  { label: "Job ID", value: "job_no" },
  { label: "Model No.", value: "model_no" },
  { label: "Model Name", value: "model_name" },
  { label: "Serial No.", value: "serial_no" },
];

const JOB_STATUSES = [
  "Unassigned",
  "Service Center Assigned",
  "Engineer Allocated",
  "Part Approval Pending from ASM",
  "Part Pending from HO",
  "Parts in Transit",
  "Part Consumed by Service Center",
  "On Service",
  "Completed",
];

/* ── Component ─────────────────────────────────────────────── */

const BaltraPending = () => {
  const { loading, error, trackingProducts } = useSelector(
    (state) => state.customer,
  );
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  // Tab state
  const [activeTab, setActiveTab] = useState("pending"); // "pending" | "completed"

  // Search state
  const [searchField, setSearchField] = useState(SEARCH_FIELDS[0]); // active search-by field
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState(""); // selected status filter
  const [fieldDropdownOpen, setFieldDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  /* ── Core dispatch ── */
  const fetchProducts = useCallback(
    (query, field, status, tab) => {
      const params = {
        // Map the chosen field key → its param value
        [field]: query.trim() || undefined,
        status: status || (tab === "completed" ? "Completed" : undefined),
      };
      dispatch(getAllTrackingProducts(params));
    },
    [dispatch],
  );

  /* ── Debounced search for live typing ── */
  const debouncedFetch = useCallback(
    debounce((query, field, status, tab) => {
      fetchProducts(query, field, status, tab);
    }, 500),
    [fetchProducts],
  );

  useEffect(() => () => debouncedFetch.cancel(), [debouncedFetch]);

  /* ── Handlers ── */

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    debouncedFetch(val, searchField.value, activeStatus, activeTab);
  };

  const handleFieldSelect = (field) => {
    setSearchField(field);
    setFieldDropdownOpen(false);
    // Re-run search with new field if query exists
    if (searchQuery.trim()) {
      debouncedFetch.cancel();
      fetchProducts(searchQuery, field.value, activeStatus, activeTab);
    }
  };

  const handleStatusSelect = (status) => {
    const next = activeStatus === status ? "" : status;
    setActiveStatus(next);
    setStatusDropdownOpen(false);
    debouncedFetch.cancel();
    fetchProducts(searchQuery, searchField.value, next, activeTab);
  };

  const handleClearStatus = (e) => {
    e.stopPropagation();
    setActiveStatus("");
    debouncedFetch.cancel();
    fetchProducts(searchQuery, searchField.value, "", activeTab);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setActiveStatus("");
    debouncedFetch.cancel();
    fetchProducts("", searchField.value, "", activeTab);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery("");
    setActiveStatus("");
    debouncedFetch.cancel();
    // For "completed" tab, force status = Completed
    dispatch(
      getAllTrackingProducts(
        tab === "completed" ? { status: "Completed" } : {},
      ),
    );
  };

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

  /* ── Initial load ── */
  useEffect(() => {
    if (error) dispatch(clearCustomerError());
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(getAllTrackingProducts({}));
  }, [dispatch]);

  const isSearchActive =
    searchQuery.trim().length > 0 || activeStatus.length > 0;

  return (
    <>
      {/* ── Hero banner ── */}
      <div className="pt-4 w-full bg-gradient-to-r from-[#E91C1C] to-[#831010]">
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
          {/* Main pill */}
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

            {/* Search input */}
            <FiSearch className="w-4 h-4 text-neutral-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={`Search by ${searchField.label}...`}
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm text-black font-gothamNarrow placeholder:text-neutral-400"
            />

            {/* Clear all button */}
            {isSearchActive && (
              <button
                onClick={handleClearSearch}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                aria-label="Clear search"
              >
                <FiX size={16} />
              </button>
            )}

            <div className="w-px h-5 bg-gray-200 flex-shrink-0" />

            {/* Status filter */}
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
                <div className="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 min-w-[240px]">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-3 pt-1 pb-1.5">
                    Filter by status
                  </p>
                  {JOB_STATUSES.map((s) => (
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
          </div>

          {/* Active status chip (visible below bar) */}
          {activeStatus && (
            <div className="flex items-center gap-1.5 mt-2 px-1">
              <span className="text-[11px] text-gray-400 font-gothamNarrow">
                Status:
              </span>
              <span className="flex items-center gap-1 bg-red-50 border border-red-200 rounded-full px-2 py-0.5 text-[11px] text-red-600 font-semibold font-gothamNarrow">
                {activeStatus}
                <button
                  onClick={handleClearStatus}
                  className="text-red-400 hover:text-red-600"
                >
                  <FiX size={10} />
                </button>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Pending / Completed tabs ── */}
      <div className="flex justify-center mb-6 mt-2">
        <div className="flex flex-wrap">
          <button
            onClick={() => handleTabChange("pending")}
            className={`flex-1 min-w-[120px] md:min-w-[200px] h-[50px] md:h-[60px] flex justify-center items-center font-gothamNarrow font-normal transition-colors ${
              activeTab === "pending"
                ? "bg-[#F3232B] text-white"
                : "bg-white border border-[#DDDDDD] text-black"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => handleTabChange("completed")}
            className={`flex-1 min-w-[120px] md:min-w-[200px] h-[50px] md:h-[60px] flex justify-center items-center font-gothamNarrow font-normal transition-colors ${
              activeTab === "completed"
                ? "bg-[#F3232B] text-white"
                : "bg-white border border-[#DDDDDD] text-black"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* ── Results ── */}
      {activeTab === "completed" ? (
        <BaltraCompleted trackingProducts={trackingProducts} />
      ) : (
        <div className="px-4 md:px-16 lg:px-24 xl:px-32 2xl:px-48 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <BaltraPendingSkeleton key={i} />
            ))
          ) : trackingProducts && trackingProducts.length > 0 ? (
            trackingProducts.map((item) => (
              <BaltraTrackingCard key={item.id} item={item} />
            ))
          ) : (
            <div className="col-span-2 flex flex-col items-center py-16 text-gray-400">
              <span className="text-4xl mb-3">
                <FaSearch />
              </span>
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
      )}
    </>
  );
};

export default BaltraPending;
