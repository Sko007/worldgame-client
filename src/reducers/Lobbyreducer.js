

const initialState = {
    gamerooms: null
  
  }

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case 'ALL_GAMEROOMS':
      return {...state, gamerooms:action.payload}
    default:
      return state
  }
}

