import UserStatus from "../components/UserStatus.jsx";
import { Container } from "rsuite";
import Posts from "../components/Posts.jsx";
import { AuthContext } from "../context/authContext.jsx";
import { useContext } from "react";

export default function FeedPage() {
  const { isAuth, isPending, init } = useContext(AuthContext);

  init();

  if (isPending) {
    return <h1>Loading...</h1>;
  }
  if (!isAuth) {
    return <h1>Unauthorized</h1>;
  }

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");


  return (
    <>
      <Container>
        <UserStatus userId={userId} token={token} />
        <Posts userId={userId} token={token} />
      </Container>
    </>
  );
}
