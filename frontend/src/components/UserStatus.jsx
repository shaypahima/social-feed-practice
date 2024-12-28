import {
  Panel,
  InlineEdit,
  Input,
  Stack,
} from "rsuite";
import "../styles/UserStatus.css";
import { useGetUser, useUpdateUserStatus } from "../hooks/authRequests";
import { useState } from "react";


export default function UserStatus() {
  const { data: user, isError, isFetching } = useGetUser()
  const [status, setStatus] = useState('');

  const { mutate: updateUserStatus } = useUpdateUserStatus();

  const handleSave = () => {
    updateUserStatus(status);
  };

  return (
    <>
      {isFetching && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {user && (
        <Stack className="user-status-container">
          <Panel
            header={`Hello ${user.name.split(" ")[0]}, your current status is:`}
            bordered
          >
            <>
              <InlineEdit
                className="status-input"
                placeholder={user.status}
                onChange={setStatus}
                value={status}
                onSave={handleSave}
              >
                <Input as="textarea" rows={5} />
              </InlineEdit>
            </>
          </Panel>
        </Stack>
      )}
    </>
  );
}
