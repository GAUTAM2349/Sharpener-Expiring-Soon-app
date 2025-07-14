import { useContext, useEffect } from "react";

import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  useEffect(() => {
    console.log("entered private useEffect", isAuthenticated);
  }, []);

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  } else {
    return isAuthenticated ? children : <Navigate to="/login" />;
  }
};
