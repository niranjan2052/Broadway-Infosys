import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "react-toastify/dist/react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Layout.css";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
