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

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired(),
  email: StringType().isEmail().isRequired(),
  age: NumberType().range(18, 30),
  password: StringType().isRequired().proxy(["confirmPassword"]),
  confirmPassword: StringType().equalTo("password"),
});

export default function LoginPage() {
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });
  console.log(formError, "Form Error");
  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error("Form Error");
      return;
    }
    console.log(formValue, "Form Value");
  };

  const handleCheckEmail = () => {
    formRef.current.checkForField("email", (checkResult) => {
      console.log(checkResult);
    });
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
            model={model}
          >
            <TextField name="name" label="Username" />
            <TextField name="email" label="Email" />
            <TextField name="age" label="Age" />
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
                  Submit
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
