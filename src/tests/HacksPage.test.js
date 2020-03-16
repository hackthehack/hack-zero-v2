import React from "react";
import { render } from "@testing-library/react";
import { Hacks } from "../components/HacksPage";

test("If a container exists for displayng the hacks", () => {
  const { getByTestId } = render(<Hacks />);
  const grid = getByTestId('main-container')
  expect(grid).toBeInTheDocument();
});

//further testing need after front end is connected to the backend for fetching the number of hacks, for now, will just test if the components render three hacks that was hardcoded.

// test("If the component displays three hardcoded hacks on the page", () => {
//   const { getAllByTestId } = render(<HacksPage />);
//   const element = getAllByTestId("hack-idea");
//   expect(element.length).toBe(3);
// });
