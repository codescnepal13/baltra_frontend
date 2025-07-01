// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
// import TopHeader from "./components/topHeader/TopHeader";
// import Home from "./pages/home/Home";
// import Footer from "./components/footer/Footer";
// import BaltraProduct from "./pages/baltraProduct/BaltraProduct";
// import BaltraContact from "./pages/baltraContact/BaltraContact";
// import PageNotFound from "./pages/notFound/PageNotFound";
// import ReadAboutUs from "./pages/readAboutUs/ReadAboutUs";
// import Profile from "./pages/user/profile/Profile";
// import Register from "./pages/user/register/Register";
// import VerifyOTP from "./pages/user/verifyOTP/VerifyOTP";
// import BaltraMobile from "./pages/user/baltraMobile/BaltraMobile";
// import BaltraSuccessModal from "./pages/user/baltraSuccessModal/BaltraSuccessModal";

// const routes = [
//   { path: "/", element: <Home /> },
//   { path: "/baltra-product", element: <BaltraProduct /> },
//   { path: "/baltra-contact-us", element: <BaltraContact /> },
//   { path: "/baltra-readAboutUS", element: <ReadAboutUs /> },
//   { path: "/baltra-profileInformation", element: <Profile /> },
//   { path: "/baltra-account-signUp", element: <Register /> },
//   { path: "/baltra-account-mobileVerify", element: <BaltraMobile /> },
//   { path: "/baltra-account-verify", element: <VerifyOTP /> },
//   { path: "/baltra-successModal", element: <BaltraSuccessModal /> },
//   { path: "*", element: <PageNotFound /> },
// ];

// function App() {
//   return (
//     <>
//       <Router>
//         <TopHeader />
//         <Routes>
//           {routes.map((route, index) => (
//             <Route key={index} path={route.path} element={route.element} />
//           ))}
//         </Routes>
//         <Footer />
//       </Router>
//     </>
//   );
// }

// export default App;

// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./App.css";
// import TopHeader from "./components/topHeader/TopHeader";
// import Home from "./pages/home/Home";
// import Footer from "./components/footer/Footer";
// import BaltraProduct from "./pages/baltraProduct/BaltraProduct";
// import BaltraContact from "./pages/baltraContact/BaltraContact";
// import PageNotFound from "./pages/notFound/PageNotFound";
// import ReadAboutUs from "./pages/readAboutUs/ReadAboutUs";
// import Profile from "./pages/user/profile/Profile";
// import Register from "./pages/user/register/Register";
// import VerifyOTP from "./pages/user/verifyOTP/VerifyOTP";
// import BaltraMobile from "./pages/user/baltraMobile/BaltraMobile";
// import BaltraSuccessModal from "./pages/user/baltraSuccessModal/BaltraSuccessModal";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <>
//         <TopHeader />
//         <Home />
//         <Footer />
//       </>
//     ),
//     errorElement: (
//       <>
//         <TopHeader />
//         <PageNotFound />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "/baltra-product",
//     element: (
//       <>
//         <TopHeader />
//         <BaltraProduct />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "/baltra-contact-us",
//     element: (
//       <>
//         <TopHeader />
//         <BaltraContact />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "/baltra-readAboutUS",
//     element: (
//       <>
//         <TopHeader />
//         <ReadAboutUs />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "/baltra-profileInformation",
//     element: (
//       <>
//         <TopHeader />
//         <Profile />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "/baltra-account-signUp",
//     element: (
//       <>
//         <TopHeader />
//         <Register />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "/baltra-account-mobileVerify",
//     element: (
//       <>
//         <TopHeader />
//         <BaltraMobile />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "/baltra-account-verify",
//     element: (
//       <>
//         <TopHeader />
//         <VerifyOTP />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "/baltra-successModal",
//     element: (
//       <>
//         <TopHeader />
//         <BaltraSuccessModal />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "*",
//     element: (
//       <>
//         <TopHeader />
//         <PageNotFound />
//         <Footer />
//       </>
//     ),
//   },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
// import TopHeader from "./components/topHeader/TopHeader";
// import Home from "./pages/home/Home";
// import Footer from "./components/footer/Footer";
// import BaltraProduct from "./pages/baltraProduct/BaltraProduct";
// import BaltraContact from "./pages/baltraContact/BaltraContact";
// import PageNotFound from "./pages/notFound/PageNotFound";
// import ReadAboutUs from "./pages/readAboutUs/ReadAboutUs";
// import Profile from "./pages/user/profile/Profile";
// import Register from "./pages/user/register/Register";
// import VerifyOTP from "./pages/user/verifyOTP/VerifyOTP";
// import BaltraMobile from "./pages/user/baltraMobile/BaltraMobile";
// import BaltraSuccessModal from "./pages/user/baltraSuccessModal/BaltraSuccessModal";

// function App() {
//   return (
//     <>
//       <Router>
//         <TopHeader />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/baltra-product" element={<BaltraProduct />} />
//           <Route path="/baltra-contact-us" element={<BaltraContact />} />
//           <Route path="/baltra-readAboutUS" element={<ReadAboutUs />} />
//           <Route path="/baltra-profileInformation" element={<Profile />} />
//           <Route path="/baltra-account-signUp" element={<Register />} />
//           <Route
//             path="/baltra-account-mobileVerify"
//             element={<BaltraMobile />}
//           />
//           <Route path="/baltra-account-verify" element={<VerifyOTP />} />
//           <Route path="/baltra-successModal" element={<BaltraSuccessModal />} />

//           <Route path="*" element={<PageNotFound />} />
//         </Routes>
//         <Footer />
//       </Router>
//     </>
//   );
// }

// export default App;
