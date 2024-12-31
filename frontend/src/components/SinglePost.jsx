import PropTypes from 'prop-types';
import {
  Card,
  VStack,
  Text,
  HStack,
  Avatar,
  IconButton,
  ButtonToolbar,
} from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import DeletePostModal from "./UI/DeletePostModal";
import { useGetPostAuthor } from "../hooks/feedRequests";

export default function SinglePost({ _id,userId, title, content, createdAt, imageUrl }) {
  const { data: author} = useGetPostAuthor(userId,_id);
  const date = new Date(createdAt).toDateString();
  console.log(imageUrl, "imageUrl");

  return (
    <Card className="post-card" direction="row" shaded>
      <img
        src={imageUrl}
        alt="Shadow"
      />

      <div className="post-card-content">
        <VStack spacing={2}>
          <HStack>
            <Avatar
              style={{ marginLeft: "1rem" }}
              circle
              src={author?.avatar}
            />
            <VStack spacing={4}>
              <Text>{author?.name}</Text>
              <Text muted size="sm">
                {author?.occupation}
              </Text>
            </VStack>
          </HStack>
          <Card.Header as="h5">{title}</Card.Header>
          <Card.Body>{content}</Card.Body>
          <Card.Footer className="post-card-footer">
            <Text muted>{"Posted on " + date}</Text>
            <ButtonToolbar>
              <IconButton icon={<EditIcon />} />
              <DeletePostModal _id={_id} />
            </ButtonToolbar>
          </Card.Footer>
        </VStack>
      </div>
    </Card>
  );
}

SinglePost.propTypes = {
  _id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
