import React, { Component } from 'react';
import superagent from "superagent"
import {connect} from "react-redux"
import { Redirect, Link } from 'react-router-dom';




class GamefinishedContainer extends Component {
    url = "http://localhost:4000";

    componentDidMount(){

 superagent
      .post(`${this.url}/destroyGame`)
      .set("Authorization", `Bearer ${this.props.jwt}`)
      .send({ gameroomId: Number(this.props.match.params.id) })
      .then(response => {
        console.log("response from startGameroute", response);
      })
      .catch(console.error);
    }




    render() {
        if(!this.props.jwt){
            return "Loading"
        }
        return (
            <div>
                <h1>werner hat das rennen gemacht</h1>
                <Link to={"/gameroom"}>New Game</Link>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) =>{

    return {
    jwt: reduxState.user.jwt,
        

    }
}

export default connect (mapStateToProps)(GamefinishedContainer);