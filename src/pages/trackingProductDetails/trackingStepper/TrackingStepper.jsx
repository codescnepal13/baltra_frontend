import moment from "moment";

/* ── Canonical status messages ── */
const STATUS_MESSAGES = {
  unassigned:
    "Your complaint has been registered and will be reviewed by our service department shortly. Thank you for your patience.",
  "un-assigned":
    "Your complaint has been registered and will be reviewed by our service department shortly. Thank you for your patience.",
  "service center assigned":
    "Your complaint has been assigned to our technician. Our service department will contact you shortly. Thank you for your patience.",
  "service center allocated":
    "Your complaint has been assigned to our technician. Our service department will contact you shortly. Thank you for your patience.",
  "engineer allocated":
    "Your complaint has been assigned to our technician. Our service department will contact you shortly. Thank you for your patience.",
  "part approval pending from asm":
    "Your complaint has been verified by the technician, and the required parts have been requested. Thank you for your patience.",
  "part pending from ho":
    "The requested parts will be dispatched soon from the Head Office. Thank you for your patience.",
  "parts in transit":
    "The requested parts have been dispatched and are on their way to the technician. Thank you for your patience.",
  // All CRM variants for "Part Consumed" map to the same message
  "part consumed by service center":
    "The requested parts have been received by the technician, and your issue will be resolved shortly. Thank you for your patience.",
  "parts consumed by technician":
    "The requested parts have been received by the technician, and your issue will be resolved shortly. Thank you for your patience.",
  "parts issued by branch":
    "The requested parts have been received by the technician, and your issue will be resolved shortly. Thank you for your patience.",
  "parts consumed":
    "The requested parts have been received by the technician, and your issue will be resolved shortly. Thank you for your patience.",
  "on service":
    "Our service department is currently reviewing your complaint. Thank you for your patience.",
  completed:
    "Your repaired item is ready for collection. Please collect it from the location where it was dropped off or contact our service center for assistance.",
};

const DEFAULT_MESSAGE =
  "Our team is working on your request. Thank you for your patience.";

/* ── Normalised lookup — always lowercased + trimmed ── */
const getMessage = (statusName = "") => {
  const key = statusName.trim().toLowerCase();
  return STATUS_MESSAGES[key] ?? DEFAULT_MESSAGE;
};

/* ── Canonical display label for CRM variants ── */
const CRM_DISPLAY_LABEL = {
  "parts consumed by technician": "Part Consumed by Service Center",
  "parts issued by branch": "Part Consumed by Service Center",
  "parts consumed": "Part Consumed by Service Center",
};

const getDisplayLabel = (statusName = "") => {
  const key = statusName.trim().toLowerCase();
  return CRM_DISPLAY_LABEL[key] ?? statusName;
};

/* ── TrackingStepper ── */
const TrackingStepper = ({ trackingProduct }) => {
  if (!trackingProduct?.job_no) return null;

  const steps = trackingProduct?.stepper || [];
  const latestIndex = steps.length - 1;
  const latestStatus = steps[latestIndex]?.newServiceStatusName || "";
  const latestDisplayLabel = getDisplayLabel(latestStatus);
  const isCompleted = latestStatus.trim().toLowerCase() === "completed";

  return (
    <div className="relative py-4 w-full">
      {/* ── Stepper track ── */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex items-center w-max px-4 space-x-4 sm:space-x-6">
          {steps.map((step, index) => {
            const displayLabel = getDisplayLabel(step?.newServiceStatusName);
            return (
              <div key={index} className="flex items-center">
                {index > 0 && (
                  <div className="h-[2px] sm:h-[4px] w-8 sm:w-12 bg-red-500" />
                )}
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm font-semibold text-white bg-red-500">
                    {index + 1}
                  </div>
                  <div className="text-[10px] sm:text-sm font-medium text-center mt-2 font-gothamNarrow">
                    {displayLabel}
                  </div>
                  <div className="text-[8px] sm:text-xs text-gray-500 mt-1 font-gothamNarrow">
                    {moment(step?.dateAdded).format("ddd, MMM D, YYYY")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Status message banner ── */}
      {latestStatus && (
        <div
          className={`mt-5 mx-4 p-4 rounded border-l-4 flex items-start gap-3
            ${
              isCompleted
                ? "bg-green-50 border-green-500"
                : "bg-red-50 border-red-500"
            }`}
        >
          <div className="flex flex-col gap-0.5">
            <span
              className={`text-[11px] font-semibold uppercase tracking-widest font-gothamNarrow
                ${isCompleted ? "text-green-700" : "text-red-600"}`}
            >
              {latestDisplayLabel}
            </span>
            <p className="text-sm text-gray-700 font-gothamNarrow leading-relaxed">
              {getMessage(latestStatus)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingStepper;
