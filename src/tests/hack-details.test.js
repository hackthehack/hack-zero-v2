import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { HackDetails } from "../components/hack-details";

test("If a container exists for displayng the hacks", () => {
  const { getByTestId } = render(<HackDetails />);
  const grid = getByTestId('main-container')
  expect(grid).toBeInTheDocument();
});

