import {
  Form,
  Button,
  ButtonToolbar,
  Schema,
  FlexboxGrid,
  Heading,
} from "rsuite";
import { useState, useRef } from "react";
import "../styles/Auth.css";
import TextField from "../components/UI/TextField.jsx";


export default function LoginPage() {
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = () => {
    console.log(formValue, "Form Value");
    
    
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
          <Form
            ref={formRef}
            onChange={setFormValue}
            onCheck={setFormError}
            formValue={formValue}
          >
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
          </Form>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
}
