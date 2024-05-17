import { Link, NavLink } from "react-router-dom";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
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
              {user.role == "Admin" && (
                <>
                  <Nav.Item>
                    <NavLink to="/staffs" className="nav-link">
                      <i className="fa-solid fa-clipboard-user"></i>
                      <span className="mx-2">Staffs</span>
                    </NavLink>
                  </Nav.Item>
                </>
              )}
              <Nav.Item>
                <NavLink to="/customers" className="nav-link">
                  <i className="fa-solid fa-people-group"></i>
                  <span className="mx-2">Customers</span>
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/brands" className="nav-link">
                  <i className="fa-brands fa-bandcamp"></i>
                  <span className="mx-2">Brands</span>
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/categories" className="nav-link">
                  <i className="fa-solid fa-layer-group"></i>
                  <span className="mx-2">Categories</span>
                </NavLink>
              </Nav.Item>
            </Nav>
            <Nav>
              <NavDropdown
                title={
                  <>
                    <i className="fa-solid fa-user-circle me-2"></i>
                    {user.name}
                  </>
                }
                align="end"
              >
                <Link className="dropdown-item" to="/profile/edit">
                  <i className="fa-regular fa-pen-to-square"></i> Edit Profile
                </Link>
                <Link className="dropdown-item" to="/profile/password">
                  <i className="fa-solid fa-key"></i> Change Password
                </Link>
                <Link
                  className="dropdown-item"
                  to="/logout"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i> Log
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
