import * as ActionType from "../actions";

const initialState = {
  items: {},
  assets: [],
  hackDetails: null,
  assignedHacks: [],
  submission: null,
<<<<<<< HEAD
  loading: false,
=======

  //loading: false,

>>>>>>> master
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.CLEAR_PREV_SUBMISSION:
      return {
        ...state,
        submission: null,
      };
    case ActionType.UNJOIN_HACK:
      console.log(action);
      console.log("unjoin hack from reducer");
      return {
        ...state,
        hackDetails: { ...action.payload },

      };
    case ActionType.FETCH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ActionType.FETCH_ASSET:
      //console.log(action.payload);
      return {
        ...state,
        assets: [...action.payload],
      };
    case ActionType.LOGGING_OUT:
      return {
        ...state,
        assignedHacks: [],
      };
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
      return {
        ...state,
        items: { ...action.payload[0].fields },

        //loading: false,

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
      state = initialState
      return {
        ...state
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
