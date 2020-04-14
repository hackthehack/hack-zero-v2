import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { LikeButton } from "../components/subcomponents/LikeButton";

test("Clicking on <LikeButton/> calls downVote function when the the hack was liked", () => {
  const mockUpVote = jest.fn();
  const mockDownVote = jest.fn();

  const { getByTestId } = render(
    <LikeButton
      userId="123"
      numberLikes={22}
      hasUserLiked={true}
      upVote={mockUpVote}
      downVote={mockDownVote}
    />
  );
  const button = getByTestId("likeButton");
  fireEvent.click(button);

  expect(mockDownVote).toHaveBeenCalled();
});

test("Clicking on <LikeButton/> calls upVote function when the hack was not liked", () => {
  const mockUpVote = jest.fn();
  const mockDownVote = jest.fn();
  const { getByTestId } = render(
    <LikeButton
      userId="123"
      numberLikes={22}
      hasUserLiked={false}
      upVote={mockUpVote}
      downVote={mockDownVote}
    />
  );
  const button = getByTestId("likeButton");
  fireEvent.click(button);
  expect(mockUpVote).toHaveBeenCalled();
});

test("<LikeButton/> is rendered correctly on the screen", () => {
  const mockToggleLike = jest.fn();
  const { getByTestId } = render(
    <LikeButton userId="123" hasUserliked={true} toggleLike={mockToggleLike} />
  );
  const button = getByTestId("likeButton");
  expect(button).toBeInTheDocument();
});

test("<LikeButton/> is disabled if user hasn't logged in", () => {
  const mockToggleLike = jest.fn();
  const { getByTestId } = render(
    <LikeButton userId="" hasUserliked={true} toggleLike={mockToggleLike} />
  );
  const button = getByTestId("likeButton");
  expect(button).toBeDisabled();
});
