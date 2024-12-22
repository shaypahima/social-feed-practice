import { CiSettings } from "react-icons/ci";
import {  Nav, Navbar } from "rsuite";
import { MdLogin, MdLogout } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "../util/http";
import LoadingButton from "./UI/LoadingButton";
import { NavLink } from "react-router";

export default function CustomNavbar() {
  const { data:user, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: getLoggedInUser,
  });

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
          {isFetching && <Nav.Item as={LoadingButton}></Nav.Item>}
          {user && <Nav.Item icon={<MdLogout />}>Logout</Nav.Item>}
          {!user && !isFetching && (
            <>
              <Nav.Item as={NavLink} to="/login" icon={<MdLogin />}>Login</Nav.Item>
              <Nav.Item as={NavLink} to="/signup">Signup</Nav.Item>
            </>
          )}
          <Nav.Item icon={<CiSettings />}>Settings</Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
}
Navbar;
