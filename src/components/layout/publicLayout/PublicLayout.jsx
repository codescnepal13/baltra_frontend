import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../footer/Footer";
import TopHeader from "../../topHeader/TopHeader";

// Routes that open with a full-bleed hero image/banner — header
// should start transparent and float over them.
const HERO_ROUTES = ["/", "/baltra-aboutUs-Page"];

const PublicLayout = () => {
  const location = useLocation();
  const isHeroPage = HERO_ROUTES.includes(location.pathname);

  return (
    <>
      {/* Fixed + out of document flow so it can float over the hero image
          instead of pushing it down. z-40 keeps it above page content but
          below the sidebar (z-60/z-70) and logout modal (z-80). */}
      <header className="fixed top-0 inset-x-0 z-40 w-full">
        <TopHeader transparent={isHeroPage} />
      </header>

      {/* Hero pages render full-bleed under the floating header (no offset).
          Non-hero pages need pt-16 so content isn't hidden under the
          always-solid header (h-16 = 64px, matches TopHeader's header height). */}
      <main className={`${isHeroPage ? "" : "pt-16"} pb-20 lg:pb-0`}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default PublicLayout;
