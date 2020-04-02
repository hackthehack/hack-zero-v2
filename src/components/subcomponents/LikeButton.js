import React from "react";
import { connect } from "react-redux";
import { ThumbUp } from "@material-ui/icons";

import Button from "@material-ui/core/Button";
import { likeHack } from "../../store/actions/userActions";

const LikeButton = ({ userId, hasUserLiked, toggleLike }) => {
  return (
    <Button
      disabled={!userId ? true : false}
      variant="outlined"
      color="primary"
      onClick={toggleLike}
    >
      <ThumbUp
        style={{ color: hasUserLiked ? "dodgerBlue" : "red", fontSize: "2rem" }}
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
