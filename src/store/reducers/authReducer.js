import * as ActionType from "../actions/index";
const initialState = {
  isAuth: false,
  userId: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      console.log(action);
      return {
        ...state,
        isAuth: true,
        userId: action.payload.userId
      };
    default:
      console.log("default");
      return state;
  }
};

export default reducer;
