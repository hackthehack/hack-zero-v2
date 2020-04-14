import React from "react";

import { render } from "@testing-library/react";
import { SubmitHack } from "../components/submit-hack";

test("If a container exists for displayng the submit form", () => {
  const mockDispatch = jest.fn();
  const { getByTestId } = render(
    <SubmitHack
      dispatch={mockDispatch}
      match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
    />
  );
  const grid = getByTestId("main-container");
  expect(grid).toBeInTheDocument();
});
