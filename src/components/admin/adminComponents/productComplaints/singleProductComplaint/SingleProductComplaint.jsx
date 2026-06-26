import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import {
  HiOutlineArrowLeftCircle,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineBuildingOffice2,
  HiOutlineCalendarDays,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineEnvelope,
  HiOutlineExclamationTriangle,
  HiOutlineFingerPrint,
  HiOutlineHashtag,
  HiOutlineInformationCircle,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlinePhoto,
  HiOutlineShieldCheck,
  HiOutlineUser,
  HiOutlineVideoCamera,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addCrmContent,
  clearCustomerError,
  getSingleProductComplaint,
} from "../../../../../redux/features/customer/customerSlice";
import MetaData from "../../../../layout/metaData/MetaData";
import FormSkeleton from "../../adminLayout/formSkeleton/FormSkeleton";

/* ── Info Field ─────────────────────────────────────────── */
const InfoField = ({ icon: Icon, label, value, full }) => (
  <div className={`flex flex-col gap-1 ${full ? "col-span-2" : ""}`}>
    <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 font-gothamNarrow flex items-center gap-1.5">
      {Icon && <Icon size={11} className="text-red-400" />}
      {label}
    </span>
    <div className="bg-gray-50 border-2 border-gray-100 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-700 font-gothamNarrow break-words">
      {value || "—"}
    </div>
  </div>
);

