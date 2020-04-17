import React from "react";

import { render } from "@testing-library/react";
import SubmitHack from "../components/submit-hack";

import { Provider } from "react-redux";
import thunk from "redux-thunk";

import configureStore from "redux-mock-store";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {
    isAuth: false
  },
  hack: {
    hackDetails: {
      title: "a test"
    },
    submission: {
      message: "Testing"
    }
  },
  upload: {
    uploadFiles: []
  }
};

test("If a container exists for displayng the submit form", () => {
  const mockDispatch = jest.fn();
  const store = mockStore(initialState);
  const { getByTestId } = render(
    <Provider store={store}>
      <SubmitHack
        dispatch={mockDispatch}
        match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
      />
    </Provider>
  );
  const grid = getByTestId("main-container");
  expect(grid).toBeInTheDocument();
});
/**
 * hackDetails={{title:"Test title"}}
      submission={{message:"message test"}}
 */
