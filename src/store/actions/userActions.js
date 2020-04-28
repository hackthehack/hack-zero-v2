import * as ActionType from "./index";
import axios from "axios";
import UrlJoin from "url-join";
import { logout } from "./authActions";
import store from "../../setupStore";
const usersUrl = UrlJoin(process.env.REACT_APP_API_URL, "userlist");

const fetchUserOkay = (users) => ({
  type: ActionType.FETCH_USERS,
  payload: users,
});

const fetchHackDetails = (hack) => ({
  type: ActionType.FETCH_HACK_DETAILS,
  payload: hack,
});

const joinHackIdea = (joiningUser) => ({
  type: ActionType.JOIN_HACK,
  payload: joiningUser,
});
const unjoinHackIdea = (unjoiningUser) => ({
  type: ActionType.UNJOIN_HACK,
  payload: unjoiningUser,
});
const editHackIdea = (updatedHack) => ({
  type: ActionType.UPDATE_HACK,
  payload: updatedHack,
});
const likeOkay = (numberLikes) => ({
  type: ActionType.LIKE_HACK,
  payload: numberLikes,
});
const dislikeOkay = (numberLikes) => ({
  type: ActionType.DISLIKE_HACK,
  payload: numberLikes,
});

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    let users = await axios.get(usersUrl);
    users = users.data;
    dispatch(fetchUserOkay(users));
  };
};
export const dislikeHack = () => {
  return async (dispatch, getState) => {
    console.log("dislike hack");
    const { auth, hack } = getState();
    const { jwt, userId } = auth;

    const { hackDetails } = hack;

    const config = {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    };
    const body = {
      hackId: hackDetails._id,
      userId,
    };
    try {
      let result = await axios.post(
        UrlJoin(process.env.REACT_APP_API_URL, "dislikehack"),
        body,
        config
      );
      //console.log(result.data);
      dispatch(dislikeOkay(result.data.numberLikes));
      //console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
};
export const likeHack = () => {
  return async (dispatch, getState) => {
    const { auth, hack } = getState();
    const { jwt, userId } = auth;

    const { hackDetails } = hack;

    const config = {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    };
    const body = {
      hackId: hackDetails._id,
      userId,
    };
    try {
      let result = await axios.post(
        UrlJoin(process.env.REACT_APP_API_URL, "likehack"),
        body,
        config
      );
      //console.log(result.data);
      dispatch(likeOkay(result.data.numberLikes));
      //console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
};
export const fetchingHackDetails = (hackId, userId) => {
  return async (dispatch, getState) => {
    let hackDetails = await axios.get(
      UrlJoin(
        process.env.REACT_APP_API_URL,
        `hackdetail`,
        `${hackId}?userId=${userId}`
      )
    );
    //console.log(hackDetails);
    hackDetails = hackDetails.data;

    dispatch(fetchHackDetails(hackDetails));
  };
};

export const unjoiningHackIdea = () => {
  return async (dispatch, getState) => {
    const config = {
      headers: {
        Authorization: "Bearer " + getState().auth.jwt,
      },
    };
    const body = {
      hackId: getState().hack.hackDetails._id,
      userId: getState().auth.userId,
    };
    try {
      let result = await axios.post(
        UrlJoin(process.env.REACT_APP_API_URL, "unjoinHack"),
        body,
        config
      );
      dispatch(unjoinHackIdea(result.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const joiningHackIdea = (history) => {
  return async (dispatch, getState) => {
    let config = {
      headers: {
        Authorization: "Bearer " + store.getState().auth.jwt,
      },
    };
    const body = {
      hackId: store.getState().hack.hackDetails._id,
      userId: store.getState().auth.userId,
    };
    try {
      let joinedHackIdea = await axios.post(
        UrlJoin(process.env.REACT_APP_API_URL, "joinhack"),
        body,
        config
      );
      joinedHackIdea = joinedHackIdea.data;
      dispatch(joinHackIdea(joinedHackIdea));
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logout(history, true));
      }
    }
  };
};

export const editingHackIdea = (updatedData) => {
  return async (dispatch, getState) => {
    let config = {
      headers: {
        Authorization: "Bearer " + store.getState().auth.jwt,
      },
    };
    let joinedHackIdea = await axios.post(
      UrlJoin(process.env.REACT_APP_API_URL, "edithack"),
      {
        ...updatedData,
        hackId: store.getState().hack.hackDetails._id,
      },
      config
    );
    joinedHackIdea = joinedHackIdea.data;
    dispatch(editHackIdea(joinedHackIdea));
  };
};

export const submitHackIdea = (submitData) => {
  return async (dispatch, getState) => {
    let config = {
      headers: {
        Authorization: "Bearer " + store.getState().auth.jwt,
      },
    };
    await axios.post(
      UrlJoin(process.env.REACT_APP_API_URL, "submit"),
      {
        ...submitData,
        hackId: store.getState().hack.hackDetails._id,
      },
      config
    );
  };
};
