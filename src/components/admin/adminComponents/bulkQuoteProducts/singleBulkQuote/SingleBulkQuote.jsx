import React, { useEffect } from "react";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAdminError,
  singleBulkQuote,
} from "../../../../../redux/features/admin/adminSlice";
import FormSkeleton from "../../adminLayout/formSkeleton/FormSkeleton";
import MetaData from "../../../../layout/metaData/MetaData";

const SingleBulkQuote = () => {
  const { loading, error, bulkQuoteProduct } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  const { quote_id } = useParams();

  useEffect(() => {
    if (error) {
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (quote_id) {
      dispatch(singleBulkQuote({ quote_id }));
    }
  }, [dispatch, quote_id]);

  if (loading) {
    return <FormSkeleton />;
  }

  if (!bulkQuoteProduct) {
    return <div>No data available</div>;
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
  } = bulkQuoteProduct || {};

  return (
    <>
      <MetaData title="Baltra-admin-dashboard-single-Bulk-Quote-Product" />
      <div className="font-gothamNarrow px-8 mt-8 md:mt-4 flex items-center">
        <Link
          to="/baltra-admin-dashboard/all/bulk-quote-products"
          className="flex items-center font-gothamNarrow"
        >
          <HiOutlineArrowLeftCircle size={24} className="mr-2" />
          View Bulk Product List
        </Link>
      </div>
      <div className="font-gothamNarrow bg-[#ffffff] container px-8 py-4 my-5 flex flex-col md:flex-row">
        {/* Left content */}
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-xl font-semibold font-gothamNarrow">
            Customer Bulk Product Information
          </h2>

          <div>
            <span className="font-semibold font-gothamNarrow">
              Customer Name:{" "}
            </span>
            <span>{customer_name}</span>
          </div>

          <div>
            <span className="font-semibold font-gothamNarrow">Contact:</span>
            <span>{contact}</span>
          </div>
          <div>
            <span className="font-semibold font-gothamNarrow">
              Model Name:{" "}
            </span>
            <span>{model_name}</span>
          </div>

          <div>
            <span className="font-semibold font-gothamNarrow">
              Model Number:
            </span>
            <span>{model_num}</span>
          </div>

          <div>
            <span className="font-semibold font-gothamNarrow">Quantity: </span>
            <span>{quantity}</span>
          </div>

          <div>
            <span className="font-semibold font-gothamNarrow">
              Description:{" "}
            </span>
            <span>{description}</span>
          </div>

          <div>
            <span className="font-semibold font-gothamNarrow">Status: </span>
            {status === "Pending" ? (
              <span className="bg-red-600 text-white px-3 py-1 rounded-full cursor-pointer">
                Pending
              </span>
            ) : status === "Approved" ? (
              <span className="bg-green-600 text-white px-3 py-1 rounded-full cursor-pointer">
                Approved
              </span>
            ) : status === "Rejected" ? (
              <span className="bg-yellow-600 text-white px-3 py-1 rounded-full cursor-pointer">
                Rejected
              </span>
            ) : (
              <span className="bg-gray-600 text-white px-3 py-1 rounded-full cursor-pointer">
                {status}
              </span>
            )}
          </div>

          <div>
            <span className="font-semibold font-gothamNarrow">
              Created At:{" "}
            </span>
            <span>{moment(created_at).format("dddd, D MMM YYYY, h:mm A")}</span>
          </div>
        </div>

        {/* Right images */}
        {/* <div className="md:w-1/2 space-y-4 md:pl-8">
          <div>
            <span className="font-semibold font-gothamNarrow">
              Personalize Image:{" "}
            </span>
            <img src={main_image} alt="Product" className="mt-2" />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default SingleBulkQuote;
