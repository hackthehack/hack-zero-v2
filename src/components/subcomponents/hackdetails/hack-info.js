import React from "react";
import { connect } from "react-redux";

import { Grid, Paper, Typography } from "@material-ui/core";

import Team from "../hack-team";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root:{
    padding: theme.spacing(2),
  }
}));

export function HackInfo({ hackDetails }) {
  const classes = useStyles();
  return (
    <Paper>
      <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12}>
          <Typography variant="h5">Details</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Idea:</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{hackDetails.description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Goal:</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{hackDetails.goal}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Team team={hackDetails.team} name={hackDetails.teamName} />
        </Grid>
      </Grid>
    </Paper>
  );
}

const mapState = state => ({
  hackDetails: state.hack.hackDetails
});

export default connect(mapState)(HackInfo);
