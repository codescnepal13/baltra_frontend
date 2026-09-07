import { Outlet } from "react-router-dom";
import TopHeader from "../topHeader/TopHeader";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header sits at z-30 — above page content, below sidebar/modals */}
      <header className="relative z-30 w-full">
        <TopHeader />
      </header>

      {/* pb-20 reserves space so page content never sits under the
          fixed mobile bottom nav. lg:pb-0 removes it on desktop,
          where the bottom nav is hidden anyway. */}
      <main className="flex-1 pb-20 lg:pb-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
