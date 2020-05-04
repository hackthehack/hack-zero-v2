import React from "react";
import { Button } from "@material-ui/core";
import { joiningHackIdea } from "../../store/actions/userActions";
import { connect } from "react-redux";

export function JoinButton({ hackDetails, user, dispatch, history }) {
  const [disable, setDisable] = React.useState(false);

  const joinHack = (event) => {
    event.preventDefault();
    dispatch(joiningHackIdea(history));
  };

  React.useEffect(() => {
    if (
      hackDetails.status === "Canceled" ||
      hackDetails.status === "Team Closed" ||
      hackDetails.status === "Submitted"
    ) {
      setDisable(true);
      return;
    }
    hackDetails.team.forEach((member) => {
      if (member._id === user.userId || !user.userId) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    });
  }, [hackDetails, user, dispatch]);

  if (disable) {
    return (
      <Button variant="outlined" color="primary" disabled>
        Join
      </Button>
    );
  } else {
    return (
      <Button variant="outlined" color="primary" onClick={joinHack}>
        Join
      </Button>
    );
  }
}

const mapState = (state) => ({
  user: state.auth,
  hackDetails: state.hack.hackDetails,
});

export default connect(mapState)(JoinButton);
