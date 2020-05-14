import React from "react";
import UploadProgressBar from "./upload-progress-bar";
import CancelUpload from "./upload-remove-button";
import { Grid, Typography, Paper } from "@material-ui/core";

import AttachFileIcon from "@material-ui/icons/AttachFile";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  attachment: {
    position: "relative",
    minHeight: "10rem",
    width: "9rem",
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    padding: "0.5rem"
  },
  attachIco: {
    height: "5rem"
  },
  overflow: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "inherit",
    padding: "0.5rem"
  }
}));

export function FileUI({ file, index, onDelete }) {
  const classes = useStyles();
  return (
    <Grid item key={index}>
      <Paper className={classes.attachment} data-testid="fileUI">
        {index !== null ? (
          <CancelUpload fileID={index} onDelete={onDelete} />
        ) : null}
        <AttachFileIcon
          className={classes.attachIco}
          fontSize="large"
          disabled
        />
        <Typography variant="body1" className={classes.overflow}>
          {file.name}
        </Typography>
        <Typography variant="body1">
          {(file.size / 1000000).toFixed(2) + "MB"}
        </Typography>
        {index !== null ? <UploadProgressBar fileID={index} /> : null}
      </Paper>
    </Grid>
  );
}

export default FileUI;
