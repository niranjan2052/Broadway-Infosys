import { Link, NavLink } from "react-router-dom";
import { Container, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeStorage } from "@/lib";
import { clearUser } from "@/store";

export const CmsMenu = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();

    removeStorage("mern");
    dispatch(clearUser());
  };
  return (
    user && (
      <Navbar bg="dark" expand="lg" data-bs-theme="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            MERN APP
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Item>
                <NavLink to="" className="nav-link">
                  Link
                </NavLink>
              </Nav.Item>
            </Nav>
            <Nav>
              <NavDropdown
                title={
                  <>
                    <i className="fa-solid fa-user-circle me-2"></i>
                    {user}
                  </>
                }
                align="end"
              >
                <Link
                  className="dropdown-item"
                  to="/logout"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-arrow-fight-from-bracket"></i>Log
                  Out
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  );
};
