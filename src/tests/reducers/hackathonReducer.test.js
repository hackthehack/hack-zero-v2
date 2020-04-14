import * as ActionType from "../../store/actions";
import hackathonReducer from "../../store/reducers/hackathonReducer";

test("hackathon reducer returns correct initialState", () => {
  const initialState = {
    items: {},
    assets: [],
    hackDetails: null,
    assignedHacks: []
  };
  const action = { type: "dummy_action" };
  expect(hackathonReducer(undefined, action)).toEqual(initialState);
});

test("hackathon reducer to return correct state after user dislike a hack", () => {
  const payload = 2;
  const action = { type: ActionType.DISLIKE_HACK, payload };
  const expectedState = {
    items: {},
    assets: [],
    assignedHacks: [],
    hackDetails: {
      hasUserLiked: false,
      numberLikes: 2
    }
  };
  expect(hackathonReducer(undefined, action)).toEqual(expectedState);
});

test("hackathon reducer to return correct state after user like a hack", () => {
  const payload = 3;
  const action = { type: ActionType.LIKE_HACK, payload };
  const expectedState = {
    items: {},
    assets: [],
    assignedHacks: [],
    hackDetails: {
      hasUserLiked: true,
      numberLikes: 3
    }
  };
  expect(hackathonReducer(undefined, action)).toEqual(expectedState);
});
