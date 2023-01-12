import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/signIn/signIn";
import { Dashboard } from "../pages/dashboard/dashboard";
import { Intro } from "../pages/intro/intro";
import { SignUp } from "../pages/signUp/signUp";
import { PrivateRoutes } from "./privateRoutes";
import { Layout } from "../components/layout/layout";
import { PublicRoutes } from "./publicRoutes";
import { AddRecipe } from "../pages/add-recipe/add-recipe";
import { MyRecipes } from "../pages/my-recipes/my-recipes";

export const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<AddRecipe />} path="/add-recipe" />
            <Route element={<MyRecipes />} path="/my-recipes" />
          </Route>
          <Route element={<PublicRoutes />}>
            <Route element={<Intro />} path="/" />
            <Route element={<SignIn />} path="/sign-in" />
            <Route element={<SignUp />} path="/sign-up" />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
