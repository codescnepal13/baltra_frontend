import moment from "moment";
import { useEffect } from "react";
import {
  HiOutlineArrowLeftCircle,
  HiOutlineBuildingStorefront,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineFingerPrint,
  HiOutlineHashtag,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineTag,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearCustomerError,
  getSingleProductView,
} from "../../../../../redux/features/customer/customerSlice";
import MetaData from "../../../../layout/metaData/MetaData";
import FormSkeleton from "../../adminLayout/formSkeleton/FormSkeleton";

/* ─── Status Badge ───────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const map = {
    active: {
      bg: "bg-emerald-500",
      ring: "ring-emerald-300",
      dot: "bg-emerald-200",
      label: "Active",
    },
    inactive: {
      bg: "bg-red-500",
      ring: "ring-red-300",
      dot: "bg-red-200",
      label: "Inactive",
    },
    pending: {
      bg: "bg-amber-500",
      ring: "ring-amber-300",
      dot: "bg-amber-200",
      label: "Pending",
    },
  };
  const cfg = map[status?.toLowerCase()] ?? {
    bg: "bg-gray-500",
    ring: "ring-gray-300",
    dot: "bg-gray-200",
    label: status,
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white ring-2 ${cfg.bg} ${cfg.ring} shadow-sm`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
      {cfg.label}
    </span>
  );
};

/* ─── Info Field Card ────────────────────────────────────── */
const FieldCard = ({ icon: Icon, label, value, accent }) => (
  <div
    className={`relative bg-white rounded-xl border-l-4 ${accent} shadow-sm px-4 py-3.5 flex items-start gap-3 hover:shadow-md transition-shadow duration-200`}
  >
    <div className="mt-0.5 text-red-500 shrink-0">
      <Icon size={16} />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5 font-gothamNarrow">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-800 font-gothamNarrow truncate">
        {value || "—"}
      </p>
    </div>
  </div>
);

/* ─── Section Header ─────────────────────────────────────── */
const SectionHeader = ({ title, color }) => (
  <div className={`flex items-center gap-3 mb-4`}>
    <div className={`h-5 w-1 rounded-full ${color}`} />
    <h2 className="text-xs font-extrabold uppercase tracking-[0.15em] text-gray-500 font-gothamNarrow">
      {title}
    </h2>
  </div>
);

/* ─── Image Card ─────────────────────────────────────────── */
const ImageCard = ({ label, src, alt, badgeColor }) => (
  <div className="flex flex-col gap-2">
    <div
      className={`inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white ${badgeColor} shadow-sm`}
    >
      {label}
    </div>
    {src ? (
      <div className="rounded-2xl border-2 border-gray-100 overflow-hidden bg-gradient-to-br from-gray-50 to-red-50 shadow-sm group cursor-zoom-in">
        <img
          src={src}
          alt={alt}
          className="w-full h-52 object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    ) : (
      <div className="rounded-2xl border-2 border-dashed border-red-100 bg-red-50/40 h-52 flex flex-col items-center justify-center gap-2">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-red-300 text-lg">?</span>
        </div>
        <span className="text-xs text-red-300 font-gothamNarrow">
          No image available
        </span>
      </div>
    )}
  </div>
);

