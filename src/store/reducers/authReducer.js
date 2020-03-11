import * as ActionType from "../actions/index";
const initialState = {
  isAuth: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      console.log(action);
      return {
        ...state,
        isAuth: true
      };
    default:
      console.log("default");
      return state;
  }
};

export default reducer;
