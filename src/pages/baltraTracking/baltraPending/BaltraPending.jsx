import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCustomerError,
  getAllTrackingProducts,
} from "../../../redux/features/customer/customerSlice";
import BaltraTrackingCard from "./BaltraTrackingCard";
import BaltraCompleted from "../baltraCompleted/BaltraCompleted";
import BaltraPendingSkeleton from "./baltraPendingSkeleton/BaltraPendingSkeleton";
import BaltraApplianceCareHeader from "../baltraApplianceCare/BaltraApplianceCareHeader";
import { debounce } from "lodash";
import trackingImg from "../../../assets/images/trackingserviceImg.png";
import sessiorImg from "../../../assets/images/SessiorImg.png";
import { FiFilter, FiSearch } from "react-icons/fi";

const BaltraPending = () => {
  const { loading, error, trackingProducts } = useSelector(
    (state) => state.customer
  );
  const dispatch = useDispatch();

  const [isCompletedClicked, setIsCompletedClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Debounced function to dispatch action
  const fetchTrackingProducts = useCallback(
    debounce((job_no) => {
      const params = {
        job_no: job_no.trim() || undefined,
        status: isCompletedClicked ? "Completed" : undefined,
      };
      dispatch(getAllTrackingProducts(params));
    }, 500),
    [dispatch, isCompletedClicked]
  );

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    fetchTrackingProducts(value);
  };

  const handlePendingClicked = () => {
    setIsCompletedClicked(false);
    dispatch(getAllTrackingProducts({}));
  };

  const handleCompletedClicked = () => {
    setIsCompletedClicked(true);
    dispatch(getAllTrackingProducts({ status: "Completed" }));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearCustomerError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(getAllTrackingProducts());
  }, [dispatch]);

  return (
    <>
      <div className="pt-4 w-full bg-gradient-to-r from-[#E91C1C] to-[#831010] bg-opacity-60">
        <BaltraApplianceCareHeader />

        <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-[278px] px-4 sm:px-8 lg:px-16 2xl:px-24">
          <img
            src={trackingImg}
            alt="Rice Cooker"
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
            alt="Fan"
            className="w-32 h-32 md:w-56 md:h-56 hidden md:block"
          />
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-center relative md:-top-10">
        <div className="w-full max-w-[632px] h-12 px-4 bg-white rounded-lg shadow flex items-center gap-4 mt-2 mx-4 sm:mx-auto">
          <FiSearch className="w-5 h-5 text-neutral-600 opacity-50" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search product using Job Id"
            className="grow bg-transparent border-none outline-none text-zinc-950 font-normal font-gothamNarrow leading-loose opacity-50 focus:border-red-600"
          />
          <div className="flex items-center gap-2">
            <FiFilter className="text-lg opacity-50 text-zinc-950" />
            <div className="opacity-50 text-zinc-950 text-sm font-gothamNarrow leading-loose">
              Filters
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-6 mt-5">
        <div className="flex flex-wrap">
          <button
            className={`flex-1 min-w-[120px] md:min-w-[200px] h-[50px] md:h-[60px] flex justify-center items-center gap-2 ${
              !isCompletedClicked
                ? "bg-[#F3232B] text-white"
                : "bg-white border border-[#DDDDDD] text-black"
            }`}
            onClick={handlePendingClicked}
          >
            <div className="text-center font-gothamNarrow font-normal">
              Pending
            </div>
          </button>
          <button
            className={`flex-1 min-w-[120px] md:min-w-[200px] h-[50px] md:h-[60px] flex justify-center items-center gap-2 ${
              isCompletedClicked
                ? "bg-[#F3232B] text-white"
                : "bg-white border border-[#DDDDDD] text-black"
            }`}
            onClick={handleCompletedClicked}
          >
            <div className="text-center font-gothamNarrow font-normal">
              Completed
            </div>
          </button>
        </div>
      </div>

      {isCompletedClicked ? (
        <BaltraCompleted trackingProducts={trackingProducts} />
      ) : (
        <div className="px-4 md:px-16 lg:px-24 xl:px-32 2xl:px-48 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <BaltraPendingSkeleton key={index} />
            ))
          ) : trackingProducts && trackingProducts.length > 0 ? (
            trackingProducts.map((item) => (
              <BaltraTrackingCard key={item.id} item={item} />
            ))
          ) : (
            <h1 className="text-normal text-center font-gothamNarrow font-semibold">
              No Data Found
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default BaltraPending;
