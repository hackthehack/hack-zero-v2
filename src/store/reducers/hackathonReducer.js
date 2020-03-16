import * as ActionType from "../actions";

const initialState = {
  items: {},
  assets: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_HACK_A_THON:
      // console.log("in reducer");
      // console.log(action.payload[0].fields);
      return {
        ...state,
        items: { ...action.payload[0].fields }
      };
    default:
      return state;
  }
};

export default reducer;
