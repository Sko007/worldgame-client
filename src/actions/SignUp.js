import request from "superagent"


const baseUrl = "http://localhost:4000"


export const JWT = 'JWT'

function jwt (payload) {
  return {
    type: JWT,
    payload
  }
}

export const SignUp = (email, password, username) => 




    dispatch => {
    request
      .post(`${baseUrl}/signup`)
      .send({ email, password, username })
      .then(response => {
          console.log("test thunk in action.js", response)


        const action = jwt(response.body.jwt)

        console.log("test the jwt actoin", action)
  
        // dispatch(action)
      })
  }