import { Outlet, Navigate } from "react-router-dom";
import { useAuthUser } from "@react-query-firebase/auth";
import { auth } from "../firebase/firebase";

export const PrivateRoutes = () => {
  const user = useAuthUser(["user"], auth);

  return user ? <Outlet /> : <Navigate to="/sign-in" />;
};
