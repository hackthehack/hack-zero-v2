import React, { useEffect } from "react";
import Team from "./subcomponents/hack-team";
import JoinButton from "./subcomponents/join-team-button";
import EditHack from "./subcomponents/edit-hack-button";
import LikeButton from "./subcomponents/LikeButton";
import { fetchingHackDetails } from "../store/actions/userActions";
import { connect } from "react-redux";

// UI imports
import {
  Grid,
  Typography,
  Paper,
  Chip,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    width: "80vw",
    position: "relative"
  },
  rightFeild: {
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

export function HackDetails({ match, dispatch, userId, hackDetails, history }) {
  const classes = useStyles();

  useEffect(() => {
    if (!hackDetails || hackDetails._id !== match.params.id) {
      dispatch(fetchingHackDetails(match.params.id, userId));
    }
  }, [hackDetails, dispatch, match, userId]);

  if (hackDetails) {
    return (
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
            justify="space-between"
            alignItems="center"
            alignContent="center"
            spacing={1}
          >
            <Grid item xs={9}>
              <Chip
                icon={<ErrorOutlineOutlinedIcon />}
                label="status"
                color="secondary"
              />
            </Grid>
            <Grid item xs={3} className={classes.rightFeild}>
              <JoinButton team={hackDetails.team} history={history} />
            </Grid>
            <Grid
              container
              justify="flex-start"
              alignItems="center"
              alignContent="center"
              spacing={1}
              className={classes.marginFix}
            >
              <Grid item>
                <Typography variant="h4">{hackDetails.title}</Typography>
              </Grid>
              <Grid item>
                <EditHack
                  match={match}
                  team={hackDetails.team}
                  userId={userId}
                />
              </Grid>

              <Grid item xs={10} className={classes.creator}>
                <Typography variant="body1">
                  Created by:{" "}
                  {hackDetails.creator ? hackDetails.creator.name : "Unknown"}
                </Typography>
              </Grid>
              <Grid item xs={10}>
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

              <Team team={hackDetails.team} name={hackDetails.teamName} />

              <LikeButton />
            </Grid>
          </Grid>
        </Paper>
        {/*<div
          className={classes.root}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <LikeButton
            // hackId={hackDetails._id}
            userId={userId}
            hasUserLiked={hackDetails.hasUserLiked}
          />
        </div>*/}
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
