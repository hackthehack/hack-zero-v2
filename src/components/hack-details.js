import React, { useState, useEffect } from "react";
import Axios from "axios";

// UI imports
import {
  Grid,
  Typography,
  Paper,
  Button,
  Chip,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


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

function HackDetails(props) {
  const classes = useStyles();

  const [data] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState();
  const [goal, setGoal] = useState("");

  useEffect(() => {
    //console.log(props.match.params);

    if (props.match !== undefined) {
      Axios.get(
        process.env.REACT_APP_API_URL + "hackdetail/" + props.match.params.id
      )
        .then(res => {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setGoal(res.data.goal);
          setTeam(res.data.team);
        })
    }
  }, [data, props.match]);

  const joinHack = event => {
    const object = {
      hackId: "5e6999fb5c13b5d80505cde4",
      userId: "5e683ccc10c5d40008a40e56"
    };
    Axios.post(process.env.REACT_APP_API_URL + "joinhack", object).then(res => {
      setTeam(res.data.team);
    });
  };

  const showTeam = () => {
    if (team !== undefined) {
      return (
        <Grid item xs={12}>
          <Typography variant="h6">Team:</Typography>
          <Grid item xs={10}>
            {team.map(id => {
              return (
                <Chip
                  key={id}
                  className={classes.chipMArgin}
                  icon={<AccountCircleIcon />}
                  label={id}
                  color="primary"
                />
              );
            })}
          </Grid>
        </Grid>
      );
    }
  };

  if (title !== "") {
    return (
      <Grid
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
              <Button variant="contained" color="primary" onClick={joinHack}>
                Join Hack
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">{title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Idea:</Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1">{description}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Goal:</Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1">{goal}</Typography>
            </Grid>
            {showTeam()}
          </Grid>
        </Paper>
      </Grid>
    );
  } else {
    return (
      <Grid
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

export default HackDetails;
