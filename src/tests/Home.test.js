import React from "react";
import { render, act } from "@testing-library/react";

import { Provider } from "react-redux";
import ReduxConnectedHome, { Home } from "../components/Home";

import thunk from "redux-thunk";

import configureStore from "redux-mock-store";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {
    isAuth: false,
  },
  hack: {
    items: {
      title: "a test",
      information: "a information",
      status: "active",
      theme: "a testing theme",
      prizeList: ["100", "22", "200"],
    },
    assignedHacks: [],
    assets: [],
  },
};
test("<Home/> component heading should be rendered on the page", async () => {
  const store = mockStore(initialState);
  await act(async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ReduxConnectedHome />
      </Provider>
    );
    const header = getByTestId("page-header");
    expect(header).toBeInTheDocument();
  });
});

test("<Home/> component should have 5 cards, information, schedule, prize, theme and status after loading", async () => {
  const store = mockStore(initialState);
  await act(async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ReduxConnectedHome />
      </Provider>
    );
    const schedule = getByTestId("schedule-card");
    const status = getByTestId("status-card");
    const prize = getByTestId("prize-card");
    const theme = getByTestId("theme-card");
    const info = getByTestId("information-card");
    expect(prize).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(info).toBeInTheDocument();
    expect(theme).toBeInTheDocument();
    expect(schedule).toBeInTheDocument();
  });
});
