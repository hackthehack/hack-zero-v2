import * as ActionType from "../actions/index";
const initialState = {
  isAuth: false,
  userId: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      const userId = action.payload;
      return {
        ...state,
        isAuth: true,
        userId
      };
    default:
      console.log("default");
      return state;
  }
};

export default reducer;
