import React from "react";
import { connect } from "react-redux";
import { ThumbUp } from "@material-ui/icons";

import Button from "@material-ui/core/Button";
import { likeHack, dislikeHack } from "../../store/actions/userActions";

export const LikeButton = ({
  userId,
  hasUserLiked,
  upVote,
  downVote,
  numberLikes
}) => {
  return (
    <Button
      data-testid="likeButton"
      disabled={!userId ? true : false}
      variant="outlined"
      color="primary"
      onClick={!hasUserLiked ? upVote : downVote}
      // style={{ position: "absolute", bottom: "0.75rem", right: "1rem" }}
    >
      <ThumbUp
        style={{
          color: hasUserLiked ? "dodgerBlue" : "d3d3d3",
          fontSize: "1.25rem"
        }}
      />
      <span style={{ marginLeft: "0.5rem" }}> {numberLikes}</span>
    </Button>
  );
};

const mapDispatch = dispatch => ({
  upVote: () => dispatch(likeHack()),
  downVote: () => dispatch(dislikeHack())
});
const mapState = state => ({
  userId: state.auth.userId,
  hasUserLiked: state.hack.hackDetails.hasUserLiked,
  numberLikes: state.hack.hackDetails.numberLikes
});
export default connect(
  mapState,
  mapDispatch
)(LikeButton);
