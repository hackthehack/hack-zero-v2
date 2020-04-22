import * as ActionType from "./index";
import axios from "axios";
import UrlJoin from "url-join";

export const uploadWarmup = fileID => ({
  type: ActionType.UPLOAD_WARMUP,
  fileID: fileID
});

export const uploadCanceled = fileID => ({
  type: ActionType.FILE_UPLOAD_CANCELLED,
  fileID: fileID
});

export const uploadStart = (fileID, fName) => ({
  type: ActionType.UPLOAD_STARTED,
  fileID: fileID,
  fileName: fName
});
export const uploadProgress = (fileID, progress) => ({
  type: ActionType.UPLOAD_PROGRESS,
  fileID: fileID,
  progress: progress
});

export const uploadComplete = fileID => ({
  type: ActionType.UPLOAD_COMPLETE,
  fileID: fileID
});

export const uploadFailed = fileID => ({
  type: ActionType.UPLOAD_FAILED,
  fileID: fileID
});

export const clearUpload = () => ({
  type: ActionType.CLEAR_UPLOAD
});

export const addPendingFile = fileID => {
  return async dispatch => {
    dispatch(uploadWarmup(fileID));
  };
};

export const cancelFileUpload = fileID => {
  return async dispatch => {
    dispatch(uploadCanceled(fileID));
  };
};

export const uploadprocess = (file, fileID, history) => {
  return async (dispatch, getState) => {
    const fileTracker = getState().upload.uploadFiles;
    dispatch(uploadStart(fileID, file.name));
    let config = {
      headers: {
        Authorization: "Bearer " + getState().auth.jwt
      }
    };
    const fileUpload = axios.post(
      UrlJoin(process.env.REACT_APP_API_URL, `upload`),
      { fileName: `${getState().hack.hackDetails._id}/${file.name}` },
      config
    );
    fileUpload
      .then(res => {
        const url = res.data.fileUploadURL;
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: function(progressEvent) {
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            dispatch(uploadProgress(fileID, percentCompleted));
          }
        };
        axios
          .put(url, file, config)
          .then(() => {
            dispatch(uploadComplete(fileID));
          })
          .then(() => {
            if (fileTracker.indexOf(fileID) === fileTracker.length - 1) {
              axios.post(UrlJoin(process.env.REACT_APP_API_URL, "checkOrphanage"),{
                hackId: getState().hack.hackDetails._id
              }).then(() => {
                history.push(`/hack/${getState().hack.hackDetails._id}`);
              })
            }
          })
          .catch(error => {
            dispatch(uploadFailed(fileID));
            console.log(error);
          });
      })
      .catch(error => {
        dispatch(uploadFailed(fileID));
        console.log(error);
      });
  };
};

export const submitHackIdea = (submitData, history) => {
  return async (dispatch, getState) => {
    let config = {
      headers: {
        Authorization: "Bearer " + getState().auth.jwt
      }
    };
    let files = [];
    for (let file in submitData.files) {
      files.push({
        name: submitData.files[file].name,
        size: submitData.files[file].size,
        type: submitData.files[file].type
      });
    }
    let submissionId = null;
    if (getState().hack.submission !== null) {
      submissionId = getState().hack.submission._id;
    }
    axios
      .post(
        UrlJoin(process.env.REACT_APP_API_URL, "submit"),
        {
          submissionId: submissionId,
          files: files,
          message: submitData.message,
          hackId: getState().hack.hackDetails._id
        },
        config
      )
      .then(() => {
        getState().upload.uploadFiles.map(fileID => {
          if(getState().upload.statuses[fileID].status!== "UPLOADED"){
            dispatch(uploadprocess(submitData.files[fileID], fileID, history));
          }
        });
      });
  };
};
