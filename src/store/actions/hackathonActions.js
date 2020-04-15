import * as ActionType from "./index";
import axios from "axios";
import urlJoin from "url-join";
//const contentfulUrl = "https://cdn.contentful.com";
//const testUrl = "http://localhost:3001/userhacks/";
import store from "../../setupStore";

export const getContentOkay = (content) => ({
  type: ActionType.FETCH_HACK_A_THON,
  payload: content,
});
export const getContentAssetOkay = (asset) => ({
  type: ActionType.FETCH_ASSET,
  payload: asset,
});
export const clearHackDetails = (content) => ({
  type: ActionType.CLEAR_HACK,
});
export const getAssignedHacksOkay = (hacks) => ({
  type: ActionType.FETCH_ASSIGNED_HACKS,
  payload: hacks,
});
export const submissionData = (submission) => ({
  type: ActionType.SET_SUBMISSION_DATA,
  payload: submission,
});

export const getAssignedHacks = () => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    if (auth.isAuth) {
      try {
        let result = await axios.get(
          urlJoin(process.env.REACT_APP_API_URL, `userhacks/${auth.userId}`)
        );
        // console.log("inside getAssignedhacks");
        // console.log(result.data);
        dispatch(getAssignedHacksOkay(result.data));
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export const getHackathonContent = () => {
  return async (dispatch, getState) => {
    //console.log(process.env.REACT_APP_CONTENTFUL_KEY);
    try {
      let result = await axios.get(
        `${process.env.REACT_APP_CONTENTFUL_API}/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.REACT_APP_CONTENTFUL_KEY}&content_type=hackEvent`
      );
      // console.log(result.data.includes.Asset[2]);
      // console.log(result.data.includes.Asset[2].fields.file.url);

      dispatch(getContentOkay(result.data.items));
      dispatch(getContentAssetOkay(result.data.includes.Asset));
    } catch (err) {
      console.log(err);
    }

    //console.log(result.data);
  };
};

export const clearingHackDetails = () => {
  return async (dispatch, getState) => {
    dispatch(clearHackDetails());
  };
};

export const getSubmissionData = () => {
  return async (dispatch, getState) => {
    try {
      let result = await axios.get(
        urlJoin(
          process.env.REACT_APP_API_URL,
          `submissionDetails/${store.getState().hack.hackDetails}`
        )
      );
      dispatch(submissionData(result));
    } catch (err) {
      console.log(err);
    }
  };
};
