// import Home from "../../pages/home/Home";
// import { createBrowserRouter } from "react-router-dom";
// import Footer from "../footer/Footer";
// import TopHeader from "../topHeader/TopHeader";
// import PageNotFound from "../../pages/notFound/PageNotFound";
// import BaltraAllProducts from "../../pages/baltraAllProducts/BaltraAllProducts";
// import BaltraSubCategoryProducts from "../../pages/baltraSubCategoryProducts/BaltraSubCategoryProducts";
// import BaltraPersonalization from "../../pages/baltraPersonalization/BaltraPersonalization";
// import BaltraCatalog from "../../pages/baltraCatalog/BaltraCatalog";
// import BaltraTracking from "../../pages/baltraTracking/BaltraTracking";
// import BaltraContact from "../../pages/baltraContact/BaltraContact";
// import ReadAboutUs from "../../pages/readAboutUs/ReadAboutUs";
// import Profile from "../../pages/user/profile/Profile";
// import EditPassword from "../../pages/user/profile/editPassword/EditPassword";
// import Register from "../../pages/user/register/Register";
// import BaltraLogin from "../../pages/user/login/BaltraLogin";
// import BaltraMobile from "../../pages/user/baltraMobile/BaltraMobile";
// import VerifyOTP from "../../pages/user/verifyOTP/VerifyOTP";
// import MainLayout from "../admin/mainLayout/MainLayout";
// import BaltraProductView from "../../pages/productView/BaltraProductView";
// import BaltraRewardsPoint from "../../pages/baltraRewardsPoint/BaltraRewardsPoint";
// import BaltraExtendWarranty from "../../pages/baltraExtendWarranty/BaltraExtendWarranty";
// import UserRegisteredProductPage from "../../pages/userProductPage/userRegisteredProductPage/UserRegisteredProductPage";
// import UserProductPage from "../../pages/userProductPage/UserProductPage";
// import TrackingProductDetails from "../../pages/trackingProductDetails/TrackingProductDetails";
// import BaltraSuccessModal from "../../pages/user/baltraSuccessModal/BaltraSuccessModal";
// import BaltraPrivacyPolicy from "../layout/metaData/privacyPolicy/BaltraPrivacyPolicy";
// import TermsAndConditions from "../layout/termsAndConditions/TermsAndConditions";
// import ResetPassword from "../../pages/user/resetPassword/ResetPassword";
// import ResetOTPVerify from "../../pages/user/resetOTPVerify/ResetOTPVerify";
// import ForgotPassword from "../../pages/user/forgotPassword/ForgotPassword";
// import PrivateRoute from "../layout/privateRoute/PrivateRoute";
// import AdminDashboard from "../admin/adminComponents/adminDashboard/AdminDashboard";

// export const configRouter = ({ isAuthenticated, adminRoute, customer }) =>
//   createBrowserRouter([
//     {
//       path: "/",
//       element: (
//         <>
//           <Home />
//           <Footer />
//         </>
//       ),
//       errorElement: (
//         <>
//           <TopHeader />
//           <PageNotFound />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-allProducts",
//       element: (
//         <>
//           <BaltraAllProducts />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-subCategoryProducts",
//       element: (
//         <>
//           <BaltraSubCategoryProducts />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-Personalization",
//       element: (
//         <>
//           <BaltraPersonalization />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-catalog",
//       element: (
//         <>
//           <BaltraCatalog />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-trackingProducts",
//       element: (
//         <>
//           <BaltraTracking />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-contact-us",
//       element: (
//         <>
//           <BaltraContact />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-readAboutUS",
//       element: (
//         <>
//           <ReadAboutUs />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-profileInformation",
//       element: (
//         <>
//           <PrivateRoute isAuthenticated={isAuthenticated}>
//             <Profile />
//           </PrivateRoute>
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-change-password",
//       element: (
//         <>
//           <PrivateRoute isAuthenticated={isAuthenticated}>
//             <EditPassword />
//           </PrivateRoute>
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-account-signUp",
//       element: (
//         <>
//           <Register />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-account-signin",
//       element: (
//         <>
//           <BaltraLogin />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-account-mobileVerify",
//       element: (
//         <>
//           <BaltraMobile />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-account-verify",
//       element: (
//         <>
//           <VerifyOTP />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-forgot-Password",
//       element: (
//         <>
//           <ForgotPassword />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-resetOtpVerify",
//       element: (
//         <>
//           <ResetOTPVerify />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-resetPassword",
//       element: (
//         <>
//           <ResetPassword />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-term-of-use",
//       element: (
//         <>
//           <TermsAndConditions />
//         </>
//       ),
//     },
//     {
//       path: "/baltra/privacy-policy",
//       element: (
//         <>
//           <BaltraPrivacyPolicy />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-successModal",
//       element: (
//         <>
//           <TopHeader />
//           <BaltraSuccessModal />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-tracking-ProductDetails",
//       element: (
//         <>
//           <TrackingProductDetails />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-user-ProductPage",
//       element: (
//         <>
//           <UserProductPage />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-user-registered-ProductPage",
//       element: (
//         <>
//           <UserRegisteredProductPage />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-extended-warranty",
//       element: (
//         <>
//           <BaltraExtendWarranty />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-reward-point",
//       element: (
//         <>
//           <BaltraRewardsPoint />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-product-view",
//       element: (
//         <>
//           <BaltraProductView />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "*",
//       element: (
//         <>
//           <TopHeader />
//           <PageNotFound />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/baltra-admin-dashboard",
//       element: (
//         <PrivateRoute isAuthenticated={isAuthenticated}>
//           <MainLayout />
//         </PrivateRoute>
//       ),
//       children: [
//         {
//           path: "",
//           element: <AdminDashboard />,
//         },
//       ],
//     },
//   ]);

