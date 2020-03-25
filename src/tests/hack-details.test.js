import React from "react";

import { render } from "@testing-library/react";
import { HackDetails } from "../components/hack-details";

test("If a container exists for displayng the hacks", () => {
  const mockDispatch = jest.fn();
  const { getByTestId } = render(
    <HackDetails
      dispatch={mockDispatch}
      match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
    />
  );
  const grid = getByTestId("main-container");
  expect(grid).toBeInTheDocument();
});