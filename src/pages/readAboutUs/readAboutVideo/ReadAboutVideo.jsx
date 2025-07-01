import React, { useRef } from "react";
import ReadAboutVideoSrc from "../../../assets/videos/ReadAboutVideo.mp4";

const ReadAboutVideo = () => {
  const videoRef = useRef(null);

  const toggleFullScreen = () => {
    const videoElement = videoRef.current;

    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      /* Firefox */
      videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
      /* IE/Edge */
      videoElement.msRequestFullscreen();
    }
  };

  return (
    <div className="relative px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <video
        ref={videoRef}
        className="w-full h-auto max-h-[75vh] object-cover"
        autoPlay
        muted
        playsInline
        preload="metadata"
        controls
        onClick={toggleFullScreen}
      >
        <source src={ReadAboutVideoSrc} type="video/mp4" />
        <source
          src={ReadAboutVideoSrc.replace(".mp4", ".webm")}
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default ReadAboutVideo;
