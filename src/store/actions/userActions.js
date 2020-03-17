import * as ActionType from "./index";
import axios from "axios";
import UrlJoin  from "url-join"
const usersUrl = UrlJoin(process.env.REACT_APP_API_URL,"userlist");

const fetchUserOkay = users => ({
  type: ActionType.FETCH_USERS,
  payload: users
});

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    let users = await axios.get(usersUrl);
    users = users.data;
    dispatch(fetchUserOkay(users));
  };
};
