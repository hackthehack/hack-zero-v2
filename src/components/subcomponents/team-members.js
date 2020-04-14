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
  // console.log(props);
  const classes = useStyles();
  return (
    <>
      {props.team.map(member => {
        return (
          <Chip
            key={member._id}
            className={classes.chipMArgin}
            icon={<AccountCircleIcon />}
            label={member.name}
            color="primary"
            variant="outlined"
          />
        );
      })}
    </>
  );
}

export default Team;
