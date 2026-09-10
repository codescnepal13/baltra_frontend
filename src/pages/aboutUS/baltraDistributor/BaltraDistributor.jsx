import NepalMapImg from "../../../assets/images/NepalLogo.png";

const BaltraDistributor = () => {
  return (
    <div className="w-full bg-white max-w-full h-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 my-8 sm:my-16 md:my-20">
      <div className="relative w-full h-auto max-w-full overflow-x-auto">
        <img
          className="w-full h-auto object-cover"
          src={NepalMapImg}
          alt="Distributors"
        />
      </div>
    </div>
  );
};

export default BaltraDistributor;
