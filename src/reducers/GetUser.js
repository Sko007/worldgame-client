export default function(state = [], action = {}) {
  console.log("check if all User arrive in reducer", action.payload);
  switch (action.type) {
    case "USERS":
      return action.payload;

    default:
      return state;
  }
}
