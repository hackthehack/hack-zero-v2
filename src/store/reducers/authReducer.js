import * as ActionType from "../actions/index";
const initialState = {
  loginStatus: null,
  isAuth: false,
  userId: null,
  jwt: null,
  registerStatus: null,
  registerError: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      const userId = action.payload.userId;
      const jwt = action.payload.jwt;
      return {
        isAuth: true,
        userId,
        loginStatus: action.payload.status,
        jwt,
      };
    case ActionType.LOGGING_IN:
      return {
        ...state,
        loginStatus: action.payload,
      };
    case ActionType.LOGGING_OUT:
      return initialState;
    case ActionType.REGISTERING:
      return { ...state, registerStatus: action.payload, registerError: null };
    case ActionType.REGISTER_FAILED:
      return {
        ...state,
        registerStatus: action.payload,
        registerError: action.message
      };
    case ActionType.CLEAR_REGISTER:
      return {
        ...state,
        registerStatus: null,
        registerError: null
      }
    default:
      return state;
  }
};

export default reducer;
