import * as ActionType from "../actions/index";
const initialState = {
  loginStatus: null,
  isAuth: false,
  userId: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      const userId = action.payload.userId;
      const status = action.payload.status;
      return {
        ...state,
        isAuth: true,
        userId,
        loginStatus: status
      };
      case ActionType.LOGGING_IN:
      return {
        ...state,
        loginStatus: action.payload
      };
    default:
      //console.log("default");
      return state;
  }
};

export default reducer;
