import React, { Component } from "react";
import superagent from "superagent";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Gamewon from "./GameWon";
import Gamelose from "./GameLoose";

import "./Css/Gamefinish.css";

// api('/destroyGame', jwt, data)

class GamefinishedContainer extends Component {
//   url = "http://localhost:4000";
  url = "https://worldgame-s.herokuapp.com"


  componentDidMount() {
    superagent
      .post(`${this.url}/destroyGame`)
      .set("Authorization", `Bearer ${this.props.jwt}`)
      .send({ gameroomId: Number(this.props.match.params.id) })
      .then(response => {
      })
      .catch(console.error);
  }

  render() {
    if (!this.props.jwt) {
      return "Loading";
    }
    if (!this.props.gamerooms) {
      return <Link to={"/gameroom"}>New Game</Link>;
    }
    if (!this.props.userId) {
      return "Loading";
    }

    const findGameroom = this.props.gamerooms.find(gameroom => {
      return gameroom.id === Number(this.props.match.params.id);
    });
    const getUser = findGameroom.users;
    const getUserWon = getUser.find(user => user.won === true);


    if (getUserWon === undefined) {
      return (
        <div className="question">
          <Gamewon></Gamewon>
          <h1>Most likly you answered all the Questions or another error</h1>
          <Link to={"/gameroom"}>New Game</Link>
        </div>
      );
    }

    if (getUserWon.id === this.props.userId.userId) {
      return (
        <div className="winner">
          <Gamewon></Gamewon>
          <h1>{this.props.username}made it!</h1>
          <Link to={"/gameroom"}>New Game</Link>
        </div>
      );
    } else {
      return (
        <div className="looser">
          <Gamelose></Gamelose>
          <h1>{this.props.username}made it!</h1>
          <Link to={"/gameroom"}>New Game</Link>
        </div>
      );
    }
  }
}

const mapStateToProps = reduxState => {
  return {
    jwt: reduxState.user.jwt,
    gamerooms: reduxState.gamerooms,
    userId: reduxState.user,
    username: reduxState.user.username
  };
};

export default connect(mapStateToProps)(GamefinishedContainer);
