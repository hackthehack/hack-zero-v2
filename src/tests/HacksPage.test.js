import React from "react";
import { render, getAllByTestId } from "@testing-library/react";
import HacksPage from "../components/HacksPage";

test("If a container exists for displayng the hacks", () => {
  const { container } = render(<HacksPage />);
  expect(container.firstChild).toHaveClass("MuiContainer-root");
});

//further testing need after front end is connected to the backend for fetching the number of hacks, for now, will just test if the components render three hacks that was hardcoded.

test("If the component displays three hardcoded hacks on the page", () => {
  const { getAllByTestId } = render(<HacksPage />);
  const element = getAllByTestId("hack-idea");
  expect(element.length).toBe(3);
});
