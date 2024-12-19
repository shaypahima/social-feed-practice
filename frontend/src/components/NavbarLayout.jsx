import { Outlet } from "react-router";
import CustomNavbar from "./CustomNavbar";
import { Container, Content, Header, Footer } from "rsuite";

export default function NavbarLayout(){

  return(
    <>
      <Container>
        <Header>
          <CustomNavbar/>
        </Header>
        <Content style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem'}}>
          <Outlet/>
        </Content>
        <Footer>Footer</Footer>
      </Container>
    </>
  )
}