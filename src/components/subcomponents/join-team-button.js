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
      console.log(member._id)
      console.log(props.userId)
      if(member._id === props.userId || !props.userId){
        setDisable(true)
      }
    })
  })

  if (disable) {
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
      >
        Join
      </Button>
    );
  }
}

export default JoinButton;
