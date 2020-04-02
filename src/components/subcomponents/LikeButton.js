import React, { useState } from "react";
import { ThumbUp } from "@material-ui/icons";
import Button from "@material-ui/core/Button";

const LikeButton = () => {
  const [likeStatus, setLikeStatus] = useState(false);
  const toggleLike = () => setLikeStatus(!likeStatus);
  return (
    <Button variant="outlined" color="primary" onClick={toggleLike}>
      <ThumbUp
        style={{ color: likeStatus ? "dodgerBlue" : "red", fontSize: "2rem" }}
      />
    </Button>
  );
};

export default LikeButton;
