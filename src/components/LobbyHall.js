import React, { Component } from "react";
import { Link } from "react-router-dom";

class LobbyHall extends Component {


 


  render() {

   

    console.log("See Only Lobbyhall rerenders")
    const gamerooms = this.props.gameroom;
    console.log("How do the gamerooms look like", gamerooms)

    const list = gamerooms.map((game, index) => {
      return (
        <ul key={index} className="mdc-list mdc-list--two-line">
          <li key={game.id} className="mdc-list-item" tabIndex="0">
            <span className="mdc-list-item__text">
              <span className="mdc-list-item__primary-text">
                 {game.name} <Link to={`/gameroom/${game.id}`}><button>Join</button> </Link> 
                
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



