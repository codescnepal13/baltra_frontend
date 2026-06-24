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
        title="Baltra Nepal | Home Appliances Since 1994"
        description="Baltra is Nepal's original home appliance brand, trusted since 1994. Explore our milestones, distributors, and commitment to quality kitchen and home appliances across Nepal."
        keywords="Baltra Nepal, Baltra home appliances Nepal, Baltra price in Nepal, Baltra distributor Nepal, Baltra showroom Kathmandu, Baltra since 1994, Nepali home appliance brand"
        image="https://np.baltra.in/images/baltraAllProductsBanner.png"
        url="https://np.baltra.in/"
        ogTitle="Baltra Nepal | Home Appliances Since 1994"
        ogDescription="Discover Baltra Nepal's journey since 1994, our milestones, and our commitment to quality home and kitchen appliances across Nepal."
        ogImage="https://np.baltra.in/images/baltraAllProductsBanner.png"
        ogUrl="https://np.baltra.in/"
        breadcrumbs={[{ name: "Home", url: "/" }]}
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
