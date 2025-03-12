import { Form, Button, ButtonToolbar, FlexboxGrid, Heading } from "rsuite";
import { useState, useRef, useContext} from "react";
import "../styles/Auth.css";
import TextField from "../components/UI/TextField.jsx";
import { AuthContext } from "../context/authContext.jsx";
import { useNavigate } from "react-router";


export default function LoginPage() {
  const navigate = useNavigate();
  const { loginHandler ,isError, error, isSuccess,data} = useContext(AuthContext);
  const formRef = useRef();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = () => {
    loginHandler(formValue);
    if(isSuccess){
      console.log(data)
      navigate("/feed")
    }
  };

  return (
    <div className="auth-container">
      <Heading>Login</Heading>
      <FlexboxGrid className="auth-container">
        <FlexboxGrid.Item colspan={20}>
          {/* {formError && (
            <Message type="error">
              <strong>Error!</strong> {formError?.email}
            </Message>
          )} */}
          <Form ref={formRef} onChange={setFormValue} formValue={formValue}>
            <TextField name="email" label="Email" />
            <TextField
              name="password"
              label="Password"
              type="password"
              autoComplete="off"
            />
            <ButtonToolbar>
              <div className="auth-button-toolbar">
                <Button appearance="primary" onClick={handleSubmit}>
                  Login
                </Button>
              </div>
            </ButtonToolbar>
            {isError && <p>{error.message}</p>}
          </Form>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
}
