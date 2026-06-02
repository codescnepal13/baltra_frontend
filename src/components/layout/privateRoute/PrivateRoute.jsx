// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = ({ isAuthenticated, children, adminRoute, userRole }) => {
//   if (!isAuthenticated) {
//     return <Navigate to={"/baltra-account-signin"} />;
//   }

//   // Redirect if adminRoute is true but user is not admin
//   if (adminRoute && userRole !== "admin") {
//     return <Navigate to={"/unauthorize"} />;
//   }

//   // Redirect if it's a non-admin route and userRole is not customer
//   if (!adminRoute && userRole !== "customer") {
//     return <Navigate to={"/unauthorize"} />;
//   }

//   return children ? <>{children}</> : <Outlet />;
// };

// export default PrivateRoute;

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({
  isAuthenticated,
  children,
  allowedRoles = [],
  userRole,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/baltra-account-signin" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorize" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
