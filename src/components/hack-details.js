import React, { useState, useEffect } from "react";
import Axios from "axios";
import Team from "./subcomponents/team";
import JoinButton from "./subcomponents/join-team-button"

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

import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  rightFeild: {
    textAlign: "right"
  },
  loading: {
    marginTop: theme.spacing(10)
  },
  chipMArgin: {
    marginRight: theme.spacing(1)
  }
}));

export function HackDetails(props) {
  const classes = useStyles();

  const [data, setData] = useState(null);

  useEffect(() => {
    //console.log(props.match.params);

    if (props.match !== undefined) {
      Axios.get(
        process.env.REACT_APP_API_URL + "hackdetail/" + props.match.params.id
      ).then(res => {
        setData(res.data)
        
      });
    }
  }, [data, props.match]);

  const joinHack = event => {
    const object = {
      hackId: props.match.params.id,
      userId: props.userId
    };
    Axios.post(process.env.REACT_APP_API_URL + "joinhack", object).then(res => {
      setData(res.data);
    });
  };

  if (data !== null) {
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
              <JoinButton team={data.team} userId={props.userId} joinHack={joinHack} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">{data.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Idea:</Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1">{data.description}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Goal:</Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1">{data.goal}</Typography>
            </Grid>
            {data.team !== undefined ? (
              <Grid item xs={12}>
                <Typography variant="h6">Team:</Typography>
              </Grid>
            ) : null}

            <Grid item xs={10}>
              <Team team={data.team} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  } else {
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
}

const mapState = state => ({
  userId: state.auth.userId
});

export default connect(mapState)(HackDetails);
