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

export default function SinglePost({ id, title, content, date }) {


  return (
    <Card className="post-card" direction="row" shaded>
      <img
        src="https://images.unsplash.com/photo-1576606539605-b2a44fa58467?q=80&w=1974&auto=format&fit=crop"
        alt="Shadow"
      />

      <div className="post-card-content">
        <VStack spacing={2}>
          <HStack>
            <Avatar
              style={{ marginLeft: "1rem" }}
              circle
              src="https://i.pravatar.cc/150?u=6"
            />
            <VStack spacing={4}>
              <Text>{"Emily Davis"}</Text>
              <Text muted size="sm">
                {"Project Manager"}
              </Text>
            </VStack>
          </HStack>
          <Card.Header as="h5">{title}</Card.Header>
          <Card.Body>{content}</Card.Body>
          <Card.Footer className="post-card-footer">
            <Text muted>{"Posted on " + date}</Text>
            <ButtonToolbar>
              <IconButton icon={<EditIcon />} />
              <DeletePostModal id={id} />
            </ButtonToolbar>
          </Card.Footer>
        </VStack>
      </div>
    </Card>
  );
}

SinglePost.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};
