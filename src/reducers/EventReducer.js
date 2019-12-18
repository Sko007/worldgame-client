



export default function reducer ( state = [], action = {}) {
    switch (action.type) {
      case "ALL_GAMEROOMS":

        return action.payload

        case "NEW_GAMEROOM":
        return [...state, action.payload]
      
      default:
        return state
    }
  }