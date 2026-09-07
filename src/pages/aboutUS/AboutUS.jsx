import { Link } from "react-router-dom";
import BaltraImg from "../../assets/images/BaltraBanner.png";
import MetaData from "../../components/layout/metaData/MetaData";
import TopHeader from "../../components/topHeader/TopHeader";

const AboutUS = () => {
  return (
    <>
      <MetaData
        title="About Us | Baltra - Leading Kitchen & Home Appliances"
        description="Learn about Baltra, a trusted brand in home and kitchen appliances. Discover our history, milestones, values, and commitment to providing high-quality, energy-efficient products."
        keywords="Baltra, About Baltra, Kitchen Appliances, Home Appliances, Baltra History, Baltra Milestones, Energy Efficient Appliances, Baltra Brand, Best Home Appliances"
        image="https://www.baltra.com/images/baltraAllProductsBanner.png"
        url="https://www.baltra.com/baltra-aboutUs-Page"
        twitterCard="summary_large_image"
        twitterSite="@baltra"
        ogTitle="About Us | Baltra"
        ogDescription="Discover Baltra's journey in revolutionizing kitchen and home appliances with cutting-edge technology and a commitment to quality."
        ogImage="https://www.baltra.com/images/baltraAllProductsBanner.png"
        ogUrl="https://www.baltra.com/baltra-aboutUs-Page"
      />
      <div className="relative w-full h-auto min-h-[50vh] md:h-screen">
        {/* Image clipped ONLY within this wrapper. TopHeader is rendered
            as a sibling OUTSIDE this overflow-hidden box, so its `fixed`
            bottom nav is never bound/clipped to this section's box on
            scroll — while still visually floating over the banner. */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={BaltraImg}
            alt="Baltra Banner"
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ maxWidth: "none" }}
            loading="lazy"
          />
        </div>

        <div className="absolute top-0 left-0 w-full z-10">
          <TopHeader />
        </div>

        <div className="absolute inset-0 flex items-center justify-center md:translate-y-40">
          <div className="inline-flex items-center justify-center mt-40 lg:mt-14 px-8 py-2 bg-[#FCFCFC] hover:bg-gray-50 rounded-md">
            <Link
              to="/baltra-allProducts"
              className="font-gothamNarrow text-[#323334] text-sm font-medium tracking-wider"
            >
              View Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUS;
