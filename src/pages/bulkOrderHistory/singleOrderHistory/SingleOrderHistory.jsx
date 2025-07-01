import React, { useEffect } from "react";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductError,
  singleOrderHistory,
} from "../../../redux/features/product/productSlice";
import BaltraSpinner from "../../../components/layout/baltraSpinner/BaltraSpinner";
import MetaData from "../../../components/layout/metaData/MetaData";
import BaltraApplianceCareHeader from "../../baltraTracking/baltraApplianceCare/BaltraApplianceCareHeader";
import trackingImg from "../../../assets/images/trackingserviceImg.png";
import sessiorImg from "../../../assets/images/SessiorImg.png";

const SingleOrderHistory = () => {
  const { loading, error, bulkQuote } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { quote_id } = useParams();

  useEffect(() => {
    if (error) {
      dispatch(clearProductError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (quote_id) {
      dispatch(singleOrderHistory({ quote_id }));
    }
  }, [dispatch, quote_id]);

  if (loading) {
    return <BaltraSpinner />;
  }

  const {
    customer_name,
    model_name,
    model_num,
    contact,
    quantity,
    description,
    status,
    created_at,
  } = bulkQuote || {};

  return (
    <>
      <MetaData title="Single-Bulk-Order-History" />
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
              Bulk Order History
            </div>
            <div className="text-sm sm:text-base lg:text-lg font-gothamNarrow tracking-wide">
              Know the status of your Bulk History
            </div>
          </div>
          <img
            src={sessiorImg}
            alt="Fan"
            className="w-32 h-32 md:w-56 md:h-56 hidden md:block"
          />
        </div>
      </div>
      {bulkQuote ? (
        <div className="flex items-center justify-center bg-gray-100 px-4 py-6">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-md border p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <Link
                to="/baltra-bulk-quote"
                className="flex items-center text-gray-600 hover:text-gray-800 font-semibold font-gothamNarrow"
              >
                <HiOutlineArrowLeftCircle size={20} className="mr-2" />
                View Bulk Order History
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-gothamNarrow">
              <div>
                <div className="mb-3">
                  <span className="font-semibold">Customer Name: </span>
                  <span>{customer_name}</span>
                </div>

                <div className="mb-3">
                  <span className="font-semibold">Contact: </span>
                  <span>{contact}</span>
                </div>

                <div className="mb-3">
                  <span className="font-semibold">Model Name: </span>
                  <span>{model_name}</span>
                </div>

                <div className="mb-3">
                  <span className="font-semibold">Model Number: </span>
                  <span>{model_num}</span>
                </div>
              </div>

              <div>
                <div className="mb-3">
                  <span className="font-semibold">Quantity: </span>
                  <span>{quantity}</span>
                </div>

                <div className="mb-3">
                  <span className="font-semibold">Status: </span>
                  {status === "Pending" ? (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full">
                      Pending
                    </span>
                  ) : status === "Approved" ? (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full">
                      Approved
                    </span>
                  ) : status === "Rejected" ? (
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full">
                      Rejected
                    </span>
                  ) : (
                    <span className="bg-gray-500 text-white px-3 py-1 rounded-full">
                      {status}
                    </span>
                  )}
                </div>

                <div className="mb-3">
                  <span className="font-semibold">Created At: </span>
                  <span className="whitespace-nowrap">
                    {moment(created_at).format("D MMM YYYY, h:mm A")}
                  </span>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-6 font-gothamNarrow">
              <h3 className="font-semibold mb-2 font-gothamNarrow">
                Description:
              </h3>
              <p className="text-gray-700 text-justify whitespace-pre-wrap font-gothamNarrow">
                {description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <h1 className="font-semibold text-lg font-gothamNarrow text-gray-600">
            No Data Found
          </h1>
        </div>
      )}
    </>
  );
};

export default SingleOrderHistory;
