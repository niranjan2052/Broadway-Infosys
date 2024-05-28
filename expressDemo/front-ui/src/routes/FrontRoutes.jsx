import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "@/components";
import * as Pages from "../pages";
import PageNotFound from "../pages/PageNotFound";
import { PrivateRoutes } from "./PrivateRoutes";

export const FrontRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Pages.Front.Home />}></Route>
          <Route
            path="categories/:id"
            element={<Pages.Front.Category />}
          ></Route>
          <Route
            path="brands/:id"
            element={<Pages.Front.Brand />}
          ></Route>
          <Route
            path="search"
            element={<Pages.Front.Search />}
          ></Route>
          <Route
            path="product/:id"
            element={<Pages.Front.Product />}
          ></Route>
          <Route
            path="register"
            element={<Pages.Auth.Register />}
          ></Route>
          <Route
            path="login"
            element={<Pages.Auth.Login />}
          ></Route>
          <Route
            path="cart"
            element={<PrivateRoutes element={<Pages.Front.Cart />}/>}
          ></Route>
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
