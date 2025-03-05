import PropTypes from "prop-types";
import SaveIcon from "@rsuite/icons/Save";
import CloseIcon from "@rsuite/icons/Close";

import { useState, forwardRef } from "react";
import {
  Form,
  Card,
  VStack,
  Text,
  HStack,
  Avatar,
  IconButton,
  ButtonToolbar,
  Image,
  Input,
  Modal,
  Button,
} from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import DeletePostModal from "./UI/DeletePostModal";
import { useGetPostAuthor, useUpdatePost } from "../hooks/feedRequests";

// Textarea Component
const Textarea = forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));
Textarea.displayName = "Textarea";

export default function SinglePost({
  _id,
  userId,
  title,
  content,
  createdAt,
  imageUrl,
}) {
  const { data: author } = useGetPostAuthor(userId, _id);
  const { mutate: updatePost } = useUpdatePost();
  const date = new Date(createdAt).toDateString();

  const [imageOpen, setImageOpen] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({
    title,
    content,
    author: userId,
  });
  const handleSave = () => {
    setEditMode(false);
    updatePost({ id: _id, updatedPost });
  };

  const openImage = () => {
    setImageOpen(true);
  };
  const closeImage = () => {
    setImageOpen(false);
  };

  return (
    <>
      <Modal open={imageOpen} onClose={closeImage}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Body>
            <Image rounded src={imageUrl} alt={title} width={1240} />
          </Modal.Body>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Card className="post-card" direction="row" shaded>
        <Image
          rounded
          src={imageUrl}
          alt={title}
          width={160}
          onClick={openImage}
        />
        <Form className="post-card-content">
          <VStack alignItems="space-between">
            <div
              className="post-card-post-info"
              style={{ marginLeft: "1rem", marginBottom: "1rem" }}
            >
              <HStack style={{ marginBottom: "1rem" }}>
                <Avatar circle src={author?.avatar} />
                <VStack spacing={4}>
                  <Text>{author?.name}</Text>
                  <Text muted size="sm">
                    {author?.occupation}
                  </Text>
                </VStack>
              </HStack>
              {!editMode ? (
                <>
                  <Card.Header as="h5">{title}</Card.Header>
                  <Card.Body>{content}</Card.Body>
                </>
              ) : (
                <>
                  <Form.Group controlId="title">
                    <Form.Control
                      name="title"
                      placeholder="Title"
                      defaultValue={title}
                      onChange={(value) => {
                        setUpdatedPost({ ...updatedPost, title: value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      name="content"
                      accepter={Textarea}
                      rows={3}
                      placeholder="Content"
                      defaultValue={content}
                      onChange={(value) => {
                        setUpdatedPost({ ...updatedPost, content: value });
                      }}
                    />
                  </Form.Group>
                </>
              )}
            </div>
            <Card.Footer
              className="post-card-footer"
              style={{ marginTop: "1rem" }}
            >
              <Text muted>{"Posted on " + date}</Text>
              <ButtonToolbar className="post-card-footer-buttons">
                {!editMode ? (
                  <IconButton
                    onClick={() => setEditMode((prev) => !prev)}
                    icon={<EditIcon />}
                  />
                ) : (
                  <>
                    <IconButton
                      color="blue"
                      appearance="primary"
                      icon={<SaveIcon />}
                      onClick={handleSave}
                    />
                    <DeletePostModal _id={_id} />
                    <IconButton
                      onClick={() => setEditMode((prev) => !prev)}
                      icon={<CloseIcon />}
                    />
                  </>
                )}
              </ButtonToolbar>
            </Card.Footer>
          </VStack>
        </Form>
      </Card>
    </>
  );
}

SinglePost.propTypes = {
  _id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
