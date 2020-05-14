import React from "react";
import { Button, Hidden } from "@material-ui/core";
import { joiningHackIdea } from "../../store/actions/userActions";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const useStyles = makeStyles(theme => ({
  buttonRoot:{
    width: "-webkit-fill-available"
  },
  buttonText:{
    marginLeft: theme.spacing(1)
  }
}));

export function JoinButton({ hackDetails, user, dispatch, history }) {

  const classes = useStyles()
  
  const [disable, setDisable] = React.useState(false);

  const joinHack = event => {
    event.preventDefault();
    dispatch(joiningHackIdea(history));
  };

  React.useEffect(() => {
    hackDetails.team.forEach(member => {
      if (member._id === user.userId || !user.userId) {
        setDisable(true);
      }
    });
  }, [hackDetails, user, dispatch]);

  if (disable) {
    return null;
  } else {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={joinHack}
        className={classes.buttonRoot}
      >
        <PersonAddIcon />
        <Hidden xsDown><span className={classes.buttonText}>Join</span></Hidden>
      </Button>
    );
  }
}

const mapState = state => ({
  user: state.auth,
  hackDetails: state.hack.hackDetails
});

export default connect(mapState)(JoinButton);
