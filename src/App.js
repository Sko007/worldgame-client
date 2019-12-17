import React, { Component } from 'react'
import store from './store'
import { Provider } from 'react-redux'
import { Switch, BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import SignUpContainer from "./components/SignUpContainer";
import LoginContainer from "./components/LoginFormContainer";
import LobbyHall from "./components/LobbyHall"


///move into lobbyhall later
import superagent from "superagent"





class App extends Component {

       url ="http://localhost:4000"
       stream = new EventSource(`${this.url}/stream`)


       state= {

        text:""
       }


       componentDidMount(){
        this.stream.onmessage = event => {
            const {data} = event
            const action = JSON.parse(data)

            console.log("test action", action);
            


        }

       }


       onSubmit = async (event) => {
        event.preventDefault()

        try {
          const response = await superagent
                            .post(`${this.url}/gameroom`)
                            .send ({name: this.state.text})
                            console.log("test the response", response)

        }catch (error){

          console.warn("error test", error)
        }


       }

       onChange = (event) => {

        const {value} = event.target
        this.setState({ text: value})
       }



  render() {

    
    return (
      <BrowserRouter>
       <Provider store={store}>
        

       <form onSubmit={this.onSubmit}>
      <input type="text" onChange={this.onChange} value={this.state.text}/>
      <button>Submit</button>


      </form>

        <Switch>

      


        {/* <Route exact path='/secret-endpoint' component={LobbyHall}/> */}
        <Route exact path='/' component={SignUpContainer}/>
        <Route exact path='/signup' component={SignUpContainer}/>
        <Route exact path='/login' component={LoginContainer}/>
        <Route exact path='/lobbyHall' component={LobbyHall}/>


        </Switch>


      </Provider>
    </BrowserRouter>
      
    );
  }
}

export default App

