import { debounce } from "lodash";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { LuSlidersHorizontal } from "react-icons/lu";
import { useDispatch } from "react-redux";
import FanImg from "../../../assets/images/FanImg.png";
import RiceCookerImg from "../../../assets/images/RiceCookerImg.png";
import TopHeader from "../../../components/topHeader/TopHeader";
import {
  baltraSearchProducts,
  clearSearch,
} from "../../../redux/features/product/productSlice";

const FILTERS = [
  "Mixer Grinder",
  "Air Fryer",
  "Stand Fan",
  "Electric Heater",
  "Bottle",
  "Geyser",
  "Air Cooler",
  "Pressure Cooker",
  "Iron",
  "Rice Cooker",
  "Induction & Infrared Cooktop",
];

const AllProductsBanner = ({ onSearchChange, onClearSearch, searchState }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const [product_name, setProductName] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const executeSearch = useCallback(
    (name, filter) => {
      const hasQuery = name.trim().length > 0 || filter.length > 0;

      if (!hasQuery) {
        dispatch(clearSearch());
        onSearchChange({ query: "", filter: "", isActive: false });
        return;
      }

      dispatch(
        baltraSearchProducts({
          product_name: name || "",
          ...(filter ? { category: filter } : {}),
        }),
      );

      onSearchChange({ query: name, filter, isActive: true });
    },
    [dispatch, onSearchChange],
  );

  const debouncedSearch = useMemo(
    () => debounce((name, filter) => executeSearch(name, filter), 300),
    [executeSearch],
  );

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setProductName(val);
    debouncedSearch(val, activeFilter);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      debouncedSearch.cancel();
      executeSearch(product_name, activeFilter);
    }
  };

  const handleFilterSelect = (filter) => {
    const next = activeFilter === filter ? "" : filter;
    setActiveFilter(next);
    setDropdownOpen(false);
    debouncedSearch.cancel();
    executeSearch(product_name, next);
  };

  const clearFilter = (e) => {
    e.stopPropagation();
    setActiveFilter("");
    debouncedSearch.cancel();
    executeSearch(product_name, "");
  };

  const handleClearAll = () => {
    setProductName("");
    setActiveFilter("");
    debouncedSearch.cancel();
    onClearSearch(); // dispatch(clearSearch) + reset parent state handled in parent
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* Hero banner — unchanged */}
      <div className="relative w-full bg-gradient-to-r from-[#E91C1C] to-[#831010]">
        <div className="absolute top-0 left-0 w-full z-10">
          <TopHeader />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-14 h-auto md:h-[258px] px-4 sm:px-8 lg:px-16 2xl:px-24">
          <img
            src={RiceCookerImg}
            alt="Rice Cooker"
            className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] lg:w-[230px] lg:h-[170px] object-contain"
          />
          <div className="text-white text-center my-4 md:my-0">
            <div className="text-lg sm:text-xl lg:text-3xl 2xl:text-4xl font-medium font-gothamNarrow tracking-wide">
              What are You Looking for?
            </div>
            <div className="text-sm lg:text-base 2xl:text-lg font-gothamNarrow tracking-wide mt-2">
              Empower Your Home, Elevate Your Lifestyle!
            </div>
          </div>
          <img
            src={FanImg}
            alt="Fan"
            className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[190px] object-contain"
          />
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex justify-center relative -top-6 md:-top-10 z-30 px-4">
        <div ref={dropdownRef} className="w-full max-w-[632px]">
          <div
            className={`w-full h-12 px-4 bg-white shadow-lg flex items-center gap-3 transition-all duration-200 ${
              dropdownOpen ? "rounded-t-xl rounded-b-none" : "rounded-xl"
            }`}
          >
            <FiSearch className="w-4 h-4 text-neutral-400 flex-shrink-0" />

            <input
              type="text"
              placeholder="Search product using name, category or model"
              value={product_name}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setDropdownOpen(true)}
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm text-black font-gothamNarrow leading-loose placeholder:text-neutral-400"
            />

            {/* Clear all — shown only when search is active */}
            {searchState?.isActive && (
              <button
                onClick={handleClearAll}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                aria-label="Clear search"
              >
                <FiX size={16} />
              </button>
            )}

            {activeFilter && (
              <div className="flex items-center gap-1 bg-red-50 border border-red-200 rounded-full px-2.5 py-0.5 flex-shrink-0">
                <span className="text-red-600 text-[11px] font-semibold font-gothamNarrow whitespace-nowrap max-w-[110px] truncate">
                  {activeFilter}
                </span>
                <button
                  onClick={clearFilter}
                  className="text-red-400 hover:text-red-600 transition-colors"
                  aria-label="Clear filter"
                >
                  <FiX size={11} />
                </button>
              </div>
            )}

            <div className="w-px h-5 bg-gray-200 flex-shrink-0" />

            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className={`flex items-center gap-1.5 flex-shrink-0 relative transition-colors ${
                dropdownOpen || activeFilter
                  ? "text-red-500"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
              aria-label="Toggle filters"
            >
              <LuSlidersHorizontal size={15} />
              <span className="text-sm font-gothamNarrow hidden sm:inline">
                Filters
              </span>
              {activeFilter && (
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-red-500" />
              )}
            </button>
          </div>

          {dropdownOpen && (
            <div className="w-full bg-white border-t border-gray-100 rounded-b-xl shadow-lg">
              <div className="px-4 pt-3 pb-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2.5">
                  Filter by category
                </p>
                <div className="flex flex-wrap gap-2">
                  {FILTERS.map((f) => (
                    <button
                      key={f}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleFilterSelect(f)}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-semibold font-gothamNarrow border transition-all duration-150 ${
                        activeFilter === f
                          ? "bg-red-500 text-white border-red-500 shadow-sm"
                          : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500 hover:bg-red-50"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(AllProductsBanner);
