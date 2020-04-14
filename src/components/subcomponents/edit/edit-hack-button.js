import React from "react";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  editButton: {
    marginLeft: theme.spacing(1)
  }
}));

export function EditHackButton(props) {
  const classes = useStyles();

  const [disable, setDisable] = React.useState(true);

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
    <Link to={`${props.match.url}/edit`}>
      <Button className={classes.editButton}>
        <EditIcon />
      </Button>
    </Link>
  );
}

export default EditHackButton;
