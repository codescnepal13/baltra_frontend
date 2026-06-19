import moment from "moment";

/* ─────────────────────────────────────────────────────────────
   All known API values seen across responses, normalised.
   Label = shown as-is from backend (newServiceStatusName / status)
   Message = PDF-exact text mapped here on frontend
───────────────────────────────────────────────────────────── */
const STATUS_MESSAGES = {
  // ── Unassigned ──────────────────────────────────────────
  unassigned:
    "Your complaint has been registered and will be reviewed by our service department shortly. Thank you for your patience.",
  "un-assigned":
    "Your complaint has been registered and will be reviewed by our service department shortly. Thank you for your patience.",

  // ── Service Center Assigned / Engineer Allocated ─────────
  "service center assigned":
    "Your complaint has been assigned to our technician. Our service department will contact you shortly. Thank you for your patience.",
  "service center allocated":
    "Your complaint has been assigned to our technician. Our service department will contact you shortly. Thank you for your patience.",
  "engineer allocated":
    "Your complaint has been assigned to our technician. Our service department will contact you shortly. Thank you for your patience.",

  // ── Part Approval Pending from ASM ───────────────────────
  "part approval pending from asm":
    "Your complaint has been verified by the technician, and the required parts have been requested. Thank you for your patience.",

  // ── Part Pending from HO (all API variants seen) ─────────
  "part pending from ho":
    "The requested parts will be dispatched soon from the Head Office. Thank you for your patience.",
  "part pending to ho":
    "The requested parts will be dispatched soon from the Head Office. Thank you for your patience.",
  "part approval pending from ho":
    "The requested parts will be dispatched soon from the Head Office. Thank you for your patience.",
  "parts pending from ho":
    "The requested parts will be dispatched soon from the Head Office. Thank you for your patience.",

  // ── Parts in Transit ─────────────────────────────────────
  "parts in transit":
    "The requested parts have been dispatched and are on their way to the technician. Thank you for your patience.",
  "part in transit":
    "The requested parts have been dispatched and are on their way to the technician. Thank you for your patience.",

  // ── Part Consumed (ALL variants — by technician, by service center, etc.) ───
  "part consumed by service center":
    "The requested parts have been received by the technician, and your issue will be resolved shortly. Thank you for your patience.",
  "part consumed by technician":
    "The requested parts have been received by the technician, and your issue will be resolved shortly. Thank you for your patience.",
  "parts consumed by service center":
    "The requested parts have been received by the technician, and your issue will be resolved shortly. Thank you for your patience.",
  "parts consumed by technician":
    "The requested parts have been received by the technician, and your issue will be resolved shortly. Thank you for your patience.",
  "parts issued by branch":
    "The requested parts have been received by the technician, and your issue will be resolved shortly. Thank you for your patience.",
  "parts consumed":
    "The requested parts have been received by the technician, and your issue will be resolved shortly. Thank you for your patience.",
  "part consumed":
    "The requested parts have been received by the technician, and your issue will be resolved shortly. Thank you for your patience.",

  // ── On Service ───────────────────────────────────────────
  "on service":
    "Our service department is currently reviewing your complaint. Thank you for your patience.",

  // ── Completed ────────────────────────────────────────────
  completed:
    "Your repaired item is ready for collection. Please collect it from the location where it was dropped off or contact our service center for assistance.",
};

const DEFAULT_MESSAGE =
  "Our team is working on your request. Thank you for your patience.";

/* strips spaces, lowercases — handles any casing/spacing the API sends */
const normalise = (s) => (s ?? "").trim().toLowerCase();

const getMessage = (statusName) => {
  const key = normalise(statusName);

  if (STATUS_MESSAGES[key]) return STATUS_MESSAGES[key];

  if (key.includes("part consumed") || key.includes("parts consumed")) {
    return "The requested parts have been received by the technician, and your issue will be resolved shortly. Thank you for your patience.";
  }

  if (key.includes("part pending") || key.includes("parts pending")) {
    return "The requested parts will be dispatched soon from the Head Office. Thank you for your patience.";
  }

  if (key.includes("in transit")) {
    return "The requested parts have been dispatched and are on their way to the technician. Thank you for your patience.";
  }

  return DEFAULT_MESSAGE;
};

