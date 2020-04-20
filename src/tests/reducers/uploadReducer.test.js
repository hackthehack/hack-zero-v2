import * as ActionType from "../../store/actions";
import { uploadReducer } from "../../store/reducers/uploadReducer";

test("Returns default initialState", () => {
  const action = { type: "default" };
  const initialState = {
    uploadFiles: [],
    statuses: {}
  };
  expect(uploadReducer(undefined, action)).toEqual(initialState);
});
test("Returns state after user adds files for upload", () => {
  const action = { type: ActionType.UPLOAD_WARMUP, fileID: "324421" };
  const expectedState = {
    uploadFiles: ["324421"],
    statuses: {
      324421: {
        status: "PENDING",
        progress: 0
      }
    }
  };
  expect(uploadReducer(undefined, action)).toEqual(expectedState);
});
test("Returns state at beginning of upload", () => {
  const action = {
    type: ActionType.UPLOAD_STARTED,
    fileID: "324421"
  };
  const expectedState = {
    uploadFiles: [],
    statuses: {
      324421: {
        status: "UPLOADING",
        progress: 0
      }
    }
  };
  expect(uploadReducer(undefined, action)).toEqual(expectedState);
});
test("Returns state during upload", () => {
  const action = {
    type: ActionType.UPLOAD_PROGRESS,
    fileID: "324421",
    progress: 80
  };
  const expectedState = {
    uploadFiles: [],
    statuses: {
      324421: {
        status: "UPLOADING",
        progress: 80
      }
    }
  };
  expect(uploadReducer(undefined, action)).toEqual(expectedState);
});
test("Returns state when upload has completed", () => {
  const action = {
    type: ActionType.UPLOAD_COMPLETE,
    fileID: "324421"
  };
  const expectedState = {
    uploadFiles: [],
    statuses: {
      324421: {
        status: "UPLOADED",
        progress: 100
      }
    }
  };
  expect(uploadReducer(undefined, action)).toEqual(expectedState);
});
test("Returns state when file upload is canceled", () => {
  const action = {
    type: ActionType.FILE_UPLOAD_CANCELLED,
    fileID: "324421"
  };
  const initialState = {
    uploadFiles: ['324212','324421','453453'],
    statuses: {
      324421: {
        status: "PENDING",
        progress: 0
      },
      324212:{
        status: "PENDING",
        progress: 0
      },
      453453:{
        status: "PENDING",
        progress: 0
      }
    }
  };
  const expectedState = {
    uploadFiles: ['324212','453453'],
    statuses: {
      324212:{
        status: "PENDING",
        progress: 0
      },
      453453:{
        status: "PENDING",
        progress: 0
      }
    }
  };
  expect(uploadReducer(initialState, action)).toEqual(expectedState);
});
test("Returns state when file upload has failed", () => {
  const action = {
    type: ActionType.UPLOAD_FAILED,
    fileID: "324421"
  };
  const expectedState = {
    uploadFiles: [],
    statuses: {
      324421: {
        status: "UPLOAD_FAILED"
      }
    }
  };
  expect(uploadReducer(undefined, action)).toEqual(expectedState);
});
test("Returns state when upload data has been cleared", () => {
  const action = {
    type: ActionType.CLEAR_UPLOAD
  };
  const initialState = {
    uploadFiles: ['324421','3029312'],
    statuses: {
      324421: {
        status: "UPLOADED",
        progress: 100
      },
      3029312:{
        status: "UPLOADED",
        progress: 100
      }
    }
  };
  const expectedState = {
    uploadFiles: [],
    statuses: {}
  };
  expect(uploadReducer(initialState, action)).toEqual(expectedState);
});