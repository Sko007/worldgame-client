import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Game from "./Game";
import Gameroom from "./Gameroom";
import superagent from "superagent"

class GameroomContainer extends Component {
  
  url = "http://localhost:4000";

  state = {
    text: ""
  };




  render() {

    const gamerooms = this.props.gamerooms

    const gameroom = gamerooms.find(gameroom => gameroom.id === Number(this.props.match.params.id))
    console.log("How does the gameroom look like", gameroom)

    if (!gameroom) {
      return "No gameroom data"
    }

    if (!gameroom.users) {
      return "No user data"
    }

    const list = gameroom.users.map(user =>{

      return (<div key={user.id}>{user.username}</div>)


    })
    return (
      <div>
        {list}
        <Gameroom />
      
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  console.log("inside Lobby see Username", reduxState.gamerooms)
  return {
    jwt: reduxState.user.jwt,
    gamerooms: reduxState.gamerooms

   
  };
};




export default connect(mapStateToProps)(GameroomContainer);
