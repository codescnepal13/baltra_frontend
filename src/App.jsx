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
const EditProductComplaint = lazy(
  () =>
    import("./components/admin/adminComponents/productComplaints/editProductComplaint/EditProductComplaint"),
);
const UnAuthorize = lazy(
  () => import("./components/layout/unauthorize/UnAuthorize"),
);
const EditRole = lazy(
  () => import("./components/admin/adminComponents/manageRoles/edit/EditRole"),
);
const AddRole = lazy(
  () => import("./components/admin/adminComponents/manageRoles/add/AddRole"),
);
const ManageRoleList = lazy(
  () => import("./components/admin/adminComponents/manageRoles/ManageRoleList"),
);
const Home = lazy(() => import("./pages/home/Home"));
const ReadAboutUs = lazy(() => import("./pages/readAboutUs/ReadAboutUs"));
const Profile = lazy(() => import("./pages/user/profile/Profile"));
const BaltraAllProducts = lazy(
  () => import("./pages/baltraAllProducts/BaltraAllProducts"),
);
const BaltraSubCategoryProducts = lazy(
  () => import("./pages/baltraSubCategoryProducts/BaltraSubCategoryProducts"),
);

const BaltraCatalog = lazy(() => import("./pages/baltraCatalog/BaltraCatalog"));
const BaltraTracking = lazy(
  () => import("./pages/baltraTracking/BaltraTracking"),
);
const TrackingProductDetails = lazy(
  () => import("./pages/trackingProductDetails/TrackingProductDetails"),
);
const UserProductPage = lazy(
  () => import("./pages/userProductPage/UserProductPage"),
);
const UserRegisteredProductPage = lazy(
  () =>
    import("./pages/userProductPage/userRegisteredProductPage/UserRegisteredProductPage"),
);
const BaltraExtendWarranty = lazy(
  () => import("./pages/baltraExtendWarranty/BaltraExtendWarranty"),
);
const BaltraRewardsPoint = lazy(
  () => import("./pages/baltraRewardsPoint/BaltraRewardsPoint"),
);
const BaltraProductView = lazy(
  () => import("./pages/productView/BaltraProductView"),
);
const AdminDashboard = lazy(
  () =>
    import("./components/admin/adminComponents/adminDashboard/AdminDashboard"),
);
const MainLayout = lazy(
  () => import("./components/admin/mainLayout/MainLayout"),
);
const TermsAndConditions = lazy(
  () => import("./components/layout/termsAndConditions/TermsAndConditions"),
);
const BaltraPrivacyPolicy = lazy(
  () =>
    import("./components/layout/metaData/privacyPolicy/BaltraPrivacyPolicy"),
);
const BaltraLogin = lazy(() => import("./pages/user/login/BaltraLogin"));
const ForgotPassword = lazy(
  () => import("./pages/user/forgotPassword/ForgotPassword"),
);
const ResetOTPVerify = lazy(
  () => import("./pages/user/resetOTPVerify/ResetOTPVerify"),
);
const ResetPassword = lazy(
  () => import("./pages/user/resetPassword/ResetPassword"),
);
const EditPassword = lazy(
  () => import("./pages/user/profile/editPassword/EditPassword"),
);
const BaltraLandingPage = lazy(
  () => import("./pages/landingPage/BaltraLandingPage"),
);
const AddCatalog = lazy(
  () =>
    import("./components/admin/adminComponents/adminCatalog/addCatalog/AddCatalog"),
);
const AdminCatalogList = lazy(
  () =>
    import("./components/admin/adminComponents/adminCatalog/AdminCatalogList"),
);

