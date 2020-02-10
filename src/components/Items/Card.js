import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";


import "../Css/Gameroom.css";
const CardExampleCard = props => (
    <div >
  <Card >
    {/* <Image
      src="../../Statics/world_background.jpg"
      wrapped
      ui={false}
    /> */}
    <Card.Content>
      <Card.Header>{props.name} Gameroom</Card.Header>
      <Card.Meta>
        <span className="date">Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
       The creator of this room has a total Score of: {399} Points
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name="user" />
        <Link to={`/gameroom/${props.params}`}>
          <button onClick={props.click}>Join</button>
        </Link>
      </a>
    </Card.Content>
  </Card>
  </div>
);

export default CardExampleCard;
