import * as ActionType from "../../store/actions";
import userReducer from "../../store/reducers/userReducer";

test("User reducer returns default initialState", () => {
  const action = { type: "dummy_action" };
  const initialState = {
    users: []
  };
  expect(userReducer(undefined, action)).toEqual(initialState);
});

test("User reducer returns correct state after fetching", () => {
  const payload = ["Jon", "Mary"];

  const action = { type: ActionType.FETCH_USERS, payload };
  const expectedState = {
    users: ["Jon", "Mary"]
  };
  expect(userReducer(undefined, action)).toEqual(expectedState);
});
