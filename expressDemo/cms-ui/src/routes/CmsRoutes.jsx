import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "@/components";
import * as Pages from "../pages";
import PageNotFound from "../pages/PageNotFound";
import { PrivateRoutes } from "./PrivateRoutes";
import { AdminRoutes } from "./AdminRoutes";

export const CmsRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          //Links for Dashboard
          <Route
            index
            element={<PrivateRoutes element={<Pages.Dashboard.List />} />}
          ></Route>
          //For Populating Data
          <Route
            path="/populate"
            element={
              <PrivateRoutes element={<Pages.Dashboard.DataPopulate />} />
            }
          ></Route>
          //_______________________________________________________________
          //Links for Profile
          <Route
            path="/profile/edit"
            element={<PrivateRoutes element={<Pages.Profile.Edit />} />}
          ></Route>
          <Route
            path="/profile/password"
            element={<PrivateRoutes element={<Pages.Profile.Password />} />}
          ></Route>
          //----------------------------------------------------------------
          //Links for Staffs
          <Route
            path="/staffs"
            element={
              <PrivateRoutes element={<AdminRoutes element={<Outlet />} />} />
            }
          >
            <Route index element={<Pages.Staffs.List />} />
            <Route path="create" element={<Pages.Staffs.Create />} />
            <Route path="edit/:id" element={<Pages.Staffs.Edit />} />
          </Route>
          //Links for Customer
          <Route
            path="/customers"
            element={<PrivateRoutes element={<Outlet />} />}
          >
            <Route index element={<Pages.Customers.List />} />
            <Route path="create" element={<Pages.Customers.Create />} />
            <Route path="edit/:id" element={<Pages.Customers.Edit />} />
          </Route>
          //Links for Products
          <Route
            path="/products"
            element={<PrivateRoutes element={<Outlet />} />}
          >
            <Route index element={<Pages.Products.List />} />
            <Route path="create" element={<Pages.Products.Create />} />
            <Route path="edit/:id" element={<Pages.Products.Edit />} />
          </Route>
          //Links for Brand
          <Route
            path="/brands"
            element={<PrivateRoutes element={<Outlet />} />}
          >
            <Route index element={<Pages.Brands.List />} />
            <Route path="create" element={<Pages.Brands.Create />} />
            <Route path="edit/:id" element={<Pages.Brands.Edit />} />
          </Route>
          //Links for Categories
          <Route
            path="/categories"
            element={<PrivateRoutes element={<Outlet />} />}
          >
            <Route index element={<Pages.Categories.List />} />
            <Route path="create" element={<Pages.Categories.Create />} />
            <Route path="edit/:id" element={<Pages.Categories.Edit />} />
          </Route>
          //Links for login Page
          <Route path="login" element={<Pages.Auth.Login />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
