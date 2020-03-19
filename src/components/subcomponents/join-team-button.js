import React from "react";
import { Button } from "@material-ui/core";
import { joiningHackIdea } from "../../store/actions/userActions";
import { connect } from "react-redux";

export function JoinButton({ hackDetails, user, dispatch}) {

  const [disable, setDisable] = React.useState(false)

  const joinHack = event => {
    event.preventDefault();
    dispatch(joiningHackIdea(user.userId, hackDetails._id));
  };

  React.useEffect(() => {
    hackDetails.team.forEach(member => {
      if(member._id === user.userId || !user.userId){
        setDisable(true)
      }
    })
  })

  if (disable) {
    return (
      <Button variant="outlined" color="primary" disabled>
        Join
      </Button>
    );
  } else {
    return (
      <Button
        variant="outlined"
        color="primary"
        onClick={joinHack}
      >
        Join
      </Button>
    );
  }
}

const mapState = state => ({
  user: state.auth,
  hackDetails: state.hack.hackDetails
});

export default connect(mapState)(JoinButton);
