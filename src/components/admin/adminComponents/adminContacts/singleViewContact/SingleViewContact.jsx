import moment from "moment";
import { useMemo } from "react";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineClock,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineUser,
  HiOutlineXMark,
} from "react-icons/hi2";

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ name }) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";
  return (
    <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center text-[13px] font-semibold flex-shrink-0">
      {initials}
    </div>
  );
};

// ─── Info cell ────────────────────────────────────────────────────────────────
const InfoCell = ({
  icon: Icon,
  label,
  value,
  mono = false,
  isEmail = false,
}) => (
  <div className="flex flex-col gap-1">
    <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.08em] uppercase text-gray-400">
      <Icon size={11} />
      {label}
    </p>
    {isEmail ? (
      <a
        href={`mailto:${value}`}
        className="text-[12.5px] text-blue-500 hover:text-blue-700 transition-colors truncate"
      >
        {value || "—"}
      </a>
    ) : (
      <p
        className={`text-[12.5px] font-medium text-gray-800 truncate ${
          mono ? "font-mono tracking-wide" : ""
        }`}
      >
        {value || "—"}
      </p>
    )}
  </div>
);

// ─── Modal ────────────────────────────────────────────────────────────────────
const SingleViewContact = ({ contact, isOpen, onClose }) => {
  const formattedDate = useMemo(
    () =>
      contact?.created_at
        ? moment(contact.created_at).format("dddd, D MMM YYYY")
        : "Date unavailable",
    [contact?.created_at],
  );

  const formattedTime = useMemo(
    () =>
      contact?.created_at ? moment(contact.created_at).format("h:mm A") : "",
    [contact?.created_at],
  );

  if (!isOpen || !contact) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal card */}
      <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Avatar name={contact.name} />
          <div className="flex-1 min-w-0">
            <p className="text-[13.5px] font-semibold text-gray-900 tracking-[-0.01em] truncate">
              {contact.name || "Unknown"}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5 tracking-[0.01em]">
              Customer enquiry
            </p>
          </div>
          {/* Timestamp */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gray-50 border border-gray-100 text-[10.5px] text-gray-400 tracking-[0.02em] flex-shrink-0">
            <HiOutlineClock size={11} />
            {formattedTime} · {moment(contact.created_at).format("D MMM YYYY")}
          </div>
          {/* Close */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0"
            title="Close"
          >
            <HiOutlineXMark size={16} />
          </button>
        </div>

        {/* Info grid — 2 cols */}
        <div className="grid grid-cols-2 gap-px bg-gray-100 border-b border-gray-100">
          <div className="bg-white px-5 py-4">
            <InfoCell icon={HiOutlineUser} label="Name" value={contact.name} />
          </div>
          <div className="bg-white px-5 py-4">
            <InfoCell
              icon={HiOutlinePhone}
              label="Phone"
              value={contact.phone}
              mono
            />
          </div>
          <div className="bg-white px-5 py-4">
            <InfoCell
              icon={HiOutlineEnvelope}
              label="Email"
              value={contact.email}
              isEmail
            />
          </div>
          <div className="bg-white px-5 py-4">
            <InfoCell
              icon={HiOutlineClock}
              label="Created at"
              value={formattedDate}
            />
          </div>
        </div>

        {/* Message */}
        <div className="px-5 py-4">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.08em] uppercase text-gray-400 mb-2.5">
            <HiOutlineChatBubbleLeftRight size={11} />
            Message
          </p>
          <div className="bg-gray-50 border-l-2 border-gray-200 rounded-r-lg px-4 py-3 min-h-[60px]">
            <p className="text-[12.5px] text-gray-600 leading-relaxed tracking-[0.01em]">
              {contact.note || "No message provided."}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-5 py-3 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleViewContact;
