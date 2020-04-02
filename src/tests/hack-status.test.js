import React from "react";
import { render } from "@testing-library/react";
import HackStatus from "../components/subcomponents/hack-status";

test("Status component render with props", () => {
  const { container } = render(<HackStatus status={[0]} />);
  expect(container.firstChild).toBeInTheDocument();
});

test("Status component render without props", () => {
  const { container } = render(<HackStatus />);
  expect(container.firstChild).toBeNull();
});

test("Status component rerender", () => {
  let status = []
  const { container, rerender } = render(<HackStatus status={status}/>);
  expect(container.firstChild).toBeNull();
  status = "New Hack"
  rerender(<HackStatus status={status} />)
  expect(container.firstChild).toBeInTheDocument();
});
