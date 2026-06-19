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

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-start gap-4 py-2.5 border-b border-gray-100 last:border-0">
    <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 font-gothamNarrow whitespace-nowrap">
      {label}
    </span>
    <span className="text-sm font-gothamNarrow text-gray-800 text-right">
      {value || "—"}
    </span>
  </div>
);

const StatusBadge = ({ status }) => {
  const isCompleted = status?.toLowerCase().includes("completed");
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide font-gothamNarrow
        ${
          isCompleted
            ? "bg-green-100 text-green-700 border border-green-200"
            : "bg-red-100 text-red-600 border border-red-200"
        }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${isCompleted ? "bg-green-500" : "bg-red-500"}`}
      />
      {status}
    </span>
  );
};

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

  const handleDownload = (src, label, type) => {
    if (!src) return;
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

  // ── Media items — now includes warranty image ──
  const mediaItems = [
    {
      type: "image",
      src: trackingProduct?.damaged_image_url || trackingProduct?.damaged_image,
      label: "Damaged Product Picture",
    },
    {
      type: "image",
      src:
        trackingProduct?.warranty_image_url || trackingProduct?.warranty_image,
      label: "Warranty Image",
    },
    {
      type: "video",
      src: trackingProduct?.damaged_video_url || trackingProduct?.damaged_video,
      label: "Damaged Product Video",
    },
  ].filter((item) => item.src);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-8 px-4 lg:px-8">
        {/* ── Page Header ── */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/baltra-trackingProducts")}
            className="p-2.5 rounded-full border-2 border-red-600 text-red-600 hover:bg-red-50 transition-colors flex-shrink-0"
          >
            <FaArrowLeftLong />
          </button>
          <div>
            <p className="text-xs text-gray-400 font-gothamNarrow uppercase tracking-widest mb-0.5">
              Repair Tracking
            </p>
            <h1 className="text-xl md:text-2xl font-semibold font-gothamNarrow text-gray-900 leading-tight">
              {trackingProduct?.model_name}
              <span className="ml-2 text-sm font-normal text-gray-400">
                · {trackingProduct?.model_num}
              </span>
            </h1>
          </div>
          <div className="ml-auto">
            <StatusBadge status={currentStatus} />
          </div>
        </div>

        {/* ── Job Info Strip ── */}
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 mb-6 flex flex-wrap gap-6 items-center shadow-sm">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-gothamNarrow mb-0.5">
              Job ID
            </p>
            <p className="text-base font-semibold text-red-600 font-gothamNarrow">
              #{trackingProduct?.job_no || "—"}
            </p>
          </div>
          <div className="w-px h-8 bg-gray-200 hidden sm:block" />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-gothamNarrow mb-0.5">
              Sent Date
            </p>
            <p className="text-sm font-medium text-gray-700 font-gothamNarrow">
              {trackingProduct?.date_joined
                ? moment(trackingProduct.date_joined).format("ddd, MMM D, YYYY")
                : "—"}
            </p>
          </div>
          {trackingProduct?.job_closing_date && (
            <>
              <div className="w-px h-8 bg-gray-200 hidden sm:block" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-gothamNarrow mb-0.5">
                  Closing Date
                </p>
                <p className="text-sm font-medium text-gray-700 font-gothamNarrow">
                  {moment(trackingProduct.job_closing_date).format(
                    "ddd, MMM D, YYYY",
                  )}
                </p>
              </div>
            </>
          )}
          <div className="w-px h-8 bg-gray-200 hidden sm:block" />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-gothamNarrow mb-0.5">
              Issue
            </p>
            <p className="text-sm font-medium text-gray-700 font-gothamNarrow">
              {trackingProduct?.problem_type || "—"}
            </p>
          </div>
          {(trackingProduct?.zone || trackingProduct?.area) && (
            <>
              <div className="w-px h-8 bg-gray-200 hidden sm:block" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-gothamNarrow mb-0.5">
                  Zone / Area
                </p>
                <p className="text-sm font-medium text-gray-700 font-gothamNarrow">
                  {trackingProduct?.zone}{" "}
                  {trackingProduct?.area ? `· ${trackingProduct.area}` : ""}
                </p>
              </div>
            </>
          )}
        </div>

        {/* ── Stepper ── */}
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-6 mb-6 shadow-sm">
          <p className="text-[11px] uppercase tracking-widest text-gray-400 font-gothamNarrow mb-4 font-semibold">
            Repair Progress
          </p>
          <TrackingStepper trackingProduct={trackingProduct} />
        </div>

        {/* ── Bottom Grid: Product Details + Media ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Details Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-gothamNarrow mb-4 font-semibold">
              Product Details
            </p>
            <div className="flex gap-4 mb-4">
              <img
                className="w-20 h-20 object-contain rounded-lg border border-gray-100 bg-gray-50 flex-shrink-0"
                src={
                  trackingProduct?.damaged_image_url ||
                  trackingProduct?.damaged_image
                }
                alt="Product"
              />
              <div>
                <p className="text-base font-semibold font-gothamNarrow text-gray-900 leading-tight">
                  {trackingProduct?.model_name}
                </p>
                <p className="text-xs text-gray-400 font-gothamNarrow mt-0.5">
                  {trackingProduct?.model_num}
                </p>
                {trackingProduct?.serial_number && (
                  <p className="text-xs text-gray-400 font-gothamNarrow mt-0.5">
                    S/N: {trackingProduct.serial_number}
                  </p>
                )}
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              <InfoRow
                label="Job ID"
                value={
                  <span className="text-red-600 font-semibold">
                    {trackingProduct?.job_no}
                  </span>
                }
              />
              <InfoRow label="Sent for" value={trackingProduct?.problem_type} />
              <InfoRow
                label="Complaint"
                value={trackingProduct?.problem_description}
              />
              <InfoRow
                label="Purchase Date"
                value={
                  trackingProduct?.purchase_date
                    ? moment(trackingProduct.purchase_date).format(
                        "MMM D, YYYY",
                      )
                    : null
                }
              />
              {warrantyExpiryDate && (
                <InfoRow
                  label="Warranty"
                  value={
                    <span
                      className={isExpired ? "text-red-500" : "text-green-600"}
                    >
                      {isExpired ? "Expired" : "Valid"} ·{" "}
                      {warrantyExpiryDate.format("MMM D, YYYY")}
                    </span>
                  }
                />
              )}
            </div>
          </div>

          {/* Customer Details Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-gothamNarrow mb-4 font-semibold">
              Customer Details
            </p>
            <div className="divide-y divide-gray-100">
              <InfoRow label="Name" value={trackingProduct?.customer_name} />
              <InfoRow
                label="Contact"
                value={trackingProduct?.customerContact}
              />
              <InfoRow label="Email" value={trackingProduct?.email} />
              <InfoRow
                label="Address"
                value={trackingProduct?.customerAddress}
              />
              <InfoRow
                label="Zone / Area"
                value={
                  trackingProduct?.zone || trackingProduct?.area
                    ? `${trackingProduct?.zone || ""}${
                        trackingProduct?.area
                          ? ` · ${trackingProduct.area}`
                          : ""
                      }`
                    : null
                }
              />
            </div>
          </div>

          {/* Media Card — spans full width on md+ */}
          <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-gothamNarrow mb-4 font-semibold">
              Damage Evidence
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mediaItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-100 overflow-hidden"
                >
                  <div className="flex justify-between items-center px-3 py-2 bg-gray-50 border-b border-gray-100">
                    <span className="text-xs font-semibold font-gothamNarrow text-gray-700 truncate">
                      {item.label}
                    </span>
                    <button
                      onClick={() =>
                        handleDownload(item.src, item.label, item.type)
                      }
                      className="px-2.5 py-1 bg-[#122F5A] hover:bg-[#0e2449] text-white text-[11px] font-gothamNarrow rounded transition-colors shrink-0 ml-2"
                    >
                      Download
                    </button>
                  </div>
                  <div className="p-2">
                    {item.type === "image" ? (
                      <img
                        className="w-full h-36 object-contain rounded"
                        src={item.src}
                        alt={item.label}
                      />
                    ) : (
                      <video
                        className="w-full h-36 object-cover rounded"
                        controls
                      >
                        <source src={item.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBaltraRepairDamage;
