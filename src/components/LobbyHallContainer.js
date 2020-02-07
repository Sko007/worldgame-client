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


  componentDidMount(){
    const jwt = this.props.jwt;

      superagent
      .put(`${this.url}/join`)
      .set("Authorization", `Bearer ${jwt}`)
      .send({ gameroomId: null, ready: false, score: null, wait:false, answerGiven:false })
      .then(response => console.log("check the response after joun", response.body))
      .catch(console.error)
    console.log("check id get request is executed")
      superagent
      .get(`${this.url}/fetchUser`)
      .set("Authorization", `Bearer ${jwt}`)
      .then(response => console.log("check the response after fetch all user", response.body))
      .catch(console.error)

      

  }

  //////create a room///////////
  onSubmit = async event => {
    event.preventDefault();
    const jwt = this.props.jwt;

    try {
      const response = await superagent
        .post(`${this.url}/gameroom`)
        .set("Authorization", `Bearer ${jwt}`)
        .send({ name: this.state.text
         });

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
    console.log("check if I fetch all User", this.props.getUser)

    if(!this.props.gamerooms){

      return "no gameroom available"
    }
    if(!this.props.getUser){
      return "no User data available"
    }

    const gamerooms = this.props.gamerooms;
    const getUser = this.props.getUser

    const list = gamerooms.map((game, index) => {
      if(game.gameStarted === false){
      return <LobbyHall key={game.id} name={game.name} id={game.id} />}
    });

    const getUserData =  
     getUser.map((user, index) => {
      return (
        <div>
          <h5>Place number {index +1}. {user.username} {user.totalScore} Points</h5>
        </div>
      )
    })

    // console.log("getUserScore", getUserScore)
    // const getUser = gamerooms.map((gameroom)=> gameroom.users)
    // console.log("getUser in LobbyHallcontainer", getUser)
    // const getScore = getUser.map(user => user.totalScore)
    // const sortScore = getScore.sort((a,b) => a-b)
    // console.log("sortScore", sortScore)

    return (
      <div>
        <h1>Welcome {this.props.username}, lets play a game!</h1>
        <h2>Lobby</h2>
        {getUserData}
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
    console.log("check if I get User", reduxState.getUser)
  return {
    jwt: reduxState.user.jwt,
    gamerooms: reduxState.gamerooms,
    username: reduxState.user.username,
    getUser: reduxState.getUser
  };
};

export default connect(mapStateToProps)(LobbyHallContainer);
