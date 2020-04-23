import React from "react";
import { Button } from "@material-ui/core";
//import { joiningHackIdea } from "../../store/actions/userActions";
import { connect } from "react-redux";

const UnjoinButton = () => {
  return (
    <Button variant="outlined" color="primary">
      Unjoin
    </Button>
  );
};

export default UnjoinButton;
