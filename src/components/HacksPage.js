import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.primary,
    backgroundColor: "dodgerBlue"
  }
}));

const Hacks = () => {
  const classes = useStyles();
  const [hacks, setHacks] = useState([
    {
      name: "World Peace",
      title: "Egg day",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur aliquet quam id dui posuere blandit."
    },
    {
      name: "Nodejs day",
      title: "Hooray",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur aliquet quam id dui posuere blandit."
    },
    {
      name: "MAC day",
      title: "$$$",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur aliquet quam id dui posuere blandit."
    }
  ]);
  const renderHacks = () => {
    return hacks.map(hack => {
      return (
        <Grid item xs={12}>
          <Paper className={classes.paper} key={hack.title}>
            <h2>Name: {hack.name}</h2>
            <h3>Title: {hack.title}</h3>
            <h4>Description: {hack.description}</h4>
          </Paper>
        </Grid>
      );
    });
  };
  return (
    <div>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            {renderHacks()}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Hacks;
