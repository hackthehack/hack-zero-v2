import React from "react";
import {
  Grid,
  Typography,
  FormControl,
  OutlinedInput
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FileUI from "../upload/file-ui";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1)
  }
}));

export function SubmitDetails(props) {
  // console.log(props);
  const classes = useStyles();
  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      alignContent="center"
      spacing={1}
      className={classes.root}
    >
      <Grid item xs={12}>
        <Typography variant="h6">Submission Details</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">[Submission instructions Here]</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined">
          <OutlinedInput
            defaultValue={props.message}
            onChange={e => props.update(e.target.value)}
            placeholder="Message"
            name="message"
            multiline
            rows="5"
          ></OutlinedInput>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {props.files.map((file, index) => {
            return <FileUI key={index} index={null} file={file} />;
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SubmitDetails;
