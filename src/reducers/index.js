import { combineReducers } from 'redux'
import user from './UserReducer'
import auth from "./SignUpReducer"
import Gamereducer from "./Gamereducer"
// import {Eventsreducer} from './GameReducer'
// import {Eventreducer} from "./GameReducer"
// import GameLogic from "./GameLogicreducer"





export default combineReducers({
  user: user,
  auth: auth,
  gamerooms: Gamereducer,
  // Gamelogic: GameLogic
  // events: Eventsreducer,
  // event:Eventreducer


})

