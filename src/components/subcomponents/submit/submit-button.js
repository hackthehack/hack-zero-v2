import React from "react";
import { Button, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import PublishIcon from "@material-ui/icons/Publish";

const useStyles = makeStyles(theme => ({
  linkRoot:{
    width: "-webkit-fill-available",
    textDecoration: "none"
  },
  buttonRoot:{
    width: "inherit"
  },
  buttonText:{
    marginLeft: theme.spacing(1)
  }
}));

export function SubmitButton(props) {
  const classes = useStyles()
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    props.team.forEach(member => {
      if (member._id === props.userId) {
        setVisible(false);
      }
    });
  });

  if (visible) {
    return null;
  }
  return (
    <Link to={`${props.match.url}/submit`} className={classes.linkRoot} >
      <Button variant="contained" color="primary" className={classes.buttonRoot}>
        <PublishIcon />
        <Hidden xsDown><span className={classes.buttonText}>Submit</span></Hidden>
      </Button>
    </Link>
  );
}

export default SubmitButton;
