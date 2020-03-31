import React, { useEffect } from "react";
import Team from "./subcomponents/hack-team";
import JoinButton from "./subcomponents/join-team-button";
import EditHack from "./subcomponents/edit-hack-button";
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
    width: "80vw"
  },
  rightFeild: {
    textAlign: "right"
  },
  loading: {
    marginTop: theme.spacing(10)
  },
  marginTop: {
    marginTop: theme.spacing(2)
  }
}));

export function HackDetails({ match, dispatch, userId, hackDetails, history }) {
  const classes = useStyles();

  useEffect(() => {
    if (!hackDetails || hackDetails._id !== match.params.id) {
      dispatch(fetchingHackDetails(match.params.id));
    }
  }, [hackDetails, dispatch, match]);

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
              <JoinButton
                team={hackDetails.team}
                history={history}
              />
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
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h6">Idea:</Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1">{hackDetails.description}</Typography>
              <Grid item xs={10}>
                <Typography variant="h6">Goal:</Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body1">{hackDetails.goal}</Typography>
              </Grid>
                <Team team={hackDetails.team} name={hackDetails.teamName}/>
            </Grid>
          </Grid>
        </Paper>
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
