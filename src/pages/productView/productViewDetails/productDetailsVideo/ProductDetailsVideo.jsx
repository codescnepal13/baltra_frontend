import { useEffect, useRef } from "react";

const ProductDetailsVideo = ({ singleProduct }) => {
  const videoRef = useRef(null);

  const toggleFullScreen = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
      videoElement.msRequestFullscreen();
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play();
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(videoElement);

    return () => {
      observer.unobserve(videoElement);
    };
  }, []);

  if (!singleProduct?.product_video) return null;

  return (
    <div className="w-full h-96 md:h-[30rem] rounded-lg overflow-hidden border border-gray-200 shadow-sm py-2">
      <video
        ref={videoRef}
        src={singleProduct?.product_video}
        className="w-full h-full object-cover"
        controls
        onClick={toggleFullScreen}
      />
    </div>
  );
};

export default ProductDetailsVideo;
