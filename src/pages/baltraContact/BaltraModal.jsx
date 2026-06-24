import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiArrowRight, FiMail, FiPhone } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  addContact,
  clearContactError,
} from "../../redux/features/contact/contactSlice";

const InputField = ({ label, id, error, children }) => (
  <div className="flex flex-col gap-1">
    <label
      htmlFor={id}
      className="text-xs font-semibold uppercase tracking-wider text-gray-500 font-gothamNarrow"
    >
      {label}
    </label>
    {children}
    {error && (
      <p className="text-red-500 text-xs font-gothamNarrow mt-0.5">{error}</p>
    )}
  </div>
);

const BaltraModal = () => {
  const { loading, error } = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (contactData) => {
    dispatch(addContact({ contactData, enqueueSnackbar }));
    reset();
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearContactError());
    }
  }, [dispatch, error]);

  const inputClass = `
  w-full px-4 py-3 bg-white border border-gray-200
  appearance-none outline-none
  focus:outline-none focus-visible:outline-none
  focus:border-red-500 focus:ring-0 focus:shadow-none
  rounded-lg text-sm text-gray-900
  font-gothamNarrow
  placeholder:text-gray-300
  transition-all duration-200
`;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* ── Left: Form ── */}
          <div className="flex-1 px-6 sm:px-10 py-10 lg:py-12">
            {/* Heading */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-semibold font-gothamNarrow uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                Contact Us
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 font-gothamNarrow leading-tight">
                Get in Touch with Us
              </h2>
              <p className="text-sm text-gray-500 font-gothamNarrow mt-2">
                Reach out for support, inquiries, or collaborations.
              </p>
            </div>

            {/* Form */}
            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Name + Phone — side by side on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  label="Full Name"
                  id="name"
                  error={errors.name && "Full name is required"}
                >
                  <input
                    type="text"
                    id="name"
                    className={inputClass}
                    placeholder="John Doe"
                    {...register("name", { required: true })}
                  />
                </InputField>

                <InputField
                  label="Phone"
                  id="phone"
                  error={errors.phone && "Enter a valid 10-digit number"}
                >
                  <input
                    type="tel"
                    id="phone"
                    className={inputClass}
                    placeholder="98XXXXXXXX"
                    {...register("phone", {
                      required: true,
                      pattern: /^\d{10}$/,
                    })}
                  />
                </InputField>
              </div>

              <InputField
                label="Email"
                id="email"
                error={errors.email && "Enter a valid email address"}
              >
                <input
                  type="email"
                  id="email"
                  className={inputClass}
                  placeholder="you@example.com"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  })}
                />
              </InputField>

              <InputField
                label="Message"
                id="note"
                error={errors.note && "Please enter your message"}
              >
                <textarea
                  id="note"
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="How can we help you?"
                  {...register("note", { required: true })}
                />
              </InputField>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-semibold font-gothamNarrow rounded-lg flex items-center justify-center gap-2.5 transition-all duration-200 group mt-1"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <FiArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ── Right: Contact info panel ── */}
          <div className="lg:w-[380px] bg-gradient-to-br from-[#E91C1C] to-[#8B1010] px-6 sm:px-10 py-10 lg:py-12 flex flex-col text-white">
            <h3 className="text-xl sm:text-2xl font-semibold font-gothamNarrow mb-2">
              Contact Info
            </h3>
            <p className="text-sm text-white/70 font-gothamNarrow mb-8">
              We're here to help, any time.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-6 flex-1">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiMail size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60 font-gothamNarrow mb-0.5">
                    Email
                  </p>
                  <a
                    href="mailto:info@balajeenp.com"
                    className="text-sm text-white font-gothamNarrow hover:text-white/80 transition-colors underline underline-offset-2 decoration-white/30"
                  >
                    info@balajeenp.com
                  </a>
                </div>
              </div>

              {/* Sales */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiPhone size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60 font-gothamNarrow mb-0.5">
                    Sales Queries
                  </p>
                  <a
                    href="tel:+9779801200501"
                    className="text-sm text-white font-gothamNarrow hover:text-white/80 transition-colors"
                  >
                    +977 980-1200501
                  </a>
                </div>
              </div>

              {/* Service */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiPhone size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60 font-gothamNarrow mb-0.5">
                    Service Queries
                  </p>
                  <a
                    href="tel:+9779801200505"
                    className="text-sm text-white font-gothamNarrow hover:text-white/80 transition-colors"
                  >
                    +977 980-1200505
                  </a>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/20 my-2" />

              {/* Map — replaces the old decorative illustration */}
              <div className="relative flex-1 min-h-[180px]">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60 font-gothamNarrow mb-2">
                  Find Us Here
                </p>
                <div className="rounded-xl overflow-hidden border border-white/15 shadow-lg shadow-black/20 ring-1 ring-white/10">
                  <iframe
                    title="Balajee Group location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3469078794533!2d85.2820953!3d27.7065734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1920f0ff3323%3A0xde5c22ad581e394!2sBalajee%20Group!5e0!3m2!1sen!2snp!4v1782295309179!5m2!1sen!2snp"
                    width="100%"
                    height="200"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaltraModal;
