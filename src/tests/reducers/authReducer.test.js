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
