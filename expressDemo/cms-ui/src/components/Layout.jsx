import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { CmsMenu } from "./CmsMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fromStorage, removeStorage } from "../lib";
import { setUser } from "@/store";
import http from "@/http";
import { Loading } from "@/components";

export const Layout = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      const token = fromStorage("mern");
      if (token) {
        setLoading(true);
        http
          .get("/profile")
          .then(({ data }) => dispatch(setUser(data.name)))
          .catch((err) => removeStorage("mern"))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [user]);
  return (
    <>
      <CmsMenu />
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <Row>
            <Outlet />
          </Row>
        )}
      </Container>
    </>
  );
};
