import React, { useState, useEffect } from "react";
import { Button, Hidden } from "@material-ui/core";
import { unjoiningHackIdea } from "../../store/actions/userActions";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles(theme => ({
  buttonRoot: {
    width: "-webkit-fill-available"
  },
  buttonText: {
    marginLeft: theme.spacing(1)
  }
}));

const UnjoinButton = ({ dispatch, user, hackDetails }) => {
  const [disable, setDisable] = useState(true);
  const classes = useStyles();
  useEffect(() => {
    if (hackDetails.team.length === 0) {
      setDisable(true);
      return;
    }
    hackDetails.team.forEach((member) => {
      if (member._id !== user.userId || !user.userId) {
        setDisable(true);
      } else {
          setDisable(false);
      }
    });
  }, [hackDetails, userId]);

  const unJoinHack = () => {
    dispatch(unjoiningHackIdea());
  };

  if (disable) {
    return null;
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={unJoinHack}
      className={classes.buttonRoot}
    >
      <ExitToAppIcon />
      <Hidden xsDown>
        <span className={classes.buttonText}>Leave</span>
      </Hidden>
    </Button>
  );
};

const mapState = state => ({
  userId: state.auth.userId,
  hackDetails: state.hack.hackDetails
});

export default connect(mapState)(UnjoinButton);
