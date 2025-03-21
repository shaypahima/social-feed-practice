import { CiSettings } from "react-icons/ci";
import { Nav, Navbar } from "rsuite";
import { MdLogin, MdLogout } from "react-icons/md";
import LoadingButton from "./UI/LoadingButton";
import { NavLink } from "react-router";

import { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";

export default function CustomNavbar() {
  const { isAuth, isPending, logoutHandler } = useContext(AuthContext);

  return (
    <>
      <Navbar>
        <Navbar.Brand href="#">ORBIT</Navbar.Brand>
        <Nav>
          <Nav.Item as={NavLink} href="/feed">
            Feed
          </Nav.Item>
        </Nav>
        <Nav pullRight>
          {isPending && <Nav.Item as={LoadingButton}></Nav.Item>}
          {isAuth && <Nav.Item onClick={logoutHandler} icon={<MdLogout />}>Logout</Nav.Item>}
          {!isAuth && !isPending && (
            <>
              <Nav.Item as={NavLink} to="/login" icon={<MdLogin />}>
                Login
              </Nav.Item>
              <Nav.Item as={NavLink} to="/signup">
                Signup
              </Nav.Item>
            </>
          )}
          <Nav.Item icon={<CiSettings />}>Settings</Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
}
Navbar;
