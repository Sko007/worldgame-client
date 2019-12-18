import request from "superagent"

const baseUrl = "http://localhost:4000"



function handleErrors(res) {
    if (res.ok) {
        return res.json();
    } else {
       return res.json().then(err => {throw err;});
    }
}



export const JWT = 'JWT'

function jwt (jwt) {
  return {
    type: JWT,
    payload: jwt
  }
}

// export const ERROR = 'ERROR'


// function error (res) {
//     return {
//       type: "ERROR",
//       payload: res
//     }
//   }


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