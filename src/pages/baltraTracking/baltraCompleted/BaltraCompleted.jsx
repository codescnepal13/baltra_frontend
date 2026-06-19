// BaltraCompleted.jsx
import BaltraCompletedCard from "./BaltraCompletedCard";

const BaltraCompleted = ({ trackingProducts }) => (
  <div className="px-4 md:px-8 lg:px-16 xl:px-32 py-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 items-stretch">
      {trackingProducts.length > 0 ? (
        trackingProducts.map((item) => (
          <BaltraCompletedCard key={item.id} item={item} />
        ))
      ) : (
        <h2 className="col-span-full text-center font-semibold font-gothamNarrow text-gray-500 py-10">
          No Data Found
        </h2>
      )}
    </div>
  </div>
);

export default BaltraCompleted;
