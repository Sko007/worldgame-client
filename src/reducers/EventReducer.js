import {EVENTS_FETCHED, EVENT_DELETE_SUCCESS, EVENT_CREATE_SUCCESS,EVENT_FETCHED,EVENT_UPDATE_SUCCESS} from '../actions/Events'


export function Gamereducer ( state = [], action = {}) {
    switch (action.type) {
      case "ALL_GAMEROOMS":

        return action.payload

        case "NEW_GAMEROOM":
        return [...state, action.payload]
      
      default:
        return state
    }
  }



export function Eventsreducer (state = null, action) {
  switch(action.type) {
    case EVENTS_FETCHED:
      return action.events
      
    case EVENT_CREATE_SUCCESS:
      return [action.event, ...state]
      
    case EVENT_DELETE_SUCCESS:
      return state && state.filter(event => event.id !== action.eventId)
    
    default:
      return state
  }
}



export function Eventreducer (state = null, action) {
  switch(action.type) {
    case EVENT_FETCHED:
      return action.event
    
    case EVENT_UPDATE_SUCCESS:
      return action.event
    
    default:
      return state
  }
}