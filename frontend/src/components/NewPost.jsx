import { Stack, Form, Button, Input } from "rsuite";
import { forwardRef } from "react";
import "./NewPost.css";

export default function NewPost() {
  const TextArea = forwardRef((props, ref) => {
    return (
      <Input {...props} className="new-post-input" as="textarea" ref={ref} />
    );
  });
  TextArea.displayName = "TextArea"; // Added display name for the component

  return (
    <Stack className="new-post-container">
      <Form className="new-post-form">
        <Form.Control
          placeholder="Add a New Post"
          rows={5}
          name="new-post"
          label="New Post"
          accepter={TextArea}
          style={{ width: "100%" }}
        />
        <Button appearance="primary">Save</Button>
      </Form>
    </Stack>
  );
}
