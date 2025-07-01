import React from "react";
import MetaData from "../../components/layout/metaData/MetaData";
import AboutUS from "../aboutUS/AboutUS";
import ArtOfComfort from "../aboutUS/artOfComfort/ArtOfComfort";
import BaltraDistributor from "../aboutUS/baltraDistributor/BaltraDistributor";
import BaltraCompetenCies from "../aboutUS/competenCies/BaltraCompetenCies";
import OurMileStone from "../aboutUS/ourMileStone/OurMileStone";
import ServicePromises from "../aboutUS/servicePromises/ServicePromises";

const Home = () => {
  return (
    <>
      <MetaData
        title="Home | Baltra - Quality Kitchen Appliances"
        description="Discover Baltra's journey in providing top-quality kitchen appliances, our milestones, core values, and our commitment to excellence in every product we offer."
        keywords="Baltra, Home Appliances, Kitchen Appliances, Baltra Products, Quality Appliances, Milestones, Company History, Customer Commitment, Home Cooking"
        image="https://www.baltra.com/images/baltraAllProductsBanner.png"
        url="https://www.baltra.com/"
        twitterCard="summary_large_image"
        twitterSite="@baltra"
        ogTitle="Home | Baltra"
        ogDescription="Explore Baltra's rich history and commitment to providing the best kitchen appliances to enhance your cooking experience."
        ogImage="https://www.baltra.com/images/baltraAllProductsBanner.png"
        ogUrl="https://www.baltra.com/"
      />
      <AboutUS />
      <ArtOfComfort />
      <OurMileStone />
      <BaltraCompetenCies />
      <BaltraDistributor />
      <ServicePromises />
    </>
  );
};

export default Home;
