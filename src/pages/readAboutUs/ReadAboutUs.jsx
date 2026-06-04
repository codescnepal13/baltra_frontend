import MetaData from "../../components/layout/metaData/MetaData";
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
      <MetaData title="Baltra Read AboutUs Page" />
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
