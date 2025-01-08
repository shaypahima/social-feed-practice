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


  
  const [validation, setValidation] = useState({});


  const validate = () => {
    const { title, content } = formValue;
    if(title.length < 3 || content.length < 10){
      if(title.length < 3) {
        setValidation((state) => ({ ...state, title: 'Title must be at least 3 characters' }));
      }
      if(content.length < 10) {
        setValidation((state) => ({ ...state, content: 'Content must be at least 10 characters' }));
      }
    }else{
      createPost(formValue);
      handleClose();
    }
  }

  
  const handleSave = () => {
    console.log(formValue);
    validate();
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
              <Form  fluid onChange={(value) => {
               setFormValue(value) 
               setValidation({})
              }} formValue={formValue}>
                <Form.Group controlId="title-9">
                  <Form.ControlLabel>Title</Form.ControlLabel>
                  <Form.Control name="title" />
                  <Form.HelpText>{validation.title}</Form.HelpText>
                </Form.Group>
                <Form.Group controlId="content-9">
                  <Form.ControlLabel>Content</Form.ControlLabel>
                  <Form.Control rows={5} name="content" accepter={Textarea} />
                  <Form.HelpText>{validation.content}</Form.HelpText>
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
                  <Form.HelpText>{validation.image}</Form.HelpText>
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
