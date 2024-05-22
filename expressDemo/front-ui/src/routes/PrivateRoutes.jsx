import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "../components";

export const PrivateRoutes = ({ element }) => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      toast.error("Please!! Login to continue.");
      navigate("/login");
    }
  }, [user]);
  return user ? element : <Loading />;
};
