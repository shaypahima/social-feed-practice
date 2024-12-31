import UserStatus from "../components/UserStatus.jsx";
import { Container } from "rsuite";
import Posts from "../components/Posts.jsx";
export default function FeedPage(){

  return(
    <>
      <Container>
        <UserStatus/>
        <Posts/>
      </Container>
    </>
  )
}