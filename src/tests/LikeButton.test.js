import React from "react";
import { render } from "@testing-library/react";
import { LikeButton } from "../components/subcomponents/LikeButton";

test("<LikeButton/> is rendered correctly on the screen", () => {
  const mockToggleLike = jest.fn();
  const { getByTestId } = render(
    <LikeButton userId="123" hasUserliked={true} toggleLike={mockToggleLike} />
  );
  const button = getByTestId("likeButton");
  expect(button).toBeInTheDocument();
});