import * as ActionType from "./index";
import axios from "axios";
const devUrl = "http://localhost:3001/auth";
const loginOkay = userId => ({ type: ActionType.LOGIN, payload: userId });
export const login = (email, password) => {
  return async (dispatch, getState) => {
    //console.log("inside async login");
    try {
      let result = await axios.post(devUrl, {
        email,
        password
      });
      dispatch(loginOkay(result.data.userId));
    } catch (err) {
      console.log(err);
      console.log("error");
      console.log(err.body);
    }
  };
};
