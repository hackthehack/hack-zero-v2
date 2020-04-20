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
    },
    assignedHacks: [],
    assets: [],
  },
};
test("<Home/> component should show a loading spinner at the start", () => {
  const store = mockStore(initialState);
  const { getByTestId } = render(
    <Provider store={store}>
      <ReduxConnectedHome />
    </Provider>
  );
  const spinner = getByTestId("home-page-spinner");
  expect(spinner).toBeInTheDocument();
});

// test("<Home/> component should have 5 cards, information, schedule, prize, theme and status", () => {
//   const store = mockStore(initialState);
//   const { getByTestId } = render(
//     <Provider store={store}>
//       <ReduxConnectedHome />
//     </Provider>
//   );
//   const schedule = getByTestId("schedule-card");
//   const status = getByTestId("status-card");
//   const prize = getByTestId("prize-card");
//   const theme = getByTestId("theme-card");
//   const info = getByTestId("information-card");
//   expect(prize).toBeInTheDocument();
//   expect(status).toBeInTheDocument();
//   expect(info).toBeInTheDocument();
//   expect(theme).toBeInTheDocument();
//   expect(schedule).toBeInTheDocument();
// });
