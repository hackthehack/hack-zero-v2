import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import TeamMembers from "./subcomponents/team-members";
import UrlJoin from "url-join";
import { clearingHackDetails } from "../store/actions/hackathonActions";
import { connect } from "react-redux";
import HackStatus from "./subcomponents/hack-status";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "80vw"
  },
  paper: {
    padding: theme.spacing(3),
    color: theme.palette.text.primary
  },
  loading: {
    marginTop: theme.spacing(10)
  },
  hacklist: {
    flexGrow: 1,
    marginTop: theme.spacing(5)
  }
}));

export const Hacks = ({ dispatch }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result = await axios.get(
        UrlJoin(process.env.REACT_APP_API_URL, "hacklist")
      );
      setData([...result.data]);
    };
    fetchData();
    dispatch(clearingHackDetails());
  }, [dispatch]);

  if (data.length > 0) {
    return (
      <Grid
        data-testid="main-container"
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        alignContent="center"
      >
        <Grid className={classes.root} item xs={9}>
          <Typography variant="h4">Hackathon Teams</Typography>
        </Grid>
        {data.map(hack => {
          return (
            <Link
              key={hack._id}
              className={classes.root}
              to={`/hack/${hack._id}`}
              style={{ textDecoration: "none" }}
            >
              <Paper className={classes.paper}>
                <Grid
                  container
                  justify="flex-start"
                  alignItems="center"
                  alignContent="center"
                  spacing={1}
                >
                  <Grid item>
                    <Typography variant="h5">{hack.title}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <HackStatus status={hack.status} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{ marginBottom: "1rem", marginTop: "1rem" }}
                  >
                    <Typography variant="body1" component="p">
                      {hack.description.slice(0, 100) + " ...Read More"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TeamMembers team={hack.team} />
                  </Grid>
                </Grid>
              </Paper>
            </Link>
          );
        })}
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
};

const mapState = state => ({
  userId: state.auth.userId,
  hackDetails: state.hack.hackDetails
});

export default connect(mapState)(Hacks);