/* ── Section Card ───────────────────────────────────────── */
const SectionCard = ({ title, icon: Icon, accent, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div
      className={`flex items-center gap-2.5 px-5 py-3.5 border-b border-gray-100 ${accent}`}
    >
      {Icon && <Icon size={15} className="text-red-500" />}
      <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-600 font-gothamNarrow">
        {title}
      </h3>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

/* ── Media Card ─────────────────────────────────────────── */
const MediaCard = ({ label, icon: Icon, iconColor, children }) => (
  <div className="flex flex-col gap-2">
    <span
      className={`inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white ${iconColor} shadow-sm`}
    >
      {Icon && <Icon size={11} />}
      {label}
    </span>
    <div className="rounded-2xl overflow-hidden border-2 border-gray-100 bg-gray-50 shadow-sm group">
      {children}
    </div>
  </div>
);

/* ── Main Component ─────────────────────────────────────── */
const SingleProductComplaint = () => {
  const { loading, error, isError, isLoading, productComplaint } = useSelector(
    (state) => state.customer,
  );
  const { job_no } = productComplaint || {};
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleCrmSubmit = (e) => {
    e.preventDefault();
    if (job_no) {
      toast.info("Already dispatched to CRM");
      return;
    }
    const CRMConfig = {
      complaint_id: id,
      customerName: productComplaint.customerName,
      customerContact: productComplaint.customerContact,
      email: productComplaint.email,
      zone: productComplaint.zone,
      customerPincode: "",
      area: productComplaint.area,
      customerAddress: productComplaint.customerAddress,
      modelCode: productComplaint.model_num,
      serialNo: productComplaint.serial_number,
      purchaseDate: productComplaint.purchase_date,
      complaint_remark: productComplaint.problem_description,
      accessKey: import.meta.env.VITE_CRM_ACCESS_KEY,
    };
    dispatch(addCrmContent({ CRMConfig, enqueueSnackbar }))
      .unwrap()
      .then(() => {
        dispatch(getSingleProductComplaint({ complaint_id: id }));
      })
      .catch((err) => console.error("Submission failed:", err));
  };

  useEffect(() => {
    if (error) dispatch(clearCustomerError());
  }, [dispatch, error]);

  useEffect(() => {
    if (id) dispatch(getSingleProductComplaint({ complaint_id: id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(isError, { variant: "error" });
      dispatch(clearCustomerError());
    }
  }, [dispatch, isError]);

  if (loading) return <FormSkeleton />;

  if (!productComplaint)
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-20 text-center font-gothamNarrow">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <HiOutlineExclamationTriangle size={28} className="text-red-400" />
        </div>
        <h3 className="text-lg font-extrabold text-gray-800 mb-1">
          No Data Available
        </h3>
        <p className="text-sm text-gray-400">
          Unable to load complaint information.
        </p>
      </div>
    );

  const {
    model_name,
    customer_name,
    customerContact,
    customerAddress,
    problem_description,
    email,
    zone,
    area,
    model_num,
    serial_number,
    damaged_image_url,
    damaged_video_url,
    warranty_image_url,
    date_joined,
  } = productComplaint || {};

  const hasMedia = damaged_image_url || warranty_image_url || damaged_video_url;

  return (
    <>
      <MetaData title="Baltra — Single Product Complaint" />

      <div className="font-gothamNarrow max-w-screen-2xl mx-auto px-4 py-4">
        {/* ── Back ── */}
        <Link
          to="/baltra-admin-dashboard/all/products-complaints-list"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors mb-5 group"
        >
          <HiOutlineArrowLeftCircle
            size={20}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Back to Complaints
        </Link>

        {/* ── Hero Banner ── */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-rose-500 p-6 mb-5 shadow-lg shadow-red-200">
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-6 right-28 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute top-4 right-56 w-10 h-10 rounded-full bg-white/10" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-red-200 text-[10px] font-extrabold uppercase tracking-widest mb-1">
                Product Complaint
              </p>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                {model_name || "Complaint Details"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <p className="text-red-200 text-xs flex items-center gap-1.5">
                  <HiOutlineHashtag size={12} />
                  Complaint ID: #{id}
                </p>
                <p className="text-red-200 text-xs flex items-center gap-1.5">
                  <HiOutlineCalendarDays size={12} />
                  {moment(date_joined).format("D MMM YYYY, h:mm A")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ring-1 ${
                    job_no
                      ? "bg-emerald-100 text-emerald-700 ring-emerald-200"
                      : "bg-amber-100 text-amber-700 ring-amber-200"
                  }`}
                >
                  {job_no ? (
                    <>
                      <HiOutlineCheckCircle size={11} /> Dispatched
                    </>
                  ) : (
                    <>
                      <HiOutlineExclamationTriangle size={11} /> Pending
                    </>
                  )}
                </span>
                {job_no && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 text-white ring-1 ring-white/30">
                    Job No: {job_no}
                  </span>
                )}
              </div>
            </div>

            {/* CRM button */}
            <form onSubmit={handleCrmSubmit} className="shrink-0">
              <button
                type="submit"
                disabled={isLoading || !!job_no}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md ${
                  job_no
                    ? "bg-emerald-100 text-emerald-700 cursor-not-allowed"
                    : "bg-white text-red-600 hover:bg-red-50 shadow-white/20 hover:shadow-white/40"
                } disabled:opacity-70`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Processing…
                  </>
                ) : job_no ? (
                  <>
                    <HiOutlineCheckCircle size={16} /> Dispatched to CRM
                  </>
                ) : (
                  "Dispatch to CRM"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ── Notice ── */}
        <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-5">
          <HiOutlineInformationCircle
            size={18}
            className="text-amber-500 shrink-0 mt-0.5"
          />
          <p className="text-sm text-amber-800 font-gothamNarrow leading-relaxed">
            Please review all details carefully before dispatching to CRM. Once
            dispatched, the button will be disabled to prevent duplicate
            entries.
          </p>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* Customer Info */}
          <SectionCard
            title="Customer Information"
            icon={HiOutlineUser}
            accent="bg-red-50/60"
          >
            <div className="grid grid-cols-2 gap-3">
              <InfoField
                icon={HiOutlineUser}
                label="Customer Name"
                value={customer_name}
                full
              />
              <InfoField
                icon={HiOutlinePhone}
                label="Contact Number"
                value={customerContact}
              />
              <InfoField
                icon={HiOutlineEnvelope}
                label="Email Address"
                value={email}
              />
              <InfoField
                icon={HiOutlineMapPin}
                label="Address"
                value={customerAddress}
                full
              />
              <InfoField
                icon={HiOutlineBuildingOffice2}
                label="District / Zone"
                value={zone}
              />
              <InfoField
                icon={HiOutlineBuildingOffice2}
                label="City / Area"
                value={area}
              />
            </div>
          </SectionCard>

          {/* Product Info */}
          <SectionCard
            title="Product Information"
            icon={HiOutlineWrenchScrewdriver}
            accent="bg-rose-50/60"
          >
            <div className="grid grid-cols-2 gap-3">
              <InfoField
                icon={HiOutlineWrenchScrewdriver}
                label="Model Name"
                value={model_name}
                full
              />
              <InfoField
                icon={HiOutlineHashtag}
                label="Model Code"
                value={model_num}
              />
              <InfoField
                icon={HiOutlineFingerPrint}
                label="Serial Number"
                value={serial_number}
              />
              <InfoField
                icon={HiOutlineChatBubbleBottomCenterText}
                label="Problem Description"
                value={problem_description}
                full
              />
            </div>
          </SectionCard>
        </div>

        {/* ── Media ── */}
        {hasMedia && (
          <SectionCard
            title="Complaint Media"
            icon={HiOutlinePhoto}
            accent="bg-pink-50/60"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {damaged_image_url && (
                <MediaCard
                  label="Damaged Product"
                  icon={HiOutlineExclamationTriangle}
                  iconColor="bg-red-500"
                >
                  <div
                    className="relative group cursor-pointer"
                    onClick={() => window.open(damaged_image_url, "_blank")}
                  >
                    <img
                      src={damaged_image_url}
                      alt="Damaged Product"
                      className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                      <HiOutlineArrowTopRightOnSquare
                        size={22}
                        className="text-white"
                      />
                    </div>
                  </div>
                </MediaCard>
              )}
              {warranty_image_url && (
                <MediaCard
                  label="Warranty Image"
                  icon={HiOutlineShieldCheck}
                  iconColor="bg-rose-500"
                >
                  <div
                    className="relative group cursor-pointer"
                    onClick={() => window.open(warranty_image_url, "_blank")}
                  >
                    <img
                      src={warranty_image_url}
                      alt="Warranty"
                      className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                      <HiOutlineArrowTopRightOnSquare
                        size={22}
                        className="text-white"
                      />
                    </div>
                  </div>
                </MediaCard>
              )}
              {damaged_video_url && (
                <MediaCard
                  label="Damage Video"
                  icon={HiOutlineVideoCamera}
                  iconColor="bg-pink-500"
                >
                  <video
                    src={damaged_video_url}
                    className="w-full h-52 object-cover"
                    controls
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                </MediaCard>
              )}
            </div>
          </SectionCard>
        )}

        {/* ── Timeline ── */}
        <div className="mt-5">
          <SectionCard
            title="Complaint Timeline"
            icon={HiOutlineCalendarDays}
            accent="bg-red-50/60"
          >
            <div className="space-y-0">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl bg-red-50 border-2 border-red-200 flex items-center justify-center shrink-0">
                    <HiOutlineCalendarDays size={16} className="text-red-500" />
                  </div>
                  {job_no && <div className="w-0.5 h-8 bg-gray-200 mt-1" />}
                </div>
                <div className="pb-5">
                  <p className="text-sm font-extrabold text-gray-800 font-gothamNarrow">
                    Complaint Submitted
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 font-gothamNarrow">
                    {moment(date_joined).format("dddd, D MMMM YYYY, h:mm A")}
                  </p>
                </div>
              </div>

              {/* Step 2 — only if dispatched */}
              {job_no && (
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center shrink-0">
                      <HiOutlineCheckCircle
                        size={16}
                        className="text-emerald-500"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-gray-800 font-gothamNarrow">
                      Dispatched to CRM
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 font-gothamNarrow">
                      Job Number:{" "}
                      <span className="font-bold text-emerald-600">
                        {job_no}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
};

export default SingleProductComplaint;
