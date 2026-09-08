import moment from "moment";
import { useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiOutlineDownload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BaltraSpinner from "../../../components/layout/baltraSpinner/BaltraSpinner";
import {
  clearCustomerError,
  singleTrackingProductByID,
} from "../../../redux/features/customer/customerSlice";
import TrackingStepper from "../trackingStepper/TrackingStepper";

/* ── Info row: label/value pair. Value wraps instead of overflowing
   when it's a long complaint description or address. ────────────── */
const InfoRow = ({ label, value }) => (
  <div className="flex flex-col gap-0.5 py-2.5 border-b border-gray-100 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
    <span className="flex-shrink-0 text-[11px] font-semibold uppercase tracking-wide text-gray-400 font-gothamNarrow">
      {label}
    </span>
    <span className="text-sm font-gothamNarrow text-gray-800 break-words sm:text-right">
      {value || "—"}
    </span>
  </div>
);

const StatusBadge = ({ status }) => {
  const isCompleted = status?.toLowerCase().includes("completed");
  return (
    <span
      className={`inline-flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide font-gothamNarrow
        ${
          isCompleted
            ? "bg-green-100 text-green-700 border border-green-200"
            : "bg-red-100 text-red-600 border border-red-200"
        }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isCompleted ? "bg-green-500" : "bg-red-500"}`}
      />
      {status}
    </span>
  );
};

/* ── Job info strip item — used both in the flex-wrap desktop layout
   and reused visually as a grid cell on mobile via the same markup. ── */
const InfoStripItem = ({ label, value }) => (
  <div className="min-w-0">
    <p className="mb-0.5 text-[10px] uppercase tracking-widest text-gray-400 font-gothamNarrow">
      {label}
    </p>
    <p className="truncate text-sm font-medium text-gray-700 font-gothamNarrow">
      {value}
    </p>
  </div>
);

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

  // ── Media items — includes warranty image and serial number image ──
  const mediaItems = [
    {
      type: "image",
      src: trackingProduct?.damaged_image_url || trackingProduct?.damaged_image,
      label: "Damaged product",
    },
    {
      type: "image",
      src:
        trackingProduct?.warranty_image_url || trackingProduct?.warranty_image,
      label: "Warranty card",
    },
    {
      type: "image",
      src:
        trackingProduct?.serial_number_image_url ||
        trackingProduct?.serial_number_image,
      label: "Serial number",
    },
    {
      type: "video",
      src: trackingProduct?.damaged_video_url || trackingProduct?.damaged_video,
      label: "Damage video",
    },
  ].filter((item) => item.src);

  // ── Job strip fields — built as a list so mobile/desktop share
  //    one source of truth and never drift out of sync. ──
  const jobStripFields = [
    {
      label: "Job ID",
      value: `#${trackingProduct?.job_no || "—"}`,
      accent: true,
    },
    {
      label: "Sent date",
      value: trackingProduct?.date_joined
        ? moment(trackingProduct.date_joined).format("MMM D, YYYY")
        : "—",
    },
    trackingProduct?.job_closing_date && {
      label: "Closing date",
      value: moment(trackingProduct.job_closing_date).format("MMM D, YYYY"),
    },
    { label: "Issue", value: trackingProduct?.problem_type || "—" },
    (trackingProduct?.zone || trackingProduct?.area) && {
      label: "Zone / Area",
      value: `${trackingProduct?.zone || ""}${
        trackingProduct?.area ? ` · ${trackingProduct.area}` : ""
      }`,
    },
  ].filter(Boolean);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8 lg:px-8">
        {/* ── Page Header — wraps cleanly instead of squeezing the
             status badge or clipping a long model name. ── */}
        <div className="mb-6 flex flex-wrap items-start gap-3 sm:mb-8 sm:flex-nowrap sm:items-center sm:gap-4">
          <button
            onClick={() => navigate("/baltra-trackingProducts")}
            aria-label="Back to tracking list"
            className="flex-shrink-0 rounded-full border-2 border-red-600 p-2 text-red-600 transition-colors hover:bg-red-50 sm:p-2.5"
          >
            <FaArrowLeftLong />
          </button>

          <div className="min-w-0 flex-1">
            <p className="mb-0.5 text-[11px] uppercase tracking-widest text-gray-400 font-gothamNarrow">
              Repair tracking
            </p>
            <h1 className="truncate text-lg font-semibold leading-tight text-gray-900 font-gothamNarrow sm:text-xl md:text-2xl">
              {trackingProduct?.model_name}
              <span className="ml-2 text-sm font-normal text-gray-400">
                · {trackingProduct?.model_num}
              </span>
            </h1>
          </div>

          {/* Badge drops to its own row on very narrow screens instead
              of forcing the title to truncate harder than it needs to. */}
          <div className="ml-auto sm:ml-0">
            <StatusBadge status={currentStatus} />
          </div>
        </div>

        {/* ── Job Info Strip — 2-col grid on mobile, flowing row on
             desktop. No more lopsided flex-wrap gaps on small screens. ── */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm sm:px-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
            {jobStripFields.map((field, i) => (
              <div
                key={field.label}
                className="contents sm:flex sm:items-center sm:gap-6"
              >
                {i > 0 && (
                  <div className="hidden h-8 w-px bg-gray-200 sm:block" />
                )}
                {field.accent ? (
                  <div className="min-w-0">
                    <p className="mb-0.5 text-[10px] uppercase tracking-widest text-gray-400 font-gothamNarrow">
                      {field.label}
                    </p>
                    <p className="truncate text-base font-semibold text-red-600 font-gothamNarrow">
                      {field.value}
                    </p>
                  </div>
                ) : (
                  <InfoStripItem label={field.label} value={field.value} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Stepper ── */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white px-4 py-5 shadow-sm sm:px-5 sm:py-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400 font-gothamNarrow">
            Repair progress
          </p>
          <TrackingStepper trackingProduct={trackingProduct} />
        </div>

        {/* ── Bottom Grid: Product Details + Customer + Media ── */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {/* Product Details Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400 font-gothamNarrow">
              Product details
            </p>
            <div className="mb-4 flex items-start gap-3 sm:gap-4">
              <img
                className="h-16 w-16 flex-shrink-0 rounded-lg border border-gray-100 bg-gray-50 object-contain sm:h-20 sm:w-20"
                src={
                  trackingProduct?.damaged_image_url ||
                  trackingProduct?.damaged_image
                }
                alt="Product"
              />
              <div className="min-w-0">
                <p className="truncate text-base font-semibold leading-tight text-gray-900 font-gothamNarrow">
                  {trackingProduct?.model_name}
                </p>
                <p className="mt-0.5 truncate text-xs text-gray-400 font-gothamNarrow">
                  {trackingProduct?.model_num}
                </p>
                {trackingProduct?.serial_number && (
                  <p className="mt-0.5 truncate text-xs text-gray-400 font-gothamNarrow">
                    S/N: {trackingProduct.serial_number}
                  </p>
                )}
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              <InfoRow
                label="Job ID"
                value={
                  <span className="font-semibold text-red-600">
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
                label="Purchase date"
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
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400 font-gothamNarrow">
              Customer details
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

          {/* Media Card — spans full width on md+. Buttons are now a
              fixed height with an icon, so label length never shifts
              alignment between cards. */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 md:col-span-2">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400 font-gothamNarrow">
              Damage evidence
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mediaItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col overflow-hidden rounded-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-gray-100 bg-gray-50 px-3 py-2">
                    <span className="truncate text-xs font-semibold text-gray-700 font-gothamNarrow">
                      {item.label}
                    </span>
                    <button
                      onClick={() =>
                        handleDownload(item.src, item.label, item.type)
                      }
                      aria-label={`Download ${item.label}`}
                      className="flex h-7 flex-shrink-0 items-center gap-1.5 rounded bg-[#122F5A] px-2.5 text-[11px] font-medium text-white font-gothamNarrow transition-colors hover:bg-[#0e2449]"
                    >
                      <HiOutlineDownload className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="hidden xs:inline">Download</span>
                    </button>
                  </div>
                  <div className="flex flex-1 items-center justify-center bg-gray-50/50 p-2">
                    {item.type === "image" ? (
                      <img
                        className="h-36 w-full rounded object-contain"
                        src={item.src}
                        alt={item.label}
                      />
                    ) : (
                      <video
                        className="h-36 w-full rounded object-cover"
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
