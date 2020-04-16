import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  editButton: {
    marginLeft: theme.spacing(1)
  }
}));

export function SubmitButton(props) {
  const classes = useStyles();

  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    props.team.forEach(member => {
      console.log(member)
      if (member._id === props.userId) {
        setVisible(false);
      }
    });
  });

  if (visible) {
    return null;
  }
  return (
    <Link to={`${props.match.url}/submit`} style={{ textDecoration: "none" }}>
      <Button variant="outlined" color="primary" className={classes.editButton}>
        Submit
      </Button>
    </Link>
  );
}

export default SubmitButton;
