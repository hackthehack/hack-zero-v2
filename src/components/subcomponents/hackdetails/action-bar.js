import React, { useEffect, useState } from "react";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import EditHackButton from "../edit-hack-button";
import SubmitButton from "../submit/submit-button";
import LikeButton from "../LikeButton";
import JoinButton from "../join-team-button";
import UnJoinButton from "../unJoinTeamButton";

const useStyles = makeStyles(theme => ({
  actionBar: {
    padding: theme.spacing(1)
  },
}));

export function ActionBar({ userId, hackDetails, history, match }) {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    hackDetails.team.forEach(member => {
      if (member._id === userId) {
        setVisible(true);
      }
    });
  }, [hackDetails, userId]);
  return (
    <Paper className={classes.actionBar}>
      <Grid
        container
        justify="center"
        alignContent="flex-start"
        spacing={1}
      >
        {!visible ? (
          <Grid item sm={12}>
            <JoinButton team={hackDetails.team} history={history} />
          </Grid>
        ) : null}
        {visible ? (
          <>
            <Grid item sm={12}>
              <EditHackButton
                match={match}
                team={hackDetails.team}
                userId={userId}
              />
            </Grid>
            <Grid item sm={12}>
              <SubmitButton
                match={match}
                team={hackDetails.team}
                userId={userId}
              />
            </Grid>
          </>
        ) : null}

        <Grid item sm={12}>
          <LikeButton />
        </Grid>
        {visible ? (
          <Grid item sm={12}>
            <UnJoinButton />
          </Grid>
        ) : null}
      </Grid>
    </Paper>
  );
}

const mapState = state => ({
  userId: state.auth.userId,
  hackDetails: state.hack.hackDetails
});

export default connect(mapState)(ActionBar);
