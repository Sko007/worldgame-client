import React, { Component } from "react";
import Game from "./Game";
import superagent from "superagent";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Header from "../components/Items/MenuGameroom"
import "./Css/Gameroom.css"
import { Button } from 'semantic-ui-react'



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
              this.setState({answer:null})
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
    return (
      <div >
        <Header  users={this.props.users} userId={this.props.userId} />

    
         <div className="flexbox-vertical">
          <h1 style={{color:"gold"}}>{this.props.oneQuestion === undefined ? <Button onClick={this.finishGame}>No Questions Left click to end the game!</Button>:this.props.oneQuestion}?</h1>
          
                <h3>Player who scores first 100 Points wins</h3>
          <div>
            {this.state.answer === null ? <h5>Click on a country to log your answer.</h5>: <h5>This is your answer:</h5>}
            <h1 className="flexbox-vertical" style={{ color: "black" }}>
              {this.state.answer}
              {this.state.answer ? (
                  <Button onClick={this.checkAnswer} secondary>send answer</Button>

              ) : null}
            </h1>
          </div>
          </div>

          <div>
            <div>
            {this.props.users.map(user => {
              if (user.wait === false && user.id === this.props.userId) {
           
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
          </div>
      </div>
    );

  }
}

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
