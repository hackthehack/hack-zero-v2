import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const MyHacks = () => {
  return (
    <div>
      <Typography
        style={{ textAlign: "center", margin: "2rem" }}
        variant="h2"
        component="h2"
      >
        Your are part of: hacks
      </Typography>
      <Grid container spacing={3} alignItems="stretch">
        stuff
      </Grid>
    </div>
  );
};

export default MyHacks;
