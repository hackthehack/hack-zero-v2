import * as ActionType from "./index";
import axios from "axios";
import UrlJoin from "url-join";
import { clearHackDetails } from "./hackathonActions";
const url = UrlJoin(process.env.REACT_APP_API_URL, "auth");

const loginOkay = (userId, jwt) => ({
  type: ActionType.LOGIN,
  payload: { userId: userId, status: "SUCCESS", jwt: jwt }
});
const loggingIn = () => ({ type: ActionType.LOGGING_IN, payload: "PENDING" });
const loginFailed = () => ({ type: ActionType.LOGGING_IN, payload: "FAILED" });
const SessionExpired = () => ({
  type: ActionType.LOGGING_IN,
  payload: "EXPIRED"
});
const logginOut = () => ({ type: ActionType.LOGGING_OUT });

export const login = (email, password, history) => {
  return async (dispatch, getState) => {
    dispatch(loggingIn());
    try {
      let result = await axios.post(url, {
        email,
        password
      });
      const { userId } = result.data;
      const jwt = result.data.AuthenticationResult.AccessToken;
      dispatch(loginOkay(userId, jwt));
      history.push("/");
    } catch (err) {
      dispatch(loginFailed());
    }
  };
};

export const logout = (history, expired) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const { jwt } = auth;
    const body = {
      token: jwt
    };
    if (expired) {
      dispatch(SessionExpired());
    }
    try {
      await axios.post(UrlJoin(process.env.REACT_APP_API_URL, "logout"), body);
      history.push("/login");
      dispatch(clearHackDetails());
      dispatch(logginOut());
    } catch (err) {
      console.log(err);
    }
  };
};
