import request from "superagent"

const baseUrl = "http://localhost:4000"



export const JWT = 'JWT'

function jwt (jwt) {
  return {
    type: JWT,
    payload: jwt
  }
}


export const login = (email, password) => dispatch => {
  request
    .post(`${baseUrl}/login`)
    .send({ email, password })
    // .then(handleErrors)
    .then(response => {
        console.log("test response in thunk", response)
      const action = jwt(response.body.jwt)
    //   const err = error(response)

      console.log("check the action in thunk", action)

      dispatch(action)
    })
}