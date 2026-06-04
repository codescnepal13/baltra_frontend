import { enqueueSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  baltraCustomerAdd,
  clearProductError,
} from "../../../redux/features/product/productSlice";

/* ─── SVG Icons (inline, no extra dep) ───────────────────────────────────── */
const IconPhone = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);
const IconUpload = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);
const IconReceipt = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);
const IconShield = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);
const IconX = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconWarn = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

/* ─── Image Upload Zone ───────────────────────────────────────────────────── */
const ImageUploadZone = ({
  id,
  label,
  icon: Icon,
  preview,
  onChange,
  error,
}) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-slate-400">
      {label}
    </span>
    <label
      htmlFor={id}
      className={[
        "group relative flex flex-col items-center justify-center",
        "w-full rounded-xl border-2 border-dashed cursor-pointer",
        "overflow-hidden transition-all duration-200",
        "h-24 sm:h-28 md:h-32",
        error
          ? "border-red-300 bg-red-50/40"
          : "border-slate-200 bg-slate-50 hover:border-red-300 hover:bg-red-50/30",
      ].join(" ")}
    >
      {preview ? (
        <>
          <img
            src={preview}
            alt={label}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-[11px] font-semibold">Change</span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-1.5 px-2 text-center">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:border-red-200 group-hover:bg-red-50 transition-colors">
            <span className="text-slate-400 group-hover:text-red-400 transition-colors">
              <Icon />
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-400 group-hover:text-slate-600 transition-colors leading-tight">
            Click to upload
          </span>
        </div>
      )}
      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
    </label>
    {error && (
      <p className="text-[10px] sm:text-[11px] text-red-500 flex items-center gap-1">
        <IconWarn /> {error}
      </p>
    )}
  </div>
);

/* ─── Field wrapper ───────────────────────────────────────────────────────── */
const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-slate-400">
      {label}
    </label>
    {children}
    {error && (
      <p className="text-[10px] sm:text-[11px] text-red-500 flex items-center gap-1">
        <IconWarn /> {error}
      </p>
    )}
  </div>
);

const inputCls = (err) =>
  [
    "w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-[12px] sm:text-[13px] text-gray-800 rounded-xl border",
    "outline-none transition-all placeholder:text-slate-300",
    err
      ? "border-red-300 bg-red-50/30 focus:border-red-400 focus:ring-2 focus:ring-red-100"
      : "border-slate-200 bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100",
  ].join(" ");

