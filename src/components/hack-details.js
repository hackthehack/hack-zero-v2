import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import EditHack from "./edit-hack";
import SubmitHack from "./submit-hack";
import { fetchingHackDetails } from "../store/actions/userActions";
import { connect } from "react-redux";
import HackView from "./subcomponents/hackdetails/hack-view";

// UI imports

import { Grid, CircularProgress } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  buttonPaper: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    width: "80vw"
  },
  rightField: {
    textAlign: "right"
  },
  loading: {
    marginTop: theme.spacing(10)
  },
  marginTop: {
    marginTop: theme.spacing(2)
  },
  creator: {
    height: theme.spacing(3),
    color: "red",
    fontStyle: "italic"
  }
}));

export function HackDetails({ match, dispatch, userId, hackDetails }) {
  const classes = useStyles();

  useEffect(() => {
    if (!hackDetails || hackDetails._id !== match.params.id) {
      dispatch(fetchingHackDetails(match.params.id, userId));
    }
  }, [dispatch, hackDetails, match, userId]);

  if (hackDetails) {
    return (
      <Grid container justify="center">
        <Switch>
          <Route exact path="/hack/:id">
            <Grid item xs={12} sm={10} md={8}>
              <HackView match={match} />
            </Grid>
          </Route>
          <Route exact path="/hack/:id/edit" component={EditHack} />
          <Route exact path="/hack/:id/submit" component={SubmitHack} />
        </Switch>
      </Grid>
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

const mapState = state => ({
  userId: state.auth.userId,
  hackDetails: state.hack.hackDetails
});

export default connect(mapState)(HackDetails);
