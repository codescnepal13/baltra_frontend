import moment from "moment";

/* ──────────────────────────────────────────────────────────
   STATUS MESSAGE MAP
   Keys = exact newServiceStatusName values from the API.
   Add/adjust keys here if the API ever returns new variants.
────────────────────────────────────────────────────────── */
const STATUS_MESSAGES = {
  // a. Unassigned variants
  "Un-Assigned":
    "Your complaint has been registered and will be reviewed by our service department shortly. Thank you for your patience.",
  Unassigned:
    "Your complaint has been registered and will be reviewed by our service department shortly. Thank you for your patience.",

  // b. Service Center Assigned / Engineer Allocated variants
  "Service Center Assigned":
    "Your complaint has been assigned to our technician. Our service department will contact you shortly. Thank you for your patience.",
  "Service Center Allocated":
    "Your complaint has been assigned to our technician. Our service department will contact you shortly. Thank you for your patience.",
  "Engineer Allocated":
    "Your complaint has been assigned to our technician. Our service department will contact you shortly. Thank you for your patience.",

  // c. Part Approval Pending from ASM
  "Part Approval Pending from ASM":
    "Your complaint has been verified by the technician, and the required parts have been requested. Thank you for your patience.",

  // d. Part Pending from HO
  "Part Pending from HO":
    "The requested parts will be dispatched soon from the Head Office. Thank you for your patience.",

  // e. Parts in Transit
  "Parts in Transit":
    "The requested parts have been dispatched and are on their way to the technician. Thank you for your patience.",

  // f. Part Consumed by Service Center
  "Part Consumed by Service Center":
    "The requested parts have been received by the technician, and your issue will be resolved shortly. Thank you for your patience.",

  // g. On Service
  "On Service":
    "Our service department is currently reviewing your complaint. Thank you for your patience.",

  // h. Completed
  Completed:
    "Your repaired item is ready for collection. Please pick it up from the location where it was dropped off or contact our service center for assistance.",
};

const DEFAULT_MESSAGE =
  "Our team is working on your request. Thank you for your patience.";

/* Lookup: exact match first, then case-insensitive fallback */
const getMessage = (statusName = "") => {
  const trimmed = statusName.trim();
  if (STATUS_MESSAGES[trimmed]) return STATUS_MESSAGES[trimmed];
  const key = Object.keys(STATUS_MESSAGES).find(
    (k) => k.toLowerCase() === trimmed.toLowerCase(),
  );
  return key ? STATUS_MESSAGES[key] : DEFAULT_MESSAGE;
};

/* ──────────────────────────────────────────────────────────
   STEPPER  (design unchanged from original)
   + one status message line shown below the current step label
────────────────────────────────────────────────────────── */
const UserRegisteredStepper = ({ singleAddedProduct }) => {
  if (!singleAddedProduct?.job_no) return null;

  const steps = singleAddedProduct?.stepper || [];
  const latestIndex = steps.length - 1;
  const latestStatus = steps[latestIndex]?.newServiceStatusName || "";
  const isCompleted = latestStatus.toLowerCase().includes("completed");

  return (
    <div className="relative py-4 w-full">
      {/* ── Stepper track (original design) ── */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex items-center w-max px-4 space-x-4 sm:space-x-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <div className="h-[2px] sm:h-[4px] w-8 sm:w-12 bg-red-500" />
              )}

              <div className="flex flex-col items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm font-semibold text-white bg-red-500">
                  {index + 1}
                </div>
                <div className="text-[10px] sm:text-sm font-medium text-center mt-2 font-gothamNarrow">
                  {step?.newServiceStatusName}
                </div>
                <div className="text-[8px] sm:text-xs text-gray-500 mt-1 font-gothamNarrow">
                  {moment(step?.dateAdded).format("ddd, MMM D, YYYY")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Status message for current/latest step ── */}
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
              {latestStatus}
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

export default UserRegisteredStepper;
