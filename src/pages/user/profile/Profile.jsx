import React from "react";
import ProfileInformation from "./profileInformation/ProfileInformation";
import ProfileBanner from "./profileBanner/ProfileBanner";
import MetaData from "../../../components/layout/metaData/MetaData";

const Profile = () => {
  return (
    <>
      <MetaData title="Baltra profile Information" />
      <ProfileBanner />
      <ProfileInformation />
    </>
  );
};

export default Profile;
