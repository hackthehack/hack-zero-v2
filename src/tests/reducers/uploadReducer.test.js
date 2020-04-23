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
  const action = {
    type: ActionType.UPLOAD_WARMUP,
    fileID: 0,
    file: { name: "Test File", size: "10000", type: "PDF/TYPE" }
  };
  const expectedState = {
    uploadFiles: [{ name: "Test File", size: "10000", type: "PDF/TYPE" }],
    statuses: {
      0: {
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
    fileID: 0
  };
  const expectedState = {
    uploadFiles: [],
    statuses: {
      0: {
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
    fileID: 0,
    progress: 80
  };
  const expectedState = {
    uploadFiles: [],
    statuses: {
      0: {
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
    fileID: 0
  };
  const expectedState = {
    uploadFiles: [],
    statuses: {
      0: {
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
    fileID: 1
  };
  const initialState = {
    uploadFiles: [
      { uploadFiles: [{ name: "Test File", size: "10001", type: "PDF/TYPE" }] },
      { uploadFiles: [{ name: "Test File", size: "10002", type: "PDF/TYPE" }] },
      { uploadFiles: [{ name: "Test File", size: "10003", type: "PDF/TYPE" }] }
    ],
    statuses: {
      0: {
        status: "PENDING",
        progress: 0
      },
      1: {
        status: "PENDING",
        progress: 0
      },
      2: {
        status: "PENDING",
        progress: 0
      }
    }
  };
  const expectedState = {
    uploadFiles: [
      { uploadFiles: [{ name: "Test File", size: "10001", type: "PDF/TYPE" }] },
      { uploadFiles: [{ name: "Test File", size: "10003", type: "PDF/TYPE" }] }
    ],
    statuses: {
      0: {
        status: "PENDING",
        progress: 0
      },
      1: {
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
    fileID: 0
  };
  const expectedState = {
    uploadFiles: [],
    statuses: {
      0: {
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
    uploadFiles: [
      { uploadFiles: [{ name: "Test File", size: "10000", type: "PDF/TYPE" }] },
      { uploadFiles: [{ name: "Test File", size: "10000", type: "PDF/TYPE" }] }
    ],
    statuses: {
      0: {
        status: "UPLOADED",
        progress: 100
      },
      1: {
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
