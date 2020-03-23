import React from "react";
import {
  Grid,
  Typography,
  FormControl,
  OutlinedInput
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TeamMembers from "./team-members";

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(5)
  }
}));

export function TeamEdit(props) {
  // console.log(props);
  const classes = useStyles();
  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      alignContent="center"
      spacing={1}
      className={classes.margin}
    >
      <Grid item xs={10} className={classes.marginTop}>
        <Typography variant="h6">Team Name:</Typography>
      </Grid>
      <Grid item xs={10} className={classes.marginTop}>
        <FormControl fullWidth variant="outlined">
          <OutlinedInput
            onChange={props.handleOnChange}
            placeholder="Team Name"
            name="teamName"
            multiline
            rows="1"
            defaultValue={props.namen}
          ></OutlinedInput>
        </FormControl>
      </Grid>
      <Grid item xs={10} className={classes.marginTop}>
        <Typography variant="h6">Team Members:</Typography>
      </Grid>
      <Grid item xs={10}>
        <TeamMembers team={props.team} />
      </Grid>
    </Grid>
  );
}

export default TeamEdit;
