import React from "react";
import DashboardGrid from "./dashboardGrid/DashboardGrid";

const AdminDashboard = () => {
  return (
    <>
      <div className="flex flex-col gap-4 mt-4 px-4">
        <DashboardGrid />
      </div>
    </>
  );
};

export default AdminDashboard;
