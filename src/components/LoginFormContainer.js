import React from 'react'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'
import { login } from "../actions/Login"

class LoginFormContainer extends React.Component {
  state = { email: '', password: '' }

  onSubmit = (event) => {
    event.preventDefault()


    const { email, password } = this.state;
    const action = login(email, password);

    console.log("test action in SignupContainer", action)
    this.props.dispatch(action);




    // const { email, password, username } = this.state;
    // const action = SignUp(email, password, username);

    // console.log("test action in SignupContainer", action)
    // this.props.dispatch(action);


  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    return <LoginForm
      onSubmit={this.onSubmit}
      onChange={this.onChange}
      values={this.state}
    />
  }
}

export default connect()(LoginFormContainer);
