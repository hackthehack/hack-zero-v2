import React from "react";
import { render, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ReduxConnectedHome, { Home } from "../components/Home";
// import {
//   getHackathonContent,
//   getContentOkay
// } from "../store/actions/hackathonActions";
// import configureStore from "redux-mock-store";

//const mockStore = configureStore([]);

// test("<Home/> component should have the right number of hacks that user is assigned to", () => {
//   const mockDispatch = jest.fn();
//   const mockAssignedHacks = [
//     { title: "hack1", description: "test", _id: 1 },
//     { title: "hack2", description: "test", _id: 2 },
//     { title: "hack3", description: "test", _id: 3 }
//   ];
//   const { getAllByTestId } = render(
//     <BrowserRouter>
//       <Home
//         dispatch={mockDispatch}
//         assignedHacks={mockAssignedHacks}
//         isAuth={true}
//       />
//     </BrowserRouter>
//   );
//   const assignedHacks = getAllByTestId("assignedHack");
//   //sconsole.log(assignedHacks);
//   expect(assignedHacks.length).toBe(mockAssignedHacks.length);
// });

// test("<Home/> component should fetch data to show assigned hacks if user is  logged in", async () => {
//   const mockDispatch = jest.fn();
//   await act(async () => {
//     render(<Home dispatch={mockDispatch} assignedHacks={[]} isAuth={true} />);
//   });
//   //first call will be to fetch from CMS
//   //2nd call will fetch the user assigned hacks
//   expect(mockDispatch).toHaveBeenCalledTimes(2);
// });
//
// test("<Home/> component should not fetch data to show assigned hacks if user is not logged in", async () => {
//   const mockDispatch = jest.fn();
//
//   await act(async () => {
//     render(<Home dispatch={mockDispatch} assignedHacks={[]} isAuth={false} />);
//   });
//   //it will always call to get data from Contentful CMS when component mounst
//   //it won't call to fetch user hacks if user not loggedin
//   expect(mockDispatch).toHaveBeenCalledTimes(1);
// });

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
