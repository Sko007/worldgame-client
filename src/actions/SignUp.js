import request from "superagent"


// const baseUrl = "http://localhost:4000"
const  baseUrl = "https://worldgame-s.herokuapp.com"


export const SIGN_UP = 'SIGN_UP'

function signup (payload) {
  return {
    type: SIGN_UP,
    payload : payload
  }
}

export const SignUp = (email, password, username) => dispatch => {
    request
      .post(`${baseUrl}/signup`)
      .send({ email, password, username })
      .then(response => {

        const action = signup(response.body.email)

        console.log("test response of Signup", response)
  
        dispatch(action)
      })
  }