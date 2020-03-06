import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    marginTop: "1rem",
    padding: "1rem",
    textAlign: "center",
    color: theme.palette.text.primary,
    backgroundColor: "dodgerBlue"
  }
}));

const Hacks = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result = await axios.get("http://localhost:3001/hacklist");
      //console.log(result.data);
      setData([...result.data]);
    };
    fetchData();
  }, []);
  const renderHacks = () => {
    return data.map(hack => {
      return (
        <Grid
          component={Link}
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
      );
    });
  };
  //console.log(data);
  return (
    <Container>
      <Grid container>{renderHacks()}</Grid>
    </Container>
  );
};

export default Hacks;
