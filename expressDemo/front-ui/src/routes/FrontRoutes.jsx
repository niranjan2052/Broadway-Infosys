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
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
