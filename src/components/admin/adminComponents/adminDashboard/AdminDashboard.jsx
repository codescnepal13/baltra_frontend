import DashboardGrid from "./dashboardGrid/DashboardGrid";

const AdminDashboard = () => {
  return (
    <>
      <div className="flex flex-col gap-4 mt-4 px-2">
        <DashboardGrid />
      </div>
    </>
  );
};

export default AdminDashboard;
