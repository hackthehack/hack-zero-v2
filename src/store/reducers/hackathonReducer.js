import * as ActionType from "../actions";

const initialState = {
  items: {},
  assets: [],
  hackDetails: null,
  assignedHacks: [],
  submission: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.DISLIKE_HACK:
      return {
        ...state,
        hackDetails: {
          ...state.hackDetails,
          hasUserLiked: false,
          numberLikes: action.payload,
        },
      };
    case ActionType.LIKE_HACK:
      //console.log(action);
      return {
        ...state,
        hackDetails: {
          ...state.hackDetails,
          hasUserLiked: true,
          numberLikes: action.payload,
        },
      };
    case ActionType.FETCH_ASSIGNED_HACKS:
      return {
        ...state,
        assignedHacks: [...action.payload],
      };
    case ActionType.FETCH_HACK_A_THON:
      // console.log("in reducer");
      // console.log(action.payload[0].fields);
      return {
        ...state,
        items: { ...action.payload[0].fields },
      };
    case ActionType.FETCH_HACK_DETAILS:
      return {
        ...state,
        hackDetails: { ...action.payload },
      };
    case ActionType.JOIN_HACK:
      return {
        ...state,
        hackDetails: { ...action.payload },
      };
    case ActionType.UPDATE_HACK:
      return {
        ...state,
        hackDetails: { ...action.payload },
      };
    case ActionType.CLEAR_HACK:
      return {
        ...state,
        hackDetails: null,
      };
    case ActionType.SET_SUBMISSION_DATA:
      //console.log(action.payload);
      return {
        ...state,
        submission: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
