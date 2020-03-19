import * as ActionType from "./index";
import axios from "axios";
import UrlJoin  from "url-join"
const usersUrl = UrlJoin(process.env.REACT_APP_API_URL,"userlist");

const fetchUserOkay = users => ({
  type: ActionType.FETCH_USERS,
  payload: users
});

const fetchHackDetails = hack =>({
  type: ActionType.FETCH_HACK_DETAILS,
  payload: hack
})

const joinHackIdea = joiningUser =>({
  type: ActionType.JOIN_HACK,
  payload: joiningUser
})

const editHackIdea = updatedHack =>({
  type: ActionType.UPDATE_HACK,
  payload: updatedHack
})

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    let users = await axios.get(usersUrl);
    users = users.data;
    dispatch(fetchUserOkay(users));
  };
};

export const fetchingHackDetails = (hackId) => {
  return async (dispatch, getState) => {
    let hackDetails = await axios.get(UrlJoin(process.env.REACT_APP_API_URL,`hackdetail`,hackId));
    hackDetails = hackDetails.data;
    dispatch(fetchHackDetails(hackDetails));
  };
};

export const joiningHackIdea = (userId, hackId) => {
  return async (dispatch, getState) => {
    let joinedHackIdea = await axios.post(UrlJoin(process.env.REACT_APP_API_URL, "joinhack"), 
    {
      hackId: hackId,
      userId: userId
    })
    joinedHackIdea = joinedHackIdea.data;
    dispatch(joinHackIdea(joinedHackIdea));
  };
}

export const editingHackIdea = (updatedData, hackId) => {
  return async (dispatch, getState) => {
    let joinedHackIdea = await axios.post(UrlJoin(process.env.REACT_APP_API_URL, "edithack"), 
    {
      ...updatedData,
      hackId: hackId
    })
    joinedHackIdea = joinedHackIdea.data;
    dispatch(editHackIdea(joinedHackIdea));
  };
}
