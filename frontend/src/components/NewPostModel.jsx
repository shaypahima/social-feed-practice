import { forwardRef, useRef, useState } from "react";
import { Form, Input, Modal, Button, Stack, Uploader, Schema } from "rsuite";
import "../styles/NewPostModel.css";
// import TextField from "./UI/TextField.jsx";
import { useCreatePost } from "../hooks/feedRequests.js";


const { StringType } = Schema.Types;

// Validation Model
const validationModel = Schema.Model({
  title: StringType()
    .isRequired("Title is required")
    .minLength(3, "Title must be at least 3 characters"),
  content: StringType()
    .isRequired("Content is required")
    .minLength(5, "Content must be at least 5 characters"),
});

// Textarea Component
const Textarea = forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));
Textarea.displayName = "Textarea";

// NewPostModal Component
export default function NewPostModal({token, userId}) {
  const formRef = useRef();
  const uploaderRef = useRef();

  const [image, setImage] = useState(null);
  const [formError, setFormError] = useState({});
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    title: "",
    content: "",
    author: userId,
  });

  const { mutate: createPost , isSuccess } = useCreatePost();

  const handleSave = () => {
    const newPost = { ...formValue, image };
    createPost({newPost, token });
    handleClose();
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setFormValue((state) => ({ ...state, title: "", content: "" }));
    setImage(null);
    setFormError({});
    setOpen(false);
  };

  const handleFileChange = (fileList) => {
    if (fileList.length > 1) {
      fileList.splice(1); // Keep only the first file
    }
    setImage(fileList[0] || null);

  };


  return (
    <>
          <Modal open={open} onClose={handleClose} size="sm">
            <Modal.Header>
              <Modal.Title>Create New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                ref={formRef}
                fluid
                model={validationModel}
                checkTrigger="blur"
                formValue={formValue}
                onChange={(value) => {
                  setFormValue(value);
                  setFormError({});
                }}
                onCheck={setFormError}
              >
                <Form.Group controlId="title">
                  <Form.ControlLabel>Title</Form.ControlLabel>
                  <Form.Control name="title" />
                  {formError.title && (
                    <Form.HelpText>{formError.title}</Form.HelpText>
                  )}
                </Form.Group>

                <Form.Group controlId="content">
                  <Form.ControlLabel>Content</Form.ControlLabel>
                  <Form.Control
                    name="content"
                    accepter={Textarea}
                    rows={5}
                  />
                  {formError.content && (
                    <Form.HelpText>{formError.content}</Form.HelpText>
                  )}
                </Form.Group>

                <Form.Group controlId="image">
                  <Form.ControlLabel>Image</Form.ControlLabel>
                  <Uploader
                    ref={uploaderRef}
                    action=""
                    autoUpload={false}
                    multiple={false}
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  if (formRef.current.check()) {
                    handleSave();
                  }
                }}
                appearance="primary"
              >
                Create
              </Button>
              <Button onClick={handleClose} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>

          <Stack className="new-post-container">
            <Button onClick={handleOpen}>Create New Post</Button>
          </Stack>

    </>
  );
}