import React from "react";
import { connect } from "react-redux";
import {
  Typography,
  LinearProgress
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  loading: {
    width: " 100%",
    height: ".5rem"
  }
}));

export function UploadProgressBar({ fileID, progress, status }) {
  const classes = useStyles();
  switch (status) {
    case "UPLOADED":
      return (
        <Typography variant="body2" color="primary">
          Upload Complete
        </Typography>
      );
    case "UPLOADING":
      return (
        <LinearProgress
          variant="determinate"
          value={progress}
          className={classes.loading}
        />
      );
    case "UPLOAD_FAILED":
      return (
        <Typography variant="body2" color="secondary">
          Upload Failed
        </Typography>
      );
    default:
      return null;
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    progress: state.upload.statuses[ownProps.fileID].progress,
    status: state.upload.statuses[ownProps.fileID].status
  };
};

export default connect(mapStateToProps)(UploadProgressBar);
