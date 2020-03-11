import * as ActionType from "./index";
import axios from "axios";

const loginOkay = () => ({ type: ActionType.LOGIN });
export const login = (email, password) => {
  return async (dispatch, getState) => {
    //console.log("inside async login");
    try {
      let result = await axios.post("http://localhost:3001/auth", {
        email,
        password
      });
      dispatch(loginOkay());
    } catch (err) {
      console.log(err);
      console.log("error");
      console.log(err.body);
    }
  };
};