/* ── TrackingStepper ── */
const TrackingStepper = ({ trackingProduct }) => {
  if (!trackingProduct?.job_no) return null;

  const steps = trackingProduct?.stepper || [];
  const latestIndex = steps.length - 1;
  const topLevelStatus = trackingProduct?.status ?? "";
  const isCompleted = normalise(topLevelStatus) === "completed";

  return (
    <div className="py-4 w-full max-w-lg mx-auto font-gothamNarrow">
      {/* ── Job ID + current status badge ── */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="bg-red-50 border border-red-300 rounded-lg px-3 py-1.5">
          <span className="text-[11px] text-red-800 font-medium uppercase tracking-wide">
            Job ID
          </span>
          <span className="text-[13px] text-red-600 font-semibold ml-2">
            #{trackingProduct.job_no}
          </span>
        </div>

        {topLevelStatus && (
          <div
            className={`ml-auto rounded-md px-2.5 py-1 border ${
              isCompleted
                ? "bg-green-50 border-green-300"
                : "bg-red-50 border-red-300"
            }`}
          >
            <span
              className={`text-[11px] font-semibold uppercase tracking-wide ${
                isCompleted ? "text-green-700" : "text-red-600"
              }`}
            >
              ● {topLevelStatus}
            </span>
          </div>
        )}
      </div>

      {/* ── Vertical stepper ── */}
      <div className="relative">
        {/* Gradient track line */}
        <div
          className="absolute left-5 top-5 bottom-5 w-0.5 z-0"
          style={{
            background: `linear-gradient(to bottom, #dc2626 ${
              (latestIndex / Math.max(steps.length - 1, 1)) * 100
            }%, #e5e7eb ${
              (latestIndex / Math.max(steps.length - 1, 1)) * 100
            }%)`,
          }}
        />

        {steps.map((step, index) => {
          const rawLabel = step?.newServiceStatusName ?? "";
          const isCurrent = index === latestIndex;
          const isDone = index < latestIndex;
          const isPending = index > latestIndex;

          return (
            <div
              key={index}
              className={`flex gap-3.5 mb-6 relative transition-opacity ${
                isPending ? "opacity-50" : "opacity-100"
              }`}
              style={{ animation: `fadeIn 0.4s ease ${index * 0.1}s both` }}
            >
              {/* Circle */}
              <div className="relative z-10 flex-shrink-0">
                {isCurrent && (
                  <span className="absolute inset-0 -m-1.5 rounded-full border-2 border-red-300 animate-pulse" />
                )}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${isDone ? "bg-red-600 shadow-[0_0_0_4px_#fee2e2]" : ""}
                    ${isCurrent ? "bg-white border-2 border-red-600" : ""}
                    ${isPending ? "bg-gray-100 border-2 border-dashed border-gray-300" : ""}
                  `}
                >
                  {isDone && (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  {isCurrent && (
                    <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  )}
                  {isPending && (
                    <span className="text-xs text-gray-400 font-medium">
                      {index + 1}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="pt-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-sm font-medium ${
                      isPending ? "text-gray-400" : "text-gray-800"
                    }`}
                  >
                    {rawLabel || "—"}
                  </span>
                  {isDone && (
                    <span className="text-[11px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      Done
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-[11px] bg-red-50 text-red-600 border border-red-300 px-2 py-0.5 rounded-full font-medium">
                      Current Stage
                    </span>
                  )}
                  {isPending && (
                    <span className="text-[11px] bg-gray-100 text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full">
                      Pending
                    </span>
                  )}
                </div>

                {step?.dateAdded && (
                  <p className="text-[12px] text-gray-400 mt-0.5">
                    {moment(step.dateAdded).format("D MMM YYYY, h:mm A")}
                  </p>
                )}

                {isCurrent && (
                  <div className="mt-2 bg-red-50 border-l-[3px] border-l-red-500 rounded-r-md px-3 py-2">
                    <p className="text-[12px] text-red-800 leading-relaxed m-0">
                      {getMessage(rawLabel)}
                    </p>
                  </div>
                )}

                {isDone && (
                  <p className="text-[12px] text-gray-400 mt-1 leading-relaxed">
                    {step?.description || getMessage(rawLabel)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Completed banner ── */}
      {isCompleted && (
        <div className="mt-4 p-4 rounded-lg border border-green-200 bg-green-50 flex gap-3">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-sm text-green-800 leading-relaxed self-center">
            {getMessage(topLevelStatus)}
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackingStepper;
