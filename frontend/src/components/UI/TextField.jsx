import { forwardRef } from 'react';
import { Form } from 'rsuite';


const TextField = forwardRef(({ name, label, accepter, ...rest }, ref) => {
  return (
    <Form.Group ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});
TextField.displayName = "TextField";

export default TextField;