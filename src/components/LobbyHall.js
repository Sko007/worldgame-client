import React, { Component } from "react";
import { Link } from "react-router-dom";
import superagent from "superagent";
import { connect } from "react-redux";
import Card from "../components/Items/Card"
import "./Css/Gameroom.css"

class LobbyHall extends Component {

  url = "http://localhost:4000";






  onClick = async (event) => {
    const jwt = this.props.jwt;
    console.log("check this.props.id", this.props.id)
    try {
      const response = await superagent
        .put(`${this.url}/join`)
        .set("Authorization", `Bearer ${jwt}`)
        .send({ gameroomId: this.props.id })
        .then(response => console.log("check the response after joun", response.body))

    } catch (error) {
      console.warn("error test", error);
    }
  };

  render() {
    const id = this.props.id;
    const name = this.props.name;

    return (
      <div >
        <Card name={name} id={id} params={this.props.id} click={this.onCLick}></Card>
        {/* <ul key={id} className="mdc-list mdc-list--two-line">
          <li className="mdc-list-item" tabIndex="0">
            <span className="mdc-list-item__text">
              {name}
              <span className="mdc-list-item__primary-text">
                <Link to={`/gameroom/${id}`}>
                  <button onClick={this.onClick}>Join</button>
                </Link>
              </span>
              <span className="mdc-list-item__secondary-text">
              </span>
            </span>
          </li>
        </ul> */}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    jwt: reduxState.user.jwt
  };
};

export default connect(mapStateToProps)(LobbyHall);
