import React from "react";
import { Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    padding: theme.spacing(2),
    width: "60vw",
  },
}));

const SubmissionDetal = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="h4">Submission Detail</Typography>
    </Paper>
  );
};

export default SubmissionDetal;
