import { SIGN_UP } from '../actions/SignUp'


const initialState = {
  auth: null

}

export default function (state = initialState, action = {}) {

  switch (action.type) {
    case SIGN_UP:
      return {...state, auth: action.payload}
    default:
      return state
  }
}