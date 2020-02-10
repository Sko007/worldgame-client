import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import "../Css/Gameroom.css";

const CardExampleGroups = props => (
  <Card.Group>
    <Card>
      <Card.Content className="card">
        <Image
          floated="right"
          size="mini"
          src="/images/avatar/large/steve.jpg"
        />
        <Card.Header>{props.username}</Card.Header>
        <Card.Meta></Card.Meta>
        <Card.Description>
          A very great Player who is willing to take risk{" "}
          <strong>Strong opponent</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          {props.id === props.outsideId ? (
            <h1 style={{ color: "green" }}>I am ready!!</h1>
            ):(<h1 style={{color:"green"}}>I am Ready</h1>
          )}

        </div>
      </Card.Content>
    </Card>
  </Card.Group>
);

// {user.id === this.props.userId.userId ? (
//     <button
//       style={{ color: "green" }}
//       onClick={this.notReady}
//     >
//       I am ready
//     </button>
//   ) : (
//     <span style={{ color: "green" }}>I am ready</span>
//   )}
export default CardExampleGroups;
