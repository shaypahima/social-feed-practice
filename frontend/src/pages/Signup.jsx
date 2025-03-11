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
import { useSignup } from "../hooks/authRequests.js";


const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  firstName: StringType().isRequired(),
  lastName: StringType().isRequired(),
  email: StringType().isEmail().isRequired(),
  age: NumberType().range(18, 30),
  password: StringType().isRequired().proxy(["confirmPassword"]),
  confirmPassword: StringType().equalTo("password"),
});

export default function SignupPage() {
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {mutate : signup} = useSignup();

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error("Form Error");
    }
    signup(formValue);
    
    console.log(formValue, "Form Value");
  };

  const handleCheckEmail = () => {
    formRef.current.checkForField("email", (checkResult) => {
      console.log(checkResult);
    });
  };

  return (
    <div className="auth-container">
      <Heading>Sign Up</Heading>
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
            model={model}
          >
            <TextField name="firstName" label="First Name" />
            <TextField name="lastName" label="Last Name" />

            <TextField name="email" label="Email" />
            <TextField
              name="password"
              label="Password"
              type="password"
              autoComplete="off"
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              autoComplete="off"
            />

            <ButtonToolbar>
              <div className="auth-button-toolbar">
                <Button appearance="primary" onClick={handleSubmit}>
                  Sign Up
                </Button>

                <Button onClick={handleCheckEmail}>Check Email</Button>
              </div>
            </ButtonToolbar>
          </Form>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
}
