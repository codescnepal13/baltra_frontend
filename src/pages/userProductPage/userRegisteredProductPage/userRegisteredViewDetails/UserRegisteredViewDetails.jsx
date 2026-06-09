import moment from "moment";
import { useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import RedRepairImg from "../../../../assets/images/redRapairImg.png";
import BaltraSpinner from "../../../../components/layout/baltraSpinner/BaltraSpinner";
import {
  clearProductError,
  SingleUserProductPage,
} from "../../../../redux/features/product/productSlice";
import UserRegisteredStepper from "../userRegisteredStepper/UserRegisteredStepper";

/* ── Status messages ── */
const STATUS_MESSAGES = {
  "Un-Assigned":
    "Your complaint has been registered and will be reviewed by our service department shortly. Thank you for your patience.",
  Unassigned:
    "Your complaint has been registered and will be reviewed by our service department shortly. Thank you for your patience.",
  "Service Center Assigned":
    "Your complaint has been assigned to our technician. Our service department will contact you shortly. Thank you for your patience.",
  "Service Center Allocated":
    "Your complaint has been assigned to our technician. Our service department will contact you shortly. Thank you for your patience.",
  "Engineer Allocated":
    "Your complaint has been assigned to our technician. Our service department will contact you shortly. Thank you for your patience.",
  "Part Approval Pending from ASM":
    "Your complaint has been verified by the technician, and the required parts have been requested. Thank you for your patience.",
  "Part Pending from HO":
    "The requested parts will be dispatched soon from the Head Office. Thank you for your patience.",
  "Parts in Transit":
    "The requested parts have been dispatched and are on their way to the technician. Thank you for your patience.",
  "Part Consumed by Service Center":
    "The requested parts have been received by the technician, and your issue will be resolved shortly. Thank you for your patience.",
  "On Service":
    "Our service department is currently reviewing your complaint. Thank you for your patience.",
  Completed:
    "Your repaired item is ready for collection. Please pick it up from the location where it was dropped off or contact our service center for assistance.",
};

const DEFAULT_MESSAGE =
  "Our team is working on your request. Thank you for your patience.";

const getMessage = (statusName = "") => {
  const trimmed = statusName.trim();
  if (STATUS_MESSAGES[trimmed]) return STATUS_MESSAGES[trimmed];
  const key = Object.keys(STATUS_MESSAGES).find(
    (k) => k.toLowerCase() === trimmed.toLowerCase(),
  );
  return key ? STATUS_MESSAGES[key] : DEFAULT_MESSAGE;
};

/* ── Status badge config ── */
const STATUS_CONFIG = {
  "Un-Assigned": { color: "text-red-600", bg: "bg-red-50", dot: "bg-red-500" },
  Unassigned: { color: "text-red-600", bg: "bg-red-50", dot: "bg-red-500" },
  "Service Center Assigned": {
    color: "text-yellow-700",
    bg: "bg-yellow-50",
    dot: "bg-yellow-500",
  },
  "Service Center Allocated": {
    color: "text-yellow-700",
    bg: "bg-yellow-50",
    dot: "bg-yellow-500",
  },
  "Engineer Allocated": {
    color: "text-blue-600",
    bg: "bg-blue-50",
    dot: "bg-blue-500",
  },
  "On Service": {
    color: "text-blue-600",
    bg: "bg-blue-50",
    dot: "bg-blue-500",
  },
  Completed: {
    color: "text-green-700",
    bg: "bg-green-50",
    dot: "bg-green-500",
  },
  Cancelled: { color: "text-gray-600", bg: "bg-gray-100", dot: "bg-gray-400" },
};

const DEFAULT_STATUS_CFG = {
  color: "text-gray-700",
  bg: "bg-gray-100",
  dot: "bg-gray-400",
};

const UserRegisteredViewDetails = () => {
  const { loading, error, singleAddedProduct } = useSelector(
    (state) => state.product,
  );

  const dispatch = useDispatch();
  const { id } = useParams();

  const warrantyExpiryDate = singleAddedProduct?.warranty_expiry
    ? moment(singleAddedProduct.warranty_expiry)
    : null;
  const isExpired = warrantyExpiryDate && warrantyExpiryDate.isBefore(moment());

  const currentStatus = singleAddedProduct?.status || "";
  const isCompleted = currentStatus.toLowerCase().includes("completed");
  const statusCfg = STATUS_CONFIG[currentStatus] || DEFAULT_STATUS_CFG;

  const handleDownload = (src, label, type) => {
    if (type === "image") {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = src;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${label.replace(/\s+/g, "_")}.png`;
        link.click();
      };
      image.onerror = () => {
        alert("Failed to download the image. Please try again.");
      };
    } else if (type === "video") {
      const link = document.createElement("a");
      link.href = src;
      link.download = `${label.replace(/\s+/g, "_")}.mp4`;
      link.click();
    }
  };

  useEffect(() => {
    if (id) dispatch(SingleUserProductPage({ stock_id: id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) dispatch(clearProductError());
  }, [dispatch, error]);

  if (loading) return <BaltraSpinner />;

  if (!singleAddedProduct) {
    return (
      <h1 className="text-center font-semibold font-gothamNarrow">
        No Data Found
      </h1>
    );
  }

  /* ── Media items for the right column ── */
  const mediaItems = [
    {
      type: "image",
      src:
        singleAddedProduct?.damaged_image || singleAddedProduct?.product_image,
      label: singleAddedProduct?.damaged_image
        ? "Damaged Product Picture"
        : "Product Image",
    },
    {
      type: "image",
      src: singleAddedProduct?.bill_image_one,
      label: "Bill Image",
    },
    {
      type: "image",
      src: singleAddedProduct?.warranty_image,
      label: "Product Warranty Image",
    },
  ];

  /* ── Product detail rows ── */
  const detailRows = [
    { label: "Model Number", value: singleAddedProduct?.model_num },
    { label: "Serial Number", value: singleAddedProduct?.serial_number },
    { label: "Store Name", value: singleAddedProduct?.store_name },
    { label: "Store Location", value: singleAddedProduct?.store_location },
    {
      label: "Purchase Date",
      value: singleAddedProduct?.purchase_date
        ? moment(singleAddedProduct.purchase_date).format("MMMM Do, YYYY")
        : "N/A",
    },
    {
      label: "Registered Date",
      value: singleAddedProduct?.created_at
        ? moment(singleAddedProduct.created_at).format("MMMM Do, YYYY")
        : "N/A",
    },
    {
      label: "Complaint Date",
      value: singleAddedProduct?.date_joined
        ? moment(singleAddedProduct.date_joined).format("MMMM Do, YYYY")
        : "N/A",
    },
    {
      label: "Reward Points Earned",
      value: singleAddedProduct?.temp_reward || 0,
    },
  ];

  return (
    <div className="w-full py-12 bg-white shadow-lg rounded-lg px-4 lg:px-32">
      {/* ── Page header ── */}
      <div className="flex flex-row items-center space-x-4 mb-6">
        <Link
          to="/baltra-user-ProductPage"
          className="p-3 rounded-full border-2 border-red-600 text-red-600 hover:bg-red-50 transition-colors"
        >
          <FaArrowLeftLong />
        </Link>
        <div className="text-left">
          <h1 className="text-xl md:text-2xl font-semibold font-gothamNarrow text-gray-900">
            {singleAddedProduct?.model_name}
          </h1>
          <p className="text-sm text-gray-500 font-gothamNarrow">
            Job ID:{" "}
            <span className="font-medium text-gray-700">
              {singleAddedProduct?.job_no || "—"}
            </span>
          </p>
        </div>
      </div>

      {/* ── Stepper ── */}
      <div className="my-8">
        <UserRegisteredStepper singleAddedProduct={singleAddedProduct} />
      </div>

      {/* ── Main two-column layout ── */}
      <div className="flex flex-wrap gap-x-0 md:gap-x-10">
        {/* Left: Product card */}
        <div className="w-full md:w-1/2 my-5">
          <div className="flex flex-col md:flex-row bg-white rounded-lg p-6 mb-6 border border-gray-200">
            <div className="flex-shrink-0">
              <img
                className="w-full sm:w-32 md:w-40 lg:w-48 h-auto object-cover rounded"
                src={singleAddedProduct?.product_image}
                alt={singleAddedProduct?.model_name}
              />
            </div>
            <div className="ml-0 md:ml-8 mt-4 md:mt-0 w-full">
              <h2 className="text-base font-semibold font-gothamNarrow text-gray-900">
                {singleAddedProduct?.model_name}
              </h2>
              <p className="text-xs text-gray-400 mb-4 font-gothamNarrow">
                Job ID: {singleAddedProduct?.job_no || "—"}
              </p>

              <div className="flex flex-col gap-2.5">
                {detailRows.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-start gap-4 text-sm"
                  >
                    <span className="font-semibold font-gothamNarrow text-gray-700 whitespace-nowrap">
                      {label}
                    </span>
                    <span className="font-gothamNarrow text-gray-600 text-right">
                      {value || "N/A"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Media cards */}
        <div className="w-full md:w-2/5 flex flex-col space-y-4 font-gothamNarrow my-5">
          {mediaItems.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded border border-gray-200 p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold font-gothamNarrow text-gray-800">
                  {item.label}
                </span>
                <button
                  className="px-3 py-1.5 bg-[#122F5A] hover:bg-[#0e2449] text-white text-xs font-gothamNarrow rounded transition-colors"
                  onClick={() =>
                    handleDownload(item.src, item.label, item.type)
                  }
                >
                  Download
                </button>
              </div>
              <img
                className="w-full h-48 object-contain rounded"
                src={item.src}
                alt={item.label}
              />
            </div>
          ))}
        </div>

        {/* ── Current Stage ── */}
        <div className="w-full mx-auto p-6 bg-[#D0D5DD]/20 rounded-lg my-5">
          <div className="flex flex-col mb-5">
            <h3 className="text-[#1A1A1A] text-xl md:text-2xl font-semibold font-gothamNarrow">
              Current Stage
            </h3>
            <p className="text-gray-500 text-sm font-gothamNarrow">
              Find out which stage your product is in.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <img
              className="w-[70px] md:w-[90px] h-[70px] md:h-[90px] rounded-lg object-cover"
              src={RedRepairImg}
              alt="Stage"
            />
            <div>
              {/* Status badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold font-gothamNarrow
                  ${statusCfg.bg} ${statusCfg.color}`}
              >
                <span className={`w-2 h-2 rounded-full ${statusCfg.dot}`} />
                {currentStatus || "—"}
              </span>
              {/* Warranty expiry date */}
              {warrantyExpiryDate && (
                <p className="text-[#667085] text-sm font-gothamNarrow mt-1">
                  Warranty: {warrantyExpiryDate.format("ddd, MMM D, YYYY")}
                </p>
              )}
            </div>
          </div>

          {/* Dynamic message based on current status */}
          <p
            className={`mt-5 text-sm md:text-base font-gothamNarrow leading-relaxed
              ${isCompleted ? "text-green-700" : "text-[#1A1A1A]"}`}
          >
            {getMessage(currentStatus)}
          </p>

          {/* Warranty expiry warning */}
          {isExpired && (
            <p className="mt-3 text-red-600 text-sm font-gothamNarrow">
              Note: Your product warranty has expired. Please contact our
              service center for further assistance.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRegisteredViewDetails;
