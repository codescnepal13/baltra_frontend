import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqData = [
  {
    id: 1,
    title: "What is the loyalty points program?",
    description:
      "Our loyalty points program is designed to reward our valued customers for their continued support and purchases of Baltra home appliances. With every purchase made through our outlet, you earn points that can be redeemed for exciting rewards and discounts on future purchases.",
  },
  {
    id: 2,
    title: "How do I earn loyalty points?",
    description:
      "Earning loyalty points is simple!For every rupee spent on eligible purchases from our outlet,you will earn a certain number of points.The more you spend,the more points you earn.Keep an eye out for special promotions and bonus point offers to maximize your rewards",
  },
  {
    id: 3,
    title: "Do my loyalty points expire?",
    description:
      "Typically,loyalty points do not expires as long as your account remains active.However,in rare cases or under certain circumstances,we reserve the right to adjust our loyalty program terms,including the expiration of points.We will notify you in advance of any changes to our program",
  },
  {
    id: 4,
    title: "Can I transfer my loyalty points to another account?",
    description:
      "Loyalty points are non-transferable and can only be redeemed by the account holder who earned them.Points cannot be combined or transferred between accounts",
  },
  {
    id: 5,
    title: "How are loyalty points calculated?",
    description:
      "Loyalty Points are typically calculated based on the amount spent on eligible purchases. For example,you might earn one point for every rupee spent.The exact calculation may vary depending on promotions or specific terms of the loyalty program",
  },
];

const BaltraFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center px-4 md:px-8 lg:px-0">
      <div className="text-center space-x-2 md:space-x-4">
        <span className="text-[#000C22] text-xl md:text-4xl lg:text-5xl font-bold font-gothamNarrow">
          FREQUENTLY
        </span>
        <span className="text-[#000C22] text-xl md:text-4xl lg:text-5xl font-bold font-gothamNarrow">
          ASKED
        </span>
        <span className="text-[#F02121] text-xl md:text-4xl lg:text-5xl font-bold font-gothamNarrow">
          QUESTIONS
        </span>
      </div>
      <div className="text-center text-[#494040] text-sm md:text-base lg:text-lg font-normal font-gothamNarrow my-0">
        Get Your Common questions answered
      </div>
      <div className="w-full lg:w-[811px] flex flex-col items-center gap-4 lg:gap-8 py-8">
        {faqData.map((faq, index) => (
          <div
            key={faq.id}
            className={`w-full p-4 rounded-md border-2 border-[#D6E3EA] backdrop-blur-[15px] flex flex-col gap-4 lg:gap-10 ${
              activeIndex === index ? "pb-4 md:pb-6 lg:pb-8" : ""
            }`}
          >
            <div className="flex flex-col justify-center items-start w-full">
              <div className="flex justify-between items-center gap-4 lg:gap-10 w-full">
                <div className="text-[#0D0D0D] text-xl md:text-2xl font-medium">
                  {faq.id < 10 ? `0${faq.id}` : faq.id}
                </div>
                <div className="flex-1 text-[#0D0D0D] text-sm md:text-lg font-gothamNarrow font-semibold">
                  {faq.title}
                </div>
                <div
                  className="ml-auto w-8 h-8 md:w-[86px] md:h-[70px] px-2 md:px-8 py-2 md:py-7 bg-[#D6E3EA] rounded-md backdrop-blur-[15px] flex justify-center items-center cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                >
                  {activeIndex === index ? (
                    <FaMinus className="text-[#0D0D0D]" />
                  ) : (
                    <FaPlus className="text-[#0D0D0D]" />
                  )}
                </div>
              </div>
              {activeIndex === index && (
                <div className="w-full pt-4 pl-4 md:pl-16 pr-2.5 flex justify-start items-start gap-2.5">
                  <div className="w-full text-[#0D0D0D] text-sm md:text-base font-normal leading-6 md:leading-7 font-gothamNarrow">
                    {faq.description}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaltraFAQ;
