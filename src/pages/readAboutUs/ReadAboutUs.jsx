import MetaData from "../../components/layout/metaData/MetaData";
import AboutSchema from "../../components/layout/siteSchema/AboutSchema";
import BackGroundIntegration from "./backGroundIntegration/BackGroundIntegration";
import BaltraFamily from "./baltraFamily/BaltraFamily";
import BaltraPhilosophy from "./baltraPhilosophy/BaltraPhilosophy";
import ExploreOurRange from "./exploreOurRange/ExploreOurRange";
import ReadAboutBanner from "./readAboutBanner/ReadAboutBanner";
import ReadAboutParagraphBelow from "./readAboutParagraphBelow/ReadAboutParagraphBelow";
import ReadAboutTitle from "./readAboutTitle/ReadAboutTitle";
import ReadAboutVideo from "./readAboutVideo/ReadAboutVideo";

const ReadAboutUs = () => {
  return (
    <>
      <MetaData
        title="About Baltra Nepal | Nepal's Original Home Appliance Brand Since 1994"
        description="Learn about Baltra Nepal — the country's original home appliance brand, founded in 1994. Discover our journey, milestones, core values, and commitment to quality across Nepal."
        keywords="About Baltra Nepal, Baltra history, Baltra since 1994, Baltra Nepal company, Baltra milestones, Baltra core values, Nepali home appliance brand, Baltra company profile"
        image="https://np.baltra.in/images/baltraAllProductsBanner.png"
        url="https://np.baltra.in/about-us"
        ogTitle="About Baltra Nepal | Our Story Since 1994"
        ogDescription="Discover Baltra Nepal's journey from 1994 to today — our milestones, values, and commitment to quality home appliances across Nepal."
        ogImage="https://np.baltra.in/images/baltraAllProductsBanner.png"
        ogUrl="https://np.baltra.in/about-us"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "About Us", url: "/baltra-readAboutUS" },
        ]}
      />
      <AboutSchema />
      <ReadAboutBanner />
      <ReadAboutTitle />
      <ReadAboutVideo />
      <ReadAboutParagraphBelow />
      <ExploreOurRange />
      <BaltraFamily />
      <BaltraPhilosophy />
      <BackGroundIntegration />
    </>
  );
};

export default ReadAboutUs;