//   const App = () => {
//     const { isAuthenticated, adminRoute, customer } = useSelector(
//       (state) => state.auth
//     );

//     const router = createBrowserRouter([
//       {
//         path: "/",
//         element: (
//           <>
//             <Home />
//             <Footer />
//           </>
//         ),
//         errorElement: (
//           <>
//             <TopHeader />
//             <PageNotFound />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-allProducts",
//         element: (
//           <>
//             <BaltraAllProducts />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-subCategoryProducts",
//         element: (
//           <>
//             <BaltraSubCategoryProducts />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-Personalization",
//         element: <BaltraPersonalization />,
//       },
//       {
//         path: "/baltra-catalog",
//         element: (
//           <>
//             <BaltraCatalog />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-trackingProducts",
//         element: (
//           <>
//             <BaltraTracking />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-contact-us",
//         element: (
//           <>
//             <BaltraContact />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-readAboutUS",
//         element: (
//           <>
//             <ReadAboutUs />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-profileInformation",
//         element: (
//           <>
//             <Profile />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-change-password",
//         element: (
//           <>
//             <EditPassword />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-account-signUp",
//         element: (
//           <>
//             <Register />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-account-signin",
//         element: (
//           <>
//             <BaltraLogin />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-account-mobileVerify",
//         element: (
//           <>
//             <BaltraMobile />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-account-verify",
//         element: (
//           <>
//             <VerifyOTP />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-forgot-Password",
//         element: (
//           <>
//             <ForgotPassword />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-resetOtpVerify",
//         element: (
//           <>
//             <ResetOTPVerify />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-resetPassword",
//         element: (
//           <>
//             <ResetPassword />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-term-of-use",
//         element: <TermsAndConditions />,
//       },
//       {
//         path: "/baltra/privacy-policy",
//         element: <BaltraPrivacyPolicy />,
//       },
//       {
//         path: "/baltra-successModal",
//         element: (
//           <>
//             <TopHeader />
//             <BaltraSuccessModal />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-tracking-ProductDetails",
//         element: (
//           <>
//             <TrackingProductDetails />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-user-ProductPage",
//         element: (
//           <>
//             <UserProductPage />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-user-registered-ProductPage",
//         element: (
//           <>
//             <UserRegisteredProductPage />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-extended-warranty",
//         element: (
//           <>
//             <BaltraExtendWarranty />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-reward-point",
//         element: (
//           <>
//             <BaltraRewardsPoint />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-product-view",
//         element: (
//           <>
//             <BaltraProductView />
//             <Footer />
//           </>
//         ),
//       },
//       {
//         path: "/baltra-admin-dashboard",
//         element: (
//           <PrivateRoute
//             isAuthenticated={isAuthenticated}
//             userRole={customer && customer.role === "admin"}
//             adminRoute={adminRoute}
//           >
//             <MainLayout />
//           </PrivateRoute>
//         ),
//         children: [
//           {
//             path: "",
//             element: <AdminDashboard />,
//           },
//         ],
//       },
//       {
//         path: "*",
//         element: (
//           <>
//             <PageNotFound />
//             <Footer />
//           </>
//         ),
//       },
//     ]);

//     return (
//       <>
//         <ToastContainer
//           position="bottom-left"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="colored"
//         />
//         <Suspense fallback={<div>Loading...</div>}>
//           <RouterProvider router={router} />
//         </Suspense>
//       </>
//     );
//   };
