import React from "react";
import { connect } from "react-redux";

import { Grid, Typography } from "@material-ui/core";

import HackStatus from "../hack-status";
import HackInfo from "./hack-info";
import SubmissionDetail from "./SubmissionDetail";
import ActionBar from './action-bar'

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(8),
    [theme.breakpoints.down("xs")]: {
      position: "relative",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  },
  actionGrid: {
    [theme.breakpoints.down("xs")]: {
      position: "fixed",
      bottom: "0"
    }
  },
}));

export function HackView({ hackDetails, match, history }) {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.root}
      spacing={2}
      justify="center"
      alignItems="flex-start"
    >
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4">{hackDetails.title}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <HackStatus status={hackDetails.status} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HackInfo />
          </Grid>
          <Grid item xs={12}>
            <SubmissionDetail />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={3} className={classes.actionGrid}>
        <ActionBar match={match}/>
      </Grid>
    </Grid>
  );
}

const mapState = state => ({
  hackDetails: state.hack.hackDetails
});

export default connect(mapState)(HackView);
