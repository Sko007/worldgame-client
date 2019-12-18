import { JWT } from '../actions/Login'

const initialState = {
  jwt: null

}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case JWT:
      return {...state, jwt:action.payload}
    default:
      return state
  }
}