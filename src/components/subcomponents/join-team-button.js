import React from "react";
import { Button } from "@material-ui/core";

export function JoinButton(props) {

  const [disable, setDisable] = React.useState(false)

  const onClick = event => {
    event.preventDefault();
    props.joinHack();
  };

  React.useEffect(() => {
    props.team.forEach(member => {
      if(member._id === props.userId || !props.userId){
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
        onClick={onClick}
      >
        Join
      </Button>
    );
  }
}

export default JoinButton;
