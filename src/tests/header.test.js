import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import Header from '../components/header'


test("If a container exists for displayng the hacks", () => {
  const { container } = render(<BrowserRouter><Header /></BrowserRouter>);
  expect(container.firstChild).toBeInTheDocument();
});