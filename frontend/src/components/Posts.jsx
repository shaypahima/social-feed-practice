import { useEffect, useState } from "react";
import { useGetPosts } from "../hooks/feedRequests";
import SinglePost from "./SinglePost";
import {
  Card,
  Placeholder,
  Heading,
  Message,
  Pagination,
  CardGroup,
} from "rsuite";
import "../styles/Posts.css";

export default function Posts() {
  const [activePage, setActivePage] = useState(1);
  const { data, isError, isFetching, refetch } = useGetPosts(activePage);

  useEffect(() => {
    refetch();
  }, [activePage, refetch]);

  if (isFetching)
    return (
      <div>
        <Card width={320}>
          <Card.Header>
            <Placeholder.Paragraph graph="circle" active />
          </Card.Header>
          <Card.Body>
            <Placeholder.Graph active />
          </Card.Body>
        </Card>
      </div>
    );
  if (isError)
    return <Message showIcon type="error" content="Error fetching posts" />;

  return (
    <div className="posts-container">
      <Heading>Recent Posts</Heading>
      <CardGroup columns={1} spacing={40}>
        {data.posts.map((post) => (
          <SinglePost key={post._id} {...post} userId={post.author} />
        ))}
      </CardGroup>
      <Pagination
        prev
        last
        next
        first
        size="sm"
        total={data.totalItems}
        limit={4}
        className="pagination"
        activePage={activePage}
        onChangePage={(page) => setActivePage(page)}
      />
    </div>
  );
}
