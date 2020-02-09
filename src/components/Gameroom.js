import React, { Component } from "react";
import Game from "./Game";
import superagent from "superagent";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class Gameroom extends Component {
  state = {
    answerCheck: null,
    answer: null,
    correctAnswer: null,
    answerGiven: false,
    gameStart: true,
    wait: false
  };

  url = "http://localhost:4000";


  componentDidMount() {
   
  }

  checkAnswer = () => {
    superagent
      .put(`${this.url}/checkAnswer`)
      .set("Authorization", `Bearer ${this.props.jwt}`)
      .send({
        answer: this.state.answer,
        gameroomId: Number(this.props.params),
        questionId: this.props.questionId
      })
      .then(response => {
        superagent
          .post(`${this.url}/newQuestion`)
          .set("Authorization", `Bearer ${this.props.jwt}`)
          .send({
            gameroomId: Number(this.props.params),
            questionId: this.props.questionId
          })
          .then(response => {
            console.log("users in gameroom", this.props.users);

            console.log("check the response of newQuestion", response);
          })
          .catch(console.error);
      })
      .catch(console.error);
  };

  getAnswer = (id, content) => {
    console.log("check content", content.split(""));
    const arrayContent = content.split("");
    const lastItem = arrayContent[arrayContent.length - 1];

    if (id === this.props.userId && lastItem == "!") {
      if (content === null) {
        this.setState({ answer: content });
      } else {
        this.setState({ answer: content });
      }
    }
  };
  finishGame = () =>{

    superagent
    .put(`${this.url}/checkAnswer`)
    .set("Authorization", `Bearer ${this.props.jwt}`)
    .send({
      answer: this.state.answer,
      gameroomId: Number(this.props.params),
      questionId: this.props.questionId
    })
    .then(response => {
      superagent
        .post(`${this.url}/newQuestion`)
        .set("Authorization", `Bearer ${this.props.jwt}`)
        .send({
          gameroomId: Number(this.props.params),
          questionId: this.props.questionId
        })
        .then(response => {
          console.log("users in gameroom", this.props.users);

          console.log("check the response of newQuestion", response);
        })
        .catch(console.error);
    })
    .catch(console.error);

  }

  render() {
    if (!this.props.gamerooms) {
      return "Gamerooms are not arrived yet";
    }
   
    
    if(this.props.oneQuestion === undefined && this.props.gameFinished){

      return <Redirect to={`/finish/${Number(this.props.params)}`}/>
 
    }

    const userWait = this.props.users.every(ele => {
      return ele.wait === false;
    });
    console.log("value of user Wait", userWait);
    // if (userWait === true ) {
    return (
      <div>
        <main>
          <h1>Players in the Game</h1>
          <span>
            {this.props.users.map(players => {
              return (
                <div key={players.id}>
                  <span>{players.username} </span>
                  <p>{players.score} Points</p>
                </div>
              );
            })}
          </span>
         
          <h1>{this.props.oneQuestion === undefined ? <button onClick={this.finishGame}>No Questions Left click to end the game!</button>:this.props.oneQuestion}?</h1>
          {/* <h1>{this.props.oneQuestion}?</h1> */}
          <div>
            This is your answer{" "}
            <h3 style={{ color: "green" }}>
              {this.state.answer}
              {this.state.answer ? (
                <button onClick={this.checkAnswer}>confirmation</button>
              ) : null}
            </h3>
          </div>

          <div>
            {this.props.users.map(user => {
              console.log(
                "map the gamerooms",
                user.wait,
                user.id,
                this.props.userId
              );
              if (user.wait === false && user.id === this.props.userId) {
                console.log(
                  "map the user aloong",
                  user.id,
                  this.props.userId,
                  this.state.wait
                );
                return (
                  <Game
                    key={user.id}
                    userId={user.id}
                    getAnswer={this.getAnswer}
                    checkAnswer={this.checkAnswer}
                    users={this.props.users}
                    jwt={this.props.jwt}
                    params={this.props.params}
                  />
                );
              }
            })}
            <h1>please wait until everyone answered the question</h1>
          </div>
        </main>
      </div>
    );
    // } else {
    // return (
    //   <div>
    //     <h1>Players in the Game</h1>
    //     <span>
    //       {this.props.users.map(players => {
    //         return (
    //           <div key={players.id}>
    //             <span >{players.username} </span>
    //             <p>{players.score} Points</p>
    //           </div>
    //         );
    //       })}
    //     </span>
    //     <h1>{this.props.oneQuestion}?</h1>
    //     <h1>your answer is {this.state.answer}</h1>
    //     <h1>Please wait until every User has responded</h1>

    //   </div>
    // );
  }
}
// }

const mapStateToProps = reduxState => {
  console.log(
    "check Mapstatetoprops in in gamerooms, gamerooms ",
    reduxState.gamerooms
  );
  return {
    gamerooms: reduxState.gamerooms
  };
};

export default connect(mapStateToProps)(Gameroom);
