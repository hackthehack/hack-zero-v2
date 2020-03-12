import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, getByTestId } from "@testing-library/react";
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
