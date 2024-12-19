import UserStatus from "../components/UserStatus";
import NewPost from "../components/NewPost";
import { Container } from "rsuite";
export default function FeedPage(){

  return(
    <>
      <Container>
        <UserStatus/>
        <NewPost/>
      </Container>
    </>
  )
}