/* ─── Main Component ─────────────────────────────────────── */
const SingleCustomerProductList = () => {
  const { loading, error, singleCustomerView } = useSelector(
    (state) => state.customer,
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (error) dispatch(clearCustomerError());
  }, [dispatch, error]);

  useEffect(() => {
    if (id) dispatch(getSingleProductView({ stock_id: id }));
  }, [dispatch, id]);

  if (loading) return <FormSkeleton />;
  if (!singleCustomerView)
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <span className="text-red-300 text-2xl">!</span>
        </div>
        <p className="text-gray-400 font-gothamNarrow">No data available</p>
      </div>
    );

  const {
    firstname,
    lastname,
    model_name,
    model_num,
    serial_number,
    status,
    store_name,
    store_location,
    store_number,
    purchase_date,
    warranty_issue,
    warranty_expiry,
    product_image,
    warranty_image,
    bill_image_one,
    created_at,
  } = singleCustomerView;

  const fmt = (d) => moment(d).format("D MMM YYYY");
  const fmtFull = (d) => moment(d).format("D MMM YYYY, h:mm A");

  return (
    <>
      <MetaData title="Baltra — Customer Product Details" />

      <div className="max-w-screen-2xl mx-auto px-4 py-4 font-gothamNarrow">
        {/* ── Back Link ── */}
        <Link
          to="/baltra-admin-dashboard/all-customer-products-list"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors mb-5 group"
        >
          <HiOutlineArrowLeftCircle
            size={20}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Back to Customer Product List
        </Link>

        {/* ── Hero Header Banner ── */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-rose-500 p-6 mb-6 shadow-lg shadow-red-200">
          {/* decorative circles */}
          <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 right-20 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute top-4 right-48 w-10 h-10 rounded-full bg-white/10" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-red-200 text-xs font-bold uppercase tracking-widest mb-1">
                Customer Product
              </p>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                {firstname} {lastname}
              </h1>
              <p className="text-red-200 text-xs mt-1.5 flex items-center gap-1.5">
                <HiOutlineClock size={12} />
                Registered on {fmtFull(created_at)}
              </p>
            </div>
            <div className="shrink-0">
              <StatusBadge status={status} />
            </div>
          </div>
        </div>

        {/* ── Grid Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* ── Left: Details ── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Product Details */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <SectionHeader title="Product Details" color="bg-red-500" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FieldCard
                  icon={HiOutlineTag}
                  label="Model Name"
                  value={model_name}
                  accent="border-red-400"
                />
                <FieldCard
                  icon={HiOutlineHashtag}
                  label="Model Number"
                  value={model_num}
                  accent="border-rose-400"
                />
                <FieldCard
                  icon={HiOutlineFingerPrint}
                  label="Serial Number"
                  value={serial_number}
                  accent="border-pink-400"
                />
                <FieldCard
                  icon={HiOutlineCheckCircle}
                  label="Status"
                  value={status}
                  accent="border-red-300"
                />
              </div>
            </div>

            {/* Store Information */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <SectionHeader title="Store Information" color="bg-rose-500" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FieldCard
                  icon={HiOutlineBuildingStorefront}
                  label="Store Name"
                  value={store_name}
                  accent="border-rose-400"
                />
                <FieldCard
                  icon={HiOutlineMapPin}
                  label="Store Location"
                  value={store_location}
                  accent="border-red-400"
                />
                <FieldCard
                  icon={HiOutlinePhone}
                  label="Store Number"
                  value={store_number}
                  accent="border-pink-400"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <SectionHeader title="Important Dates" color="bg-pink-500" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FieldCard
                  icon={HiOutlineCalendarDays}
                  label="Purchase Date"
                  value={fmt(purchase_date)}
                  accent="border-red-400"
                />
                <FieldCard
                  icon={HiOutlineShieldCheck}
                  label="Warranty Issue"
                  value={fmt(warranty_issue)}
                  accent="border-rose-400"
                />
                <FieldCard
                  icon={HiOutlineShieldCheck}
                  label="Warranty Expiry"
                  value={fmt(warranty_expiry)}
                  accent="border-pink-500"
                />
              </div>
            </div>
          </div>

          {/* ── Right: Images ── */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <SectionHeader title="Attached Images" color="bg-red-500" />
              <div className="flex flex-col gap-5">
                <ImageCard
                  label="Product Image"
                  src={product_image}
                  alt="Product"
                  badgeColor="bg-red-500"
                />
                <ImageCard
                  label="Warranty Image"
                  src={warranty_image}
                  alt="Warranty"
                  badgeColor="bg-rose-500"
                />
                <ImageCard
                  label="Bill Image"
                  src={bill_image_one}
                  alt="Bill"
                  badgeColor="bg-pink-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCustomerProductList;
