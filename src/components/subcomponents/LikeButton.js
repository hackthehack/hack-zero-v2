import React from "react";
import { ThumbUp } from "@material-ui/icons";
import Button from "@material-ui/core/Button";

const LikeButton = () => {
  return (
    <Button variant="outlined" color="primary">
      <ThumbUp style={{ color: "dodgerBlue", fontSize: "2rem" }} />
    </Button>
  );
};

export default LikeButton;
