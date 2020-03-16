import * as ActionType from "./index";
import axios from "axios";
const contentfulUrl = "https://cdn.contentful.com";

const getContentOkay = content => ({
  type: ActionType.HACK_A_THON,
  payload: content
});

export const getHackathonContent = () => {
  return async (dispatch, getState) => {
    //console.log(process.env.REACT_APP_CONTENTFUL_KEY);
    let result = await axios.get(
      `${contentfulUrl}/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.REACT_APP_CONTENTFUL_KEY}&content_type=hackEvent`
    );
    dispatch(getContentOkay(result.data.items));
    //console.log(result.data);
  };
};
