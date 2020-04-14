import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TeamMembers from "./team-members";

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(5)
  }
}));

export function Team(props) {
  // console.log(props);
  const classes = useStyles();
  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      alignContent="center"
      spacing={1}
      className={classes.margin}
    >
      {props.name ? (
        <Grid item xs={10} className={classes.marginTop}>
          <Typography variant="h6">Team Name:</Typography>
        </Grid>
      ) : null}
      <Grid item xs={10} className={classes.marginTop}>
        <Typography variant="body1">{props.name}</Typography>
      </Grid>
      <Grid item xs={10} className={classes.marginTop}>
        <Typography variant="h6">Team Members:</Typography>
      </Grid>
      <Grid item xs={10}>
        {props.team.length !== 0 ? (
          <TeamMembers team={props.team} />
        ) : (
          <Typography variant="body1">
            This team has no members yet! Be the first to join!
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default Team;
