import { CiSettings } from "react-icons/ci";
import {  Nav, Navbar } from "rsuite";
import NavLink from "./UI/CustomLink";
import { MdLogin, MdLogout } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "../util/http";
import LoadingButton from "./UI/LoadingButton";

export default function CustomNavbar() {
  const { data, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: getLoggedInUser,
  });

  const user = data?.user ?? undefined;

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
              <Nav.Item icon={<MdLogin />}>Login</Nav.Item>
              <Nav.Item >Signup</Nav.Item>
            </>
          )}
          <Nav.Item icon={<CiSettings />}>Settings</Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
}
Navbar;
