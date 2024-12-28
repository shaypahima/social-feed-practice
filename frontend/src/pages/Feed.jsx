import UserStatus from "../components/UserStatus.jsx";
import { Container } from "rsuite";
import NewPostModel from "../components/NewPostModel.jsx";
import Posts from "../components/Posts.jsx";
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