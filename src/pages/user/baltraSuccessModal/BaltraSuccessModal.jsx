import SuccessImg from "../../../assets/images/SuccessImg.png";
import userAuthImg from "../../../assets/images/userAuthImg.png";

const BaltraSuccessModal = () => {
  const handleSubmit = () => {};
  return (
    <div className="relative w-full h-screen bg-white flex justify-center items-center">
      <img
        className="absolute top-0 left-0 w-full h-full blur-[1px]"
        src={userAuthImg}
        alt="Background"
      />
      <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl px-4 sm:px-8 pb-4 bg-white rounded-sm shadow-sm">
        <form
          className="flex flex-col justify-center items-center w-full"
          onSubmit={handleSubmit}
        >
          <img
            className="w-3/4 max-w-sm h-auto mb-4"
            src={SuccessImg}
            alt="SuccessImg"
          />
          <div className="text-center">
            <div className="text-zinc-800 text-2xl font-bold font-gothamNarrow">
              Successfully Signed up!
            </div>
            <div className="text-zinc-800 text-lg font-normal font-gothamNarrow my-2">
              You have been successfully signed in
            </div>
          </div>
          <div className="w-full px-2 my-4">
            <button
              type="submit"
              className="w-full font-gothamNarrow py-4 bg-red-600 hover:bg-red-700 text-white text-base font-normal rounded-sm"
            >
              Explore Baltra
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BaltraSuccessModal;
