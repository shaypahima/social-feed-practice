import {
  Panel,
  InlineEdit,
  Input,
  Stack,
} from "rsuite";
import "../styles/UserStatus.css";
import useGetUser from "../hooks/authRequsets";

export default function UserStatus() {
  const { data: user, isError, isFetching } = useGetUser()

  const handleSave = (value) => {
    console.log(value);
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
