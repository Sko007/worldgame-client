import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import MapChart from "./Worldmap";

function Worldmap() {
  const [content, setContent] = useState("");

  console.log(content)

  return (
    <div>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default (Worldmap);
