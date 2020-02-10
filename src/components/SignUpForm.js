import React from "react";
import { Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SignUpForm = props => (
  <Form style={{display:"flex", flexDirection:"column"}} onSubmit={props.handleSubmit}>
    <Form.Field>
      <label>Username</label>
      <input
        name="username"
        type="text"
        placeholder="Put your Username here"
        value={props.username}
        onChange={props.handleChange}
      />
    </Form.Field>
    <Form.Field>
      <label>Email</label>
      <input
        name="email"
        type="text"
        placeholder="Put your email here"
        value={props.email}
        onChange={props.handleChange}
      />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input
        name="password"
        type="password"
        placeholder="Put your password here"
        value={props.password}
        onChange={props.handleChange}
      />
    </Form.Field>
    <Button type="submit">Submit</Button>

    {/* <Link to="/login">
  <Button >Login</Button>
</Link> */}
  </Form>
);

export default SignUpForm;