const App = () => {
  const { isAuthenticated, customer } = useSelector((state) => state.auth);

  const userRole = customer?.role;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const ADMIN = ["admin"];
  const PRODUCT = ["admin", "product_incharge"];
  const SERVICE = ["admin", "service_incharge"];
  const ALL_STAFF = ["admin", "product_incharge", "service_incharge"];

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
                    userRole={userRole}
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
                    userRole={userRole}
                    allowedRoles={["customer"]}
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
                    userRole={userRole}
                    allowedRoles={["customer"]}
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
                    userRole={userRole}
                    allowedRoles={["customer"]}
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
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={["customer"]}
                  >
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
                  ["admin", "product_incharge", "service_incharge"].includes(
                    customer?.role,
                  ) ? (
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
                    allowedRoles={["customer"]}
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
                    userRole={userRole}
                    allowedRoles={["customer"]}
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
                    userRole={userRole}
                    allowedRoles={["customer"]}
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
                    userRole={userRole}
                    allowedRoles={["customer"]}
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
                  userRole={userRole}
                  allowedRoles={ALL_STAFF}
                >
                  <MainLayout />
                </PrivateRoute>
              }
            >
              {/* ── Dashboard (all staff) ── */}
              <Route index element={<AdminDashboard />} />

              {/* ── Admin profile (all staff — personal) ── */}
              <Route
                path="admin-profile-information"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={ALL_STAFF}
                  >
                    <AdminProfile />
                  </PrivateRoute>
                }
              />

              {/* ── Product Inventory ── */}
              <Route
                path="all-category-List"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <AllCategoryProductList />
                  </PrivateRoute>
                }
              />
              <Route
                path="add-category-product"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <AddCategoryProduct />
                  </PrivateRoute>
                }
              />
              <Route
                path="edit-category-product/:category_id"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <EditCategory />
                  </PrivateRoute>
                }
              />
              <Route
                path="all-sub-category-List"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <AllSubCategoryList />
                  </PrivateRoute>
                }
              />
              <Route
                path="add-subCategory-product"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <AddSubCategory />
                  </PrivateRoute>
                }
              />
              <Route
                path="edit-sub-category-product/:id"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <SingleSubCategory />
                  </PrivateRoute>
                }
              />
              <Route
                path="all-products-list"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <AllProductList />
                  </PrivateRoute>
                }
              />
              <Route
                path="add-product"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <AddProduct />
                  </PrivateRoute>
                }
              />
              <Route
                path="edit-product/:id"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <EditProduct />
                  </PrivateRoute>
                }
              />
              <Route
                path="single-product-view/:id"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <SingleProductView />
                  </PrivateRoute>
                }
              />
              {/* QR — admin only */}
              <Route
                path="all-QrProducts-list"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={ADMIN}
                  >
                    <QRProductList />
                  </PrivateRoute>
                }
              />
              <Route
                path="add-Qr-Product"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={ADMIN}
                  >
                    <AddQrProduct />
                  </PrivateRoute>
                }
              />

              {/* ── Customer Products ── */}
              {/* Customer Products List — admin + product_incharge */}
              <Route
                path="all-customer-products-list"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <CustomerProductList />
                  </PrivateRoute>
                }
              />
              <Route
                path="single-customer-product-list/:id"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <SingleCustomerProductList />
                  </PrivateRoute>
                }
              />
              {/* Product Complaints — admin + service_incharge */}
              <Route
                path="all/products-complaints-list"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={SERVICE}
                  >
                    <ProductComplaintList />
                  </PrivateRoute>
                }
              />
              <Route
                path="single-product-complaint/:id"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={SERVICE}
                  >
                    <SingleProductComplaint />
                  </PrivateRoute>
                }
              />

              <Route
                path="edit-product-complaint/:id"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={SERVICE}
                  >
                    <EditProductComplaint />
                  </PrivateRoute>
                }
              />

              {/* ── Customer Profiles — admin + product_incharge ── */}
              <Route
                path="all-customer-List"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <AllCustomerList />
                  </PrivateRoute>
                }
              />
              <Route
                path="single-customer-view/:id"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <SingleCustomerRole />
                  </PrivateRoute>
                }
              />

              {/* ── Warranty Package — admin + service_incharge ── */}
              <Route
                path="all/warranty-package-list"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={SERVICE}
                  >
                    <AllWarrantyPackageList />
                  </PrivateRoute>
                }
              />
              <Route
                path="add/warranty-package"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={SERVICE}
                  >
                    <AddWarrantyPackage />
                  </PrivateRoute>
                }
              />
              <Route
                path="edit/warranty-package/:id"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={SERVICE}
                  >
                    <EditWarrantyPackage />
                  </PrivateRoute>
                }
              />

              {/* ── Warranty Complaints — admin + service_incharge ── */}
              <Route
                path="all/warranty-status-list"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={SERVICE}
                  >
                    <TrackingComplaintStatusList />
                  </PrivateRoute>
                }
              />

              {/* ── Contacts — admin + product_incharge ── */}
              <Route
                path="all-contact-message-List"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <AllContactList />
                  </PrivateRoute>
                }
              />
              <Route
                path="single-view-contact/:id"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <SingleViewContact />
                  </PrivateRoute>
                }
              />

              {/* ── Personalize Setting — admin + product_incharge ── */}
              <Route
                path="all/customize-products"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <AllPersonalizationProductsList />
                  </PrivateRoute>
                }
              />
              <Route
                path="single/personalization-view/:id"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <SinglePersonalizationView />
                  </PrivateRoute>
                }
              />
              <Route
                path="all/bulk-quote-products"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={PRODUCT}
                  >
                    <AllBulkQuoteProducts />
                  </PrivateRoute>
                }
              />

              {/* ── Settings — admin only ── */}
              <Route
                path="all/e-catalog-list"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={ADMIN}
                  >
                    <AdminCatalogList />
                  </PrivateRoute>
                }
              />
              <Route
                path="add/product-catalog"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={ADMIN}
                  >
                    <AddCatalog />
                  </PrivateRoute>
                }
              />
              <Route
                path="all/manage-roles"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={ADMIN}
                  >
                    <ManageRoleList />
                  </PrivateRoute>
                }
              />
              <Route
                path="add-role"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={ADMIN}
                  >
                    <AddRole />
                  </PrivateRoute>
                }
              />
              <Route
                path="edit-role/:id"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={ADMIN}
                  >
                    <EditRole />
                  </PrivateRoute>
                }
              />

              {/* ── User List — admin only (system management) ── */}
              <Route
                path="all-user-List"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={ADMIN}
                  >
                    <AllUserList />
                  </PrivateRoute>
                }
              />
              <Route
                path="single-user-view/:id"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    allowedRoles={ADMIN}
                  >
                    <SingleUserRole />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path="*"
              element={
                <>
                  <PageNotFound />
                </>
              }
            />
            <Route path="/unauthorize" element={<UnAuthorize />} />
          </Routes>
        </Suspense>
        <ScrollMoveUp />
      </SnackbarProvider>
    </Router>
  );
};

export default App;
