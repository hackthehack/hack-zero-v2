import * as ActionType from "../actions/";

const initialState = {
  users: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_USERS:
      return {
        ...state,
        users: [...state.users, ...action.payload]
      };
    default:
      return state;
  }
};

export default reducer;
