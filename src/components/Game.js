import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import MapChart from "./Worldmap";
import { useSelector, useDispatch } from "react-redux";
import superagent from "superagent";

function Worldmap(props) {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [prevRender, prevRenderhandler] = useState(true);
  const [answer, setAnswer] = useState()

  console.log("Country content", content);


  console.log("check the answer", props.answer, content )

  // if (props.jwt === null) {
  //   return "no token";
  // }

  
  useEffect(()=> {
    

    
        props.getAnswer(props.userId, content)
    

      
      
    


    },[content])
    


    
    
      // console.log("answer in check answer function", answer)
      
      // console.log("check if the checkanswer function is performed", id,this.props.userId, answer)
  
      
  
  
      

      
      
    // props.checkAnswer(props.userId, content)
    
  //   superagent
  //     .post("http://localhost:4000/answer")
  //     .send({ answer: content, id: props.answer })
  //     .set("Authorization", `Bearer ${jwt}`)
  //     .then(result => {
  //       console.log("result", result);
  //       superagent
  //         .get("http://localhost:4000/question")
  //         .then(result => console.log("result of get new Question", result));
  //     })
  //     .catch(err => console.log(err));
  
  
  
//   if (content && prevRender) {
//     prevRenderhandler(false)
//     const jwt = props.jwt;
// }


return (  
      <div>
      <MapChart setTooltipContent={setContent} />
      <button><ReactTooltip>{content}</ReactTooltip></button>
    </div>
  );
}

export default Worldmap;
