import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "react-toastify/React-toastify.min.css";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { CmsMenu } from "./CmsMenu";

export const Layout = () => {
  return (
    <>
      <CmsMenu />
      <Container>
        <Row>
          <Outlet />
        </Row>
      </Container>
    </>
  );
};
