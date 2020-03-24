import React from "react";
import { render, getByTestId } from "@testing-library/react";
import ReduxConnectedHome, { Home } from "../components/Home";
import {
  getHackathonContent,
  getContentOkay
} from "../store/actions/hackathonActions";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

test("<Home/> component heading should be rendered in the page", () => {
  const dispatch = jest.fn();
  const { getByTestId } = render(
    <Home dispatch={dispatch} assignedHacks={[]} />
  );
  const header = getByTestId("page-header");
  expect(header).toBeInTheDocument();
});

test("<Home/> component should have 5 cards, information, schedule, price, theme and status", () => {
  const dispatch = jest.fn();
  const { getByTestId } = render(
    <Home dispatch={dispatch} assignedHacks={[]} />
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
