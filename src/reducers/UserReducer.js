import { SAVE_CREDENTIALS } from '../actions/Login'

const initialState = {
  jwt: null,
  username: null,
}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SAVE_CREDENTIALS:
      const { jwt, username } = action.payload;
      return { jwt, username }
    default:
      return state
  }
}