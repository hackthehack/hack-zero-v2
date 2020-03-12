import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Register from "../components/register";

test("Register component Renders", () => {
  const { container } = render(<Register/>);
  expect(container.firstChild).toBeInTheDocument();
});