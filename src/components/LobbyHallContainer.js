import React, { Component } from "react";
import { connect } from "react-redux";
import superagent from "superagent";
import LobbyHall from "./LobbyHall";
import { Link } from "react-router-dom";


class LobbyHallContainer extends Component {


  url = "http://localhost:4000";

  state = {
    text: ""
  };



  //////create a room
  onSubmit = async event => {
    event.preventDefault();
    const jwt = this.props.jwt;

    try {
      const response = await superagent
        .post(`${this.url}/gameroom`)
        .set("Authorization", `Bearer ${jwt}`)
        .send({ name: this.state.text });

      console.log("response after create room", response);
    } catch (error) {
      console.warn("error test", error);
    }
    this.setState({ text: "" });
  };


  ////changes
  onChange = event => {
    const { value } = event.target;
    this.setState({ text: value });
  };

  render() {
    console.log("see if LobbyContainer rerenders");




    console.log("See Only Lobbyhall rerenders")
    const gamerooms = this.props.gameroom;
    console.log("How do the gamerooms look like", gamerooms)

    const list = gamerooms.map((game, index) => {
      return (

        <LobbyHall key={game.id} name={game.name} id={game.id}  />
   
      );
    });



    return (
      <div>


        


        <h1>Welcome {this.props.username}, lets play a game!</h1>
        <h2>Lobby</h2>

        <form onSubmit={this.onSubmit}>
          <input type="text" onChange={this.onChange} value={this.state.text} />

          <button>Create A Room</button>
        </form>

        <div>{list}</div>

      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  console.log("inside Lobby see Username", reduxState.gamerooms)
  return {
    jwt: reduxState.user.jwt,
    gameroom: reduxState.gamerooms,
    username: reduxState.user.username
  };
};

export default connect(mapStateToProps)(LobbyHallContainer);
