import React, { Component } from "react";
import { connect, useStore } from "react-redux";
import { Link } from "react-router-dom";
import Game from "./Game";
import Gameroom from "./Gameroom";
import superagent from "superagent";

class GameroomContainer extends Component {
  url = "http://localhost:4000";

  state = {
    players: null
  };



  jwt = this.props.jwt;

  ready = () => {
    console.log("check the ready function");

    superagent
      .put(`${this.url}/join`)
      .set("Authorization", `Bearer ${this.jwt}`)
      .send({ ready: true })

      .then(response => {
        console.log("check the response after boolean change", response);
      })
      .catch(console.error);
  };
  notReady = () => {
    console.log("check the ready function");

    superagent
      .put(`${this.url}/join`)
      .set("Authorization", `Bearer ${this.jwt}`)
      .send({ ready: false })
      .then(response => {
        console.log("check the response after boolean change", response);
      })
      .catch(console.error);
  };

  render() {
    if (!this.props.gamerooms) {
      return "to Userdata";
    }
    if (!this.props.userId) {
      return "wait until userdata arrives";
    }

    const findGameroom = this.props.gamerooms.find(gameroom => {
      return gameroom.id === Number(this.props.match.params.id);
    });

    const getUser = findGameroom.users;

    console.log("this.state", this.state);

    console.log("this.props.jwt", this.props.userId.userId);
    const getUserReady = getUser.map(user => user.ready);

    // console.log("getUser ready", getUser.every(ele => ele.ready === true))
    console.log("getUser", getUser);
    console.log(
      "check the ready status",
      getUser.map(ele => ele.ready)
    );

    console.log(
      "check what the every function does",
      getUser.every(ele => ele.ready === true)
    );

    if (
      getUser.every(ele => {
        return ele.ready == true}) === false
    ) {
      return (
        <div>
          <h1>The great World-game</h1>
          <p>available Player inside the room:</p>

          {getUser.map(user => {
            if (user.gameroomId === Number(this.props.match.params.id)) {
              if (user.ready === false) {
                // if(user.id === this.props.userId.userId ){
                return (
                  <div>
                    <p>{user.username}</p>
                    {user.id === this.props.userId.userId ? (
                      <button style={{ color: "red" }} onClick={this.ready}>
                        I am not ready!{" "}
                      </button>
                    ) : (
                      <span style={{ color: "red" }}>I am not ready</span>
                    )}
                  </div>
                );
              } else {
                return (
                  <div>
                    <p>{user.username}</p>

                    {user.id === this.props.userId.userId ? (
                      <button style={{ color: "green" }} onClick={this.ready}>
                        I am ready
                      </button>
                    ) : (
                      <span style={{ color: "green" }}>I am ready</span>
                    )}
                  </div>
                );
              }
            }
          })}
          {getUserReady.every(ele => ele === true) && (
            <button onClick={this.startGame}>play game</button>
          )}
          {/* {getUser.every(ele => ele.startGame === true) && <Gameroom />} */}
        </div>
      );
    } else {
      return (
        <div>

          <Gameroom
            // gamerooms={this.props.gamerooms}
            params={this.props.match.params.id}
            users={getUser}
            jwt={this.jwt}
            userId={this.props.userId.userId}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = reduxState => {
  console.log(
    "check gamerooms in mapstatetoPorps in gameroomcontainer",
    reduxState.gamerooms
  );
  return {
    jwt: reduxState.user.jwt,
    gamerooms: reduxState.gamerooms,
    userId: reduxState.user
  };
};

export default connect(mapStateToProps)(GameroomContainer);
