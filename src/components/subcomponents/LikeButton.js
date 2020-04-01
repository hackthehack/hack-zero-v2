import React from "react";
import { ThumbUp } from "@material-ui/icons";

const LikeButton = () => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <ThumbUp style={{ color: "dodgerBlue", fontSize: "2rem" }} />
    </div>
  );
};

export default LikeButton;
