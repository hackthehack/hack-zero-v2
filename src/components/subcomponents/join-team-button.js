import React from "react";
import { Button } from "@material-ui/core";

export function JoinButton(props) {
  const onClick = event => {
    event.preventDefault();
    props.joinHack();
  };
  if (props.team !== undefined && props.team.includes(props.userId)) {
    return (
      <Button variant="contained" color="primary" disabled>
        Join
      </Button>
    );
  } else {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        disabled={props.team && props.team.includes(props.userId)}
      >
        Join
      </Button>
    );
  }
}

export default JoinButton;
