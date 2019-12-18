// import request from "superagent"


// const baseUrl = "http://localhost:4000"


// export const lobby = data => (dispatch, getState) => {
//     const state = getState()
//     console.log("state for jwt", state)
//     const { jwt } = state.user
  
//     request
//       .post(`${baseUrl}/lobby`)
//       .set('Authorization', `Bearer ${jwt}`)
//       .send(data)
//       .then(response => {


//         console.log("thunk of lobbycomponent", response)
//         const action = name(response.body)
  
//         dispatch(action)
//       })
//       .catch(console.error)
//   }


