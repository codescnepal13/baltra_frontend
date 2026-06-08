// SingleWarrantyStatusModal.jsx
import moment from "moment";
import { useEffect, useState } from "react";
import {
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineClipboardDocumentList,
  HiOutlineEnvelope,
  HiOutlineExclamationTriangle,
  HiOutlineFilm,
  HiOutlineIdentification,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlinePhoto,
  HiOutlineTag,
  HiOutlineUser,
  HiOutlineWrenchScrewdriver,
  HiOutlineXCircle,
  HiOutlineXMark,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { getWarrantyStatusById } from "../../../../../redux/features/admin/adminSlice";

/* ── Status badge ──────────────────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const map = {
    "Un-Assigned": "bg-amber-50 border-amber-200 text-amber-700",
    Assigned: "bg-blue-50 border-blue-200 text-blue-700",
    Resolved: "bg-emerald-50 border-emerald-200 text-emerald-700",
    Closed: "bg-slate-100 border-slate-200 text-slate-500",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-semibold ${
        map[status] ?? "bg-slate-100 border-slate-200 text-slate-500"
      }`}
    >
      {status ?? "—"}
    </span>
  );
};

/* ── Section heading ───────────────────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1 mt-4 first:mt-0 px-1">
    {children}
  </p>
);

/* ── Field row ─────────────────────────────────────────────────────────── */
const Field = ({ icon: Icon, label, value, mono = false, children }) => (
  <div className="flex items-start gap-2.5 py-2 border-b border-slate-100 last:border-0">
    <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Icon size={11} className="text-slate-400" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
        {label}
      </p>
      {children ?? (
        <p
          className={`text-xs text-slate-800 font-medium break-all leading-snug ${mono ? "font-mono" : ""}`}
        >
          {value || "—"}
        </p>
      )}
    </div>
  </div>
);

/* ── Media lightbox ────────────────────────────────────────────────────── */
const MediaThumb = ({ src, type = "image", label }) => {
  const [open, setOpen] = useState(false);
  if (!src) return null;
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative w-full h-24 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 hover:border-red-300 transition-all"
      >
        {type === "video" ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5">
            <HiOutlineFilm
              size={20}
              className="text-slate-300 group-hover:text-red-400 transition-colors"
            />
            <span className="text-[10px] text-slate-400 group-hover:text-red-400 font-medium transition-colors">
              Play Video
            </span>
          </div>
        ) : (
          <img src={src} alt={label} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-end p-1.5">
          <span className="text-[9px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 px-1.5 py-0.5 rounded-md">
            {label}
          </span>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-3 -right-3 z-10 w-7 h-7 rounded-full bg-white text-slate-600 hover:text-red-500 flex items-center justify-center shadow-lg transition-colors"
            >
              <HiOutlineXMark size={14} />
            </button>
            {type === "video" ? (
              <video
                src={src}
                controls
                autoPlay
                className="w-full rounded-2xl max-h-[70vh]"
              />
            ) : (
              <img
                src={src}
                alt={label}
                className="w-full rounded-2xl max-h-[80vh] object-contain"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   Main modal
══════════════════════════════════════════════════════════════════════════ */
const SingleWarrantyStatusModal = ({ complaintId, onClose }) => {
  const dispatch = useDispatch();
  const { loading, singleComplaintStatus: d } = useSelector((s) => s.admin);

  useEffect(() => {
    if (complaintId) dispatch(getWarrantyStatusById(complaintId));
  }, [complaintId, dispatch]);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const isActive = d?.purchase_date
    ? moment(d.purchase_date).add(1, "year").isAfter(moment())
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="font-gothamNarrow bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
              <HiOutlineClipboardDocumentList
                size={15}
                className="text-red-500"
              />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                Complaint Details
              </h2>
              {d?.serial_number && !loading && (
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  S/N: {d.serial_number}
                  {d?.job_no && (
                    <span className="ml-2 text-slate-300">
                      · Job #{d.job_no}
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {d?.status && !loading && <StatusBadge status={d.status} />}
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-all"
            >
              <HiOutlineXMark size={14} />
            </button>
          </div>
        </div>

        {/* ── Body ──────────────────────────────────────────────────── */}
        <div className="overflow-y-auto flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-slate-200 border-t-red-500 animate-spin" />
              <span className="text-xs text-slate-400">Loading…</span>
            </div>
          ) : d ? (
            <div className="px-5 pb-5">
              {/* ── Warranty status banner ───────────────────────── */}
              {isActive !== null && (
                <div className="mt-4">
                  {isActive ? (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200">
                      <HiOutlineCheckCircle
                        size={14}
                        className="text-emerald-600 flex-shrink-0"
                      />
                      <span className="text-xs font-semibold text-emerald-700">
                        Warranty Active
                      </span>
                      <span className="ml-auto text-[10px] text-emerald-500">
                        Expires{" "}
                        {moment(d.purchase_date).add(1, "year").fromNow()}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 border border-red-200">
                      <HiOutlineXCircle
                        size={14}
                        className="text-red-500 flex-shrink-0"
                      />
                      <span className="text-xs font-semibold text-red-600">
                        Warranty Expired
                      </span>
                      <span className="ml-auto text-[10px] text-red-400">
                        {moment(d.purchase_date).add(1, "year").fromNow()}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* ── Media ───────────────────────────────────────── */}
              {(d.damaged_image_url ||
                d.warranty_image_url ||
                d.damaged_video_url) && (
                <>
                  <SectionLabel>Media</SectionLabel>
                  <div className="grid grid-cols-3 gap-2 mb-1">
                    <MediaThumb src={d.damaged_image_url} label="Damaged" />
                    <MediaThumb src={d.warranty_image_url} label="Warranty" />
                    <MediaThumb
                      src={d.damaged_video_url}
                      type="video"
                      label="Video"
                    />
                  </div>
                </>
              )}

              {/* ── Product info ─────────────────────────────────── */}
              <SectionLabel>Product</SectionLabel>
              <div className="bg-slate-50 rounded-xl px-3 py-1 mb-1">
                <Field
                  icon={HiOutlineTag}
                  label="Model Name"
                  value={d.model_name}
                />
                <Field
                  icon={HiOutlineIdentification}
                  label="Model No."
                  value={d.model_num}
                  mono
                />
                <Field
                  icon={HiOutlineIdentification}
                  label="Serial No."
                  value={d.serial_number}
                  mono
                />
                <Field
                  icon={HiOutlineCalendar}
                  label="Purchase Date"
                  value={
                    d.purchase_date
                      ? moment(d.purchase_date).format("D MMMM YYYY")
                      : null
                  }
                />
                <Field
                  icon={HiOutlineCalendar}
                  label="Registered On"
                  value={
                    d.date_joined
                      ? moment(d.date_joined).format("D MMM YYYY, h:mm A")
                      : null
                  }
                />
              </div>

              {/* ── Complaint info ───────────────────────────────── */}
              <SectionLabel>Complaint</SectionLabel>
              <div className="bg-slate-50 rounded-xl px-3 py-1 mb-1">
                <Field
                  icon={HiOutlineWrenchScrewdriver}
                  label="Problem Type"
                  value={d.problem_type}
                />
                <Field icon={HiOutlineExclamationTriangle} label="Description">
                  <p className="text-xs text-slate-700 leading-relaxed mt-0.5">
                    {d.problem_description || "—"}
                  </p>
                </Field>
              </div>

              {/* ── Customer info ────────────────────────────────── */}
              <SectionLabel>Customer</SectionLabel>
              <div className="bg-slate-50 rounded-xl px-3 py-1 mb-1">
                <Field
                  icon={HiOutlineUser}
                  label="Name"
                  value={d.customerName || d.customer_name}
                />
                <Field icon={HiOutlinePhone} label="Contact">
                  <p className="text-xs text-slate-800 font-medium font-mono">
                    {d.customerContact || "—"}
                  </p>
                </Field>
                <Field icon={HiOutlineEnvelope} label="Email" value={d.email} />
                <Field
                  icon={HiOutlineMapPin}
                  label="Address"
                  value={d.customerAddress}
                />
                <Field icon={HiOutlineMapPin} label="Zone / Area">
                  <p className="text-xs text-slate-800 font-medium">
                    {[d.zone, d.area].filter(Boolean).join(" · ") || "—"}
                  </p>
                </Field>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-2">
              <HiOutlinePhoto size={28} className="text-slate-200" />
              <p className="text-sm text-slate-400 font-medium">
                No data found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleWarrantyStatusModal;
