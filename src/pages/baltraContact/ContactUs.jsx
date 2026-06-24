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
        title="Contact Baltra Nepal | Showroom, Service Center & Support"
        description="Get in touch with Baltra Nepal for product inquiries, warranty claims, and service support. Find our Kathmandu showroom address, phone number, and dealer locations across Nepal."
        keywords="Baltra Nepal contact, Baltra Nepal customer service, Baltra showroom Kathmandu, Baltra service center Nepal, Baltra dealer Nepal, Baltra warranty claim Nepal, Baltra phone number Nepal"
        image="https://np.baltra.in/images/baltraAllProductsBanner.png"
        url="https://np.baltra.in/baltra-contact-us"
        ogTitle="Contact Baltra Nepal | Showroom, Service Center & Support"
        ogDescription="Reach Baltra Nepal for inquiries, warranty support, and service center locations. We're here to help across Kathmandu and Nepal."
        ogImage="https://np.baltra.in/images/baltraAllProductsBanner.png"
        ogUrl="https://np.baltra.in/baltra-contact-us"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Contact Us", url: "/baltra-contact-us" },
        ]}
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
