import TopHeader from "../topHeader/TopHeader";

/**
 * Wraps the Home page's sections and mounts TopHeader exactly once,
 * as a sibling positioned OVER the top of the page — not nested
 * inside any section. This keeps TopHeader's `fixed` bottom nav
 * completely isolated from any section's `overflow-hidden` or
 * `transform` styles further down the page.
 */
const HomeLayout = ({ children }) => {
  return (
    <div className="relative w-full">
      <div className="absolute top-0 left-0 w-full z-30">
        <TopHeader />
      </div>
      {children}
    </div>
  );
};

export default HomeLayout;
