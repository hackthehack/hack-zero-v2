import * as ActionType from "./index";
import axios from "axios";
import UrlJoin from "url-join"

const url = UrlJoin(process.env.REACT_APP_API_URL,"auth");


const loginOkay = userId => ({ type: ActionType.LOGIN, payload: userId });

export const login = (email, password) => {

  return async (dispatch, getState) => {
    //console.log("inside async login");
    // console.log("this is inside the async login");
    // console.log(history);
    try {
      let result = await axios.post(url, {
        email,
        password
      });
      //let users = await axios.get(devUsersUrl);
      //users = users.data;

      //console.log(result.data);
      const { userId } = result.data;
      //console.log(userId);
      dispatch(loginOkay(userId));
      return "success"
    } catch (err) {
      return err
    }
  };
};
