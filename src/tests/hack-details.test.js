import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { HackDetails } from "../components/hack-details";

test("If a container exists for displayng the hacks", () => {
  const { container } = render(<HackDetails />);
  expect(container.firstChild).toHaveClass("MuiGrid-root");
});

