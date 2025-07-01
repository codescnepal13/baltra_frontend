const DashboardSkeleton = () => {
  return (
    <>
      <div className="animate-pulse bg-gray-300 rounded-sm p-4 border border-gray-200">
        <div className="h-12 w-12 rounded-full bg-gray-400"></div>
        <div className="pl-4">
          <div className="h-4 bg-gray-400 w-3/4 rounded mb-2"></div>
          <div className="h-4 bg-gray-400 w-1/2 rounded"></div>
        </div>
      </div>
    </>
  );
};

export default DashboardSkeleton;
