import React from "react";
import { render } from "@testing-library/react";
import { Hacks } from "../components/HacksPage";

test("If a container exists for displayng the hacks", () => {
  const mockDispatch = jest.fn();
  const { getByTestId } = render(<Hacks dispatch={mockDispatch} />);
  const grid = getByTestId("main-container");
  expect(grid).toBeInTheDocument();
});
