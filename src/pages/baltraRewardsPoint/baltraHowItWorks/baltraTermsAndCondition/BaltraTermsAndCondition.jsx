import React from "react";
import termsConditionImg from "../../../../assets/images/termsConditionImg.png";
import MetaData from "../../../../components/layout/metaData/MetaData";

const BaltraTermsAndCondition = () => {
  return (
    <>
      <MetaData
        title="Terms and Conditions | Baltra - Kitchen & Home Appliances"
        description="Read the terms and conditions for using Baltra’s website, products, and services. Understand your rights, responsibilities, warranties, return policies, and limitations."
        keywords="Baltra Terms and Conditions, User Agreement, Baltra Policies, Return Policy, Warranty Policy, Legal Terms, Appliance Warranty, Terms of Use, Privacy Terms, Baltra Website Terms"
        image="https://www.baltra.com/images/baltraAllProductsBanner.png"
        url="https://www.baltra.com/baltra-term-of-use"
        twitterCard="summary_large_image"
        twitterSite="@baltra"
        ogTitle="Terms and Conditions | Baltra Appliances"
        ogDescription="Stay informed with Baltra’s terms of service. Learn about your rights, our policies on returns, warranties, and the responsible use of our website and appliances."
        ogImage="https://www.baltra.com/images/baltraAllProductsBanner.png"
        ogUrl="https://www.baltra.com/baltra-term-of-use"
      />

      <div className="bg-[#ffffff] px-4 md:px-6 lg:px-8 mt-8 lg:mt-16">
        <div className="text-center space-x-1 sm:space-x-2 md:space-x-4">
          <span className="text-[#F02121] text-xl sm:text-4xl md:text-5xl font-bold font-gothamNarrow">
            TERMS
          </span>
          <span className="text-[#000C22] text-xl sm:text-4xl md:text-5xl font-bold font-gothamNarrow">
            AND
          </span>
          <span className="text-[#F02121] text-xl sm:text-4xl md:text-5xl font-bold font-gothamNarrow">
            CONDITIONS
          </span>
        </div>
        <div className="text-center text-[#494040] text-sm sm:text-base md:text-lg font-normal font-gothamNarrow">
          Get reward for searching, shopping, and more
        </div>
        <div className="flex flex-col lg:flex-row items-center w-full my-5 sm:my-0">
          <div className="flex flex-col items-center lg:items-start lg:w-1/2 gap-4 px-2 sm:px-4 md:px-6 lg:px-8">
            {[
              {
                title: "1. Eligibility",
                description:
                  "Only products purchased from the Baltra Retail Outlet located in Teku are eligible for registration for loyalty points and redemption.",
              },
              {
                title: "2. Utilization",
                description:
                  "Upon reaching the threshold, users can utilize their points to purchase warranty directly from the website/app.",
              },
              {
                title: "3. Redeem",
                description:
                  "If users opt not to purchase additional warranty, they must visit the Baltra retail outlet in Teku to redeem their points.",
              },
              {
                title: "Offers",
                description:
                  "Point redemption offers are subject to the discretion of the company and will be determined solely by the company.",
              },
              {
                title: "Point Balance",
                description:
                  "Users are not permitted to redeem the entire point balance. A certain portion of points will remain in the user's account and will not be nullified.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-start gap-2 p-3 sm:p-4 bg-[rgba(235,229,229,0.4)] w-full rounded-md"
              >
                <div className="text-[#303A42] text-base sm:text-lg md:text-lg font-semibold font-gothamNarrow">
                  {item.title}
                </div>
                <div className="text-[rgba(0,0,0,0.6)] text-sm sm:text-sm md:text-base font-gothamNarrow leading-5 sm:leading-6">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center lg:w-1/2">
            <img
              className="max-w-full max-h-full"
              src={termsConditionImg}
              alt="termsConditionImg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BaltraTermsAndCondition;
