import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { unjoiningHackIdea } from "../../store/actions/userActions";
import { connect } from "react-redux";

const UnjoinButton = ({ dispatch, user, hackDetails }) => {
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    hackDetails.team.forEach((member) => {
      if (member._id !== user.userId || !user.userId) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    });
  });

  const unJoinHack = () => {
    dispatch(unjoiningHackIdea());
  };

  return (
    <Button
      disabled={disable}
      onClick={unJoinHack}
      variant="outlined"
      color="primary"
      style={{ marginLeft: "0.5rem" }}
    >
      Unjoin
    </Button>
  );
};

const mapState = (state) => ({
  user: state.auth,
  hackDetails: state.hack.hackDetails,
});

export default connect(mapState)(UnjoinButton);
