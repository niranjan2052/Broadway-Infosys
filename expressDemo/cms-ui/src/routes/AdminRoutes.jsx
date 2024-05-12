import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "../components";

export const AdminRoutes = ({ element }) => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.role != "Admin") {
      toast.error("Access Denied");
      navigate("/");
    }
  }, [user]);
  return user ? element : <Loading />;
};
