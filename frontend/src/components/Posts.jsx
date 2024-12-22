import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../util/http";
import { useState } from "react";
import {
  Card,
  VStack,
  TagGroup,
  Tag,
  Text,
  Placeholder,
  Heading,
  Message,
  Pagination,
} from "rsuite";
import "./posts.css";

export default function Posts() {
  const [activePage, setActivePage] = useState(1);
  const {
    data: posts,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

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
      {posts.map((post) => (
        <Card className="post-card" direction="row" shaded key={post.id}>
          <img
            src="https://images.unsplash.com/photo-1576606539605-b2a44fa58467?q=80&w=1974&auto=format&fit=crop"
            alt="Shadow"
          />
          <VStack spacing={2}>
            <Card.Header as="h5">{post.title}</Card.Header>
            <Card.Body>{post.content}</Card.Body>
            <Card.Footer>
              <TagGroup>
                <Tag size="sm">🐶 Dog</Tag>
                <Tag size="sm">☀️ Sunny</Tag>
                <Tag size="sm">🌈 Rainbow</Tag>
              </TagGroup>
              <Text muted>{post.date}</Text>
            </Card.Footer>
          </VStack>
        </Card>
      ))}
      <Pagination
        prev
        last
        next
        first
        size="sm"
        total={20}
        limit={5}
        activePage={activePage}
        onChangePage={(page) => setActivePage(page)}
      />
    </div>
  );
}
