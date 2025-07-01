import React from "react";
import ReadAboutBanner from "./readAboutBanner/ReadAboutBanner";
import ReadAboutTitle from "./readAboutTitle/ReadAboutTitle";
import ReadAboutParagraphBelow from "./readAboutParagraphBelow/ReadAboutParagraphBelow";
import ExploreOurRange from "./exploreOurRange/ExploreOurRange";
import ReadAboutVideo from "./readAboutVideo/ReadAboutVideo";
import BaltraPhilosophy from "./baltraPhilosophy/BaltraPhilosophy";
import BackGroundIntegration from "./backGroundIntegration/BackGroundIntegration";
import BaltraFamily from "./baltraFamily/BaltraFamily";
import MetaData from "../../components/layout/metaData/MetaData";

const ReadAboutUs = () => {
  return (
    <>
      <MetaData title="Baltra Read AboutUs Page" />
      <ReadAboutBanner />
      <ReadAboutTitle />
      <ReadAboutVideo />
      <ReadAboutParagraphBelow />
      <ExploreOurRange />
      <BaltraPhilosophy />
      <BackGroundIntegration />
      <BaltraFamily />
    </>
  );
};

export default ReadAboutUs;
