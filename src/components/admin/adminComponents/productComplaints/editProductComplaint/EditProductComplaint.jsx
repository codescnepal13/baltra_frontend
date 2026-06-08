// EditProductComplaint.jsx
import { enqueueSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import {
  HiOutlineArrowLeft,
  HiOutlineBuildingOffice2,
  HiOutlineCamera,
  HiOutlineCheckCircle,
  HiOutlineClipboardDocumentList,
  HiOutlineEnvelope,
  HiOutlineExclamationTriangle,
  HiOutlineFilm,
  HiOutlineIdentification,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineTag,
  HiOutlineTrash,
  HiOutlineUser,
  HiOutlineWrenchScrewdriver,
  HiOutlineXMark,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearCustomerError,
  getSingleProductComplaint,
  updateProductComplaint,
} from "../../../../../redux/features/customer/customerSlice";

/* ── constants ─────────────────────────────────────────────────────────── */
const PROBLEM_TYPES = [
  "Lamp",
  "Motor",
  "Compressor",
  "Display",
  "Remote",
  "PCB",
  "Fan",
  "Other",
];
const STATUS_OPTIONS = [
  "Un-Assigned",
  "Assigned",
  "In-Progress",
  "Resolved",
  "Closed",
];
const ZONES = [
  "KARNALI",
  "BAGMATI",
  "GANDAKI",
  "LUMBINI",
  "MADHESH",
  "KOSHI",
  "SUDURPASHCHIM",
  "PROVINCE 1",
];

/* ── Section wrapper ────────────────────────────────────────────────────── */
const Section = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
      <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
        <Icon size={13} className="text-red-500" />
      </div>
      <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
        {title}
      </h2>
    </div>
    <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
      {children}
    </div>
  </div>
);

/* ── Field wrapper ──────────────────────────────────────────────────────── */
const Field = ({ label, full = false, children }) => (
  <div className={full ? "sm:col-span-2" : ""}>
    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
      {label}
      <span className="ml-1 normal-case font-normal text-slate-300">
        (optional)
      </span>
    </label>
    {children}
  </div>
);

const inputCls =
  "w-full appearance-none px-3 py-2 text-xs text-slate-700 bg-white border border-slate-200 rounded-xl placeholder-slate-300 outline-none ring-0 shadow-none focus:border-red-400 focus:outline-none focus:ring-0 focus:ring-transparent focus:shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none transition-all font-gothamNarrow";

const selectCls =
  "w-full appearance-none px-3 py-2 text-xs text-slate-700 bg-white border border-slate-200 rounded-xl outline-none ring-0 shadow-none focus:border-red-400 focus:outline-none focus:ring-0 focus:ring-transparent focus:shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none transition-all font-gothamNarrow";

