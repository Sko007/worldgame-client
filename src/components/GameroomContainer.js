import React, { Component } from "react";
import { connect, useStore } from "react-redux";
import { Link } from "react-router-dom";
import Game from "./Game";
import Gameroom from "./Gameroom";
import superagent from "superagent";

class GameroomContainer extends Component {
  url = "http://localhost:4000";

  state = {
    players: null,
    startGame: false
  };


  componentDidMount(){
    superagent
          .post(`${this.url}/startGame`)
          .set("Authorization", `Bearer ${this.props.jwt}`)
          .send({ gameroomId: Number(this.props.match.params.id)

          })
    
          .then(response => {
            console.log("response from startGameroute", response)
          })
          .catch(console.error);
    
      }



  jwt = this.props.jwt;

  ready = () => {
    console.log("check the ready function");

    superagent
      .put(`${this.url}/join`)
      .set("Authorization", `Bearer ${this.jwt}`)
      .send({ ready: true, gameroomId: Number(this.props.match.params.id)  })

      .then(response => {
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


    // if(this.props.gamerooms.questions === undefined){
    //   return "wait for questions"
    // }


    const findGameroom = this.props.gamerooms.find(gameroom => {
      return gameroom.id === Number(this.props.match.params.id);
    });

    const getUser = findGameroom.users;
    const getUserReady = getUser.map(user => user.ready);

    
    const getQuestion = findGameroom.questions.map(question => question.question)
    console.log("findGameroomQestuiosnln", getQuestion)

    const oneQuestion = getQuestion[0]
    console.log("oneQuestion",oneQuestion)
    // const getGameroom = {...findGameroom, questions:[]}
    //   if(!getGameroom.questions){
    //     return "wait for questions"
    //   }
    
    // const getQuestion = getGameroom.questions.map(question=> {
    
    //     console.log("check insidemap", question.question)
    //     return question.question
        
      
    // })
      
    // console.log("getQuestion gameroom", getQuestion)
    
    
    console.log("findroom", findGameroom)

    // const getQuestion = getArray.map(question => question)
    // console.log("getQUestion", getQuestion)

    // const getQuestion = findGameroom.questions
    // console.log("check if question is available", getQuestion, findGameroom)


    console.log(
      "check what the every function does",
      getUser.every(ele => ele.ready === true)
    );

    console.log("check userid", this.props.userId.userId)

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
                return (
                  <div key={user.id}>
                    <p>{user.username}</p>
                    {user.id === this.props.userId.userId ? (
                      <button style={{ color: "red" }} onClick={this.ready}>
                        I am not ready!
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
        </div>
      );
    } else {

      return (
        <div>

          <Gameroom
            params={this.props.match.params.id}
            users={getUser}
            jwt={this.props.jwt}
            userId={this.props.userId.userId}
            gameroom={findGameroom}
            startGame={this.state.startGame}
            // startQuestion={getQuestion}
            oneQuestion={oneQuestion}
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

  };
};

export default connect(mapStateToProps)(GameroomContainer);
