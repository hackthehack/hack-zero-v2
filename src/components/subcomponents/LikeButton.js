import React from "react";
import { connect } from "react-redux";
import { ThumbUp } from "@material-ui/icons";

import Button from "@material-ui/core/Button";
import { likeHack } from "../../store/actions/userActions";

export const LikeButton = ({ userId, hasUserLiked, toggleLike }) => {
  return (
    <Button
      data-testid="likeButton"
      disabled={!userId ? true : false}
      variant="outlined"
      color="primary"
      onClick={toggleLike}
      style={{ position: "absolute", bottom: "0.75rem", right: "1rem" }}
    >
      <ThumbUp
        style={{
          color: hasUserLiked ? "dodgerBlue" : "d3d3d3",
          fontSize: "1.25rem"
        }}
      />
    </Button>
  );
};

const mapDispatch = dispatch => ({
  toggleLike: () => dispatch(likeHack())
});
export default connect(
  null,
  mapDispatch
)(LikeButton);
