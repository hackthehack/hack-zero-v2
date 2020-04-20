import React from "react";
import { render, act } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import FileUI from "../components/subcomponents/upload/file-ui";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);


test("Display One file to the user", () => {
  const initialState = {
    upload: {
      uploadFiles: ['98573'],
      statuses: {
        98573: {
          status: "PENDING",
          progress: 0
        }
      }
    }
  };
  const store = mockStore(initialState);
  const component = (
    <Provider store={store}>
      <BrowserRouter>
        <FileUI file={{name:'Dummy', size: 98573}} index={98573}/>
      </BrowserRouter>
    </Provider>
  );

  const { queryByTestId } = render(component);
  const fileUI = queryByTestId("fileUI");
  expect(fileUI).toBeInTheDocument()
});
