import UserStatus from "../components/UserStatus";
import { Container } from "rsuite";
import NewPostModel from "../components/NewPostModel";
import Posts from "../components/Posts";
export default function FeedPage(){

  return(
    <>
      <Container>
        <UserStatus/>
        <NewPostModel/>
        <Posts/>
      </Container>
    </>
  )
}