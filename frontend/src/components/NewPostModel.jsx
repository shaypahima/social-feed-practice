import { forwardRef, useRef, useState } from "react";
import { Form, Input, Modal, Button, Stack, Uploader, Schema } from "rsuite";
import "../styles/NewPostModel.css";
import TextField from "./UI/TextField.jsx";
import { useCreatePost } from "../hooks/feedRequests.js";
import { useGetUser } from "../hooks/authRequests.js";

const { StringType } = Schema.Types;
const model = Schema.Model({
  title: StringType()
    .isRequired("Title is required")
    .minLength(3, "Title must be at least 3 characters"),
  content: StringType()
    .isRequired("Content is required")
    .minLength(5, "Content must be at least 5 characters"),
});

const Textarea = forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));
Textarea.displayName = "Textarea";

export default function NewPostModel() {
  const form = useRef()
  const { data: user, isError, isFetching } = useGetUser();

  const [formError, setFormError] = useState({});
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    title: "",
    content: "",
    imageUrl: "",
    author: user?._id,
  });

  const { mutate: createPost } = useCreatePost();

  const handleSave = () => {
    createPost(formValue);
    handleClose();
  };
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
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
              <Form
                ref={form}
                fluid
                model={model}
                checkTrigger="blur"
                onChange={(value) => {
                  setFormValue(value);
                  setFormError({});
                }}
                formValue={formValue}
                onCheck={setFormError}
              >
                <TextField
                  name="title"
                  label="Title"
                  // fieldError={formError.title}
                />
                <TextField
                  name="content"
                  label="Content"
                  accepter={Textarea}
                  rows={5}
                  // fieldError={formError.content}
                />
                <TextField
                  name="image"
                  label="Image"
                  accepter={Uploader}
                  action="#"
                />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={()=>{
                if(form.current.check()){
                  handleSave()
                }
              }} appearance="primary">
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
