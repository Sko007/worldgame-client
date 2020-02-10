import React from "react";
import { Button, Card, Image, Icon } from "semantic-ui-react";
import "../Css/Gameroom.css";

const CardExampleGroups = props => (
  <Card.Group>
    <Card>
      <Card.Content>
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
            <Button onClick={props.ready} basic color="green">
              Ready??
          </Button> ): (<h1 style={{color:"red"}}>I am not Ready</h1>)
          
          }
        </div>
      </Card.Content>
    </Card>
  </Card.Group>
);

export default CardExampleGroups;
