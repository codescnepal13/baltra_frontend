import moment from "moment";
import { useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiOutlineDownload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import BaltraSpinner from "../../../../components/layout/baltraSpinner/BaltraSpinner";
import {
  clearProductError,
  SingleUserProductPage,
} from "../../../../redux/features/product/productSlice";
import UserRegisteredStepper from "../userRegisteredStepper/UserRegisteredStepper";

/* ── Info row: label/value pair. Value wraps instead of overflowing
   when it's a long address or complaint description. ──────────────── */
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

/* ── Job info strip item — shared markup for grid (mobile) and
   flowing row (desktop) so the two layouts never drift apart. ──── */
const InfoStripItem = ({ label, value, accent }) => (
  <div className="min-w-0">
    <p className="mb-0.5 text-[10px] uppercase tracking-widest text-gray-400 font-gothamNarrow">
      {label}
    </p>
    <p
      className={`truncate text-sm font-medium font-gothamNarrow ${
        accent ? "text-base font-semibold text-red-600" : "text-gray-700"
      }`}
    >
      {value}
    </p>
  </div>
);

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
  const hasComplaint = Boolean(singleAddedProduct?.complaint_id);

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

  // ── Media items — includes damaged image/video too ──
  const mediaItems = [
    {
      type: "image",
      src: singleAddedProduct?.product_image,
      label: "Product image",
    },
    {
      type: "image",
      src: singleAddedProduct?.bill_image_one,
      label: "Bill image",
    },
    {
      type: "image",
      src: singleAddedProduct?.warranty_image,
      label: "Warranty image",
    },
    {
      type: "image",
      src: singleAddedProduct?.damaged_image,
      label: "Damaged product",
    },
    {
      type: "video",
      src: singleAddedProduct?.damaged_video,
      label: "Damage video",
    },
  ].filter((item) => item.src);

  // ── Job strip fields — one source of truth for mobile grid and
  //    desktop flowing row, so they can never drift out of sync. ──
  const jobStripFields = [
    {
      label: "Job ID",
      value: `#${singleAddedProduct?.job_no || "—"}`,
      accent: true,
    },
    {
      label: "Registered date",
      value: singleAddedProduct?.created_at
        ? moment(singleAddedProduct.created_at).format("MMM D, YYYY")
        : "—",
    },
    { label: "Store", value: singleAddedProduct?.store_name || "—" },
    {
      label: "Reward points",
      value: singleAddedProduct?.temp_reward ?? 0,
    },
    {
      label: "Verified",
      value: singleAddedProduct?.is_verified ? "Yes" : "No",
      verified: singleAddedProduct?.is_verified,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8 lg:px-8">
        {/* ── Page Header — wraps cleanly instead of squeezing the
             status badge or clipping a long model name. ── */}
        <div className="mb-6 flex flex-wrap items-start gap-3 sm:mb-8 sm:flex-nowrap sm:items-center sm:gap-4">
          <Link
            to="/baltra-user-ProductPage"
            aria-label="Back to my products"
            className="flex-shrink-0 rounded-full border-2 border-red-600 p-2 text-red-600 transition-colors hover:bg-red-50 sm:p-2.5"
          >
            <FaArrowLeftLong />
          </Link>

          <div className="min-w-0 flex-1">
            <p className="mb-0.5 text-[11px] uppercase tracking-widest text-gray-400 font-gothamNarrow">
              Registered product
            </p>
            <h1 className="truncate text-lg font-semibold leading-tight text-gray-900 font-gothamNarrow sm:text-xl md:text-2xl">
              {singleAddedProduct?.model_name}
              <span className="ml-2 text-sm font-normal text-gray-400">
                · {singleAddedProduct?.model_num}
              </span>
            </h1>
          </div>

          {currentStatus && (
            <div className="ml-auto sm:ml-0">
              <StatusBadge status={currentStatus} />
            </div>
          )}
        </div>

        {/* ── Job Info Strip — 2-col grid on mobile, 3-col on small
             tablets, flowing row with dividers on desktop. ── */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm sm:px-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 xs:grid-cols-3 md:flex md:flex-wrap md:items-center md:gap-6">
            {jobStripFields.map((field, i) => (
              <div
                key={field.label}
                className="contents md:flex md:items-center md:gap-6"
              >
                {i > 0 && (
                  <div className="hidden h-8 w-px bg-gray-200 md:block" />
                )}
                {field.verified !== undefined ? (
                  <div className="min-w-0">
                    <p className="mb-0.5 text-[10px] uppercase tracking-widest text-gray-400 font-gothamNarrow">
                      {field.label}
                    </p>
                    <p
                      className={`text-sm font-semibold font-gothamNarrow ${
                        field.verified ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {field.value}
                    </p>
                  </div>
                ) : (
                  <InfoStripItem
                    label={field.label}
                    value={field.value}
                    accent={field.accent}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Stepper ── */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white px-4 py-5 shadow-sm sm:px-5 sm:py-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400 font-gothamNarrow">
            Registration progress
          </p>
          <UserRegisteredStepper singleAddedProduct={singleAddedProduct} />
        </div>

        {/* ── Bottom Grid: Product Details + Store/Complaint + Media ── */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {/* Product Details Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400 font-gothamNarrow">
              Product details
            </p>
            <div className="mb-4 flex items-start gap-3 sm:gap-4">
              <img
                className="h-16 w-16 flex-shrink-0 rounded-lg border border-gray-100 bg-gray-50 object-contain sm:h-20 sm:w-20"
                src={singleAddedProduct?.product_image}
                alt="Product"
              />
              <div className="min-w-0">
                <p className="truncate text-base font-semibold leading-tight text-gray-900 font-gothamNarrow">
                  {singleAddedProduct?.model_name}
                </p>
                <p className="mt-0.5 truncate text-xs text-gray-400 font-gothamNarrow">
                  {singleAddedProduct?.model_num}
                </p>
                {singleAddedProduct?.serial_number && (
                  <p className="mt-0.5 truncate text-xs text-gray-400 font-gothamNarrow">
                    S/N: {singleAddedProduct.serial_number}
                  </p>
                )}
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              <InfoRow
                label="Job ID"
                value={
                  <span className="font-semibold text-red-600">
                    {singleAddedProduct?.job_no}
                  </span>
                }
              />
              <InfoRow
                label="Purchase date"
                value={
                  singleAddedProduct?.purchase_date
                    ? moment(singleAddedProduct.purchase_date).format(
                        "MMM D, YYYY",
                      )
                    : null
                }
              />
              <InfoRow
                label="Warranty issued"
                value={
                  singleAddedProduct?.warranty_issue
                    ? moment(singleAddedProduct.warranty_issue).format(
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
              <InfoRow
                label="Reward points"
                value={singleAddedProduct?.temp_reward ?? 0}
              />
            </div>
          </div>

          {/* Store & Complaint Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400 font-gothamNarrow">
              Store & complaint
            </p>
            <div className="divide-y divide-gray-100">
              <InfoRow
                label="Store name"
                value={singleAddedProduct?.store_name}
              />
              <InfoRow
                label="Store location"
                value={singleAddedProduct?.store_location}
              />
              <InfoRow
                label="Store number"
                value={singleAddedProduct?.store_number}
              />
              {hasComplaint && (
                <>
                  <InfoRow
                    label="Sent for"
                    value={singleAddedProduct?.problem_type}
                  />
                  <InfoRow
                    label="Complaint"
                    value={singleAddedProduct?.problem_description}
                  />
                  <InfoRow
                    label="Complaint date"
                    value={
                      singleAddedProduct?.date_joined
                        ? moment(singleAddedProduct.date_joined).format(
                            "MMM D, YYYY",
                          )
                        : null
                    }
                  />
                </>
              )}
            </div>
          </div>

          {/* Media Card — spans full width. Fixed-height buttons with
              an icon keep alignment identical across every card
              regardless of label length. */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 md:col-span-2">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400 font-gothamNarrow">
              Documents & evidence
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

export default UserRegisteredViewDetails;
