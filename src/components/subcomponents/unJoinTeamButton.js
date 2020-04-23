import React from "react";
import { Button } from "@material-ui/core";
import { unjoiningHackIdea } from "../../store/actions/userActions";
import { connect } from "react-redux";

const UnjoinButton = ({ team, history, dispatch, user }) => {
  const unJoinHack = () => {
    dispatch(unjoiningHackIdea());
  };
  return (
    <Button
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
