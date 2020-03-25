import React from "react";
import { render, act } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import MyHacks from "../components/MyHacks";
import {
  getAssignedHacks,
  getAssignedHacksOkay
} from "../store/actions/hackathonActions";

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

test("<MyHacks/> should not dispatch action getAssignedHacksOkay if user not loggedin", async () => {
  const store = mockStore(initialState);
  const component = (
    <Provider store={store}>
      <MyHacks />
    </Provider>
  );
  await act(async () => {
    render(component);
  });
  //console.log(store.getState());
  expect(store.getState().hack.assignedHacks.length).toBe(0);
});
