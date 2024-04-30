import { Link, NavLink, Outlet } from "react-router-dom";
import { Container, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";

export const CmsMenu = () => {
  return (
    <Navbar bg="dark" expand="lg" data-bs-theme="dark">
      <Container>
        <Link to="/" className="navbar-brand">
          MERN APP
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Item>
              <NavLink to="">Link</NavLink>
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
  );
};
