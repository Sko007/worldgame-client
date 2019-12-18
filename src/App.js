import React, { Component } from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import SignUpContainer from "./components/SignUpContainer";
import LoginContainer from "./components/LoginFormContainer";
import LobbyHallContainer from "./components/LobbyHallContainer";
import GameroomContainer from "./components/GameroomContainer"

class App extends Component {
  url = "http://localhost:4000";
  stream = new EventSource(`${this.url}/stream`);

  componentDidMount() {
    this.stream.onmessage = event => {
      const { data } = event;
      const action = JSON.parse(data);
      console.log("app.js action before dispatch", action)
      this.props.dispatch(action);
    };
  }

  render() {

    console.log("see when the App.js rerenders")
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/gameroom/:id" component={GameroomContainer} />
          <Route exact path="/gameroom" component={LobbyHallContainer} />
          <Route exact path="/" component={SignUpContainer} />
          <Route exact path="/signup" component={SignUpContainer} />
          <Route exact path="/login" component={LoginContainer} />
        </Switch>
      </BrowserRouter>
    );
  }
}

// get data from store
function mapStateToProps(state) {
  // state is the current data in the redux store
  console.log("get the whole state in App.js", state);
  // Each property of the object becomes a props of the component
  return {
    messages: state,
     // Inside of the component, this.props.messages will be the entire state of the redux store
  };
}

export default connect(mapStateToProps)(App);
