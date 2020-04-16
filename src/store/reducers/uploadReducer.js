import { combineReducers } from "redux";
import * as ActionType from "../actions/index";

const uploadFiles = (state = [], action) => {
  switch (action.type) {
    case ActionType.UPLOAD_WARMUP:
      return [...state, action.fileID];
    case ActionType.FILE_UPLOAD_CANCELLED:
      return state.filter(fileId => fileId !== action.fileID)
    default:
      return state;
  }
};

const statuses = (state = {}, action) => {
  switch (action.type) {
    case ActionType.UPLOAD_WARMUP:
      return {
        ...state,
        [action.fileID]: {
          status: "PENDING",
          progress: 0,
        }
      };
    case ActionType.UPLOAD_STARTED:
      return {
        ...state,
        [action.fileID]: {
          status: "UPLOADING",
          progress: 0,
        }
      };
    case ActionType.UPLOAD_PROGRESS:
      return {
        ...state,
        [action.fileID]: {
          status: "UPLOADING",
          progress: action.progress,
        }
      };
    case ActionType.UPLOAD_COMPLETE:
      return {
        ...state,
        [action.fileID]: {
          status: "UPLOADED",
          progress: 100,
        }
      };
    case ActionType.UPLOAD_FAILED:
      return {
        ...state,
        [action.fileID]: {
          status: "UPLOAD_FAILED",
        }
      };
    case ActionType.FILE_UPLOAD_CANCELLED:
      delete state[action.fileID]
      return{
        ...state
      }
    default:
      return state;
  }
};

export const uploadReducer = combineReducers({
  uploadFiles,
  statuses
});
