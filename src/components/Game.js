import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import MapChart from "./Worldmap";
import { useSelector, useDispatch } from "react-redux";
import superagent from "superagent";

function Worldmap(props) {

  const [content, setContent] = useState("");
  const [prevRender, prevRenderhandler] = useState(true);

  console.log("Country content", content);
  
  
  useEffect(() => {
    const  url = "http://localhost:4000";
    props.getAnswer(props.userId, content);
    // props.checkAnswer(props.userId)
    superagent
    .post(`${url}/gameStarted`)
    .set("Authorization", `Bearer ${props.jwt}`)
    .send({ gameroomId: Number(props.params) })

    .then(response => {
      console.log("response from startGameroute", response);
    })
    .catch(console.error);
    

  }, [content]);

  return (
    <div>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default Worldmap;
