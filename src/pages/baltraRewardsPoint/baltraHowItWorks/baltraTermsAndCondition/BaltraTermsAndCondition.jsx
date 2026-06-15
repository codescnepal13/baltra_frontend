import {
  FiCircle,
  FiGift,
  FiGlobe,
  FiMapPin,
  FiShield,
  FiShoppingBag,
  FiSmartphone,
  FiTag,
  FiZap,
} from "react-icons/fi";
import termsConditionImg from "../../../../assets/images/termsConditionImg.png";
import MetaData from "../../../../components/layout/metaData/MetaData";

const terms = [
  {
    icon: <FiShoppingBag />,
    title: "Eligibility",
    description:
      "Only products purchased from the Baltra Retail Outlet located in Teku are eligible for registration for loyalty points and redemption.",
  },
  {
    icon: <FiZap />,
    title: "Utilization",
    description:
      "Once you reach the threshold, points can be used to purchase warranty directly from the website or app.",
  },
  {
    icon: <FiGift />,
    title: "Redemption",
    description:
      "If you prefer not to purchase additional warranty, visit the Baltra retail outlet in Teku to redeem your points in person.",
  },
  {
    icon: <FiTag />,
    title: "Offers",
    description:
      "Point redemption offers are at the sole discretion of Baltra and will be determined entirely by the company.",
  },
  {
    icon: <FiCircle />,
    title: "Point balance",
    description:
      "You cannot redeem your entire point balance. A portion of points will always remain active in your account and will not be nullified.",
  },
];

const stats = [
  { value: "1", label: "Eligible outlet" },
  { value: "5", label: "Program rules" },
  { value: "2", label: "Redeem options" },
  { value: "∞", label: "Points retained" },
];

const pills = [
  { icon: <FiSmartphone />, label: "App redemption" },
  { icon: <FiGlobe />, label: "Website purchase" },
  { icon: <FiMapPin />, label: "In-store visit" },
  { icon: <FiShield />, label: "Warranty perks" },
];

const BaltraTermsAndCondition = () => {
  return (
    <>
      <MetaData
        title="Terms and Conditions | Baltra - Kitchen & Home Appliances"
        description="Read the terms and conditions for using Baltra's website, products, and services. Understand your rights, responsibilities, warranties, return policies, and limitations."
        keywords="Baltra Terms and Conditions, User Agreement, Baltra Policies, Return Policy, Warranty Policy, Legal Terms, Appliance Warranty, Terms of Use, Privacy Terms, Baltra Website Terms"
        image="https://www.baltra.com/images/baltraAllProductsBanner.png"
        url="https://www.baltra.com/baltra-term-of-use"
        twitterCard="summary_large_image"
        twitterSite="@baltra"
        ogTitle="Terms and Conditions | Baltra Appliances"
        ogDescription="Stay informed with Baltra's terms of service. Learn about your rights, our policies on returns, warranties, and the responsible use of our website and appliances."
        ogImage="https://www.baltra.com/images/baltraAllProductsBanner.png"
        ogUrl="https://www.baltra.com/baltra-term-of-use"
      />

      <section className="bg-white px-4 md:px-8 lg:px-16 py-12 lg:py-20">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            <FiShield size={13} />
            Loyalty Program Rules
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-gray-900 font-gothamNarrow">
            <span className="text-[#F02121]">TERMS</span>{" "}
            <span className="text-gray-800">&amp;</span>{" "}
            <span className="text-[#F02121]">CONDITIONS</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500 font-gothamNarrow">
            Baltra loyalty points — how to earn, redeem, and stay in the loop
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left: Term cards */}
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            {terms.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white border border-gray-100 hover:border-gray-200 rounded-xl p-4 sm:p-5 transition-all duration-200"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-[#F02121]">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[#303A42] text-sm sm:text-base font-semibold font-gothamNarrow mb-1">
                    {index + 1}. {item.title}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed font-gothamNarrow">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Summary panel */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5">
            {/* Image */}
            <div className="flex justify-center">
              <img
                src={termsConditionImg}
                alt="Terms and Conditions illustration"
                className="w-full max-w-sm lg:max-w-full object-contain rounded-2xl"
              />
            </div>

            {/* At a glance box */}
            <div className="bg-red-50 rounded-2xl p-6">
              <p className="text-xs font-semibold text-[#F02121] uppercase tracking-widest mb-4 text-center">
                At a glance
              </p>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl py-4 px-3 text-center"
                  >
                    <p className="text-2xl font-bold text-[#F02121]">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 font-gothamNarrow leading-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Note */}
              <div className="mt-4 border-l-4 border-[#F02121] bg-white rounded-r-lg px-4 py-3">
                <p className="text-xs text-gray-500 leading-relaxed font-gothamNarrow">
                  A portion of your points is always retained — balances never
                  fully expire after redemption.
                </p>
              </div>
            </div>

            {/* Pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              {pills.map((pill, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-500 text-xs px-3 py-1.5 rounded-full font-gothamNarrow"
                >
                  <span className="text-[#F02121]">{pill.icon}</span>
                  {pill.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BaltraTermsAndCondition;
