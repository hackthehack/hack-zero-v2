import React, { useState, useEffect } from "react";
import { CircularProgress, Chip } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import Team from "./subcomponents/team";

import { fetchUsers } from "../store/actions/userActions";
import { connect } from "react-redux";


const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "60vw"
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
  },
  chipMArgin: {
    marginRight: theme.spacing(1)
  }
}));

const Hacks = ({ dispatch }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result = await axios.get(process.env.REACT_APP_API_URL + "hacklist");
      //console.log(result.data);
      setData([...result.data]);
    };
    fetchData();


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
          <Typography variant="h4">Hacks</Typography>

    dispatch(fetchUsers());
  }, [dispatch]);
  const renderHacks = () => {
    data.map(hack => {
      return (
        <Grid
          component={Link}
          style={{ textDecoration: "none" }}
          to={`/hack/${hack._id}`}
          data-testid="hack-idea"
          key={hack._id}
          item
          xs={12}
        >
          <Paper className={classes.paper} key={hack.title}>
            <Typography variant="h2" component="h2">
              Name: {hack.title}
            </Typography>
          </Paper>

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
                    <Typography variant="h4">{hack.title}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Chip
                      className={classes.chipMArgin}
                      icon={<ErrorOutlineOutlinedIcon />}
                      label="Open"
                      color="secondary"
                    />
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                    {hack.description.slice(0, 100) + " ...Read More"}
                  </Grid>
                  <Grid item xs={10}>
                    <Team team={hack.team}/>
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
const mapState = state => ({ users: state.user.users });
//const mapDispatch = dispatch => ({ getUsers: () => dispatch(fetchUsers()) });
export default connect(mapState)(Hacks);
