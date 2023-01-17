import { Outlet, Navigate } from "react-router-dom";
import { useAuthUser } from "@react-query-firebase/auth";
import { auth } from "../firebase/firebase";
import { Loader } from "../components/loader/loader";

export const PrivateRoutes = () => {
  const user = useAuthUser(["user"], auth);

  if (user.isLoading) return <Loader />;

  return user.data ? <Outlet /> : <Navigate to="/sign-in" />;
};
