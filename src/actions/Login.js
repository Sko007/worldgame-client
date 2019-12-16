import request from "superagent"

const baseUrl = "http://localhost:4000"



export const JWT = 'JWT'

function jwt (payload) {
  return {
    type: JWT,
    payload
  }
}

export const login = (email, password) => dispatch => {
  request
    .post(`${baseUrl}/login`)
    .send({ email, password })
    .then(response => {
        console.log("test response in thunk", response)
      const action = jwt(response.body.jwt)

      console.log("check the action in thunk", action)

      dispatch(action)
    })
}