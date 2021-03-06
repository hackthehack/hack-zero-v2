import React from "react";
import { Login } from "../components/Login";
import { render, fireEvent, act } from "@testing-library/react";

test("If <Login/> Component displays Login heading", () => {
  const { getByTestId } = render(<Login />);
  const heading = getByTestId("login-heading");
  expect(heading).toBeInTheDocument();
});

test("If <Login/> Component displays a login button", () => {
  const { getByTestId } = render(<Login />);
  const button = getByTestId("login-button");
  expect(button).toBeInTheDocument();
});

test("If the <Login/> component calls the login function when submit button is pressed", async () => {
  const mockLogin = jest.fn(() => {
    return Promise.resolve("success");
  });
  await act(async () => {
    const { getByTestId } = render(<Login auth={mockLogin} />);
    const button = getByTestId("login-button");
    await fireEvent.click(button);
  });
  expect(mockLogin).toHaveBeenCalled();
});
