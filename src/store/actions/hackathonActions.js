import * as ActionType from "./index";
import axios from "axios";
//const contentfulUrl = "https://cdn.contentful.com";
const testUrl = "http://localhost:3001/userhacks/";

export const getContentOkay = content => ({
  type: ActionType.FETCH_HACK_A_THON,
  payload: content
});

export const clearHackDetails = content => ({
  type: ActionType.CLEAR_HACK
});
export const getAssignedHacksOkay = hacks => ({
  type: ActionType.FETCH_ASSIGNED_HACKS,
  payload: hacks
});
export const getAssignedHacks = userId => {
  return async (dispatch, getState) => {
    console.log("user is logged in");
    console.log("getting user assigned hacks now");
    let result = await axios.get(`${testUrl}${userId}`);
    console.log(result.data);
  };
};

export const getHackathonContent = () => {
  return async (dispatch, getState) => {
    //console.log(process.env.REACT_APP_CONTENTFUL_KEY);
    let result = await axios.get(
      `${process.env.REACT_APP_CONTENTFUL_API}/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.REACT_APP_CONTENTFUL_KEY}&content_type=hackEvent`
    );
    dispatch(getContentOkay(result.data.items));
    //console.log(result.data);
  };
};

export const clearingHackDetails = () => {
  return async (dispatch, getState) => {
    dispatch(clearHackDetails());
  };
};
