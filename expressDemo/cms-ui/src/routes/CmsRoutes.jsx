import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components";
import * as Pages from "../pages";
import PageNotFound from "../pages/PageNotFound";

export const CmsRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Pages.Dashboard.List />}></Route>
          <Route path="login" element={<Pages.Auth.Login />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
