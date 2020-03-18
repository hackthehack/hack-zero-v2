import React from "react";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  editButton: {
    marginLeft: theme.spacing(1)
  }
}));

export function EditHack(props) {
  const classes = useStyles();

  const [disable, setDisable] = React.useState(true);

  const onClick = event => {
    event.preventDefault();
    props.editFunc();
  };

  React.useEffect(() => {
    props.team.forEach(member => {
      if (member._id === props.userId) {
        setDisable(false);
      }
    });
  });

  if (disable) {
    return null;
  }
  return (
    <Button className={classes.editButton} onClick={onClick}>
      <EditIcon />
    </Button>
  );
}

export default EditHack;
