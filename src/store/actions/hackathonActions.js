import * as ActionType from "./index";
import axios from "axios";
const contentfulUrl = "https://cdn.contentful.com";

const getContentOkay = content => ({
  type: ActionType.HACK_A_THON,
  payload: content
});
