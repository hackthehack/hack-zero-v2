import React from "react";
import { render } from "@testing-library/react";
import Hacks from "../components/HacksPage";



test("If a container exists for displayng the hacks", () => {
  const { getByTestId } = render( <Hacks/>);
  const grid = getByTestId('main-container')
  expect(grid).toBeInTheDocument();
});

