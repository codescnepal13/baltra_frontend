import React from "react";
import MetaData from "../metaData/MetaData";
import TermsAndConditionImg from "../../../assets/images/terms&ConditionsImg.png";

const TermsAndConditions = () => {
  return (
    <>
      <MetaData title="Baltra-Terms And Conditions" />
      <div className="flex flex-col md:flex-row items-start justify-between px-4 sm:px-8 md:px-12 lg:px-24 py-8 font-gothamNarrow min-h-screen bg-white">
        {/* Content Section */}
        <div className="md:w-2/3 lg:w-3/5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Terms and Conditions
          </h1>
          <p className="mb-4">
            Welcome to Baltra. These terms and conditions outline the rules and
            regulations for using our website and engaging with our services.
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            Introduction
          </h2>
          <p className="mb-4">
            By accessing this website, you agree to accept these terms and
            conditions in full. If you do not agree with any part of these
            terms, please do not use our website.
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            Products and Services
          </h2>
          <p className="mb-4">
            Baltra offers a variety of home appliances designed to enhance your
            lifestyle. We strive to ensure the highest quality of our products;
            however, slight variations may occur.
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            Account Registration
          </h2>
          <p className="mb-4">
            To access certain features of our website, such as product
            registration and loyalty points, you may need to create an account.
            You agree to provide accurate and complete information during
            registration and to update such information as necessary.
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Payments</h2>
          <p className="mb-4">
            While we currently do not offer direct order placements, any
            transactions related to product warranty purchases, or other
            services will be processed using secure payment methods available on
            our platform. All prices are listed in NPR.
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            Returns and Refunds
          </h2>
          <p className="mb-4">
            If you are not satisfied with your purchase, please visit our outlet
            in Teku with receipt to request a return or exchange. Items must be
            in their original condition for a full refund or exchange. Return
            shipping costs are the responsibility of the customer.
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            Privacy Policy
          </h2>
          <p className="mb-4">
            We are committed to protecting your privacy. Any personal
            information you provide will be used in accordance with our Privacy
            Policy
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            Intellectual Property
          </h2>
          <p className="mb-4">
            All content on this website, including but not limited to text,
            graphics, logos, and images, is the property of Baltra or its
            content suppliers and is protected by international copyright laws.
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            Governing Law
          </h2>
          <p className="mb-4">
            These terms and conditions are governed by and construed in
            accordance with the laws of Nepal. You irrevocably submit to the
            exclusive jurisdiction of the courts in that state or location.
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            Changes to Terms and Conditions
          </h2>
          <p className="mb-4">
            We reserve the right to revise these terms and conditions at any
            time. By continuing to use this website, you agree to be bound by
            the current version of these terms and conditions.
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms and Conditions, please
            contact us at:
          </p>
          <div className="space-y-1">
            <p className="text-lg font-bold">
              Phone: <span className="font-normal">+977-15970088</span>
            </p>
            <p className="text-lg font-bold">
              Email: <span className="font-normal">info@balajeenp.com</span>
            </p>
          </div>

          <p className="mb-4 pt-4">
            Thank you for choosing Baltra. We look forward to serving you!
          </p>
        </div>

        {/* Image Section */}
        <div className="md:w-1/3 lg:w-2/5 mt-8 md:mt-0 md:pl-8 flex justify-center animate-moveUpDown">
          <img
            src={TermsAndConditionImg}
            alt="Terms and Conditions"
            className="w-full h-auto object-cover rounded-sm shadow-sm"
          />
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
