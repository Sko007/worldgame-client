import { combineReducers } from 'redux'
import user from './UserReducer'
import auth from "./SignUpReducer"
import lobby from "./Lobbyreducer"
import Gamereducer from "./Gamereducer"
// import {Eventsreducer} from './GameReducer'
// import {Eventreducer} from "./GameReducer"





export default combineReducers({
  user: user,
  auth: auth,
  lobby: lobby,
  gamerooms: Gamereducer,
  // events: Eventsreducer,
  // event:Eventreducer


})

