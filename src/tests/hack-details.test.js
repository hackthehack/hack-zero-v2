import React from "react";
import { render, fireEvent } from "@testing-library/react";
import HackDetails from "../components/hack-details";

test("Title Rendered", () => {
  const { getByText } = render(<HackDetails />);
  const element = getByText(/Idea/);
  expect(element).toBeInTheDocument();
});

test("Description Rendered", () => {
  const { getByText } = render(<HackDetails />);
  const element = getByText(/Goal/i);
  expect(element).toBeInTheDocument();
});

test("Goal Rendered", () => {
  const { getByText } = render(<HackDetails />);
  const element = getByText(/Join Hack/i);
  expect(element).toBeInTheDocument();
});
