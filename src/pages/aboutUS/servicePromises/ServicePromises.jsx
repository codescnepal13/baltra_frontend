import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import RepairServiceImg from "../../../assets/images/RepairServicesImg.png";
import RobustService from "../../../assets/images/RobustInvestoryImg.png";
import ServiceCenter from "../../../assets/images/serviceCenterImg.png";
import WorldClassService from "../../../assets/images/worldClassImg.png";

const ServicePromises = () => {
  const services = [
    {
      src: WorldClassService,
      title: "World Class Services",
      description:
        "At BALTRA, we are dedicated to delivering world-class service and trusted advice for all your home and kitchen appliance and trusted advice for all your home and kitchen appliance needs. From your first interaction with us, expect exceptional support and expertise that goes above and beyond.",
    },
    {
      src: ServiceCenter,
      title: "Service Centers and Technicians",
      description:
        "At BALTRA, we ensure quick support through our central service center in Teku, Kathmandu, and 55 distributor points across the valley. With 44 expert technicians, we provide fast and reliable repairs, typically within 2-3 days. Trust BALTRA for prompt, efficient service!",
    },
    {
      src: RepairServiceImg,
      title: "Repair Services",
      description:
        "We prioritize the quality of our products and offer quick repair services for any warranty-covered issues.Our skilled technicians aim to complete repairs within 2-3 days, ensuring fast turnaround and restoring your appliance to peak condition",
    },
    {
      src: RobustService,
      title: "Robust Inventory",
      description:
        "At BALTRA, our well-managed, automated inventory ensures quick access to spare parts and accessories. Visit our Teku service center in Kathmandu for seamless support and timely repairs.We prioritize efficiency to get your appliances running We prioritize efficiency to get your appliances running smoothly again",
    },
  ];

  return (
    <div className="text-black mt-8 p-4 bg-[#f3f4f5] backdrop-blur-3xl shadow-black">
      <div className="text-center mb-8">
        <h1 className="text-[#202D31] text-3xl sm:text-4xl lg:text-5xl font-bold">
          Our Service Promises
        </h1>
        <p className="text-[#000000] text-lg sm:text-xl md:text-2xl font-normal font-gothamNarrow tracking-normal pt-2 text-center">
          Service Promises: Our Commitment to Excellence
        </p>
      </div>
      <VerticalTimeline className="text-black">
        {services.map((service, index) => (
          <VerticalTimelineElement
            key={`service-${index}`}
            contentStyle={{ background: "white", color: "black" }}
            contentArrowStyle={{ borderRight: "7px solid #FF0000" }}
            iconStyle={{
              background: "#FF0000",
              color: "black",
              width: "30px",
              height: "30px",
              lineHeight: "20px",
              marginLeft: "-14px",
              marginTop: "14px",
            }}
          >
            <div className="overflow-hidden mb-2">
              <div className="flex justify-center mb-2">
                <img
                  src={service.src}
                  alt={service.title}
                  className="w-1/2 object-cover"
                />
              </div>
              <h3 className="text-black text-2xl font-bold font-gothamNarrow">
                {service.title}
              </h3>
              <p
                className="text-black text-lg font-semibold font-gothamNarrow"
                style={{ margin: 0 }}
              >
                {service.description}
              </p>
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default ServicePromises;
