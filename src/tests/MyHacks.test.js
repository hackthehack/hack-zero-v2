import React from "react";
import { render, act } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import ReduxMyHacks, { MyHacks } from "../components/MyHacks";
import { BrowserRouter } from "react-router-dom";
//import moxios from "moxios";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

test("<MyHacks/> should dispatch getAssignedHacks on mounting", async () => {
  const mockDispatch = jest.fn();

  await act(async () => {
    render(
      <MyHacks
        dispatch={mockDispatch}
        userId={123}
        isAuth={false}
        assignedHacks={[]}
      />
    );
  });
  expect(mockDispatch).toBeCalled();
});

test("<MyHacks/> should contains zero hacks if user not logged in", () => {
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
  const store = mockStore(initialState);
  const component = (
    <Provider store={store}>
      <BrowserRouter>
        <ReduxMyHacks />
      </BrowserRouter>
    </Provider>
  );

  const { queryByTestId } = render(component);
  const assignedHacks = queryByTestId("assignedHack");
  //sconsole.log(assignedHacks);
  expect(assignedHacks).toBeNull();
  //console.log(store.getState());
});
