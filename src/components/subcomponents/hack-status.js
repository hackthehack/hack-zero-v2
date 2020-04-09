import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Status from "./status";
const useStyles = makeStyles(theme => ({
  chip: {
    marginRight: theme.spacing(1)
  }
}));

export function HackStatus({ status }) {
  const classes = useStyles();

  if (!status || status.length === 0) {
    return null;
  }
  return (
    <Grid
      container
      justify="flex-end"
      alignItems="center"
      alignContent="center"
      spacing={1}
      style={{ textAlign: "right" }}
    >
      <Grid item xs={12} className={classes.marginTop}>
        <Status label={status} style={status} clickable={false} />
      </Grid>
    </Grid>
  );
}

export default HackStatus;
