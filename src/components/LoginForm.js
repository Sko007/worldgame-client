import React from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";

export default function CreateForm(props) {
  const { onSubmit, onChange, values } = props;
  const { email, password } = values;

  return (
    <Form style={{display:"flex",flexDirection:"row"}}onSubmit={onSubmit}>
      <Form.Field style={{display:"inline-block"}}>
        <label style={{float:"left"}}>Email</label>

        <input
          type="text"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="email"
        />
      </Form.Field>
      <Form.Field style={{display:"inline-block"}}>
      
        <label style={{float:"left"}}>Password</label>
        <input
          type="text"
              name='password'
              value={password}
              onChange={onChange}
              placeholder='password'
        />
      </Form.Field>
      <Button style={{height:"2%", marginTop:"3%"}} type='submit'>Login</Button> 

    </Form>
  );
}

// <form onSubmit={onSubmit}>

//   <input
//     type='text'
//     name='email'
//     value={email}
//     onChange={onChange}
//     placeholder='email'
//   />

//   <input
//     type='text'
//     name='password'
//     value={password}
//     onChange={onChange}
//     placeholder='password'
//   />

//   <button type='submit'>Submit</button>

// </form>
