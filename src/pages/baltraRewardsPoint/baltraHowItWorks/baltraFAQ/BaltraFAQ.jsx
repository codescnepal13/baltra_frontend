import { useState } from "react";
import { FiHelpCircle, FiPlus } from "react-icons/fi";

const faqData = [
  {
    id: 1,
    title: "What is the loyalty points program?",
    description:
      "Our loyalty points program rewards customers for continued support and purchases of Baltra home appliances. With every purchase from our outlet, you earn points redeemable for exciting rewards and discounts on future purchases.",
  },
  {
    id: 2,
    title: "How do I earn loyalty points?",
    description:
      "Earning points is simple — for every rupee spent on eligible purchases from our outlet, you earn a set number of points. The more you spend, the more you earn. Watch for special promotions and bonus point offers to maximize your rewards.",
  },
  {
    id: 3,
    title: "Do my loyalty points expire?",
    description:
      "Points typically do not expire as long as your account remains active. However, we reserve the right to adjust loyalty program terms in rare circumstances. You will always be notified in advance of any such changes.",
  },
  {
    id: 4,
    title: "Can I transfer my loyalty points to another account?",
    description:
      "Loyalty points are non-transferable and can only be redeemed by the account holder who earned them. Points cannot be combined or transferred between accounts.",
  },
  {
    id: 5,
    title: "How are loyalty points calculated?",
    description:
      "Points are calculated based on the amount spent on eligible purchases — typically one point per rupee. The exact rate may vary depending on active promotions or specific terms of the loyalty program at the time of purchase.",
  },
];

const BaltraFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center px-4 md:px-8 lg:px-0 py-12 lg:py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
          <FiHelpCircle size={13} />
          Help center
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-gothamNarrow text-gray-900">
          Frequently asked <span className="text-[#F02121]">questions</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-500 font-gothamNarrow">
          Everything you need to know about the Baltra loyalty program
        </p>
      </div>

      {/* FAQ list */}
      <div className="w-full lg:w-[811px] flex flex-col gap-3">
        {faqData.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div
              key={faq.id}
              className={`w-full border rounded-xl overflow-hidden transition-all duration-200 bg-white ${
                isOpen
                  ? "border-[#F02121]"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              {/* Trigger row */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-[#F02121] text-sm font-semibold font-gothamNarrow min-w-[28px] flex-shrink-0">
                  {String(faq.id).padStart(2, "0")}
                </span>
                <span className="flex-1 text-gray-900 text-sm sm:text-base font-semibold font-gothamNarrow leading-snug">
                  {faq.title}
                </span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isOpen ? "bg-[#F02121] rotate-45" : "bg-red-50"
                  }`}
                >
                  <FiPlus
                    size={16}
                    className={isOpen ? "text-white" : "text-[#F02121]"}
                  />
                </span>
              </button>

              {/* Divider */}
              <div
                className={`mx-5 h-px transition-colors duration-200 ${
                  isOpen ? "bg-red-100" : "bg-gray-100"
                }`}
              />

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-96 py-4" : "max-h-0"
                }`}
              >
                <p className="px-5 pl-[calc(1.25rem+28px+1rem)] pr-5 text-sm text-gray-500 leading-7 font-gothamNarrow">
                  {faq.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BaltraFAQ;
