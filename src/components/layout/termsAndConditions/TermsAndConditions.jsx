import { useState } from "react";
import TermsAndConditionImg from "../../../assets/images/terms&ConditionsImg.png";
import MetaData from "../metaData/MetaData";

const sections = [
  {
    title: "Introduction",
    content:
      "By accessing this website, you agree to accept these terms and conditions in full. If you do not agree with any part of these terms, please do not use our website.",
  },
  {
    title: "Products and Services",
    content:
      "Baltra offers a variety of home appliances designed to enhance your lifestyle. We strive to ensure the highest quality of our products; however, slight variations may occur.",
  },
  {
    title: "Account Registration",
    content:
      "To access certain features of our website, such as product registration and loyalty points, you may need to create an account. You agree to provide accurate and complete information during registration and to update such information as necessary.",
  },
  {
    title: "Payments",
    content:
      "While we currently do not offer direct order placements, any transactions related to product warranty purchases, or other services will be processed using secure payment methods available on our platform. All prices are listed in NPR.",
  },
  {
    title: "Returns and Refunds",
    content:
      "If you are not satisfied with your purchase, please visit our outlet in Teku with receipt to request a return or exchange. Items must be in their original condition for a full refund or exchange. Return shipping costs are the responsibility of the customer.",
  },
  {
    title: "Privacy Policy",
    content:
      "We are committed to protecting your privacy. Any personal information you provide will be used in accordance with our Privacy Policy.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content on this website, including but not limited to text, graphics, logos, and images, is the property of Baltra or its content suppliers and is protected by international copyright laws.",
  },
  {
    title: "Governing Law",
    content:
      "These terms and conditions are governed by and construed in accordance with the laws of Nepal. You irrevocably submit to the exclusive jurisdiction of the courts in that state or location.",
  },
  {
    title: "Changes to Terms and Conditions",
    content:
      "We reserve the right to revise these terms and conditions at any time. By continuing to use this website, you agree to be bound by the current version of these terms and conditions.",
  },
];

const TermsAndConditions = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <>
      <MetaData title="Baltra-Terms And Conditions" />

      <div className="font-gothamNarrow min-h-screen bg-[#fafaf9]">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, #e63946 0%, transparent 50%),
                                radial-gradient(circle at 80% 20%, #e63946 0%, transparent 40%)`,
            }}
          />
          <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-14 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="inline-block text-[11px] tracking-[0.2em] uppercase text-red-400 font-semibold mb-3 border border-red-400/30 px-3 py-1 rounded-full">
                Legal Document
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                Terms &<br />
                <span className="text-red-400">Conditions</span>
              </h1>
              <p className="text-white/50 text-sm leading-relaxed max-w-md">
                Welcome to Baltra. These terms and conditions outline the rules
                and regulations for using our website and engaging with our
                services.
              </p>
              <p className="text-white/30 text-xs mt-4">
                Last updated: June 2025
              </p>
            </div>
            <div className="flex-shrink-0 w-52 sm:w-64 animate-moveUpDown">
              <img
                src={TermsAndConditionImg}
                alt="Terms and Conditions"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-12">
          {/* Accordion Sections */}
          <div className="space-y-3 mb-12">
            {sections.map((section, i) => (
              <div
                key={i}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  activeIndex === i
                    ? "border-red-200 bg-white shadow-sm shadow-red-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left group"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold transition-colors ${
                        activeIndex === i
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 text-gray-400 group-hover:bg-red-50 group-hover:text-red-400"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[14px] font-semibold transition-colors ${
                        activeIndex === i ? "text-red-600" : "text-gray-800"
                      }`}
                    >
                      {section.title}
                    </span>
                  </div>
                  <svg
                    className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${
                      activeIndex === i
                        ? "rotate-180 text-red-500"
                        : "text-gray-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    activeIndex === i
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <p className="px-5 pb-5 text-[13.5px] text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Card */}
          <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] p-8 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10"
              style={{
                background: "radial-gradient(circle, #e63946, transparent)",
                transform: "translate(30%, -30%)",
              }}
            />
            <div className="relative">
              <h2 className="text-white text-lg font-bold mb-1">Contact Us</h2>
              <p className="text-white/40 text-sm mb-6">
                If you have any questions about these Terms and Conditions,
                please reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+97715970088"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-5 py-3.5 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest">
                      Phone
                    </p>
                    <p className="text-white text-[13px] font-medium">
                      +977-15970088
                    </p>
                  </div>
                </a>
                <a
                  href="mailto:info@balajeenp.com"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-5 py-3.5 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest">
                      Email
                    </p>
                    <p className="text-white text-[13px] font-medium">
                      info@balajeenp.com
                    </p>
                  </div>
                </a>
              </div>
              <p className="text-white/20 text-[11px] mt-6">
                Thank you for choosing Baltra. We look forward to serving you!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
