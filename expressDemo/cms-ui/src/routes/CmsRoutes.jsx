import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components";
import * as Pages from "../pages";
import PageNotFound from "../pages/PageNotFound";
import { PrivateRoutes } from "./PrivateRoutes";

export const CmsRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<PrivateRoutes element={<Pages.Dashboard.List />} />}
          ></Route>
          <Route
            path="/profile/edit"
            element={<PrivateRoutes element={<Pages.Profile.Edit />} />}
          ></Route>
          <Route
            path="/profile/password"
            element={<PrivateRoutes element={<Pages.Profile.Password />} />}
          ></Route>
          <Route path="login" element={<Pages.Auth.Login />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
