import { useState } from "react";
import PrivacyPolicyImg from "../../../../assets/images/privacyPolicyImg.png";
import MetaData from "../MetaData";

const sections = [
  {
    title: "Information Collection",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    content: (
      <div className="text-[13.5px] text-gray-500 leading-relaxed space-y-4">
        <p>
          We collect personal information from you when you engage with our site
          in the following ways:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              label: "Account Registration",
              desc: "When you create an account to access our services.",
            },
            {
              label: "Product Registration",
              desc: "When you register your purchased Baltra products to claim loyalty points and warranties.",
            },
            {
              label: "Reviews",
              desc: "When you leave feedback or reviews on our products.",
            },
            {
              label: "Service Complaints",
              desc: "When you register a complaint regarding our products or services.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-lg p-3 border border-gray-100"
            >
              <p className="font-semibold text-gray-700 text-[12.5px] mb-1">
                {item.label}
              </p>
              <p className="text-gray-400 text-[12px]">{item.desc}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="mb-2 text-gray-600 font-medium text-[13px]">
            Personal information we may collect includes:
          </p>
          <div className="flex flex-wrap gap-2">
            {["Name", "Email address", "Mailing address", "Phone number"].map(
              (item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-[11.5px] font-medium px-3 py-1 rounded-full border border-red-100"
                >
                  <span className="w-1 h-1 rounded-full bg-red-400" />
                  {item}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Use of Information",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    content: (
      <div className="text-[13.5px] text-gray-500 leading-relaxed space-y-2">
        <p className="mb-3">
          The information we collect from you may be used in the following ways:
        </p>
        {[
          {
            label: "Personalization",
            desc: "To enhance your experience on our website.",
          },
          {
            label: "Website Improvement",
            desc: "To improve the functionality and user experience of our site.",
          },
          {
            label: "Customer Service",
            desc: "To respond to your inquiries and service complaints more effectively.",
          },
          {
            label: "Product Registration",
            desc: "To manage your registered products and associated loyalty points.",
          },
          {
            label: "Communication",
            desc: "To keep you informed about your registered products and any relevant updates.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0"
          >
            <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            </span>
            <p>
              <span className="font-semibold text-gray-700">{item.label}:</span>{" "}
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Protection of Information",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    content: (
      <p className="text-[13.5px] text-gray-500 leading-relaxed">
        We implement a variety of security measures to maintain the safety of
        your personal information. This includes using password protection and
        secure databases. While we strive to protect your information, please be
        aware that no method of transmission over the Internet or electronic
        storage is entirely secure.
      </p>
    ),
  },
  {
    title: "Cookies",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 10a1 1 0 11-2 0 1 1 0 012 0zm6 0a1 1 0 11-2 0 1 1 0 012 0zm-3 5a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </svg>
    ),
    content: (
      <p className="text-[13.5px] text-gray-500 leading-relaxed">
        Our website uses cookies to enhance your browsing experience. Cookies
        are small files stored on your device that help us improve your
        experience by gathering general visitor information and tracking visits.
        You can manage cookie preferences through your individual browser
        settings. Please note that disabling cookies may affect the
        functionality of our website.
      </p>
    ),
  },
  {
    title: "Disclosure of Information",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
    ),
    content: (
      <p className="text-[13.5px] text-gray-500 leading-relaxed">
        We do not sell, trade, or otherwise transfer your personally
        identifiable information to outside parties. However, we may share your
        information with trusted third parties who assist us in operating our
        website, conducting our business, or servicing you, provided those
        parties agree to keep this information confidential.
      </p>
    ),
  },
  {
    title: "Third Party Links",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      </svg>
    ),
    content: (
      <p className="text-[13.5px] text-gray-500 leading-relaxed">
        Occasionally, our website may include links to third-party products or
        services. These sites have their own privacy policies, and we do not
        have control over their content or practices. We encourage you to review
        the privacy policies of any third-party sites you visit.
      </p>
    ),
  },
  {
    title: "Online Privacy Policy Only",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
        />
      </svg>
    ),
    content: (
      <p className="text-[13.5px] text-gray-500 leading-relaxed">
        This online privacy policy applies solely to information collected
        through our website and not to information collected offline.
      </p>
    ),
  },
  {
    title: "Changes to Our Privacy Policy",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
    content: (
      <p className="text-[13.5px] text-gray-500 leading-relaxed">
        We may update this privacy policy from time to time. If we make
        significant changes, we will notify you by posting the new policy on
        this page and updating the date at the top. Your continued use of our
        site after any modifications indicates your acceptance of the revised
        policy.
      </p>
    ),
  },
];

const BaltraPrivacyPolicy = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <>
      <MetaData
        title="Privacy Policy | Baltra - Your Data, Our Responsibility"
        description="Read Baltra's Privacy Policy to understand how we collect, use, and protect your personal data when using our website and services."
        keywords="Baltra Privacy Policy, Data Protection, User Privacy, GDPR Compliance, Personal Data, Secure Transactions, Privacy Terms, Data Security, Information Protection"
        image="https://www.baltra.com/images/baltraAllProductsBanner.png"
        url="https://www.baltra.com/baltra/privacy-policy"
        twitterCard="summary_large_image"
        twitterSite="@baltra"
        ogTitle="Privacy Policy | Baltra Appliances"
        ogDescription="Your privacy matters to us. Learn about Baltra's policies on data collection, storage, and protection in compliance with industry standards."
        ogImage="https://www.baltra.com/images/baltraAllProductsBanner.png"
        ogUrl="https://www.baltra.com/baltra/privacy-policy"
      />

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
                Privacy <br />
                <span className="text-red-400">Policy</span>
              </h1>
              <p className="text-white/50 text-sm leading-relaxed max-w-md">
                Your privacy is important to us. This policy outlines how we
                collect, use, disclose, and safeguard your information when you
                visit our website and engage with our services.
              </p>
              <p className="text-white/30 text-xs mt-4">
                Last updated: June 2025
              </p>
            </div>
            <div className="flex-shrink-0 w-52 sm:w-64 animate-moveUpDown">
              <img
                src={PrivacyPolicyImg}
                alt="Privacy Policy"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-12">
          {/* Intro */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-[13.5px] font-semibold text-gray-800 mb-1">
                Our Commitment to You
              </h2>
              <p className="text-[13px] text-gray-400 leading-relaxed">
                Welcome to Baltra. Your privacy is important to us, and we are
                committed to protecting your personal information. This Privacy
                Policy outlines how we collect, use, disclose, and safeguard
                your information when you visit our website and engage with our
                services.
              </p>
            </div>
          </div>

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
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        activeIndex === i
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 text-gray-400 group-hover:bg-red-50 group-hover:text-red-400"
                      }`}
                    >
                      {section.icon}
                    </span>
                    <span
                      className={`text-[13.5px] font-semibold transition-colors ${
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
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    activeIndex === i
                      ? "max-h-[600px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 border-t border-gray-50 pt-3">
                    {section.content}
                  </div>
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
              <h2 className="text-white text-lg font-bold mb-1">
                Contacting Us
              </h2>
              <p className="text-white/40 text-sm mb-6">
                If you have any questions or concerns regarding this privacy
                policy, please feel free to reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+97715970088"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-5 py-3.5 transition-colors"
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
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-5 py-3.5 transition-colors"
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
                Thank you for trusting Baltra with your personal information. We
                are committed to ensuring your privacy and providing you with a
                secure online experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaltraPrivacyPolicy;
