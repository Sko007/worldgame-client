import React, { Component } from "react";
import { Link } from "react-router-dom";
import superagent from "superagent";
import { connect } from "react-redux";

class LobbyHall extends Component {

  url = "http://localhost:4000";



  onClick = async event => {
    const jwt = this.props.jwt;

    try {
      const response = await superagent
        .put(`${this.url}/join`)
        .set("Authorization", `Bearer ${jwt}`)
        .send({ gameroomId: this.props.id });

      console.log("response after create room", response);
    } catch (error) {
      console.warn("error test", error);
    }
  };

  render() {
    const id = this.props.id;
    const name = this.props.name;
    console.log("check name and id", name, id);

    return (
      <div>
        
        <ul key={id} className="mdc-list mdc-list--two-line">
          <li className="mdc-list-item" tabIndex="0">
            <span className="mdc-list-item__text">
              {name}
              <span className="mdc-list-item__primary-text">
                <Link to={`/gameroom/${id}`}>
                  <button onClick={this.onClick}>Join</button>{" "}
                </Link>
              </span>
              <span className="mdc-list-item__secondary-text">
                {/*future username*/}
              </span>
            </span>
          </li>
        </ul>
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
