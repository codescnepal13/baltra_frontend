import moment from "moment";
import { enqueueSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRightLong, FaKey, FaStar } from "react-icons/fa6";
import {
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineChevronUp,
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineUser,
} from "react-icons/hi2";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  allBulkQuoteProducts,
  allCustomizedPersonalization,
} from "../../../../redux/features/admin/adminSlice";
import {
  clearAuthError,
  getProfileMe,
  updateProfile,
} from "../../../../redux/features/auth/authSlice";
import EditPassword from "../editPassword/EditPassword";

/* ─── helpers ─────────────────────────────────────────────── */
const getInitials = (c) =>
  [c?.firstname, c?.lastname]
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "U";

const NAV = [
  { id: "profile", label: "Profile", Icon: HiOutlineUser },
  { id: "password", label: "Change Password", Icon: FaKey },
  { id: "orders", label: "Order History", Icon: HiOutlineShoppingBag },
];

const inputCls =
  "block w-full bg-white text-slate-800 border border-slate-200 focus:outline-none rounded-xl py-3 px-4 text-sm font-gothamNarrow focus:border-red-500 focus:ring-0";

/* ─── Selectors (defined outside to avoid re-creation) ─────── */
const selectAuth = (s) => s.auth;
const selectBulkOrders = (s) => s.admin.bulkQuoteProducts;
const selectBulkPagination = (s) => s.admin.bulkPagination;
const selectPersonalizationOrders = (s) => s.admin.allCustomizedProducts;
const selectPersonalizationPagination = (s) => s.admin.pagination;

/* ─── Sub-components ───────────────────────────────────────── */
const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
      {label}
    </label>
    {children}
  </div>
);

const SectionHeading = ({ children }) => (
  <div className="flex items-center gap-2 mb-1">
    <div className="w-1 h-5 bg-red-500 rounded-full" />
    <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
      {children}
    </h4>
  </div>
);

const StatusChip = React.memo(({ status }) => {
  const key = status?.toLowerCase();
  const map = {
    pending: { cls: "bg-amber-50 text-amber-600", dot: "bg-amber-500" },
    approved: { cls: "bg-green-50 text-green-600", dot: "bg-green-500" },
    rejected: { cls: "bg-red-50 text-red-600", dot: "bg-red-500" },
    active: { cls: "bg-blue-50 text-blue-600", dot: "bg-blue-500" },
  };
  const s = map[key] || {
    cls: "bg-slate-100 text-slate-500",
    dot: "bg-slate-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize flex-shrink-0 ${s.cls}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
});

const EmptyState = React.memo(({ icon, title, sub }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
      {icon}
    </div>
    <p className="text-sm font-semibold text-slate-600 font-gothamNarrow">
      {title}
    </p>
    <p className="text-xs text-slate-400 mt-1 max-w-xs">{sub}</p>
  </div>
));

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
      {label}
    </p>
    <p className="text-sm text-slate-700 font-gothamNarrow">{value ?? "—"}</p>
  </div>
);

/* ─── Pagination ───────────────────────────────────────────── */
const Pagination = React.memo(({ page, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
            p === page
              ? "bg-red-600 text-white shadow-sm"
              : "border border-slate-200 text-slate-500 hover:bg-slate-50"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Next
      </button>
    </div>
  );
});

