import React, { useState } from "react";
import { connect } from "react-redux";
import { ThumbUp } from "@material-ui/icons";
import axios from "axios";
import urlJoin from "url-join";
import Button from "@material-ui/core/Button";

const LikeButton = ({ jwtToken, userId, hackId }) => {
  const [likeStatus, setLikeStatus] = useState(false);

  const toggleLike = () => setLikeStatus(!likeStatus);

  const likeHack = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + jwtToken
      }
    };
    const body = {
      hackId,
      userId
    };
    try {
      let result = await axios.post(
        urlJoin(process.env.REACT_APP_API_URL, "likehack"),
        body,
        config
      );
      toggleLike();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button
      disabled={!userId ? true : false}
      variant="outlined"
      color="primary"
      onClick={likeHack}
    >
      <ThumbUp
        style={{ color: likeStatus ? "dodgerBlue" : "red", fontSize: "2rem" }}
      />
    </Button>
  );
};
const mapState = state => ({
  jwtToken: state.auth.jwt
});
export default connect(mapState)(LikeButton);
