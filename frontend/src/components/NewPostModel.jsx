import { useQuery, useMutation } from "@tanstack/react-query";
import { forwardRef, useState } from "react";
import { Form, Input, Modal, Button, Stack } from "rsuite";
import { getLoggedInUser } from "../util/http";
import axios from "axios";
import "../styles/NewPostModel.css";

const Textarea = forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));
Textarea.displayName = "Textarea";

export default function NewPostModel() {
  const { data: user, isError, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: getLoggedInUser,
  });

  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    title: "",
    content: "",
    author: user?.name,
    userId: user?.id,
    date: new Date().toISOString(),
  });
  const { mutate: createPost } = useMutation({
    mutationFn: (post) => {
      return axios.post("/posts", post);
    },
  });
  const handleSave = () => {
    console.log(formValue);
    setFormValue((state) => ({ ...state, title: "", content: "" }));
    handleClose();
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    createPost(formValue);
    //clear values
    setFormValue((state) => ({ ...state, title: "", content: "" }));
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