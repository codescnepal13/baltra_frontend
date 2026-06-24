import moment from "moment";
import { useEffect } from "react";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import sessiorImg from "../../../assets/images/SessiorImg.png";
import trackingImg from "../../../assets/images/trackingserviceImg.png";
import BaltraSpinner from "../../../components/layout/baltraSpinner/BaltraSpinner";
import MetaData from "../../../components/layout/metaData/MetaData";
import {
  clearProductError,
  singleOrderHistory,
} from "../../../redux/features/product/productSlice";
import BaltraApplianceCareHeader from "../../baltraTracking/baltraApplianceCare/BaltraApplianceCareHeader";

const SingleOrderHistory = () => {
  const { loading, error, bulkQuote } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { quote_id } = useParams();

  useEffect(() => {
    if (error) dispatch(clearProductError());
  }, [dispatch, error]);

  useEffect(() => {
    if (quote_id) dispatch(singleOrderHistory({ quote_id }));
  }, [dispatch, quote_id]);

  if (loading) return <BaltraSpinner />;

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

  const statusConfig = {
    Pending: {
      label: "Pending Review",
      icon: "ti-clock",
      cls: "bg-white/20 text-white border border-white/30",
    },
    Approved: {
      label: "Approved",
      icon: "ti-circle-check",
      cls: "bg-emerald-100 text-emerald-800",
    },
    Rejected: {
      label: "Rejected",
      icon: "ti-circle-x",
      cls: "bg-amber-100 text-amber-800",
    },
  };
  const currentStatus = statusConfig[status] || {
    label: status,
    icon: "ti-info-circle",
    cls: "bg-white/20 text-white border border-white/30",
  };

  return (
    <>
      <MetaData title="Single-Bulk-Order-History" />

      {/* Hero header */}
      <div className="bg-gradient-to-br from-[#E91C1C] to-[#831010] px-4 sm:px-8 lg:px-16 2xl:px-24 pt-4">
        <BaltraApplianceCareHeader />
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <img src={trackingImg} alt="" className="w-44 h-44 hidden md:block" />
          <div className="text-white text-center">
            <h1 className="text-2xl lg:text-3xl font-semibold font-gothamNarrow tracking-wide">
              Bulk Order History
            </h1>
            <p className="text-sm lg:text-base font-gothamNarrow text-white/75 mt-1">
              Know the status of your bulk order request
            </p>
          </div>
          <img src={sessiorImg} alt="" className="w-44 h-44 hidden md:block" />
        </div>
      </div>

      {bulkQuote ? (
        <div className="bg-gray-100 min-h-screen px-4 py-8">
          <div className="w-full max-w-3xl mx-auto space-y-4">
            {/* Top action bar */}
            <div className="flex items-center justify-between">
              <Link
                to="/baltra-bulk-quote"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 font-gothamNarrow transition-colors"
              >
                <HiOutlineArrowLeftCircle size={18} />
                Back to Bulk Order History
              </Link>
              <span className="font-mono text-xs bg-white border border-gray-200 rounded-md px-3 py-1.5 text-gray-500">
                #{quote_id}
              </span>
            </div>

            {/* Main card */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Card header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 font-gothamNarrow">
                  Customer Information
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400 font-gothamNarrow">
                  <span>{moment(created_at).format("D MMM YYYY, h:mm A")}</span>
                </div>
              </div>

              {/* Info grid */}
              <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-5 font-gothamNarrow">
                {[
                  { label: "Customer Name", value: customer_name },
                  { label: "Contact", value: contact },
                  { label: "Model Name", value: model_name },
                  { label: "Model Number", value: model_num },
                  { label: "Quantity", value: quantity },
                  {
                    label: "Status",
                    value: (
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                          status === "Pending"
                            ? "bg-red-100 text-red-700"
                            : status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : status === "Rejected"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {status}
                      </span>
                    ),
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-xs text-gray-400">{label}</span>
                    <span className="text-sm font-medium text-gray-800">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="px-6 py-5 border-t border-gray-100 font-gothamNarrow">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                  Description
                </p>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <p className="text-4xl mb-3">📭</p>
            <h2 className="font-semibold text-lg font-gothamNarrow text-gray-500">
              No order found
            </h2>
            <Link
              to="/baltra-bulk-quote"
              className="text-sm text-red-600 hover:underline mt-2 inline-block font-gothamNarrow"
            >
              Back to Bulk Orders
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleOrderHistory;
