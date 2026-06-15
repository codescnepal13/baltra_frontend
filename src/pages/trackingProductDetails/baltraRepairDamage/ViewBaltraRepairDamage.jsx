import moment from "moment";
import { useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BaltraSpinner from "../../../components/layout/baltraSpinner/BaltraSpinner";
import {
  clearCustomerError,
  singleTrackingProductByID,
} from "../../../redux/features/customer/customerSlice";
import TrackingStepper from "../trackingStepper/TrackingStepper";

const ViewBaltraRepairDamage = () => {
  const { loading, error, trackingProduct } = useSelector(
    (state) => state.customer,
  );

  const dispatch = useDispatch();
  const { complaint_id } = useParams();
  const navigate = useNavigate();

  const warrantyExpiryDate = trackingProduct?.warranty_expiry
    ? moment(trackingProduct.warranty_expiry)
    : null;
  const isExpired = warrantyExpiryDate && warrantyExpiryDate.isBefore(moment());

  const currentStatus = trackingProduct?.status || "";
  const isCompleted = currentStatus.toLowerCase().includes("completed");

  const handleDownload = (src, label, type) => {
    if (type === "image") {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = src;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext("2d").drawImage(image, 0, 0);
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${label.replace(/\s+/g, "_")}.png`;
        link.click();
      };
      image.onerror = () =>
        alert("Failed to download the image. Please try again.");
    } else if (type === "video") {
      const link = document.createElement("a");
      link.href = src;
      link.download = `${label.replace(/\s+/g, "_")}.mp4`;
      link.click();
    }
  };

  useEffect(() => {
    if (error) dispatch(clearCustomerError());
  }, [dispatch, error]);

  useEffect(() => {
    if (complaint_id) dispatch(singleTrackingProductByID({ complaint_id }));
  }, [dispatch, complaint_id]);

  if (loading) return <BaltraSpinner />;

  if (!trackingProduct) {
    return (
      <h1 className="text-center font-semibold font-gothamNarrow">
        No Data Found
      </h1>
    );
  }

  const mediaItems = [
    {
      type: "image",
      src: trackingProduct?.damaged_image,
      label: "Damaged Product Picture",
    },
    {
      type: "video",
      src: trackingProduct?.damaged_video,
      label: "Damaged Product Video",
    },
  ];

  return (
    <div className="w-full py-12 bg-white shadow-lg rounded-lg px-4 lg:px-32">
      {/* ── Header ── */}
      <div className="flex flex-row items-center space-x-4 mb-6">
        <button
          onClick={() => navigate("/baltra-trackingProducts")}
          className="p-3 rounded-full border-2 border-red-600 text-red-600 hover:bg-red-50 transition-colors"
        >
          <FaArrowLeftLong />
        </button>
        <div className="text-left">
          <div className="text-xl md:text-2xl font-semibold font-gothamNarrow">
            {trackingProduct?.model_name}
          </div>
          <div className="text-sm text-gray-500 font-gothamNarrow">
            Job ID:{" "}
            <span className="font-medium text-gray-700">
              {trackingProduct?.job_no || "—"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Stepper (banner included inside) ── */}
      <div className="my-10">
        <TrackingStepper trackingProduct={trackingProduct} />
      </div>

      {/* ── Main content ── */}
      <div className="flex flex-wrap gap-x-0 md:gap-x-10">
        {/* Product card */}
        <div className="w-full md:w-1/2 my-5">
          <div className="flex flex-col md:flex-row bg-white rounded-lg p-6 mb-6 border border-gray-200">
            <div className="flex-shrink-0">
              <img
                className="w-full sm:w-32 md:w-40 lg:w-56 h-auto sm:h-32 md:h-40 lg:h-56 object-contain"
                src={trackingProduct?.damaged_image}
                alt="Product"
              />
            </div>
            <div className="ml-0 md:ml-12 mt-4 md:mt-0 text-center md:text-left w-full">
              <div className="text-base font-semibold font-gothamNarrow text-gray-900">
                {trackingProduct?.model_name}
              </div>
              <div className="text-xs text-gray-400 mb-4 font-gothamNarrow">
                Model No: {trackingProduct?.model_num}
              </div>

              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Job ID", value: trackingProduct?.job_no || "—" },
                  { label: "Sent for", value: trackingProduct?.problem_type },
                  {
                    label: "Complaint",
                    value: trackingProduct?.problem_description,
                  },
                  {
                    label: "Sent Date",
                    value: trackingProduct?.date_joined
                      ? moment(trackingProduct.date_joined).format(
                          "ddd, MMM D, YYYY",
                        )
                      : "—",
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-baseline gap-4 text-sm"
                  >
                    <span className="font-semibold font-gothamNarrow text-gray-600 whitespace-nowrap">
                      {label}
                    </span>
                    <span className="font-gothamNarrow text-gray-800 text-right">
                      {value || "—"}
                    </span>
                  </div>
                ))}

                {/* Stage with badge */}
                <div className="flex justify-between items-center gap-4 text-sm">
                  <span className="font-semibold font-gothamNarrow text-gray-600 whitespace-nowrap">
                    Stage
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold font-gothamNarrow whitespace-nowrap
                      ${statusCfg.bg} ${statusCfg.color}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`}
                    />
                    {currentStatus || "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Damaged image & video */}
        <div className="w-full md:w-2/5 flex flex-col space-y-4 font-gothamNarrow my-5">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded border border-gray-200 p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold font-gothamNarrow text-gray-800">
                  {item.label}
                </span>
                <button
                  onClick={() =>
                    handleDownload(item.src, item.label, item.type)
                  }
                  className="px-3 py-1.5 bg-[#122F5A] hover:bg-[#0e2449] text-white text-xs font-gothamNarrow rounded transition-colors"
                >
                  Download
                </button>
              </div>
              {item.type === "image" ? (
                <img
                  className="w-full h-40 md:h-56 object-contain rounded"
                  src={item.src}
                  alt={item.label}
                />
              ) : (
                <video
                  className="w-full h-40 md:h-56 object-cover rounded"
                  controls
                >
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewBaltraRepairDamage;
