import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Game from "./Game"
import Gameroom from "./Gameroom"


class GameroomContainer extends Component {
  componentDidMount() {
  }

  render() {

  
    if(true){


    
    return (
      <div>
          <Game />
          
      </div>
    );
  }

  else{
    
      return(
        <div>
          <Gameroom />

        </div>
      )
    
  }
}
}


export default connect()(GameroomContainer);
