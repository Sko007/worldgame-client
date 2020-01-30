import React, { Component } from "react";
import Game from "./Game";
import superagent from "superagent";
import { connect } from "react-redux";

class Gameroom extends Component {
  state = {
    answerCheck: null,
    answer: null,
    correctAnswer: null
  };

  url = "http://localhost:4000";

  // onClick = async event => {

  //   const jwt = this.props.jwt;

  //   try {
  //     const response = await superagent
  //       .post(`${this.url}/join`)
  //       .set("Authorization", `Bearer ${jwt}`)
  //       .send({});

  //     console.log("response after create room", response);
  //   } catch (error) {
  //     console.warn("error test", error);
  //   }
  // };

  componentDidMount() {
    console.log("this.props.jwt", this.props.jwt);
    superagent
      .post(`${this.url}/question`)
      .set("Authorization", `Bearer ${this.props.jwt}`)
      .send({})
      .then(response => console.log("response", response))
      .catch(console.error);
  }

  checkAnswer = () => {

    if (this.state.answer == this.props.gamelogic.question.answer){

      this.setState({correctAnswer: "Your answer is correct"})
      this.setState({answer:null})

      superagent
        .post(`${this.url}/answerGiven`)

    }else{

      this.setState({correctAnswer: `${this.state.answer} is Wrong, correct is: ${this.props.gamelogic.question.answer}`})
      this.setState({answer:null})




    }



  }

  getAnswer = (id, content) => {
    console.log("check content", content.split(""));
    const arrayContent = content.split("");
    const lastItem = arrayContent[arrayContent.length - 1];


    if (id === this.props.userId && lastItem == "!") {
      if(content == this.props.gamelogic.question.answer){
      console.log("check is answer is correct");
      this.setState({ answer: content });
    } else {
      console.log("check is answer is incorrent");
      this.setState({ answer: content });
    }
  }
}

  render() {
    // if (!gameroom) {
    //   return "No gameroom data";
    // }

    // if (!gameroom.users) {
    //   return "No user data";
    // }
    // if(!this.props.question){

    //   return "No questions yet"
    // }
    // if(!this.props.question.question){

    //   return "No questionid yet"
    // }
    // if(!this.props.question.question.id){

    //   return "No questionid ddyet"
    // }
    // const list = gameroom.users.map(user => {
    //   return <div key={user.id}>{user.username}</div>;
    // });

    // const playerId = gameroom.users.map(user => {

    //   return user.id

    // })

    // console.log("Playerid",playerId)

    // const question = this.props.question
    // console.log("question in gamelogic", question)

    // const NumberOfplayer = gameroom.users.map(user => user.length);
    // console.log(NumberOfplayer);

    // if (NumberOfplayer.length >= 1) {
    // console.log("inside Gameroom", this.props.users.map(players => players.username))
    // console.log("check what is inside that function", this.checkAnswer())

    if (!this.props.gamelogic.question) {
      return "no question arrived";
    }
    return (
      <div>
        <main>
          {/* <h1>The great World-game</h1>
            <p>available Player inside the room:</p>
            {list} */}
          <h1>Players in the Game</h1>
          <span>
            {this.props.users.map(players => {
              return <span>{players.username} </span>;
            })}
          </span>
          <h3 style={{ color: "green" }}>
            {this.props.gamelogic.question.question}?
          </h3>
          <h1>
            This is your Answer:
            {this.state.answer === null ? null : (
              <div>
                <span>{this.state.answer}</span>
                <button onClick={this.checkAnswer}>confirmation</button>
              </div>
            )}
          </h1>
          {<h1>{this.state.correctAnswer}</h1>}
          {/* {this.state.correctAnswer ? <h1>Perfect Brother you got it</h1>:<h3>Wrong the correct Answer is {this.props.gamelogic.question.answer} </h3> } */}
          {/* {this.state.correctAnswer ? `Your answer is Wrong correct is ${this.state.correctAnswer}` : "Your answer is correct"} */}
          {/* <h1>{this.state.correctAnswer === true ? "Your Answer is correct": "Your answer is incorrect"}</h1> */}

          <div>
            <Game
              answer={this.props.gamelogic.question.answer}
              userId={this.props.userId}
              getAnswer={this.getAnswer}

              // playerId={playerId}
              // answer={this.props.question.question.id}
              // jwt={this.props.jwt}
            />
          </div>
        </main>
      </div>
    );
    // } else {
    return (
      <div>
        <h1>wait for a second player...</h1>
        {/* <p>List of available Player {list}</p> */}
      </div>
    );
  }
}
// }

const mapStateToProps = reduxState => {
  console.log("check the mapstateTo props", reduxState.Gamelogic);
  return {
    // jwt: reduxState.user.jwt,
    // gamerooms: reduxState.gamerooms,
    gamelogic: reduxState.Gamelogic
  };
};

export default connect(mapStateToProps)(Gameroom);
