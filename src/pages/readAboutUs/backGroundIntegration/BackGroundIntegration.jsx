import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import BluewareHouseImg from "../../../assets/images/BlueWareHouseImg.png";
import FactoryGlimseTwo from "../../../assets/images/factoryglimps 2.jpeg";
import FactoryGlimpseThree from "../../../assets/images/factoryglimpse 3.jpeg";
import FactoryGlimseFour from "../../../assets/images/factoryglimpse 4.jpeg";
import FactoryGlimse from "../../../assets/images/factoryglimpse.jpeg";
import GeorangeImg from "../../../assets/images/GeoraneImg.png";
import RadioBaltraImg from "../../../assets/images/radioBaltraImg.png";
import SpeakerImg from "../../../assets/images/speakerImg.png";
import WareHouseImg from "../../../assets/images/wareHouseImg.png";

const BackGroundIntegration = () => {
  const images = [
    {
      src: FactoryGlimseTwo,
      alt: "FactoryGlimseTwo",
      width: "180px",
      height: "250px",
      left: "0px",
      top: "0px",
      speed: 0.5,
    },
    {
      src: FactoryGlimpseThree,
      alt: "FactoryGlimpseThree",
      width: "250px",
      height: "230px",
      left: "220px",
      top: "30px",
      speed: 0.6,
    },
    {
      src: FactoryGlimse,
      alt: "FactoryGlimse",
      width: "230px",
      height: "300px",
      left: "520px",
      top: "150px",
      speed: 0.8,
    },
    {
      src: GeorangeImg,
      alt: "GeorangeImg 4",
      width: "230px",
      height: "160px",
      left: "280px",
      top: "280px",
      speed: 0.7,
    },
    {
      src: RadioBaltraImg,
      alt: "RadioBaltraImg 5",
      width: "120px",
      height: "160px",
      left: "760px",
      top: "340px",
      speed: 0.4,
    },
    {
      src: SpeakerImg,
      alt: "SpeakerImg 6",
      width: "180px",
      height: "130px",
      left: "890px",
      top: "340px",
      speed: 0.9,
    },
    {
      src: WareHouseImg,
      alt: "WareHouseImg 7",
      width: "200px",
      height: "230px",
      left: "760px",
      top: "100px",
      speed: 0.5,
    },
    {
      src: BluewareHouseImg,
      alt: "BlueWareHouseImg 8",
      width: "290px",
      height: "300px",
      left: "970px",
      top: "30px",
      speed: 0.7,
    },
    {
      src: FactoryGlimseFour,
      alt: "factoryglimpse 4",
      width: "260px",
      height: "220px",
      left: "0px",
      top: "280px",
      speed: 0.6,
    },
  ];

  const renderDesktopImage = (image, index) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

    useEffect(() => {
      if (inView) controls.start("visible");
    }, [controls, inView]);

    return (
      <motion.img
        key={index}
        ref={ref}
        src={image.src}
        alt={image.alt}
        className="absolute cursor-pointer floating hover-effect"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 100, scale: 0.95 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut", delay: index * 0.2 },
          },
        }}
        style={{
          width: image.width,
          height: image.height,
          left: image.left,
          top: image.top,
          transform: `translateY(${image.speed * window.scrollY}px)`,
        }}
        whileHover={{
          scale: 1.1,
          rotate: 3,
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
        }}
      />
    );
  };

  const renderMobileImage = (image, index) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
      <motion.img
        key={index}
        ref={ref}
        src={image.src}
        alt={image.alt}
        className="w-[85%] max-w-sm rounded-lg object-contain shadow-md"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.12 }}
      />
    );
  };

  return (
    <div className="w-full h-auto flex flex-col justify-start items-center">
      <div className="flex flex-col justify-start items-center gap-2 mb-6">
        <div className="text-center text-neutral-700 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-gothamNarrow">
          Backward Integration
        </div>
        <div className="text-center text-black text-lg md:text-xl lg:text-2xl font-light font-gothamNarrow">
          Glimpse of our factory
        </div>
      </div>

      {/* Large screens: original floating/parallax design with hover */}
      <div className="sticky top-0 hidden md:block w-full h-[100vh] max-w-screen-xl mx-auto px-4 md:px-8 overflow-hidden">
        {images.map((image, index) => renderDesktopImage(image, index))}
      </div>

      {/* Mobile: simple stacked fade-in, no hover/rotate/shadow-on-hover */}
      <div className="flex md:hidden w-full flex-col items-center gap-6 px-4">
        {images.map((image, index) => renderMobileImage(image, index))}
      </div>
    </div>
  );
};

export default BackGroundIntegration;
