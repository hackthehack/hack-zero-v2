import React from "react";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles(theme => ({
  attachDel: {
    position: "absolute",
    right: "-0.5rem",
    top: "-0.5rem"
  }
}));

export function CancelUpload({ fileID, status, onDelete }) {
  const classes = useStyles();
  return (
    <>
      {["UPLOAD_FAILED", "PENDING"].includes(status) && (
        <IconButton
          className={classes.attachDel}
          color="secondary"
          component="span"
          size="small"
          onClick={e => {
            e.preventDefault();
            onDelete(fileID);
          }}
        >
          <HighlightOffIcon />
        </IconButton>
      )}
    </>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    status: state.upload.statuses[ownProps.fileID].status
  };
};

export default connect(mapStateToProps)(CancelUpload);