/* ── Media upload field ─────────────────────────────────────────────────── */
const MediaField = ({
  label,
  accept,
  icon: Icon,
  currentUrl,
  file,
  onFile,
  onClear,
  isVideo = false,
}) => {
  const inputRef = useRef(null);
  const preview = file ? URL.createObjectURL(file) : currentUrl;

  return (
    <Field label={label}>
      <div className="relative">
        {preview ? (
          <div className="relative w-full h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group">
            {isVideo ? (
              <video
                src={preview}
                className="w-full h-full object-cover"
                muted
              />
            ) : (
              <img
                src={preview}
                alt={label}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors"
              >
                <HiOutlineCamera size={14} />
              </button>
              <button
                type="button"
                onClick={onClear}
                className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors"
              >
                <HiOutlineTrash size={14} />
              </button>
            </div>
            {file && (
              <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider bg-red-500 text-white px-1.5 py-0.5 rounded-md">
                New
              </span>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full h-32 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:border-red-300 hover:bg-red-50/30 transition-all flex flex-col items-center justify-center gap-2"
          >
            <Icon size={20} className="text-slate-300" />
            <span className="text-[10px] text-slate-400 font-semibold">
              Click to upload
            </span>
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
      </div>
    </Field>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   Main component
══════════════════════════════════════════════════════════════════════════ */
const EditProductComplaint = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    error,
    isLoading,
    isError,
    productComplaint: d,
  } = useSelector((s) => s.customer);

  /* ── form state ── all fields optional, pre-filled from API ── */
  const [form, setForm] = useState({
    model_name: "",
    model_num: "",
    serial_number: "",
    problem_type: "",
    problem_description: "",
    status: "",
    purchase_date: "",
    job_no: "",
    customerName: "",
    customerContact: "",
    email: "",
    customerAddress: "",
    zone: "",
    area: "",
  });
  const [damagedImage, setDamagedImage] = useState(null);
  const [warrantyImage, setWarrantyImage] = useState(null);
  const [damagedVideo, setDamagedVideo] = useState(null);

  /* ── populate form when data loads ── */
  useEffect(() => {
    if (d) {
      setForm({
        model_name: d.model_name ?? "",
        model_num: d.model_num ?? "",
        serial_number: d.serial_number ?? "",
        problem_type: d.problem_type ?? "",
        problem_description: d.problem_description ?? "",
        status: d.status ?? "",
        purchase_date: d.purchase_date ?? "",
        job_no: d.job_no ?? "",
        customerName: d.customerName ?? "",
        customerContact: d.customerContact ?? "",
        email: d.email ?? "",
        customerAddress: d.customerAddress ?? "",
        zone: d.zone ?? "",
        area: d.area ?? "",
      });
    }
  }, [d]);

  useEffect(() => {
    if (error) dispatch(clearCustomerError());
  }, [dispatch, error]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(isError, {
        variant: "error",
      });
      dispatch(clearCustomerError());
    }
  }, [dispatch, isError]);

  useEffect(() => {
    if (id) dispatch(getSingleProductComplaint({ complaint_id: id }));
  }, [dispatch, id]);

  /* ── field change ── */
  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  /* ── submit ── only send changed / non-empty fields ── */
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();

    // text fields — only append if not empty
    Object.entries(form).forEach(([key, val]) => {
      if (val !== "" && val !== null && val !== undefined) {
        fd.append(key, val);
      }
    });

    if (damagedImage) fd.append("damaged_image", damagedImage);
    if (warrantyImage) fd.append("warranty_image", warrantyImage);
    if (damagedVideo) fd.append("damaged_video", damagedVideo);

    dispatch(
      updateProductComplaint({
        complaint_id: id,
        formData: fd,
        enqueueSnackbar,
        navigate,
      }),
    );
  };

  /* ── render ── */
  return (
    <div className="font-gothamNarrow max-w-screen-2xl mx-auto px-4 py-6 min-h-screen bg-slate-50">
      {/* ── Page header ────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/baltra-admin-dashboard/all/products-complaints-list"
          className="w-8 h-8 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 transition-all"
        >
          <HiOutlineArrowLeft size={14} />
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
            <HiOutlineClipboardDocumentList
              size={15}
              className="text-red-500"
            />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 tracking-tight">
              Edit Complaint
            </h1>
            {d?.serial_number && (
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                S/N: {d.serial_number}
              </p>
            )}
          </div>
        </div>

        {/* Status pill */}
        {d?.status && (
          <span className="ml-auto inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-amber-50 border-amber-200 text-amber-700">
            {d.status}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ── Product info ────────────────────────────────────────────── */}
        <Section icon={HiOutlineTag} title="Product Information">
          <Field label="Model Name">
            <input
              className={inputCls}
              value={form.model_name}
              onChange={set("model_name")}
              placeholder="e.g. Split AC 1.5T"
            />
          </Field>
          <Field label="Model Number">
            <input
              className={inputCls}
              value={form.model_num}
              onChange={set("model_num")}
              placeholder="e.g. 21324324"
            />
          </Field>
          <Field label="Serial Number">
            <input
              className={inputCls}
              value={form.serial_number}
              onChange={set("serial_number")}
              placeholder="e.g. 232324"
            />
          </Field>
          <Field label="Purchase Date">
            <input
              type="date"
              className={inputCls}
              value={form.purchase_date}
              onChange={set("purchase_date")}
            />
          </Field>
          <Field label="Job No.">
            <input
              className={inputCls}
              value={form.job_no}
              onChange={set("job_no")}
              placeholder="Auto-assigned if blank"
            />
          </Field>
          <Field label="Status">
            <select
              className={selectCls}
              value={form.status}
              onChange={set("status")}
            >
              <option value="">Select status…</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </Section>

        {/* ── Complaint info ───────────────────────────────────────────── */}
        <Section icon={HiOutlineWrenchScrewdriver} title="Complaint Details">
          <Field label="Problem Type">
            <select
              className={selectCls}
              value={form.problem_type}
              onChange={set("problem_type")}
            >
              <option value="">Select problem…</option>
              {PROBLEM_TYPES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </Field>
          <div /> {/* spacer */}
          <Field label="Problem Description" full>
            <textarea
              className={`${inputCls} resize-none`}
              rows={3}
              value={form.problem_description}
              onChange={set("problem_description")}
              placeholder="Describe the issue in detail…"
            />
          </Field>
        </Section>

        {/* ── Customer info ────────────────────────────────────────────── */}
        <Section icon={HiOutlineUser} title="Customer Information">
          <Field label="Full Name">
            <div className="relative">
              <HiOutlineUser
                size={12}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
              />
              <input
                className={`${inputCls} pl-8`}
                value={form.customerName}
                onChange={set("customerName")}
                placeholder="Customer full name"
              />
            </div>
          </Field>
          <Field label="Contact Number">
            <div className="relative">
              <HiOutlinePhone
                size={12}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
              />
              <input
                className={`${inputCls} pl-8`}
                value={form.customerContact}
                onChange={set("customerContact")}
                placeholder="98XXXXXXXX"
              />
            </div>
          </Field>
          <Field label="Email" full>
            <div className="relative">
              <HiOutlineEnvelope
                size={12}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
              />
              <input
                type="email"
                className={`${inputCls} pl-8`}
                value={form.email}
                onChange={set("email")}
                placeholder="customer@email.com"
              />
            </div>
          </Field>
          <Field label="Address" full>
            <div className="relative">
              <HiOutlineMapPin
                size={12}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
              />
              <input
                className={`${inputCls} pl-8`}
                value={form.customerAddress}
                onChange={set("customerAddress")}
                placeholder="Street, Ward, City"
              />
            </div>
          </Field>
          <Field label="Zone">
            <div className="relative">
              <HiOutlineBuildingOffice2
                size={12}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
              />
              <select
                className={`${selectCls} pl-8`}
                value={form.zone}
                onChange={set("zone")}
              >
                <option value="">Select zone…</option>
                {ZONES.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>
            </div>
          </Field>
          <Field label="Area">
            <div className="relative">
              <HiOutlineMapPin
                size={12}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
              />
              <input
                className={`${inputCls} pl-8`}
                value={form.area}
                onChange={set("area")}
                placeholder="e.g. RASKOT"
              />
            </div>
          </Field>
        </Section>

        {/* ── Media uploads ────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
            <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
              <HiOutlineCamera size={13} className="text-red-500" />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Media
            </h2>
            <span className="ml-auto text-[10px] text-slate-300 font-medium">
              Hover image to replace or remove
            </span>
          </div>
          <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MediaField
              label="Damaged Image"
              accept="image/*"
              icon={HiOutlineExclamationTriangle}
              currentUrl={d?.damaged_image_url}
              file={damagedImage}
              onFile={setDamagedImage}
              onClear={() => setDamagedImage(null)}
            />
            <MediaField
              label="Warranty Image"
              accept="image/*"
              icon={HiOutlineIdentification}
              currentUrl={d?.warranty_image_url}
              file={warrantyImage}
              onFile={setWarrantyImage}
              onClear={() => setWarrantyImage(null)}
            />
            <MediaField
              label="Damaged Video"
              accept="video/*"
              icon={HiOutlineFilm}
              currentUrl={d?.damaged_video_url}
              file={damagedVideo}
              onFile={setDamagedVideo}
              onClear={() => setDamagedVideo(null)}
              isVideo
            />
          </div>
        </div>

        {/* ── Submit bar ───────────────────────────────────────────────── */}
        <div className="flex items-center justify-between pt-1 pb-4">
          <Link
            to="/baltra-admin-dashboard/product-complaints"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <HiOutlineXMark size={12} />
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold tracking-wide transition-colors"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <HiOutlineCheckCircle size={14} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductComplaint;
