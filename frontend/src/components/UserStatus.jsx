import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "../util/http";
import {
  Panel,
  Placeholder,
  InlineEdit,
  Input,
  Stack,
  Button,
  Form,
} from "rsuite";
import "./UserStatus.css";
import { forwardRef } from "react";

const TextArea = forwardRef((props, ref) => {
  return <Input {...props} className="new-post-input" as="textarea" ref={ref} />;
});

export default function UserStatus() {
  const { data, isError, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: getLoggedInUser,
  });
  const user = data?.user ?? undefined;

  const handleSave = (value) => {
    console.log(value);
  };

  return (
    <>
      {isFetching && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {user && (
        <Stack
          alignItems="center"
          justifyContent="center"
          style={{ height: "100%", flexDirection: "column" }}
        >
          <Panel
            header={`Hello ${user.name.split(" ")[0]}, your current status is:`}
            bordered
          >
            <>
              <InlineEdit
                className="status-input"
                placeholder={user.status}
                onSave={handleSave}
              >
                <Input as="textarea" rows={5} />
              </InlineEdit>
            </>
          </Panel>
          <Stack bordered className="feeds-container">
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
        </Stack>
      )}
    </>
  );
}
