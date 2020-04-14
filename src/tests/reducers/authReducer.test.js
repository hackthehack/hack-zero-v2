import * as ActionType from "../../store/actions";
import authReducer from "../../store/reducers/authReducer";

test("Auth reducer returns default initialState", () => {
  const action = { type: "dummy_action" };
  const initialState = {
    loginStatus: null,
    isAuth: false,
    userId: null,
    jwt: null
  };
  expect(authReducer(undefined, action)).toEqual(initialState);
});

test("Auth reducer returns correct state after user is login", () => {
  const action = {
    type: ActionType.LOGIN,
    payload: { userId: 1, jwt: "jwtToken", status: "login" }
  };
  const expectedState = {
    isAuth: true,
    userId: 1,
    jwt: "jwtToken",
    loginStatus: "login"
  };
  expect(authReducer(undefined, action)).toEqual(expectedState);
});
