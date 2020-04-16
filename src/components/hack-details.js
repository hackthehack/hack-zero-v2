import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Team from "./subcomponents/hack-team";
import JoinButton from "./subcomponents/join-team-button";
import EditHackButton from "./subcomponents/edit-hack-button";
import HackStatus from "./subcomponents/hack-status";
import EditHack from "./edit-hack";
import SubmitHack from "./submit-hack";
// import SubmitButton from "./subcomponents/submit-button";
import { fetchingHackDetails } from "../store/actions/userActions";
import { connect } from "react-redux";
import LikeButton from "./subcomponents/LikeButton";
import SubmissionDetail from "./subcomponents/submit/SubmissionDetail";

// UI imports

import { Grid, Typography, Paper, CircularProgress } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    width: "80vw",
    position: "relative",
  },
  rightField: {
    textAlign: "right",
  },
  loading: {
    marginTop: theme.spacing(10),
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  creator: {
    height: theme.spacing(3),
    color: "red",
    fontStyle: "italic",
  },
}));

export function HackDetails({ match, dispatch, userId, hackDetails, history }) {
  const classes = useStyles();

  useEffect(() => {
    if (!hackDetails || hackDetails._id !== match.params.id) {
      dispatch(fetchingHackDetails(match.params.id, userId));
    }
  }, [dispatch, hackDetails, match, userId]);

  if (hackDetails) {
    return (
      <Switch>
        <Route exact path="/hack/:id">
          <Grid
            data-testid="main-container"
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            alignContent="center"
          >
            <Paper className={classes.root}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
                alignContent="center"
              >
                <Grid
                  container
                  justify="flex-start"
                  alignItems="center"
                  alignContent="center"
                  spacing={1}
                  className={classes.marginFix}
                >
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    <Typography variant="h4">{hackDetails.title}</Typography>
                    <EditHackButton
                      match={match}
                      team={hackDetails.team}
                      userId={userId}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <HackStatus status={hackDetails.status} />
                  </Grid>

                  <Grid item xs={10} className={classes.creator}>
                    <Typography variant="body1">
                      Created by:{" "}
                      {hackDetails.creator
                        ? hackDetails.creator.name
                        : "Unknown"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={10} style={{ marginTop: "1rem" }}>
                  <Typography variant="h6">Idea:</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    {hackDetails.description}
                  </Typography>
                  <Grid item xs={10}>
                    <Typography variant="h6">Goal:</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="body1">{hackDetails.goal}</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Team team={hackDetails.team} name={hackDetails.teamName} />
                </Grid>
                <Grid item xs={12}>
                  <LikeButton />
                </Grid>
                <Grid item xs={12} style={{ marginTop: "1rem" }}>
                  <JoinButton team={hackDetails.team} history={history} />
                </Grid>
              </Grid>
            </Paper>

            <SubmissionDetail />
          </Grid>
        </Route>
        <Route exact path="/hack/:id/edit" component={EditHack} />
        <Route exact path="/hack/:id/submit" component={SubmitHack} />
      </Switch>
    );
  }
  return (
    <Grid
      data-testid="main-container"
      container
      direction="column"
      justify="center"
      alignItems="stretch"
      alignContent="center"
      className={classes.loading}
    >
      <CircularProgress />
    </Grid>
  );
}

const mapState = (state) => ({
  userId: state.auth.userId,
  hackDetails: state.hack.hackDetails,
});

export default connect(mapState)(HackDetails);
