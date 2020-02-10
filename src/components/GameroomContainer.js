import React, { Component } from "react";
import { connect, useStore } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Gameroom from "./Gameroom";
import superagent from "superagent";
import "./Css/Gameroom.css"
import Header from "./Items/Menue copy"
import UserCardReady from "./Items/userCardready"
import UserCardnotReady from "./Items/userCardnotReady"

class GameroomContainer extends Component {
  url = "http://localhost:4000";

  state = {
    players: null,
    startGame: false,
    wait: false,
    ready: false
  };

  jwt = this.props.jwt;

  componentDidMount() {
    superagent
      .post(`${this.url}/startGame`)
      .set("Authorization", `Bearer ${this.props.jwt}`)
      .send({ gameroomId: Number(this.props.match.params.id) })

      .then(response => {
        console.log("response from startGameroute", response);
      })
      .catch(console.error);
  }

  ready = () => {
    superagent
      .put(`${this.url}/join`)
      .set("Authorization", `Bearer ${this.jwt}`)
      .send({ ready: true, gameroomId: Number(this.props.match.params.id) })

      .then(response => {
        this.setState({ready:true})

        console.log("check the response after boolean change", response);
      })
      .catch(console.error);
  };
  notReady = () => {
    superagent
      .put(`${this.url}/join`)
      .set("Authorization", `Bearer ${this.jwt}`)
      .send({ ready: false, gameroomId: Number(this.props.match.params.id) })
      .then(response => {
        this.setState({ready:false})

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


    if(findGameroom.gameFinished === true){
      console.log("inside if route HIt?", findGameroom.gameFinished)

     return <Redirect to={`/finish/${Number(this.props.match.params.id)}`}/>

    }

    const getUser = findGameroom.users;
    // const getUserReady = getUser.map(user => user.ready);
    const getUserIds = getUser.map(user => user.id);
    const getQuestion = findGameroom.questions.map(
      question => question.question
    );
   const userReady = getUser.every(ele => {return ele.ready === true})

    const questionId = findGameroom.questions.map(question => question.id);
    const firstQuestionId = questionId[0];
    const oneQuestion = getQuestion[0];
  
    if (userReady === false) {
      return (
        <div className="gameroom-container">
          <Header username={this.props.username} />

          <h1>The great World-game</h1>
          <p>available Player inside the room:</p>

          {getUser.map(user => {
            if (user.gameroomId === Number(this.props.match.params.id)) {
              if (user.ready === false) {
                return (
                  <div key={user.id}>

                    <UserCardReady id={user.id} 
                          username={user.username}
                            ready={this.ready}
                            // notReady={this.notReady}
                            outsideId={this.props.userId.userId}
                          >



                          </UserCardReady>
                    {/* <p>{user.username}</p> */}
                    {/* {user.id === this.props.userId.userId ? (
                      <button style={{ color: "red" }} onClick={this.ready}>
                        I am not ready!
                      </button>
                    ) : (
                      <span style={{ color: "red" }}>I am not ready</span>
                    )} */}
                  </div>
                );
              } else {
                return (
                  <div>
                    {/* <p>{user.username}</p> */}

                    <UserCardnotReady id={user.id} 
                          username={user.username}
                            notReady={this.notReady}
                            outsideId={this.props.userId.userId}
                          >



                          </UserCardnotReady>
    
                    {/* {user.id === this.props.userId.userId ? (
                      <button
                        style={{ color: "green" }}
                        onClick={this.notReady}
                      >
                        I am ready
                      </button>
                    ) : (
                      <span style={{ color: "green" }}>I am ready</span>
                    )} */}
                  </div>
                );
              }
            }
          })}
       
        </div>
      );
    } else 
     
    {
      return (
        
        <div>
          <Gameroom
            params={this.props.match.params.id}
            users={getUser}
            jwt={this.props.jwt}
            userId={this.props.userId.userId}
            getUserIds={getUserIds}
            gameroom={findGameroom}
            startGame={this.state.startGame}
            oneQuestion={oneQuestion}
            questionId={firstQuestionId}
            gameFinished={findGameroom.gameFinished}
          />
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
    username: reduxState.user.username,

  };
};

export default connect(mapStateToProps)(GameroomContainer);
