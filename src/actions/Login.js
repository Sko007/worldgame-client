import request from "superagent"

const baseUrl = "http://localhost:4000"



export const SAVE_CREDENTIALS = 'SAVE_CREDENTIALS'

function saveCredentials({ jwt, username, userId }) {
  return {
    type: SAVE_CREDENTIALS,
    payload: { jwt, username, userId }
  }
}


export const login = (email, password, userId) => dispatch => {
  request
    .post(`${baseUrl}/login`)
    .send({ email, password })
    // .then(handleErrors)
    .then(response => {
        console.log("test response in thunk", response)
      const action = saveCredentials(response.body)
    //   const err = error(response)

      console.log("check the action in thunk", action)

      dispatch(action)
    })
}