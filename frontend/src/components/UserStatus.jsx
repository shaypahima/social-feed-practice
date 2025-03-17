/* eslint-disable react/prop-types */
import { InlineEdit, Input, Stack, Avatar, Heading, Card } from "rsuite";
import "../styles/UserStatus.css";
import { useGetUserData, useUpdateUserStatus } from "../hooks/authRequests";
import { useState } from "react";
import NewPostModel from "./NewPostModel";

export default function UserStatus({ token }) {
  const { data: user, isError, isFetching } = useGetUserData(token);

  const [status, setStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateUserStatus } = useUpdateUserStatus();

  const handleSave = () => {
    updateUserStatus({ status, token });
    setIsEditing(false);
  };

  return (
    <>
      {isFetching && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {user && (
        <Stack className="user-status-container">
          <Card className="status" direction="row">
            <Card.Header>
              <Avatar
                size="lg"
                bordered
                color="blue"
                circle
                src={user.avatar}
              />
            </Card.Header>
            <Card.Body>
              <Heading style={{ padding: "5px" }} level={6}>
                Hello {user.name.split(" ")[0]}, your current status is:
              </Heading>
              <InlineEdit
                className="status-input"
                placeholder={user.status}
                onChange={setStatus}
                value={status}
                onSave={handleSave}
                onCancel={() => setIsEditing(false)}
                onEdit={() => setIsEditing(true)}
              >
                <Input as="textarea" rows={5} />
              </InlineEdit>
              {!isEditing && <NewPostModel />}
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
        </Stack>
      )}
    </>
  );
}
