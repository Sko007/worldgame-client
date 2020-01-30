


export default function ( state = [], action = {}) {

  console.log("check the gamerooms reducer", action.payload)
    switch (action.type) {
      case "ALL_GAMEROOMS":

        return action.payload

        case "NEW_GAMEROOM":
        return [...state, action.payload] 
      
      default:
        return state
    }
  }