/* ─── Bulk Quote Card ──────────────────────────────────────── */
const BulkOrderCard = React.memo(({ order }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-slate-100 rounded-xl overflow-hidden hover:border-slate-200 hover:shadow-sm transition-all">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
            <HiOutlineShoppingBag size={18} className="text-slate-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 font-gothamNarrow">
              {order.model_name || "Bulk Quote"}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              <span className="font-medium text-slate-500">
                {order.model_num}
              </span>
              {" · "}Qty: {order.quantity}
              {" · "}
              {moment(order.created_at).format("D MMM YYYY")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <StatusChip status={order.status} />
          {open ? (
            <HiOutlineChevronUp size={15} className="text-slate-400" />
          ) : (
            <HiOutlineChevronDown size={15} className="text-slate-400" />
          )}
        </div>
      </button>
      {open && (
        <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <InfoItem label="Quote ID" value={`#${order.quote_id}`} />
            <InfoItem label="Model Name" value={order.model_name} />
            <InfoItem label="Model Number" value={order.model_num} />
            <InfoItem label="Quantity" value={order.quantity} />
            <InfoItem label="Contact" value={order.contact} />
            <InfoItem
              label="Submitted"
              value={moment(order.created_at).format("D MMM YYYY, h:mm A")}
            />
            {order.description && (
              <div className="col-span-2 sm:col-span-3">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Description
                </p>
                <p className="text-sm text-slate-600 font-gothamNarrow bg-white border border-slate-100 rounded-lg px-3 py-2">
                  {order.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

/* ─── Personalization Card ─────────────────────────────────── */
const PersonalizationOrderCard = React.memo(({ order }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-slate-100 rounded-xl overflow-hidden hover:border-slate-200 hover:shadow-sm transition-all">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-4">
          {order.main_image ? (
            <img
              src={order.main_image}
              alt={order.product_name}
              className="w-10 h-10 rounded-lg object-cover border border-slate-100 flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
              <HiOutlineSparkles size={18} className="text-amber-400" />
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-slate-800 font-gothamNarrow">
              {order.product_name || "Personalized Item"}
            </p>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
              {order.size && (
                <span className="inline-block bg-slate-100 text-slate-500 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {order.size}
                </span>
              )}
              {order.text ? `"${order.text}" · ` : ""}
              {moment(order.created_at).format("D MMM YYYY")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {order.color && (
            <span
              className="w-4 h-4 rounded-full border border-slate-200 flex-shrink-0"
              style={{ backgroundColor: order.color }}
              title={order.color}
            />
          )}
          <StatusChip status={order.status} />
          {open ? (
            <HiOutlineChevronUp size={15} className="text-slate-400" />
          ) : (
            <HiOutlineChevronDown size={15} className="text-slate-400" />
          )}
        </div>
      </button>
      {open && (
        <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <InfoItem label="Order ID" value={`#${order.id}`} />
            <InfoItem label="Product" value={order.product_name} />
            <InfoItem label="Size" value={order.size || "—"} />
            <InfoItem label="Placement" value={order.placement || "—"} />
            <InfoItem label="Font Style" value={order.font_style || "—"} />
            <InfoItem
              label="Submitted"
              value={moment(order.created_at).format("D MMM YYYY, h:mm A")}
            />
            {order.text && (
              <div className="col-span-2 sm:col-span-3">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Custom Text
                </p>
                <p className="text-sm text-slate-600 font-gothamNarrow bg-white border border-slate-100 rounded-lg px-3 py-2">
                  "{order.text}"
                </p>
              </div>
            )}
            {order.color && (
              <div className="col-span-2 sm:col-span-3 flex items-center gap-3">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Color
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full border border-slate-200"
                    style={{ backgroundColor: order.color }}
                  />
                  <span className="text-xs text-slate-500 font-mono">
                    {order.color}
                  </span>
                </div>
              </div>
            )}
            {order.main_image && (
              <div className="col-span-2 sm:col-span-3">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Preview
                </p>
                <img
                  src={order.main_image}
                  alt={order.product_name}
                  className="w-32 h-32 object-cover rounded-xl border border-slate-100"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

/* ─── Order History Panel ──────────────────────────────────── */
const OrderHistoryPanel = React.memo(
  ({
    bulkOrders,
    bulkPage,
    bulkTotalPages,
    onBulkPageChange,
    personalizationOrders,
    personalizationPage,
    personalizationTotalPages,
    onPersonalizationPageChange,
  }) => {
    const [tab, setTab] = useState("bulk");

    const tabs = [
      { id: "bulk", label: "Bulk Quotes", count: bulkOrders.length },
      {
        id: "personalization",
        label: "Personalization Orders",
        count: personalizationOrders.length,
      },
    ];

    return (
      <div>
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 font-gothamNarrow">
            Order History
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            View all your bulk quotes and personalization orders
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold font-gothamNarrow transition-all duration-200 ${
                tab === t.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t.label}
              {t.count > 0 && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    tab === t.id
                      ? "bg-red-100 text-red-600"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Bulk Quotes */}
        {tab === "bulk" && (
          <>
            {bulkOrders.length === 0 ? (
              <EmptyState
                icon={
                  <HiOutlineShoppingBag size={32} className="text-slate-300" />
                }
                title="No bulk quotes yet"
                sub="Your bulk quote requests will appear here."
              />
            ) : (
              <>
                <div className="space-y-3">
                  {bulkOrders.map((order) => (
                    <BulkOrderCard key={order.quote_id} order={order} />
                  ))}
                </div>
                <Pagination
                  page={bulkPage}
                  totalPages={bulkTotalPages}
                  onPageChange={onBulkPageChange}
                />
              </>
            )}
          </>
        )}

        {/* Personalization Orders */}
        {tab === "personalization" && (
          <>
            {personalizationOrders.length === 0 ? (
              <EmptyState
                icon={
                  <HiOutlineSparkles size={32} className="text-slate-300" />
                }
                title="No personalization orders yet"
                sub="Your personalization requests will appear here."
              />
            ) : (
              <>
                <div className="space-y-3">
                  {personalizationOrders.map((order) => (
                    <PersonalizationOrderCard key={order.id} order={order} />
                  ))}
                </div>
                <Pagination
                  page={personalizationPage}
                  totalPages={personalizationTotalPages}
                  onPageChange={onPersonalizationPageChange}
                />
              </>
            )}
          </>
        )}
      </div>
    );
  },
);

/* ─── Main component ───────────────────────────────────────── */
const ProfileInformation = () => {
  const { customer, error, isError, isLoading } = useSelector(selectAuth);
  const bulkOrders = useSelector(selectBulkOrders);
  const bulkPagination = useSelector(selectBulkPagination);
  const personalizationOrders = useSelector(selectPersonalizationOrders);
  const personalizationPagination = useSelector(
    selectPersonalizationPagination,
  );

  const bulkTotalPages = bulkPagination?.total_pages ?? 1;
  const personalizationTotalPages = personalizationPagination?.total_pages ?? 1;

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: { gender: "" },
  });
  const dispatch = useDispatch();

  const [activeNav, setActiveNav] = useState("profile");
  const [image, setImage] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [bulkPage, setBulkPage] = useState(1);
  const [personalizationPage, setPersonalizationPage] = useState(1);

  const rewardPoints = customer?.reward_points ?? null;
  const myBulkOrders = bulkOrders || [];
  const myPersonalizationOrders = personalizationOrders || [];

  /* ── Init: fetch profile once ── */
  useEffect(() => {
    dispatch(getProfileMe());
  }, [dispatch]);

  /* ── Bulk: re-fetch on page change ── */
  useEffect(() => {
    dispatch(allBulkQuoteProducts({ status: "", page: bulkPage }));
  }, [dispatch, bulkPage]);

  /* ── Personalization: re-fetch on page change ── */
  useEffect(() => {
    dispatch(allCustomizedPersonalization({ page: personalizationPage }));
  }, [dispatch, personalizationPage]);

  /* ── Sync form with customer ── */
  useEffect(() => {
    if (!customer) return;
    Object.keys(customer).forEach((key) => setValue(key, customer[key] ?? ""));
    setAvatarPreview(customer.image_url ?? null);
  }, [customer, setValue]);

  /* ── Error handling ── */
  useEffect(() => {
    if (error) dispatch(clearAuthError());
  }, [dispatch, error]);

  useEffect(() => {
    if (!isError) return;
    enqueueSnackbar(isError, { variant: "error" });
    dispatch(clearAuthError());
  }, [dispatch, isError]);

  /* ── Stable callbacks ── */
  const handleFileInputChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setImage(file);
    };
  }, []);

  const onSubmit = useCallback(
    (editData) => {
      const formData = new FormData();
      Object.entries(editData).forEach(([key, value]) => {
        if (value !== customer[key]) formData.append(key, value);
      });
      if (image) formData.append("image", image);
      dispatch(updateProfile({ formData, enqueueSnackbar }));
    },
    [dispatch, customer, image],
  );

  const handleBulkPageChange = useCallback((p) => setBulkPage(p), []);
  const handlePersonalizationPageChange = useCallback(
    (p) => setPersonalizationPage(p),
    [],
  );

  return (
    <div className="min-h-screen bg-slate-50 font-gothamNarrow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden sticky top-6">
              <div className="bg-gradient-to-br from-red-500 to-red-700 px-6 py-7 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_60%)]" />
                <div className="relative flex flex-col items-center text-center gap-3">
                  <label
                    htmlFor="sidebarImgFile"
                    className="cursor-pointer relative group"
                  >
                    <div className="w-20 h-20 rounded-full ring-4 ring-white/30 overflow-hidden shadow-lg">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="avatar"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            {getInitials(customer)}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow border border-red-100">
                      <MdOutlineCloudUpload
                        size={13}
                        className="text-red-500"
                      />
                    </span>
                  </label>
                  <input
                    id="sidebarImgFile"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileInputChange}
                  />
                  <div>
                    <p className="text-white font-bold text-base leading-tight">
                      {customer?.firstname} {customer?.lastname}
                    </p>
                    <p className="text-red-200 text-xs mt-0.5 truncate max-w-[180px]">
                      {customer?.email}
                    </p>
                  </div>
                  {rewardPoints != null && (
                    <div className="flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-full px-3 py-1.5">
                      <FaStar size={10} className="text-amber-300" />
                      <span className="text-white text-xs font-bold">
                        {rewardPoints.toLocaleString()}
                      </span>
                      <span className="text-white/60 text-[10px]">pts</span>
                    </div>
                  )}
                  <p className="text-red-200 text-[11px]">
                    Member since{" "}
                    {moment(customer?.createdAt).format("MMM YYYY")}
                  </p>
                </div>
              </div>

              <nav className="p-2">
                {NAV.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveNav(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 group ${
                      activeNav === id
                        ? "bg-red-50 text-red-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        activeNav === id
                          ? "bg-red-100 text-red-500"
                          : "bg-slate-100 text-slate-400 group-hover:bg-red-50 group-hover:text-red-400"
                      }`}
                    >
                      <Icon size={15} />
                    </span>
                    <span className="flex-1 text-left">{label}</span>
                    {activeNav === id && (
                      <HiOutlineChevronRight
                        size={14}
                        className="text-red-400"
                      />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── Main panel ── */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:p-8">
              {/* Profile */}
              {activeNav === "profile" && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-7">
                    <h3 className="text-xl font-bold text-slate-900">
                      Personal Information
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Keep your profile information up to date
                    </p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <div className="space-y-5">
                      <SectionHeading>Personal Details</SectionHeading>
                      <Field label="First Name">
                        <input
                          type="text"
                          placeholder="First name"
                          className={inputCls}
                          {...register("firstname")}
                        />
                      </Field>
                      <Field label="Last Name">
                        <input
                          type="text"
                          placeholder="Last name"
                          className={inputCls}
                          {...register("lastname")}
                        />
                      </Field>
                      <Field label="Email Address">
                        <input
                          type="email"
                          placeholder="Email"
                          className={`${inputCls} bg-slate-50 text-slate-400 cursor-not-allowed`}
                          {...register("email")}
                          readOnly
                        />
                      </Field>
                      <Field label="Phone Number">
                        <input
                          type="tel"
                          placeholder="+977-98XXXXXXXX"
                          className={`${inputCls} bg-slate-50 text-slate-400 cursor-not-allowed`}
                          {...register("contact")}
                          readOnly
                        />
                      </Field>
                    </div>
                    <div className="space-y-5">
                      <SectionHeading>Location & Details</SectionHeading>
                      <Field label="Address">
                        <input
                          type="text"
                          placeholder="Your address"
                          className={inputCls}
                          {...register("customerAddress")}
                        />
                      </Field>
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="District">
                          <input
                            type="text"
                            placeholder="District"
                            className={inputCls}
                            {...register("district")}
                          />
                        </Field>
                        <Field label="City">
                          <input
                            type="text"
                            placeholder="City"
                            className={inputCls}
                            {...register("city")}
                          />
                        </Field>
                      </div>
                      <Field label="Gender">
                        <div className="relative">
                          <select
                            className={`${inputCls} cursor-pointer appearance-none`}
                            {...register("gender")}
                          >
                            <option value="">Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                          <svg
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </Field>
                      <Field label="Date of Birth">
                        <input
                          type="date"
                          className={inputCls}
                          {...register("dob")}
                        />
                      </Field>
                    </div>
                  </div>
                  <div className="flex justify-end mt-8 pt-6 border-t border-slate-100">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center gap-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Save Changes</span>
                          <FaArrowRightLong size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Password */}
              {activeNav === "password" && (
                <div>
                  <div className="mb-7">
                    <h3 className="text-xl font-bold text-slate-900">
                      Change Password
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Update your password to keep your account secure
                    </p>
                  </div>
                  <div className="max-w-lg">
                    <EditPassword />
                  </div>
                </div>
              )}

              {/* Orders */}
              {activeNav === "orders" && (
                <OrderHistoryPanel
                  bulkOrders={myBulkOrders}
                  bulkPage={bulkPage}
                  bulkTotalPages={bulkTotalPages}
                  onBulkPageChange={handleBulkPageChange}
                  personalizationOrders={myPersonalizationOrders}
                  personalizationPage={personalizationPage}
                  personalizationTotalPages={personalizationTotalPages}
                  onPersonalizationPageChange={handlePersonalizationPageChange}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfileInformation);
