import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandImg1 from "../../assets/images/LandImg1.png";
import LandImg2 from "../../assets/images/LandImg2.png";
import LandImg3 from "../../assets/images/LandImg3.png";
import InfoLayoutModal from "../../components/layout/infoLayout/InfoLayoutModal";
import "./LandingPage.css";

const BaltraLandingPage = () => {
  const [animateText, setAnimateText] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);
  const [hideComponent, setHideComponent] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  const textRef = useRef(null);
  const contentRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (confirmed) {
      setShowModal(false);
    }
  }, [confirmed]);

  useEffect(() => {
    const textObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateText(true);
          textObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const contentObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateContent(true);
          contentObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      textObserver.observe(textRef.current);
    }
    if (contentRef.current) {
      contentObserver.observe(contentRef.current);
    }

    return () => {
      if (textRef.current) {
        textObserver.unobserve(textRef.current);
      }
      if (contentRef.current) {
        contentObserver.unobserve(contentRef.current);
      }
    };
  }, []);

  const handleGoToHomepage = () => {
    if (confirmed) {
      setHideComponent(true);
      setTimeout(() => {
        navigate("/baltra-aboutUs-Page");
      }, 1000);
    } else {
      alert("Please confirm your choice before proceeding.");
    }
  };

  return (
    <>
      <div
        className={`w-full h-auto min-h-screen bg-gradient-to-b from-[#DA1F1F] to-[#940E0E] flex flex-col items-center justify-center transform transition-all duration-1000 ease-in-out ${
          hideComponent ? "scroll-up" : ""
        }`}
      >
        <div
          ref={textRef}
          className={`flex flex-col items-center justify-center min-h-[70vh] transition-opacity duration-1000 ease-in-out ${
            animateText ? "animate-scroll" : "opacity-0 translate-y-10"
          }`}
        >
          <h1
            className={`text-center text-white text-[60px] sm:text-[100px] font-gothamNarrow font-semibold tracking-wide leading-tight uppercase transform transition-all duration-1000 ease-out ${
              animateText
                ? "translate-y-0 opacity-100"
                : "translate-y-[100%] opacity-0"
            }`}
            style={{
              textShadow:
                "0px 13px 4px rgba(0, 0, 0, 0.25), 8px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            Welcome to Baltra
          </h1>
        </div>

        <div
          ref={contentRef}
          className={`mt-0 w-full max-w-3xl flex flex-col justify-start items-center transition-opacity duration-1000 ease-in-out ${
            animateContent ? "animate-scroll" : "opacity-0 translate-y-10"
          }`}
          style={{
            transform: animateContent ? "translateY(-20px)" : "translateY(20%)",
            transition:
              "transform 1s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 1s ease-in-out",
          }}
        >
          <div className="w-full text-center text-white text-3xl sm:text-5xl font-semibold font-gothamNarrow break-words">
            Step into the Future of Home Appliances: Explore in 3D
          </div>
          <div className="text-center text-gray-300 text-sm font-gothamNarrow break-words mt-2">
            Visualize, Interact, Understand: Experience home appliances like
            never before. Join us on this journey and discover innovative
            designs that elevate your home experience.
          </div>
          <div className="text-center text-gray-300 text-sm font-gothamNarrow break-words mt-4">
            Our cutting-edge technology and stylish designs are tailored to fit
            your lifestyle. Whether you're cooking, cleaning, or simply enjoying
            your home, Baltra has the perfect solution for you.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <img
            className="w-[100px] sm:w-[118px] h-auto transform -rotate-[5deg] origin-top-left"
            src={LandImg3}
            alt="LandImg3"
            loading="lazy"
          />
          <img
            className="w-[150px] sm:w-56 h-auto"
            src={LandImg2}
            alt="LandImg2"
            loading="lazy"
          />
          <img
            className="w-[130px] sm:w-[164px] h-auto"
            src={LandImg1}
            alt="LandImg1"
            loading="lazy"
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center p-8 my-8">
          <button
            onClick={handleGoToHomepage}
            className="w-full text-center text-white font-semibold text-2xl sm:text-4xl font-gothamNarrow break-words"
            style={{
              textShadow:
                "0px 13px 4px rgba(0, 0, 0, 0.25), 8px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            GO TO HOMEPAGE
          </button>
        </div>
      </div>

      {showModal && <InfoLayoutModal setConfirmed={setConfirmed} />}
    </>
  );
};

export default BaltraLandingPage;
