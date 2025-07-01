import React, { useRef } from "react";
const ProductDetailsVideo = ({ singleProduct }) => {
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
    <>
      <div className="relative">
        <video
          ref={videoRef}
          src={singleProduct?.product_video}
          className="w-full h-full object-cover"
          autoPlay
          controls
          onClick={toggleFullScreen}
        />
      </div>
    </>
  );
};

export default ProductDetailsVideo;
