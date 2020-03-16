import React from "react";
import { Grid, Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(theme => ({
  chipMArgin: {
    marginRight: theme.spacing(1)
  }
}));

export function Team(props) {
  const classes = useStyles();
  if (props.team !== undefined) {
    return (
        <>
          {props.team.map(id => {
            return (
              <Chip
                key={id}
                className={classes.chipMArgin}
                icon={<AccountCircleIcon />}
                label={id}
                color="primary"
              />
            );
          })}
          </>
    );
  } else {
    return null;
  }
}

export default Team;
