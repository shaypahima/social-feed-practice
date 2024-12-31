import { forwardRef, useState } from "react";
import { Form, Input, Modal, Button, Stack, Uploader } from "rsuite";
import "../styles/NewPostModel.css";

import { useCreatePost } from "../hooks/feedRequests.js";
import { useGetUser } from "../hooks/authRequests.js";

const Textarea = forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));
Textarea.displayName = "Textarea";

export default function NewPostModel() {
  const {
    data: user,
    isError,
    isFetching,
  } = useGetUser()
  
  const { 
    mutate: createPost,
   } = useCreatePost();

  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    title: "",
    content: "",
    imageUrl: "",
    author: user?._id,
  });

  const handleSave = () => {
    console.log(formValue);
    createPost(formValue);
    handleClose();
  };
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    //clear values
    setFormValue((state) => ({ ...state, title: "", content: ""}));
    setOpen(false);
  };

  return (
    <>
      {isFetching && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {user && (
        <>
          <Modal open={open} onClose={handleClose} size="sm">
            <Modal.Header>
              <Modal.Title>Create New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form fluid onChange={setFormValue} formValue={formValue}>
                <Form.Group controlId="title-9">
                  <Form.ControlLabel>Title</Form.ControlLabel>
                  <Form.Control name="title" />
                  <Form.HelpText>Required</Form.HelpText>
                </Form.Group>
                <Form.Group controlId="content-9">
                  <Form.ControlLabel>Content</Form.ControlLabel>
                  <Form.Control rows={5} name="content" accepter={Textarea} />
                </Form.Group>
                <Form.Group controlId="image-9">
                  <Form.ControlLabel>Image:</Form.ControlLabel>
                  <Form.Control
                    name="image"
                    accepter={Uploader}
                    action="#"
                    onChange={(value) => {
                      console.log(value);
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleSave} appearance="primary">
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
      )}
    </>
  );
}
