

const initialState = {
    turn: null,
    question: null,
   
    
  
  }

export default function (state = initialState, action = {}) {
    console.log("action.payload gamelogicreducer", action)
  switch (action.type) {
    case 'TURN':
      return {...state, turn:action.payload}
      case 'QUESTION':
      return {...state, question:action.payload}
      
    default:
      return state
  }
}

