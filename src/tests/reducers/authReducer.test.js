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
test("Auth reduer returns correct state after user logged out", () => {
  const action = { type: ActionType.LOGGING_OUT };
  const initialState = {
    loginStatus: null,
    isAuth: false,
    userId: null,
    jwt: null
  };
  const expectedState = {
    loginStatus: null,
    isAuth: false,
    userId: null,
    jwt: null
  };

  expect(authReducer(initialState, action)).toEqual(expectedState);
});
test("Auth reducer returns correct state after user is login", () => {
  const action = {
    type: ActionType.LOGIN,
    payload: { userId: 1, jwt: "jwtToken", status: "login" }
  };
  const initialState = {
    loginStatus: null,
    isAuth: false,
    userId: null,
    jwt: null
  };
  const expectedState = {
    isAuth: true,
    userId: 1,
    jwt: "jwtToken",
    loginStatus: "login"
  };
  expect(authReducer(initialState, action)).toEqual(expectedState);
});
