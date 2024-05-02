import { Link, NavLink, Outlet } from "react-router-dom";
import { Container, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export const CmsMenu = () => {
  const user = useSelector((state) => state.user.value);
  return (
    !user && (
      <Navbar bg="dark" expand="lg" data-bs-theme="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            MERN APP
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Item>
                <NavLink to="" className="nav-link">Link</NavLink>
              </Nav.Item>
            </Nav>
            <Nav>
              <NavDropdown title="Demo User" align="end">
                <Link className="dropdown-item" to="">
                  Dropdown Link
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  );
};
