import { useEffect, useRef, useState } from "react";
import MileStoneImg from "../../../assets/images/MileStoneImage.png";
import TimeLine from "./TimeLine";

const OurMileStone = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // animate once
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="milestone-heading"
      className="relative w-full min-h-screen bg-[#F6F8FA] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Image with overlay for readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url(${MileStoneImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Subtle dark overlay so text stays legible on any image */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Heading Block */}
      <div
        className={`
          relative z-20 text-center mx-auto
          px-4 sm:px-8
          mt-16 mb-8 sm:mt-20 sm:mb-10 lg:mt-24 lg:mb-12
          max-w-3xl
          transition-all duration-700 ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        <h2
          id="milestone-heading"
          className="
            text-[#202D31] font-bold font-gothamNarrow
            text-3xl sm:text-4xl lg:text-5xl xl:text-6xl
            mb-3 sm:mb-4
            leading-tight tracking-tight
          "
        >
          Our Milestone
        </h2>

        <p
          className={`
            text-[#1a1a1a] font-normal font-gothamNarrow
            text-base sm:text-lg lg:text-xl xl:text-2xl
            leading-relaxed tracking-wide
            transition-all duration-700 delay-150 ease-out
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          Charting Our Progress: Achieving Significant Milestones on Our Journey
        </p>
      </div>

      {/* Timeline Block */}
      <div
        className={`
          relative z-20 w-full
          px-2 sm:px-4 lg:px-8
          pb-12 sm:pb-16 lg:pb-20
          lg:mt-16 xl:mt-20
          transition-all duration-700 delay-300 ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        <div className="flex justify-center w-full">
          <div className="overflow-hidden w-full max-w-7xl">
            <TimeLine />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMileStone;
