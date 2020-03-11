import React from "react";
import { Login } from "../components/Login";
import { render } from "@testing-library/react";

test("If <Login/> Component displays Login headig", () => {
  const { getByTestId } = render(<Login />);
  const heading = getByTestId("login-heading");
  expect(heading).toBeInTheDocument();
});

test("If <Login/> Component displays a login button", () => {
  const { getByTestId } = render(<Login />);
  const button = getByTestId("login-button");
  expect(button).toBeInTheDocument();
});
