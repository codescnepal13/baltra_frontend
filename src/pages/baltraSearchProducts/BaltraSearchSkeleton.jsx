
const SkeletonCard = ({ isList }) => (
  <div
    className={`bg-white border border-[#E4E4E4] animate-pulse ${
      isList ? "flex flex-col sm:flex-row" : "flex flex-col"
    }`}
  >
    <div
      className={`bg-gray-200 ${
        isList
          ? "w-full aspect-[4/3] sm:aspect-auto sm:w-[240px] sm:h-[220px] sm:shrink-0"
          : "w-full aspect-square"
      }`}
    />
    <div className="flex-1 p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-5 bg-gray-200 rounded w-1/3" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
      <div className="h-10 bg-gray-200 rounded w-32" />
    </div>
  </div>
);

const BaltraSearchSkeleton = ({ view = "grid" }) => {
  const isList = view === "list";
  return (
    <div
      className={
        isList
          ? "flex flex-col gap-4"
          : "grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
      }
    >
      {Array.from({ length: isList ? 4 : 8 }).map((_, i) => (
        <SkeletonCard key={i} isList={isList} />
      ))}
    </div>
  );
};

export default BaltraSearchSkeleton;
