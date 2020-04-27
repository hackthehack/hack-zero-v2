import React from "react";
import { render } from "@testing-library/react";
import Register from "../components/register";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

test("Register component Renders", () => {
  const initialState = {
    auth: {
    loginStatus: null,
    isAuth: false,
    userId: null,
    jwt: null,
    registerError: null,
    registerStatus: null
    }
  };
  const store = mockStore(initialState);
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    </Provider>
  );
  expect(container.firstChild).toBeInTheDocument();
});