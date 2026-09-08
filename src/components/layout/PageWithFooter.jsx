import Footer from "../footer/Footer";

// src/components/layout/PageWithFooter.jsx
const PageWithFooter = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <div className="flex-1 flex flex-col">{children}</div>
    <Footer />
  </div>
);

export default PageWithFooter;
