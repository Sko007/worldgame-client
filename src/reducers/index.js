import { combineReducers } from 'redux'
import user from './UserReducer'
import auth from "./SignUpReducer"
import lobby from "./Lobbyreducer"
import {Gamereducer} from "./EventReducer"
import {Eventsreducer} from './EventReducer'
import {Eventreducer} from './EventReducer'





export default combineReducers({
  user: user,
  auth: auth,
  lobby: lobby,
  gamerooms: Gamereducer,
  events: Eventsreducer,
  event:Eventreducer


})

