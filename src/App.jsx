import { SnackbarProvider } from "notistack";
import { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import "./App.css";
import QRProductList from "./components/admin/adminComponents/QrProductList/QRProductList";
import AddQrProduct from "./components/admin/adminComponents/addQrProduct/AddQrProduct";
import AllContactList from "./components/admin/adminComponents/adminContacts/AllContactList";
import SingleViewContact from "./components/admin/adminComponents/adminContacts/singleViewContact/SingleViewContact";
import AllPersonalizationProductsList from "./components/admin/adminComponents/adminPersonalization/AllPersonalizationProductsList";
import SinglePersonalizationView from "./components/admin/adminComponents/adminPersonalization/singlePersonalizationView/SinglePersonalizationView";
import AdminProfile from "./components/admin/adminComponents/adminProfile/AdminProfile";
import AllCustomerList from "./components/admin/adminComponents/allCustomer/AllCustomerList";
import SingleCustomerRole from "./components/admin/adminComponents/allCustomer/singleCustomerRole/SingleCustomerRole";
import AllUserList from "./components/admin/adminComponents/allUsers/AllUserList";
import SingleUserRole from "./components/admin/adminComponents/allUsers/singleUserRole/SingleUserRole";
import AllProductList from "./components/admin/adminComponents/baltraProducts/allBaltraProducts/AllProductList";
import AddProduct from "./components/admin/adminComponents/baltraProducts/allBaltraProducts/addProduct/AddProduct";
import EditProduct from "./components/admin/adminComponents/baltraProducts/allBaltraProducts/editProduct/EditProduct";
import SingleProductView from "./components/admin/adminComponents/baltraProducts/allBaltraProducts/singleProductView/SingleProductView";
import AllCategoryProductList from "./components/admin/adminComponents/baltraProducts/categoryProduct/AllCategoryProductList";
import AddCategoryProduct from "./components/admin/adminComponents/baltraProducts/categoryProduct/addCategory/AddCategoryProduct";
import EditCategory from "./components/admin/adminComponents/baltraProducts/categoryProduct/editCategory/EditCategory";
import AllSubCategoryList from "./components/admin/adminComponents/baltraProducts/subCategory/AllSubCategoryList";
import AddSubCategory from "./components/admin/adminComponents/baltraProducts/subCategory/addSubCategory/AddSubCategory";
import SingleSubCategory from "./components/admin/adminComponents/baltraProducts/subCategory/singleSubCategory/SingleSubCategory";
import AllBulkQuoteProducts from "./components/admin/adminComponents/bulkQuoteProducts/AllBulkQuoteProducts";
import SingleBulkQuote from "./components/admin/adminComponents/bulkQuoteProducts/singleBulkQuote/SingleBulkQuote";
import CustomerProductList from "./components/admin/adminComponents/customerProductList/CustomerProductList";
import SingleCustomerProductList from "./components/admin/adminComponents/customerProductList/singleCustomerProductList/SingleCustomerProductList";
import ProductComplaintList from "./components/admin/adminComponents/productComplaints/ProductComplaintList";
import SingleProductComplaint from "./components/admin/adminComponents/productComplaints/singleProductComplaint/SingleProductComplaint";
import TrackingComplaintStatusList from "./components/admin/adminComponents/trackingComplaintStatus/TrackingComplaintStatusList";
import AllWarrantyPackageList from "./components/admin/adminComponents/warrantySection/AllWarrantyPackageList";
import AddWarrantyPackage from "./components/admin/adminComponents/warrantySection/addWarrantyPackage/AddWarrantyPackage";
import EditWarrantyPackage from "./components/admin/adminComponents/warrantySection/editWarrantyPackage/EditWarrantyPackage";
import Footer from "./components/footer/Footer";
import GlobalMetaTag from "./components/layout/globalMetaTag/GlobalMetaTag";
import InitialLoader from "./components/layout/initialLoader/InitialLoader";
import PrivateRoute from "./components/layout/privateRoute/PrivateRoute";
import ScrollMoveUp from "./components/layout/scrollMoveUp/ScrollMoveUp";
import ScrollTop from "./components/layout/scrollTop/ScrollTop";
import SkeletonLoader from "./components/layout/skeletonLoader/SkeletonLoader";
import ContactUs from "./pages/baltraContact/ContactUs";
import BaltraSearchProducts from "./pages/baltraSearchProducts/BaltraSearchProducts";
import BulkOrderHistory from "./pages/bulkOrderHistory/BulkOrderHistory";
import SingleOrderHistory from "./pages/bulkOrderHistory/singleOrderHistory/SingleOrderHistory";
import PageNotFound from "./pages/notFound/PageNotFound";
import BaltraMobile from "./pages/user/baltraMobile/BaltraMobile";
import BaltraSuccessModal from "./pages/user/baltraSuccessModal/BaltraSuccessModal";
import Register from "./pages/user/register/Register";
import VerifyOTP from "./pages/user/verifyOTP/VerifyOTP";
const Home = lazy(() => import("./pages/home/Home"));
const ReadAboutUs = lazy(() => import("./pages/readAboutUs/ReadAboutUs"));
const Profile = lazy(() => import("./pages/user/profile/Profile"));
const BaltraAllProducts = lazy(() =>
  import("./pages/baltraAllProducts/BaltraAllProducts")
);
const BaltraSubCategoryProducts = lazy(() =>
  import("./pages/baltraSubCategoryProducts/BaltraSubCategoryProducts")
);

const BaltraCatalog = lazy(() => import("./pages/baltraCatalog/BaltraCatalog"));
const BaltraTracking = lazy(() =>
  import("./pages/baltraTracking/BaltraTracking")
);
const TrackingProductDetails = lazy(() =>
  import("./pages/trackingProductDetails/TrackingProductDetails")
);
const UserProductPage = lazy(() =>
  import("./pages/userProductPage/UserProductPage")
);
const UserRegisteredProductPage = lazy(() =>
  import(
    "./pages/userProductPage/userRegisteredProductPage/UserRegisteredProductPage"
  )
);
const BaltraExtendWarranty = lazy(() =>
  import("./pages/baltraExtendWarranty/BaltraExtendWarranty")
);
const BaltraRewardsPoint = lazy(() =>
  import("./pages/baltraRewardsPoint/BaltraRewardsPoint")
);
const BaltraProductView = lazy(() =>
  import("./pages/productView/BaltraProductView")
);
const AdminDashboard = lazy(() =>
  import("./components/admin/adminComponents/adminDashboard/AdminDashboard")
);
const MainLayout = lazy(() =>
  import("./components/admin/mainLayout/MainLayout")
);
const TermsAndConditions = lazy(() =>
  import("./components/layout/termsAndConditions/TermsAndConditions")
);
const BaltraPrivacyPolicy = lazy(() =>
  import("./components/layout/metaData/privacyPolicy/BaltraPrivacyPolicy")
);
const BaltraLogin = lazy(() => import("./pages/user/login/BaltraLogin"));
const ForgotPassword = lazy(() =>
  import("./pages/user/forgotPassword/ForgotPassword")
);
const ResetOTPVerify = lazy(() =>
  import("./pages/user/resetOTPVerify/ResetOTPVerify")
);
const ResetPassword = lazy(() =>
  import("./pages/user/resetPassword/ResetPassword")
);
const EditPassword = lazy(() =>
  import("./pages/user/profile/editPassword/EditPassword")
);
const BaltraLandingPage = lazy(() =>
  import("./pages/landingPage/BaltraLandingPage")
);
const AddCatalog = lazy(() =>
  import(
    "./components/admin/adminComponents/adminCatalog/addCatalog/AddCatalog"
  )
);
const AdminCatalogList = lazy(() =>
  import("./components/admin/adminComponents/adminCatalog/AdminCatalogList")
);

const App = () => {
  const { isAuthenticated, adminRoute, customer } = useSelector(
    (state) => state.auth
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollTop />
      <GlobalMetaTag />
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        autoHideDuration={3000}
        maxSnack={3}
      >
        <Suspense fallback={<SkeletonLoader />}>
          <Routes>
            <Route
              path="/baltra-aboutUs-Page"
              element={
                <>
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {loading && <InitialLoader isLoading={loading} />}
                  {!loading && <BaltraLandingPage />}
                </>
              }
            />
            <Route
              path="/baltra-allProducts"
              element={
                <>
                  <BaltraAllProducts />
                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-subCategoryProducts/:category_id"
              element={
                <>
                  <BaltraSubCategoryProducts />
                  <Footer />
                </>
              }
            />

            <Route
              path="/baltra-catalog"
              element={
                <>
                  <BaltraCatalog />
                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-trackingProducts"
              element={
                <>
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={customer?.role}
                  >
                    <BaltraTracking />
                  </PrivateRoute>
                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-contact-us"
              element={
                <>
                  <ContactUs />
                  <Footer />
                </>
              }
            />

            <Route
              path="/baltra-bulk-quote"
              element={
                <>
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={customer?.role}
                  >
                    <BulkOrderHistory />
                  </PrivateRoute>
                  <Footer />
                </>
              }
            />

            <Route
              path="/single-bulk-history/:quote_id"
              element={
                <>
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={customer?.role}
                  >
                    <SingleOrderHistory />
                  </PrivateRoute>
                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-readAboutUS"
              element={
                <>
                  <ReadAboutUs />
                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-profileInformation"
              element={
                <>
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={customer?.role}
                  >
                    <Profile />
                  </PrivateRoute>
                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-change-password"
              element={
                <>
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <EditPassword />
                  </PrivateRoute>
                  <Footer />
                </>
              }
            />

            <Route
              path="/baltra-account-signUp"
              element={
                customer && customer?.is_verified ? (
                  <>
                    <Register />
                    <Footer />
                  </>
                ) : (
                  <Navigate to="/baltra-account-signin" />
                )
              }
            />
            <Route
              path="/baltra-account-signin"
              element={
                isAuthenticated ? (
                  customer?.role === "admin" ? (
                    <Navigate to="/baltra-admin-dashboard" replace />
                  ) : (
                    <Navigate to="/baltra-profileInformation" replace />
                  )
                ) : (
                  <>
                    <BaltraLogin />
                    <Footer />
                  </>
                )
              }
            />
            <Route
              path="/baltra-account-mobileVerify"
              element={
                <>
                  <BaltraMobile />
                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-account-verify"
              element={
                <>
                  <VerifyOTP />
                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-forgot-Password"
              element={
                <>
                  <ForgotPassword />
                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-resetOtpVerify"
              element={
                <>
                  <ResetOTPVerify />
                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-resetPassword"
              element={
                <>
                  <ResetPassword />
                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-term-of-use"
              element={<TermsAndConditions />}
            />
            <Route
              path="/baltra/privacy-policy"
              element={<BaltraPrivacyPolicy />}
            />
            <Route
              path="/baltra-successModal"
              element={
                <>
                  <BaltraSuccessModal />
                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-tracking-ProductDetails/:complaint_id"
              element={
                <>
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={customer?.role}
                  >
                    <TrackingProductDetails />
                  </PrivateRoute>
                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-user-ProductPage"
              element={
                <>
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={customer?.role}
                  >
                    <UserProductPage />
                  </PrivateRoute>
                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-user-registered-ProductPage/:id"
              element={
                <>
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={customer?.role}
                  >
                    <UserRegisteredProductPage />
                  </PrivateRoute>
                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-extended-warranty/:id"
              element={
                <>
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={customer?.role}
                  >
                    <BaltraExtendWarranty />
                  </PrivateRoute>

                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-reward-point/:id"
              element={
                <>
                  <BaltraRewardsPoint />
                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-product-view/:product_id"
              element={
                <>
                  <BaltraProductView />
                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-search-products"
              element={
                <>
                  <BaltraSearchProducts />
                  <Footer />
                </>
              }
            />
            <Route
              path="/baltra-admin-dashboard"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={adminRoute}
                  userRole={customer?.role === "admin" ? "admin" : ""}
                  requiredRole="admin"
                >
                  <MainLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route
                path="admin-profile-information"
                element={<AdminProfile />}
              />
              <Route
                path="all-contact-message-List"
                element={<AllContactList />}
              />
              <Route path="all-customer-List" element={<AllCustomerList />} />
              <Route
                path="single-customer-view/:id"
                element={<SingleCustomerRole />}
              />
              <Route path="all-user-List" element={<AllUserList />} />
              <Route path="single-user-view/:id" element={<SingleUserRole />} />
              <Route
                path="all-category-List"
                element={<AllCategoryProductList />}
              />
              <Route
                path="add-category-product"
                element={<AddCategoryProduct />}
              />
              <Route
                path="edit-category-product/:category_id"
                element={<EditCategory />}
              />
              <Route
                path="all-sub-category-List"
                element={<AllSubCategoryList />}
              />
              <Route
                path="add-subCategory-product"
                element={<AddSubCategory />}
              />
              <Route
                path="edit-sub-category-product/:id"
                element={<SingleSubCategory />}
              />
              <Route path="all-products-list" element={<AllProductList />} />
              <Route
                path="all-customer-products-list"
                element={<CustomerProductList />}
              />
              <Route
                path="single-customer-product-list/:id"
                element={<SingleCustomerProductList />}
              />
              <Route
                path="single-product-view/:id"
                element={<SingleProductView />}
              />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
              <Route path="all-QrProducts-list" element={<QRProductList />} />
              <Route path="add-Qr-Product" element={<AddQrProduct />} />
              <Route
                path="all/warranty-package-list"
                element={<AllWarrantyPackageList />}
              />
              <Route
                path="add/warranty-package"
                element={<AddWarrantyPackage />}
              />
              <Route
                path="edit/warranty-package/:id"
                element={<EditWarrantyPackage />}
              />

              <Route
                path="single-view-contact/:id"
                element={<SingleViewContact />}
              />

              <Route
                path="all/products-complaints-list"
                element={<ProductComplaintList />}
              />

              <Route
                path="all/warranty-status-list"
                element={<TrackingComplaintStatusList />}
              />

              <Route path="all/e-catalog-list" element={<AdminCatalogList />} />
              <Route
                path="all/customize-products"
                element={<AllPersonalizationProductsList />}
              />
              <Route
                path="single/personalization-view/:id"
                element={<SinglePersonalizationView />}
              />

              <Route path="add/product-catalog" element={<AddCatalog />} />

              <Route
                path="single-product-complaint/:id"
                element={<SingleProductComplaint />}
              />

              <Route
                path="all/bulk-quote-products"
                element={<AllBulkQuoteProducts />}
              />

              <Route
                path="single/bulk-quote-view/:quote_id"
                element={<SingleBulkQuote />}
              />
            </Route>
            <Route
              path="*"
              element={
                <>
                  <PageNotFound />
                  <Footer />
                </>
              }
            />
          </Routes>
        </Suspense>
        <ScrollMoveUp />
      </SnackbarProvider>
    </Router>
  );
};

export default App;
