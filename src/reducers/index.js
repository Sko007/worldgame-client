import { combineReducers } from 'redux'
import user from './UserReducer'
import auth from "./SignUpReducer"
import lobby from "./Lobbyreducer"
import gamerooms from "./EventReducer"





export default combineReducers({
  user: user,
  auth: auth,
  lobby: lobby,
  events: gamerooms


})

