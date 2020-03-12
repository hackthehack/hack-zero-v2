import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, getByTestId, fireEvent } from "@testing-library/react";
import Header from "../components/header";

test("If a container exists for displayng the hacks", () => {
  const { container } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(container.firstChild).toBeInTheDocument();
});

test("if the side drawer is not visible by default", () => {
  const { container } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  const drawer = getByTestId(container, "drawerComponent");
  expect(drawer).not.toBeVisible();
});

test("if the side drawer is visible after the button is pressed", () => {
  const { container } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  const drawer = getByTestId(container, "drawerComponent");
  const toggleButton = getByTestId(container, "toggleButton");
  fireEvent.click(toggleButton);
  expect(drawer).toBeVisible();
});
