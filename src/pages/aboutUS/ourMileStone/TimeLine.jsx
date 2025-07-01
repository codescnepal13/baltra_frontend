import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const TimeLine = () => {
  const timelineRef = useRef(null);
  const scrollRef = useRef(null);
  const [timelineWidth, setTimelineWidth] = useState(0);

  const sharedX = useMotionValue(0);

  const invertedX = useTransform(sharedX, (x) => -x);

  useEffect(() => {
    const updateDimensions = () => {
      if (timelineRef.current && scrollRef.current) {
        const timelineElement = timelineRef.current;
        const scrollElement = scrollRef.current;

        setTimelineWidth(
          timelineElement.scrollWidth - timelineElement.offsetWidth / 2
        );
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <>
      {/* Timeline container */}
      <div className="font-gothamNarrow w-full min-h-[288px] px-4 sm:px-8 lg:px-24 overflow-hidden">
        <motion.div
          ref={scrollRef}
          style={{ x: invertedX }}
          whileTap={{ cursor: "grabbing" }}
          className="flex flex-col sm:flex-row gap-y-8 lg:gap-x-16"
        >
          {/* Year 1994 */}
          <div className="flex flex-col items-start gap-2 min-w-[400px]">
            <div className="text-center text-[#F02323] text-2xl sm:text-3xl lg:text-4xl font-bold">
              1994
            </div>
            <div className="text-[#363232] text-base sm:text-base lg:text-lg font-normal">
              1994: Our story began in Kathmandu with a humble collection of
              glass cups, a mixer grinder.
            </div>
          </div>
          {/* Year 1997 */}
          <div className="flex flex-col items-start gap-2 min-w-[400px]">
            <div className="text-center text-[#F02323] text-2xl sm:text-3xl lg:text-4xl font-bold">
              1997
            </div>
            <div className="text-[#363232] text-base sm:text-base lg:text-lg font-normal">
              BALTRA's reach extended to major cities across Nepal, marking the
              beginning of our widespread presence.
            </div>
          </div>
          {/* Year 1999 */}
          <div className="flex flex-col items-start gap-2 min-w-[400px]">
            <div className="text-center text-[#F02323] text-2xl sm:text-3xl lg:text-4xl font-bold">
              1999
            </div>
            <div className="text-[#363232] text-base sm:text-base lg:text-lg font-normal">
              We introduced gold cups and platters, adding a touch of
              sophistication to our product line.
            </div>
          </div>
          {/* year 2001 */}
          <div className="flex flex-col items-start gap-2 min-w-[400px]">
            <div className="text-center text-[#F02323] text-2xl sm:text-3xl lg:text-4xl font-bold">
              2001
            </div>
            <div className="text-[#363232] text-base sm:text-base lg:text-lg font-normal">
              With 500 retailers and 23 distributors,network explained,bringing
              our products closer to customers.
            </div>
          </div>
          {/* year 2005 */}
          <div className="flex flex-col items-start gap-2 min-w-[400px]">
            <div className="text-center text-[#F02323] text-2xl sm:text-3xl lg:text-4xl font-bold">
              2005
            </div>
            <div className="text-[#363232] text-base sm:text-base lg:text-lg font-normal">
              Gas geysers, Oven toasters, and sandwich makers were added to our
              portfolio, catering to various household needs.
            </div>
          </div>
          {/* year 2013 */}
          <div className="flex flex-col items-start gap-2 min-w-[400px]">
            <div className="text-center text-[#F02323] text-2xl sm:text-3xl lg:text-4xl font-bold">
              2013
            </div>
            <div className="text-[#363232] text-base sm:text-base lg:text-lg font-normal">
              BALTRA became a registered brand in more than 40 countries
              worldwide, solidifying our international presence.
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 min-w-[400px]">
            <div className="text-center text-[#F02323] text-2xl sm:text-3xl lg:text-4xl font-bold">
              2017
            </div>
            <div className="text-[#363232] text-base sm:text-base lg:text-lg font-normal">
              We began exporting our range of products to Asian countries,
              establishing ourselves as a global player.
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 min-w-[400px]">
            <div className="text-center text-[#F02323] text-2xl sm:text-3xl lg:text-4xl font-bold">
              2018
            </div>
            <div className="text-[#363232] text-base sm:text-base lg:text-lg font-normal">
              Participation in the World's Largest Canton Fair in China
              showcased our commitment to innovation and quality, introducing
              big home appliances to the market.
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 min-w-[400px]">
            <div className="text-center text-[#F02323] text-2xl sm:text-3xl lg:text-4xl font-bold">
              2023
            </div>
            <div className="text-[#363232] text-base sm:text-base lg:text-lg font-normal">
              We proudly celebrated 25 years of successful operations in Nepal,
              a testament to our enduring commitment to excellence.
            </div>
          </div>
        </motion.div>
      </div>
      {/* Rounded scroll */}
      <div className="relative hidden sm:flex items-center w-full px-4 sm:px-8 lg:px-24 mt-8">
        <motion.div
          ref={timelineRef}
          className="flex items-center justify-center w-8 h-8 bg-white rounded-full border-4 border-[#F02323] relative"
          drag="x"
          dragConstraints={{ left: 0, right: 1150 }} // Set constraints
          style={{ x: -sharedX }} // Sync with the scroll handle
          whileTap={{ cursor: "grabbing" }}
          onDrag={(event, info) => {
            // Update sharedX directly based on drag distance
            sharedX.set(info.point.x * 2.5);
          }}
          onDragEnd={(event, info) => {
            // Optional: You can snap or constrain the position here if needed
          }}
        >
          <div className="w-4 h-4 bg-[#F02323] rounded-full absolute"></div>
        </motion.div>
        <div className="flex-grow border-t-4 border-dotted border-[#8B8686]"></div>
        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-8 lg:border-l-10 border-l-[#8B8686] border-b-8 border-b-transparent"></div>
      </div>
    </>
  );
};

export default TimeLine;
