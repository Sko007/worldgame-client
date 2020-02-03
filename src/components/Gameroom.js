import React, { Component } from "react";
import Game from "./Game";
import superagent from "superagent";
import { connect } from "react-redux";

class Gameroom extends Component {
  state = {
    answerCheck: null,
    answer: null,
    correctAnswer: null,
    answerGiven: false,
    gameStart:true,
  };

  url = "http://localhost:4000";








  checkAnswer = () => {


    // if (this.state.answer == this.props.gamelogic.question.answer) {
    //   this.setState({ correctAnswer: "Your answer is correct" });
    //   this.setState({ answer: null });
    // } else {
    //   this.setState({
    //     correctAnswer: `${this.state.answer} is Wrong......... correct is: ${this.props.gamelogic.question.answer}`
    //   });
    //   this.setState({ answer: null });

      superagent
        .post(`${this.url}/checkAnswer`)
        .set("Authorization", `Bearer ${this.props.jwt}`)
        .send({ answerGiven: true, 
          answer:this.state.answer,
           questionId: this.props.questionId,
           gameroomId: Number(this.props.params)
          })
        .then(response => {
                    console.log("check response of question route", response)}
          )
    //       if (
    //         this.props.users.every(user => user.answerGiven === true) === true
    //       ) {
    //         superagent
    //           .post(`${this.url}/question`)
    //           .set("Authorization", `Bearer ${this.props.jwt}`)
    //           .send({})
    //           .then(response => {
    //             console.log(
    //               "response after clear the usermodel",
    //               response.text
    //             );
    //             superagent
    //               .post(`${this.url}/clearAnswers`)
    //               .set("Authorization", `Bearer ${this.props.jwt}`)
    //               .send({ userId: this.props.users.map(user => user.id) })
    //               .then(response => {
    //                 console.log("response", response);
    //               });
    //           })
    //           .catch(console.error);
    //       } else {
    //       }
    //     })
    //     .catch(console.error);
    // }
  };

  getAnswer = (id, content) => {
    console.log("check content", content.split(""));
    const arrayContent = content.split("");
    const lastItem = arrayContent[arrayContent.length - 1];

    if (id === this.props.userId && lastItem == "!") {
      if (content === null ) {
        this.setState({ answer: content });
      } else {
        this.setState({ answer: content });
      }
    }
  };


  render() {

      if(!this.props.gamerooms){

        return "Gamerooms are not arrived yet"
      }

      // const checkQuestion = this.props.gamerooms.questions.map(question =>{
      //     return 

     
      // console.log("startQUestion", startQuestion)


    return (
      <div>
        <main>
          <h1>Players in the Game</h1>
          <span>
            {this.props.users.map(players => {
              return (
                <div>
              <span key={players.id}>{players.username} </span>
                  <p>{players.score} Points</p>
              </div>)
            })}
          </span>
          <h1>{this.props.oneQuestion}?</h1>
         <h4>This is your answer <h3 style={{ color: "green" }}> {this.state.answer}
          {this.state.answer ? <button onClick={this.checkAnswer}>confirmation</button> : null}
          </h3> </h4>
       

          <div>
            <Game
              gamerooms={this.props.gamerooms}
              userId={this.props.userId}
              getAnswer={this.getAnswer}
            />
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  console.log("check Mapstatetoprops in gamelogic ", reduxState.gamerooms);
  return {
    gamerooms: reduxState.gamerooms,
  };
};

export default connect(mapStateToProps)(Gameroom);
