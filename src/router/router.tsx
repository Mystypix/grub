import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/sign-in/sign-in";
import { Dashboard } from "../pages/dashboard/dashboard";
import { Intro } from "../pages/intro/intro";
import { SignUp } from "../pages/sign-up/sign-up";
import { PrivateRoutes } from "./private-routes";
import { Layout } from "../components/layout/layout";
import { PublicRoutes } from "./public-routes";
import { AddRecipe } from "../pages/add-recipe/add-recipe";
import { MyRecipes } from "../pages/my-recipes/my-recipes";
import { Settings } from "../pages/settings/settings";

export const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<AddRecipe />} path="/add-recipe" />
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<MyRecipes />} path="/my-recipes" />
            <Route element={<Settings />} path="/settings" />
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
