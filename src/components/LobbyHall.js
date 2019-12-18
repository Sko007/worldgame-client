import React, { Component } from "react";
import { Link } from "react-router-dom";

class LobbyHall extends Component {


componentDidMount(){
}


  render() {

    console.log("See Only Lobbyhall rerenders")
    const gamerooms = this.props.events;
    console.log("How do the gamerooms look like", gamerooms)

    const list = gamerooms.map((gameroom, index) => {
      return (
        <ul key={index} className="mdc-list mdc-list--two-line">
          <li key={gameroom.id} className="mdc-list-item" tabIndex="0">
            <span className="mdc-list-item__text">
              <span className="mdc-list-item__primary-text">
                 {gameroom.name} <Link to="/waitroom(:id"><button>Join</button> </Link> 
                
              </span>
              <span className="mdc-list-item__secondary-text">
                {/*future username*/}
              </span>
            </span>
          </li>
        </ul>
      );
    });

    console.log("list inside LobbyHall", list)

    return <div>{list}</div>;
  }
}

export default LobbyHall;
