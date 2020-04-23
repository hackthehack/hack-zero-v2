import * as ActionType from "./index";
import axios from "axios";
import UrlJoin from "url-join";

export const uploadWarmup = (file, fileID) => ({
  type: ActionType.UPLOAD_WARMUP,
  fileID: fileID,
  file: file
});

export const uploadCanceled = (fileID, scrubbedState) => ({
  type: ActionType.FILE_UPLOAD_CANCELLED,
  fileID: fileID,
  scrubbedState: scrubbedState
});

export const uploadStart = (fileID) => ({
  type: ActionType.UPLOAD_STARTED,
  fileID: fileID
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

export const removeFileFromUpload = (fileID) => {
  return async (dispatch, getState) => {
    let fileStatusArray = getState().upload.statuses
    // delete fileStatusArray[fileID];
    let crawler = fileID + 1
    console.log(`length: ${Object.keys(fileStatusArray).length - 1}`)
    for(let key in fileStatusArray){
      console.log(`key: ${key}  crawler: ${crawler}`)
      if(key >= fileID){ 
        if(crawler === (Object.keys(fileStatusArray).length)){
          console.log("Delete")
          delete fileStatusArray[key];
          dispatch(uploadCanceled(fileID, fileStatusArray))
          return
        }
        console.log("Change")
        fileStatusArray[crawler] = fileStatusArray[key]
        crawler++
      }
    }
  }
}

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
            if (fileTracker.indexOf(file) === fileTracker.length - 1) {
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
    let submissionId = null;
    let files = []
    getState().upload.uploadFiles.map(file => {
      files.push({
        name: file.name,
        size: file.size,
        type: files.type
      })
    })
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
        getState().upload.uploadFiles.map((file, fileID) => {
          if(getState().upload.statuses[fileID].status!== "UPLOADED"){
            dispatch(uploadprocess(file, fileID, history));
          }
        });
      });
  };
};
