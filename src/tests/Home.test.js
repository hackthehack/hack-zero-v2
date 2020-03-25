import React from "react";
import { render } from "@testing-library/react";

import { Provider } from "react-redux";
import ReduxConnectedHome from "../components/Home";
import thunk from "redux-thunk";

import configureStore from "redux-mock-store";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {
    isAuth: false
  },
  hack: {
    items: {
      title: "a test",
      information: "a information",
      status: "active",
      theme: "a testing theme"
    },
    assignedHacks: []
  }
};
test("<Home/> component heading should be rendered in the page", () => {
  const store = mockStore(initialState);
  const { getByTestId } = render(
    <Provider store={store}>
      <ReduxConnectedHome />
    </Provider>
  );
  const header = getByTestId("page-header");
  expect(header).toBeInTheDocument();
});

test("<Home/> component should have 5 cards, information, schedule, price, theme and status", () => {
  const store = mockStore(initialState);
  const { getByTestId } = render(
    <Provider store={store}>
      <ReduxConnectedHome />
    </Provider>
  );
  const schedule = getByTestId("schedule-card");
  const status = getByTestId("status-card");
  const price = getByTestId("price-card");
  const theme = getByTestId("theme-card");
  const info = getByTestId("information-card");
  expect(price).toBeInTheDocument();
  expect(status).toBeInTheDocument();
  expect(info).toBeInTheDocument();
  expect(theme).toBeInTheDocument();
  expect(schedule).toBeInTheDocument();
});
