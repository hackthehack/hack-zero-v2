import React from "react";
import {
  Grid,
  Typography,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1)
  }
}));

export function UploadFiles(props) {
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
        <Typography variant="h6">Attach Files</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">[Upload instructions Here]</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="outlined" color="primary">
          Upload
        </Button>
      </Grid>
      <Grid item xs={12}>
        {/* To Be Completed In different story */}
      </Grid>
    </Grid>
  );
}

export default UploadFiles;
