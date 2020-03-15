import * as ActionType from "./index";
import axios from "axios";
const devUsersUrl = "http://localhost:3001/userlist";

const fetchUserOkay = users => ({
  type: ActionType.FETCH_USERS,
  payload: users
});

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    let users = await axios.get(devUsersUrl);
    users = users.data;
    dispatch(fetchUserOkay(users));
  };
};
