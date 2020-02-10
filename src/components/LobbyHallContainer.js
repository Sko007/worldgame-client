import React, { Component } from "react";
import { connect } from "react-redux";
import superagent from "superagent";
import LobbyHall from "./LobbyHall";
import { Link } from "react-router-dom";
import "./Css/Gameroom.css";
import { Button, Form } from "semantic-ui-react";
import Header from "../components/Items/Menue copy";
import Table from "../components/Items/Table";

class LobbyHallContainer extends Component {
  url = "http://localhost:4000";

  state = {
    text: ""
  };

  componentDidMount() {
    const jwt = this.props.jwt;

    superagent
      .put(`${this.url}/join`)
      .set("Authorization", `Bearer ${jwt}`)
      .send({
        gameroomId: null,
        ready: false,
        score: null,
        wait: false,
        answerGiven: false
      })
      .then(response =>
        console.log("check the response after joun", response.body)
      )
      .catch(console.error);

    superagent
      .get(`${this.url}/fetchUser`)
      .set("Authorization", `Bearer ${jwt}`)
      .then(response =>
        console.log("check the response after fetch all user", response.body)
      )
      .catch(console.error);
  }

  //////create a room///////////
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
    console.log("check if I fetch all User", this.props.getUser);

    if (!this.props.gamerooms) {
      return "no gameroom available";
    }
    if (!this.props.getUser) {
      return "no User data available";
    }

    const gamerooms = this.props.gamerooms;
    const getUser = this.props.getUser;

    const list = gamerooms.map((game, index) => {
      if (game.gameStarted === false) {
        return <LobbyHall key={game.id} name={game.name} id={game.id} />;
      }
    });

    const getSortedScore = getUser.sort((a, b) => {
      return b.totalScore - a.totalScore;
    });

    console.log("check sortedUser", getSortedScore);
    // .sort((a,b) =>{return getUser.score[a]-getUser.score[b]})

    return (
      <div className="gameroom-container">
        <Header username={this.props.username}></Header>
        <h2>List of the Best</h2>
        <Table sortedUser={getSortedScore} />
        <Form onSubmit={this.onSubmit} className="flexbox-vertical" style={{backgroundColor:"black"}}>
          <Form.Field>
            <input type="text" onChange={this.onChange} value={this.state.text} placeholder="Name of Gameroom"/>
            
          </Form.Field>
          <Button type="submit">Create a Room</Button>
        </Form>

        <div className="gamerooms">{list}</div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  console.log("check if I get User", reduxState.getUser);
  return {
    jwt: reduxState.user.jwt,
    gamerooms: reduxState.gamerooms,
    username: reduxState.user.username,
    getUser: reduxState.getUser
  };
};

export default connect(mapStateToProps)(LobbyHallContainer);
