import React from "react";
import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(theme => ({
  chipMArgin: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export function Team(props) {
  console.log(props)
  const classes = useStyles();
  if (props.team !== undefined) {
    return (
        <>
          {props.team.map(id => {
            return <Chip
            key={id}
            className={classes.chipMArgin}
            icon={<AccountCircleIcon />}
            label={id}
            color="primary"
          />
          })}
          </>
    );
  } else {
    return <></>;
  }
}

export default Team;
