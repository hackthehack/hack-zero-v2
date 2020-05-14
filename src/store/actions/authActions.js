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
const sessionExpired = () => ({
  type: ActionType.LOGGING_IN,
  payload: "EXPIRED"
});
const logginOut = () => ({ type: ActionType.LOGGING_OUT });

const registering = () => ({
  type: ActionType.REGISTERING,
  payload: "PENDING"
});
const registerSuccess = () => ({
  type: ActionType.REGISTERING,
  payload: "SUCCESS"
});

const registerFailed = error => ({
  type: ActionType.REGISTER_FAILED,
  payload: "FAILED",
  message: error
});
export const clearRegister = () => ({
  type: ActionType.CLEAR_REGISTER
});

export const register = (
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) => {
  return async dispatch => {
    dispatch(registering());
    if (password === confirmPassword) {
      let obj = {
        name: firstName + " " + lastName,
        email: email,
        password: password
      };
      try {
        console.log("Request")
        axios
          .post(UrlJoin(process.env.REACT_APP_API_URL, "register"), obj)
          .then(res => {
            if (res.status === 200) {
              dispatch(registerSuccess());
            }
          }).catch(error =>{
            dispatch(registerFailed(error.response.data));
          });
      } catch (error) {
        dispatch(registerFailed(error.response.data));
      }
    }
    else{
      dispatch(registerFailed("Confirmation password does not match"));
    }
  };
};

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
    const {
      auth: { jwt }
    } = getState();
    const body = {
      token: jwt
    };
    if (expired) {
      dispatch(sessionExpired());
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