/* ─── Section heading ─────────────────────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-2.5 sm:mb-3">
    {children}
  </p>
);

/* ══════════════════════════════════════════════════════════════════════════
   Main modal
══════════════════════════════════════════════════════════════════════════ */
const UserAddProductModal = ({ handleClose }) => {
  const { loading, error } = useSelector((s) => s.product);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const [form, setForm] = useState({
    store_name: "",
    store_location: "",
    store_number: "",
    model_num: "",
    model_name: "",
    serial_number: "",
    purchase_date: "",
  });

  const [product_image, setProductImage] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState("");
  const [bill_image_one, setBillImage] = useState(null);
  const [billPreview, setBillPreview] = useState("");
  const [warranty_image, setWarrantyImage] = useState(null);
  const [warrantyPreview, setWarrantyPreview] = useState("");
  const [errs, setErrs] = useState({});

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const makeImageHandler = (setFile, setPreview) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
      setFile(file);
    };
  };

  const validate = () => {
    const e = {};
    if (!form.store_name.trim()) e.store_name = "Required";
    if (!form.store_location.trim()) e.store_location = "Required";
    if (!form.store_number.trim()) e.store_number = "Required";
    if (!form.model_num.trim()) e.model_num = "Required";
    if (!form.model_name.trim()) e.model_name = "Required";
    if (!form.serial_number.trim()) e.serial_number = "Required";
    if (!form.purchase_date) e.purchase_date = "Required";
    if (!product_image) e.product_image = "Product image required";
    if (!bill_image_one) e.bill_image_one = "Bill image required";
    if (!warranty_image) e.warranty_image = "Warranty image required";
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      enqueueSnackbar("Please fill all required fields", { variant: "error" });
      return;
    }
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("product_image", product_image);
    fd.append("bill_image_one", bill_image_one);
    fd.append("warranty_image", warranty_image);
    dispatch(baltraCustomerAdd({ formData: fd, enqueueSnackbar })).then((r) => {
      if (!r.error) handleClose();
    });
  };

  /* Clear field error on change */
  const clearErr = (key) =>
    errs[key] &&
    setErrs((p) => {
      const n = { ...p };
      delete n[key];
      return n;
    });

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearProductError());
    }
  }, [dispatch, error]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-[2px] overflow-y-auto"
      onClick={handleClose}
    >
      {/* ── Sheet / Modal ── */}
      <div
        ref={scrollRef}
        className={[
          "relative w-full bg-white overflow-hidden",
          /* mobile: bottom sheet style */
          "rounded-t-2xl sm:rounded-2xl",
          /* desktop: constrained width, vertical margin */
          "sm:max-w-xl md:max-w-2xl sm:mx-4 sm:my-6",
          "border border-slate-100",
          /* push sheet above keyboard on mobile */
          "max-h-[92dvh] sm:max-h-[90vh] flex flex-col",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Drag handle (mobile only) ── */}
        <div className="flex justify-center pt-2.5 pb-1 sm:hidden" aria-hidden>
          <div className="w-9 h-1 rounded-full bg-slate-200" />
        </div>

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 text-red-500">
              <IconPhone />
            </div>
            <div>
              <h2 className="text-[13px] sm:text-[14px] font-semibold text-gray-900 leading-none">
                Register a product
              </h2>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                Add your purchase to earn reward points
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors flex-shrink-0"
          >
            <IconX />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          <form
            onSubmit={handleSubmit}
            className="px-4 sm:px-6 py-4 sm:py-5 space-y-5 sm:space-y-6"
            noValidate
          >
            {/* Upload images */}
            <div>
              <SectionLabel>Upload images</SectionLabel>
              {/* 3-col on sm+, 1-col on xs */}
              <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <ImageUploadZone
                  id="product_image"
                  label="Product"
                  icon={IconUpload}
                  preview={productImagePreview}
                  onChange={(e) => {
                    makeImageHandler(
                      setProductImage,
                      setProductImagePreview,
                    )(e);
                    clearErr("product_image");
                  }}
                  error={errs.product_image}
                />
                <ImageUploadZone
                  id="bill_image_one"
                  label="Bill / Invoice"
                  icon={IconReceipt}
                  preview={billPreview}
                  onChange={(e) => {
                    makeImageHandler(setBillImage, setBillPreview)(e);
                    clearErr("bill_image_one");
                  }}
                  error={errs.bill_image_one}
                />
                <ImageUploadZone
                  id="warranty_image"
                  label="Warranty card"
                  icon={IconShield}
                  preview={warrantyPreview}
                  onChange={(e) => {
                    makeImageHandler(setWarrantyImage, setWarrantyPreview)(e);
                    clearErr("warranty_image");
                  }}
                  error={errs.warranty_image}
                />
              </div>
            </div>

            {/* Store info */}
            <div>
              <SectionLabel>Store information</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Field label="Store name" error={errs.store_name}>
                  <input
                    name="store_name"
                    value={form.store_name}
                    onChange={(e) => {
                      handleChange(e);
                      clearErr("store_name");
                    }}
                    placeholder="e.g. Baltra Showroom"
                    className={inputCls(errs.store_name)}
                  />
                </Field>
                <Field label="Store location" error={errs.store_location}>
                  <input
                    name="store_location"
                    value={form.store_location}
                    onChange={(e) => {
                      handleChange(e);
                      clearErr("store_location");
                    }}
                    placeholder="e.g. Kathmandu"
                    className={inputCls(errs.store_location)}
                  />
                </Field>
                <Field label="Store number" error={errs.store_number}>
                  <input
                    name="store_number"
                    value={form.store_number}
                    onChange={(e) => {
                      handleChange(e);
                      clearErr("store_number");
                    }}
                    placeholder="e.g. 01-XXXXXX"
                    className={inputCls(errs.store_number)}
                  />
                </Field>
              </div>
            </div>

            {/* Product info */}
            <div>
              <SectionLabel>Product information</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Field label="Model name" error={errs.model_name}>
                  <input
                    name="model_name"
                    value={form.model_name}
                    onChange={(e) => {
                      handleChange(e);
                      clearErr("model_name");
                    }}
                    placeholder="e.g. Baltra Air Fryer"
                    className={inputCls(errs.model_name)}
                  />
                </Field>
                <Field label="Model number" error={errs.model_num}>
                  <input
                    name="model_num"
                    value={form.model_num}
                    onChange={(e) => {
                      handleChange(e);
                      clearErr("model_num");
                    }}
                    placeholder="e.g. BAF-101"
                    className={inputCls(errs.model_num)}
                  />
                </Field>
                <Field label="Serial number" error={errs.serial_number}>
                  <input
                    name="serial_number"
                    value={form.serial_number}
                    onChange={(e) => {
                      handleChange(e);
                      clearErr("serial_number");
                    }}
                    placeholder="e.g. SN-XXXXXXXXX"
                    className={inputCls(errs.serial_number)}
                  />
                </Field>
                <Field label="Purchase date" error={errs.purchase_date}>
                  <input
                    type="date"
                    name="purchase_date"
                    value={form.purchase_date}
                    onChange={(e) => {
                      handleChange(e);
                      clearErr("purchase_date");
                    }}
                    max={today}
                    className={inputCls(errs.purchase_date)}
                  />
                </Field>
              </div>
            </div>

            {/* Footer — inside form so submit button works */}
            <div className="flex items-center justify-end gap-2.5 sm:gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleClose}
                className="h-9 sm:h-10 px-4 sm:px-5 rounded-xl border border-slate-200 text-[12px] sm:text-[13px] font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="h-9 sm:h-10 px-5 sm:px-6 rounded-xl bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-[12px] sm:text-[13px] font-semibold inline-flex items-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Saving…</span>
                  </>
                ) : (
                  "Save product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserAddProductModal);
