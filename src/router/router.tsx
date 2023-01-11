import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/signIn/signIn";
import { Dashboard } from "../pages/dashboard/dashboard";
import { Intro } from "../pages/intro/intro";
import { SignUp } from "../pages/signUp/signUp";
import { PrivateRoutes } from "./privateRoutes";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} path="/dashboard" />
        </Route>
        <Route element={<Intro />} path="/" />
        <Route element={<SignIn />} path="/sign-in" />
        <Route element={<SignUp />} path="/sign-up" />
      </Routes>
    </BrowserRouter>
  );
};
