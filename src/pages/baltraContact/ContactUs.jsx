import { useState } from "react";
import ContactBg from "../../assets/images/contactBgImg.png";
import MetaData from "../../components/layout/metaData/MetaData";
import TopHeader from "../../components/topHeader/TopHeader";
import BaltraModal from "./BaltraModal";

const ContactUs = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <MetaData
        title="Contact Us | Baltra - Get in Touch"
        description="Have questions or need support? Contact Baltra for inquiries about our home appliances, warranty, and customer service."
        keywords="Baltra Contact, Baltra Support, Customer Service, Warranty, Baltra Nepal, Contact Baltra"
        image="https://www.baltra.com/images/baltraAllProductsBanner.png"
        url="https://www.baltra.com/baltra-contact-us"
        twitterCard="summary_large_image"
        twitterSite="@baltra"
        ogTitle="Contact Us | Baltra"
        ogDescription="Reach out to Baltra for any inquiries or support regarding our products and services."
        ogImage="https://www.baltra.com/images/baltraAllProductsBanner.png"
        ogUrl="https://www.baltra.com/baltra-contact-us"
      />

      <div className="relative w-full min-h-screen bg-[#F6F8FA]">
        {/* Header */}
        <div className="absolute top-0 left-0 w-full z-50">
          <TopHeader />
        </div>

        {/* Background image */}
        <div
          className="absolute inset-0 z-0 transition-opacity duration-500"
          style={{
            backgroundImage: isLoaded ? `url(${ContactBg})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: isLoaded ? 1 : 0,
          }}
        />
        <img
          src={ContactBg}
          alt=""
          className="hidden"
          onLoad={() => setIsLoaded(true)}
        />

        {/* Page content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-24 sm:py-28">
          <BaltraModal />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
