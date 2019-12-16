import React, { Component } from 'react'
import store from './store'
import { Provider } from 'react-redux'
// import { Switch } from "react-router-dom";
import SignUpContainer from "./components/SignUpContainer";
import Login from "./components/LoginFormContainer";


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        

        <SignUpContainer path="/signup" component={SignUpContainer} />
        <Login path="/login" component={Login} />


        
      </Provider>
    );
  }
}

export default App

