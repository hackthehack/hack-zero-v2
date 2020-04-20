import React from "react";
import { connect } from "react-redux";
import UploadProgressBar from "./upload-progress-bar";
import { Grid, Typography, Paper, IconButton } from "@material-ui/core";

import AttachFileIcon from "@material-ui/icons/AttachFile";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

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
  attachDel: {
    position: "absolute",
    right: "-0.5rem",
    top: "-0.5rem"
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

export function FileUI({ file, index, onDelete, status }) {
  const classes = useStyles();
  return (
    <Grid item key={index}>
      <Paper className={classes.attachment} data-testid="fileUI">
        {["UPLOAD_FAILED", "PENDING"].includes(status) && (
          <IconButton
            className={classes.attachDel}
            color="secondary"
            component="span"
            size="small"
            onClick={e => {
              e.preventDefault();
              onDelete(index);
            }}
          >
            <HighlightOffIcon />
          </IconButton>
        )}
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
const mapStateToProps = (state, ownProps) => {
  return {
    status: state.upload.statuses[ownProps.index].status
  };
};

export default connect(mapStateToProps)(FileUI);
