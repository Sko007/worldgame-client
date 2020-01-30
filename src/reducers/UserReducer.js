import { SAVE_CREDENTIALS } from '../actions/Login'

const initialState = {
  jwt: null,
  username: null,
  userId: null
}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SAVE_CREDENTIALS:
      const { jwt, username, userId } = action.payload;
      return { jwt, username, userId}
    default:
      return state
  }
}