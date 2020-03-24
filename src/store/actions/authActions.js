import * as ActionType from "./index";
import axios from "axios";
import UrlJoin from "url-join"

const url = UrlJoin(process.env.REACT_APP_API_URL,"auth");


const loginOkay = userId => ({ type: ActionType.LOGIN, payload: { userId: userId, status: "SUCCESS"} });
const loginingIn = () => ({type: ActionType.LOGINING_IN, payload: "PENDING" })
const loginFailed = () => ({type: ActionType.LOGINING_IN, payload: "FAILED" })

export const login = (email, password, history) => {

  return async (dispatch, getState) => {
    dispatch(loginingIn())
    try {
      let result = await axios.post(url, {
        email,
        password
      });
      const { userId } = result.data;
      dispatch(loginOkay(userId));
      history.push('/hacks')
    } catch (err) {
      dispatch(loginFailed())
    }
  };
};
