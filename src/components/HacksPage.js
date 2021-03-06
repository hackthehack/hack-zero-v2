import React, { useState, useEffect } from "react";

import { ThumbUp } from "@material-ui/icons";

import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
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

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "50vw",
  },
  paper: {
    padding: theme.spacing(3),
    color: theme.palette.text.primary,
  },
  loading: {
    marginTop: theme.spacing(10),
  },
  hacklist: {
    flexGrow: 1,
    marginTop: theme.spacing(5),
  },
}));

export const Hacks = ({ dispatch, userId, jwt }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result = await axios.get(
        UrlJoin(process.env.REACT_APP_API_URL, `hacklist?userId=${userId}`)
      );
      setData([...result.data]);
    };
    fetchData();
    dispatch(clearingHackDetails());
  }, [dispatch, userId]);

  const sendLike = async (e, index, hackId) => {
    e.stopPropagation();
    e.preventDefault();

    const config = {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    };
    const body = {
      hackId,
      userId,
    };

    if (!userId) {
      alert("You must login to like");
      return;
    }
    //console.log("like route");
    let result = await axios.post(
      UrlJoin(process.env.REACT_APP_API_URL, `likehack`),
      body,
      config
    );
    //console.log(result.data);
    //console.log(data[index]);
    //update the state
    const newState = data.map((hack, position) => {
      if (position === index) {
        hack.hasUserLiked = true;
        hack.likes = result.data.numberLikes;
      }
      return hack;
    });
    setData([...newState]);
  };

  const sendDislike = async (e, index, hackId) => {
    e.stopPropagation();
    e.preventDefault();

    const config = {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    };
    const body = {
      hackId,
      userId,
    };

    if (!userId) {
      alert("You must login to like");
      return;
    }
    //console.log("dislike route");
    let result = await axios.post(
      UrlJoin(process.env.REACT_APP_API_URL, `dislikehack`),
      body,
      config
    );
    //console.log(result.data);
    //console.log(data[index]);
    // update ui
    const newState = data.map((hack, position) => {
      if (position === index) {
        hack.hasUserLiked = false;
        hack.likes = result.data.numberLikes;
      }
      return hack;
    });
    setData([...newState]);
  };

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

        {data.map((hack, index) => {
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
                  <Grid
                    container
                    justify="space-around"
                    alignItems="center"
                    alignContent="center"
                    spacing={3}
                    style={{ margin: "0 auto" }}
                  >
                    <Grid item xs={12} lg={8}>
                      <Typography variant="h5">{hack.title}</Typography>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <HackStatus status={hack.status} />
                    </Grid>
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
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <TeamMembers team={hack.team} />
                    </div>
                    <Button
                      onClick={
                        hack.hasUserLiked
                          ? (e) => sendDislike(e, index, hack._id)
                          : (e) => sendLike(e, index, hack._id)
                      }
                      style={{ cursor: !userId ? "not-allowed" : "pointer" }}
                    >
                      <ThumbUp
                        style={{
                          color: hack.hasUserLiked ? "dodgerBlue" : "d3d3d3",
                          fontSize: "1.25rem",
                        }}
                      />
                      <span style={{ marginLeft: "0.5rem" }}>
                        {" "}
                        {hack.likes}
                      </span>
                    </Button>
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
        <CircularProgress data-testid="hacks-page-loader" />
      </Grid>
    );
  }
};

const mapState = (state) => ({
  userId: state.auth.userId,

  jwt: state.auth.jwt,
});

export default connect(mapState)(Hacks);
