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
                      <i className="fa-solid fa-clipboard-user me-2"></i>
                      Staffs
                    </NavLink>
                  </Nav.Item>
                </>
              )}
              <Nav.Item>
                <NavLink to="/customers" className="nav-link">
                  <i className="fa-solid fa-people-group me-2"></i>
                  Customers
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/products" className="nav-link">
                  <i className="fa-brands fa-product-hunt me-2"></i>
                  Products
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/reviews" className="nav-link">
                  <i className="fa-solid fa-star-half-stroke me-2"></i>
                  Reviews
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/orders" className="nav-link">
                  <i className="fa-solid fa-shopping-bag me-2"></i>
                  Orders
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/brands" className="nav-link">
                  <i className="fa-brands fa-bandcamp me-2"></i>
                  Brands
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/categories" className="nav-link">
                  <i className="fa-solid fa-layer-group me-2"></i>
                  Categories
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
